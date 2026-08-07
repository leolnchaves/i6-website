import type { KioskLang } from '@/data/kiosk/config';

// Bilingual dataset for the "Preço Orientado à Margem" / "Margin-Oriented Pricing" kiosk demo.

export type PriceAction = 'aumentar' | 'manter' | 'reduzir';

export interface CompetitorBand {
  min: number;
  max: number;
}

export interface AlternativeScenario {
  id: 'conservative' | 'recommended' | 'aggressive';
  labelPt: string;
  labelEn: string;
  price: number;
  marginPt: string;
  marginEn: string;
  volumePt: string;
  volumeEn: string;
}

export interface PriceMarginSku {
  id: string;
  namePt: string;
  nameEn: string;
  categoryPt: string; // display
  categoryEn: string; // display
  categoryId: string; // for filter matching
  channelId: string;
  regionId: string;
  action: PriceAction;
  volume: number; // un/wk
  elasticity: number;
  competitivePosition: 'below' | 'inline' | 'above';
  stockCoverDays: number;
  currentPrice: number;
  competitorPrice: number;
  competitorBand: CompetitorBand;
  optimalPrice: number;
  rangeMin: number;
  rangeMax: number;
  confidencePct: number;
  marginImpactPp: number;
  volumeImpactPct: number;
  argumentPt: string;
  argumentEn: string;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

export interface PipelineStep {
  labelPt: string;
  labelEn: string;
  microPt: string;
  microEn: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  { labelPt: 'Elasticidade',        labelEn: 'Elasticity',           microPt: 'Volume × preço histórico',            microEn: 'Volume × historical price',            durationMs: 900 },
  { labelPt: 'Projeção de demanda', labelEn: 'Demand projection',    microPt: 'Forecast + estoque + comercial',      microEn: 'Forecast + stock + commercial',        durationMs: 900 },
  { labelPt: 'Simulação de preço',  labelEn: 'Price simulation',     microPt: 'Milhares de cenários',                microEn: 'Thousands of scenarios',               durationMs: 950 },
  { labelPt: 'Restrições',          labelEn: 'Constraints',          microPt: 'Margem, estoque, banda, política',    microEn: 'Margin, stock, band, policy',          durationMs: 850 },
  { labelPt: 'Preço ótimo',         labelEn: 'Optimal price',        microPt: 'Faixa + confiança + alternativas',    microEn: 'Range + confidence + alternatives',    durationMs: 800 },
];

export const skus: PriceMarginSku[] = [
  {
    id: 'sku-1',
    namePt: 'Hidratante Facial 200ml',
    nameEn: 'Facial Moisturizer 200ml',
    categoryPt: 'Skincare',
    categoryEn: 'Skincare',
    categoryId: 'skincare',
    channelId: 'b2b',
    regionId: 'sudeste',
    action: 'aumentar',
    volume: 1840,
    elasticity: -0.42,
    competitivePosition: 'below',
    stockCoverDays: 58,
    currentPrice: 89.9,
    competitorPrice: 96.5,
    competitorBand: { min: 95, max: 99 },
    optimalPrice: 94.8,
    rangeMin: 93.4,
    rangeMax: 96.2,
    confidencePct: 91,
    marginImpactPp: 3.2,
    volumeImpactPct: -1.4,
    argumentPt:
      'Elasticidade baixa (−0,42) e preço abaixo da banda concorrente (R$ 95–99). Base recorrente não migrou em 3 reajustes anteriores. Modelo indica captura de margem sem risco relevante de volume.',
    argumentEn:
      'Low elasticity (−0.42) and price below the competitor band (R$ 95–99). The recurring customer base did not churn across the last 3 price adjustments. The model indicates margin capture with no significant volume risk.',
    alternatives: [
      { id: 'conservative', labelPt: 'Conservador', labelEn: 'Conservative', price: 93.4, marginPt: 'Maior', marginEn: 'Higher', volumePt: 'Queda mínima', volumeEn: 'Minimal drop' },
      { id: 'recommended',  labelPt: 'Recomendado', labelEn: 'Recommended', price: 94.8, marginPt: 'Ótima', marginEn: 'Optimal', volumePt: 'Queda controlada', volumeEn: 'Controlled drop' },
      { id: 'aggressive',   labelPt: 'Agressivo',   labelEn: 'Aggressive',   price: 96.2, marginPt: 'Máxima', marginEn: 'Maximum', volumePt: 'Maior risco de volume', volumeEn: 'Higher volume risk' },
    ],
  },
  {
    id: 'sku-2',
    namePt: 'Suplemento Vitamina D 60cps',
    nameEn: 'Vitamin D Supplement 60caps',
    categoryPt: 'Nutrição',
    categoryEn: 'Nutrition',
    categoryId: 'nutricao',
    channelId: 'b2c',
    regionId: 'sul',
    action: 'manter',
    volume: 3120,
    elasticity: -0.95,
    competitivePosition: 'inline',
    stockCoverDays: 74,
    currentPrice: 92.4,
    competitorPrice: 92.9,
    competitorBand: { min: 91, max: 95 },
    optimalPrice: 92.6,
    rangeMin: 91.8,
    rangeMax: 93.6,
    confidencePct: 88,
    marginImpactPp: 0.4,
    volumeImpactPct: -0.3,
    argumentPt:
      'Elasticidade moderada (−0,95) e posição alinhada ao concorrente dentro de banda estreita (R$ 91–95). Recompra do cluster recorrente a cada 34 dias. Manter preço preserva churn e sustenta margem atual.',
    argumentEn:
      'Moderate elasticity (−0.95) and a position aligned with the competitor within a narrow band (R$ 91–95). The recurring cluster repurchases every 34 days. Keeping the price preserves churn and sustains current margin.',
    alternatives: [
      { id: 'conservative', labelPt: 'Conservador', labelEn: 'Conservative', price: 91.8, marginPt: 'Maior', marginEn: 'Higher', volumePt: 'Queda mínima', volumeEn: 'Minimal drop' },
      { id: 'recommended',  labelPt: 'Recomendado', labelEn: 'Recommended', price: 92.6, marginPt: 'Estável', marginEn: 'Stable', volumePt: 'Estável', volumeEn: 'Stable' },
      { id: 'aggressive',   labelPt: 'Agressivo',   labelEn: 'Aggressive',   price: 93.6, marginPt: 'Máxima', marginEn: 'Maximum', volumePt: 'Maior risco de volume', volumeEn: 'Higher volume risk' },
    ],
  },
  {
    id: 'sku-3',
    namePt: 'Protetor Solar FPS 60',
    nameEn: 'Sunscreen SPF 60',
    categoryPt: 'Sazonal',
    categoryEn: 'Seasonal',
    categoryId: 'sazonal',
    channelId: 'retail',
    regionId: 'sudeste',
    action: 'reduzir',
    volume: 2400,
    elasticity: -1.55,
    competitivePosition: 'above',
    stockCoverDays: 18,
    currentPrice: 98.9,
    competitorPrice: 92.5,
    competitorBand: { min: 90, max: 94 },
    optimalPrice: 93.6,
    rangeMin: 92.2,
    rangeMax: 94.4,
    confidencePct: 84,
    marginImpactPp: -1.2,
    volumeImpactPct: 6.8,
    argumentPt:
      'Elasticidade alta (−1,55) e SKU acima da banda concorrente (R$ 90–94), com estoque em janela sazonal curta (18 dias). Modelo reduz preço para dentro da banda para defender giro e evitar sobra de estoque no fim da estação.',
    argumentEn:
      'High elasticity (−1.55) and the SKU is above the competitor band (R$ 90–94), with stock in a short seasonal window (18 days). The model lowers the price into the band to defend turnover and avoid leftover stock at the end of the season.',
    alternatives: [
      { id: 'conservative', labelPt: 'Conservador', labelEn: 'Conservative', price: 94.4, marginPt: 'Maior', marginEn: 'Higher', volumePt: 'Menor recuperação', volumeEn: 'Lower recovery' },
      { id: 'recommended',  labelPt: 'Recomendado', labelEn: 'Recommended', price: 93.6, marginPt: 'Reduzida', marginEn: 'Reduced', volumePt: 'Recupera volume', volumeEn: 'Recovers volume' },
      { id: 'aggressive',   labelPt: 'Agressivo',   labelEn: 'Aggressive',   price: 92.2, marginPt: 'Mínima', marginEn: 'Minimum', volumePt: 'Máxima recuperação', volumeEn: 'Maximum recovery' },
    ],
  },
];

export const filterOptions = {
  category: {
    pt: [
      { value: 'all', label: 'Todas as categorias' },
      { value: 'skincare', label: 'Skincare' },
      { value: 'nutricao', label: 'Nutrição' },
      { value: 'sazonal', label: 'Sazonal' },
    ],
    en: [
      { value: 'all', label: 'All categories' },
      { value: 'skincare', label: 'Skincare' },
      { value: 'nutricao', label: 'Nutrition' },
      { value: 'sazonal', label: 'Seasonal' },
    ],
  },
  channel: {
    pt: [
      { value: 'all', label: 'Todos os canais' },
      { value: 'b2b', label: 'B2B · Distribuidores' },
      { value: 'b2c', label: 'B2C · E-commerce' },
      { value: 'retail', label: 'Varejo físico' },
    ],
    en: [
      { value: 'all', label: 'All channels' },
      { value: 'b2b', label: 'B2B · Distributors' },
      { value: 'b2c', label: 'B2C · E-commerce' },
      { value: 'retail', label: 'Physical retail' },
    ],
  },
  strategy: {
    pt: [
      { value: 'margin', label: 'Maximizar margem' },
      { value: 'balanced', label: 'Equilíbrio margem/volume' },
      { value: 'defense', label: 'Defesa de mercado' },
    ],
    en: [
      { value: 'margin', label: 'Maximize margin' },
      { value: 'balanced', label: 'Margin/volume balance' },
      { value: 'defense', label: 'Market defense' },
    ],
  },
  minMargin: {
    pt: [
      { value: '30', label: '≥ 30%' },
      { value: '35', label: '≥ 35%' },
      { value: '40', label: '≥ 40%' },
      { value: '45', label: '≥ 45%' },
    ],
    en: [
      { value: '30', label: '≥ 30%' },
      { value: '35', label: '≥ 35%' },
      { value: '40', label: '≥ 40%' },
      { value: '45', label: '≥ 45%' },
    ],
  },
  competitiveBand: {
    pt: [
      { value: 'strict', label: 'Alinhado' },
      { value: 'medium', label: '±5% da banda' },
      { value: 'wide', label: '±10% da banda' },
    ],
    en: [
      { value: 'strict', label: 'Aligned' },
      { value: 'medium', label: '±5% of band' },
      { value: 'wide', label: '±10% of band' },
    ],
  },
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

export const actionLabel: Record<KioskLang, Record<PriceAction, string>> = {
  pt: {
    aumentar: 'Aumentar preço',
    manter: 'Manter preço',
    reduzir: 'Reduzir preço',
  },
  en: {
    aumentar: 'Increase price',
    manter: 'Keep price',
    reduzir: 'Reduce price',
  },
};

// Short synthesis of what the model learned across the visible portfolio.
export const generalInsightFor = (list: PriceMarginSku[], lang: KioskLang): string => {
  if (lang === 'pt') {
    if (list.length === 0) return 'Nenhum SKU no filtro atual.';
    const up = list.filter((s) => s.action === 'aumentar').length;
    const keep = list.filter((s) => s.action === 'manter').length;
    const down = list.filter((s) => s.action === 'reduzir').length;
    const parts: string[] = [];
    if (up)   parts.push(`${up} com elasticidade baixa e preço abaixo da banda → subir`);
    if (keep) parts.push(`${keep} alinhado(s) à banda e com recompra estável → manter`);
    if (down) parts.push(`${down} acima da banda em janela de estoque curta → reduzir`);
    return `O modelo aprendeu, por SKU, elasticidade, posição vs. concorrente, piso de margem e cobertura de estoque. ${parts.join('; ')}.`;
  }
  if (list.length === 0) return 'No SKU in the current filter.';
  const up = list.filter((s) => s.action === 'aumentar').length;
  const keep = list.filter((s) => s.action === 'manter').length;
  const down = list.filter((s) => s.action === 'reduzir').length;
  const parts: string[] = [];
  if (up)   parts.push(`${up} with low elasticity and price below the band → raise`);
  if (keep) parts.push(`${keep} aligned to the band with stable repurchase → keep`);
  if (down) parts.push(`${down} above the band in a short stock window → reduce`);
  return `The model learned, per SKU, elasticity, position vs. competitor, margin floor and stock coverage. ${parts.join('; ')}.`;
};

// ============================================================================
// UI labels
// ============================================================================

export const demoLabels: Record<KioskLang, {
  headerTitleResult: string;
  headerTitleSetup: string;
  headerSubtitleResult: string;
  headerSubtitleSetup: string;
  objective: string;
  filters: {
    category: string;
    channel: string;
    strategy: string;
    minMargin: string;
    competitiveBand: string;
  };
  table: {
    sku: string;
    actionSuggested: string;
    currentPrice: string;
    elasticity: string;
    competitivePosition: string;
    stockCover: string;
    competitorPrice: string;
    empty: string;
  };
  competitivePositionLabel: Record<PriceMarginSku['competitivePosition'], string>;
  optimalPrice: string;
  recommendedRange: string;
  alternatives: {
    scenario: string;
    price: string;
    margin: string;
    volume: string;
  };
  marginImpact: string;
  volumeImpact: string;
  confidence: string;
  ctaCalculate: string;
  ctaAdjustFilters: string;
  running: string;
  reasoningTitle: string;
  whyThisPrice: string;
  whatModelLearned: string;
  newSimulation: string;
  chart: {
    current: string;
    min: string;
    max: string;
    competitor: string;
    optimal: string;
    totalMargin: string;
  };
}> = {
  pt: {
    headerTitleResult: 'Preço ótimo e cenários alternativos',
    headerTitleSetup: 'Portfólio de precificação',
    headerSubtitleResult: 'Faixa recomendada, impacto em margem e volume por SKU.',
    headerSubtitleSetup: 'Selecione os filtros e ajuste restrições para simular a faixa ótima de preço por SKU.',
    objective: 'Objetivo: Margem',
    filters: {
      category: 'Categoria',
      channel: 'Canal',
      strategy: 'Estratégia',
      minMargin: 'Margem mínima',
      competitiveBand: 'Banda competitiva',
    },
    table: {
      sku: 'SKU',
      actionSuggested: 'Ação\nsugerida',
      currentPrice: 'Preço\natual',
      elasticity: 'Elast.',
      competitivePosition: 'Posição\nconcorr.',
      stockCover: 'Cobertura\nestoque',
      competitorPrice: 'Preço\nconcorrente',
      empty: 'Nenhum SKU nesta seleção de filtros.',
    },
    competitivePositionLabel: {
      below: 'Abaixo',
      inline: 'Alinhado',
      above: 'Acima',
    },
    optimalPrice: 'Preço ótimo',
    recommendedRange: 'Faixa recomendada',
    alternatives: {
      scenario: 'Cenário',
      price: 'Preço',
      margin: 'Margem',
      volume: 'Volume',
    },
    marginImpact: 'Impacto na margem',
    volumeImpact: 'Impacto no volume',
    confidence: 'Confiança do modelo',
    ctaCalculate: 'Calcular faixa ótima de preço',
    ctaAdjustFilters: 'Ajuste os filtros para simular',
    running: 'Calculando faixa ótima…',
    reasoningTitle: 'Explicabilidade e raciocínio do modelo',
    whyThisPrice: 'Por que este preço',
    whatModelLearned: 'O que o modelo aprendeu',
    newSimulation: 'Nova simulação',
    chart: {
      current: 'Atual',
      min: 'Mín',
      max: 'Máx',
      competitor: 'Concorr.',
      optimal: 'Ótimo',
      totalMargin: 'margem total',
    },
  },
  en: {
    headerTitleResult: 'Optimal price and alternative scenarios',
    headerTitleSetup: 'Pricing portfolio',
    headerSubtitleResult: 'Recommended range, margin and volume impact per SKU.',
    headerSubtitleSetup: 'Select filters and adjust constraints to simulate the optimal price range per SKU.',
    objective: 'Objective: Margin',
    filters: {
      category: 'Category',
      channel: 'Channel',
      strategy: 'Strategy',
      minMargin: 'Minimum margin',
      competitiveBand: 'Competitive band',
    },
    table: {
      sku: 'SKU',
      actionSuggested: 'Suggested\naction',
      currentPrice: 'Current\nprice',
      elasticity: 'Elast.',
      competitivePosition: 'Competitor\nposition',
      stockCover: 'Stock\ncover',
      competitorPrice: 'Competitor\nprice',
      empty: 'No SKU in this filter selection.',
    },
    competitivePositionLabel: {
      below: 'Below',
      inline: 'Aligned',
      above: 'Above',
    },
    optimalPrice: 'Optimal price',
    recommendedRange: 'Recommended range',
    alternatives: {
      scenario: 'Scenario',
      price: 'Price',
      margin: 'Margin',
      volume: 'Volume',
    },
    marginImpact: 'Margin impact',
    volumeImpact: 'Volume impact',
    confidence: 'Model confidence',
    ctaCalculate: 'Calculate optimal price range',
    ctaAdjustFilters: 'Adjust filters to simulate',
    running: 'Calculating optimal range…',
    reasoningTitle: 'Explainability and model reasoning',
    whyThisPrice: 'Why this price',
    whatModelLearned: 'What the model learned',
    newSimulation: 'New simulation',
    chart: {
      current: 'Current',
      min: 'Min',
      max: 'Max',
      competitor: 'Competitor',
      optimal: 'Optimal',
      totalMargin: 'total margin',
    },
  },
};
