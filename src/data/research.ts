import raw from './research.json';
import type { Language } from '@/types/language';

/**
 * Fonte única da produção científica e técnica (artigos + palestras).
 * Os dados vivem em research.json para que o gerador de JSON-LD estático
 * (scripts/prerender-seo-stubs.mjs, em Node) leia exatamente o mesmo arquivo.
 * Títulos, eventos, anos e links NÃO são traduzidos.
 */

export interface ResearchArticle {
  slug: string;
  title: string;
  datePublished: string | null;
  inLanguage: string;
  pagination?: string | null;
  volumeNumber?: string | null;
  publisher?: string;
  isPartOf?: { type: string; name: string; volumeNumber?: string; series?: string };
  url: string;
  sameAs?: string[];
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

export const findArticle = (slug: string) =>
  researchArticles.find((a) => a.slug === slug);
export const findTalk = (slug: string) => researchTalks.find((t) => t.slug === slug);

/** Rótulo visível das palestras: "InfoQ Brasil · <evento>". */
export const talkVenueLabel = (talk: ResearchTalk) => `${talkPublisher} · ${talk.event}`;
