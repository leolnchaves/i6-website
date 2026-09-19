/**
 * Coletor único de conteúdo editorial.
 *
 * Fonte compartilhada por:
 *   - scripts/generate-llms.mjs   (public/llms.txt)
 *   - scripts/generate-sitemap.mjs (public/sitemap.xml)
 *   - scripts/prerender-seo-stubs.mjs (stubs estáticos em dist/)
 *   - scripts/validate-jsonld.mjs (paridade entre os três)
 *
 * Regras de elegibilidade (um item só é indexável se passar em TODAS):
 *   - não é draft (draft: true) nem published: false
 *   - não é sample: true nem hidden: true
 *   - slug não casa com NON_INDEXABLE_SLUG_PATTERNS (ex.: demo-*)
 *   - tem title, slug, language e rota conhecida
 *
 * Frontmatter inválido (campo obrigatório ausente em item não excluído)
 * quebra o build informando arquivo e campo.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { isNonIndexableSlug } from './seo-route-config.mjs';

export const BASE_URL = 'https://infinity6.ai';

const INSIGHTS_DIR = resolve('src/content/insights');
const INTELLIGENCE_DIR = resolve('src/content/intelligence');
const DOCS_DIR = resolve('src/content/docs');
const PUBLIC_CONTENT = resolve('public/content');

// Tipo de insight -> segmento de rota (espelha o router React)
const INSIGHT_ROUTE = {
  'i6 Article': 'i6-blog',
  'i6 eBook': 'i6-intelligence',
  'i6 on Media': 'insights',
  'i6 Social': 'insights',
};

const INSIGHT_LABEL = {
  'i6 Article': 'i6 Blog',
  'i6 eBook': 'i6 eBook',
  'i6 on Media': 'i6 on Media',
  'i6 Social': 'i6 Social',
};

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fmBlock, content] = match;
  const data = {};
  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === '' || value === 'null') data[key] = null;
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value;
  }
  return { data, content: content.trim() };
}

/** Resumo de uma linha: sem markdown, sem quebras de linha. */
export function toOneLine(raw, maxLength = 220) {
  if (!raw) return '';
  let text = String(raw)
    .replace(/\r\n|\n|\r/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/^#+\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length > maxLength) {
    text = `${text.slice(0, maxLength - 1).replace(/[\s,.;:–-]+$/, '')}…`;
  }
  return text;
}

const isExcluded = (fm) =>
  fm.draft === true
  || fm.published === false
  || fm.sample === true
  || fm.hidden === true
  || isNonIndexableSlug(fm.slug || '');

const fail = (file, message) => {
  throw new Error(`[content-collector] ${file}: ${message}`);
};

function readMarkdownDir(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => ({ file, raw: readFileSync(join(dir, file), 'utf8') }));
}

function collectInsights() {
  const items = [];
  for (const { file, raw } of readMarkdownDir(INSIGHTS_DIR)) {
    const { data: fm } = parseFrontmatter(raw);
    if (isExcluded(fm)) continue;
    if (!fm.type || !INSIGHT_ROUTE[fm.type]) continue; // tipo desconhecido não é publicável
    if (!fm.title) fail(file, 'campo obrigatório ausente: title');
    if (!fm.slug) fail(file, 'campo obrigatório ausente: slug');
    if (!fm.language) fail(file, 'campo obrigatório ausente: language');
    if (!fm.date) fail(file, 'campo obrigatório ausente: date');
    const lang = String(fm.language);
    if (!['en', 'pt', 'es'].includes(lang)) fail(file, `language inválido: ${lang}`);
    items.push({
      kind: 'insight',
      type: INSIGHT_LABEL[fm.type],
      segment: INSIGHT_ROUTE[fm.type],
      lang,
      slug: String(fm.slug),
      title: String(fm.title),
      summary: toOneLine(fm.excerpt),
      date: String(fm.date),
      image: fm.cover_image ? String(fm.cover_image) : undefined,
      sourceFile: file,
    });
  }
  return items;
}

function collectIntelligence() {
  const items = [];
  for (const { file, raw } of readMarkdownDir(INTELLIGENCE_DIR)) {
    const { data: fm, content } = parseFrontmatter(raw);
    if (isExcluded(fm)) continue;
    if (!fm.title) fail(file, 'campo obrigatório ausente: title');
    if (!fm.slug) fail(file, 'campo obrigatório ausente: slug');
    if (!fm.language) fail(file, 'campo obrigatório ausente: language');
    if (!fm.date) fail(file, 'campo obrigatório ausente: date');
    const lang = String(fm.language);
    if (!['en', 'pt', 'es'].includes(lang)) fail(file, `language inválido: ${lang}`);
    items.push({
      kind: 'intelligence',
      type: 'i6 Deep Research',
      segment: 'i6-intelligence',
      lang,
      slug: String(fm.slug),
      title: String(fm.title),
      summary: toOneLine(fm.excerpt),
      date: String(fm.date),
      image: fm.cover_image ? String(fm.cover_image) : undefined,
      body: content,
      sourceFile: file,
    });
  }
  return items;
}

// Success stories vivem em public/content/page-success-stories-{lang}.md
function parseStories(content) {
  const stories = [];
  for (const section of content.split('---').map((s) => s.trim()).filter(Boolean)) {
    const story = {};
    for (const line of section.split('\n').map((l) => l.trim()).filter(Boolean)) {
      if (line.startsWith('## ')) story.title = line.substring(3).trim();
      else if (line.startsWith('**Slug:**')) story.slug = line.substring(9).trim();
      else if (line.startsWith('**Image:**')) story.image = line.substring(10).trim();
      else if (line.startsWith('**Segment:**')) story.segment = line.substring(12).trim();
      else if (line.startsWith('**Client:**')) story.client = line.substring(11).trim();
      else if (line.startsWith('**Description:**')) story.description = line.substring(16).trim();
      else if (line.startsWith('**Challenge:**')) story.challenge = line.substring(14).trim();
      else if (line.startsWith('**Quote:**')) story.quote = line.substring(10).trim();
    }
    if (story.title && story.slug) stories.push(story);
  }
  return stories;
}

function collectStories() {
  const items = [];
  for (const lang of ['en', 'pt']) {
    const file = join(PUBLIC_CONTENT, `page-success-stories-${lang}.md`);
    if (!existsSync(file)) continue;
    for (const story of parseStories(readFileSync(file, 'utf8'))) {
      if (isNonIndexableSlug(story.slug)) continue;
      items.push({
        kind: 'story',
        type: 'Success Story',
        segment: 'success-stories',
        lang,
        slug: story.slug,
        title: story.title,
        summary: toOneLine(story.description || story.challenge || story.quote),
        date: undefined,
        image: story.image,
        story,
        sourceFile: `page-success-stories-${lang}.md`,
      });
    }
  }
  return items;
}

// Documentação: só páginas gerenciadas pelo site (sem sample/hidden) entram nos artefatos de SEO.
function collectDocs() {
  const items = [];
  for (const { file, raw } of readMarkdownDir(DOCS_DIR)) {
    const { data: fm } = parseFrontmatter(raw);
    if (isExcluded(fm)) continue;
    if (!fm.slug) fail(file, 'campo obrigatório ausente: slug');
    if (!fm.title) fail(file, 'campo obrigatório ausente: title');
    if (!fm.language) fail(file, 'campo obrigatório ausente: language');
    const lang = String(fm.language);
    if (!['en', 'pt', 'es'].includes(lang)) fail(file, `language inválido: ${lang}`);
    items.push({
      kind: 'doc',
      type: 'Docs',
      segment: 'docs',
      lang,
      slug: String(fm.slug),
      title: String(fm.title),
      summary: toOneLine(fm.excerpt || fm.description),
      date: fm.date ? String(fm.date) : undefined,
      sourceFile: file,
    });
  }
  return items;
}

/** Itens elegíveis, com rota/URL absoluta, validados contra duplicidade. */
export function collectContent() {
  const items = [
    ...collectInsights(),
    ...collectIntelligence(),
    ...collectStories(),
    ...collectDocs(),
  ].map((item) => {
    const path = `/${item.lang}/${item.segment}/${item.slug}`;
    return { ...item, path, url: `${BASE_URL}${path}`, route: `${item.segment}/${item.slug}` };
  });

  const seen = new Map();
  for (const item of items) {
    if (seen.has(item.url)) {
      throw new Error(
        `[content-collector] slug duplicado: ${item.url} (${seen.get(item.url)} e ${item.sourceFile})`,
      );
    }
    seen.set(item.url, item.sourceFile);
  }
  return items;
}

/** Idiomas em que uma rota editorial existe, conforme os arquivos coletados. */
export function languagesByRoute(items = collectContent()) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.route)) map.set(item.route, new Set());
    map.get(item.route).add(item.lang);
  }
  return map;
}
