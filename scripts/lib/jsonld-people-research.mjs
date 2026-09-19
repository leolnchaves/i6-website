/**
 * Geração de JSON-LD para pessoas (fundadores) e produção científica/técnica.
 *
 * Lê as MESMAS fontes que o site (src/data/founders.json e src/data/research.json),
 * para que página e JSON-LD nunca divirjam.
 *
 * Regras:
 * - valores null/ausentes são OMITIDOS (nunca string vazia, nunca "[...]");
 * - `image` só é emitida se o arquivo existir em public/ no momento do build;
 * - títulos, eventos, anos e links NÃO são traduzidos; só `genre` e os textos
 *   das pessoas variam por idioma.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

export const BASE_URL = 'https://infinity6.ai';
const PUBLIC_DIR = resolve('public');

const founders = JSON.parse(readFileSync(resolve('src/data/founders.json'), 'utf8')).founders;
const research = JSON.parse(readFileSync(resolve('src/data/research.json'), 'utf8'));

/** Serializa JSON-LD para dentro de <script>, escapando "<" como \u003c. */
export const serializeLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

/** Remove chaves com null/undefined/array vazio, recursivamente. */
function prune(value) {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const pv = prune(v);
      if (pv !== undefined) out[k] = pv;
    }
    return Object.keys(out).length ? out : undefined;
  }
  if (value === null || value === undefined || value === '') return undefined;
  return value;
}

const pick = (copy, lang) => (copy && (copy[lang] ?? copy.pt)) || undefined;

/** Nós Person dos dois fundadores, localizados. */
export function buildPersonNodes(lang) {
  return founders.map((f) => {
    const imagePath = f.image || f.imageCandidate;
    const hasImage = Boolean(imagePath) && existsSync(join(PUBLIC_DIR, imagePath.replace(/^\//, '')));
    return prune({
      '@type': 'Person',
      '@id': `${BASE_URL}/#${f.id}`,
      name: f.name,
      alternateName: f.alternateName,
      jobTitle: pick(f.jobTitle, lang),
      description: pick(f.description, lang),
      url: `${BASE_URL}/${lang}/our-ai`,
      worksFor: { '@id': `${BASE_URL}/#organization` },
      sameAs: [...(f.sameAs || []), f.scholar, f.orcid].filter(Boolean),
      alumniOf: (f.alumniOf || []).map((name) => ({ '@type': 'CollegeOrUniversity', name })),
      award: f.award || undefined,
      image: hasImage ? `${BASE_URL}${imagePath}` : undefined,
      knowsAbout: pick(f.knowsAbout, lang),
    });
  });
}

const EVERTON = { '@id': `${BASE_URL}/#everton-gago` };

function articleNode(a) {
  const isPartOf = a.isPartOf
    ? a.isPartOf.type === 'PublicationVolume'
      ? prune({
          '@type': 'PublicationVolume',
          name: a.isPartOf.name,
          volumeNumber: a.isPartOf.volumeNumber,
          isPartOf: a.isPartOf.series
            ? { '@type': 'BookSeries', name: a.isPartOf.series }
            : undefined,
        })
      : prune({ '@type': a.isPartOf.type, name: a.isPartOf.name })
    : undefined;

  return prune({
    '@type': 'ScholarlyArticle',
    '@id': `${BASE_URL}/#${a.slug}`,
    name: a.title,
    headline: a.title,
    author: EVERTON,
    datePublished: a.datePublished,
    inLanguage: a.inLanguage,
    pagination: a.pagination,
    publisher: a.publisher ? { '@type': 'Organization', name: a.publisher } : undefined,
    isPartOf,
    url: a.url,
    sameAs: a.sameAs,
  });
}

function talkNode(t, lang) {
  const coAuthors = (t.coAuthors || []).map((name) => ({ '@type': 'Person', name }));
  return prune({
    '@type': 'CreativeWork',
    '@id': `${BASE_URL}/#${t.slug}`,
    name: t.title,
    genre: research.genre[lang] || research.genre.pt,
    author: coAuthors.length ? [EVERTON, ...coAuthors] : EVERTON,
    datePublished: t.datePublished,
    publisher: { '@type': 'Organization', name: research.talkPublisher },
    isPartOf: { '@type': 'Event', name: t.event },
    url: t.url,
  });
}

/**
 * Nós de produção. `slugs` restringe a seleção (usado em /our-ai, onde só
 * 3 itens são visíveis) — os @id são os mesmos em qualquer página.
 */
export function buildResearchNodes(lang, slugs) {
  const wanted = (item) => !slugs || slugs.includes(item.slug);
  return [
    ...research.articles.filter(wanted).map(articleNode),
    ...research.talks.filter(wanted).map((t) => talkNode(t, lang)),
  ];
}

export const researchData = research;

/**
 * Reescreve, no bloco JSON-LD global herdado de index.html, os nós Person
 * (que vêm em português) com os textos do idioma da rota.
 */
export function localizeGlobalGraph(html, lang) {
  const re = /<script type="application\/ld\+json">\s*(\{[\s\S]*?"@graph"[\s\S]*?\})\s*<\/script>/;
  const match = html.match(re);
  if (!match) return html;
  let graph;
  try {
    graph = JSON.parse(match[1]);
  } catch {
    return html;
  }
  const persons = buildPersonNodes(lang);
  graph['@graph'] = graph['@graph'].map((node) => {
    if (node['@type'] !== 'Person' || !node['@id']) return node;
    return persons.find((p) => p['@id'] === node['@id']) || node;
  });
  const website = graph['@graph'].find((n) => n['@type'] === 'WebSite');
  if (website) website.inLanguage = ['pt-BR', 'en', 'es'];
  return html.replace(
    re,
    `<script type="application/ld+json">${serializeLd(graph)}</script>`,
  );
}
