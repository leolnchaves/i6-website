import type { KioskLang } from '@/data/kiosk/config';

// Bilingual (pt/en) dataset for the "Preço Orientado ao Giro" kiosk demo.

export type ClusterAction = 'hold' | 'markdown' | 'wait' | 'raise';

export interface SkuRow {
  sku: string;
  namePt: string;
  nameEn: string;
  currentPrice: number;
  recommendedPrice: number;
  markdownPct: number;
  sellThroughProjectedPct: number;
}

export interface TurnoverCluster {
  id: string;
  namePt: string;
  nameEn: string;
  regionPt: string;
  regionEn: string;
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
  situationPt: string;
  situationEn: string;
  action: ClusterAction;
  recommendedPrice: number;
  recommendedMarkdownPct: number;
  nextActionPt: string;
  nextActionEn: string;
  actInDays: number;
  sellThroughProjectedPct: number;
  agedStockPct: number;
  marginPreservedPp: number;
  capitalUnlockedBRL: number;
  argumentPt: string;
  argumentEn: string;
  skus: SkuRow[];
}

export interface PipelineStep {
  labelPt: string;
  labelEn: string;
  microPt: string;
  microEn: string;
  durationMs: number;
}

export const pipeline: PipelineStep[] = [
  {
    labelPt: 'Agrupando lojas por perfil de venda',
    labelEn: 'Grouping stores by sales profile',
    microPt: 'Comportamento local, renda, demanda, categoria e sensibilidade a preço.',
    microEn: 'Local behavior, income, demand, category and price sensitivity.',
    durationMs: 900,
  },
  {
    labelPt: 'Estimando o ciclo de vida e o decaimento do produto',
    labelEn: 'Estimating product lifecycle and decay',
    microPt: 'Velocidade de giro, idade do estoque e perda esperada de valor.',
    microEn: 'Turnover velocity, stock age and expected value loss.',
    durationMs: 900,
  },
  {
    labelPt: 'Lendo estoque, sazonalidade e contexto regional',
    labelEn: 'Reading stock, seasonality and regional context',
    microPt: 'Disponibilidade, clima, calendário, concorrência e demanda local.',
    microEn: 'Availability, weather, calendar, competition and local demand.',
    durationMs: 950,
  },
  {
    labelPt: 'Simulando preços e réguas progressivas de markdown',
    labelEn: 'Simulating prices and progressive markdown rules',
    microPt: 'Comparando desconto imediato, progressivo e manutenção do preço.',
    microEn: 'Comparing immediate discount, progressive discount and holding price.',
    durationMs: 900,
  },
  {
    labelPt: 'Recomendando preço e calendário por cluster',
    labelEn: 'Recommending price and calendar per cluster',
    microPt: 'Mantendo cada ação dentro da margem mínima e da governança comercial.',
    microEn: 'Keeping every action within the minimum margin and commercial governance.',
    durationMs: 800,
  },
];

export const clusters: TurnoverCluster[] = [
  {
    id: 'sp-premium',
    namePt: 'São Paulo Premium',
    nameEn: 'São Paulo Premium',
    regionPt: 'Grande SP · Shoppings tier 1',
    regionEn: 'Greater SP · Tier-1 malls',
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
    situationPt: 'Giro adequado',
    situationEn: 'Healthy turnover',
    action: 'hold',
    recommendedPrice: 129.9,
    recommendedMarkdownPct: 0,
    nextActionPt: 'Manter preço',
    nextActionEn: 'Hold price',
    actInDays: 0,
    sellThroughProjectedPct: 78,
    agedStockPct: 6,
    marginPreservedPp: 4.8,
    capitalUnlockedBRL: 0,
    argumentPt:
      'Velocidade 34 un/sem (+42% vs. categoria) e estoque com 22 dias contra 41 da média. Elasticidade −0,7 indica baixa sensibilidade: markdown antecipado corta 4,8 pp de margem sem ganho relevante de giro. A demanda absorve o preço nas próximas 3 semanas dentro do sell-through de 78%.',
    argumentEn:
      'Velocity 34 units/week (+42% vs. category) with stock at 22 days vs. a 41-day average. Elasticity of −0.7 signals low sensitivity: an early markdown would cut 4.8 pp of margin without a meaningful turnover gain. Demand absorbs the price over the next 3 weeks within a 78% sell-through.',
    skus: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-002', namePt: 'Jaqueta acolchoada preta M', nameEn: 'Black padded jacket M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-003', namePt: 'Jaqueta acolchoada caqui G', nameEn: 'Khaki padded jacket L', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
  },
  {
    id: 'minas-gerais',
    namePt: 'Minas Gerais',
    nameEn: 'Minas Gerais',
    regionPt: 'BH · Uberlândia · Juiz de Fora',
    regionEn: 'BH · Uberlândia · Juiz de Fora',
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
    situationPt: 'Estoque envelhecido',
    situationEn: 'Aged inventory',
    action: 'markdown',
    recommendedPrice: 109.9,
    recommendedMarkdownPct: 15,
    nextActionPt: 'Markdown agora',
    nextActionEn: 'Markdown now',
    actInDays: 0,
    sellThroughProjectedPct: 82,
    agedStockPct: 41,
    marginPreservedPp: 9.4,
    capitalUnlockedBRL: 216000,
    argumentPt:
      'Idade média 63 dias (+37% vs. categoria) com perda projetada de 2,1 pp/semana se mantido. Elasticidade −1,6 e coleção nova em 21 dias: markdown de 15% agora captura demanda de fim de ciclo e evita liquidação profunda (~30%), preservando 9,4 pp de margem.',
    argumentEn:
      'Average age of 63 days (+37% vs. category) with a projected loss of 2.1 pp/week if held. Elasticity of −1.6 and a new collection in 21 days: a 15% markdown now captures end-of-cycle demand and avoids a deep clearance (~30%), preserving 9.4 pp of margin.',
    skus: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 109.9, markdownPct: 15, sellThroughProjectedPct: 85 },
      { sku: 'JQT-INV-003', namePt: 'Jaqueta acolchoada caqui G', nameEn: 'Khaki padded jacket L', currentPrice: 129.9, recommendedPrice: 104.9, markdownPct: 19, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-008', namePt: 'Jaqueta acolchoada azul GG', nameEn: 'Blue padded jacket XL', currentPrice: 129.9, recommendedPrice: 99.9, markdownPct: 23, sellThroughProjectedPct: 78 },
    ],
  },
  {
    id: 'sul',
    namePt: 'Sul',
    nameEn: 'South',
    regionPt: 'Porto Alegre · Curitiba · Florianópolis',
    regionEn: 'Porto Alegre · Curitiba · Florianópolis',
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
    situationPt: 'Demanda sazonal futura',
    situationEn: 'Upcoming seasonal demand',
    action: 'wait',
    recommendedPrice: 124.9,
    recommendedMarkdownPct: 0,
    nextActionPt: 'Aguardar 14 dias',
    nextActionEn: 'Wait 14 days',
    actInDays: 14,
    sellThroughProjectedPct: 74,
    agedStockPct: 12,
    marginPreservedPp: 7.6,
    capitalUnlockedBRL: 62000,
    argumentPt:
      'Forecast sinaliza pico sazonal em 12–16 dias (frente fria + calendário regional), com elasticidade caindo de −1,1 para −0,4 nesse período. Descontar agora antecipa margem que o clima devolve — janela ótima em 2 semanas, quando a régua reprograma automaticamente para R$ 124,90 se o giro não acompanhar.',
    argumentEn:
      'The forecast signals a seasonal peak in 12–16 days (cold front + regional calendar), with elasticity dropping from −1.1 to −0.4 during that window. Discounting now would give away margin that the weather returns on its own — the optimal window is in 2 weeks, when the rule automatically reprices to R$ 124.90 if turnover does not keep up.',
    skus: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 76 },
      { sku: 'JQT-INV-009', namePt: 'Jaqueta acolchoada vinho M', nameEn: 'Burgundy padded jacket M', currentPrice: 129.9, recommendedPrice: 124.9, markdownPct: 4, sellThroughProjectedPct: 72 },
      { sku: 'JQT-INV-010', namePt: 'Jaqueta acolchoada grafite G', nameEn: 'Graphite padded jacket L', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 73 },
    ],
  },
];

export const filterOptions = {
  product: [
    { value: 'sku-1', labelPt: 'Jaqueta acolchoada', labelEn: 'Padded jacket' },
    { value: 'sku-2', labelPt: 'Bota térmica premium', labelEn: 'Premium thermal boot' },
    { value: 'sku-3', labelPt: 'Blusa tricô oversized', labelEn: 'Oversized knit blouse' },
  ],
  region: [
    { value: 'all', labelPt: 'Todas as regiões', labelEn: 'All regions' },
    { value: 'sp-premium', labelPt: 'São Paulo Premium', labelEn: 'São Paulo Premium' },
    { value: 'minas-gerais', labelPt: 'Minas Gerais', labelEn: 'Minas Gerais' },
    { value: 'sul', labelPt: 'Sul', labelEn: 'South' },
  ],
  objective: [
    { value: 'balanced', labelPt: 'Equilíbrio giro/margem', labelEn: 'Turnover/margin balance' },
    { value: 'aggressive', labelPt: 'Desova agressiva', labelEn: 'Aggressive clearance' },
    { value: 'preserve', labelPt: 'Preservar margem', labelEn: 'Preserve margin' },
  ],
  minMargin: [
    { value: '25', labelPt: '≥ 25%', labelEn: '≥ 25%' },
    { value: '30', labelPt: '≥ 30%', labelEn: '≥ 30%' },
    { value: '35', labelPt: '≥ 35%', labelEn: '≥ 35%' },
    { value: '40', labelPt: '≥ 40%', labelEn: '≥ 40%' },
  ],
};

// SKUs por produto — sell-through/markdown por action (hold | markdown | wait | raise).
export const skuTemplatesByProduct: Record<
  string,
  Record<ClusterAction, SkuRow[]>
> = {
  'sku-1': {
    hold: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-002', namePt: 'Jaqueta acolchoada preta M', nameEn: 'Black padded jacket M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-003', namePt: 'Jaqueta acolchoada caqui G', nameEn: 'Khaki padded jacket L', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 109.9, markdownPct: 15, sellThroughProjectedPct: 85 },
      { sku: 'JQT-INV-003', namePt: 'Jaqueta acolchoada caqui G', nameEn: 'Khaki padded jacket L', currentPrice: 129.9, recommendedPrice: 104.9, markdownPct: 19, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-008', namePt: 'Jaqueta acolchoada azul GG', nameEn: 'Blue padded jacket XL', currentPrice: 129.9, recommendedPrice: 99.9, markdownPct: 23, sellThroughProjectedPct: 78 },
    ],
    wait: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 76 },
      { sku: 'JQT-INV-009', namePt: 'Jaqueta acolchoada vinho M', nameEn: 'Burgundy padded jacket M', currentPrice: 129.9, recommendedPrice: 124.9, markdownPct: 4, sellThroughProjectedPct: 72 },
      { sku: 'JQT-INV-010', namePt: 'Jaqueta acolchoada grafite G', nameEn: 'Graphite padded jacket L', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 73 },
    ],
    raise: [
      { sku: 'JQT-INV-001', namePt: 'Jaqueta acolchoada preta P', nameEn: 'Black padded jacket S', currentPrice: 129.9, recommendedPrice: 139.9, markdownPct: -8, sellThroughProjectedPct: 81 },
      { sku: 'JQT-INV-002', namePt: 'Jaqueta acolchoada preta M', nameEn: 'Black padded jacket M', currentPrice: 129.9, recommendedPrice: 137.9, markdownPct: -6, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-004', namePt: 'Jaqueta acolchoada verde G', nameEn: 'Green padded jacket L', currentPrice: 129.9, recommendedPrice: 141.9, markdownPct: -9, sellThroughProjectedPct: 77 },
    ],
  },
  'sku-2': {
    hold: [
      { sku: 'BTA-TRM-101', namePt: 'Bota térmica premium marrom 38', nameEn: 'Premium thermal boot brown 38', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 80 },
      { sku: 'BTA-TRM-102', namePt: 'Bota térmica premium preta 39', nameEn: 'Premium thermal boot black 39', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 77 },
      { sku: 'BTA-TRM-103', namePt: 'Bota térmica premium caramelo 40', nameEn: 'Premium thermal boot caramel 40', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'BTA-TRM-101', namePt: 'Bota térmica premium marrom 38', nameEn: 'Premium thermal boot brown 38', currentPrice: 289.9, recommendedPrice: 246.4, markdownPct: 15, sellThroughProjectedPct: 84 },
      { sku: 'BTA-TRM-104', namePt: 'Bota térmica premium preta 41', nameEn: 'Premium thermal boot black 41', currentPrice: 289.9, recommendedPrice: 234.8, markdownPct: 19, sellThroughProjectedPct: 81 },
      { sku: 'BTA-TRM-108', namePt: 'Bota térmica premium off-white 42', nameEn: 'Premium thermal boot off-white 42', currentPrice: 289.9, recommendedPrice: 223.2, markdownPct: 23, sellThroughProjectedPct: 77 },
    ],
    wait: [
      { sku: 'BTA-TRM-101', namePt: 'Bota térmica premium marrom 38', nameEn: 'Premium thermal boot brown 38', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 75 },
      { sku: 'BTA-TRM-109', namePt: 'Bota térmica premium vinho 39', nameEn: 'Premium thermal boot burgundy 39', currentPrice: 289.9, recommendedPrice: 278.9, markdownPct: 4, sellThroughProjectedPct: 71 },
      { sku: 'BTA-TRM-110', namePt: 'Bota térmica premium grafite 40', nameEn: 'Premium thermal boot graphite 40', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 72 },
    ],
    raise: [
      { sku: 'BTA-TRM-101', namePt: 'Bota térmica premium marrom 38', nameEn: 'Premium thermal boot brown 38', currentPrice: 289.9, recommendedPrice: 313.1, markdownPct: -8, sellThroughProjectedPct: 82 },
      { sku: 'BTA-TRM-102', namePt: 'Bota térmica premium preta 39', nameEn: 'Premium thermal boot black 39', currentPrice: 289.9, recommendedPrice: 307.3, markdownPct: -6, sellThroughProjectedPct: 80 },
      { sku: 'BTA-TRM-105', namePt: 'Bota térmica premium camel 41', nameEn: 'Premium thermal boot camel 41', currentPrice: 289.9, recommendedPrice: 318.9, markdownPct: -10, sellThroughProjectedPct: 78 },
    ],
  },
  'sku-3': {
    hold: [
      { sku: 'BLS-TRC-201', namePt: 'Blusa tricô oversized cru P', nameEn: 'Oversized knit blouse ecru S', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 81 },
      { sku: 'BLS-TRC-202', namePt: 'Blusa tricô oversized preta M', nameEn: 'Oversized knit blouse black M', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 78 },
      { sku: 'BLS-TRC-203', namePt: 'Blusa tricô oversized mostarda G', nameEn: 'Oversized knit blouse mustard L', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'BLS-TRC-201', namePt: 'Blusa tricô oversized cru P', nameEn: 'Oversized knit blouse ecru S', currentPrice: 179.9, recommendedPrice: 152.9, markdownPct: 15, sellThroughProjectedPct: 84 },
      { sku: 'BLS-TRC-203', namePt: 'Blusa tricô oversized mostarda G', nameEn: 'Oversized knit blouse mustard L', currentPrice: 179.9, recommendedPrice: 145.7, markdownPct: 19, sellThroughProjectedPct: 81 },
      { sku: 'BLS-TRC-208', namePt: 'Blusa tricô oversized verde GG', nameEn: 'Oversized knit blouse green XL', currentPrice: 179.9, recommendedPrice: 138.5, markdownPct: 23, sellThroughProjectedPct: 77 },
    ],
    wait: [
      { sku: 'BLS-TRC-201', namePt: 'Blusa tricô oversized cru P', nameEn: 'Oversized knit blouse ecru S', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 75 },
      { sku: 'BLS-TRC-209', namePt: 'Blusa tricô oversized vinho M', nameEn: 'Oversized knit blouse burgundy M', currentPrice: 179.9, recommendedPrice: 172.9, markdownPct: 4, sellThroughProjectedPct: 71 },
      { sku: 'BLS-TRC-210', namePt: 'Blusa tricô oversized grafite G', nameEn: 'Oversized knit blouse graphite L', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 72 },
    ],
    raise: [
      { sku: 'BLS-TRC-201', namePt: 'Blusa tricô oversized cru P', nameEn: 'Oversized knit blouse ecru S', currentPrice: 179.9, recommendedPrice: 190.7, markdownPct: -6, sellThroughProjectedPct: 82 },
      { sku: 'BLS-TRC-202', namePt: 'Blusa tricô oversized preta M', nameEn: 'Oversized knit blouse black M', currentPrice: 179.9, recommendedPrice: 188.9, markdownPct: -5, sellThroughProjectedPct: 80 },
      { sku: 'BLS-TRC-204', namePt: 'Blusa tricô oversized rosé G', nameEn: 'Oversized knit blouse rosé L', currentPrice: 179.9, recommendedPrice: 193.3, markdownPct: -7, sellThroughProjectedPct: 78 },
    ],
  },
};

// Ação recomendada por (produto × cluster). Muda quando o filtro Produto muda.
export const clusterActionByProduct: Record<string, Record<string, ClusterAction>> = {
  'sku-1': { 'sp-premium': 'markdown', 'minas-gerais': 'hold', sul: 'wait' },
  'sku-2': { 'sp-premium': 'hold', 'minas-gerais': 'markdown', sul: 'raise' },
  'sku-3': { 'sp-premium': 'hold', 'minas-gerais': 'raise', sul: 'markdown' },
};

// Overrides coerentes por ação (aplicados sobre o cluster base).
export const clusterOverridesByAction: Record<
  ClusterAction,
  {
    situationPt: string;
    situationEn: string;
    nextActionPt: string;
    nextActionEn: string;
    recommendedMarkdownPct: number;
    sellThroughProjectedPct: number;
    agedStockPct: number;
    marginPreservedPp: number;
    capitalUnlockedBRL: number;
    actInDays: number;
  }
> = {
  hold: {
    situationPt: 'Giro adequado',
    situationEn: 'Healthy turnover',
    nextActionPt: 'Manter preço',
    nextActionEn: 'Hold price',
    recommendedMarkdownPct: 0,
    sellThroughProjectedPct: 78,
    agedStockPct: 6,
    marginPreservedPp: 4.8,
    capitalUnlockedBRL: 0,
    actInDays: 0,
  },
  markdown: {
    situationPt: 'Estoque envelhecido',
    situationEn: 'Aged inventory',
    nextActionPt: 'Markdown agora',
    nextActionEn: 'Markdown now',
    recommendedMarkdownPct: 15,
    sellThroughProjectedPct: 82,
    agedStockPct: 41,
    marginPreservedPp: 9.4,
    capitalUnlockedBRL: 216000,
    actInDays: 0,
  },
  wait: {
    situationPt: 'Demanda sazonal futura',
    situationEn: 'Upcoming seasonal demand',
    nextActionPt: 'Aguardar 14 dias',
    nextActionEn: 'Wait 14 days',
    recommendedMarkdownPct: 0,
    sellThroughProjectedPct: 74,
    agedStockPct: 12,
    marginPreservedPp: 7.6,
    capitalUnlockedBRL: 62000,
    actInDays: 14,
  },
  raise: {
    situationPt: 'Giro acima da média',
    situationEn: 'Above-average turnover',
    nextActionPt: 'Aumentar preço',
    nextActionEn: 'Raise price',
    recommendedMarkdownPct: -8,
    sellThroughProjectedPct: 80,
    agedStockPct: 4,
    marginPreservedPp: 6.2,
    capitalUnlockedBRL: 148000,
    actInDays: 0,
  },
};

// Argumento "POR QUE" específico por (produto × cluster). Cai no fallback por ação se faltar.
export const argumentsByProductAndAction: Record<string, Record<string, { pt: string; en: string }>> = {
  'sku-1': {
    'sp-premium': {
      pt: 'Idade média 63 d em SP Premium (+37% vs. categoria) com queda projetada de 2,1 pp/semana. Elasticidade −1,6 e coleção nova em 21 dias: markdown de 15% agora captura demanda de fim de ciclo e evita liquidação profunda (~30%), preservando 9,4 pp de margem.',
      en: 'Average age of 63 days in SP Premium (+37% vs. category) with a projected drop of 2.1 pp/week. Elasticity of −1.6 and a new collection in 21 days: a 15% markdown now captures end-of-cycle demand and avoids a deep clearance (~30%), preserving 9.4 pp of margin.',
    },
    'minas-gerais': {
      pt: 'Velocidade 34 un/sem em MG (+55% vs. categoria) e estoque com 22 dias contra 41 da média. Elasticidade −0,7 indica baixa sensibilidade: markdown antecipado corta 4,8 pp de margem sem ganho relevante de giro. Preço aguenta as próximas 3 semanas dentro do sell-through de 78%.',
      en: 'Velocity of 34 units/week in MG (+55% vs. category) with stock at 22 days vs. a 41-day average. Elasticity of −0.7 signals low sensitivity: an early markdown would cut 4.8 pp of margin without a meaningful turnover gain. The price holds for the next 3 weeks within a 78% sell-through.',
    },
    sul: {
      pt: 'Forecast sinaliza pico sazonal no Sul em 12–16 dias (frente fria + calendário regional), com elasticidade caindo de −1,1 para −0,4. Descontar agora antecipa margem que o clima devolve — a régua reprograma automaticamente para R$ 124,90 em 2 semanas se o giro não acompanhar.',
      en: 'The forecast signals a seasonal peak in the South in 12–16 days (cold front + regional calendar), with elasticity dropping from −1.1 to −0.4. Discounting now would give away margin that the weather returns — the rule automatically reprices to R$ 124.90 in 2 weeks if turnover does not keep up.',
    },
  },
  'sku-2': {
    'sp-premium': {
      pt: 'Bota térmica com giro estável em SP (26 un/sem, dentro da média) e idade média de 24 dias. Elasticidade −0,8 e margem remanescente de 46 pp: manter preço protege posicionamento premium enquanto o sell-through segue em 78% sem estoque envelhecido.',
      en: 'The thermal boot has stable turnover in SP (26 units/week, within average) and an average age of 24 days. Elasticity of −0.8 and a remaining margin of 46 pp: holding the price protects the premium positioning while sell-through stays at 78% with no aged inventory.',
    },
    'minas-gerais': {
      pt: 'Sobre-estoque em MG (+38% vs. planejado) com giro 12 un/sem contra 22 da categoria. Idade média 71 dias e coleção descontinuada em 24 dias: markdown de 15% agora libera R$ 216 mil em capital e evita liquidação a −30% no fim do ciclo.',
      en: 'Overstock in MG (+38% vs. planned) with turnover at 12 units/week vs. 22 for the category. Average age of 71 days and a discontinued collection in 24 days: a 15% markdown now frees up R$ 216k in capital and avoids a −30% clearance at end of cycle.',
    },
    sul: {
      pt: 'Sell-out 42 un/sem no Sul vs. 26 da categoria e ruptura projetada em 12 dias no pico da frente fria. Elasticidade −0,5 permite aumento controlado de +8% preservando conversão e capturando R$ 148 mil de margem incremental sem canibalizar SKUs correlatos.',
      en: 'Sell-out of 42 units/week in the South vs. 26 for the category, with a projected stockout in 12 days at the cold-front peak. Elasticity of −0.5 allows a controlled +8% increase, preserving conversion and capturing R$ 148k of incremental margin without cannibalizing related SKUs.',
    },
  },
  'sku-3': {
    'sp-premium': {
      pt: 'Blusa tricô com giro 28 un/sem em SP (levemente acima da categoria) e estoque de 27 dias. Elasticidade −0,9 e margem em 44 pp: markdown agora não acelera giro material e sacrifica 4,3 pp de margem — manter preço mantém o sell-through de 78% até o final do ciclo.',
      en: 'The knit blouse has turnover of 28 units/week in SP (slightly above category) and stock at 27 days. Elasticity of −0.9 and margin at 44 pp: a markdown now would not meaningfully accelerate turnover and would sacrifice 4.3 pp of margin — holding the price keeps sell-through at 78% through the end of the cycle.',
    },
    'minas-gerais': {
      pt: 'Giro 38 un/sem em BH/Uberlândia (+58% vs. categoria) com estoque enxuto (17 d) e coleção descontinuada em 30 d. Aumento de +6% ancora percepção premium e captura R$ 148 mil incremental com impacto marginal em sell-through (−1 pp).',
      en: 'Turnover of 38 units/week in BH/Uberlândia (+58% vs. category) with lean stock (17 days) and a discontinued collection in 30 days. A +6% increase anchors the premium perception and captures R$ 148k incremental with marginal sell-through impact (−1 pp).',
    },
    sul: {
      pt: 'Estoque envelhecendo no Sul (54 dias, +26% vs. categoria) com giro caindo para 15 un/sem. Elasticidade −1,4 e transição para primavera em 24 d: markdown de 15% agora sustenta sell-through em 82% e libera R$ 216 mil antes da coleção nova.',
      en: 'Inventory aging in the South (54 days, +26% vs. category) with turnover dropping to 15 units/week. Elasticity of −1.4 and the spring transition in 24 days: a 15% markdown now sustains 82% sell-through and frees up R$ 216k before the new collection.',
    },
  },
};

export const fallbackArgumentByAction: Record<ClusterAction, { pt: string; en: string }> = {
  hold: {
    pt: 'Giro acima da categoria e elasticidade baixa; markdown antecipado corta margem sem ganho relevante de sell-through — o preço aguenta o ciclo dentro do plano.',
    en: 'Turnover above category and low elasticity; an early markdown would cut margin without a meaningful sell-through gain — the price holds the cycle within plan.',
  },
  markdown: {
    pt: 'Estoque envelhecido com perda projetada semanal de margem. Markdown cirúrgico agora captura demanda de fim de ciclo e evita liquidação profunda no final da coleção.',
    en: 'Aged inventory with a projected weekly margin loss. A surgical markdown now captures end-of-cycle demand and avoids a deep clearance at the end of the collection.',
  },
  wait: {
    pt: 'Pico sazonal previsto na janela próxima com queda temporária de elasticidade. Aguardar preserva margem que o clima e o calendário devolvem antes de reavaliar o preço.',
    en: 'A seasonal peak is forecast in the near window with a temporary drop in elasticity. Waiting preserves margin that weather and calendar return before the price is reassessed.',
  },
  raise: {
    pt: 'Giro bem acima da categoria com elasticidade baixa e risco de ruptura na janela sazonal. Aumento controlado captura margem incremental sem impacto material em conversão.',
    en: 'Turnover well above category with low elasticity and stockout risk in the seasonal window. A controlled increase captures incremental margin without material impact on conversion.',
  },
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
export const fmtBRLk = (n: number, lang: KioskLang = 'pt') => {
  if (n <= 0) return 'R$ 0';
  if (n >= 1000) return lang === 'pt' ? `R$ ${(n / 1000).toFixed(0)} mil` : `R$ ${(n / 1000).toFixed(0)}k`;
  return `R$ ${n.toFixed(0)}`;
};

// Short synthesis of what the model learned across visible clusters.
export const generalInsightFor = (list: TurnoverCluster[], lang: KioskLang = 'pt'): string => {
  if (list.length === 0) return lang === 'pt' ? 'Nenhum cluster no filtro atual.' : 'No cluster in the current filter.';
  const hold = list.filter((c) => c.action === 'hold').length;
  const md = list.filter((c) => c.action === 'markdown').length;
  const wait = list.filter((c) => c.action === 'wait').length;
  const parts: string[] = [];
  if (lang === 'pt') {
    if (hold) parts.push(`${hold} com giro acima da categoria e elasticidade baixa → manter`);
    if (md) parts.push(`${md} com estoque envelhecido e elasticidade alta → markdown cirúrgico agora`);
    if (wait) parts.push(`${wait} com pico sazonal próximo → aguardar janela`);
    return `O modelo lê, por cluster, velocidade vs. média da categoria, idade do estoque, elasticidade e janela sazonal, respeitando o piso de margem. ${parts.join('; ')}.`;
  }
  if (hold) parts.push(`${hold} with turnover above category and low elasticity → hold`);
  if (md) parts.push(`${md} with aged inventory and high elasticity → surgical markdown now`);
  if (wait) parts.push(`${wait} with an upcoming seasonal peak → wait for the window`);
  return `The model reads, per cluster, velocity vs. category average, stock age, elasticity and seasonal window, respecting the margin floor. ${parts.join('; ')}.`;
};

export const demoLabels: Record<
  KioskLang,
  {
    dashboardTitle: string;
    dashboardTitleResult: string;
    dashboardSubtitle: string;
    dashboardSubtitleResult: string;
    objective: string;
    filters: { product: string; objective: string; minMargin: string };
    tableHeaders: {
      cluster: string;
      situation: string;
      stock: string;
      avgAge: string;
      velocityVsCategory: string;
      suggestedAction: string;
    };
    noClusters: string;
    skuTableHeaderPrefix: string;
    skuHeaders: { currentPrice: string; recommendedPrice: string; markdown: string; sellThrough: string };
    kpi: { sellThrough: string; marginPreserved: string; capitalUnlocked: string };
    cta: string;
    ctaDisabled: string;
    running: string;
    reasoningTitle: string;
    whyPrefix: string;
    whyHold: string;
    whyWait: string;
    whyRaise: string;
    whyMarkdown: string;
    whatModelLearned: string;
    newSimulation: string;
    ruler: {
      title: string;
      actIn: string;
      actNow: string;
      actInDaysSuffix: string;
      price: string;
      today: string;
      days7: string;
      days14: string;
      days21: string;
      clearance: string;
    };
    actionLabel: Record<ClusterAction, string>;
  }
> = {
  pt: {
    dashboardTitle: 'Clusters e giro atual',
    dashboardTitleResult: 'Preço e markdown recomendados por cluster',
    dashboardSubtitle: 'Selecione os filtros e ajuste restrições para simular a ação ideal por cluster.',
    dashboardSubtitleResult: 'Ação sugerida, sell-through e capital liberado por cluster.',
    objective: 'Objetivo: Giro',
    filters: { product: 'Produto', objective: 'Objetivo', minMargin: 'Margem mínima' },
    tableHeaders: {
      cluster: 'Cluster',
      situation: 'Situação',
      stock: 'Estoque',
      avgAge: 'Idade\nmédia',
      velocityVsCategory: 'Veloc.\nvs. cat.',
      suggestedAction: 'Ação\nsugerida',
    },
    noClusters: 'Nenhum cluster nesta seleção de filtros.',
    skuTableHeaderPrefix: 'SKU',
    skuHeaders: { currentPrice: 'Preço\natual', recommendedPrice: 'Preço\nrecomendado', markdown: 'Markdown', sellThrough: 'Sell-\nthrough' },
    kpi: { sellThrough: 'Sell-through projetado', marginPreserved: 'Margem preservada', capitalUnlocked: 'Capital liberado' },
    cta: 'Otimizar preço e markdown',
    ctaDisabled: 'Ajuste os filtros para simular',
    running: 'Calculando ação ideal…',
    reasoningTitle: 'Explicabilidade e raciocínio do modelo',
    whyPrefix: 'Por que',
    whyHold: 'manter',
    whyWait: 'aguardar',
    whyRaise: 'subir preço',
    whyMarkdown: 'este markdown',
    whatModelLearned: 'O que o modelo aprendeu',
    newSimulation: 'Nova simulação',
    ruler: {
      title: 'Régua progressiva de markdown',
      actIn: 'Ação em',
      actNow: 'agora',
      actInDaysSuffix: 'dias',
      price: 'Preço',
      today: 'Hoje',
      days7: '7 dias',
      days14: '14 dias',
      days21: '21 dias',
      clearance: 'Liquidação',
    },
    actionLabel: { hold: 'Manter', markdown: 'Markdown', wait: 'Aguardar', raise: 'Aumentar' },
  },
  en: {
    dashboardTitle: 'Clusters and current turnover',
    dashboardTitleResult: 'Recommended price and markdown per cluster',
    dashboardSubtitle: 'Select the filters and adjust constraints to simulate the ideal action per cluster.',
    dashboardSubtitleResult: 'Suggested action, sell-through and capital unlocked per cluster.',
    objective: 'Objective: Turnover',
    filters: { product: 'Product', objective: 'Objective', minMargin: 'Minimum margin' },
    tableHeaders: {
      cluster: 'Cluster',
      situation: 'Situation',
      stock: 'Stock',
      avgAge: 'Avg\nage',
      velocityVsCategory: 'Velocity\nvs. cat.',
      suggestedAction: 'Suggested\naction',
    },
    noClusters: 'No cluster in this filter selection.',
    skuTableHeaderPrefix: 'SKU',
    skuHeaders: { currentPrice: 'Current\nprice', recommendedPrice: 'Recommended\nprice', markdown: 'Markdown', sellThrough: 'Sell-\nthrough' },
    kpi: { sellThrough: 'Projected sell-through', marginPreserved: 'Margin preserved', capitalUnlocked: 'Capital unlocked' },
    cta: 'Optimize price and markdown',
    ctaDisabled: 'Adjust the filters to simulate',
    running: 'Calculating ideal action…',
    reasoningTitle: 'Explainability and model reasoning',
    whyPrefix: 'Why',
    whyHold: 'hold',
    whyWait: 'wait',
    whyRaise: 'raise price',
    whyMarkdown: 'this markdown',
    whatModelLearned: 'What the model learned',
    newSimulation: 'New simulation',
    ruler: {
      title: 'Progressive markdown rule',
      actIn: 'Act in',
      actNow: 'now',
      actInDaysSuffix: 'days',
      price: 'Price',
      today: 'Today',
      days7: '7 days',
      days14: '14 days',
      days21: '21 days',
      clearance: 'Clearance',
    },
    actionLabel: { hold: 'Hold', markdown: 'Markdown', wait: 'Wait', raise: 'Raise' },
  },
};
