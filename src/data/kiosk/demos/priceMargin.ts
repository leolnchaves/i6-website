// PT-only dataset for the "Preço Orientado à Margem" kiosk demo.

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
  volume: number; // un/wk
  elasticity: number; // e.g. -0.4 (low sensitivity) to -1.8 (high)
  competitivePosition: 'below' | 'inline' | 'above';
  stockCoverDays: number;
  currentPrice: number;
  competitorPrice: number;
  competitorBand: CompetitorBand;
  optimalPrice: number;
  rangeMin: number;
  rangeMax: number;
  confidencePct: number;
  marginImpactPp: number; // percentage points on margin
  volumeImpactPct: number; // negative usually
  argument: string;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

export interface PipelineStep {
  label: string;
  micro: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  {
    label: 'Estimando a elasticidade de demanda do SKU',
    micro: 'Medindo como volume e demanda responderam às variações históricas de preço.',
    durationMs: 900,
  },
  {
    label: 'Projetando demanda para diferentes preços',
    micro: 'Combinando elasticidade, forecast, estoque e comportamento comercial.',
    durationMs: 900,
  },
  {
    label: 'Simulando cenários de preço, volume e margem',
    micro: 'Calculando milhares de combinações possíveis para o SKU.',
    durationMs: 950,
  },
  {
    label: 'Aplicando restrições e governança corporativa',
    micro: 'Margem mínima, estoque, banda competitiva, política comercial e posicionamento.',
    durationMs: 850,
  },
  {
    label: 'Selecionando preço ótimo e alternativas válidas',
    micro: 'Gerando faixa recomendada, intervalo de confiança e cenários alternativos.',
    durationMs: 800,
  },
];

export const skus: PriceMarginSku[] = [
  {
    id: 'sku-1',
    name: 'Hidratante Facial 200ml',
    category: 'Skincare',
    categoryId: 'skincare',
    channelId: 'b2b',
    regionId: 'sudeste',
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
      'Nas últimas 8 semanas o SKU manteve giro estável mesmo após 3 reajustes de até +4%. Concorrentes diretos estão operando entre R$ 95 e R$ 99, e a base de clientes recorrentes (58% do volume) não migrou nos últimos ciclos. A faixa recomendada captura margem adicional sem sair da banda competitiva percebida no PDV.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended', label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive', label: 'Agressivo', price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-2',
    name: 'Suplemento Vitamina D 60cps',
    category: 'Nutrição',
    categoryId: 'nutricao',
    channelId: 'b2b',
    regionId: 'sul',
    volume: 3120,
    elasticity: -0.95,
    competitivePosition: 'inline',
    stockCoverDays: 74,
    currentPrice: 89.9,
    competitorPrice: 95.9,
    competitorBand: { min: 94, max: 98 },
    optimalPrice: 94.8,
    rangeMin: 93.4,
    rangeMax: 96.2,
    confidencePct: 88,
    marginImpactPp: 2.8,
    volumeImpactPct: -2.6,
    argument:
      'O produto tem alta frequência de recompra (a cada 34 dias em média) e histórico consistente de conversão mesmo em bandas superiores. Apesar da oportunidade, preços acima de R$ 96,20 elevam significativamente o risco de perda de volume dentro do cluster fiel — o modelo recomenda R$ 94,80 como melhor equilíbrio entre margem capturada e demanda preservada.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended', label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive', label: 'Agressivo', price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-3',
    name: 'Shampoo Reparador 400ml',
    category: 'Haircare',
    categoryId: 'haircare',
    channelId: 'b2b',
    regionId: 'nordeste',
    volume: 4680,
    elasticity: -0.38,
    competitivePosition: 'below',
    stockCoverDays: 41,
    currentPrice: 89.9,
    competitorPrice: 97.2,
    competitorBand: { min: 95, max: 99 },
    optimalPrice: 94.8,
    rangeMin: 93.4,
    rangeMax: 96.2,
    confidencePct: 93,
    marginImpactPp: 3.6,
    volumeImpactPct: -1.1,
    argument:
      'O SKU apresenta baixa sensibilidade dentro da faixa recomendada e está abaixo da banda observada para produtos comparáveis nos últimos 60 dias. O aumento proposto captura margem adicional com impacto controlado sobre o volume, respeitando margem mínima, posição competitiva e estratégia da categoria.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended', label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive', label: 'Agressivo', price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-4',
    name: 'Protetor Solar FPS 60',
    category: 'Sazonal',
    categoryId: 'sazonal',
    channelId: 'b2b',
    regionId: 'sudeste',
    volume: 2400,
    elasticity: -1.35,
    competitivePosition: 'inline',
    stockCoverDays: 22,
    currentPrice: 89.9,
    competitorPrice: 96.9,
    competitorBand: { min: 93, max: 99 },
    optimalPrice: 94.8,
    rangeMin: 93.4,
    rangeMax: 96.2,
    confidencePct: 86,
    marginImpactPp: 2.4,
    volumeImpactPct: -3.4,
    argument:
      'Buscas cresceram 38% na semana e o estoque cobre apenas 22 dias no ritmo atual. Comparáveis sazonais praticaram média de R$ 97 em janelas equivalentes de calor. A faixa recomendada aproveita a janela de demanda antes que o competidor reaja, sem violar a banda máxima de posicionamento.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended', label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive', label: 'Agressivo', price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
  {
    id: 'sku-5',
    name: 'Kit Skincare Noturno',
    category: 'Combo',
    categoryId: 'combo',
    channelId: 'b2b',
    regionId: 'sudeste',
    volume: 960,
    elasticity: -0.62,
    competitivePosition: 'above',
    stockCoverDays: 65,
    currentPrice: 89.9,
    competitorPrice: 92.0,
    competitorBand: { min: 88, max: 96 },
    optimalPrice: 94.8,
    rangeMin: 93.4,
    rangeMax: 96.2,
    confidencePct: 89,
    marginImpactPp: 4.1,
    volumeImpactPct: -1.8,
    argument:
      'Combo exclusivo, sem paralelo direto no mercado local, com margem de contribuição 12 pp acima da categoria. O comportamento dos últimos 3 lançamentos similares mostra baixa reação a variações de até +6%. R$ 94,80 fica dentro da faixa em que 82% das sessões evoluem para carrinho.',
    alternatives: [
      { id: 'conservative', label: 'Conservador', price: 93.4, margin: 'Maior', volume: 'Queda mínima' },
      { id: 'recommended', label: 'Recomendado', price: 94.8, margin: 'Ótima', volume: 'Queda controlada' },
      { id: 'aggressive', label: 'Agressivo', price: 96.2, margin: 'Máxima', volume: 'Maior risco de volume' },
    ],
  },
];

export const filterOptions = {
  category: [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'nutricao', label: 'Nutrição' },
    { value: 'haircare', label: 'Haircare' },
    { value: 'sazonal', label: 'Sazonal' },
    { value: 'combo', label: 'Combo' },
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
