#!/usr/bin/env node
/**
 * sync-insights-from-i6hub.mjs
 *
 * Puxa insights publicados do feed do i6Hub e regenera:
 *   - src/content/insights/<lang>-<slug>.md
 *   - public/content/insights/<slug>.<ext>  (capa, quando disponível)
 *
 * Estratégia de capa, por item, na ordem:
 *   1. base64 (cover_image_data + cover_image_mime)
 *   2. URL absoluta (http/https) em cover_image  -> baixa
 *   3. path relativo /content/insights/<x> já presente no disco -> preserva
 *
 * Imagens antigas em IMG_DIR só são removidas no fim, e somente se o slug
 * não estiver mais presente no feed (não apaga cegamente no início).
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

await fs.mkdir(MD_DIR, { recursive: true });
await fs.mkdir(IMG_DIR, { recursive: true });

// --- Limpa apenas .md antigos (preserva README.md). Imagens são tratadas no fim. ---
const existingMd = await fs.readdir(MD_DIR);
await Promise.all(
  existingMd
    .filter((n) => n.endsWith('.md') && n.toLowerCase() !== 'readme.md')
    .map((n) => fs.rm(path.join(MD_DIR, n), { force: true })),
);

// --- Helpers ---
const yaml = (v) => JSON.stringify(v);

const mimeToExt = (m) => {
  const map = {
    'image/jpeg': 'jpg',
    'image/jpg':  'jpg',
    'image/png':  'png',
    'image/webp': 'webp',
  };
  return map[m?.toLowerCase()] ?? null;
};

const extFromUrl = (u) => {
  const m = u.split('?')[0].match(/\.(jpe?g|png|webp)$/i);
  if (!m) return null;
  return m[1].toLowerCase().replace('jpeg', 'jpg');
};

const fileExists = async (p) => {
  try { await fs.access(p); return true; } catch { return false; }
};

// slug -> "/content/insights/<slug>.<ext>" (cache entre línguas)
const localBySlug = new Map();
// nomes de arquivo que devemos PRESERVAR em IMG_DIR no cleanup final
const keepImageFiles = new Set();

let newImages = 0;       // imagens efetivamente gravadas neste run
let reusedImages = 0;    // segunda língua reaproveitando download
let preservedImages = 0; // path relativo já existente no disco
let skipped = 0;         // items com cover_image mas sem nenhum sucesso
const itemsWithCover = [];
const itemsWithoutMaterializedImage = [];

// --- Loop principal ---
for (const it of items) {
  const slug = it.slug;
  const cover = it.cover_image ?? '';
  const hasData = !!it.cover_image_data;
  const hasMime = !!it.cover_image_mime;

  console.log(
    `[insight] slug=${slug} lang=${it.language} ` +
    `has_data=${hasData} data_len=${it.cover_image_data?.length ?? 0} ` +
    `has_mime=${hasMime} mime=${it.cover_image_mime ?? '-'} ` +
    `cover="${String(cover).slice(0, 80)}"`,
  );

  if (cover || hasData) itemsWithCover.push(slug);

  let localCover = localBySlug.get(slug) ?? null;

  // Reaproveita download da outra língua
  if (localCover) {
    reusedImages++;
    console.log(`[insight] ${slug} -> reused image from previous language`);
  }

  // 1) base64
  if (!localCover && hasData && hasMime) {
    const ext = mimeToExt(it.cover_image_mime);
    if (ext) {
      try {
        const fileName = `${slug}.${ext}`;
        await fs.writeFile(path.join(IMG_DIR, fileName), Buffer.from(it.cover_image_data, 'base64'));
        localCover = `/content/insights/${fileName}`;
        localBySlug.set(slug, localCover);
        keepImageFiles.add(fileName);
        newImages++;
        console.log(`[insight] ${slug} -> wrote image via base64 (${ext})`);
      } catch (e) {
        console.warn(`[insight] ${slug} -> base64 write failed: ${e.message}`);
      }
    } else {
      console.warn(`[insight] ${slug} -> unsupported mime ${it.cover_image_mime}`);
    }
  }

  // 2) URL absoluta
  if (!localCover && /^https?:\/\//i.test(cover)) {
    try {
      const r = await fetch(cover);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const ct = r.headers.get('content-type')?.split(';')[0]?.trim();
      const ext = mimeToExt(ct) ?? extFromUrl(cover);
      if (!ext) throw new Error(`cannot determine extension (ct=${ct})`);
      const buf = Buffer.from(await r.arrayBuffer());
      const fileName = `${slug}.${ext}`;
      await fs.writeFile(path.join(IMG_DIR, fileName), buf);
      localCover = `/content/insights/${fileName}`;
      localBySlug.set(slug, localCover);
      keepImageFiles.add(fileName);
      newImages++;
      console.log(`[insight] ${slug} -> wrote image via url (${ext}, ${buf.length}B)`);
    } catch (e) {
      console.warn(`[insight] ${slug} -> url fetch failed: ${e.message}`);
    }
  }

  // 3) Path relativo já presente no disco
  if (!localCover && cover && !/^https?:\/\//i.test(cover)) {
    const rel = cover.replace(/^\//, ''); // "content/insights/foo.jpg"
    const fileName = path.basename(rel);
    const onDisk = path.join(IMG_DIR, fileName);
    if (await fileExists(onDisk)) {
      localCover = `/${rel.startsWith('content/') ? rel : `content/insights/${fileName}`}`;
      localBySlug.set(slug, localCover);
      keepImageFiles.add(fileName);
      preservedImages++;
      console.log(`[insight] ${slug} -> preserved existing local image (${fileName})`);
    } else {
      console.warn(`[insight] ${slug} -> cover_image is relative "${cover}" but file not found on disk`);
    }
  }

  if (!localCover && (cover || hasData)) {
    skipped++;
    itemsWithoutMaterializedImage.push(slug);
  }

  // --- Markdown (reescreve cover_image pro path local quando temos um) ---
  const finalCover = localCover ?? it.cover_image ?? null;

  const fm = [
    '---',
    it.id ? `id: ${it.id}` : null,
    `title: ${yaml(it.title ?? '')}`,
    `slug: ${slug}`,
    `language: ${it.language}`,
    `type: ${it.type ?? ''}`,
    it.cluster ? `cluster: ${yaml(it.cluster)}` : null,
    `featured: ${!!it.featured}`,
    `gated: ${!!it.gated}`,
    it.date ? `date: ${it.date}` : null,
    it.read_time ? `read_time: ${it.read_time}` : null,
    finalCover ? `cover_image: ${yaml(finalCover)}` : null,
    it.external_url ? `external_url: ${yaml(it.external_url)}` : null,
    it.asset_url ? `asset_url: ${yaml(it.asset_url)}` : null,
    it.excerpt ? `excerpt: ${yaml(it.excerpt)}` : null,
    '---',
    '',
    it.content ?? '',
  ].filter(Boolean).join('\n');

  await fs.writeFile(path.join(MD_DIR, `${it.language}-${slug}.md`), fm);
}

// --- Cleanup final de imagens órfãs (slug não está mais no feed) ---
let removedImages = 0;
const onDisk = await fs.readdir(IMG_DIR).catch(() => []);
for (const name of onDisk) {
  if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
  if (keepImageFiles.has(name)) continue;
  await fs.rm(path.join(IMG_DIR, name), { force: true });
  removedImages++;
  console.log(`[cleanup] removed orphan image ${name}`);
}

// --- Sumário ---
console.log('---');
console.log(`Items:           ${items.length}`);
console.log(`With cover ref:  ${itemsWithCover.length}`);
console.log(`Images written:  ${newImages}`);
console.log(`Images reused:   ${reusedImages}`);
console.log(`Images preserved:${preservedImages}`);
console.log(`Images removed:  ${removedImages}`);
console.log(`Skipped covers:  ${skipped}`);
if (itemsWithoutMaterializedImage.length) {
  console.log(`Slugs sem capa materializada: ${itemsWithoutMaterializedImage.join(', ')}`);
}

// --- Falha o job se o feed tinha capas mas nada foi materializado ---
if (itemsWithCover.length > 0 && newImages + reusedImages + preservedImages === 0) {
  console.error('FATAL: feed tinha cover_image em pelo menos um item, mas nenhuma imagem foi materializada.');
  process.exit(1);
}
