// PT-only dataset for the "Preço Orientado ao Giro" kiosk demo.

export type ClusterAction = 'hold' | 'markdown' | 'wait';

export interface SkuRow {
  sku: string;
  name: string;
  currentPrice: number;
  recommendedPrice: number;
  markdownPct: number;
  sellThroughProjectedPct: number;
}

export interface TurnoverCluster {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  stores: number;
  stockUnits: number;
  avgStockAgeDays: number;
  sellVelocity: number;
  categoryAvgVelocity: number;
  currentPrice: number;
  currentMarkdownPct: number;
  remainingMarginPp: number;
  elasticity: number;
  situation: string;
  action: ClusterAction;
  recommendedPrice: number;
  recommendedMarkdownPct: number;
  nextAction: string;
  actInDays: number;
  sellThroughProjectedPct: number;
  agedStockPct: number;
  marginPreservedPp: number;
  capitalUnlockedBRL: number;
  argument: string;
  skus: SkuRow[];
}

export interface PipelineStep {
  label: string;
  micro: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  {
    label: 'Agrupando lojas por perfil de venda',
    micro: 'Comportamento local, renda, demanda, categoria e sensibilidade a preço.',
    durationMs: 900,
  },
  {
    label: 'Estimando o ciclo de vida e o decaimento do produto',
    micro: 'Velocidade de giro, idade do estoque e perda esperada de valor.',
    durationMs: 900,
  },
  {
    label: 'Lendo estoque, sazonalidade e contexto regional',
    micro: 'Disponibilidade, clima, calendário, concorrência e demanda local.',
    durationMs: 950,
  },
  {
    label: 'Simulando preços e réguas progressivas de markdown',
    micro: 'Comparando desconto imediato, progressivo e manutenção do preço.',
    durationMs: 900,
  },
  {
    label: 'Recomendando preço e calendário por cluster',
    micro: 'Mantendo cada ação dentro da margem mínima e da governança comercial.',
    durationMs: 800,
  },
];

export const clusters: TurnoverCluster[] = [
  {
    id: 'sp-premium',
    name: 'São Paulo Premium',
    region: 'Grande SP · Shoppings tier 1',
    x: 268,
    y: 340,
    stores: 24,
    stockUnits: 1420,
    avgStockAgeDays: 22,
    sellVelocity: 34,
    categoryAvgVelocity: 24,
    currentPrice: 129.9,
    currentMarkdownPct: 0,
    remainingMarginPp: 46,
    elasticity: -0.7,
    situation: 'Giro adequado',
    action: 'hold',
    recommendedPrice: 129.9,
    recommendedMarkdownPct: 0,
    nextAction: 'Manter preço',
    actInDays: 0,
    sellThroughProjectedPct: 78,
    agedStockPct: 6,
    marginPreservedPp: 4.8,
    capitalUnlockedBRL: 0,
    argument:
      'Velocidade de venda 34 un/sem, 42% acima da média da categoria (24 un/sem), com estoque de idade 22 dias contra 41 dias da categoria. Elasticidade −0,7 indica baixa sensibilidade nesta faixa: um markdown antecipado reduziria margem em 4,8 pp sem impacto material em giro — a demanda absorve o preço atual nas próximas 3 semanas dentro do sell-through projetado de 78%.',
    skus: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-002', name: 'Jaqueta acolchoada preta M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-003', name: 'Jaqueta acolchoada caqui G', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 74 },
      { sku: 'JQT-INV-004', name: 'Jaqueta acolchoada bordô M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 77 },
    ],
  },
  {
    id: 'interior-sp',
    name: 'Interior de SP',
    region: 'Campinas · Ribeirão · Sorocaba',
    x: 244,
    y: 332,
    stores: 38,
    stockUnits: 2860,
    avgStockAgeDays: 47,
    sellVelocity: 18,
    categoryAvgVelocity: 24,
    currentPrice: 129.9,
    currentMarkdownPct: 0,
    remainingMarginPp: 44,
    elasticity: -1.3,
    situation: 'Giro abaixo',
    action: 'markdown',
    recommendedPrice: 119.9,
    recommendedMarkdownPct: 8,
    nextAction: 'Markdown de 8% agora',
    actInDays: 0,
    sellThroughProjectedPct: 71,
    agedStockPct: 22,
    marginPreservedPp: 6.2,
    capitalUnlockedBRL: 148000,
    argument:
      'Sell-through das últimas 4 semanas está 18% abaixo do necessário para zerar antes da próxima coleção. Elasticidade −1,3 nesta faixa: um corte cirúrgico de 8% projeta +22% em unidades e libera R$ 148 mil de capital antes que a idade do estoque (47d) ultrapasse a média da categoria. Preserva 6,2 pp a mais de margem que uma liquidação tardia típica de 25%.',
    skus: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 119.9, markdownPct: 8, sellThroughProjectedPct: 74 },
      { sku: 'JQT-INV-002', name: 'Jaqueta acolchoada preta M', currentPrice: 129.9, recommendedPrice: 119.9, markdownPct: 8, sellThroughProjectedPct: 72 },
      { sku: 'JQT-INV-005', name: 'Jaqueta acolchoada cinza G', currentPrice: 129.9, recommendedPrice: 115.9, markdownPct: 11, sellThroughProjectedPct: 69 },
      { sku: 'JQT-INV-006', name: 'Jaqueta acolchoada verde P', currentPrice: 129.9, recommendedPrice: 119.9, markdownPct: 8, sellThroughProjectedPct: 71 },
    ],
  },
  {
    id: 'minas-gerais',
    name: 'Minas Gerais',
    region: 'BH · Uberlândia · Juiz de Fora',
    x: 278,
    y: 300,
    stores: 29,
    stockUnits: 1980,
    avgStockAgeDays: 63,
    sellVelocity: 14,
    categoryAvgVelocity: 22,
    currentPrice: 129.9,
    currentMarkdownPct: 0,
    remainingMarginPp: 42,
    elasticity: -1.6,
    situation: 'Estoque envelhecido',
    action: 'markdown',
    recommendedPrice: 109.9,
    recommendedMarkdownPct: 15,
    nextAction: 'Markdown de 15% agora',
    actInDays: 0,
    sellThroughProjectedPct: 82,
    agedStockPct: 41,
    marginPreservedPp: 9.4,
    capitalUnlockedBRL: 216000,
    argument:
      'Idade média do estoque 63 dias, 37% acima da média da categoria (46d), com perda projetada de valor de 2,1 pp/semana caso mantido. Elasticidade −1,6 e coleção nova entrando em 21 dias: markdown de 15% agora captura demanda de fim de ciclo antes da transição e evita uma liquidação profunda típica desta janela (~30%), preservando 9,4 pp de margem em relação a esse cenário tardio.',
  },
  {
    id: 'sul',
    name: 'Sul',
    region: 'Porto Alegre · Curitiba · Florianópolis',
    x: 234,
    y: 400,
    stores: 26,
    stockUnits: 1640,
    avgStockAgeDays: 34,
    sellVelocity: 21,
    categoryAvgVelocity: 24,
    currentPrice: 129.9,
    currentMarkdownPct: 0,
    remainingMarginPp: 45,
    elasticity: -1.1,
    situation: 'Demanda sazonal futura',
    action: 'wait',
    recommendedPrice: 124.9,
    recommendedMarkdownPct: 0,
    nextAction: 'Aguardar 14 dias',
    actInDays: 14,
    sellThroughProjectedPct: 74,
    agedStockPct: 12,
    marginPreservedPp: 7.6,
    capitalUnlockedBRL: 62000,
    argument:
      'Forecast sinaliza pico sazonal em 12–16 dias (entrada de frente fria + calendário regional de datas comemorativas), com elasticidade projetada caindo de −1,1 para −0,4 nesse período. Descontar agora antecipa margem que o próprio clima devolve — janela ótima de ação em 2 semanas, quando o modelo reprograma automaticamente a régua para R$ 124,90 caso o giro não acompanhe.',
  },
];

export const filterOptions = {
  category: [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'fashion', label: 'Moda · Coleção corrente' },
    { value: 'sazonal', label: 'Sazonal · Inverno' },
    { value: 'basico', label: 'Básicos · Fluxo contínuo' },
  ],
  product: [
    { value: 'sku-1', label: 'Jaqueta acolchoada — coleção inverno' },
    { value: 'sku-2', label: 'Bota térmica premium' },
    { value: 'sku-3', label: 'Blusa tricô oversized' },
  ],
  region: [
    { value: 'all', label: 'Todas as regiões' },
    { value: 'sp-premium', label: 'São Paulo Premium' },
    { value: 'interior-sp', label: 'Interior de SP' },
    { value: 'minas-gerais', label: 'Minas Gerais' },
    { value: 'sul', label: 'Sul' },
  ],
  objective: [
    { value: 'balanced', label: 'Equilibrado (giro × margem)' },
    { value: 'aggressive', label: 'Desova agressiva' },
    { value: 'preserve', label: 'Preservar margem' },
  ],
  horizon: [
    { value: '14', label: 'Até 14 dias' },
    { value: '30', label: 'Até 30 dias' },
    { value: '45', label: 'Até 45 dias' },
    { value: '60', label: 'Até 60 dias' },
  ],
  minMargin: [
    { value: '25', label: '≥ 25%' },
    { value: '30', label: '≥ 30%' },
    { value: '35', label: '≥ 35%' },
    { value: '40', label: '≥ 40%' },
  ],
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
export const fmtBRLk = (n: number) => {
  if (n <= 0) return 'R$ 0';
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(0)} mil`;
  return `R$ ${n.toFixed(0)}`;
};
