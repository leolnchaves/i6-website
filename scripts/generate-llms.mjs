#!/usr/bin/env node
/**
 * Gera public/llms.txt = public/llms.base.txt (seções fixas, manuais)
 * + seções de conteúdo publicado, derivadas do coletor único.
 *
 * Este script é o ÚNICO escritor de public/llms.txt. Nem o sync do i6 HUB
 * nem edição manual devem tocar no arquivo final.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectContent } from './lib/content-collector.mjs';

const BASE_PATH = resolve('public/llms.base.txt');
const OUT_PATH = resolve('public/llms.txt');
const PLACEHOLDER = '{{GENERATED_CONTENT}}';

const LANG_LABEL = { pt: 'PT', en: 'EN', es: 'ES' };

// Ordem e títulos das seções geradas.
const SECTIONS = [
  { type: 'i6 Deep Research', heading: 'i6 Intelligence — deep research' },
  { type: 'i6 eBook', heading: 'i6 Intelligence — eBooks' },
  { type: 'i6 Blog', heading: 'i6 Blog — articles' },
  { type: 'i6 on Media', heading: 'i6 On Media' },
  { type: 'i6 Social', heading: 'i6 Social' },
  { type: 'Success Story', heading: 'Success stories' },
];

const items = collectContent();

/**
 * Resumo neutro: descarta qualquer frase com número (estatística vinda do corpo
 * do artigo) e devolve só a primeira frase descritiva restante.
 */
const neutralSummary = (summary = '') => {
  const sentences = String(summary)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !/\d/.test(s) && !/%/.test(s));
  return sentences[0] || '';
};

// Cases não levam resumo: o descritivo combina setor, porte e região e pode
// identificar o cliente, que é sempre anonimizado.
const TYPES_WITHOUT_SUMMARY = new Set(['Success Story']);

const line = (item) => {
  const label = `${item.title} (${LANG_LABEL[item.lang] || item.lang.toUpperCase()})`;
  const date = item.date ? ` — ${item.date}` : '';
  const summary = TYPES_WITHOUT_SUMMARY.has(item.type) ? '' : neutralSummary(item.summary);
  return summary
    ? `- [${label}](${item.url})${date}: ${summary}`
    : `- [${label}](${item.url})${date}`;
};

const sortItems = (list) =>
  [...list].sort((a, b) => {
    const byDate = String(b.date || '').localeCompare(String(a.date || ''));
    if (byDate !== 0) return byDate;
    const byTitle = a.title.localeCompare(b.title);
    return byTitle !== 0 ? byTitle : a.lang.localeCompare(b.lang);
  });

const blocks = [];
for (const section of SECTIONS) {
  const list = items.filter((item) => item.type === section.type);
  if (!list.length) continue;
  blocks.push(`### ${section.heading}\n\n${sortItems(list).map(line).join('\n')}`);
}

const generated = blocks.length
  ? `## Published content (generated at build time)\n\n${blocks.join('\n\n')}`
  : '';

const base = readFileSync(BASE_PATH, 'utf8');
if (!base.includes(PLACEHOLDER)) {
  throw new Error(`[generate-llms] ${PLACEHOLDER} não encontrado em public/llms.base.txt`);
}

writeFileSync(OUT_PATH, base.replace(PLACEHOLDER, generated), 'utf8');
console.log(`✅ llms.txt gerado com ${items.length} itens publicados em ${blocks.length} seções`);
