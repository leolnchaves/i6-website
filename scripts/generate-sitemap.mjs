#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ES_TRANSLATED_ROUTES,
  languagesForRoute,
  localizedRoutePath,
} from './lib/seo-route-config.mjs';

const BASE_URL = 'https://infinity6.ai';
const SITEMAP_PATH = resolve('public/sitemap.xml');
const source = readFileSync(SITEMAP_PATH, 'utf8');
const urlBlocks = [...source.matchAll(/\s*<url>[\s\S]*?<\/url>/g)].map((match) => match[0].trim());
const blockSpans = [...source.matchAll(/\s*<url>[\s\S]*?<\/url>/g)];

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
const normalizedBlocks = [];

for (const originalBlock of urlBlocks) {
  const location = blockLocation(originalBlock);
  if (!location) {
    normalizedBlocks.push(originalBlock);
    continue;
  }
  const route = routeFromUrl(location);
  const lang = languageFromUrl(location);
  if (lang === 'es' && !ES_TRANSLATED_ROUTES.includes(route)) continue;

  const block = ES_TRANSLATED_ROUTES.includes(route)
    ? normalizeAlternates(originalBlock, route)
    : stripSpanishAlternate(originalBlock);
  normalizedBlocks.push(block);
  if (lang) seen.set(`${lang}:${route}`, true);
}

for (const route of ES_TRANSLATED_ROUTES) {
  for (const lang of languagesForRoute(route)) {
    if (!seen.has(`${lang}:${route}`)) normalizedBlocks.push(createBlock(lang, route));
  }
}

const firstStart = blockSpans[0]?.index;
const last = blockSpans.at(-1);
if (firstStart === undefined || !last) throw new Error('sitemap.xml não contém blocos <url>');
const lastEnd = (last.index ?? 0) + last[0].length;
const output = `${source.slice(0, firstStart)}\n${normalizedBlocks.join('\n')}\n${source.slice(lastEnd)}`;
writeFileSync(SITEMAP_PATH, output, 'utf8');
console.log(`✅ Sitemap sincronizado com ${ES_TRANSLATED_ROUTES.length} rotas traduzidas em ES`);