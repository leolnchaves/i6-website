// PT-only dataset for the "Preço Orientado à Margem" kiosk demo.

export type PriceAction = 'aumentar' | 'manter' | 'reduzir';

export interface CompetitorBand {
  min: number;
  max: number;
}

export interface AlternativeScenario {
  id: 'conservative' | 'recommended' | 'aggressive';
  label: string;
  price: number;
  margin: string;
  volume: string;
}

export interface PriceMarginSku {
  id: string;
  name: string;
  category: string; // display
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
  argument: string;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

export interface PipelineStep {
  label: string;
  micro: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  { label: 'Elasticidade',       micro: 'Volume × preço histórico',        durationMs: 900 },
  { label: 'Projeção de demanda',micro: 'Forecast + estoque + comercial',  durationMs: 900 },
  { label: 'Simulação de preço', micro: 'Milhares de cenários',            durationMs: 950 },
  { label: 'Restrições',         micro: 'Margem, estoque, banda, política',durationMs: 850 },
  { label: 'Preço ótimo',        micro: 'Faixa + confiança + alternativas',durationMs: 800 },
];

export const skus: PriceMarginSku[] = [
  {
    id: 'sku-1',
    name: 'Hidratante Facial 200ml',
    category: 'Skincare',
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
    argument:
      'Elasticidade baixa (−0,42) e preço abaixo da banda concorrente (R$ 95–99). Base recorrente não migrou em 3 reajustes anteriores. Modelo indica captura de margem sem risco relevante de volume.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended',  label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive',   label: 'Agressivo',   price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-2',
    name: 'Suplemento Vitamina D 60cps',
    category: 'Nutrição',
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
    argument:
      'Elasticidade moderada (−0,95) e posição alinhada ao concorrente dentro de banda estreita (R$ 91–95). Recompra do cluster recorrente a cada 34 dias. Manter preço preserva churn e sustenta margem atual.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 91.8, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended',  label: 'Recomendado', price: 92.6, margin: 'Estável', volume: 'Estável' },
      { id: 'aggressive',   label: 'Agressivo',   price: 93.6, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-3',
    name: 'Protetor Solar FPS 60',
    category: 'Sazonal',
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
    argument:
      'Elasticidade alta (−1,55) e SKU acima da banda concorrente (R$ 90–94), com estoque em janela sazonal curta (18 dias). Modelo reduz preço para dentro da banda para defender giro e evitar sobra de estoque no fim da estação.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 94.4, margin: 'Maior', volume: 'Menor recuperação' },
      { id: 'recommended',  label: 'Recomendado', price: 93.6, margin: 'Reduzida', volume: 'Recupera volume' },
      { id: 'aggressive',   label: 'Agressivo',   price: 92.2, margin: 'Mínima', volume: 'Máxima recuperação' },
    ],
  },
];

export const filterOptions = {
  category: [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'nutricao', label: 'Nutrição' },
    { value: 'sazonal', label: 'Sazonal' },
  ],
  channel: [
    { value: 'all', label: 'Todos os canais' },
    { value: 'b2b', label: 'B2B · Distribuidores' },
    { value: 'b2c', label: 'B2C · E-commerce' },
    { value: 'retail', label: 'Varejo físico' },
  ],
  strategy: [
    { value: 'margin', label: 'Maximizar margem' },
    { value: 'balanced', label: 'Equilíbrio margem × volume' },
    { value: 'defense', label: 'Defesa de mercado' },
  ],
  minMargin: [
    { value: '30', label: '≥ 30%' },
    { value: '35', label: '≥ 35%' },
    { value: '40', label: '≥ 40%' },
    { value: '45', label: '≥ 45%' },
  ],
  competitiveBand: [
    { value: 'strict', label: 'Alinhado ao concorrente' },
    { value: 'medium', label: 'Até ±5% da banda' },
    { value: 'wide', label: 'Até ±10% da banda' },
  ],
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

export const actionLabel: Record<PriceAction, string> = {
  aumentar: 'Aumentar preço',
  manter: 'Manter preço',
  reduzir: 'Reduzir preço',
};

// Short synthesis of what the model learned across the visible portfolio.
export const generalInsightFor = (list: PriceMarginSku[]): string => {
  if (list.length === 0) return 'Nenhum SKU no filtro atual.';
  const up = list.filter((s) => s.action === 'aumentar').length;
  const keep = list.filter((s) => s.action === 'manter').length;
  const down = list.filter((s) => s.action === 'reduzir').length;
  const parts: string[] = [];
  if (up)   parts.push(`${up} com elasticidade baixa e preço abaixo da banda → subir`);
  if (keep) parts.push(`${keep} alinhado(s) à banda e com recompra estável → manter`);
  if (down) parts.push(`${down} acima da banda em janela de estoque curta → reduzir`);
  return `O modelo aprendeu, por SKU, elasticidade, posição vs. concorrente, piso de margem e cobertura de estoque. ${parts.join('; ')}.`;
};
