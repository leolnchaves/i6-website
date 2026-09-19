#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ES_TRANSLATED_ROUTES,
  NON_INDEXABLE_DOC_ROUTES,
  languagesForRoute,
  localizedRoutePath,
} from './lib/seo-route-config.mjs';

const BASE_URL = 'https://infinity6.ai';
const SITEMAP_PATH = resolve('public/sitemap.xml');
const source = readFileSync(SITEMAP_PATH, 'utf8');

const routeFromUrl = (value) => {
  const pathname = new URL(value).pathname.replace(/\/$/, '');
  return pathname.replace(/^\/(?:en|pt|es)(?:\/|$)/, '');
};

const languageFromUrl = (value) => new URL(value).pathname.match(/^\/(en|pt|es)(?:\/|$)/)?.[1];

const blockLocation = (block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1];

const stripSpanishAlternate = (block) =>
  block.replace(/\s*<xhtml:link\s+rel="alternate"\s+hreflang="es"[^>]*\/>/g, '');

const alternateTags = (route) => {
  const langs = languagesForRoute(route);
  return [
    ...langs.map((lang) => {
      const hreflang = lang === 'pt' ? 'pt-BR' : lang;
      return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${BASE_URL}${localizedRoutePath(lang, route)}"/>`;
    }),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${localizedRoutePath('en', route)}"/>`,
  ].join('\n');
};

const normalizeAlternates = (block, route) => {
  const withoutAlternates = block.replace(/\s*<xhtml:link\s+rel="alternate"[^>]*\/>/g, '');
  return withoutAlternates.replace(/\s*<\/url>$/, `\n${alternateTags(route)}\n  </url>`);
};

const createBlock = (lang, route) => `  <url>
    <loc>${BASE_URL}${localizedRoutePath(lang, route)}</loc>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.7'}</priority>
${alternateTags(route)}
  </url>`;

const seen = new Map();
let output = source.replace(/\s*<url>[\s\S]*?<\/url>/g, (originalBlock) => {
  const leading = originalBlock.match(/^\s*/)?.[0] ?? '';
  const block = originalBlock.trim();
  const location = blockLocation(block);
  if (!location) return originalBlock;
  const route = routeFromUrl(location);
  const lang = languageFromUrl(location);
  if (NON_INDEXABLE_DOC_ROUTES.includes(route)) return '';
  if (lang === 'es' && !ES_TRANSLATED_ROUTES.includes(route)) return '';

  if (lang) seen.set(`${lang}:${route}`, true);
  const normalized = ES_TRANSLATED_ROUTES.includes(route)
    ? normalizeAlternates(block, route)
    : stripSpanishAlternate(block);
  return `${leading}${normalized}`;
});

const additions = [];
for (const route of ES_TRANSLATED_ROUTES) {
  for (const lang of languagesForRoute(route)) {
    if (!seen.has(`${lang}:${route}`)) additions.push(createBlock(lang, route));
  }
}

if (additions.length) {
  output = output.replace('</urlset>', `\n  <!-- Rotas com tradução real em espanhol -->\n${additions.join('\n')}\n\n</urlset>`);
}
writeFileSync(SITEMAP_PATH, output, 'utf8');
console.log(`✅ Sitemap sincronizado com ${ES_TRANSLATED_ROUTES.length} rotas traduzidas em ES`);