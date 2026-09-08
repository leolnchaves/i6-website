import type { Language } from '@/types/language';

/**
 * Produtos do i6 Decision Suite.
 *
 * Substituem as âncoras da antiga página /solutions: quando um item de conteúdo
 * (alavanca de case, `related_product` de pesquisa) aponta para um destes
 * slugs, o site linka para a página do produto no i6 Decision Suite.
 *
 * `url: null` = destino ainda não publicado. Nesse caso o consumidor deve
 * renderizar texto sem link (degradação segura) — nunca um href vazio.
 */
export type DecisionSuiteProductSlug =
  | 'relevance'
  | 'targeting'
  | 'assortment'
  | 'forecasting'
  | 'sales-planning'
  | 'pricing';

export interface DecisionSuiteProduct {
  slug: DecisionSuiteProductSlug;
  label: Record<Language, string>;
  /** URL absoluta da página do produto no i6 Decision Suite, ou null. */
  url: string | null;
}

export const DECISION_SUITE_PRODUCTS: Record<DecisionSuiteProductSlug, DecisionSuiteProduct> = {
  relevance: {
    slug: 'relevance',
    label: { pt: 'Relevância', en: 'Relevance', es: 'Relevancia' },
    url: null,
  },
  targeting: {
    slug: 'targeting',
    label: { pt: 'Targeting', en: 'Targeting', es: 'Targeting' },
    url: null,
  },
  assortment: {
    slug: 'assortment',
    label: { pt: 'Sortimento', en: 'Assortment', es: 'Surtido' },
    url: null,
  },
  forecasting: {
    slug: 'forecasting',
    label: { pt: 'Previsão de demanda', en: 'Forecasting', es: 'Previsión de demanda' },
    url: null,
  },
  'sales-planning': {
    slug: 'sales-planning',
    label: { pt: 'Planejamento de vendas', en: 'Sales Planning', es: 'Planificación de ventas' },
    url: null,
  },
  pricing: {
    slug: 'pricing',
    label: { pt: 'Precificação', en: 'Pricing', es: 'Precificación' },
    url: null,
  },
};

/**
 * Nomes antigos de alavanca (territórios da extinta /solutions) mapeados para
 * os produtos equivalentes do Decision Suite.
 */
const LEGACY_ALIASES: Record<string, DecisionSuiteProductSlug> = {
  growth: 'relevance',
  planning: 'forecasting',
  pricing: 'pricing',
};

const isProductSlug = (value: string): value is DecisionSuiteProductSlug =>
  Object.prototype.hasOwnProperty.call(DECISION_SUITE_PRODUCTS, value);

/** Resolve um valor de conteúdo para um produto conhecido, ou null. */
export const resolveDecisionSuiteProduct = (
  value?: string | null
): DecisionSuiteProduct | null => {
  if (!value) return null;
  const key = value.trim().toLowerCase();
  if (isProductSlug(key)) return DECISION_SUITE_PRODUCTS[key];
  const alias = LEGACY_ALIASES[key];
  return alias ? DECISION_SUITE_PRODUCTS[alias] : null;
};

/** URL do produto correspondente, ou null quando desconhecido/sem destino. */
export const getDecisionSuiteProductUrl = (value?: string | null): string | null =>
  resolveDecisionSuiteProduct(value)?.url ?? null;
