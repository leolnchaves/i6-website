import type { KioskLang } from '@/data/kiosk/config';

// ============================================================================
// Types
// ============================================================================

export interface MonthPoint {
  key: string;
  labelPt: string;
  labelEn: string;
  history: number | null;
  currentFcst: number | null;
  i6Fcst: number | null;
  ciLow: number | null;
  ciHigh: number | null;
  // Decomposition — present on forecast months
  trend: number | null;
  season: number | null;
  promo: number | null; // legacy field kept for BreakdownCard use
  sparsityFix: number | null;
  hasPromo: boolean; // true when this month has a promo effect
}

export interface SkuDef {
  id: string;
  namePt: string;
  nameEn: string;
  categoryPt: string;
  categoryEn: string;
  cagr: number;
  seasonAmp: number;
  seasonPeak: number;
  /** 12 monthly weights [Jan..Dec] in [-1..+1] — realistic peaks/valleys on specific months */
  seasonProfile: number[];
  promoMonths: number[];
  rupturedMonths: number[];
  accelLast: number;
  channelMix: { digital: number; physical: number };
  base: number;
  currentBias: 'over' | 'under' | 'flat';
  // Current (client) forecast KPIs — bad numbers
  currentErrorPct: number;
  historicalAccuracyPct: number;
  meanErrorPct: number;
  stockoutPct: number;
  excessPct: number;
  // i6 backtest KPIs — good numbers (used in KpiCompare)
  i6ErrorPct: number;
  i6AccuracyPct: number;
  i6MeanErrorPct: number;
  i6StockoutPct: number;
  i6ExcessPct: number;
  // 1-2 history month indices where the client forecast was actually good
  accuratePastMonths: number[];
  // Promo explanation shown in BreakdownCard when a promo month is clicked
  promoNotePt: string;
  promoNoteEn: string;
  argumentPt: string;
  argumentEn: string;
}

export interface PipelineStep {
  labelPt: string;
  labelEn: string;
  microPt: string;
  microEn: string;
  durationMs: number;
}

// ============================================================================
// SKU catalog
// ============================================================================

export const skus: SkuDef[] = [
  {
    id: 'electronics',
    namePt: 'Eletro portátil — linha A',
    nameEn: 'Portable electronics — line A',
    categoryPt: 'Eletrônicos',
    categoryEn: 'Electronics',
    cagr: 0.18,
    seasonAmp: 0.55,
    seasonPeak: 10,
    // Electronics: Black Friday peak (Nov) + Xmas (Dec), deep Feb/Mar valley, zig-zag shoulders
    seasonProfile: [-0.20, -0.80, -0.55, -0.30, 0.10, -0.25, 0.15, -0.10, 0.35, 0.20, 1.00, 0.75],
    promoMonths: [10, 11, 5],
    rupturedMonths: [10, 22],
    accelLast: 0.28,
    channelMix: { digital: 0.71, physical: 0.29 },
    base: 4200,
    currentBias: 'under',
    currentErrorPct: 63.6,
    historicalAccuracyPct: 36.4,
    meanErrorPct: 61.8,
    stockoutPct: 22.3,
    excessPct: 6.4,
    i6ErrorPct: 12.8,
    i6AccuracyPct: 87.2,
    i6MeanErrorPct: 13.5,
    i6StockoutPct: 2.8,
    i6ExcessPct: 2.1,
    accuratePastMonths: [3, 15],
    promoNotePt: 'Black Friday + Cyber Monday — pico esperado de +38% acima do baseline.',
    promoNoteEn: 'Black Friday + Cyber Monday — expected +38% peak over baseline.',
    argumentPt:
      'Categoria em crescimento acelerado (+18% a.a.) com sazonalidade de Black Friday e Natal muito pronunciada (±55%) e forte concentração no canal digital (71%). Identificamos ruptura em dois novembros seguidos — o forecast atual erra 62pp e por isso subestima o pico. Aceleração de +28% nos últimos 90 dias, quase toda no digital. A i6 separa Black Friday do baseline, aplica calendário 2025 (BF em 28/11) e reduz ruptura de 22,3% para 2,8%. Acurácia sobe de 36,4% para 87,2%.',
    argumentEn:
      'Fast-growing category (+18% YoY) with very pronounced Black Friday and Christmas seasonality (±55%) and strong digital-channel concentration (71%). We detected stockouts in two consecutive Novembers — the current forecast is off by 62pp and therefore under-projects the peak. Last 90 days show +28% acceleration, almost entirely digital. i6 separates Black Friday from the baseline, applies the 2025 calendar (BF on Nov 28) and cuts stockout from 22.3% to 2.8%. Accuracy jumps from 36.4% to 87.2%.',
  },
  {
    id: 'beverage',
    namePt: 'Bebida sazonal — 2L',
    nameEn: 'Seasonal beverage — 2L',
    categoryPt: 'Bebidas',
    categoryEn: 'Beverages',
    cagr: 0.08,
    seasonAmp: 0.42,
    seasonPeak: 11,
    // Beverage: angular zig-zag — summer peaks Dec/Jan, deep valley Jun/Jul, oscillating shoulders
    seasonProfile: [0.85, 0.35, -0.10, 0.15, -0.55, -0.90, -0.60, -0.20, 0.20, -0.05, 0.55, 1.00],
    promoMonths: [10, 11],
    rupturedMonths: [4, 16],
    accelLast: 0.14,
    channelMix: { digital: 0.32, physical: 0.68 },
    base: 12800,
    currentBias: 'under',
    currentErrorPct: 58.4,
    historicalAccuracyPct: 42.8,
    meanErrorPct: 57.2,
    stockoutPct: 14.6,
    excessPct: 11.9,
    i6ErrorPct: 10.6,
    i6AccuracyPct: 89.4,
    i6MeanErrorPct: 11.2,
    i6StockoutPct: 3.1,
    i6ExcessPct: 3.6,
    accuratePastMonths: [8, 19],
    promoNotePt: 'Black Friday + campanha de verão — pico esperado de +18% sobre baseline.',
    promoNoteEn: 'Black Friday + summer campaign — expected +18% peak over baseline.',
    argumentPt:
      'Produto com crescimento estrutural de +8% a.a. e sazonalidade forte no Q4 (pico em dezembro, +42% acima do baseline). Corrigimos maio de 2024 e maio de 2025 — meses com ruptura em que a demanda real foi ~2× o vendido — e isolamos o efeito promocional de nov/dez para não superestimar meses regulares. Nos últimos 90 dias detectamos aceleração adicional de +14% no canal digital. O forecast atual erra 57pp por não separar promo de tendência; a i6 estreita o intervalo de confiança de ±22% para ±7% e reduz ruptura de 14,6% para 3,1%.',
    argumentEn:
      'Structural +8% YoY growth with strong Q4 seasonality (December peak, +42% above baseline). We recovered May 2024 and May 2025 — stockout months where real demand was ~2× what was sold — and isolated the Nov/Dec promo effect to avoid over-projecting regular months. Last 90 days show an additional +14% acceleration in the digital channel. The current forecast is off by 57pp because it does not separate promo from trend; i6 narrows the confidence interval from ±22% to ±7% and cuts stockout from 14.6% to 3.1%.',
  },
  {
    id: 'fashion',
    namePt: 'Moda rápida — cápsula',
    nameEn: 'Fast fashion — capsule',
    categoryPt: 'Vestuário',
    categoryEn: 'Apparel',
    cagr: 0.11,
    seasonAmp: 0.36,
    seasonPeak: 5,
    // Fashion: angular double peak (May winter drop + Nov summer drop), sharp Aug/Sep valleys
    seasonProfile: [-0.25, 0.15, -0.10, 0.45, 1.00, 0.10, -0.35, -0.70, -0.50, 0.20, 0.90, 0.25],
    promoMonths: [0, 6],
    rupturedMonths: [8, 20],
    accelLast: 0.18,
    channelMix: { digital: 0.58, physical: 0.42 },
    base: 5600,
    currentBias: 'flat',
    currentErrorPct: 60.3,
    historicalAccuracyPct: 39.7,
    meanErrorPct: 58.9,
    stockoutPct: 17.2,
    excessPct: 15.8,
    i6ErrorPct: 9.3,
    i6AccuracyPct: 90.7,
    i6MeanErrorPct: 10.1,
    i6StockoutPct: 3.4,
    i6ExcessPct: 3.7,
    accuratePastMonths: [5, 17],
    promoNotePt: 'Liquidação de coleção — pico curto, sem projeção para o próximo drop.',
    promoNoteEn: 'Collection clearance — short peak, no carryover to the next drop.',
    argumentPt:
      'Ciclo curto de coleção com sazonalidade dupla (inverno-SP em jun/jul e liquidação em jan/fev) e viés flat no forecast atual — que ignora tanto o pico sazonal quanto a queda pós-coleção, gerando simultaneamente ruptura (17,2%) e excesso (15,8%) em SKUs diferentes. Detectamos aceleração de +18% nos últimos 90 dias no digital. A i6 modela cada onda de coleção separadamente e reduz ruptura para 3,4% e excesso para 3,7%. Acurácia sobe de 39,7% para 90,7%.',
    argumentEn:
      'Short collection cycle with double seasonality (winter-SP in Jun/Jul and clearance in Jan/Feb) and a flat bias in the current forecast — which ignores both the seasonal peak and the post-collection drop, causing simultaneous stockout (17.2%) and excess (15.8%) across different SKUs. Last 90 days show +18% acceleration in digital. i6 models each collection wave separately and cuts stockout to 3.4% and excess to 3.7%. Accuracy jumps from 39.7% to 90.7%.',
  },
];

// ============================================================================
// Series builder
// ============================================================================

const monthLabelsPt = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthLabelsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const HISTORY_MONTHS = 24;
const FORECAST_MAX = 12;

const noise = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1; // [-1,1]
};

export const buildSeries = (
  sku: SkuDef,
  channel: 'total' | 'digital' | 'physical',
  region: 'total' | 'sudeste' | 'sul' | 'nordeste',
  horizon: 6 | 12,
): MonthPoint[] => {
  const channelMult =
    channel === 'digital' ? sku.channelMix.digital : channel === 'physical' ? sku.channelMix.physical : 1;

  // Amplified regional contrast so filter changes are visible in the KPIs
  const regionMult =
    region === 'sudeste' ? 0.58 : region === 'sul' ? 0.19 : region === 'nordeste' ? 0.14 : 1;

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth(); // 0-11, real current month

  const totalMonths = HISTORY_MONTHS + FORECAST_MAX;
  const points: MonthPoint[] = [];

  // History ends at current month - 1. Current month (offset 0) is the first forecast point.
  const HIST_LAST_INDEX = HISTORY_MONTHS - 1; // exclusive end for history; first forecast index

  for (let i = 0; i < totalMonths; i++) {
    const monthOffset = i - HIST_LAST_INDEX;
    const realMonth = ((nowMonth + monthOffset) % 12 + 12) % 12;
    const realYear = nowYear + Math.floor((nowMonth + monthOffset) / 12);
    const isHistory = i < HIST_LAST_INDEX;

    const yearsFromStart = monthOffset / 12;
    const trendFactor = Math.pow(1 + sku.cagr, yearsFromStart + HISTORY_MONTHS / 12);

    const seasonWeight = sku.seasonProfile[realMonth] ?? 0;
    const seasonFactor = 1 + sku.seasonAmp * seasonWeight;

    const promoBoost = sku.promoMonths.includes(realMonth) ? 0.18 : 0;
    const accelFactor = i >= HIST_LAST_INDEX - 2 ? sku.accelLast * ((i - (HIST_LAST_INDEX - 2)) / 6 + 0.5) : 0;

    const baseline = sku.base * trendFactor * seasonFactor * channelMult * regionMult;
    const trueValue = baseline * (1 + promoBoost + accelFactor + noise(i + sku.base) * 0.05);

    const point: MonthPoint = {
      key: `${realYear}-${String(realMonth + 1).padStart(2, '0')}`,
      labelPt: `${monthLabelsPt[realMonth]}/${String(realYear).slice(2)}`,
      labelEn: `${monthLabelsEn[realMonth]}/${String(realYear).slice(2)}`,
      history: null,
      currentFcst: null,
      i6Fcst: null,
      ciLow: null,
      ciHigh: null,
      trend: null,
      season: null,
      promo: null,
      sparsityFix: null,
      hasPromo: sku.promoMonths.includes(realMonth),
    };

    if (isHistory) {
      const isRuptured = sku.rupturedMonths.includes(i);
      const isAccurate = sku.accuratePastMonths.includes(i);
      point.history = Math.round(isRuptured ? trueValue * 0.15 : trueValue);

      // Client forecast — big error, tighter on accurate months
      const nz = noise(i + sku.base + 91);
      const clientErrMag = isAccurate ? 0.035 : 0.28 + Math.abs(nz) * 0.18;
      const clientSign = nz > 0 ? 1 : -1;
      point.currentFcst = Math.round(trueValue * (1 + clientSign * clientErrMag));

      // i6 forecast — small error everywhere except accurate months (just below client)
      const nz2 = noise(i + sku.base + 173);
      const i6ErrMag = isAccurate ? clientErrMag + 0.022 : 0.03 + Math.abs(nz2) * 0.035;
      const i6Sign = nz2 > 0 ? 1 : -1;
      point.i6Fcst = Math.round(trueValue * (1 + i6Sign * i6ErrMag));
    } else {
      const fIdx = i - HIST_LAST_INDEX; // 0 = current month, 1 = next month, ...
      if (fIdx >= horizon) continue;

      let currentBiasFactor = 1;
      if (sku.currentBias === 'under') currentBiasFactor = 0.83;
      else if (sku.currentBias === 'over') currentBiasFactor = 1.13;
      const dampedSeason = 1 + sku.seasonAmp * 0.55 * seasonWeight;
      const currentBaseline =
        sku.base * trendFactor * dampedSeason * channelMult * regionMult * currentBiasFactor;
      point.currentFcst = Math.round(currentBaseline * (1 + promoBoost * 0.4));

      const i6Value = trueValue;
      point.i6Fcst = Math.round(i6Value);

      const ciBandPct = 0.06 + 0.04 * (fIdx / horizon);
      point.ciLow = Math.round(i6Value * (1 - ciBandPct));
      point.ciHigh = Math.round(i6Value * (1 + ciBandPct));

      const trendComp = sku.base * trendFactor * channelMult * regionMult;
      // Amplify seasonal contrast so recurring SKUs still show a visible signed wave
      const effectiveSeasonAmp = Math.max(sku.seasonAmp, 0.14);
      const seasonComp = trendComp * effectiveSeasonAmp * seasonWeight;
      const promoComp = trendComp * promoBoost;
      const sparsityComp = sku.rupturedMonths.length > 0 ? trendComp * 0.04 : 0;

      point.trend = Math.round(trendComp);
      point.season = Math.round(seasonComp);
      point.promo = Math.round(promoComp);
      point.sparsityFix = Math.round(sparsityComp);
    }

    points.push(point);
  }

  return points;
};

// ============================================================================
// Pipeline steps
// ============================================================================

export const pipeline: PipelineStep[] = [
  {
    labelPt: 'Lendo histórico e variáveis comerciais',
    labelEn: 'Reading history and commercial variables',
    microPt: 'sell-in · sell-out · preço · promo · estoque · calendário · canal',
    microEn: 'sell-in · sell-out · price · promo · stock · calendar · channel',
    durationMs: 420,
  },
  {
    labelPt: 'Tratando esparsidade, outliers e períodos sem venda',
    labelEn: 'Handling sparsity, outliers and no-sale periods',
    microPt: 'ausência ≠ ruptura ≠ indisponibilidade de dados',
    microEn: 'absence ≠ stockout ≠ missing data',
    durationMs: 480,
  },
  {
    labelPt: 'Aprendendo a performance do PDV',
    labelEn: 'Learning point-of-sale performance',
    microPt: 'Giro, margem e ruptura sob comportamento contextual da loja.',
    microEn: 'Turnover, margin and stockout under store contextual behavior.',
    durationMs: 460,
  },
  {
    labelPt: 'Detectando tendência e sazonalidade',
    labelEn: 'Detecting trend and seasonality',
    microPt: 'ciclos · mudanças estruturais · efeitos recorrentes',
    microEn: 'cycles · structural shifts · recurring effects',
    durationMs: 460,
  },
  {
    labelPt: 'Selecionando o melhor comportamento preditivo por série',
    labelEn: 'Selecting the best predictive behavior per series',
    microPt: 'SKU × região × canal × loja × cliente',
    microEn: 'SKU × region × channel × store × customer',
    durationMs: 520,
  },
  {
    labelPt: 'Projetando demanda e intervalo de confiança',
    labelEn: 'Projecting demand and confidence interval',
    microPt: 'previsão granular para os próximos 12 meses',
    microEn: 'granular forecast for the next 12 months',
    durationMs: 380,
  },
];

// ============================================================================
// i18n labels
// ============================================================================

export const demoLabels = {
  pt: {
    objective: 'OBJETIVO: EFICIÊNCIA DO SUPPLY',
    scenarioTitle: 'Dashboard de planejamento',
    scenarioSubtitle: 'Forecast atual · próximos 12 meses',
    reasoningTitle: 'Explicabilidade e raciocínio do modelo • i6RecSys',
    reasoningSubtitle: 'i6 Forecast — mecanismo preditivo',
    filters: {
      sku: 'Produto',
      channel: 'Canal',
      region: 'Região',
      store: 'Loja/PDV',
      horizon: 'Horizonte',
      allStores: 'Todas',
    },
    channelOptions: { total: 'Total', digital: 'Digital', physical: 'Físico' },
    regionOptions: { total: 'Total', sudeste: 'Sudeste', sul: 'Sul', nordeste: 'Nordeste' },
    horizonOptions: { 6: '6 meses', 12: '12 meses' },
    kpi: {
      accuracy: 'Acurácia',
      meanError: 'Erro médio',
      stockout: 'Ruptura',
      excess: 'Excesso',
      volume: 'Volume médio/mês',
    },
    compare: {
      before: 'Atual',
      after: 'i6',
      delta: 'Δ',
    },
    cta: 'Executar forecast preditivo',
    running: 'Rodando modelo...',
    legend: {
      history: 'Histórico real',
      currentFcst: 'Forecast atual',
      i6Fcst: 'Forecast i6',
      ci: 'Intervalo de confiança i6',
    },
    result: {
      title: 'Forecast atual × Forecast i6',
      composition: 'Composição da demanda projetada',
      compositionHint: 'Clique em um mês para ver o breakdown',
      currentError: 'Erro forecast atual',
      i6Error: 'Erro backtest i6',
      projectedAcc: 'Acurácia projetada',
      horizon: 'Horizonte',
      trend: 'Tendência',
      season: 'Sazonalidade',
      promo: 'Efeito promocional',
      promoNote: 'Nota promocional',
      sparsityFix: 'Correção de esparsidade',
      totalMonth: 'Total do mês',
    },
    rationaleLabel: 'POR QUE PROJETAMOS ESTA DEMANDA',
    latency: 'Latência',
    latencyHint: 'abaixo da média de mercado (~180 ms)',
    reset: 'Restaurar Forecast Original',
  },
  en: {
    objective: 'OBJECTIVE: SUPPLY EFFICIENCY',
    scenarioTitle: 'Planning dashboard',
    scenarioSubtitle: 'Current forecast · next 12 months',
    reasoningTitle: 'Explainability and model reasoning • i6RecSys',
    reasoningSubtitle: 'i6 Forecast — predictive engine',
    filters: {
      sku: 'Product',
      channel: 'Channel',
      region: 'Region',
      store: 'Store/POS',
      horizon: 'Horizon',
      allStores: 'All',
    },
    channelOptions: { total: 'Total', digital: 'Digital', physical: 'Physical' },
    regionOptions: { total: 'Total', sudeste: 'Southeast', sul: 'South', nordeste: 'Northeast' },
    horizonOptions: { 6: '6 months', 12: '12 months' },
    kpi: {
      accuracy: 'Historical accuracy',
      meanError: 'Mean error',
      stockout: 'Stockout',
      excess: 'Excess',
      volume: 'Avg volume/month',
    },
    compare: {
      before: 'Current',
      after: 'i6',
      delta: 'Δ',
    },
    cta: 'Run predictive forecast',
    running: 'Running model...',
    legend: {
      history: 'Actual history',
      currentFcst: 'Current forecast',
      i6Fcst: 'i6 forecast',
      ci: 'i6 confidence interval',
    },
    result: {
      title: 'Current forecast × i6 forecast',
      composition: 'Projected demand composition',
      compositionHint: 'Click a month to see the breakdown',
      currentError: 'Current forecast error',
      i6Error: 'i6 backtest error',
      projectedAcc: 'Projected accuracy',
      horizon: 'Horizon',
      trend: 'Trend',
      season: 'Seasonality',
      promo: 'Promo effect',
      promoNote: 'Promo note',
      sparsityFix: 'Sparsity correction',
      totalMonth: 'Month total',
    },
    rationaleLabel: 'WHY WE PROJECTED THIS DEMAND',
    latency: 'Latency',
    latencyHint: 'below market average (~180 ms)',
    reset: 'Restore Original Forecast',
  },
};

export type DemoLang = KioskLang;
