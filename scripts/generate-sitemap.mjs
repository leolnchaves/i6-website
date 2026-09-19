#!/usr/bin/env node
/**
 * Gera public/sitemap.xml inteiramente a partir de:
 *   - a lista de páginas fixas abaixo (com hreflang segundo seo-route-config)
 *   - o coletor único de conteúdo (scripts/lib/content-collector.mjs)
 *
 * Nada mais escreve no sitemap: nem o sync do i6 HUB, nem edição manual.
 * Os lastmod já existentes para uma URL são preservados; itens editoriais
 * usam a data do frontmatter quando houver.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  isNonIndexableRoute,
  languagesForRoute,
  localizedRoutePath,
} from './lib/seo-route-config.mjs';
import { collectContent, languagesByRoute } from './lib/content-collector.mjs';

const BASE_URL = 'https://infinity6.ai';
const SITEMAP_PATH = resolve('public/sitemap.xml');

// Páginas fixas do site. Ordem preservada na saída.
const STATIC_ROUTES = [
  { route: '', changefreq: 'weekly', priority: '1.0' },
  { route: 'our-ai', changefreq: 'monthly', priority: '0.9' },
  { route: 'i6-builders', changefreq: 'monthly', priority: '0.9' },
  { route: 'success-stories', changefreq: 'monthly', priority: '0.8' },
  { route: 'insights', changefreq: 'weekly', priority: '0.8' },
  { route: 'i6-blog', changefreq: 'weekly', priority: '0.8' },
  { route: 'i6-intelligence', changefreq: 'weekly', priority: '0.8' },
  { route: 'community', changefreq: 'monthly', priority: '0.6' },
  { route: 'contact', changefreq: 'monthly', priority: '0.7' },
  { route: 'privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { route: 'ethics-policy', changefreq: 'yearly', priority: '0.3' },
];

// lastmod já publicados — preservados por URL.
const previousLastmod = new Map();
if (existsSync(SITEMAP_PATH)) {
  const previous = readFileSync(SITEMAP_PATH, 'utf8');
  const blocks = previous.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (loc && lastmod) previousLastmod.set(loc, lastmod);
  }
}

const hreflangOf = (lang) => (lang === 'pt' ? 'pt-BR' : lang);

const alternateTags = (route, langs) => [
  ...langs.map((lang) =>
    `    <xhtml:link rel="alternate" hreflang="${hreflangOf(lang)}" href="${BASE_URL}${localizedRoutePath(lang, route)}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${localizedRoutePath('en', route)}"/>`,
].join('\n');

const urlBlock = ({ lang, route, changefreq, priority, lastmod, langs }) => {
  const loc = `${BASE_URL}${localizedRoutePath(lang, route)}`;
  const finalLastmod = previousLastmod.get(loc) || lastmod;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...(finalLastmod ? [`    <lastmod>${finalLastmod}</lastmod>`] : []),
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    alternateTags(route, langs),
    '  </url>',
  ].join('\n');
};

const blocks = [];

for (const { route, changefreq, priority } of STATIC_ROUTES) {
  if (isNonIndexableRoute(route)) continue;
  const langs = languagesForRoute(route);
  for (const lang of langs) {
    blocks.push(urlBlock({ lang, route, changefreq, priority, langs }));
  }
}

const items = collectContent();
const routeLangs = languagesByRoute(items);
const priorityByKind = {
  doc: '0.7',
  story: '0.7',
  intelligence: '0.7',
  insight: '0.6',
};

for (const item of items) {
  if (isNonIndexableRoute(item.route)) continue;
  blocks.push(urlBlock({
    lang: item.lang,
    route: item.route,
    changefreq: 'monthly',
    priority: priorityByKind[item.kind] || '0.6',
    lastmod: item.date,
    langs: [...routeLangs.get(item.route)].sort((a, b) => ['en', 'pt', 'es'].indexOf(a) - ['en', 'pt', 'es'].indexOf(b)),
  }));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>
`;

writeFileSync(SITEMAP_PATH, xml, 'utf8');
console.log(`✅ Sitemap gerado com ${blocks.length} URLs (${items.length} itens de conteúdo)`);
