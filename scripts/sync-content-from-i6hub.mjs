#!/usr/bin/env node
/**
 * sync-content-from-i6hub.mjs
 *
 * Consolidated sync from the i6Hub CMS for all content types.
 * Usage:
 *   node scripts/sync-content-from-i6hub.mjs --type=insights
 *   node scripts/sync-content-from-i6hub.mjs --type=research
 *   node scripts/sync-content-from-i6hub.mjs --type=landings
 *   node scripts/sync-content-from-i6hub.mjs --type=stories
 *
 * Per item, image strategy (cover and, for stories, logo):
 *   1. base64 (<field>_data + <field>_mime)
 *   2. absolute URL (http/https) -> download
 *   3. relative path already on disk -> preserved
 *
 * Orphan images in IMG_DIR are only cleaned at the END, and only when the
 * slug is no longer present in the feed.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

// ---------- CLI ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  }),
);
const TYPE = args.type;
if (!TYPE || !['insights', 'research', 'landings', 'stories'].includes(TYPE)) {
  console.error('Usage: --type=insights|research|landings|stories');
  process.exit(2);
}

// ---------- Config ----------
const TOKEN = process.env.I6HUB_SYNC_TOKEN;

const CONFIG = {
  insights: {
    envFeed: 'I6HUB_FEED_URL',
    mdDir:   'src/content/insights',
    imgDir:  'public/content/insights',
    imgWebPath: '/content/insights',
    fileName: (it) => `${it.language}-${it.slug}.md`,
    frontmatter: fmInsights,
  },
  research: {
    envFeed: 'I6HUB_FEED_URL_RESEARCH',
    mdDir:   'src/content/intelligence',
    imgDir:  'public/lovable-uploads/intelligence',
    imgWebPath: '/lovable-uploads/intelligence',
    fileName: (it) => `${it.slug}-${it.language}.md`,
    frontmatter: fmResearch,
  },
  landings: {
    envFeed: 'I6HUB_FEED_URL_LANDINGS',
    mdDir:   'src/content/landings',
    imgDir:  null, // landings hoje não materializam imagens
    imgWebPath: null,
    fileName: (it) => `${it.slug}-${it.language}.md`,
    frontmatter: fmLandings,
  },
  stories: {
    envFeed: 'I6HUB_FEED_URL_STORIES',
    mdDir:   'src/content/stories',
    imgDir:  'public/content/success-stories',
    imgWebPath: '/content/success-stories',
    logoDir: 'public/content/logos',
    logoWebPath: '/content/logos',
    fileName: (it) => `${it.slug}-${it.language}.md`,
    frontmatter: fmStories,
  },
}[TYPE];

const FEED_URL = process.env[CONFIG.envFeed];
if (!TOKEN) {
  throw new Error(`Missing I6HUB_SYNC_TOKEN`);
}
if (!FEED_URL) {
  console.warn(`[${TYPE}] skipped: ${CONFIG.envFeed} not configured`);
  process.exit(0);
}

// ---------- Fetch feed ----------
console.log(`[${TYPE}] fetching ${FEED_URL}`);
const res = await fetch(FEED_URL, { headers: { 'X-Sync-Token': TOKEN } });
if (res.status === 404) {
  console.warn(`[${TYPE}] skipped: feed not deployed yet (404). Preserving existing .md files.`);
  process.exit(0);
}
if (!res.ok) throw new Error(`Feed failed: ${res.status} ${await res.text()}`);
const items = await res.json();
console.log(`[${TYPE}] received ${items.length} items`);




await fs.mkdir(MD_DIR, { recursive: true });
if (IMG_DIR)  await fs.mkdir(IMG_DIR,  { recursive: true });
if (LOGO_DIR) await fs.mkdir(LOGO_DIR, { recursive: true });

// ---------- Cleanup .md (preserve README.md) ----------
const existingMd = await fs.readdir(MD_DIR);
await Promise.all(
  existingMd
    .filter((n) => n.endsWith('.md') && n.toLowerCase() !== 'readme.md')
    .map((n) => fs.rm(path.join(MD_DIR, n), { force: true })),
);

// ---------- Helpers ----------
const yaml = (v) => JSON.stringify(v);
const yamlList = (arr) => `[${arr.map((v) => JSON.stringify(v)).join(', ')}]`;

const mimeToExt = (m) => ({
  'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/svg+xml': 'svg',
}[m?.toLowerCase()] ?? null);

const extFromUrl = (u) => {
  const m = u.split('?')[0].match(/\.(jpe?g|png|webp|svg)$/i);
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : null;
};

const fileExists = async (p) => { try { await fs.access(p); return true; } catch { return false; } };

/**
 * Materialize one image (cover or logo) for one item.
 * Returns { localPath, fileName } | null.
 */
async function materializeImage({
  slug, baseName, dir, webPath,
  refPath, dataB64, mime,
  cache, keepSet, counters, label,
}) {
  if (!dir) return null;
  // Reuse cache (e.g. PT and EN sharing same image)
  if (cache.has(baseName)) {
    counters.reused++;
    console.log(`[${TYPE}] ${slug} -> reused ${label} from previous language`);
    return cache.get(baseName);
  }

  // 1) base64
  if (dataB64 && mime) {
    const ext = mimeToExt(mime);
    if (ext) {
      try {
        const fileName = `${baseName}.${ext}`;
        await fs.writeFile(path.join(dir, fileName), Buffer.from(dataB64, 'base64'));
        const out = { localPath: `${webPath}/${fileName}`, fileName };
        cache.set(baseName, out);
        keepSet.add(fileName);
        counters.written++;
        console.log(`[${TYPE}] ${slug} -> wrote ${label} via base64 (${ext})`);
        return out;
      } catch (e) {
        console.warn(`[${TYPE}] ${slug} -> base64 ${label} write failed: ${e.message}`);
      }
    } else {
      console.warn(`[${TYPE}] ${slug} -> unsupported ${label} mime ${mime}`);
    }
  }

  // 2) absolute URL
  if (refPath && /^https?:\/\//i.test(refPath)) {
    try {
      const r = await fetch(refPath);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const ct = r.headers.get('content-type')?.split(';')[0]?.trim();
      const ext = mimeToExt(ct) ?? extFromUrl(refPath);
      if (!ext) throw new Error(`cannot determine extension (ct=${ct})`);
      const buf = Buffer.from(await r.arrayBuffer());
      const fileName = `${baseName}.${ext}`;
      await fs.writeFile(path.join(dir, fileName), buf);
      const out = { localPath: `${webPath}/${fileName}`, fileName };
      cache.set(baseName, out);
      keepSet.add(fileName);
      counters.written++;
      console.log(`[${TYPE}] ${slug} -> wrote ${label} via url (${ext}, ${buf.length}B)`);
      return out;
    } catch (e) {
      console.warn(`[${TYPE}] ${slug} -> url ${label} fetch failed: ${e.message}`);
    }
  }

  // 3) relative path already on disk
  if (refPath && !/^https?:\/\//i.test(refPath)) {
    const fileName = path.basename(refPath);
    const onDisk = path.join(dir, fileName);
    if (await fileExists(onDisk)) {
      const out = { localPath: `${webPath}/${fileName}`, fileName };
      cache.set(baseName, out);
      keepSet.add(fileName);
      counters.preserved++;
      console.log(`[${TYPE}] ${slug} -> preserved existing ${label} (${fileName})`);
      return out;
    }
    console.warn(`[${TYPE}] ${slug} -> ${label} "${refPath}" not found on disk`);
  }

  return null;
}

// ---------- Frontmatter writers ----------
function fmInsights(it, { coverLocal }) {
  const finalCover = coverLocal ?? it.cover_image ?? null;
  return [
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
    finalCover ? `cover_image: ${yaml(finalCover)}` : null,
    it.external_url ? `external_url: ${yaml(it.external_url)}` : null,
    it.asset_url ? `asset_url: ${yaml(it.asset_url)}` : null,
    it.excerpt ? `excerpt: ${yaml(it.excerpt)}` : null,
    '---',
    '',
    it.content ?? it.body_md ?? '',
  ].filter(Boolean).join('\n');
}

function fmResearch(it, { coverLocal }) {
  const finalCover = coverLocal ?? it.cover_image ?? null;
  return [
    '---',
    it.id ? `id: ${it.id}` : null,
    `title: ${yaml(it.title ?? '')}`,
    `slug: ${it.slug}`,
    `language: ${it.language}`,
    it.date ? `date: ${it.date}` : null,
    it.sector ? `sector: ${it.sector}` : null,
    it.theme ? `theme: ${it.theme}` : null,
    it.excerpt ? `excerpt: ${yaml(it.excerpt)}` : null,
    it.read_time ? `read_time: ${it.read_time}` : null,
    `featured: ${!!it.featured}`,
    finalCover ? `cover_image: ${yaml(finalCover)}` : null,
    it.related_product ? `related_product: ${it.related_product}` : null,
    it.related_story_slug ? `related_story_slug: ${it.related_story_slug}` : null,
    '---',
    '',
    it.content ?? it.body_md ?? '',
  ].filter(Boolean).join('\n');
}

function fmLandings(it) {
  const cover = it.cover_image ?? null;
  return [
    '---',
    `title: ${yaml(it.title ?? '')}`,
    it.description ? `description: ${yaml(it.description)}` : null,
    `slug: ${it.slug}`,
    `language: ${it.language}`,
    it.hero_kicker   ? `hero_kicker: ${yaml(it.hero_kicker)}`     : null,
    it.hero_headline ? `hero_headline: ${yaml(it.hero_headline)}` : null,
    it.hero_sub      ? `hero_sub: ${yaml(it.hero_sub)}`           : null,
    it.sectors        ? `sectors: ${yaml(it.sectors)}`             : null,
    it.hub_theme      ? `hub_theme: ${it.hub_theme}`               : null,
    it.related_engines ? `related_engines: ${yaml(it.related_engines)}` : null,
    it.related_stories ? `related_stories: ${yaml(it.related_stories)}` : null,
    `cover_image: ${cover ? yaml(cover) : 'null'}`,
    '---',
    '',
    it.content ?? it.body_md ?? '',
  ].filter(Boolean).join('\n');
}

function fmStories(it, { coverLocal, logoLocal }) {
  const finalCover = coverLocal ?? it.cover_image ?? null;
  const finalLogo  = logoLocal  ?? it.logo ?? it.logo_image ?? null;
  const solutions = Array.isArray(it.solutions)
    ? it.solutions
    : (typeof it.solutions === 'string' && it.solutions.trim()
        ? it.solutions.split(',').map((s) => s.trim()).filter(Boolean)
        : []);
  return [
    '---',
    `slug: ${it.slug}`,
    `language: ${it.language}`,
    `title: ${yaml(it.title ?? '')}`,
    it.segment ? `segment: ${yaml(it.segment)}` : null,
    `client: ${yaml(it.client ?? '')}`,
    `client_anon: ${!!it.client_anon}`,
    `description: ${yaml(it.description ?? '')}`,
    `challenge: ${yaml(it.challenge ?? '')}`,
    `solution: ${yaml(it.solution ?? '')}`,
    `metric1: ${yaml(it.metric1 ?? '')}`,
    `metric2: ${yaml(it.metric2 ?? '')}`,
    `metric3: ${yaml(it.metric3 ?? '')}`,
    `solutions: ${yamlList(solutions)}`,
    `quote: ${yaml(it.quote ?? '')}`,
    `customer_name: ${yaml(it.customer_name ?? '')}`,
    `customer_title: ${yaml(it.customer_title ?? '')}`,
    finalCover ? `cover_image: ${yaml(finalCover)}` : 'cover_image: null',
    finalLogo  ? `logo: ${yaml(finalLogo)}`         : 'logo: null',
    `show_home: ${!!it.show_home}`,
    `published: ${it.published !== false}`,
    `sort_order: ${Number.isFinite(it.sort_order) ? it.sort_order : 999}`,
    '---',
    '',
    it.content ?? it.body_md ?? '',
  ].filter(Boolean).join('\n');
}

// ---------- Main loop ----------
const coverCache = new Map(); // baseName -> { localPath, fileName }
const logoCache  = new Map();
const keepCover  = new Set();
const keepLogo   = new Set();
const coverCounters = { written: 0, reused: 0, preserved: 0 };
const logoCounters  = { written: 0, reused: 0, preserved: 0 };
const itemsWithCover = [];
const itemsMissingCover = [];

for (const it of items) {
  const slug = it.slug;

  const coverRef  = it.cover_image ?? '';
  const coverData = it.cover_image_data ?? null;
  const coverMime = it.cover_image_mime ?? null;

  if (coverRef || coverData) itemsWithCover.push(slug);

  let coverOut = null;
  if (IMG_DIR) {
    coverOut = await materializeImage({
      slug, baseName: slug, dir: IMG_DIR, webPath: CONFIG.imgWebPath,
      refPath: coverRef, dataB64: coverData, mime: coverMime,
      cache: coverCache, keepSet: keepCover, counters: coverCounters, label: 'cover',
    });
    if (!coverOut && (coverRef || coverData)) itemsMissingCover.push(slug);
  }

  let logoOut = null;
  if (TYPE === 'stories' && LOGO_DIR) {
    const logoRef  = it.logo_image ?? it.logo ?? '';
    const logoData = it.logo_data ?? null;
    const logoMime = it.logo_mime ?? null;
    if (logoRef || logoData) {
      logoOut = await materializeImage({
        slug, baseName: `${slug}-logo`, dir: LOGO_DIR, webPath: CONFIG.logoWebPath,
        refPath: logoRef, dataB64: logoData, mime: logoMime,
        cache: logoCache, keepSet: keepLogo, counters: logoCounters, label: 'logo',
      });
    }
  }

  const md = CONFIG.frontmatter(it, {
    coverLocal: coverOut?.localPath ?? null,
    logoLocal:  logoOut?.localPath  ?? null,
  });
  await fs.writeFile(path.join(MD_DIR, CONFIG.fileName(it)), md);
}

// ---------- Cleanup orphan images ----------
async function cleanupOrphans(dir, keepSet, label) {
  if (!dir) return 0;
  let removed = 0;
  const onDisk = await fs.readdir(dir).catch(() => []);
  for (const name of onDisk) {
    if (!/\.(jpe?g|png|webp|svg)$/i.test(name)) continue;
    if (keepSet.has(name)) continue;
    await fs.rm(path.join(dir, name), { force: true });
    removed++;
    console.log(`[cleanup ${label}] removed orphan ${name}`);
  }
  return removed;
}

const removedCovers = await cleanupOrphans(IMG_DIR, keepCover, 'cover');
const removedLogos  = await cleanupOrphans(LOGO_DIR, keepLogo, 'logo');

// ---------- Summary ----------
console.log('---');
console.log(`Type:              ${TYPE}`);
console.log(`Items:             ${items.length}`);
console.log(`Covers ref'd:      ${itemsWithCover.length}`);
console.log(`Covers written:    ${coverCounters.written}`);
console.log(`Covers reused:     ${coverCounters.reused}`);
console.log(`Covers preserved:  ${coverCounters.preserved}`);
console.log(`Covers removed:    ${removedCovers}`);
if (TYPE === 'stories') {
  console.log(`Logos written:     ${logoCounters.written}`);
  console.log(`Logos reused:      ${logoCounters.reused}`);
  console.log(`Logos preserved:   ${logoCounters.preserved}`);
  console.log(`Logos removed:     ${removedLogos}`);
}
if (itemsMissingCover.length) {
  console.log(`Slugs sem capa materializada: ${itemsMissingCover.join(', ')}`);
}

// Fail if feed had covers but nothing materialized
if (
  IMG_DIR &&
  itemsWithCover.length > 0 &&
  coverCounters.written + coverCounters.reused + coverCounters.preserved === 0
) {
  console.error(`FATAL: feed [${TYPE}] tinha cover_image mas nenhuma imagem foi materializada.`);
  process.exit(1);
}
