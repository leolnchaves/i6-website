#!/usr/bin/env node
/**
 * sync-insights-from-i6hub.mjs
 *
 * Pulls published insights from the i6Hub public feed (edge function)
 * and regenerates the Markdown files in src/content/insights/.
 *
 * Auth: shared token in `X-Sync-Token` header. The i6Hub edge function
 * validates it and returns only `published = true` rows. The site repo
 * never touches the service_role key.
 *
 * Env:
 *   - I6HUB_FEED_URL   (e.g. https://<ref>.functions.supabase.co/public-insights-feed)
 *   - I6HUB_SYNC_TOKEN (shared secret)
 *
 * Preserves README.md in the output directory.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const FEED_URL = process.env.I6HUB_FEED_URL;
const TOKEN = process.env.I6HUB_SYNC_TOKEN;
const OUT_DIR = path.resolve('src/content/insights');

if (!FEED_URL || !TOKEN) {
  throw new Error('Missing I6HUB_FEED_URL or I6HUB_SYNC_TOKEN');
}

const res = await fetch(FEED_URL, { headers: { 'X-Sync-Token': TOKEN } });
if (!res.ok) {
  throw new Error(`Feed failed: ${res.status} ${await res.text()}`);
}
const items = await res.json();

// Wipe existing .md files (preserve README.md)
await fs.mkdir(OUT_DIR, { recursive: true });
const existing = await fs.readdir(OUT_DIR);
await Promise.all(
  existing
    .filter((name) => name.endsWith('.md') && name.toLowerCase() !== 'readme.md')
    .map((name) => fs.rm(path.join(OUT_DIR, name), { force: true })),
);

const yaml = (v) => JSON.stringify(v);

for (const it of items) {
  const fm = [
    '---',
    `title: ${yaml(it.title ?? '')}`,
    `slug: ${it.slug}`,
    `language: ${it.language}`,
    `type: ${it.type ?? ''}`,
    it.cluster ? `cluster: ${yaml(it.cluster)}` : null,
    `featured: ${!!it.featured}`,
    `gated: ${!!it.gated}`,
    it.date ? `date: ${it.date}` : null,
    it.read_time ? `read_time: ${it.read_time}` : null,
    it.cover_image ? `cover_image: ${yaml(it.cover_image)}` : null,
    it.external_url ? `external_url: ${yaml(it.external_url)}` : null,
    it.asset_url ? `asset_url: ${yaml(it.asset_url)}` : null,
    it.excerpt ? `excerpt: ${yaml(it.excerpt)}` : null,
    '---',
    '',
    it.content ?? '',
  ].filter(Boolean).join('\n');

  await fs.writeFile(path.join(OUT_DIR, `${it.language}-${it.slug}.md`), fm);
}

console.log(`Wrote ${items.length} insights to ${OUT_DIR}`);
