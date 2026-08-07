// Bilingual (pt/en), static dataset & compute for the "Mix, Sortimento e Pedido Ideal" demo.

import type { KioskLang } from '@/data/kiosk/config';

export type PdvId = 'all' | 'pdv-01' | 'pdv-02' | 'pdv-03';
export type RegionId = 'all' | 'sp-capital' | 'sp-interior' | 'mg' | 'sul';

export type Action = 'manter' | 'incluir' | 'substituir' | 'remover' | 'aumentar' | 'reduzir';

export const pdvs: { id: PdvId; labelPt: string; labelEn: string; sublabelPt: string; sublabelEn: string }[] = [
  { id: 'all', labelPt: 'Todos', labelEn: 'All', sublabelPt: 'Rede consolidada', sublabelEn: 'Consolidated network' },
  { id: 'pdv-01', labelPt: 'PDV #01427', labelEn: 'POS #01427', sublabelPt: 'Mercado Boa Vista — Centro', sublabelEn: 'Mercado Boa Vista — Downtown' },
  { id: 'pdv-02', labelPt: 'PDV #02189', labelEn: 'POS #02189', sublabelPt: 'Empório do Bairro — Zona Sul', sublabelEn: 'Empório do Bairro — South Zone' },
  { id: 'pdv-03', labelPt: 'PDV #03502', labelEn: 'POS #03502', sublabelPt: 'Rede Popular — Interior', sublabelEn: 'Rede Popular — Countryside' },
];

export const regionsOptions: { id: RegionId; labelPt: string; labelEn: string }[] = [
  { id: 'all', labelPt: 'Todas', labelEn: 'All' },
  { id: 'sp-capital', labelPt: 'SP Capital', labelEn: 'SP Capital' },
  { id: 'sp-interior', labelPt: 'Interior de SP', labelEn: 'SP Countryside' },
  { id: 'mg', labelPt: 'Minas Gerais', labelEn: 'Minas Gerais' },
  { id: 'sul', labelPt: 'Sul', labelEn: 'South' },
];

export const pipeline: { labelPt: string; labelEn: string; microPt: string; microEn: string; durationMs: number }[] = [
  {
    labelPt: 'Lendo vendas, estoque e mix atual do PDV',
    labelEn: 'Reading sales, stock and current PDV mix',
    microPt: 'Histórico de pedidos, sell-out, frequência e cobertura de estoque.',
    microEn: 'Order history, sell-out, frequency and stock coverage.',
    durationMs: 900,
  },
  {
    labelPt: 'Aprendendo a performance do PDV',
    labelEn: 'Learning point-of-sale performance',
    microPt: 'Giro, margem e ruptura sob comportamento contextual — clima, calendário, cluster e vizinhança.',
    microEn: 'Turnover, margin and stockout under contextual behavior — weather, calendar, cluster and neighborhood.',
    durationMs: 850,
  },
  {
    labelPt: 'Comparando o PDV com operações semelhantes',
    labelEn: 'Comparing the PDV with similar operations',
    microPt: 'Lojas com perfil, região e comportamento de compra equivalentes.',
    microEn: 'Stores with equivalent profile, region and purchase behavior.',
    durationMs: 850,
  },
  {
    labelPt: 'Estimando demanda e risco por SKU',
    labelEn: 'Estimating demand and risk per SKU',
    microPt: 'Potencial de venda, ruptura, excesso, giro e probabilidade de recompra.',
    microEn: 'Sales potential, stockout, excess, turnover and repurchase probability.',
    durationMs: 900,
  },
  {
    labelPt: 'Analisando inclusão, substituição e complementaridade',
    labelEn: 'Analyzing inclusion, substitution and complementarity',
    microPt: 'Produtos ausentes, redundantes ou com maior aderência ao perfil local.',
    microEn: 'Missing, redundant or highly locally-adherent products.',
    durationMs: 900,
  },
  {
    labelPt: 'Montando o pedido ideal sob restrições comerciais',
    labelEn: 'Assembling the ideal order under commercial constraints',
    microPt: 'Limite financeiro, capacidade, estoque, embalagem mínima e política.',
    microEn: 'Financial limit, capacity, stock, minimum package and policy.',
    durationMs: 900,
  },
];

// --- Cart / order lines (base — filtered by pdv/region via helpers below) ---
export type CartRow = {
  sku: string;
  namePt: string;
  nameEn: string;
  categoryPt: string;
  categoryEn: string;
  action: Action;
  volume: number;
  delta: number; // +/- vs baseline; for incluir = full volume
  reasonPt: string;
  reasonEn: string;
  turn: string;
  coveragePt: string;
  coverageEn: string;
  clusterPt: string;
  clusterEn: string;
  potentialPt: string;
  potentialEn: string;
  unitPrice: number;
  /** PDVs where this SKU decision applies. */
  pdvScope: Exclude<PdvId, 'all'>[];
};

export const cart: CartRow[] = [
  {
    sku: 'SKU-8471',
    namePt: 'Produto A — Café torrado premium 500g',
    nameEn: 'Product A — Premium roasted coffee 500g',
    categoryPt: 'Mercearia',
    categoryEn: 'Groceries',
    action: 'incluir',
    volume: 12,
    delta: 12,
    reasonPt:
      'SKU ausente no mix atual, mas presente em 78% dos PDVs do mesmo cluster com giro médio de 2.1x/semana. Demanda prevista de 14 un./ciclo, com margem 32% acima da média da categoria e cobertura projetada em 11 dias contra 15 do ciclo — inclusão complementa a cesta de café solúvel e filtro já positivados sem risco de excesso. Potencial estimado: R$ 2.184/ciclo.',
    reasonEn:
      'SKU absent from the current mix, but present in 78% of the PDVs in the same cluster with average turnover of 2.1x/week. Forecasted demand of 14 units/cycle, with margin 32% above the category average and projected coverage of 11 days against a 15-day cycle — inclusion complements the already-positivated instant coffee and filter basket without excess risk. Estimated potential: R$ 2,184/cycle.',
    turn: '2.1x/sem',
    coveragePt: '11 dias',
    coverageEn: '11 days',
    clusterPt: '78% dos PDVs',
    clusterEn: '78% of PDVs',
    potentialPt: 'R$ 2.184/ciclo',
    potentialEn: 'R$ 2,184/cycle',
    unitPrice: 18.2,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-3120',
    namePt: 'Produto B — Refrigerante lata 350ml',
    nameEn: 'Product B — Soft drink can 350ml',
    categoryPt: 'Bebidas',
    categoryEn: 'Beverages',
    action: 'aumentar',
    volume: 48,
    delta: 8,
    reasonPt:
      'Sell-out cresceu 18% nas últimas 4 semanas e PDVs pares vendem 22% mais volume deste SKU no período — tendência confirmada. Cobertura atual em 9 dias contra ciclo de 15 indica risco de ruptura. Giro de 3.4x/sem e embalagem mínima de 8 un. permitem a subida sem fracionar caixa. Ganho incremental estimado: R$ 468.',
    reasonEn:
      'Sell-out grew 18% over the last 4 weeks and peer PDVs sell 22% more volume of this SKU in the period — trend confirmed. Current coverage of 9 days against a 15-day cycle indicates stockout risk. Turnover of 3.4x/week and a minimum package of 8 units allow the increase without splitting a case. Estimated incremental gain: R$ 468.',
    turn: '3.4x/sem',
    coveragePt: '9 dias',
    coverageEn: '9 days',
    clusterPt: '92% dos PDVs',
    clusterEn: '92% of PDVs',
    potentialPt: 'R$ 468 incremental',
    potentialEn: 'R$ 468 incremental',
    unitPrice: 3.9,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-5548',
    namePt: 'Produto C — Sabão em pó 1kg (marca própria)',
    nameEn: 'Product C — Powder detergent 1kg (private label)',
    categoryPt: 'Higiene',
    categoryEn: 'Hygiene',
    action: 'substituir',
    volume: 6,
    delta: 6,
    reasonPt:
      'SKU atual com giro de 0.6x/sem — abaixo do piso saudável de 1.2x — e concorrendo diretamente com outro item da mesma função de shelf. Substituto tem margem líquida 4.8 p.p. superior, sell-out estável e libera R$ 620 de capital de giro realocável, sem abrir buraco de sortimento. Margem líquida projetada: R$ 312.',
    reasonEn:
      'Current SKU with turnover of 0.6x/week — below the healthy floor of 1.2x — and competing directly with another item in the same shelf function. The replacement has 4.8 p.p. higher net margin, stable sell-out and frees R$ 620 of reallocatable working capital, without opening an assortment gap. Projected net margin: R$ 312.',
    turn: '1.9x/sem',
    coveragePt: '13 dias',
    coverageEn: '13 days',
    clusterPt: '65% dos PDVs',
    clusterEn: '65% of PDVs',
    potentialPt: 'R$ 312 margem líquida',
    potentialEn: 'R$ 312 net margin',
    unitPrice: 12.4,
    pdvScope: ['pdv-01', 'pdv-03'],
  },
  {
    sku: 'SKU-9902',
    namePt: 'Produto D — Biscoito recheado 120g',
    nameEn: 'Product D — Filled cookies 120g',
    categoryPt: 'Mercearia',
    categoryEn: 'Groceries',
    action: 'reduzir',
    volume: 14,
    delta: -10,
    reasonPt:
      'Cobertura em 28 dias contra 15 do ciclo indica excesso confirmado, com giro em queda de 24% nas últimas 3 semanas. Vencimento médio do estoque em 42 dias eleva risco de perda antes do próximo giro completo. Redução libera R$ 340 de capital para SKUs de maior retorno, sem comprometer presença no mix.',
    reasonEn:
      'Coverage of 28 days against a 15-day cycle indicates confirmed excess, with turnover down 24% over the last 3 weeks. Average stock expiry of 42 days raises the risk of loss before the next full turn. The reduction frees R$ 340 of capital for higher-return SKUs, without compromising presence in the mix.',
    turn: '0.9x/sem',
    coveragePt: '28 dias',
    coverageEn: '28 days',
    clusterPt: '54% dos PDVs',
    clusterEn: '54% of PDVs',
    potentialPt: 'R$ 340 liberados',
    potentialEn: 'R$ 340 freed',
    unitPrice: 2.8,
    pdvScope: ['pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-6631',
    namePt: 'Produto E — Água mineral 1,5L',
    nameEn: 'Product E — Mineral water 1.5L',
    categoryPt: 'Bebidas',
    categoryEn: 'Beverages',
    action: 'manter',
    volume: 36,
    delta: 0,
    reasonPt:
      'Giro de 2.4x/sem dentro da faixa saudável do cluster, cobertura em 14 dias alinhada ao ciclo de 15 e sell-out estável nas últimas 8 semanas. Sem sinal de canibalização com outros SKUs de bebidas — não há oportunidade de ganho relevante ao mexer neste item agora.',
    reasonEn:
      'Turnover of 2.4x/week within the cluster\'s healthy range, coverage of 14 days aligned with the 15-day cycle and stable sell-out over the last 8 weeks. No sign of cannibalization with other beverage SKUs — there is no relevant gain opportunity in touching this item now.',
    turn: '2.4x/sem',
    coveragePt: '14 dias',
    coverageEn: '14 days',
    clusterPt: '88% dos PDVs',
    clusterEn: '88% of PDVs',
    potentialPt: 'Estável',
    potentialEn: 'Stable',
    unitPrice: 4.2,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-4408',
    namePt: 'Produto F — Achocolatado em pó 400g',
    nameEn: 'Product F — Chocolate powder drink 400g',
    categoryPt: 'Mercearia',
    categoryEn: 'Groceries',
    action: 'incluir',
    volume: 8,
    delta: 8,
    reasonPt:
      'SKU não positivado, presente em 71% dos PDVs pares com giro médio de 1.8x/sem. Alta complementaridade com leite integral e café — cesta compartilhada — e demanda prevista de 9 un./ciclo com cobertura projetada de 12 dias. Sem risco de canibalização, categoria sem substituto direto no mix. Potencial: R$ 1.256/ciclo.',
    reasonEn:
      'SKU not positivated, present in 71% of peer PDVs with average turnover of 1.8x/week. High complementarity with whole milk and coffee — shared basket — and forecasted demand of 9 units/cycle with projected coverage of 12 days. No cannibalization risk, category has no direct substitute in the mix. Potential: R$ 1,256/cycle.',
    turn: '1.8x/sem',
    coveragePt: '12 dias',
    coverageEn: '12 days',
    clusterPt: '71% dos PDVs',
    clusterEn: '71% of PDVs',
    potentialPt: 'R$ 1.256/ciclo',
    potentialEn: 'R$ 1,256/cycle',
    unitPrice: 15.7,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-1177',
    namePt: 'Produto G — Iogurte natural 170g',
    nameEn: 'Product G — Plain yogurt 170g',
    categoryPt: 'Perecíveis',
    categoryEn: 'Perishables',
    action: 'aumentar',
    volume: 30,
    delta: 6,
    reasonPt:
      'Sell-out em aceleração de 14% nas últimas 4 semanas e cobertura em 8 dias — abaixo do ciclo de 15. Giro de 3.1x/sem, recompra semanal em 62% dos consumidores do cluster e vida útil de 21 dias permitem subida controlada sem risco de perda. Incremento estimado: R$ 198.',
    reasonEn:
      'Sell-out accelerating 14% over the last 4 weeks and coverage of 8 days — below the 15-day cycle. Turnover of 3.1x/week, weekly repurchase by 62% of the cluster\'s consumers and a 21-day shelf life allow a controlled increase without loss risk. Estimated increment: R$ 198.',
    turn: '3.1x/sem',
    coveragePt: '8 dias',
    coverageEn: '8 days',
    clusterPt: '84% dos PDVs',
    clusterEn: '84% of PDVs',
    potentialPt: 'R$ 198 incremental',
    potentialEn: 'R$ 198 incremental',
    unitPrice: 3.3,
    pdvScope: ['pdv-01', 'pdv-02'],
  },
  {
    sku: 'SKU-2245',
    namePt: 'Produto H — Detergente líquido 500ml',
    nameEn: 'Product H — Liquid dish soap 500ml',
    categoryPt: 'Higiene',
    categoryEn: 'Hygiene',
    action: 'substituir',
    volume: 12,
    delta: 12,
    reasonPt:
      'SKU substituído com giro de 0.7x/sem — abaixo do piso saudável. Substituto tem margem 3.2 p.p. superior, sell-out estável e ocupa a mesma função de shelf — troca é neutra em cobertura. PDVs pares que fizeram a troca elevaram receita da categoria em 6%. Margem projetada: R$ 268.',
    reasonEn:
      'Replaced SKU with turnover of 0.7x/week — below the healthy floor. The replacement has 3.2 p.p. higher margin, stable sell-out and occupies the same shelf function — the swap is neutral on coverage. Peer PDVs that made the swap raised category revenue by 6%. Projected margin: R$ 268.',
    turn: '2.2x/sem',
    coveragePt: '14 dias',
    coverageEn: '14 days',
    clusterPt: '69% dos PDVs',
    clusterEn: '69% of PDVs',
    potentialPt: 'R$ 268 margem',
    potentialEn: 'R$ 268 margin',
    unitPrice: 6.9,
    pdvScope: ['pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-7714',
    namePt: 'Produto I — Papel higiênico 12 rolos',
    nameEn: 'Product I — Toilet paper 12 rolls',
    categoryPt: 'Higiene',
    categoryEn: 'Hygiene',
    action: 'manter',
    volume: 24,
    delta: 0,
    reasonPt:
      'Giro de 1.6x/sem dentro da faixa saudável para item de alto tíquete, cobertura em 15 dias alinhada ao ciclo e sell-out sem oscilação relevante nas últimas 6 semanas. Contribuição estável à cesta do PDV — sem sinal que justifique mexer no volume agora.',
    reasonEn:
      'Turnover of 1.6x/week within the healthy range for a high-ticket item, coverage of 15 days aligned with the cycle and sell-out with no relevant swings over the last 6 weeks. Stable contribution to the PDV basket — no signal that justifies changing volume now.',
    turn: '1.6x/sem',
    coveragePt: '15 dias',
    coverageEn: '15 days',
    clusterPt: '81% dos PDVs',
    clusterEn: '81% of PDVs',
    potentialPt: 'Estável',
    potentialEn: 'Stable',
    unitPrice: 22.5,
    pdvScope: ['pdv-01', 'pdv-02', 'pdv-03'],
  },
  {
    sku: 'SKU-5560',
    namePt: 'Produto J — Bolacha água e sal 200g',
    nameEn: 'Product J — Water and salt crackers 200g',
    categoryPt: 'Mercearia',
    categoryEn: 'Groceries',
    action: 'remover',
    volume: 0,
    delta: -8,
    reasonPt:
      'Giro estruturalmente baixo de 0.4x/sem em 3 ciclos consecutivos, com sell-out em queda sustentada de 8% ao ciclo. SKU par no mix cobre a mesma função com giro 3x maior — remoção libera R$ 220 de capital realocável imediatamente sem abrir buraco de categoria.',
    reasonEn:
      'Structurally low turnover of 0.4x/week for 3 consecutive cycles, with sell-out down a sustained 8% per cycle. A peer SKU in the mix covers the same function with 3x higher turnover — removal immediately frees R$ 220 of reallocatable capital without opening a category gap.',
    turn: '0.4x/sem',
    coveragePt: '32 dias',
    coverageEn: '32 days',
    clusterPt: '38% dos PDVs',
    clusterEn: '38% of PDVs',
    potentialPt: 'R$ 220 liberados',
    potentialEn: 'R$ 220 freed',
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
export const generalInsightFor = (rows: CartRow[], lang: KioskLang) => {
  const keep = rows.filter((r) => r.action === 'manter').length + 18;
  const include = rows.filter((r) => r.action === 'incluir').length;
  const substitute = rows.filter((r) => r.action === 'substituir').length;
  const remove = rows.filter((r) => r.action === 'remover').length;
  if (lang === 'en') {
    return `The model crossed turnover, coverage vs. cycle, recent sell-out and presence at the cluster's peer PDVs: ${include} inclusions came from SKUs absent in >70% of peers with healthy turnover; increases, from accelerating sell-out with coverage below the cycle; ${substitute} substitutions, from items below the turnover floor swapped for higher margin; ${remove} removals and reductions, from excess coverage that freed capital. Respects financial limit, stock and minimum packaging.`;
  }
  return `O modelo cruzou giro, cobertura vs. ciclo, sell-out recente e presença nos PDVs pares do cluster: ${include} inclusões vieram de SKUs ausentes em >70% dos pares com giro saudável; aumentos, de sell-out acelerando com cobertura abaixo do ciclo; ${substitute} substituições, de itens abaixo do piso de giro trocados por margem superior; ${remove} remoções e reduções, de cobertura excedente que liberou capital. Respeita limite financeiro, estoque e embalagens mínimas.`;
};


// --- Formatters ---
export const fmtBR = (n: number, lang: KioskLang = 'pt') => n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
export const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

// --- Action metadata ---
export const actionMeta: Record<Action, { labelPt: string; labelEn: string; tone: string }> = {
  manter: { labelPt: 'Manter', labelEn: 'Keep', tone: 'text-white/70 bg-white/[0.06] border-white/20' },
  incluir: { labelPt: 'Incluir', labelEn: 'Include', tone: 'text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/40' },
  aumentar: { labelPt: 'Aumentar', labelEn: 'Increase', tone: 'text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/40' },
  substituir: { labelPt: 'Substituir', labelEn: 'Substitute', tone: 'text-[#F4845F] bg-[#F4845F]/10 border-[#F4845F]/40' },
  reduzir: { labelPt: 'Reduzir', labelEn: 'Reduce', tone: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/40' },
  remover: { labelPt: 'Remover', labelEn: 'Remove', tone: 'text-[#f87171] bg-[#f87171]/10 border-[#f87171]/40' },
};

const labelsPt = {
  objective: 'OBJETIVO: MIX E PEDIDO',
  reasoningTitle: 'Explicabilidade e raciocínio do modelo',
  reasoningSubtitle: '',
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
    kpiNewPosHint: 'novos SKUs',
    kpiRupture: 'Risco de ruptura reduzido',
    insightGeneralTitle: 'Por que essa recomendação',
    insightSkuTitle: 'Por que este SKU',
    newSimulation: 'Nova simulação',
    drillTurn: 'Giro',
    drillCoverage: 'Cobertura',
    drillCluster: 'Presença no cluster',
    drillPotential: 'Potencial',
  },
};

const labelsEn: typeof labelsPt = {
  objective: 'OBJECTIVE: MIX AND ORDER',
  reasoningTitle: 'Explainability and model reasoning',
  reasoningSubtitle: '',
  setup: {
    title: 'B2B sales portal',
    subtitle: 'Set up the PDV and region to simulate the next supply cycle.',
    pdv: 'Store / PDV',
    region: 'Region',
    contextTitle: 'Current PDV context',
    contextMix: 'Current mix',
    contextStock: 'Available stock',
    contextSales: 'Recent sales (30d)',
    contextLast: 'Last order',
    contextNotPos: 'Not positivated',
    contextRupture: 'Ongoing stockout',
    cta: 'Generate ideal mix and order',
  },
  running: 'Processing ideal mix and order…',
  result: {
    title: 'Ideal mix and order',
    subtitle: 'Comparison, suggested cart and rationale.',
    filtersTitle: 'Active filters',
    currentTitle: 'Current mix',
    recommendedTitle: 'Recommended mix',
    recommendedHint: 'Click to see the consolidated view',
    currentSkus: 'SKUs in the mix',
    currentAtRisk: 'At stockout risk',
    currentLowTurn: 'With low turnover',
    currentNotPos: 'Not positivated opportunities',
    recKeep: 'keep',
    recInclude: 'include',
    recSubstitute: 'substitute',
    recRemove: 'remove',
    recIncrease: 'increase volume',
    cartTitle: 'Suggested order cart',
    cartHint: 'Click a SKU to see the rationale.',
    colSku: 'SKU',
    colAction: 'Action',
    colVolume: 'Suggested volume',
    kpiIncremental: 'Incremental order',
    kpiTicket: 'Potential ticket',
    kpiNewPos: 'New products positivated',
    kpiNewPosHint: 'new SKUs',
    kpiRupture: 'Stockout risk reduced',
    insightGeneralTitle: 'Why this recommendation',
    insightSkuTitle: 'Why this SKU',
    newSimulation: 'New simulation',
    drillTurn: 'Turnover',
    drillCoverage: 'Coverage',
    drillCluster: 'Cluster presence',
    drillPotential: 'Potential',
  },
};

export const demoLabels: Record<KioskLang, typeof labelsPt> = {
  pt: labelsPt,
  en: labelsEn,
};

// Backwards-compat alias (pt only) — kept in case other modules import `labels`.
export const labels = labelsPt;
