// Static, PT-only dataset & compute for the "Mix, Sortimento e Pedido Ideal" demo.

export type PdvId = 'all' | 'pdv-01' | 'pdv-02' | 'pdv-03';
export type RegionId = 'all' | 'sp-capital' | 'sp-interior' | 'mg' | 'sul';

export type Action = 'manter' | 'incluir' | 'substituir' | 'remover' | 'aumentar' | 'reduzir';

export const pdvs: { id: PdvId; label: string; sublabel: string }[] = [
  { id: 'all', label: 'Todos', sublabel: 'Rede consolidada' },
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

export const pipeline: { label: string; micro: string; durationMs: number }[] = [
  {
    label: 'Lendo vendas, estoque e mix atual do PDV',
    micro: 'Histórico de pedidos, sell-out, frequência e cobertura de estoque.',
    durationMs: 900,
  },
  {
    label: 'Aprendendo a performance do PDV',
    micro: 'Giro, margem e ruptura sob comportamento contextual — clima, calendário, cluster e vizinhança.',
    durationMs: 850,
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

// --- Cart / order lines (base — filtered by pdv/region via helpers below) ---
export type CartRow = {
  sku: string;
  name: string;
  category: string;
  action: Action;
  volume: number;
  delta: number; // +/- vs baseline; for incluir = full volume
  reason: string;
  turn: string;
  coverage: string;
  cluster: string;
  potential: string;
  unitPrice: number;
  /** PDVs where this SKU decision applies. */
  pdvScope: Exclude<PdvId, 'all'>[];
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
      'SKU ausente no mix atual, mas presente em 78% dos PDVs do mesmo cluster com giro médio de 2.1x/semana. Demanda prevista de 14 un./ciclo, com margem 32% acima da média da categoria e cobertura projetada em 11 dias contra 15 do ciclo — inclusão complementa a cesta de café solúvel e filtro já positivados sem risco de excesso. Potencial estimado: R$ 2.184/ciclo.',
    turn: '2.1x/sem',
    coverage: '11 dias',
    cluster: '78% dos PDVs',
    potential: 'R$ 2.184/ciclo',
    unitPrice: 18.2,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-3120',
    name: 'Produto B — Refrigerante lata 350ml',
    category: 'Bebidas',
    action: 'aumentar',
    volume: 48,
    delta: 8,
    reason:
      'Sell-out cresceu 18% nas últimas 4 semanas e PDVs pares vendem 22% mais volume deste SKU no período — tendência confirmada. Cobertura atual em 9 dias contra ciclo de 15 indica risco de ruptura. Giro de 3.4x/sem e embalagem mínima de 8 un. permitem a subida sem fracionar caixa. Ganho incremental estimado: R$ 468.',
    turn: '3.4x/sem',
    coverage: '9 dias',
    cluster: '92% dos PDVs',
    potential: 'R$ 468 incremental',
    unitPrice: 3.9,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-5548',
    name: 'Produto C — Sabão em pó 1kg (marca própria)',
    category: 'Higiene',
    action: 'substituir',
    volume: 6,
    delta: 6,
    reason:
      'SKU atual com giro de 0.6x/sem — abaixo do piso saudável de 1.2x — e concorrendo diretamente com outro item da mesma função de shelf. Substituto tem margem líquida 4.8 p.p. superior, sell-out estável e libera R$ 620 de capital de giro realocável, sem abrir buraco de sortimento. Margem líquida projetada: R$ 312.',
    turn: '1.9x/sem',
    coverage: '13 dias',
    cluster: '65% dos PDVs',
    potential: 'R$ 312 margem líquida',
    unitPrice: 12.4,
    pdvScope: ['pdv-01', 'pdv-03'],
  },
  {
    sku: 'SKU-9902',
    name: 'Produto D — Biscoito recheado 120g',
    category: 'Mercearia',
    action: 'reduzir',
    volume: 14,
    delta: -10,
    reason:
      'Cobertura em 28 dias contra 15 do ciclo indica excesso confirmado, com giro em queda de 24% nas últimas 3 semanas. Vencimento médio do estoque em 42 dias eleva risco de perda antes do próximo giro completo. Redução libera R$ 340 de capital para SKUs de maior retorno, sem comprometer presença no mix.',
    turn: '0.9x/sem',
    coverage: '28 dias',
    cluster: '54% dos PDVs',
    potential: 'R$ 340 liberados',
    unitPrice: 2.8,
    pdvScope: ['pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-6631',
    name: 'Produto E — Água mineral 1,5L',
    category: 'Bebidas',
    action: 'manter',
    volume: 36,
    delta: 0,
    reason:
      'Giro de 2.4x/sem dentro da faixa saudável do cluster, cobertura em 14 dias alinhada ao ciclo de 15 e sell-out estável nas últimas 8 semanas. Sem sinal de canibalização com outros SKUs de bebidas — não há oportunidade de ganho relevante ao mexer neste item agora.',
    turn: '2.4x/sem',
    coverage: '14 dias',
    cluster: '88% dos PDVs',
    potential: 'Estável',
    unitPrice: 4.2,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-4408',
    name: 'Produto F — Achocolatado em pó 400g',
    category: 'Mercearia',
    action: 'incluir',
    volume: 8,
    delta: 8,
    reason:
      'SKU não positivado, presente em 71% dos PDVs pares com giro médio de 1.8x/sem. Alta complementaridade com leite integral e café — cesta compartilhada — e demanda prevista de 9 un./ciclo com cobertura projetada de 12 dias. Sem risco de canibalização, categoria sem substituto direto no mix. Potencial: R$ 1.256/ciclo.',
    turn: '1.8x/sem',
    coverage: '12 dias',
    cluster: '71% dos PDVs',
    potential: 'R$ 1.256/ciclo',
    unitPrice: 15.7,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-1177',
    name: 'Produto G — Iogurte natural 170g',
    category: 'Perecíveis',
    action: 'aumentar',
    volume: 30,
    delta: 6,
    reason:
      'Sell-out em aceleração de 14% nas últimas 4 semanas e cobertura em 8 dias — abaixo do ciclo de 15. Giro de 3.1x/sem, recompra semanal em 62% dos consumidores do cluster e vida útil de 21 dias permitem subida controlada sem risco de perda. Incremento estimado: R$ 198.',
    turn: '3.1x/sem',
    coverage: '8 dias',
    cluster: '84% dos PDVs',
    potential: 'R$ 198 incremental',
    unitPrice: 3.3,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-2245',
    name: 'Produto H — Detergente líquido 500ml',
    category: 'Higiene',
    action: 'substituir',
    volume: 12,
    delta: 12,
    reason:
      'SKU substituído com giro de 0.7x/sem — abaixo do piso saudável. Substituto tem margem 3.2 p.p. superior, sell-out estável e ocupa a mesma função de shelf — troca é neutra em cobertura. PDVs pares que fizeram a troca elevaram receita da categoria em 6%. Margem projetada: R$ 268.',
    turn: '2.2x/sem',
    coverage: '14 dias',
    cluster: '69% dos PDVs',
    potential: 'R$ 268 margem',
    unitPrice: 6.9,
    pdvScope: ['pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-7714',
    name: 'Produto I — Papel higiênico 12 rolos',
    category: 'Higiene',
    action: 'manter',
    volume: 24,
    delta: 0,
    reason:
      'Giro de 1.6x/sem dentro da faixa saudável para item de alto tíquete, cobertura em 15 dias alinhada ao ciclo e sell-out sem oscilação relevante nas últimas 6 semanas. Contribuição estável à cesta do PDV — sem sinal que justifique mexer no volume agora.',
    turn: '1.6x/sem',
    coverage: '15 dias',
    cluster: '81% dos PDVs',
    potential: 'Estável',
    unitPrice: 22.5,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-5560',
    name: 'Produto J — Bolacha água e sal 200g',
    category: 'Mercearia',
    action: 'remover',
    volume: 0,
    delta: -8,
    reason:
      'Giro estruturalmente baixo de 0.4x/sem em 3 ciclos consecutivos, com sell-out em queda sustentada de 8% ao ciclo. SKU par no mix cobre a mesma função com giro 3x maior — remoção libera R$ 220 de capital realocável imediatamente sem abrir buraco de categoria.',
    turn: '0.4x/sem',
    coverage: '32 dias',
    cluster: '38% dos PDVs',
    potential: 'R$ 220 liberados',
    unitPrice: 3.5,
    pdvScope: ['pdv-01', 'pdv-03'],
  },
];

// --- Deterministic contextual helpers ---
// Multipliers per (pdv, region) so that context tiles, cart filter and KPIs
// react to filter changes without a backend.
const pdvFactor: Record<PdvId, number> = {
  all: 1.0,
  'pdv-01': 0.92,
  'pdv-02': 1.08,
  'pdv-03': 0.78,
};
const regionFactor: Record<RegionId, number> = {
  all: 1.0,
  'sp-capital': 1.12,
  'sp-interior': 0.94,
  mg: 0.88,
  sul: 1.02,
};

const combined = (pdv: PdvId, region: RegionId) => pdvFactor[pdv] * regionFactor[region];

// --- Current mix snapshot — reactive to filters ---
export type MixContext = {
  skus: number;
  atRisk: number;
  lowTurn: number;
  notPositivated: number;
  stockUnits: number;
  recentSales30d: number;
  lastOrder: { units: number; value: number };
};

export const contextFor = (pdv: PdvId, region: RegionId): MixContext => {
  const f = combined(pdv, region);
  return {
    skus: Math.round(28 * (0.85 + 0.15 * f)),
    atRisk: Math.max(1, Math.round(4 * (2 - f))),
    lowTurn: Math.max(2, Math.round(7 * (1.6 - 0.6 * f))),
    notPositivated: Math.max(2, Math.round(6 * (1.8 - 0.8 * f))),
    stockUnits: Math.round(3840 * f),
    recentSales30d: Math.round(12760 * f),
    lastOrder: {
      units: Math.round(2180 * f),
      value: Math.round(41230 * f),
    },
  };
};

// --- Cart filtered by (pdv, region) ---
export const cartFor = (pdv: PdvId, region: RegionId): CartRow[] => {
  let rows = pdv === 'all' ? cart : cart.filter((r) => r.pdvScope.includes(pdv));
  if (region !== 'all') {
    // Deterministic per-region trim: drop ~1-2 rows based on region hash so
    // that filter changes visibly reshape the recommendation.
    const skipIdx = (region.length + region.charCodeAt(0)) % rows.length;
    rows = rows.filter((_, i) => i !== skipIdx);
  }
  return rows;
};

// --- Recommended mix summary — derived from filtered cart ---
export const recommendedFor = (rows: CartRow[]) => ({
  keep: rows.filter((r) => r.action === 'manter').length + 18, // baseline 18 untouched
  include: rows.filter((r) => r.action === 'incluir').length,
  substitute: rows.filter((r) => r.action === 'substituir').length,
  remove: rows.filter((r) => r.action === 'remover').length,
  increase: rows.filter((r) => r.action === 'aumentar').length + 3, // baseline 3
});

// --- KPIs — derived from filtered cart + context ---
export const kpisFor = (rows: CartRow[], ctx: MixContext) => {
  const incremental = rows.reduce((acc, r) => {
    if (r.action === 'incluir') return acc + r.volume * r.unitPrice;
    if (r.action === 'aumentar') return acc + r.delta * r.unitPrice;
    if (r.action === 'substituir') return acc + r.volume * r.unitPrice * 0.4;
    if (r.action === 'reduzir' || r.action === 'remover')
      return acc - Math.abs(r.delta) * r.unitPrice * 0.5;
    return acc;
  }, 0);
  const incrementalRounded = Math.max(0, Math.round(incremental));
  return {
    incrementalOrder: incrementalRounded,
    potentialTicket: ctx.lastOrder.value + incrementalRounded,
    newPositivated: rows.filter((r) => r.action === 'incluir').length,
    ruptureReduction: Math.min(78, 40 + rows.filter((r) => r.action !== 'manter').length * 4),
  };
};

// --- General insight ---
export const generalInsightFor = (rows: CartRow[]) => {
  const keep = rows.filter((r) => r.action === 'manter').length + 18;
  const include = rows.filter((r) => r.action === 'incluir').length;
  const substitute = rows.filter((r) => r.action === 'substituir').length;
  const remove = rows.filter((r) => r.action === 'remover').length;
  return `O modelo consolidou ${keep} SKUs de manutenção, ${include} inclusões, ${substitute} substituições e ${remove} remoções priorizando os SKUs com maior potencial líquido no cluster. O pedido incremental sugerido respeita limite financeiro, capacidade de estoque e embalagens mínimas — e reduz o risco de ruptura sobre a base atual.`;
};

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
    subtitle: 'Configure o PDV e a região para simular o próximo ciclo de abastecimento.',
    pdv: 'Loja / PDV',
    region: 'Região',
    contextTitle: 'Contexto atual do PDV',
    contextMix: 'Mix atual',
    contextStock: 'Estoque disponível',
    contextSales: 'Vendas recentes (30d)',
    contextLast: 'Último pedido',
    contextNotPos: 'Não positivados',
    contextRupture: 'Ruptura em curso',
    cta: 'Gerar mix e pedido ideal',
  },
  running: 'Processando mix e pedido ideal…',
  result: {
    title: 'Mix e pedido ideal',
    subtitle: 'Comparação, carrinho sugerido e justificativas.',
    filtersTitle: 'Filtros ativos',
    currentTitle: 'Mix atual',
    recommendedTitle: 'Mix recomendado',
    recommendedHint: 'Clique para ver o consolidado',
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
    drillTurn: 'Giro',
    drillCoverage: 'Cobertura',
    drillCluster: 'Presença no cluster',
    drillPotential: 'Potencial',
  },
} as const;
