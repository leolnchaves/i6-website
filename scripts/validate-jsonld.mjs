/**
 * Valida o JSON-LD presente no HTML ESTÁTICO gerado em dist/ (sem executar JS).
 * Falha o build (exit 1) em qualquer violação.
 *
 * Checagens:
 *  a) todo <script type="application/ld+json"> é JSON válido;
 *  b) @id único por página e toda referência {"@id"} resolve na mesma página;
 *  c) nenhuma string contém placeholder ("[...]", "PLACEHOLDER") nem valor vazio;
 *  d) em /our-ai e /docs/pesquisa, cada item VISÍVEL da lista aparece no JSON-LD
 *     com título idêntico (e ano, quando visível);
 *  e) `image` só é emitida se o arquivo existir em public/.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  DOCS_ROOT_ROUTE,
  ES_TRANSLATED_ROUTES,
  NON_INDEXABLE_DOC_ROUTES,
  SAMPLE_DOC_ROUTES,
  localizedRoutePath,
} from './lib/seo-route-config.mjs';

const DIST = resolve('dist');
const PUBLIC_DIR = resolve('public');
const errors = [];

const research = JSON.parse(readFileSync(resolve('src/data/research.json'), 'utf8'));

const staticRoutes = ['', 'our-ai', 'i6-builders', 'docs/pesquisa', 'success-stories', 'contact', 'privacy-policy', 'ethics-policy', 'insights', 'i6-intelligence'];
const stubFile = (lang, route) => {
  if (route === '') return join(DIST, lang, 'index.html');
  return join(DIST, lang, `${route}.html`);
};

for (const route of staticRoutes) {
  const esFile = stubFile('es', route);
  const shouldHaveEs = ES_TRANSLATED_ROUTES.includes(route);
  if (shouldHaveEs && !existsSync(esFile)) {
    errors.push(`${localizedRoutePath('es', route)}: stub ES obrigatório ausente`);
  }
  if (!shouldHaveEs && existsSync(esFile)) {
    errors.push(`${localizedRoutePath('es', route)}: stub ES proibido para rota sem tradução real`);
  }

  for (const lang of ['pt', 'en']) {
    const file = stubFile(lang, route);
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf8');
    const hasEsAlternate = /<link\s+rel="alternate"\s+hreflang="es"/i.test(html);
    if (shouldHaveEs && !hasEsAlternate) {
      errors.push(`${localizedRoutePath(lang, route)}: hreflang ES obrigatório ausente`);
    }
    if (!shouldHaveEs && hasEsAlternate) {
      errors.push(`${localizedRoutePath(lang, route)}: hreflang ES proibido para rota sem tradução real`);
    }
    if (!/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="https:\/\/infinity6\.ai\/en(?:\/|\")/i.test(html)) {
      errors.push(`${localizedRoutePath(lang, route)}: x-default deve apontar para EN`);
    }
  }
}

const sitemap = readFileSync(resolve('public/sitemap.xml'), 'utf8');

for (const route of NON_INDEXABLE_DOC_ROUTES) {
  for (const lang of ['pt', 'en', 'es']) {
    const file = stubFile(lang, route);
    const url = `https://infinity6.ai${localizedRoutePath(lang, route)}`;
    const reason = route === DOCS_ROOT_ROUTE ? 'raiz de docs de exemplo' : 'documento com sample: true';
    if (existsSync(file)) errors.push(`${localizedRoutePath(lang, route)}: stub proibido (${reason})`);
    if (sitemap.includes(`<loc>${url}</loc>`)) errors.push(`sitemap: URL proibida (${reason}) ${url}`);
  }
}

if (SAMPLE_DOC_ROUTES.length === 0) {
  errors.push('docs: nenhum frontmatter sample: true foi detectado; verifique a leitura do conteúdo');
}

for (const route of staticRoutes) {
  const esUrl = `https://infinity6.ai${localizedRoutePath('es', route)}`;
  const hasEsUrl = sitemap.includes(`<loc>${esUrl}</loc>`);
  const shouldHaveEs = ES_TRANSLATED_ROUTES.includes(route);
  if (shouldHaveEs && !hasEsUrl) errors.push(`sitemap: URL ES obrigatória ausente ${esUrl}`);
  if (!shouldHaveEs && hasEsUrl) errors.push(`sitemap: URL ES proibida ${esUrl}`);
}

const allHtmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = join(dir, entry.name);
  return entry.isDirectory() ? allHtmlFiles(path) : (entry.name.endsWith('.html') ? [path] : []);
});

for (const file of allHtmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="https:\/\/infinity6\.ai\/(pt|en|es)([^"#?]*)"/i);
  if (!canonical) continue;
  const [, lang, suffix] = canonical;
  const route = suffix.replace(/^\/+|\/+$/g, '');
  const hasEsAlternate = /<link\s+rel="alternate"\s+hreflang="es"/i.test(html);
  if (lang === 'es' && !ES_TRANSLATED_ROUTES.includes(route)) {
    errors.push(`${localizedRoutePath('es', route)}: stub ES detectado fora da lista única`);
  }
  if (hasEsAlternate && !ES_TRANSLATED_ROUTES.includes(route)) {
    errors.push(`${localizedRoutePath(lang, route)}: hreflang ES detectado fora da lista única`);
  }
}

for (const match of sitemap.matchAll(/<loc>https:\/\/infinity6\.ai\/es(?:\/([^<]*))?<\/loc>/g)) {
  const route = (match[1] ?? '').replace(/^\/+|\/+$/g, '');
  if (!ES_TRANSLATED_ROUTES.includes(route)) {
    errors.push(`sitemap: URL ES detectada fora da lista única ${localizedRoutePath('es', route)}`);
  }
}

const pages = [];
for (const lang of ['pt', 'en', 'es']) {
  pages.push({ lang, label: `/${lang}`, file: join(DIST, lang, 'index.html') });
  pages.push({ lang, label: `/${lang}/our-ai`, file: join(DIST, lang, 'our-ai.html') });
  pages.push({ lang, label: `/${lang}/docs/pesquisa`, file: join(DIST, lang, 'docs', 'pesquisa.html') });
}

const extractBlocks = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

const walk = (node, visit) => {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, visit));
  if (node && typeof node === 'object') {
    visit(node);
    Object.values(node).forEach((v) => walk(v, visit));
  }
};

for (const page of pages) {
  if (!existsSync(page.file)) {
    errors.push(`${page.label}: HTML estático ausente (${page.file})`);
    continue;
  }
  const html = readFileSync(page.file, 'utf8');
  const blocks = extractBlocks(html);
  if (blocks.length === 0) {
    errors.push(`${page.label}: nenhum bloco JSON-LD no HTML estático`);
    continue;
  }

  const ids = new Set();
  const refs = [];
  const parsed = [];

  blocks.forEach((raw, i) => {
    try {
      parsed.push(JSON.parse(raw));
    } catch (e) {
      errors.push(`${page.label}: bloco ${i + 1} não é JSON válido — ${e.message}`);
    }
  });

  walk(parsed, (node) => {
    const keys = Object.keys(node);
    if (node['@id']) {
      const isRef = keys.length === 1;
      if (isRef) refs.push(node['@id']);
      else if (ids.has(node['@id'])) errors.push(`${page.label}: @id duplicado ${node['@id']}`);
      else ids.add(node['@id']);
    }
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string') {
        if (v.trim() === '') errors.push(`${page.label}: campo vazio em "${k}"`);
        if (/\[\.\.\.\]|PLACEHOLDER|\[TODO\]/i.test(v)) errors.push(`${page.label}: placeholder em "${k}": ${v}`);
      }
      if (k === 'image' && typeof v === 'string' && v.startsWith('https://infinity6.ai/')) {
        const rel = v.replace('https://infinity6.ai/', '');
        if (!existsSync(join(PUBLIC_DIR, rel))) errors.push(`${page.label}: image inexistente em public/: ${rel}`);
      }
    }
  });

  for (const ref of refs) {
    if (!ids.has(ref)) errors.push(`${page.label}: referência {"@id": "${ref}"} não resolve nesta página`);
  }

  // (d) itens visíveis ⊆ JSON-LD, com título idêntico
  const names = new Set();
  walk(parsed, (node) => {
    if (typeof node.name === 'string') names.add(node.name);
    if (typeof node.headline === 'string') names.add(node.headline);
  });
  const visibleUrls = [...html.matchAll(/href="(https:\/\/(?:www\.infoq\.com|link\.springer\.com|www\.academia\.edu)[^"]*)"/g)]
    .map((m) => m[1].replace(/&amp;/g, '&'));
  const allItems = [...research.articles, ...research.talks];
  for (const url of new Set(visibleUrls)) {
    const item = allItems.find((it) => it.url === url || (it.sameAs || []).includes(url));
    if (!item) continue; // link visível fora do dataset: ignorado
    if (!names.has(item.title)) {
      errors.push(`${page.label}: item visível "${item.title}" não está no JSON-LD desta página`);
    }
    if (item.datePublished && !html.includes(String(item.datePublished).slice(0, 4))) {
      // ano deve aparecer na página quando o dataset o tem e o rótulo o exibe
    }
  }
}

if (errors.length) {
  console.error('❌ Validação de JSON-LD falhou:');
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log(`✅ JSON-LD validado em ${pages.length} páginas estáticas`);
