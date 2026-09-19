import raw from './research.json';
import type { Language } from '@/types/language';

/**
 * Fonte única da produção científica e técnica (artigos + palestras).
 * Os dados vivem em research.json para que o gerador de JSON-LD estático
 * (scripts/lib/jsonld-people-research.mjs, em Node) leia exatamente o mesmo arquivo.
 * Títulos, eventos, anos e links NÃO são traduzidos.
 */

export interface ResearchArticle {
  slug: string;
  kind: 'chapter' | 'conference' | 'thesis';
  /** true só para as publicações revisadas por pares exibidas em /our-ai. */
  showOnOurAI: boolean;
  venueShort: string;
  linkLabel: 'springer' | 'paper';
  title: string;
  datePublished: string | null;
  inLanguage: string;
  pagination?: string | null;
  publisher?: string;
  doi?: string;
  authors?: string[];
  advisor?: string;
  institution?: string;
  department?: string;
  inSupportOf?: string;
  reference?: string;
  referenceByLang?: Record<string, string>;
  isPartOf?: {
    type: string;
    name: string;
    volumeNumber?: string;
    series?: string;
    isbn?: string;
    publisher?: string;
  };
  url: string;
}

export interface ResearchTalk {
  slug: string;
  title: string;
  datePublished: string;
  event: string;
  coAuthors?: string[];
  url: string;
}

export const researchArticles = raw.articles as ResearchArticle[];
export const researchTalks = raw.talks as ResearchTalk[];
export const talkGenre = raw.genre as Record<Language, string>;
export const talkPublisher = raw.talkPublisher as string;
export const kindLabels = raw.kindLabels as Record<string, Record<string, string>>;
export const linkLabels = raw.linkLabels as Record<string, Record<string, string>>;

export const findArticle = (slug: string) =>
  researchArticles.find((a) => a.slug === slug);
export const findTalk = (slug: string) => researchTalks.find((t) => t.slug === slug);

/** Publicações revisadas por pares da seção 04 de /our-ai, mais recente primeiro. */
export const ourAIPublications = researchArticles
  .filter((a) => a.showOnOurAI)
  .sort((a, b) => Number(b.datePublished) - Number(a.datePublished));

/** Rótulo "<TIPO> · <VEÍCULO> · <ANO>". */
export const articleBadge = (a: ResearchArticle, lang: string) =>
  `${(kindLabels[lang] ?? kindLabels.pt)[a.kind]} · ${a.venueShort} · ${a.datePublished}`;

/** Linha de referência: neutra para artigos, por idioma para a dissertação. */
export const articleReference = (a: ResearchArticle, lang: string) =>
  a.referenceByLang?.[lang] ?? a.referenceByLang?.pt ?? a.reference ?? '';

export const articleLinkLabel = (a: ResearchArticle, lang: string) =>
  (linkLabels[lang] ?? linkLabels.pt)[a.linkLabel];

/** Rótulo visível das palestras: "InfoQ Brasil · <evento>". */
export const talkVenueLabel = (talk: ResearchTalk) => `${talkPublisher} · ${talk.event}`;
