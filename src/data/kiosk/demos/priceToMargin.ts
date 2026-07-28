// PT-only dataset for the "Preço Orientado à Conversão" kiosk demo.

export type ConversionAction = 'aumentar' | 'manter' | 'reduzir';

export interface CompetitorBand {
  min: number;
  max: number;
}

export interface AlternativeScenario {
  id: 'conservative' | 'recommended' | 'aggressive';
  label: string;
  price: number;
  deltaConversion: string;
  deltaRevenue: string;
}

export interface PriceConversionSku {
  id: string;
  name: string;
  category: string; // display
  categoryId: string; // for filter matching
  channelId: string;
  action: ConversionAction;
  sessionsPerDay: number;
  currentConversionPct: number;
  elasticity: number;
  competitivePosition: 'below' | 'inline' | 'above';
  currentPrice: number;
  competitorPrice: number;
  competitorBand: CompetitorBand;
  optimalPrice: number;
  rangeMin: number;
  rangeMax: number;
  confidencePct: number;
  deltaConversionPct: number; // pp
  deltaRevenuePct: number; // %
  argument: string;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

export interface PipelineStep {
  label: string;
  micro: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  { label: 'Sessões e intenção',   micro: 'Cliques, buscas, carrinhos, tempo em página',       durationMs: 900 },
  { label: 'Clusters de intenção', micro: 'Segmentando sensibilidade a preço e recorrência',   durationMs: 900 },
  { label: 'Elasticidade de conversão', micro: 'Simulando resposta em milhares de cenários',   durationMs: 950 },
  { label: 'Restrições comerciais', micro: 'Piso de margem, banda concorrente, política',      durationMs: 850 },
  { label: 'Preço ideal para converter', micro: 'Faixa + confiança + alternativas',            durationMs: 800 },
];

export const skus: PriceConversionSku[] = [
  {
    id: 'sku-1',
    name: 'Hidratante Facial 200ml',
    category: 'Skincare',
    categoryId: 'skincare',
    channelId: 'b2c',
    action: 'reduzir',
    sessionsPerDay: 4820,
    currentConversionPct: 2.1,
    elasticity: -1.85,
    competitivePosition: 'above',
    currentPrice: 49.9,
    competitorPrice: 44.5,
    competitorBand: { min: 42, max: 46 },
    optimalPrice: 44.7,
    rangeMin: 43.4,
    rangeMax: 45.9,
    confidencePct: 92,
    deltaConversionPct: 18.3,
    deltaRevenuePct: 8.3,
    argument:
      'Elasticidade alta (−1,85) e SKU 12% acima da banda concorrente (R$ 42–46), com 62% de abandono de carrinho e 3+ visitas antes de converter. Ajustar para dentro da banda destrava o cluster de fim de semana sem canibalizar o premium, capturando +18,3 pp de conversão em 7 dias.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 45.9, deltaConversion: '+11,2 pp', deltaRevenue: '+5,4%' },
      { id: 'recommended',  label: 'Recomendado', price: 44.7, deltaConversion: '+18,3 pp', deltaRevenue: '+8,3%' },
      { id: 'aggressive',   label: 'Agressivo',   price: 43.4, deltaConversion: '+24,1 pp', deltaRevenue: '+6,8%' },
    ],
  },
  {
    id: 'sku-2',
    name: 'Suplemento Vitamina D 60cps',
    category: 'Nutrição',
    categoryId: 'nutricao',
    channelId: 'b2c',
    action: 'reduzir',
    sessionsPerDay: 3140,
    currentConversionPct: 3.4,
    elasticity: -1.35,
    competitivePosition: 'above',
    currentPrice: 39.9,
    competitorPrice: 36.9,
    competitorBand: { min: 35, max: 38 },
    optimalPrice: 37.3,
    rangeMin: 36.4,
    rangeMax: 38.2,
    confidencePct: 89,
    deltaConversionPct: 11.7,
    deltaRevenuePct: 6.1,
    argument:
      '71% do drop-off na primeira compra da assinatura, com 3+ visitas até converter. Elasticidade −1,35 e ticket acima da banda (R$ 35–38): reduzir para R$ 37,30 destrava o funil recorrente — LTV compensa o corte já no 2º pedido e captura +11,7 pp de conversão.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 38.2, deltaConversion: '+7,4 pp', deltaRevenue: '+4,2%' },
      { id: 'recommended',  label: 'Recomendado', price: 37.3, deltaConversion: '+11,7 pp', deltaRevenue: '+6,1%' },
      { id: 'aggressive',   label: 'Agressivo',   price: 36.4, deltaConversion: '+15,2 pp', deltaRevenue: '+4,8%' },
    ],
  },
  {
    id: 'sku-3',
    name: 'Shampoo Reparador 400ml',
    category: 'Haircare',
    categoryId: 'haircare',
    channelId: 'retail',
    action: 'aumentar',
    sessionsPerDay: 2380,
    currentConversionPct: 5.2,
    elasticity: -0.32,
    competitivePosition: 'below',
    currentPrice: 28.9,
    competitorPrice: 31.5,
    competitorBand: { min: 30, max: 33 },
    optimalPrice: 30.4,
    rangeMin: 29.6,
    rangeMax: 31.4,
    confidencePct: 90,
    deltaConversionPct: -1.4,
    deltaRevenuePct: 4.2,
    argument:
      'Recorrentes representam 61% do volume, com baixa sensibilidade a preço (elasticidade −0,32) e checkout <90s. Preço 8% abaixo da banda (R$ 30–33): aumento controlado captura R$ 1,50 de ticket sem afastar novos compradores — queda esperada de conversão fica em −1,4 pp, com +4,2% em receita líquida.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 29.6, deltaConversion: '−0,4 pp', deltaRevenue: '+2,0%' },
      { id: 'recommended',  label: 'Recomendado', price: 30.4, deltaConversion: '−1,4 pp', deltaRevenue: '+4,2%' },
      { id: 'aggressive',   label: 'Agressivo',   price: 31.4, deltaConversion: '−2,8 pp', deltaRevenue: '+5,1%' },
    ],
  },
];

export const filterOptions = {
  category: [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'nutricao', label: 'Nutrição' },
    { value: 'haircare', label: 'Haircare' },
  ],
  channel: [
    { value: 'all', label: 'Todos os canais' },
    { value: 'b2b', label: 'B2B · Distribuidores' },
    { value: 'b2c', label: 'B2C · E-commerce' },
    { value: 'retail', label: 'Varejo físico' },
  ],
  strategy: [
    { value: 'conversion', label: 'Maximizar conversão' },
    { value: 'balanced', label: 'Equilíbrio conversão/receita' },
    { value: 'revenue', label: 'Proteger receita' },
  ],
  minMargin: [
    { value: '25', label: '≥ 25%' },
    { value: '30', label: '≥ 30%' },
    { value: '35', label: '≥ 35%' },
    { value: '40', label: '≥ 40%' },
  ],
  competitiveBand: [
    { value: 'strict', label: 'Alinhado' },
    { value: 'medium', label: '±5% da banda' },
    { value: 'wide', label: '±10% da banda' },
  ],
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

export const actionLabel: Record<ConversionAction, string> = {
  aumentar: 'Aumentar preço',
  manter: 'Manter preço',
  reduzir: 'Reduzir preço',
};

// Short synthesis of what the model learned across the visible portfolio.
export const generalInsightFor = (list: PriceConversionSku[]): string => {
  if (list.length === 0) return 'Nenhum SKU no filtro atual.';
  const up = list.filter((s) => s.action === 'aumentar').length;
  const keep = list.filter((s) => s.action === 'manter').length;
  const down = list.filter((s) => s.action === 'reduzir').length;
  const parts: string[] = [];
  if (up)   parts.push(`${up} com elasticidade baixa e preço abaixo da banda → subir para capturar receita`);
  if (keep) parts.push(`${keep} alinhado(s) à banda e com conversão estável → manter`);
  if (down) parts.push(`${down} acima da banda com elasticidade alta → reduzir para destravar conversão`);
  return `O modelo aprendeu, por SKU, elasticidade de conversão, posição vs. concorrente, sinal de intenção (sessões, abandono, tempo) e piso de margem. ${parts.join('; ')}.`;
};
