#!/usr/bin/env node
/**
 * Downloads all binaries referenced by *.asset.json files into dist/
 * so that GitHub Pages can serve /__l5e/assets-v1/... paths.
 *
 * The Lovable preview/published environment serves these URLs dynamically,
 * but static hosts (GitHub Pages) do not, so we materialize the files.
 */
import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SOURCES = [
  'https://i6-website.lovable.app',
  'https://id-preview--e93ee020-684a-4686-8879-c9847ef30581.lovable.app',
];

async function walk(dir, out = []) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue;
      await walk(full, out);
    } else if (e.isFile() && e.name.endsWith('.asset.json')) {
      out.push(full);
    }
  }
  return out;
}

async function fetchBinary(url) {
  let lastErr;
  for (const base of SOURCES) {
    try {
      const res = await fetch(base + url, { redirect: 'follow' });
      if (res.ok) return Buffer.from(await res.arrayBuffer());
      lastErr = new Error(`${res.status} ${res.statusText} from ${base}${url}`);
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error(`Failed to fetch ${url}`);
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('[inline-lovable-assets] dist/ not found — run after `npm run build`');
    process.exit(1);
  }

  const pointers = await walk(join(ROOT, 'src'));
  console.log(`[inline-lovable-assets] found ${pointers.length} asset pointer(s)`);
  if (pointers.length === 0) return;

  const seen = new Set();
  let ok = 0, skipped = 0, failed = 0;

  for (const file of pointers) {
    try {
      const meta = JSON.parse(await readFile(file, 'utf8'));
      if (!meta?.url) continue;
      if (seen.has(meta.url)) { skipped++; continue; }
      seen.add(meta.url);

      const dest = join(DIST, meta.url.replace(/^\//, ''));
      if (existsSync(dest)) {
        const s = await stat(dest);
        if (s.size > 0) { skipped++; continue; }
      }

      const buf = await fetchBinary(meta.url);
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      ok++;
      console.log(`  ✓ ${meta.original_filename ?? meta.url} (${buf.length} bytes)`);
    } catch (e) {
      failed++;
      console.error(`  ✗ ${file}: ${e.message}`);
    }
  }

  console.log(`[inline-lovable-assets] ok=${ok} skipped=${skipped} failed=${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
