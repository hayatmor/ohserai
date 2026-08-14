#!/usr/bin/env node
/**
 * AUSA 2026 Exhibitor Scraper
 *
 * Fetches the public exhibitor list, then pulls each profile from the
 * goeshow floor_space API and writes CSV + raw JSONL.
 *
 * Usage:
 *   node ausa/scrape.mjs
 *   node ausa/scrape.mjs --limit 10
 *   node ausa/scrape.mjs --force
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "output");
const RAW_PATH = join(OUT_DIR, "raw.jsonl");
const EXHIBITORS_CSV = join(OUT_DIR, "exhibitors.csv");
const CONTACTS_CSV = join(OUT_DIR, "contacts.csv");

const LIST_URL = "https://meetings.ausa.org/annual/2026/exhibitor_exhibitor_list.cfm";
const PROFILE_BASE = "https://maps.goeshow.com/ausa/annual/2026";
const API_URL = "https://s2.goeshow.com/webservices/eshow/floor_space.cfc";

const CONCURRENCY = 8;
const RETRIES = 3;
const DELAY_MS = 120;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const EXHIBITOR_HEADERS = [
  "exhibitor_key",
  "company_name",
  "booth",
  "all_booths",
  "location",
  "exhibitor_type",
  "contact_first_name",
  "contact_last_name",
  "contact_title",
  "email",
  "phone",
  "work_phone",
  "toll_free",
  "fax",
  "website",
  "linkedin",
  "facebook",
  "twitter",
  "instagram",
  "tiktok",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "country",
  "description",
  "show_guide_description",
  "logo_url",
  "profile_url",
];

const CONTACT_HEADERS = [
  "full_name",
  "first_name",
  "last_name",
  "title",
  "email",
  "phone",
  "company_name",
  "booth",
  "city",
  "state",
  "country",
  "linkedin",
  "profile_url",
];

function parseArgs(argv) {
  const args = { limit: null, force: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--limit" && argv[i + 1]) {
      args.limit = Number(argv[++i]);
    } else if (argv[i] === "--force") {
      args.force = true;
    } else if (argv[i] === "--help" || argv[i] === "-h") {
      console.log(`Usage: node ausa/scrape.mjs [--limit N] [--force]
  --limit N   Only scrape the first N exhibitors (for testing)
  --force     Ignore existing raw.jsonl and re-fetch everything`);
      process.exit(0);
    }
  }
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchText(url, options = {}, attempt = 1) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/json,*/*",
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return await res.text();
  } catch (err) {
    if (attempt >= RETRIES) throw err;
    const wait = DELAY_MS * attempt * attempt;
    console.warn(`  retry ${attempt}/${RETRIES} after error: ${err.message}`);
    await sleep(wait);
    return fetchText(url, options, attempt + 1);
  }
}

async function fetchJson(url, options = {}, attempt = 1) {
  const text = await fetchText(url, options, attempt);
  if (/Restricted Access/i.test(text)) {
    throw new Error("Restricted Access");
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON: ${text.slice(0, 120)}`);
  }
}

function parseExhibitorList(html) {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  const byKey = new Map();

  for (const rowMatch of rows) {
    const rowHtml = rowMatch[1];
    const guidMatch = rowHtml.match(
      /ExhibitorPopup\('https:\/\/maps\.goeshow\.com\/ausa\/annual\/2026\/([0-9A-Fa-f-]{36})'/i,
    );
    if (!guidMatch) continue;

    const key = guidMatch[1].toUpperCase();
    const tds = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripHtml(m[1]));
    const booth = tds[0] || "";
    const companyName = tds[1] || "";
    const location = tds[2] || "";

    if (!byKey.has(key)) {
      byKey.set(key, {
        exhibitor_key: key,
        booth,
        company_name_list: companyName,
        location,
        profile_url: `${PROFILE_BASE}/${key}`,
      });
    }
  }

  return [...byKey.values()];
}

function bearerToken(exhibitorKey) {
  return `/ausa/annual/2026/${exhibitorKey}`;
}

async function fetchExhibitorDetail(exhibitorKey) {
  const token = bearerToken(exhibitorKey);
  const url = `${API_URL}?method=getExhibitor&EXHIBITOR_KEY=${encodeURIComponent(exhibitorKey)}`;
  const data = await fetchJson(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Referer: `https://maps.goeshow.com${token}`,
    },
  });
  if (!data?.SUCCESS || !data?.EXHIBITOR) {
    throw new Error(`API returned unsuccessful payload for ${exhibitorKey}`);
  }
  return data;
}

function extractEmail(...candidates) {
  for (const value of candidates) {
    if (!value) continue;
    const match = String(value).match(EMAIL_RE);
    if (match) return match[0];
  }
  return "";
}

function normalizeWebsite(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw.replace(/^\/+/, "")}`;
}

function normalizeSocial(platform, value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  const handle = raw.replace(/^@/, "").replace(/^\/+/, "");
  switch (platform) {
    case "linkedin":
      if (handle.includes("/")) return `https://www.linkedin.com/${handle.replace(/^in\//, "in/")}`;
      return `https://www.linkedin.com/company/${handle}`;
    case "facebook":
      return `https://www.facebook.com/${handle}`;
    case "twitter":
      return `https://x.com/${handle}`;
    case "instagram":
      return `https://www.instagram.com/${handle}`;
    case "tiktok":
      return `https://www.tiktok.com/@${handle}`;
    default:
      return raw;
  }
}

function showGuideDescription(directory) {
  const surveys = directory?.SURVEYS;
  if (!Array.isArray(surveys)) return "";
  for (const survey of surveys) {
    const name = String(survey?.QUESTION_NAME || "");
    if (!/Show Guide/i.test(name)) continue;
    const responses = survey?.RESPONSES;
    if (!Array.isArray(responses) || !responses.length) continue;
    return String(responses[0]?.RESPONSE_TEXT || "").trim();
  }
  return "";
}

function normalizeRecord(listRow, apiPayload) {
  const exhibitor = apiPayload?.EXHIBITOR || {};
  const directory = exhibitor.DIRECTORY || {};
  const booths = Array.isArray(exhibitor.BOOTHS)
    ? exhibitor.BOOTHS.map((b) => b?.BOOTH_NO).filter((v) => v != null && v !== "")
    : [];

  const first = String(directory.FIRST_NAME || "").trim();
  const last = String(directory.LAST_NAME || "").trim();
  const email = extractEmail(
    directory.DIVISION,
    directory.EMAIL,
    directory.DESCRIPTION,
    directory.TITLE,
    directory.COMPANY_NAME,
  );

  const companyName =
    String(exhibitor.COMPANY_NAME || "").trim() ||
    String(directory.COMPANY_NAME || "").trim() ||
    String(listRow.company_name_list || "").trim();

  const booth =
    exhibitor.PRIMARY_BOOTH != null && exhibitor.PRIMARY_BOOTH !== ""
      ? String(exhibitor.PRIMARY_BOOTH)
      : String(listRow.booth || "");

  return {
    exhibitor_key: listRow.exhibitor_key,
    company_name: companyName,
    booth,
    all_booths: booths.join("; "),
    location: listRow.location || "",
    exhibitor_type: String(exhibitor.EXHIBITOR_TYPE || "").trim(),
    contact_first_name: first,
    contact_last_name: last,
    contact_title: String(directory.TITLE || "").trim(),
    email,
    phone: String(directory.PHONE || "").trim(),
    work_phone: String(directory.WORK_PHONE || "").trim(),
    toll_free: String(directory.TOLL_FREE || "").trim(),
    fax: String(directory.FAX || "").trim(),
    website: normalizeWebsite(directory.WEBSITE),
    linkedin: normalizeSocial("linkedin", directory.LINKEDIN),
    facebook: normalizeSocial("facebook", directory.FACEBOOK),
    twitter: normalizeSocial("twitter", directory.TWITTER),
    instagram: normalizeSocial("instagram", directory.INSTAGRAM),
    tiktok: normalizeSocial("tiktok", directory.TIKTOK),
    address1: String(directory.ADDRESS1 || "").trim(),
    address2: String(directory.ADDRESS2 || "").trim(),
    city: String(directory.CITY || "").trim(),
    state: String(directory.STATE || "").trim(),
    zip: String(directory.ZIP_CODE ?? "").trim(),
    country: String(directory.COUNTRY || "").trim(),
    description: String(directory.DESCRIPTION || "").trim(),
    show_guide_description: showGuideDescription(directory),
    logo_url: String(directory.LOGO || "").trim(),
    profile_url: listRow.profile_url,
  };
}

function toContactRow(record) {
  const fullName = [record.contact_first_name, record.contact_last_name].filter(Boolean).join(" ").trim();
  if (!fullName) return null;
  return {
    full_name: fullName,
    first_name: record.contact_first_name,
    last_name: record.contact_last_name,
    title: record.contact_title,
    email: record.email,
    phone: record.phone || record.work_phone,
    company_name: record.company_name,
    booth: record.booth,
    city: record.city,
    state: record.state,
    country: record.country,
    linkedin: record.linkedin,
    profile_url: record.profile_url,
  };
}

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function writeCsv(path, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  // UTF-8 BOM for Excel compatibility
  writeFileSync(path, `\uFEFF${lines.join("\n")}\n`, "utf8");
}

function loadExistingRaw() {
  const map = new Map();
  if (!existsSync(RAW_PATH)) return map;
  const text = readFileSync(RAW_PATH, "utf8");
  for (const line of text.split(/\n+/)) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      const key = String(obj?.exhibitor_key || obj?.EXHIBITOR?.KEY_ID || "").toUpperCase();
      if (key) map.set(key, obj);
    } catch {
      // skip bad lines
    }
  }
  return map;
}

async function mapPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function runner() {
    while (true) {
      const i = index++;
      if (i >= items.length) break;
      results[i] = await worker(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => runner());
  await Promise.all(workers);
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  mkdirSync(OUT_DIR, { recursive: true });

  console.log("1/3 Fetching exhibitor list…");
  const listHtml = await fetchText(LIST_URL, {
    headers: { Referer: "https://meetings.ausa.org/" },
  });
  let list = parseExhibitorList(listHtml);
  console.log(`   Found ${list.length} unique exhibitors`);

  if (args.limit && Number.isFinite(args.limit) && args.limit > 0) {
    list = list.slice(0, args.limit);
    console.log(`   Limited to first ${list.length}`);
  }

  const existing = args.force ? new Map() : loadExistingRaw();
  if (args.force && existsSync(RAW_PATH)) {
    writeFileSync(RAW_PATH, "", "utf8");
  }
  if (!existsSync(RAW_PATH)) {
    writeFileSync(RAW_PATH, "", "utf8");
  }

  const toFetch = list.filter((row) => !existing.has(row.exhibitor_key));
  console.log(`2/3 Fetching profiles… (${toFetch.length} new, ${list.length - toFetch.length} cached)`);

  let done = 0;
  await mapPool(toFetch, CONCURRENCY, async (row) => {
    try {
      const payload = await fetchExhibitorDetail(row.exhibitor_key);
      const entry = {
        exhibitor_key: row.exhibitor_key,
        list: row,
        fetched_at: new Date().toISOString(),
        ...payload,
      };
      appendFileSync(RAW_PATH, `${JSON.stringify(entry)}\n`, "utf8");
      existing.set(row.exhibitor_key, entry);
      done += 1;
      if (done % 25 === 0 || done === toFetch.length) {
        console.log(`   ${done}/${toFetch.length}`);
      }
      await sleep(DELAY_MS);
    } catch (err) {
      console.error(`   FAIL ${row.exhibitor_key} (${row.company_name_list || row.booth}): ${err.message}`);
      appendFileSync(
        RAW_PATH,
        `${JSON.stringify({
          exhibitor_key: row.exhibitor_key,
          list: row,
          fetched_at: new Date().toISOString(),
          error: String(err.message || err),
        })}\n`,
        "utf8",
      );
    }
  });

  console.log("3/3 Writing CSV files…");
  const exhibitorRows = [];
  const contactRows = [];
  let withEmail = 0;
  let withContact = 0;
  let errors = 0;

  for (const row of list) {
    const raw = existing.get(row.exhibitor_key);
    if (!raw || raw.error || !raw.EXHIBITOR) {
      errors += 1;
      continue;
    }
    const record = normalizeRecord(row, raw);
    exhibitorRows.push(record);
    if (record.email) withEmail += 1;
    if (record.contact_first_name || record.contact_last_name) withContact += 1;
    const contact = toContactRow(record);
    if (contact) contactRows.push(contact);
  }

  writeCsv(EXHIBITORS_CSV, EXHIBITOR_HEADERS, exhibitorRows);
  writeCsv(CONTACTS_CSV, CONTACT_HEADERS, contactRows);

  console.log("");
  console.log("Done.");
  console.log(`  exhibitors.csv : ${exhibitorRows.length} rows → ${EXHIBITORS_CSV}`);
  console.log(`  contacts.csv   : ${contactRows.length} rows → ${CONTACTS_CSV}`);
  console.log(`  raw.jsonl      : ${RAW_PATH}`);
  console.log(`  with contact   : ${withContact}`);
  console.log(`  with email     : ${withEmail}`);
  if (errors) console.log(`  missing/errors : ${errors}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
