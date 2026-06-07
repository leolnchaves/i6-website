#!/usr/bin/env node
/**
 * sync-insights-from-i6hub.mjs
 *
 * Pulls published insights from the i6Hub public feed and regenerates:
 *   - src/content/insights/<lang>-<slug>.md   (frontmatter + body)
 *   - public/content/insights/<slug>.<ext>     (cover images, when present)
 *
 * Images travel inside the feed as base64 (cover_image_data + cover_image_mime),
 * so the site stays 100% static and self-contained after build.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const FEED_URL = process.env.I6HUB_FEED_URL;
const TOKEN = process.env.I6HUB_SYNC_TOKEN;
const MD_DIR  = path.resolve('src/content/insights');
const IMG_DIR = path.resolve('public/content/insights');

if (!FEED_URL || !TOKEN) {
  throw new Error('Missing I6HUB_FEED_URL or I6HUB_SYNC_TOKEN');
}

const res = await fetch(FEED_URL, { headers: { 'X-Sync-Token': TOKEN } });
if (!res.ok) {
  throw new Error(`Feed failed: ${res.status} ${await res.text()}`);
}
const items = await res.json();

// Ensure output dirs
await fs.mkdir(MD_DIR, { recursive: true });
await fs.mkdir(IMG_DIR, { recursive: true });

// Wipe existing .md files (preserve README.md)
const existingMd = await fs.readdir(MD_DIR);
await Promise.all(
  existingMd
    .filter((name) => name.endsWith('.md') && name.toLowerCase() !== 'readme.md')
    .map((name) => fs.rm(path.join(MD_DIR, name), { force: true })),
);

// Wipe existing managed images (only .jpg/.png/.webp; preserve anything else)
const existingImg = await fs.readdir(IMG_DIR).catch(() => []);
await Promise.all(
  existingImg
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .map((name) => fs.rm(path.join(IMG_DIR, name), { force: true })),
);

const yaml = (v) => JSON.stringify(v);

const mimeToExt = (mime) => {
  switch (mime) {
    case 'image/jpeg': return 'jpg';
    case 'image/png':  return 'png';
    case 'image/webp': return 'webp';
    default: return null;
  }
};

let imgCount = 0;

for (const it of items) {
  // 1) Markdown (unchanged)
  const fm = [
    '---',
    it.id ? `id: ${it.id}` : null,
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

  await fs.writeFile(path.join(MD_DIR, `${it.language}-${it.slug}.md`), fm);

  // 2) Cover image (new)
  if (it.cover_image_data && it.cover_image_mime) {
    const ext = mimeToExt(it.cover_image_mime);
    if (!ext) {
      console.warn(`Skipping image for ${it.slug}: unsupported mime ${it.cover_image_mime}`);
      continue;
    }
    const buf = Buffer.from(it.cover_image_data, 'base64');
    await fs.writeFile(path.join(IMG_DIR, `${it.slug}.${ext}`), buf);
    imgCount++;
  }
}

console.log(`Wrote ${items.length} insights to ${MD_DIR}`);
console.log(`Wrote ${imgCount} cover images to ${IMG_DIR}`);
