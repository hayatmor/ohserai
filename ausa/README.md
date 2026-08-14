# AUSA 2026 Exhibitor Scraper

Scrapes all exhibitors from the public AUSA Annual Meeting & Exposition 2026 exhibitor list and writes CSV files.

Source list: https://meetings.ausa.org/annual/2026/exhibitor_exhibitor_list.cfm

## Run

```bash
node ausa/scrape.mjs
```

Options:

```bash
node ausa/scrape.mjs --limit 10   # scrape first N only (testing)
node ausa/scrape.mjs --force      # ignore cache and re-fetch everything
```

No `npm install` is required — the script uses Node built-ins only (`fetch`, `fs`).

## Output

Files are written to `ausa/output/`:

| File | Description |
| --- | --- |
| `exhibitors.csv` | One row per company (booth, contact, address, website, socials, description) |
| `contacts.csv` | One row per named contact person |
| `raw.jsonl` | Raw API responses for resume / re-export |

Re-running without `--force` reuses `raw.jsonl` and only fetches missing keys.

## How it works

1. Downloads the exhibitor list HTML and extracts each profile GUID from `ExhibitorPopup(...)` onclick handlers.
2. Calls the goeshow floor-space API for each GUID:

```
GET https://s2.goeshow.com/webservices/eshow/floor_space.cfc?method=getExhibitor&EXHIBITOR_KEY=<GUID>
Authorization: Bearer /ausa/annual/2026/<GUID>
```

The Bearer token is the profile pathname itself (same token the public React map app uses). Without it the API returns `Restricted Access`.

3. Normalizes fields and writes CSV with UTF-8 BOM (Excel-friendly).

### Notes on fields

- There is no dedicated `EMAIL` field in the API. Emails are often stored in `DIVISION` (e.g. `Barron.Mills@4c-na.com`). The scraper extracts emails from that field with a regex.
- Social fields (`LINKEDIN`, `FACEBOOK`, …) are often handles, not full URLs — they are normalized to full URLs.
- Not every exhibitor publishes a contact name or email; expect many blank contact/email cells.

## Expected counts (last full run)

- ~712 unique exhibitors
- ~700 named contacts
- ~80 records with an extractable email
