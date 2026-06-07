#!/usr/bin/env node
/**
 * sync-insights-from-i6hub.mjs
 *
 * Pulls published insights from the i6Hub public feed and regenerates:
 *   - src/content/insights/<lang>-<slug>.md     (frontmatter + body)
 *   - public/content/insights/<slug>.<ext>      (cover images, when present)
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const FEED_URL = process.env.I6HUB_FEED_URL;
const TOKEN    = process.env.I6HUB_SYNC_TOKEN;
const MD_DIR   = path.resolve('src/content/insights');
const IMG_DIR  = path.resolve('public/content/insights');

if (!FEED_URL || !TOKEN) {
  throw new Error('Missing I6HUB_FEED_URL or I6HUB_SYNC_TOKEN');
}

const res = await fetch(FEED_URL, { headers: { 'X-Sync-Token': TOKEN } });
if (!res.ok) {
  throw new Error(`Feed failed: ${res.status} ${await res.text()}`);
}
const items = await res.json();

// Cria as pastas (idempotente — não falha se já existirem)
await fs.mkdir(MD_DIR, { recursive: true });
await fs.mkdir(IMG_DIR, { recursive: true });

// Limpa .md antigos (preserva README.md)
const existingMd = await fs.readdir(MD_DIR);
await Promise.all(
  existingMd
    .filter((n) => n.endsWith('.md') && n.toLowerCase() !== 'readme.md')
    .map((n) => fs.rm(path.join(MD_DIR, n), { force: true })),
);

// Limpa imagens antigas (apenas formatos gerenciados)
const existingImg = await fs.readdir(IMG_DIR).catch(() => []);
await Promise.all(
  existingImg
    .filter((n) => /\.(jpe?g|png|webp)$/i.test(n))
    .map((n) => fs.rm(path.join(IMG_DIR, n), { force: true })),
);

const yaml = (v) => JSON.stringify(v);
const mimeToExt = (m) =>
  m === 'image/jpeg' ? 'jpg' :
  m === 'image/png'  ? 'png' :
  m === 'image/webp' ? 'webp' : null;

let imgCount = 0;

for (const it of items) {
  // Markdown (inalterado)
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

  // Imagem de capa (novo)
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
