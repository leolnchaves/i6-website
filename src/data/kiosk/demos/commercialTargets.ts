// Static, PT-only dataset & compute for the "Metas Comerciais Preditivas" demo.

export type PeriodId = 'month' | 'quarter' | 'semester';
export type RegionId = 'sp-interior' | 'mg' | 'sul' | 'all';
export type RepId = 'all' | 'carlos' | 'marina' | 'rafael';
export type PortfolioId = 'all' | 'key' | 'longtail';
export type CategoryId = 'all' | 'catA' | 'catB' | 'catC';
export type BudgetId = 'b300' | 'b500' | 'b700';
export type DimensionId = 'region' | 'rep' | 'client' | 'sku';

export const periods: { id: PeriodId; label: string }[] = [
  { id: 'month', label: 'Mês' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'semester', label: 'Semestre' },
];

export const regionsOptions: { id: RegionId; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'sp-interior', label: 'Interior de SP' },
  { id: 'mg', label: 'Minas Gerais' },
  { id: 'sul', label: 'Sul' },
];

export const reps: { id: RepId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'carlos', label: 'Carlos' },
  { id: 'marina', label: 'Marina' },
  { id: 'rafael', label: 'Rafael' },
];

export const portfolios: { id: PortfolioId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'key', label: 'Chave' },
  { id: 'longtail', label: 'Cauda longa' },
];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'catA', label: 'Categoria A' },
  { id: 'catB', label: 'Categoria B' },
  { id: 'catC', label: 'Categoria C' },
];

export const budgets: { id: BudgetId; label: string; value: number }[] = [
  { id: 'b300', label: 'R$ 300 mil', value: 300 },
  { id: 'b500', label: 'R$ 500 mil', value: 500 },
  { id: 'b700', label: 'R$ 700 mil', value: 700 },
];

export const dimensions: { id: DimensionId; label: string }[] = [
  { id: 'region', label: 'Região' },
  { id: 'rep', label: 'Vendedor' },
  { id: 'client', label: 'Cliente' },
  { id: 'sku', label: 'SKU' },
];

export const pipeline: { label: string; micro: string; durationMs: number }[] = [
  {
    label: 'Analisando performance do PDV',
    micro: 'Giro, ruptura, positivação e execução no ponto de venda por SKU, cliente e vendedor.',
    durationMs: 900,
  },
  {
    label: 'Projetando demanda futura',
    micro: 'Demanda esperada por SKU, região e cliente considerando sazonalidade, calendário comercial e sinais contextuais.',
    durationMs: 850,
  },
  {
    label: 'Projetando o potencial de crescimento',
    micro: 'Demanda capturável por região, SKU, cliente e vendedor — sem repetir o histórico.',
    durationMs: 900,
  },
  {
    label: 'Identificando capacidade incremental',
    micro: 'Crescimento estrutural × oportunidade não explorada × meta acima do potencial real.',
    durationMs: 850,
  },
  {
    label: 'Simulando esforço comercial e CAC',
    micro: 'Investimento, contato e incentivo necessários por unidade incremental.',
    durationMs: 900,
  },
  {
    label: 'Equilibrando crescimento e eficiência',
    micro: 'Combinações região × SKU × cliente com maior potencial e CAC sustentável.',
    durationMs: 850,
  },
];


export const labels = {
  objective: 'OBJETIVO: CRESCIMENTO E EFICIÊNCIA COMERCIAL',
  setup: {
    title: 'Dashboard de metas comerciais',
    subtitle: 'Visão hierárquica por região, vendedor, cliente e SKU.',
    period: 'Período da meta',
    region: 'Região ou território',
    rep: 'Equipe ou vendedor',
    portfolio: 'Cliente ou carteira',
    category: 'SKU ou categoria',
    budget: 'Orçamento comercial disponível',
    cta: 'Calcular metas e investimento ideal',
  },
  running: 'Calculando metas e alocando investimento...',
  reasoningTitle: 'Explicabilidade e raciocínio do modelo',
  reasoningSubtitle: '',
  result: {
    title: 'Meta atual × Meta preditiva',
    subtitle: 'Navegue pela dimensão e clique em uma linha para ver a composição.',
    tableCurrent: 'Meta atual',
    tableSuggested: 'Meta sugerida',
    tablePotential: 'Potencial',
    tableDelta: 'Δ vs. atual',
    allocationTitle: 'Alocação recomendada de investimento comercial',
    allocationRegion: 'Região',
    allocationGrowth: 'Crescimento potencial',
    allocationCurrent: 'Investimento atual',
    allocationSuggested: 'Investimento sugerido',
    allocationCac: 'CAC incremental',
    reset: 'Nova simulação',
    newSimulation: 'Nova simulação',
    mixTitle: 'Por que esse mix / sortimento',
    kpiVolume: 'Potencial incremental',
    kpiTotalTarget: 'Meta total recomendada',
    kpiInvestment: 'Investimento sugerido',
    kpiCac: 'CAC adicional projetado',
    highlightsTitle: 'Onde a IA aponta oportunidade',
    hRegions: 'Regiões subexploradas',
    hClients: 'Clientes com pressão excessiva',
    hSkus: 'SKUs com maior oportunidade',
    hReps: 'Vendedores com capacidade adicional',
    drillTitle: 'Por que sugerimos esta meta',
    drillClose: 'Fechar',
    drillFactors: 'Fatores que sustentam a recomendação',
    rationaleLabel: 'Insight da IA',
    ctaCalculate: 'Calcular metas e investimento ideal',
  },
} as const;

// ---- Deterministic RNG ----
const hash = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const rand = (seed: string, min: number, max: number, decimals = 0) => {
  const n = (hash(seed) % 10_000) / 10_000;
  const v = min + n * (max - min);
  const p = Math.pow(10, decimals);
  return Math.round(v * p) / p;
};

// ---- Base dataset ----
export interface Row {
  region: string;
  regionId: Exclude<RegionId, 'all'>;
  rep: string;
  repId: Exclude<RepId, 'all'>;
  client: string;
  clientTier: 'key' | 'longtail';
  sku: string;
  category: Exclude<CategoryId, 'all'>;
  volume: number;
  currentTarget: number;
  currentInvestment: number; // in thousands BRL
  cac: number;
}

const REGIONS: { id: Exclude<RegionId, 'all'>; label: string }[] = [
  { id: 'sp-interior', label: 'Interior de SP' },
  { id: 'mg', label: 'Minas Gerais' },
  { id: 'sul', label: 'Sul' },
];

// Static plausible catalog
export const baseRows: Row[] = [
  // AUMENTAR — alto potencial, meta atual muito abaixo do volume, CAC baixo
  { region: 'Sul', regionId: 'sul', rep: 'Carlos', repId: 'carlos', client: 'Cliente A', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 1400, currentTarget: 800, currentInvestment: 45, cac: 11.5 },
  // MANTER — meta atual próxima do potencial capturável
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Marina', repId: 'marina', client: 'Cliente B', clientTier: 'key', sku: 'SKU 04', category: 'catB', volume: 900, currentTarget: 990, currentInvestment: 42, cac: 15.0 },
  // REDUZIR — meta atual acima do potencial real, CAC alto
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Rafael', repId: 'rafael', client: 'Cliente C', clientTier: 'longtail', sku: 'SKU 07', category: 'catC', volume: 450, currentTarget: 850, currentInvestment: 55, cac: 22.5 },
];

// ---- Compute ----
export interface Args {
  period: PeriodId;
  region: RegionId;
  rep: RepId;
  portfolio: PortfolioId;
  category: CategoryId;
  budget: BudgetId;
  argIndex: number;
}

export interface AggregatedRow {
  key: string;
  label: string;
  sublabel?: string;
  current: number;
  suggested: number;
  potential: number;
  deltaPct: number;
  action: 'up' | 'down' | 'hold';
  raw: Row[];
}

export interface AllocationRow {
  key: string;
  label: string;
  sublabel?: string;
  growthPct: number;
  currentInvestment: number;
  suggestedInvestment: number;
  incrementalVolume: number;
  cac: number;
  action: 'up' | 'down' | 'redistribute';
}

// Kept for backward compatibility — region allocation is a subtype
export interface RegionAllocation extends AllocationRow {
  region: string;
  regionId: Exclude<RegionId, 'all'>;
}

export interface CommercialResult {
  seed: string;
  rows: AggregatedRow[];
  allocation: RegionAllocation[];
  kpis: {
    incrementalVolume: number;
    totalTarget: number;
    suggestedInvestment: number;
    projectedCac: number;
  };

  highlights: {
    regions: string[];
    clients: string[];
    skus: string[];
    reps: string[];
  };
  rationale: {
    target: string;
    increase: string;
    decrease: string;
    redistribute: string;
  };
}

const periodMultiplier: Record<PeriodId, number> = {
  month: 1,
  quarter: 3,
  semester: 6,
};

const filterRows = (a: Args): Row[] =>
  baseRows.filter((r) => {
    if (a.region !== 'all' && r.regionId !== a.region) return false;
    if (a.rep !== 'all' && r.repId !== a.rep) return false;
    if (a.portfolio !== 'all' && r.clientTier !== a.portfolio) return false;
    if (a.category !== 'all' && r.category !== a.category) return false;
    return true;
  });

const computeRowMetrics = (r: Row, seed: string, pMult: number, budgetVal: number) => {
  // Potential: 5–35% acima do volume histórico
  const potentialUplift = rand(`${seed}|pot|${r.client}|${r.sku}`, 0.05, 0.35, 3);
  const potential = Math.round(r.volume * (1 + potentialUplift) * pMult);
  // Meta sugerida = potencial × captura (0,85–0,95), modulada pelo orçamento
  const captureBase = rand(`${seed}|cap|${r.client}|${r.sku}`, 0.85, 0.95, 3);
  const budgetBoost = Math.min(0.04, (budgetVal - 300) / 10000); // até +0.04
  const suggestedRaw = potential * Math.min(0.98, captureBase + budgetBoost);
  const suggested = Math.round(suggestedRaw);
  const currentScaled = Math.round(r.currentTarget * pMult);
  const deltaPct = currentScaled === 0 ? 0 : ((suggested - currentScaled) / currentScaled) * 100;
  const action: 'up' | 'down' | 'hold' =
    deltaPct > 5 ? 'up' : deltaPct < -5 ? 'down' : 'hold';
  return {
    potential,
    suggested,
    currentScaled,
    deltaPct,
    action,
  };
};

type DimBaseRow = {
  label: string;
  sublabel?: string;
  volume: number;
  currentTarget: number;
  currentInvestment: number;
  cac: number;
  regionId?: Exclude<RegionId, 'all'>;
  category?: Exclude<CategoryId, 'all'>;
  rep?: string;
  region?: string;
};

// Independent base data per dimension so the main table reflects different
// volumes, targets and investments for each view (região, vendedor, cliente, SKU).
const dimBase: Record<DimensionId, DimBaseRow[]> = {
  region: [
    { label: 'Sul', regionId: 'sul', volume: 4200, currentTarget: 2600, currentInvestment: 130, cac: 12.0 },
    { label: 'Interior de SP', regionId: 'sp-interior', volume: 3100, currentTarget: 3050, currentInvestment: 110, cac: 15.2 },
    { label: 'Minas Gerais', regionId: 'mg', volume: 1400, currentTarget: 2500, currentInvestment: 95, cac: 22.4 },
  ],
  rep: [
    { label: 'Carlos', sublabel: 'Sul', region: 'Sul', volume: 1900, currentTarget: 1100, currentInvestment: 55, cac: 11.5 },
    { label: 'Marina', sublabel: 'Interior de SP', region: 'Interior de SP', volume: 1250, currentTarget: 1180, currentInvestment: 48, cac: 14.6 },
    { label: 'Rafael', sublabel: 'Minas Gerais', region: 'Minas Gerais', volume: 620, currentTarget: 1050, currentInvestment: 60, cac: 21.0 },
  ],
  client: [
    { label: 'Cliente A', sublabel: 'Sul · Carlos', region: 'Sul', rep: 'Carlos', volume: 1400, currentTarget: 800, currentInvestment: 45, cac: 11.5 },
    { label: 'Cliente B', sublabel: 'Interior de SP · Marina', region: 'Interior de SP', rep: 'Marina', volume: 900, currentTarget: 990, currentInvestment: 42, cac: 15.0 },
    { label: 'Cliente C', sublabel: 'Minas Gerais · Rafael', region: 'Minas Gerais', rep: 'Rafael', volume: 450, currentTarget: 850, currentInvestment: 55, cac: 22.5 },
  ],
  sku: [
    { label: 'SKU 01', sublabel: 'Categoria A', category: 'catA', volume: 2100, currentTarget: 1200, currentInvestment: 62, cac: 10.8 },
    { label: 'SKU 04', sublabel: 'Categoria B', category: 'catB', volume: 1500, currentTarget: 1470, currentInvestment: 52, cac: 14.2 },
    { label: 'SKU 07', sublabel: 'Categoria C', category: 'catC', volume: 720, currentTarget: 1300, currentInvestment: 68, cac: 20.5 },
  ],
};

export const computeResult = (args: Args): CommercialResult => {
  const seed = `${args.period}|${args.region}|${args.rep}|${args.portfolio}|${args.category}|${args.budget}|${args.argIndex}`;
  const rows = filterRows(args);
  const pMult = periodMultiplier[args.period];
  const budgetVal = budgets.find((b) => b.id === args.budget)?.value ?? 500;

  // Compute per-row metrics (kept for backwards-compat downstream usage)
  const enriched = rows.map((r) => ({ r, m: computeRowMetrics(r, seed, pMult, budgetVal) }));

  // Build per-dimension aggregates from independent base data
  const buildDimMap = (dim: DimensionId) => {
    const map = new Map<string, { rows: Row[]; current: number; suggested: number; potential: number; currentInvestment: number; region?: string; rep?: string; category?: string }>();
    dimBase[dim].forEach((b) => {
      const potentialUplift = rand(`${seed}|pot|${dim}|${b.label}`, 0.05, 0.35, 3);
      const potential = Math.round(b.volume * (1 + potentialUplift) * pMult);
      const captureBase = rand(`${seed}|cap|${dim}|${b.label}`, 0.85, 0.95, 3);
      const budgetBoost = Math.min(0.04, (budgetVal - 300) / 10000);
      const suggested = Math.round(potential * Math.min(0.98, captureBase + budgetBoost));
      const current = Math.round(b.currentTarget * pMult);
      const proxyRow: Row = {
        region: b.region ?? b.label,
        regionId: b.regionId ?? 'sp-interior',
        rep: b.rep ?? b.label,
        repId: 'carlos',
        client: b.label,
        clientTier: 'key',
        sku: b.label,
        category: b.category ?? 'catA',
        volume: b.volume,
        currentTarget: b.currentTarget,
        currentInvestment: b.currentInvestment,
        cac: b.cac,
      };
      map.set(b.label, {
        rows: [proxyRow],
        current,
        suggested,
        potential,
        currentInvestment: b.currentInvestment,
        region: b.region,
        rep: b.rep,
        category: b.category,
      });
    });
    return map;
  };

  const byRegion = buildDimMap('region');
  const byRep = buildDimMap('rep');
  const byClient = buildDimMap('client');
  const bySku = buildDimMap('sku');

  const toRows = (
    map: Map<string, any>,
    kind: 'region' | 'rep' | 'client' | 'sku',
  ): AggregatedRow[] =>
    Array.from(map.entries()).map(([label, v]) => {
      const deltaPct = v.current === 0 ? 0 : ((v.suggested - v.current) / v.current) * 100;
      const action: 'up' | 'down' | 'hold' =
        deltaPct > 5 ? 'up' : deltaPct < -5 ? 'down' : 'hold';
      return {
        key: `${kind}:${label}`,
        label,
        sublabel:
          kind === 'client' ? `${v.region} · ${v.rep}` :
          kind === 'rep' ? v.region :
          kind === 'sku' ? categoryLabelStatic(v.category) :
          undefined,
        current: v.current,
        suggested: v.suggested,
        potential: v.potential,
        deltaPct,
        action,
        raw: v.rows,
      };
    }).sort((a, b) => b.suggested - a.suggested);

  const dimRows = {
    region: toRows(byRegion, 'region'),
    rep: toRows(byRep, 'rep'),
    client: toRows(byClient, 'client'),
    sku: toRows(bySku, 'sku'),
  };


  // ---- Allocation (generic across dimensions) ----
  const totalInvestmentBase = budgetVal; // total budget available for the period (in thousands of BRL)

  const buildAllocation = (
    map: Map<string, any>,
    kind: 'region' | 'rep' | 'client' | 'sku',
  ): AllocationRow[] => {
    // Aggregates + growth per key (stable via seed)
    const agg = Array.from(map.entries()).map(([label, v]) => {
      const growthPct = rand(`${seed}|growth|${kind}|${label}`, 6, 22, 0);
      const incremental = Math.max(0, v.suggested - v.current);
      // Score prioritizes keys with higher growth potential and larger incremental capture
      const score = growthPct * Math.max(1, incremental);
      return {
        key: `${kind}:${label}`,
        label,
        sublabel:
          kind === 'client' ? `${v.region} · ${v.rep}` :
          kind === 'sku' ? categoryLabelStatic(v.category) :
          undefined,
        growthPct,
        incremental,
        currentInvestment: v.currentInvestment,
        score,
      };
    });
    const totalScore = agg.reduce((a, b) => a + b.score, 0) || 1;
    return agg
      .map((r) => {
        const suggestedInvestment = Math.round((r.score / totalScore) * totalInvestmentBase);
        // CAC in R$ per incremental unit: investment (in thousands) × 1000 / incremental
        const cac = r.incremental > 0
          ? (suggestedInvestment * 1000) / r.incremental
          : 0;
        const diff = suggestedInvestment - r.currentInvestment;
        const relDiff = r.currentInvestment === 0 ? 0 : diff / r.currentInvestment;
        const action: 'up' | 'down' | 'redistribute' =
          relDiff > 0.1 ? 'up' : relDiff < -0.1 ? 'down' : 'redistribute';
        return {
          key: r.key,
          label: r.label,
          sublabel: r.sublabel,
          growthPct: r.growthPct,
          currentInvestment: r.currentInvestment,
          suggestedInvestment,
          incrementalVolume: r.incremental,
          cac,
          action,
        };
      })
      .sort((a, b) => b.growthPct - a.growthPct);
  };

  const allocationsByDim = {
    region: buildAllocation(byRegion, 'region'),
    rep: buildAllocation(byRep, 'rep'),
    client: buildAllocation(byClient, 'client'),
    sku: buildAllocation(bySku, 'sku'),
  };

  // Region allocation is the canonical one (keeps regionId for legacy consumers)
  const allocation: RegionAllocation[] = allocationsByDim.region.map((a) => {
    const rowSample = byRegion.get(a.label)?.rows[0] as Row | undefined;
    return {
      ...a,
      region: a.label,
      regionId: (rowSample?.regionId ?? 'sp-interior') as Exclude<RegionId, 'all'>,
    };
  });

  // KPIs
  const totalCurrent = enriched.reduce((a, { m }) => a + m.currentScaled, 0);
  const totalSuggested = enriched.reduce((a, { m }) => a + m.suggested, 0);
  const totalPotential = enriched.reduce((a, { m }) => a + m.potential, 0);
  const incrementalVolume = Math.max(0, totalSuggested - totalCurrent);
  const suggestedInvestment = allocation.reduce((a, r) => a + r.suggestedInvestment, 0);
  // Weighted CAC: total investment (R$) / total incremental units
  const projectedCac = incrementalVolume > 0
    ? (suggestedInvestment * 1000) / incrementalVolume
    : 0;


  // Highlights
  const upRegions = allocation.filter((r) => r.action === 'up').map((r) => r.region);
  const downRegions = allocation.filter((r) => r.action === 'down').map((r) => r.region);
  const clientsPressure = dimRows.client
    .filter((r) => r.action === 'down')
    .slice(0, 3)
    .map((r) => r.label);
  const topSkus = dimRows.sku.slice(0, 3).map((r) => r.label);
  const topReps = dimRows.rep.slice(0, 3).map((r) => r.label);

  // Rationale (dynamic with values)
  const topRegion = allocation[0]?.region ?? 'Interior de SP';
  const topCac = allocation[0]?.cac.toFixed(1) ?? '12,0';
  const worstRegion = allocation[allocation.length - 1]?.region ?? 'Minas Gerais';
  const rationale = {
    target:
      `Este cliente apresenta frequência de compra crescente, potencial adicional no SKU principal e capacidade de absorver aproximadamente ${fmtBR(Math.round(incrementalVolume / Math.max(1, dimRows.client.length)))} unidades acima da meta atual. O vendedor possui cobertura disponível, e o investimento incremental necessário permanece dentro do limite de CAC definido.`,
    increase:
      `${topRegion} combina crescimento projetado de demanda, baixa penetração dos SKUs prioritários e clientes com capacidade incremental. O aumento de investimento comercial apresenta melhor relação entre volume capturável (${topCac.replace('.', ',')} de CAC) e custo do que as demais regiões analisadas.`,
    decrease:
      `A meta atual está acima do potencial projetado para clientes ${clientsPressure[0] ?? 'com baixa resposta'} e exigiria aumento desproporcional de investimento comercial. A redução evita pressão artificial sobre o vendedor e libera recursos para clientes e SKUs com maior capacidade de crescimento.`,
    redistribute:
      `Parte do orçamento está concentrada em ${worstRegion}, com baixa resposta incremental. A redistribuição para ${topRegion} permite capturar mais volume com menor CAC, sem aumentar o investimento comercial total.`,
  };

  return {
    seed,
    rows: dimRows.region, // default view = region
    allocation,
    kpis: {
      incrementalVolume,
      totalTarget: totalSuggested,
      suggestedInvestment,
      projectedCac,
    },
    highlights: {
      regions: upRegions.length ? upRegions : [topRegion],
      clients: clientsPressure.length ? clientsPressure : [dimRows.client[0]?.label ?? '—'],
      skus: topSkus,
      reps: topReps,
    },
    rationale,
    _allDims: dimRows,
    _allAllocations: allocationsByDim,
  } as unknown as CommercialResult;


};

// Utility for consumers to fetch all dim rows (attached above)
export const getDimRows = (r: CommercialResult): Record<DimensionId, AggregatedRow[]> =>
  // @ts-expect-error _allDims attached by computeResult
  r._allDims as Record<DimensionId, AggregatedRow[]>;

// Utility for consumers to fetch the allocation of a given dimension
export const getAllocation = (r: CommercialResult, dim: DimensionId): AllocationRow[] =>
  // @ts-expect-error _allAllocations attached by computeResult
  (r._allAllocations as Record<DimensionId, AllocationRow[]>)[dim];


function categoryLabelStatic(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export const fmtBR = (n: number) => n.toLocaleString('pt-BR');
export const fmtBRL = (n: number) => `R$ ${n.toLocaleString('pt-BR')} mil`;
export const fmtCAC = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
