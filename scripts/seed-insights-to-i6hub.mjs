#!/usr/bin/env node
/**
 * seed-insights-to-i6hub.mjs
 *
 * One-shot script to seed the i6Hub `public_insights` table with the existing
 * Markdown files in src/content/insights/. Run this ONCE after the i6Hub
 * migration is in place. Idempotent: uses upsert on (slug, language).
 *
 * Usage:
 *   export I6HUB_SUPABASE_URL="https://<ref>.supabase.co"
 *   export I6HUB_SUPABASE_SERVICE_KEY="<service-role-key>"
 *   node scripts/seed-insights-to-i6hub.mjs
 */

import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'src', 'content', 'insights');

const SUPABASE_URL = process.env.I6HUB_SUPABASE_URL;
const SERVICE_KEY = process.env.I6HUB_SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing env I6HUB_SUPABASE_URL and/or I6HUB_SUPABASE_SERVICE_KEY');
  process.exit(1);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('No frontmatter found');
  const [, fmRaw, body] = match;
  const fm = {};
  for (const line of fmRaw.split('\n')) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    let [, key, value] = m;
    value = value.trim();
    if (value === 'null' || value === '') {
      fm[key] = null;
    } else if (value === 'true') {
      fm[key] = true;
    } else if (value === 'false') {
      fm[key] = false;
    } else if (/^-?\d+$/.test(value)) {
      fm[key] = Number(value);
    } else if (/^".*"$/.test(value)) {
      fm[key] = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    } else {
      fm[key] = value;
    }
  }
  return { fm, body: body.trim() };
}

async function upsert(rows) {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/public_insights?on_conflict=slug,language`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Upsert failed: ${res.status} ${res.statusText} — ${body}`);
  }
}

async function main() {
  const files = (await readdir(INPUT_DIR)).filter((n) => n.endsWith('.md') && n.toLowerCase() !== 'readme.md');
  const rows = [];
  for (const f of files) {
    const raw = await readFile(join(INPUT_DIR, f), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    rows.push({
      slug: fm.slug,
      language: fm.language,
      title: fm.title,
      type: fm.type,
      date: fm.date,
      cluster: fm.cluster,
      excerpt: fm.excerpt,
      content: body || null,
      cover_image: fm.cover_image,
      external_url: fm.external_url,
      read_time: fm.read_time,
      featured: !!fm.featured,
      gated: !!fm.gated,
      asset_url: fm.asset_url,
      published: true,
    });
  }
  console.log(`Upserting ${rows.length} insight(s)…`);
  await upsert(rows);
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
