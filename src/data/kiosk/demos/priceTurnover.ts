// PT-only dataset for the "Preço Orientado ao Giro" kiosk demo.

export type ClusterAction = 'hold' | 'markdown' | 'wait' | 'raise';

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
      'Velocidade 34 un/sem (+42% vs. categoria) e estoque com 22 dias contra 41 da média. Elasticidade −0,7 indica baixa sensibilidade: markdown antecipado corta 4,8 pp de margem sem ganho relevante de giro. A demanda absorve o preço nas próximas 3 semanas dentro do sell-through de 78%.',
    skus: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-002', name: 'Jaqueta acolchoada preta M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-003', name: 'Jaqueta acolchoada caqui G', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 74 },
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
    nextAction: 'Markdown agora',
    actInDays: 0,
    sellThroughProjectedPct: 82,
    agedStockPct: 41,
    marginPreservedPp: 9.4,
    capitalUnlockedBRL: 216000,
    argument:
      'Idade média 63 dias (+37% vs. categoria) com perda projetada de 2,1 pp/semana se mantido. Elasticidade −1,6 e coleção nova em 21 dias: markdown de 15% agora captura demanda de fim de ciclo e evita liquidação profunda (~30%), preservando 9,4 pp de margem.',
    skus: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 109.9, markdownPct: 15, sellThroughProjectedPct: 85 },
      { sku: 'JQT-INV-003', name: 'Jaqueta acolchoada caqui G', currentPrice: 129.9, recommendedPrice: 104.9, markdownPct: 19, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-008', name: 'Jaqueta acolchoada azul GG', currentPrice: 129.9, recommendedPrice: 99.9, markdownPct: 23, sellThroughProjectedPct: 78 },
    ],
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
      'Forecast sinaliza pico sazonal em 12–16 dias (frente fria + calendário regional), com elasticidade caindo de −1,1 para −0,4 nesse período. Descontar agora antecipa margem que o clima devolve — janela ótima em 2 semanas, quando a régua reprograma automaticamente para R$ 124,90 se o giro não acompanhar.',
    skus: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 76 },
      { sku: 'JQT-INV-009', name: 'Jaqueta acolchoada vinho M', currentPrice: 129.9, recommendedPrice: 124.9, markdownPct: 4, sellThroughProjectedPct: 72 },
      { sku: 'JQT-INV-010', name: 'Jaqueta acolchoada grafite G', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 73 },
    ],
  },
];

export const filterOptions = {
  product: [
    { value: 'sku-1', label: 'Jaqueta acolchoada — coleção inverno' },
    { value: 'sku-2', label: 'Bota térmica premium' },
    { value: 'sku-3', label: 'Blusa tricô oversized' },
  ],
  region: [
    { value: 'all', label: 'Todas as regiões' },
    { value: 'sp-premium', label: 'São Paulo Premium' },
    { value: 'minas-gerais', label: 'Minas Gerais' },
    { value: 'sul', label: 'Sul' },
  ],
  objective: [
    { value: 'balanced', label: 'Equilíbrio giro/margem' },
    { value: 'aggressive', label: 'Desova agressiva' },
    { value: 'preserve', label: 'Preservar margem' },
  ],
  minMargin: [
    { value: '25', label: '≥ 25%' },
    { value: '30', label: '≥ 30%' },
    { value: '35', label: '≥ 35%' },
    { value: '40', label: '≥ 40%' },
  ],
};

// SKUs por produto — sell-through/markdown por action (hold | markdown | wait).
export const skuTemplatesByProduct: Record<
  string,
  Record<ClusterAction, SkuRow[]>
> = {
  'sku-1': {
    hold: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-002', name: 'Jaqueta acolchoada preta M', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-003', name: 'Jaqueta acolchoada caqui G', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 109.9, markdownPct: 15, sellThroughProjectedPct: 85 },
      { sku: 'JQT-INV-003', name: 'Jaqueta acolchoada caqui G', currentPrice: 129.9, recommendedPrice: 104.9, markdownPct: 19, sellThroughProjectedPct: 82 },
      { sku: 'JQT-INV-008', name: 'Jaqueta acolchoada azul GG', currentPrice: 129.9, recommendedPrice: 99.9, markdownPct: 23, sellThroughProjectedPct: 78 },
    ],
    wait: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 76 },
      { sku: 'JQT-INV-009', name: 'Jaqueta acolchoada vinho M', currentPrice: 129.9, recommendedPrice: 124.9, markdownPct: 4, sellThroughProjectedPct: 72 },
      { sku: 'JQT-INV-010', name: 'Jaqueta acolchoada grafite G', currentPrice: 129.9, recommendedPrice: 129.9, markdownPct: 0, sellThroughProjectedPct: 73 },
    ],
    raise: [
      { sku: 'JQT-INV-001', name: 'Jaqueta acolchoada preta P', currentPrice: 129.9, recommendedPrice: 139.9, markdownPct: -8, sellThroughProjectedPct: 81 },
      { sku: 'JQT-INV-002', name: 'Jaqueta acolchoada preta M', currentPrice: 129.9, recommendedPrice: 137.9, markdownPct: -6, sellThroughProjectedPct: 79 },
      { sku: 'JQT-INV-004', name: 'Jaqueta acolchoada verde G', currentPrice: 129.9, recommendedPrice: 141.9, markdownPct: -9, sellThroughProjectedPct: 77 },
    ],
  },
  'sku-2': {
    hold: [
      { sku: 'BTA-TRM-101', name: 'Bota térmica premium marrom 38', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 80 },
      { sku: 'BTA-TRM-102', name: 'Bota térmica premium preta 39', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 77 },
      { sku: 'BTA-TRM-103', name: 'Bota térmica premium caramelo 40', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'BTA-TRM-101', name: 'Bota térmica premium marrom 38', currentPrice: 289.9, recommendedPrice: 246.4, markdownPct: 15, sellThroughProjectedPct: 84 },
      { sku: 'BTA-TRM-104', name: 'Bota térmica premium preta 41', currentPrice: 289.9, recommendedPrice: 234.8, markdownPct: 19, sellThroughProjectedPct: 81 },
      { sku: 'BTA-TRM-108', name: 'Bota térmica premium off-white 42', currentPrice: 289.9, recommendedPrice: 223.2, markdownPct: 23, sellThroughProjectedPct: 77 },
    ],
    wait: [
      { sku: 'BTA-TRM-101', name: 'Bota térmica premium marrom 38', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 75 },
      { sku: 'BTA-TRM-109', name: 'Bota térmica premium vinho 39', currentPrice: 289.9, recommendedPrice: 278.9, markdownPct: 4, sellThroughProjectedPct: 71 },
      { sku: 'BTA-TRM-110', name: 'Bota térmica premium grafite 40', currentPrice: 289.9, recommendedPrice: 289.9, markdownPct: 0, sellThroughProjectedPct: 72 },
    ],
    raise: [
      { sku: 'BTA-TRM-101', name: 'Bota térmica premium marrom 38', currentPrice: 289.9, recommendedPrice: 313.1, markdownPct: -8, sellThroughProjectedPct: 82 },
      { sku: 'BTA-TRM-102', name: 'Bota térmica premium preta 39', currentPrice: 289.9, recommendedPrice: 307.3, markdownPct: -6, sellThroughProjectedPct: 80 },
      { sku: 'BTA-TRM-105', name: 'Bota térmica premium camel 41', currentPrice: 289.9, recommendedPrice: 318.9, markdownPct: -10, sellThroughProjectedPct: 78 },
    ],
  },
  'sku-3': {
    hold: [
      { sku: 'BLS-TRC-201', name: 'Blusa tricô oversized cru P', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 81 },
      { sku: 'BLS-TRC-202', name: 'Blusa tricô oversized preta M', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 78 },
      { sku: 'BLS-TRC-203', name: 'Blusa tricô oversized mostarda G', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 74 },
    ],
    markdown: [
      { sku: 'BLS-TRC-201', name: 'Blusa tricô oversized cru P', currentPrice: 179.9, recommendedPrice: 152.9, markdownPct: 15, sellThroughProjectedPct: 84 },
      { sku: 'BLS-TRC-203', name: 'Blusa tricô oversized mostarda G', currentPrice: 179.9, recommendedPrice: 145.7, markdownPct: 19, sellThroughProjectedPct: 81 },
      { sku: 'BLS-TRC-208', name: 'Blusa tricô oversized verde GG', currentPrice: 179.9, recommendedPrice: 138.5, markdownPct: 23, sellThroughProjectedPct: 77 },
    ],
    wait: [
      { sku: 'BLS-TRC-201', name: 'Blusa tricô oversized cru P', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 75 },
      { sku: 'BLS-TRC-209', name: 'Blusa tricô oversized vinho M', currentPrice: 179.9, recommendedPrice: 172.9, markdownPct: 4, sellThroughProjectedPct: 71 },
      { sku: 'BLS-TRC-210', name: 'Blusa tricô oversized grafite G', currentPrice: 179.9, recommendedPrice: 179.9, markdownPct: 0, sellThroughProjectedPct: 72 },
    ],
    raise: [
      { sku: 'BLS-TRC-201', name: 'Blusa tricô oversized cru P', currentPrice: 179.9, recommendedPrice: 190.7, markdownPct: -6, sellThroughProjectedPct: 82 },
      { sku: 'BLS-TRC-202', name: 'Blusa tricô oversized preta M', currentPrice: 179.9, recommendedPrice: 188.9, markdownPct: -5, sellThroughProjectedPct: 80 },
      { sku: 'BLS-TRC-204', name: 'Blusa tricô oversized rosé G', currentPrice: 179.9, recommendedPrice: 193.3, markdownPct: -7, sellThroughProjectedPct: 78 },
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
    situation: string;
    nextAction: string;
    recommendedMarkdownPct: number;
    sellThroughProjectedPct: number;
    agedStockPct: number;
    marginPreservedPp: number;
    capitalUnlockedBRL: number;
    actInDays: number;
  }
> = {
  hold: {
    situation: 'Giro adequado',
    nextAction: 'Manter preço',
    recommendedMarkdownPct: 0,
    sellThroughProjectedPct: 78,
    agedStockPct: 6,
    marginPreservedPp: 4.8,
    capitalUnlockedBRL: 0,
    actInDays: 0,
  },
  markdown: {
    situation: 'Estoque envelhecido',
    nextAction: 'Markdown agora',
    recommendedMarkdownPct: 15,
    sellThroughProjectedPct: 82,
    agedStockPct: 41,
    marginPreservedPp: 9.4,
    capitalUnlockedBRL: 216000,
    actInDays: 0,
  },
  wait: {
    situation: 'Demanda sazonal futura',
    nextAction: 'Aguardar 14 dias',
    recommendedMarkdownPct: 0,
    sellThroughProjectedPct: 74,
    agedStockPct: 12,
    marginPreservedPp: 7.6,
    capitalUnlockedBRL: 62000,
    actInDays: 14,
  },
  raise: {
    situation: 'Giro acima da média',
    nextAction: 'Aumentar preço',
    recommendedMarkdownPct: -8,
    sellThroughProjectedPct: 80,
    agedStockPct: 4,
    marginPreservedPp: 6.2,
    capitalUnlockedBRL: 148000,
    actInDays: 0,
  },
};

// Argumento "POR QUE" específico por (produto × cluster). Cai no fallback por ação se faltar.
export const argumentsByProductAndAction: Record<string, Record<string, string>> = {
  'sku-1': {
    'sp-premium':
      'Idade média 63 d em SP Premium (+37% vs. categoria) com queda projetada de 2,1 pp/semana. Elasticidade −1,6 e coleção nova em 21 dias: markdown de 15% agora captura demanda de fim de ciclo e evita liquidação profunda (~30%), preservando 9,4 pp de margem.',
    'minas-gerais':
      'Velocidade 34 un/sem em MG (+55% vs. categoria) e estoque com 22 dias contra 41 da média. Elasticidade −0,7 indica baixa sensibilidade: markdown antecipado corta 4,8 pp de margem sem ganho relevante de giro. Preço aguenta as próximas 3 semanas dentro do sell-through de 78%.',
    sul:
      'Forecast sinaliza pico sazonal no Sul em 12–16 dias (frente fria + calendário regional), com elasticidade caindo de −1,1 para −0,4. Descontar agora antecipa margem que o clima devolve — a régua reprograma automaticamente para R$ 124,90 em 2 semanas se o giro não acompanhar.',
  },
  'sku-2': {
    'sp-premium':
      'Bota térmica com giro estável em SP (26 un/sem, dentro da média) e idade média de 24 dias. Elasticidade −0,8 e margem remanescente de 46 pp: manter preço protege posicionamento premium enquanto o sell-through segue em 78% sem estoque envelhecido.',
    'minas-gerais':
      'Sobre-estoque em MG (+38% vs. planejado) com giro 12 un/sem contra 22 da categoria. Idade média 71 dias e coleção descontinuada em 24 dias: markdown de 15% agora libera R$ 216 mil em capital e evita liquidação a −30% no fim do ciclo.',
    sul:
      'Sell-out 42 un/sem no Sul vs. 26 da categoria e ruptura projetada em 12 dias no pico da frente fria. Elasticidade −0,5 permite aumento controlado de +8% preservando conversão e capturando R$ 148 mil de margem incremental sem canibalizar SKUs correlatos.',
  },
  'sku-3': {
    'sp-premium':
      'Blusa tricô com giro 28 un/sem em SP (levemente acima da categoria) e estoque de 27 dias. Elasticidade −0,9 e margem em 44 pp: markdown agora não acelera giro material e sacrifica 4,3 pp de margem — manter preço mantém o sell-through de 78% até o final do ciclo.',
    'minas-gerais':
      'Giro 38 un/sem em BH/Uberlândia (+58% vs. categoria) com estoque enxuto (17 d) e coleção descontinuada em 30 d. Aumento de +6% ancora percepção premium e captura R$ 148 mil incremental com impacto marginal em sell-through (−1 pp).',
    sul:
      'Estoque envelhecendo no Sul (54 dias, +26% vs. categoria) com giro caindo para 15 un/sem. Elasticidade −1,4 e transição para primavera em 24 d: markdown de 15% agora sustenta sell-through em 82% e libera R$ 216 mil antes da coleção nova.',
  },
};

export const fallbackArgumentByAction: Record<ClusterAction, string> = {
  hold: 'Giro acima da categoria e elasticidade baixa; markdown antecipado corta margem sem ganho relevante de sell-through — o preço aguenta o ciclo dentro do plano.',
  markdown: 'Estoque envelhecido com perda projetada semanal de margem. Markdown cirúrgico agora captura demanda de fim de ciclo e evita liquidação profunda no final da coleção.',
  wait: 'Pico sazonal previsto na janela próxima com queda temporária de elasticidade. Aguardar preserva margem que o clima e o calendário devolvem antes de reavaliar o preço.',
  raise: 'Giro bem acima da categoria com elasticidade baixa e risco de ruptura na janela sazonal. Aumento controlado captura margem incremental sem impacto material em conversão.',
};

export const fmtBRL = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
export const fmtBRLk = (n: number) => {
  if (n <= 0) return 'R$ 0';
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(0)} mil`;
  return `R$ ${n.toFixed(0)}`;
};

// Short synthesis of what the model learned across visible clusters.
export const generalInsightFor = (list: TurnoverCluster[]): string => {
  if (list.length === 0) return 'Nenhum cluster no filtro atual.';
  const hold = list.filter((c) => c.action === 'hold').length;
  const md = list.filter((c) => c.action === 'markdown').length;
  const wait = list.filter((c) => c.action === 'wait').length;
  const parts: string[] = [];
  if (hold) parts.push(`${hold} com giro acima da categoria e elasticidade baixa → manter`);
  if (md)   parts.push(`${md} com estoque envelhecido e elasticidade alta → markdown cirúrgico agora`);
  if (wait) parts.push(`${wait} com pico sazonal próximo → aguardar janela`);
  return `O modelo lê, por cluster, velocidade vs. média da categoria, idade do estoque, elasticidade e janela sazonal, respeitando o piso de margem. ${parts.join('; ')}.`;
};
