import raw from './founders.json';
import type { Language } from '@/types/language';

/**
 * Fonte única dos fundadores usados em JSON-LD.
 * Os dados vivem em founders.json para que o gerador estático em Node
 * (scripts/prerender-seo-stubs.mjs) leia exatamente o mesmo arquivo.
 * Campos null são PLACEHOLDER e são omitidos do JSON-LD.
 */

export interface FounderCopy {
  pt: string;
  en: string;
  es: string;
}

export interface Founder {
  id: string;
  name: string;
  alternateName: string;
  jobTitle: FounderCopy;
  description: FounderCopy;
  sameAs: string[];
  scholar?: string | null;
  orcid?: string | null;
  award?: string | null;
  alumniOf: string[];
  image: string | null;
  imageCandidate: string;
  knowsAbout: Record<Language, string[]>;
}

export const founders = raw.founders as Founder[];

export const founderId = (id: string) => `https://infinity6.ai/#${id}`;

export const findFounder = (id: string) => founders.find((f) => f.id === id);
