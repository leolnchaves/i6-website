import raw from '@/data/realResults.json';
import type { ContentLang } from '@/utils/localizedPath';

/** Copy per language. Spanish falls back to Portuguese when absent. */
export type KpiCopy = Record<ContentLang, string> & { es?: string };

export interface RealResultKPI {
  slug: string;
  /** Display value formatted for each language */
  value: KpiCopy;
  /** Short label shown under the big number */
  label: KpiCopy;
  /** Sector / client tag in caption */
  source: KpiCopy;
  /** Optional numeric for JSON-LD Statistic (when expressible) */
  numericValue?: number;
  unitText?: string;
}

/**
 * Single source of truth for real, anonymized client KPIs reused across:
 *  - Home (RealResultsStrip)
 *  - /our-ai (RealResultsStrip)
 *  - JSON-LD Observation nodes no HTML estático (scripts/prerender-seo-stubs.mjs)
 *
 * Os valores vivem em src/data/realResults.json para que o gerador estático
 * (Node) leia exatamente o mesmo arquivo, sem duplicar números no script.
 */
export const realResults: RealResultKPI[] = raw as RealResultKPI[];
