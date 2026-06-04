#!/usr/bin/env node
/**
 * sync-insights.mjs
 *
 * Pulls published insights from the i6Hub Supabase project and regenerates
 * the Markdown files in src/content/insights/.
 *
 * Runs in GitHub Actions before the Vite build. Reads from env:
 *   - I6HUB_SUPABASE_URL
 *   - I6HUB_SUPABASE_SERVICE_KEY  (service_role key, GitHub Secret)
 *
 * Behavior:
 *   - Fetches public_insights WHERE published = true
 *   - Wipes every *.md in src/content/insights/ (preserves README.md)
 *   - Writes one file per row, named {slug}-{language}.md
 *   - Frontmatter mirrors the existing file convention
 *   - Fails the build if the query fails (no partial publishes)
 */

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'src', 'content', 'insights');

const SUPABASE_URL = process.env.I6HUB_SUPABASE_URL;
const SERVICE_KEY = process.env.I6HUB_SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('[sync-insights] Missing env: I6HUB_SUPABASE_URL and/or I6HUB_SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const FIELDS = [
  'slug',
  'language',
  'title',
  'type',
  'date',
  'cluster',
  'excerpt',
  'content',
  'cover_image',
  'external_url',
  'read_time',
  'featured',
  'gated',
  'asset_url',
].join(',');

async function fetchPublished() {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/public_insights?select=${FIELDS}&published=eq.true&order=date.desc`;
  const res = await fetch(url, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase fetch failed: ${res.status} ${res.statusText} — ${body}`);
  }
  return res.json();
}

function escapeYamlString(value) {
  if (value === null || value === undefined) return null;
  const s = String(value);
  // Escape double quotes and backslashes; wrap in double quotes
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function yamlValue(value) {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  return escapeYamlString(value);
}

function buildMarkdown(row) {
  const fm = [
    '---',
    `title: ${yamlValue(row.title)}`,
    `slug: ${yamlValue(row.slug)}`,
    `type: ${yamlValue(row.type)}`,
    `date: ${yamlValue(row.date)}`,
    `language: ${yamlValue(row.language)}`,
    `cluster: ${yamlValue(row.cluster)}`,
    `excerpt: ${yamlValue(row.excerpt)}`,
    `cover_image: ${yamlValue(row.cover_image)}`,
    `external_url: ${row.external_url ?? 'null'}`,
    `read_time: ${row.read_time ?? 'null'}`,
    `featured: ${row.featured ? 'true' : 'false'}`,
    `gated: ${row.gated ? 'true' : 'false'}`,
    `asset_url: ${row.asset_url ?? 'null'}`,
    '---',
    '',
  ].join('\n');

  const body = row.content ? `${row.content.trimEnd()}\n` : '';
  return fm + body;
}

async function clearOutputDir() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const entries = await readdir(OUTPUT_DIR);
  await Promise.all(
    entries
      .filter((name) => name.endsWith('.md') && name.toLowerCase() !== 'readme.md')
      .map((name) => rm(join(OUTPUT_DIR, name), { force: true })),
  );
}

async function main() {
  console.log('[sync-insights] Fetching published insights from i6Hub…');
  const rows = await fetchPublished();
  console.log(`[sync-insights] Got ${rows.length} published row(s).`);

  await clearOutputDir();

  let written = 0;
  for (const row of rows) {
    if (!row.slug || !row.language) {
      console.warn('[sync-insights] Skipping row with missing slug/language:', row);
      continue;
    }
    const filename = `${row.slug}-${row.language}.md`;
    await writeFile(join(OUTPUT_DIR, filename), buildMarkdown(row), 'utf8');
    written++;
  }

  console.log(`[sync-insights] Wrote ${written} file(s) to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('[sync-insights] FAILED:', err);
  process.exit(1);
});
