import type { Language } from '@/types/language';

export interface RealResultKPI {
  slug: string;
  value: string;
  /** Short label shown under the big number */
  label: Record<Language, string>;
  /** Sector / client tag in caption */
  source: Record<Language, string>;
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
    value: 'R$ 100M',
    label: {
      pt: 'em savings ao antecipar ruptura, overstocking e incineração',
      en: 'in savings by anticipating stockouts, overstocking and incineration',
    },
    source: { pt: 'Varejo farma', en: 'Pharma retail' },
    numericValue: 100,
    unitText: 'BRL million',
  },
  {
    slug: 'ticket-retail',
    value: '+23%',
    label: { pt: 'ticket médio por PDV', en: 'average ticket per POS' },
    source: { pt: 'Varejo', en: 'Retail' },
    numericValue: 23,
    unitText: 'percent',
  },
  {
    slug: 'activation-retail',
    value: '+36%',
    label: { pt: 'positivação de produtos', en: 'product activation' },
    source: { pt: 'Varejo', en: 'Retail' },
    numericValue: 36,
    unitText: 'percent',
  },
  {
    slug: 'crm-finance',
    value: '−57%',
    label: { pt: 'custo de CRM', en: 'CRM cost' },
    source: { pt: 'Financeiro', en: 'Financial services' },
    numericValue: -57,
    unitText: 'percent',
  },
  {
    slug: 'conversion-finance',
    value: '12x',
    label: { pt: 'mais conversão em campanhas', en: 'more conversion in campaigns' },
    source: { pt: 'Financeiro', en: 'Financial services' },
    numericValue: 12,
    unitText: 'multiplier',
  },
  {
    slug: 'sales-fashion',
    value: '+2,6%',
    label: {
      pt: 'mais vendas que a curadoria humana de looks',
      en: 'more sales than human look curation',
    },
    source: { pt: 'Fashion', en: 'Fashion' },
    numericValue: 2.6,
    unitText: 'percent',
  },
];
