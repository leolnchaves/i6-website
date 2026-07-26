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
    label: 'Lendo vendas e execução comercial',
    micro: 'Histórico, positivação, visitas e campanhas por SKU, cliente e vendedor.',
    durationMs: 900,
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
  {
    label: 'Distribuindo metas granulares',
    micro: 'Metas por vendedor, cliente e SKU + investimento comercial recomendado.',
    durationMs: 800,
  },
];

export const labels = {
  objective: 'OBJETIVO: CRESCIMENTO E EFICIÊNCIA DE INVESTIMENTO COMERCIAL',
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
  reasoningTitle: 'Como o modelo está pensando',
  reasoningSubtitle: 'Pipeline preditivo de metas e investimento.',
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
    kpiVolume: 'Volume incremental potencial',
    kpiTotalTarget: 'Meta total recomendada',
    kpiInvestment: 'Investimento comercial sugerido',
    kpiCac: 'CAC incremental projetado',
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
  // Interior de SP — Carlos
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Carlos', repId: 'carlos', client: 'Cliente A', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 1420, currentTarget: 1200, currentInvestment: 62, cac: 11.8 },
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Carlos', repId: 'carlos', client: 'Cliente A', clientTier: 'key', sku: 'SKU 04', category: 'catB', volume: 880, currentTarget: 850, currentInvestment: 38, cac: 13.4 },
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Carlos', repId: 'carlos', client: 'Cliente B', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 960, currentTarget: 900, currentInvestment: 42, cac: 12.6 },
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Carlos', repId: 'carlos', client: 'Cliente B', clientTier: 'longtail', sku: 'SKU 07', category: 'catC', volume: 520, currentTarget: 600, currentInvestment: 38, cac: 18.9 },
  // Interior de SP — Marina
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Marina', repId: 'marina', client: 'Cliente C', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 1180, currentTarget: 900, currentInvestment: 48, cac: 11.2 },
  { region: 'Interior de SP', regionId: 'sp-interior', rep: 'Marina', repId: 'marina', client: 'Cliente C', clientTier: 'key', sku: 'SKU 04', category: 'catB', volume: 720, currentTarget: 700, currentInvestment: 32, cac: 14.0 },
  // Minas Gerais — Rafael
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Rafael', repId: 'rafael', client: 'Cliente D', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 640, currentTarget: 700, currentInvestment: 55, cac: 22.4 },
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Rafael', repId: 'rafael', client: 'Cliente D', clientTier: 'longtail', sku: 'SKU 07', category: 'catC', volume: 590, currentTarget: 600, currentInvestment: 42, cac: 21.1 },
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Rafael', repId: 'rafael', client: 'Cliente E', clientTier: 'key', sku: 'SKU 04', category: 'catB', volume: 700, currentTarget: 720, currentInvestment: 40, cac: 20.6 },
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Rafael', repId: 'rafael', client: 'Cliente E', clientTier: 'longtail', sku: 'SKU 09', category: 'catC', volume: 380, currentTarget: 460, currentInvestment: 26, cac: 24.0 },
  // Minas Gerais — Marina
  { region: 'Minas Gerais', regionId: 'mg', rep: 'Marina', repId: 'marina', client: 'Cliente F', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 820, currentTarget: 780, currentInvestment: 38, cac: 19.4 },
  // Sul — Carlos
  { region: 'Sul', regionId: 'sul', rep: 'Carlos', repId: 'carlos', client: 'Cliente G', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 1060, currentTarget: 950, currentInvestment: 44, cac: 13.8 },
  { region: 'Sul', regionId: 'sul', rep: 'Carlos', repId: 'carlos', client: 'Cliente G', clientTier: 'key', sku: 'SKU 04', category: 'catB', volume: 780, currentTarget: 720, currentInvestment: 34, cac: 15.1 },
  // Sul — Rafael
  { region: 'Sul', regionId: 'sul', rep: 'Rafael', repId: 'rafael', client: 'Cliente H', clientTier: 'key', sku: 'SKU 01', category: 'catA', volume: 920, currentTarget: 800, currentInvestment: 40, cac: 14.6 },
  { region: 'Sul', regionId: 'sul', rep: 'Rafael', repId: 'rafael', client: 'Cliente H', clientTier: 'longtail', sku: 'SKU 07', category: 'catC', volume: 460, currentTarget: 520, currentInvestment: 26, cac: 19.8 },
  { region: 'Sul', regionId: 'sul', rep: 'Rafael', repId: 'rafael', client: 'Cliente I', clientTier: 'longtail', sku: 'SKU 09', category: 'catC', volume: 420, currentTarget: 480, currentInvestment: 22, cac: 20.5 },
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

export const computeResult = (args: Args): CommercialResult => {
  const seed = `${args.period}|${args.region}|${args.rep}|${args.portfolio}|${args.category}|${args.budget}|${args.argIndex}`;
  const rows = filterRows(args);
  const pMult = periodMultiplier[args.period];
  const budgetVal = budgets.find((b) => b.id === args.budget)?.value ?? 500;

  // Compute per-row metrics
  const enriched = rows.map((r) => ({ r, m: computeRowMetrics(r, seed, pMult, budgetVal) }));

  // Aggregate by region (fixed dimension for the main table view)
  const byRegion = new Map<string, { rows: Row[]; current: number; suggested: number; potential: number; currentInvestment: number }>();
  const byRep = new Map<string, { rows: Row[]; current: number; suggested: number; potential: number; currentInvestment: number }>();
  const byClient = new Map<string, { rows: Row[]; current: number; suggested: number; potential: number; currentInvestment: number; region: string; rep: string }>();
  const bySku = new Map<string, { rows: Row[]; current: number; suggested: number; potential: number; currentInvestment: number; category: string }>();

  enriched.forEach(({ r, m }) => {
    const add = (map: Map<string, any>, key: string, extra: Record<string, any> = {}) => {
      const cur = map.get(key) ?? { rows: [], current: 0, suggested: 0, potential: 0, currentInvestment: 0, ...extra };
      cur.rows.push(r);
      cur.current += m.currentScaled;
      cur.suggested += m.suggested;
      cur.potential += m.potential;
      cur.currentInvestment += r.currentInvestment;
      map.set(key, cur);
    };
    add(byRegion, r.region);
    add(byRep, r.rep);
    add(byClient, r.client, { region: r.region, rep: r.rep });
    add(bySku, r.sku, { category: r.category });
  });

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
    // @ts-expect-error attach for the dimension switcher
    _allDims: dimRows,
  };
};

// Utility for consumers to fetch all dim rows (attached above)
export const getDimRows = (r: CommercialResult): Record<DimensionId, AggregatedRow[]> =>
  // @ts-expect-error _allDims attached by computeResult
  r._allDims as Record<DimensionId, AggregatedRow[]>;

function categoryLabelStatic(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export const fmtBR = (n: number) => n.toLocaleString('pt-BR');
export const fmtBRL = (n: number) => `R$ ${n.toLocaleString('pt-BR')} mil`;
export const fmtCAC = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
