import type { KioskLang } from '@/data/kiosk/config';

// ============================================================================
// Types
// ============================================================================

export interface MonthPoint {
  key: string; // e.g. 2024-01
  labelPt: string;
  labelEn: string;
  history: number | null;
  currentFcst: number | null;
  i6Fcst: number | null;
  ciLow: number | null;
  ciHigh: number | null;
  // Decomposition — only present on forecast months
  trend: number | null;
  season: number | null;
  promo: number | null;
  sparsityFix: number | null;
  accel: number | null;
}

export interface SkuDef {
  id: string;
  namePt: string;
  nameEn: string;
  categoryPt: string;
  categoryEn: string;
  cagr: number; // annual growth
  seasonAmp: number; // seasonality amplitude 0-1
  seasonPeak: number; // month index of peak (0=Jan)
  promoMonths: number[]; // 0-based month indexes with promo boost
  rupturedMonths: number[]; // history months to zero-out
  accelLast: number; // 0-1 acceleration in last 90 days
  channelMix: { digital: number; physical: number }; // must sum to 1
  base: number; // baseline units
  currentBias: 'over' | 'under' | 'flat'; // enterprise forecast bias
  currentErrorPct: number; // MAPE of current fcst vs actual
  i6ErrorPct: number; // MAPE i6 backtest
  historicalAccuracyPct: number;
  meanErrorPct: number;
  stockoutPct: number;
  excessPct: number;
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
// SKU catalog — 4 archetypes with distinct patterns
// ============================================================================

export const skus: SkuDef[] = [
  {
    id: 'beverage',
    namePt: 'Bebida sazonal — 2L',
    nameEn: 'Seasonal beverage — 2L',
    categoryPt: 'Bebidas',
    categoryEn: 'Beverages',
    cagr: 0.08,
    seasonAmp: 0.42,
    seasonPeak: 11, // dec
    promoMonths: [10, 11], // nov, dec
    rupturedMonths: [4, 16], // may/prev year, may/current
    accelLast: 0.14,
    channelMix: { digital: 0.32, physical: 0.68 },
    base: 12800,
    currentBias: 'under',
    currentErrorPct: 24.8,
    i6ErrorPct: 10.6,
    historicalAccuracyPct: 75.2,
    meanErrorPct: 18.4,
    stockoutPct: 6.8,
    excessPct: 4.2,
    argumentPt:
      'Produto com crescimento estrutural de +8% a.a. e sazonalidade forte no Q4 (pico em dezembro, +42% acima do baseline). Corrigimos maio de 2024 e maio de 2025 — meses com ruptura em que a demanda real foi ~2× o vendido — e isolamos o efeito promocional de nov/dez para não superestimar meses regulares. Nos últimos 90 dias detectamos aceleração adicional de +14% no canal digital vs. baseline, enquanto o físico segue estável. O forecast atual subestima Q4 em ~19pp por não separar promo de tendência; a i6 estreita o intervalo de confiança de ±22% para ±7% e corrige o viés estrutural entre outubro e janeiro.',
    argumentEn:
      'Structural +8% YoY growth with strong Q4 seasonality (December peak, +42% above baseline). We recovered May 2024 and May 2025 — stockout months where real demand was ~2× what was sold — and isolated the Nov/Dec promo effect to avoid over-projecting regular months. Last 90 days show an additional +14% acceleration in the digital channel vs. baseline, while physical is stable. The current forecast under-projects Q4 by ~19pp because it does not separate promo from trend; i6 narrows the confidence interval from ±22% to ±7% and corrects the structural bias between October and January.',
  },
  {
    id: 'hygiene',
    namePt: 'Higiene recorrente — 400ml',
    nameEn: 'Recurring hygiene — 400ml',
    categoryPt: 'Higiene',
    categoryEn: 'Hygiene',
    cagr: 0.03,
    seasonAmp: 0.08,
    seasonPeak: 0,
    promoMonths: [3, 9],
    rupturedMonths: [21],
    accelLast: 0.04,
    channelMix: { digital: 0.28, physical: 0.72 },
    base: 8400,
    currentBias: 'over',
    currentErrorPct: 17.2,
    i6ErrorPct: 6.9,
    historicalAccuracyPct: 82.8,
    meanErrorPct: 12.1,
    stockoutPct: 2.4,
    excessPct: 9.6,
    argumentPt:
      'Categoria de recompra alta com baixíssima sazonalidade (±8%) e crescimento maduro (+3% a.a.). O forecast atual carrega viés otimista porque incorpora dois picos promocionais isolados (abril e outubro) como tendência recorrente, gerando excesso de estoque de 9,6%. A i6 separa os 2 pontos promocionais do baseline, corrige o mês 21 (ruptura pontual) e projeta demanda essencialmente linear com ±4% de banda. Aceleração dos últimos 90 dias é marginal (+4%), sem justificar ajuste estrutural. Redução de excesso projetada de 9,6% para 3,1%.',
    argumentEn:
      'High-repurchase category with very low seasonality (±8%) and mature growth (+3% YoY). The current forecast is optimistic because it treats two isolated promo peaks (April and October) as recurring trend, driving 9.6% excess inventory. i6 separates the 2 promo points from the baseline, recovers month 21 (isolated stockout) and projects essentially linear demand with a ±4% band. Last 90-day acceleration is marginal (+4%), not enough to justify a structural adjustment. Excess projected to fall from 9.6% to 3.1%.',
  },
  {
    id: 'electronics',
    namePt: 'Eletro portátil — linha A',
    nameEn: 'Portable electronics — line A',
    categoryPt: 'Eletrônicos',
    categoryEn: 'Electronics',
    cagr: 0.18,
    seasonAmp: 0.55,
    seasonPeak: 10, // nov (black friday)
    promoMonths: [10, 11, 5],
    rupturedMonths: [10, 22],
    accelLast: 0.28,
    channelMix: { digital: 0.71, physical: 0.29 },
    base: 4200,
    currentBias: 'under',
    currentErrorPct: 31.4,
    i6ErrorPct: 12.8,
    historicalAccuracyPct: 68.6,
    meanErrorPct: 24.9,
    stockoutPct: 11.4,
    excessPct: 3.1,
    argumentPt:
      'Categoria em crescimento acelerado (+18% a.a.) com sazonalidade de Black Friday e Natal muito pronunciada (±55%) e forte concentração no canal digital (71%). Identificamos ruptura em dois novembros seguidos — o forecast atual não recupera esses meses e por isso subestima o pico em ~27pp. Aceleração de +28% nos últimos 90 dias, quase toda no digital (dispositivos móveis dominam a jornada). A i6 separa Black Friday do baseline, incorpora crescimento estrutural, aplica calendário 2025 (BF em 28/11) e propõe compra escalonada para reduzir ruptura de 11,4% para 2,8%. Intervalo de confiança cai de ±31% para ±9%.',
    argumentEn:
      'Fast-growing category (+18% YoY) with very pronounced Black Friday and Christmas seasonality (±55%) and strong digital-channel concentration (71%). We detected stockouts in two consecutive Novembers — the current forecast fails to recover those months and therefore under-projects the peak by ~27pp. Last 90 days show +28% acceleration, almost entirely digital (mobile devices dominate the journey). i6 separates Black Friday from the baseline, incorporates structural growth, applies the 2025 calendar (BF on Nov 28) and proposes a staggered purchase plan to reduce stockout from 11.4% to 2.8%. Confidence interval drops from ±31% to ±9%.',
  },
  {
    id: 'fashion',
    namePt: 'Moda rápida — cápsula',
    nameEn: 'Fast fashion — capsule',
    categoryPt: 'Vestuário',
    categoryEn: 'Apparel',
    cagr: 0.11,
    seasonAmp: 0.36,
    seasonPeak: 5, // jun (winter start SP)
    promoMonths: [0, 6],
    rupturedMonths: [8, 20],
    accelLast: 0.18,
    channelMix: { digital: 0.58, physical: 0.42 },
    base: 5600,
    currentBias: 'flat',
    currentErrorPct: 22.6,
    i6ErrorPct: 9.3,
    historicalAccuracyPct: 71.8,
    meanErrorPct: 19.2,
    stockoutPct: 7.9,
    excessPct: 8.4,
    argumentPt:
      'Ciclo curto de coleção com sazonalidade dupla (inverno-SP em jun/jul e liquidação em jan/fev) e viés flat no forecast atual — que ignora tanto o pico sazonal quanto a queda pós-coleção, gerando simultaneamente ruptura (7,9%) e excesso (8,4%) em SKUs diferentes. Detectamos aceleração de +18% nos últimos 90 dias no digital com aderência a busca por peças específicas (drop 04). A i6 modela cada onda de coleção separadamente, recupera setembro e agosto passados (ruptura), aplica peso maior às últimas 8 semanas de venda e projeta demanda com viés positivo entre maio e agosto, corrigindo o descolamento entre canais.',
    argumentEn:
      'Short collection cycle with double seasonality (winter-SP in Jun/Jul and clearance in Jan/Feb) and a flat bias in the current forecast — which ignores both the seasonal peak and the post-collection drop, causing simultaneous stockout (7.9%) and excess (8.4%) across different SKUs. Last 90 days show +18% acceleration in digital driven by search for specific pieces (drop 04). i6 models each collection wave separately, recovers past August and September stockouts, weights the last 8 weeks of sales more heavily and projects positive bias between May and August, correcting the channel-level mismatch.',
  },
];

// ============================================================================
// Series builder — deterministic
// ============================================================================

const monthLabelsPt = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthLabelsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const HISTORY_MONTHS = 24;
const FORECAST_MAX = 12;

// Deterministic pseudo-noise so the visualization is stable across renders
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

  const regionMult =
    region === 'sudeste' ? 0.52 : region === 'sul' ? 0.22 : region === 'nordeste' ? 0.18 : 1;

  // Anchor: 24 months history ends "now", forecast starts month +1
  // Use a fixed anchor month (Nov 2025 as "current") so numbers are stable
  const nowYear = 2025;
  const nowMonth = 10; // 0-based → nov

  const totalMonths = HISTORY_MONTHS + FORECAST_MAX;
  const points: MonthPoint[] = [];

  for (let i = 0; i < totalMonths; i++) {
    // absolute month index from series start
    // month(i) in real calendar
    const monthOffset = i - (HISTORY_MONTHS - 1); // 0 = current month, negative = past, positive = future
    const realMonth = ((nowMonth + monthOffset) % 12 + 12) % 12;
    const realYear = nowYear + Math.floor((nowMonth + monthOffset) / 12);
    const isHistory = i < HISTORY_MONTHS;

    // Trend
    const yearsFromStart = (i - HISTORY_MONTHS) / 12;
    const trendFactor = Math.pow(1 + sku.cagr, yearsFromStart + HISTORY_MONTHS / 12);

    // Seasonality — cosine centered on peak
    const seasonPhase = ((realMonth - sku.seasonPeak) / 12) * 2 * Math.PI;
    const seasonFactor = 1 + sku.seasonAmp * Math.cos(seasonPhase);

    // Promo boost
    const promoBoost = sku.promoMonths.includes(realMonth) ? 0.18 : 0;

    // Acceleration in the last 90 days of history / first 90 days of forecast
    const accelFactor = i >= HISTORY_MONTHS - 3 ? sku.accelLast * ((i - (HISTORY_MONTHS - 3)) / 6 + 0.5) : 0;

    // Base value
    const baseline = sku.base * trendFactor * seasonFactor * channelMult * regionMult;
    const value = baseline * (1 + promoBoost + accelFactor + noise(i + sku.base) * 0.05);

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
      accel: null,
    };

    if (isHistory) {
      // Zero-out ruptured months
      const isRuptured = sku.rupturedMonths.includes(i);
      point.history = Math.round(isRuptured ? value * 0.15 : value);
    } else {
      const fIdx = i - HISTORY_MONTHS; // 0..11
      if (fIdx >= horizon) continue;

      // Enterprise forecast — biased and flat-ish
      let currentBiasFactor = 1;
      if (sku.currentBias === 'under') currentBiasFactor = 0.83;
      else if (sku.currentBias === 'over') currentBiasFactor = 1.13;
      else currentBiasFactor = 1;
      // Enterprise also dampens seasonality
      const dampedSeason = 1 + sku.seasonAmp * 0.55 * Math.cos(seasonPhase);
      const currentBaseline =
        sku.base * trendFactor * dampedSeason * channelMult * regionMult * currentBiasFactor;
      point.currentFcst = Math.round(currentBaseline * (1 + promoBoost * 0.4));

      // i6 forecast — full model
      const i6Value = value; // already includes trend+season+promo+accel
      point.i6Fcst = Math.round(i6Value);

      // Confidence interval — narrower for i6
      const ciBandPct = 0.06 + 0.04 * (fIdx / horizon); // widens over horizon
      point.ciLow = Math.round(i6Value * (1 - ciBandPct));
      point.ciHigh = Math.round(i6Value * (1 + ciBandPct));

      // Decomposition — absolute components summing (approx) to i6 forecast
      const trendComp = sku.base * trendFactor * channelMult * regionMult;
      const seasonComp = trendComp * (seasonFactor - 1);
      const promoComp = trendComp * promoBoost;
      // sparsity correction = credit added when the forecast horizon month
      // "inherits" from ruptured history — proxy as a small positive lift
      const sparsityComp = sku.rupturedMonths.length > 0 ? trendComp * 0.04 : 0;
      const accelComp = trendComp * accelFactor;

      point.trend = Math.round(trendComp);
      point.season = Math.round(seasonComp);
      point.promo = Math.round(promoComp);
      point.sparsityFix = Math.round(sparsityComp);
      point.accel = Math.round(accelComp);
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
    objective: 'OBJETIVO: PREVISIBILIDADE',
    scenarioTitle: 'Dashboard de planejamento',
    scenarioSubtitle: 'Forecast atual · próximos 12 meses',
    reasoningTitle: 'Como o modelo está pensando',
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
      accuracy: 'Acurácia histórica',
      meanError: 'Erro médio',
      stockout: 'Ruptura',
      excess: 'Excesso',
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
      sparsityFix: 'Correção de esparsidade',
      accel: 'Aceleração',
      totalMonth: 'Total do mês',
    },
    rationaleLabel: 'POR QUE PROJETAMOS ESTA DEMANDA',
    latency: 'Latência',
    latencyHint: 'abaixo da média de mercado (~180 ms)',
    reset: 'Explorar outra solução',
  },
  en: {
    objective: 'OBJECTIVE: PREDICTABILITY',
    scenarioTitle: 'Planning dashboard',
    scenarioSubtitle: 'Current forecast · next 12 months',
    reasoningTitle: 'How the model is thinking',
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
      sparsityFix: 'Sparsity correction',
      accel: 'Acceleration',
      totalMonth: 'Month total',
    },
    rationaleLabel: 'WHY WE PROJECTED THIS DEMAND',
    latency: 'Latency',
    latencyHint: 'below market average (~180 ms)',
    reset: 'Explore another solution',
  },
};

export type DemoLang = KioskLang;
