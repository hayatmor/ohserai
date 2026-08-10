import { readFile } from "node:fs/promises";
import path from "node:path";
import { contact } from "@/lib/contact";

function foldLine(line: string): string {
  const max = 75;
  if (line.length <= max) return line;
  const parts: string[] = [];
  let remaining = line;
  while (remaining.length > max) {
    parts.push(remaining.slice(0, max));
    remaining = ` ${remaining.slice(max)}`;
  }
  parts.push(remaining);
  return parts.join("\r\n");
}

export async function GET() {
  const photoPath = path.join(process.cwd(), "public", "photo.jpg");
  const photoBase64 = (await readFile(photoPath)).toString("base64");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${contact.fullName}`,
    `ORG:${contact.organization}`,
    `TITLE:${contact.title}`,
    `TEL;TYPE=CELL,VOICE:${contact.phoneE164}`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    `ADR;TYPE=WORK:;;${contact.addressStreet};${contact.addressCity};;;Israel`,
    `URL:https://www.instagram.com/osherlachmi`,
    `NOTE:${contact.title} — ${contact.organization}`,
    foldLine(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`),
    "END:VCARD",
  ];

  const body = `${lines.join("\r\n")}\r\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="osher-lachmi.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
