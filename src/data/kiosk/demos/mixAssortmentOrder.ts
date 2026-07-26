// Static, PT-only dataset & compute for the "Mix, Sortimento e Pedido Ideal" demo.

export type PdvId = 'pdv-01' | 'pdv-02' | 'pdv-03';
export type RegionId = 'all' | 'sp-capital' | 'sp-interior' | 'mg' | 'sul';
export type ClusterId = 'all' | 'urbano-alto' | 'bairro-medio' | 'popular';
export type CategoryId = 'all' | 'mercearia' | 'bebidas' | 'higiene' | 'perecivel';
export type CycleId = 'c7' | 'c15' | 'c30';

export type Action = 'manter' | 'incluir' | 'substituir' | 'remover' | 'aumentar' | 'reduzir';

export const pdvs: { id: PdvId; label: string; sublabel: string }[] = [
  { id: 'pdv-01', label: 'PDV #01427', sublabel: 'Mercado Boa Vista — Centro' },
  { id: 'pdv-02', label: 'PDV #02189', sublabel: 'Empório do Bairro — Zona Sul' },
  { id: 'pdv-03', label: 'PDV #03502', sublabel: 'Rede Popular — Interior' },
];

export const regionsOptions: { id: RegionId; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'sp-capital', label: 'SP Capital' },
  { id: 'sp-interior', label: 'Interior de SP' },
  { id: 'mg', label: 'Minas Gerais' },
  { id: 'sul', label: 'Sul' },
];

export const clusters: { id: ClusterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'urbano-alto', label: 'Urbano alto poder' },
  { id: 'bairro-medio', label: 'Bairro classe média' },
  { id: 'popular', label: 'Popular alto giro' },
];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'mercearia', label: 'Mercearia' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'higiene', label: 'Higiene' },
  { id: 'perecivel', label: 'Perecíveis' },
];

export const cycles: { id: CycleId; label: string; days: number }[] = [
  { id: 'c7', label: '7 dias', days: 7 },
  { id: 'c15', label: '15 dias', days: 15 },
  { id: 'c30', label: '30 dias', days: 30 },
];

export const pipeline: { label: string; micro: string; durationMs: number }[] = [
  {
    label: 'Lendo vendas, estoque e mix atual do PDV',
    micro: 'Histórico de pedidos, sell-out, frequência e cobertura de estoque.',
    durationMs: 900,
  },
  {
    label: 'Comparando o PDV com operações semelhantes',
    micro: 'Lojas com perfil, região e comportamento de compra equivalentes.',
    durationMs: 850,
  },
  {
    label: 'Estimando demanda e risco por SKU',
    micro: 'Potencial de venda, ruptura, excesso, giro e probabilidade de recompra.',
    durationMs: 900,
  },
  {
    label: 'Analisando inclusão, substituição e complementaridade',
    micro: 'Produtos ausentes, redundantes ou com maior aderência ao perfil local.',
    durationMs: 900,
  },
  {
    label: 'Montando o pedido ideal sob restrições comerciais',
    micro: 'Limite financeiro, capacidade, estoque, embalagem mínima e política.',
    durationMs: 900,
  },
];

// --- Current mix snapshot (for the setup context cards) ---
export const currentMix = {
  skus: 28,
  atRisk: 4, // ruptura
  lowTurn: 7,
  notPositivated: 6,
  stockUnits: 3840,
  recentSales30d: 12760,
  lastOrder: { units: 2180, value: 41230 },
};

// --- Recommended mix summary ---
export const recommendedMix = {
  keep: 21,
  include: 5,
  substitute: 3,
  remove: 4,
  increase: 6,
};

// --- Cart / order lines ---
export type CartRow = {
  sku: string;
  name: string;
  category: string;
  action: Action;
  volume: number;
  delta: number; // +/- vs baseline; for incluir = full volume
  reason: string;
  factors: string[];
  turn: string;
  coverage: string;
  cluster: string;
  potential: string;
  unitPrice: number;
};

export const cart: CartRow[] = [
  {
    sku: 'SKU-8471',
    name: 'Produto A — Café torrado premium 500g',
    category: 'Mercearia',
    action: 'incluir',
    volume: 12,
    delta: 12,
    reason:
      'SKU ausente no mix atual, mas com alta demanda prevista no cluster. PDVs semelhantes têm boa recorrência de venda deste item, e sua inclusão complementa produtos já comprados por este cliente sem elevar significativamente o risco de estoque parado.',
    factors: [
      'Presente em 78% dos PDVs do mesmo cluster com giro médio 2.1x/semana',
      'Demanda prevista de 14 un./ciclo com margem 32% acima da média da categoria',
      'Complementa cesta de café solúvel e filtro de papel já positivados no PDV',
      'Risco de excesso baixo: cobertura projetada em 11 dias contra 15 dias de ciclo',
    ],
    turn: '2.1x/sem',
    coverage: '11 dias',
    cluster: '78% dos PDVs',
    potential: 'R$ 2.184/ciclo',
    unitPrice: 18.2,
  },
  {
    sku: 'SKU-3120',
    name: 'Produto B — Refrigerante lata 350ml',
    category: 'Bebidas',
    action: 'aumentar',
    volume: 48,
    delta: 8,
    reason:
      'Cobertura atual está abaixo do ideal frente à demanda projetada para o próximo ciclo. A sazonalidade favorável e o desempenho de PDVs semelhantes (que vendem em média 22% mais deste SKU no período) indicam espaço para elevar o volume, e a embalagem mínima permite a subida sem quebra logística.',
    factors: [
      'Sell-out cresceu 18% nas últimas 4 semanas — tendência confirmada',
      'PDVs pares vendem 22% mais volume deste SKU no mesmo período',
      'Cobertura atual em 9 dias contra 15 dias de ciclo — risco de ruptura',
      'Embalagem mínima de 8 un. — subida cabe sem fracionar caixa',
    ],
    turn: '3.4x/sem',
    coverage: '9 dias',
    cluster: '92% dos PDVs',
    potential: 'R$ 468 incremental',
    unitPrice: 3.9,
  },
  {
    sku: 'SKU-5548',
    name: 'Produto C — Sabão em pó 1kg (marca própria)',
    category: 'Higiene',
    action: 'substituir',
    volume: 6,
    delta: 6,
    reason:
      'O produto atual apresenta baixo giro e concorre diretamente com outro SKU de melhor desempenho no mesmo shelf. A substituição preserva a função da categoria, libera capital de giro, reduz estoque redundante e aumenta a probabilidade de venda — o SKU substituto tem margem líquida superior e sell-out mais estável, reduzindo também o risco de ruptura futura.',
    factors: [
      'SKU substituído com giro 0.6x/sem — abaixo do piso saudável (1.2x)',
      'Substituto tem margem líquida 4.8 p.p. superior e sell-out estável',
      'Ambos ocupam mesma função de shelf — troca não abre buraco de sortimento',
      'Capital liberado: R$ 620 realocável para SKUs de maior retorno',
    ],
    turn: '1.9x/sem',
    coverage: '13 dias',
    cluster: '65% dos PDVs',
    potential: 'R$ 312 margem líquida',
    unitPrice: 12.4,
  },
  {
    sku: 'SKU-9902',
    name: 'Produto D — Biscoito recheado 120g',
    category: 'Mercearia',
    action: 'reduzir',
    volume: 14,
    delta: -10,
    reason:
      'Cobertura acima do ideal e giro em queda nas últimas semanas indicam excesso. Há risco de aproximação da data de vencimento antes do próximo giro completo. O capital preso pode ser realocado para SKUs de maior retorno sem comprometer a presença do item no mix.',
    factors: [
      'Cobertura em 28 dias contra 15 dias de ciclo — excesso confirmado',
      'Giro caiu 24% nas últimas 3 semanas — tendência sustentada',
      'Vencimento médio da mercadoria em estoque: 42 dias',
      'Capital preso: R$ 340 realocável para SKUs de maior potencial',
    ],
    turn: '0.9x/sem',
    coverage: '28 dias',
    cluster: '54% dos PDVs',
    potential: 'R$ 340 liberados',
    unitPrice: 2.8,
  },
  {
    sku: 'SKU-6631',
    name: 'Produto E — Água mineral 1,5L',
    category: 'Bebidas',
    action: 'manter',
    volume: 36,
    delta: 0,
    reason:
      'Desempenho dentro da faixa saudável do cluster, sem sinal de ruptura nem excesso. Contribuição estável à cesta e cobertura alinhada ao ciclo — não há oportunidade de ganho relevante ao mexer neste SKU agora.',
    factors: [
      'Giro 2.4x/sem — dentro da faixa saudável do cluster',
      'Cobertura em 14 dias — alinhada ao ciclo de 15 dias',
      'Sell-out estável nas últimas 8 semanas',
      'Sem sinal de canibalização com outros SKUs de bebidas',
    ],
    turn: '2.4x/sem',
    coverage: '14 dias',
    cluster: '88% dos PDVs',
    potential: 'Estável',
    unitPrice: 4.2,
  },
  {
    sku: 'SKU-4408',
    name: 'Produto F — Achocolatado em pó 400g',
    category: 'Mercearia',
    action: 'incluir',
    volume: 8,
    delta: 8,
    reason:
      'SKU não positivado, com forte aderência ao perfil do cluster e complementaridade direta com leite e café já vendidos neste PDV. A demanda projetada para o ciclo é suficiente para justificar a inclusão sem gerar excesso.',
    factors: [
      'Presente em 71% dos PDVs pares com giro médio 1.8x/sem',
      'Alta complementaridade com leite integral e café — cesta compartilhada',
      'Demanda prevista de 9 un./ciclo — cobertura projetada de 12 dias',
      'Sem risco de canibalização — categoria sem substituto direto no mix',
    ],
    turn: '1.8x/sem',
    coverage: '12 dias',
    cluster: '71% dos PDVs',
    potential: 'R$ 1.256/ciclo',
    unitPrice: 15.7,
  },
  {
    sku: 'SKU-1177',
    name: 'Produto G — Iogurte natural 170g',
    category: 'Perecíveis',
    action: 'aumentar',
    volume: 30,
    delta: 6,
    reason:
      'Sell-out em aceleração e cobertura abaixo do ideal para o ciclo. PDVs pares registram volume superior, e o SKU tem alto potencial de recompra semanal. Subida controlada respeita a vida útil curta do perecível.',
    factors: [
      'Sell-out cresceu 14% nas últimas 4 semanas',
      'Cobertura em 8 dias — abaixo do ciclo de 15 dias',
      'Vida útil de 21 dias — subida controlada evita perda',
      'Recompra semanal em 62% dos consumidores do cluster',
    ],
    turn: '3.1x/sem',
    coverage: '8 dias',
    cluster: '84% dos PDVs',
    potential: 'R$ 198 incremental',
    unitPrice: 3.3,
  },
  {
    sku: 'SKU-2245',
    name: 'Produto H — Detergente líquido 500ml',
    category: 'Higiene',
    action: 'substituir',
    volume: 12,
    delta: 12,
    reason:
      'O SKU atual concorre com outro item da mesma função com desempenho estruturalmente melhor. A substituição preserva a categoria, reduz redundância e melhora a rentabilidade do shelf sem risco de abrir buraco de sortimento.',
    factors: [
      'SKU substituído com giro 0.7x/sem — abaixo do piso saudável',
      'Substituto com margem 3.2 p.p. superior e sell-out estável',
      'Ambos ocupam mesma função — troca é neutra em cobertura',
      'PDVs pares que fizeram a troca elevaram receita da categoria em 6%',
    ],
    turn: '2.2x/sem',
    coverage: '14 dias',
    cluster: '69% dos PDVs',
    potential: 'R$ 268 margem',
    unitPrice: 6.9,
  },
  {
    sku: 'SKU-7714',
    name: 'Produto I — Papel higiênico 12 rolos',
    category: 'Higiene',
    action: 'manter',
    volume: 24,
    delta: 0,
    reason:
      'Item de tíquete alto com giro consistente e cobertura alinhada ao ciclo. Presença estável na cesta média do PDV — sem sinal que justifique mexer no volume agora.',
    factors: [
      'Giro 1.6x/sem — dentro da faixa saudável para item de alto tíquete',
      'Cobertura em 15 dias — alinhada ao ciclo',
      'Ticket médio elevado — contribuição estável ao pedido',
      'Sem oscilação relevante de sell-out nas últimas 6 semanas',
    ],
    turn: '1.6x/sem',
    coverage: '15 dias',
    cluster: '81% dos PDVs',
    potential: 'Estável',
    unitPrice: 22.5,
  },
  {
    sku: 'SKU-5560',
    name: 'Produto J — Bolacha água e sal 200g',
    category: 'Mercearia',
    action: 'remover',
    volume: 0,
    delta: -8,
    reason:
      'Giro estruturalmente baixo, com sell-out em declínio há 3 ciclos consecutivos e sem sinal de recuperação. Há SKU semelhante no mix com desempenho superior — a remoção libera espaço de shelf e capital sem abrir buraco de categoria.',
    factors: [
      'Giro 0.4x/sem — abaixo do piso mínimo em 3 ciclos consecutivos',
      'Sell-out em queda sustentada de 8% ao ciclo',
      'SKU par no mix cobre a mesma função com giro 3x maior',
      'Capital liberado: R$ 220 realocável imediatamente',
    ],
    turn: '0.4x/sem',
    coverage: '32 dias',
    cluster: '38% dos PDVs',
    potential: 'R$ 220 liberados',
    unitPrice: 3.5,
  },
];

// --- KPIs ---
export const kpis = {
  incrementalOrder: 8420, // R$
  potentialTicket: 41230 + 8420,
  newPositivated: 5,
  ruptureReduction: 62, // %
};

// --- General insight (when no SKU selected) ---
export const generalInsight =
  'O modelo consolidou 21 SKUs de manutenção, 5 inclusões, 3 substituições e 4 remoções priorizando os SKUs com maior potencial líquido no cluster. O pedido incremental sugerido de R$ 8.420 respeita limite financeiro, capacidade de estoque e embalagens mínimas — e reduz o risco de ruptura em 62% sobre a base atual.';

// --- Formatters ---
export const fmtBR = (n: number) => n.toLocaleString('pt-BR');
export const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

// --- Action metadata ---
export const actionMeta: Record<Action, { label: string; tone: string }> = {
  manter: { label: 'Manter', tone: 'text-white/70 bg-white/[0.06] border-white/20' },
  incluir: { label: 'Incluir', tone: 'text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/40' },
  aumentar: { label: 'Aumentar', tone: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/40' },
  substituir: { label: 'Substituir', tone: 'text-[#F4845F] bg-[#F4845F]/10 border-[#F4845F]/40' },
  reduzir: { label: 'Reduzir', tone: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/40' },
  remover: { label: 'Remover', tone: 'text-[#f87171] bg-[#f87171]/10 border-[#f87171]/40' },
};

export const labels = {
  objective: 'OBJETIVO: MIX E PEDIDO',
  reasoningTitle: 'Como o modelo está pensando',
  reasoningSubtitle: 'Do PDV ao pedido ideal, sob restrições reais.',
  setup: {
    title: 'Portal de vendas B2B',
    subtitle: 'Configure o PDV e o próximo ciclo de abastecimento.',
    pdv: 'Loja / PDV',
    region: 'Região',
    cluster: 'Cluster',
    category: 'Categoria',
    cycle: 'Próximo ciclo',
    contextTitle: 'Contexto atual do PDV',
    contextMix: 'Mix atual',
    contextStock: 'Estoque disponível',
    contextSales: 'Vendas recentes (30d)',
    contextLast: 'Último pedido',
    contextNotPos: 'Não positivados',
    cta: 'Gerar mix e pedido ideal',
  },
  running: 'Processando mix e pedido ideal…',
  result: {
    title: 'Mix e pedido ideal',
    subtitle: 'Comparação, carrinho sugerido e justificativas.',
    compareTitle: 'Comparação de mix',
    currentTitle: 'Mix atual',
    recommendedTitle: 'Mix recomendado',
    currentSkus: 'SKUs no mix',
    currentAtRisk: 'Com risco de ruptura',
    currentLowTurn: 'Com baixo giro',
    currentNotPos: 'Oportunidades não positivadas',
    recKeep: 'manter',
    recInclude: 'incluir',
    recSubstitute: 'substituir',
    recRemove: 'remover',
    recIncrease: 'aumentar volume',
    cartTitle: 'Carrinho de pedido sugerido',
    cartHint: 'Clique em um SKU para ver a justificativa.',
    colSku: 'SKU',
    colAction: 'Ação',
    colVolume: 'Volume sugerido',
    kpiIncremental: 'Pedido incremental',
    kpiTicket: 'Ticket potencial',
    kpiNewPos: 'Novos produtos positivados',
    kpiRupture: 'Risco de ruptura reduzido',
    insightGeneralTitle: 'Por que essa recomendação',
    insightSkuTitle: 'Por que este SKU',
    newSimulation: 'Nova simulação',
    drillFactors: 'Fatores considerados',
    drillTurn: 'Giro',
    drillCoverage: 'Cobertura',
    drillCluster: 'Presença no cluster',
    drillPotential: 'Potencial',
    drillClose: 'Fechar',
  },
} as const;
