import type { ContentLang } from '@/utils/localizedPath';
import type { Language } from '@/types/language';

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
 *  - Landings (resolved by slug from frontmatter `stats` in the future)
 *  - JSON-LD `Statistic` (Organization on Home) and `QuantitativeValue` (Service on landings)
 */
export const realResults: RealResultKPI[] = [
  {
    slug: 'savings-pharma',
    value: { pt: 'R$ 100 mi', en: 'BRL 100 mi', es: 'BRL 100 mi' },
    label: {
      pt: 'em perdas evitadas por incineração em um ano',
      en: 'in losses avoided from incineration in one year',
      es: 'en pérdidas evitadas por incineración en un año',
    },
    source: { pt: 'Varejo farma', en: 'Pharma retail' },
    numericValue: 100,
    unitText: 'BRL million',
  },
  {
    slug: 'ticket-retail',
    value: { pt: '+23%', en: '+23%', es: '+23%' },
    label: { pt: 'ticket médio por PDV', en: 'average ticket per POS' },
    source: { pt: 'Varejo', en: 'Retail' },
    numericValue: 23,
    unitText: 'percent',
  },
  {
    slug: 'activation-retail',
    value: { pt: '+36%', en: '+36%', es: '+36%' },
    label: { pt: 'positivação de produtos', en: 'product activation' },
    source: { pt: 'Varejo', en: 'Retail' },
    numericValue: 36,
    unitText: 'percent',
  },
  {
    slug: 'crm-finance',
    value: { pt: '−57%', en: '−57%', es: '−57%' },
    label: {
      pt: 'custo de mensageria, com disparos direcionados',
      en: 'messaging cost, with targeted sends',
      es: 'costo de mensajería, con envíos dirigidos',
    },
    source: { pt: 'Financeiro', en: 'Financial services' },
    numericValue: -57,
    unitText: 'percent',
  },
  {
    slug: 'conversion-finance',
    value: { pt: '12x', en: '12x', es: '12x' },
    label: {
      pt: 'mais conversão em campanhas do que a segmentação tradicional',
      en: 'more conversion in campaigns than traditional segmentation',
      es: 'más conversión en campañas que la segmentación tradicional',
    },
    source: { pt: 'Financeiro', en: 'Financial services' },
    numericValue: 12,
    unitText: 'multiplier',
  },
  {
    slug: 'sales-finance',
    value: { pt: '+7,8 mi', en: '+7.8 mi', es: '+7,8 mi' },
    label: {
      pt: 'receita adicional em 2 semanas',
      en: 'additional revenue in 2 weeks',
      es: 'ingresos adicionales en 2 semanas',
    },
    source: { pt: 'Financeiro', en: 'Financial services', es: 'Financiero' },
    numericValue: 7.8,
    unitText: 'million',
  },
];
