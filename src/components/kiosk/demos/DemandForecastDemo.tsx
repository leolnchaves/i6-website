import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import type { KioskLang } from '@/data/kiosk/config';
import {
  buildSeries,
  demoLabels,
  pipeline,
  skus,
  type MonthPoint,
  type SkuDef,
} from '@/data/kiosk/demos/demandForecast';

interface Props {
  lang: KioskLang;
}

type Channel = 'total' | 'digital' | 'physical';
type Region = 'total' | 'sudeste' | 'sul' | 'nordeste';
type Horizon = 6 | 12;
type Phase = 'planning' | 'running' | 'result';

const fmtNum = (v: number, lang: KioskLang) =>
  v.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 0 });

const DemandForecastDemo = ({ lang }: Props) => {
  const L = demoLabels[lang];

  const [skuId, setSkuId] = useState<string>(skus[0].id);
  const [channel, setChannel] = useState<Channel>('total');
  const [region, setRegion] = useState<Region>('total');
  const [horizon, setHorizon] = useState<Horizon>(12);
  const [phase, setPhase] = useState<Phase>('planning');
  const [progress, setProgress] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const sku = useMemo<SkuDef>(() => skus.find((s) => s.id === skuId) ?? skus[0], [skuId]);
  const series = useMemo(
    () => buildSeries(sku, channel, region, horizon),
    [sku, channel, region, horizon],
  );

  // Fixed y-scale based on Total×Total so channel/region filters visibly shrink the chart
  const scaleReference = useMemo(
    () => buildSeries(sku, 'total', 'total', horizon),
    [sku, horizon],
  );
  const fixedMaxY = useMemo(() => {
    const all: number[] = [];
    scaleReference.forEach((p) => {
      if (p.history !== null) all.push(p.history);
      if (p.currentFcst !== null) all.push(p.currentFcst);
      if (p.i6Fcst !== null) all.push(p.i6Fcst);
    });
    return Math.max(...all) * 1.08;
  }, [scaleReference]);

  // Volume avg to visibly react to channel/region filters
  const avgVolume = useMemo(() => {
    const hist = series.map((p) => p.history).filter((v): v is number => v !== null);
    if (!hist.length) return 0;
    return Math.round(hist.reduce((a, b) => a + b, 0) / hist.length);
  }, [series]);

  const latencySec = useMemo(() => {
    if (phase === 'planning') return '0.00';
    return ((28 + Math.random() * 34) / 1000).toFixed(2);
  }, [phase, sku.id]);

  useEffect(() => {
    setSelectedMonth(null);
  }, [skuId, channel, region, horizon]);

  useEffect(() => {
    if (phase !== 'running') return;
    setProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    pipeline.forEach((step, i) => {
      elapsed += step.durationMs;
      timers.push(setTimeout(() => setProgress(i + 1), elapsed));
    });
    timers.push(setTimeout(() => setPhase('result'), elapsed + 240));
    return () => timers.forEach(clearTimeout);
  }, [phase]);




  const reset = () => {
    setPhase('planning');
    setProgress(0);
    setSelectedMonth(null);
  };

  const forecastPoints = series.filter((p) => p.i6Fcst !== null && p.trend !== null);
  const clickedPoint = selectedMonth ? forecastPoints.find((p) => p.key === selectedMonth) ?? null : null;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP — dashboard / result */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {phase === 'result' ? L.result.title : L.scenarioTitle}
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                {phase === 'result' ? `${horizon} ${lang === 'pt' ? 'meses' : 'months'}` : L.scenarioSubtitle}
              </p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
              {L.objective}
            </span>
          </div>

          <div className="p-[2.2vmin] flex flex-col gap-[1.5vmin]">
            <FilterChips
              lang={lang}
              L={L}
              sku={sku}
              channel={channel}
              region={region}
              horizon={horizon}
              onSku={(v) => setSkuId(v)}
              onChannel={(v) => setChannel(v)}
              onRegion={(v) => setRegion(v)}
              onHorizon={(v) => setHorizon(v)}
              disabled={phase === 'running'}
            />

            <MainChart
              series={series}
              phase={phase}
              lang={lang}
              fixedMaxY={fixedMaxY}
            />

            {phase === 'planning' && (
              <>
                <div className="grid grid-cols-5 gap-[1vmin] mt-[0.5vmin]">
                  <MiniKpi label={L.kpi.accuracy} value={`${sku.historicalAccuracyPct.toFixed(1)}%`} warn />
                  <MiniKpi label={L.kpi.meanError} value={`${sku.meanErrorPct.toFixed(1)}%`} warn />
                  <MiniKpi label={L.kpi.stockout} value={`${sku.stockoutPct.toFixed(1)}%`} warn />
                  <MiniKpi label={L.kpi.excess} value={`${sku.excessPct.toFixed(1)}%`} warn />
                  <MiniKpi label={L.kpi.volume} value={fmtNum(avgVolume, lang)} />
                </div>
                <button
                  type="button"
                  onClick={() => setPhase('running')}
                  className="self-stretch min-h-[7vmin] rounded-2xl bg-[#F4845F] text-white font-bold text-[2vmin] tracking-wide hover:bg-[#F4845F]/90 active:scale-[0.99] transition-all shadow-[0_0_28px_rgba(244,132,95,0.35)]"
                >
                  {L.cta}
                </button>
              </>
            )}

            {phase === 'running' && (
              <div className="rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">{L.running}</span>
              </div>
            )}

            {phase === 'result' && (
              <>
                <div className="grid grid-cols-4 gap-[1vmin]">
                  <KpiCompare label={L.kpi.accuracy} oldValue={sku.historicalAccuracyPct} newValue={sku.i6AccuracyPct} higherIsBetter L={L} />
                  <KpiCompare label={L.kpi.meanError} oldValue={sku.meanErrorPct} newValue={sku.i6MeanErrorPct} L={L} />
                  <KpiCompare label={L.kpi.stockout} oldValue={sku.stockoutPct} newValue={sku.i6StockoutPct} L={L} />
                  <KpiCompare label={L.kpi.excess} oldValue={sku.excessPct} newValue={sku.i6ExcessPct} L={L} />
                </div>
                {clickedPoint && (
                  <BreakdownCard point={clickedPoint} sku={sku} L={L} lang={lang} onClose={() => setSelectedMonth(null)} />
                )}
                <div>
                  <div className="flex items-baseline justify-between mb-[0.8vmin]">
                    <span className="text-[1.4vmin] font-semibold text-white/80 uppercase tracking-[0.2em]">
                      {L.result.composition}
                    </span>
                    <span className="text-[1.2vmin] text-white/50">{L.result.compositionHint}</span>
                  </div>
                  <CompositionChart
                    series={series}
                    lang={lang}
                    L={L}
                    selectedKey={selectedMonth}
                    onSelect={(k) => setSelectedMonth((cur) => (cur === k ? null : k))}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM — reasoning: POR QUE + horizontal timeline */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="flex items-center gap-[1.2vmin] mb-[1.4vmin]">
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">{L.reasoningTitle}</h4>
              <p className="text-[1.35vmin] text-white/60">{L.reasoningSubtitle}</p>
            </div>
          </div>

          {/* POR QUE above timeline */}
          {phase === 'result' && (
            <div className="kiosk-insight-card mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.8vmin]">
              <div className="flex items-center gap-[1vmin] mb-[0.8vmin]">
                <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F] kiosk-insight-sparkle" strokeWidth={2.5} />
                <span className="text-[1.7vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                  {L.rationaleLabel}
                </span>
                <span className="ml-auto text-[1.15vmin] text-white/60 font-mono whitespace-nowrap">
                  {L.latency}: {latencySec} s
                </span>
              </div>
              <p className="text-[2vmin] leading-relaxed text-white/95">
                {lang === 'pt' ? sku.argumentPt : sku.argumentEn}
              </p>
            </div>
          )}

          {/* Micro-metric of active step */}
          <div className="h-[2vmin] mb-[1vmin] flex items-center justify-center">
            {phase === 'running' && progress < pipeline.length && (
              <span className="text-[1.2vmin] text-white/60 font-mono">
                {lang === 'pt' ? pipeline[progress].microPt : pipeline[progress].microEn}
              </span>
            )}
          </div>

          {/* Horizontal timeline */}
          <div className="relative px-[2vmin] pb-[1vmin]">
            <div className="absolute left-[3vmin] right-[3vmin] top-[1.9vmin] h-[0.3vmin] rounded-full bg-white/10" />
            <div
              className="absolute left-[3vmin] top-[1.9vmin] h-[0.3vmin] rounded-full bg-[#F4845F] transition-all duration-500"
              style={{
                width: `calc((100% - 6vmin) * ${
                  pipeline.length > 1
                    ? Math.min(progress, pipeline.length - 1) / (pipeline.length - 1)
                    : 0
                })`,
              }}
            />
            <div
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${pipeline.length}, minmax(0,1fr))` }}
            >
              {pipeline.map((step, i) => {
                const state =
                  phase === 'planning'
                    ? 'idle'
                    : phase === 'running'
                    ? i < progress
                      ? 'done'
                      : i === progress
                      ? 'active'
                      : 'idle'
                    : 'done';
                return (
                  <div key={i} className="flex flex-col items-center gap-[0.8vmin] px-[0.5vmin]">
                    <span
                      className={`flex-shrink-0 w-[3.8vmin] h-[3.8vmin] rounded-full flex items-center justify-center text-[1.5vmin] font-bold border-2 transition-all ${
                        state === 'done'
                          ? 'bg-[#F4845F] border-[#F4845F] text-white'
                          : state === 'active'
                          ? 'border-[#F4845F] text-[#F4845F] bg-[#F4845F]/15 animate-pulse'
                          : 'border-white/25 text-white/50 bg-[#0B1224]'
                      }`}
                    >
                      {state === 'done' ? <Check className="w-[1.8vmin] h-[1.8vmin]" /> : i + 1}
                    </span>
                    <span
                      className={`text-center text-[1.3vmin] leading-tight font-semibold ${
                        state === 'idle' ? 'text-white/45' : 'text-white/90'
                      }`}
                    >
                      {lang === 'pt' ? step.labelPt : step.labelEn}
                    </span>
                    <span
                      className={`text-center text-[1.1vmin] leading-tight font-mono ${
                        state === 'idle' ? 'text-white/30' : 'text-white/55'
                      }`}
                    >
                      {lang === 'pt' ? step.microPt : step.microEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {phase === 'result' && (
            <button
              type="button"
              onClick={reset}
              className="mt-[1.4vmin] w-full min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.6vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
            >
              {L.reset}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes kiosk-progress { from { width: 0% } to { width: 100% } }
        @keyframes kiosk-insight-in {
          0%   { opacity: 0; transform: translateY(12px) scale(.94); }
          100% { opacity: 1; transform: translateY(0)    scale(1);   }
        }
        @keyframes kiosk-insight-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,132,95,.35), 0 0 24px rgba(244,132,95,.25); border-color: rgba(244,132,95,.55); }
          50%      { box-shadow: 0 0 0 6px rgba(244,132,95,.10), 0 0 40px rgba(244,132,95,.60); border-color: rgba(244,132,95,1); }
        }
        @keyframes kiosk-insight-sparkle {
          0%, 100% { transform: scale(1)    rotate(0deg);   opacity: 1;   }
          50%      { transform: scale(1.25) rotate(15deg);  opacity: .85; }
        }
        .kiosk-insight-card {
          animation: kiosk-insight-in .5s ease-out .6s both, kiosk-insight-glow 2.4s ease-in-out .6s infinite;
        }
        .kiosk-insight-sparkle { animation: kiosk-insight-sparkle 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};


// ============================================================================
// Filter chips
// ============================================================================

const FilterChips = ({
  lang, L, sku, channel, region, horizon,
  onSku, onChannel, onRegion, onHorizon, disabled,
}: {
  lang: KioskLang;
  L: typeof demoLabels['pt'];
  sku: SkuDef;
  channel: Channel;
  region: Region;
  horizon: Horizon;
  onSku: (v: string) => void;
  onChannel: (v: Channel) => void;
  onRegion: (v: Region) => void;
  onHorizon: (v: Horizon) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-[0.9vmin]">
      <SegmentedRow
        label={L.filters.sku}
        options={skus.map((s) => ({ id: s.id, label: lang === 'pt' ? s.namePt : s.nameEn }))}
        selectedId={sku.id}
        onSelect={onSku}
        disabled={disabled}
      />
      <div className="grid grid-cols-2 gap-[1vmin]">
        <SegmentedRow
          label={L.filters.channel}
          options={(['total', 'digital', 'physical'] as Channel[]).map((c) => ({ id: c, label: L.channelOptions[c] }))}
          selectedId={channel}
          onSelect={(v) => onChannel(v as Channel)}
          disabled={disabled}
        />
        <SegmentedRow
          label={L.filters.region}
          options={(['total', 'sudeste', 'sul'] as Region[]).map((r) => ({ id: r, label: L.regionOptions[r] }))}
          selectedId={region}
          onSelect={(v) => onRegion(v as Region)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};


const SegmentedRow = ({
  label, options, selectedId, onSelect, disabled,
}: {
  label: string;
  options: { id: string; label: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center gap-[1vmin]">
      <span className="text-[1.15vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F] min-w-[8vmin]">
        {label}
      </span>
      <div className="flex flex-wrap gap-[0.6vmin] flex-1">
        {options.map((o) => {
          const active = o.id === selectedId;
          return (
            <button
              key={o.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(o.id)}
              className={`min-h-[4.6vmin] px-[1.6vmin] py-[0.9vmin] rounded-xl border-2 text-[1.35vmin] font-semibold transition active:scale-[0.97] ${
                active
                  ? 'border-[#F4845F] bg-[#F4845F]/15 text-white shadow-[0_0_12px_rgba(244,132,95,0.25)]'
                  : 'border-white/15 bg-white/[0.03] text-white/80 hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06]'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};


// ============================================================================
// Main chart — continuous history+forecast, no year separator
// ============================================================================

const MainChart = ({
  series, phase, lang, fixedMaxY,
}: {
  series: MonthPoint[];
  phase: Phase;
  lang: KioskLang;
  fixedMaxY: number;
}) => {
  const W = 560;
  const H = 240;
  const PAD_L = 34;
  const PAD_R = 10;
  const PAD_T = 14;
  const PAD_B = 28;

  const maxY = fixedMaxY;
  const minY = 0;
  const n = series.length;

  const x = (i: number) => PAD_L + (i / (n - 1)) * (W - PAD_L - PAD_R);
  const y = (v: number) => PAD_T + (1 - (v - minY) / (maxY - minY)) * (H - PAD_T - PAD_B);

  const buildPath = (extractor: (p: MonthPoint) => number | null): string => {
    let d = '';
    let started = false;
    series.forEach((p, i) => {
      const v = extractor(p);
      if (v === null) {
        started = false;
        return;
      }
      d += `${started ? 'L' : 'M'} ${x(i)} ${y(v)} `;
      started = true;
    });
    return d;
  };

  const historyPath = buildPath((p) => p.history);
  const currentPath = buildPath((p) => p.currentFcst);
  const i6Path = phase === 'result' ? buildPath((p) => p.i6Fcst) : '';

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => minY + (maxY - minY) * t);
  const xLabels = series
    .map((p, i) => ({ i, label: lang === 'pt' ? p.labelPt : p.labelEn }))
    .filter((_, i) => i % 3 === 0);

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/10 p-[1.4vmin]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ maxHeight: 256 }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="2 3"
            />
            <text x={PAD_L - 4} y={y(t) + 3} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.4)">
              {t >= 1000 ? `${(t / 1000).toFixed(0)}k` : t.toFixed(0)}
            </text>
          </g>
        ))}
        <path d={historyPath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" />
        <path d={currentPath} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeDasharray="4 3" />
        {i6Path && <path d={i6Path} fill="none" stroke="#F4845F" strokeWidth="2" />}
        {xLabels.map((l) => (
          <text
            key={l.i}
            x={x(l.i)}
            y={H - 8}
            textAnchor="middle"
            fontSize="7.5"
            fill="rgba(255,255,255,0.5)"
          >
            {l.label}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-[1.4vmin] mt-[0.8vmin] text-[1.15vmin] text-white/70">
        <LegendDot color="rgba(255,255,255,0.85)" label={demoLabels[lang].legend.history} />
        <LegendDot color="rgba(255,255,255,0.5)" dashed label={demoLabels[lang].legend.currentFcst} />
        {phase === 'result' && <LegendDot color="#F4845F" label={demoLabels[lang].legend.i6Fcst} />}
      </div>
    </div>
  );
};

const LegendDot = ({
  color, label, dashed, square,
}: { color: string; label: string; dashed?: boolean; square?: boolean }) => (
  <span className="inline-flex items-center gap-[0.5vmin]">
    {square ? (
      <span style={{ background: color }} className="w-[1.6vmin] h-[0.9vmin] rounded-sm inline-block" />
    ) : (
      <span
        className="inline-block w-[1.8vmin] h-[0.35vmin] rounded-full"
        style={{
          background: color,
          borderTop: dashed ? `2px dashed ${color}` : undefined,
          height: dashed ? 0 : undefined,
        }}
      />
    )}
    <span>{label}</span>
  </span>
);

// ============================================================================
// Composition chart — bars (sparsity) + lines (trend / season) + promo markers
// ============================================================================

const CompositionChart = ({
  series, L, lang, selectedKey, onSelect,
}: {
  series: MonthPoint[];
  L: typeof demoLabels['pt'];
  lang: KioskLang;
  selectedKey: string | null;
  onSelect: (k: string) => void;
}) => {
  const points = series.filter((p) => p.trend !== null);
  const W = 620;
  const H = 220;
  const PAD_L = 44;
  const PAD_R = 14;
  const PAD_T = 18;
  const PAD_B = 34;

  const chartH = H - PAD_T - PAD_B;

  // Deterministic wiggle for organic feel
  const wiggle = (seed: number) => {
    const x = Math.sin(seed * 78.233 + 3.14) * 43758.5453;
    return (x - Math.floor(x)) * 2 - 1;
  };

  // Trend: strictly monotonic (no wiggle) so only seasonality oscillates on the chart
  const trendRaw = points.map((p) => p.trend ?? 0);
  const trendDisplay = trendRaw;

  // Season: signed (can be negative)
  const seasonSigned = points.map((p) => p.season ?? 0);
  const sparsityVals = points.map((p) => Math.max(0, p.sparsityFix ?? 0));

  const posMax = Math.max(
    ...trendDisplay,
    ...seasonSigned.map((v) => Math.max(0, v)),
    ...sparsityVals,
    1,
  );
  const negMin = Math.min(
    0,
    ...seasonSigned.map((v) => Math.min(0, v)),
  );

  // Symmetric-ish range: keep zero visible, favor positive side
  const rangeMax = posMax * 1.15;
  const rangeMin = negMin * 1.2;
  const totalRange = rangeMax - rangeMin;

  const bandW = (W - PAD_L - PAD_R) / points.length;
  const barW = Math.max(10, bandW * 0.5);

  const colors = {
    trend: '#F4845F',
    season: 'rgba(255,255,255,0.85)',
    sparsityFix: 'rgba(244,132,95,0.45)',
    promo: '#F4845F',
    zero: 'rgba(255,255,255,0.25)',
  };

  const y = (v: number) => PAD_T + (1 - (v - rangeMin) / totalRange) * chartH;
  const yZero = y(0);

  const xAt = (i: number) => PAD_L + bandW * i + bandW / 2;

  const trendPath = trendDisplay
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${y(v)}`)
    .join(' ');
  const seasonPath = seasonSigned
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${y(v)}`)
    .join(' ');

  // Y-axis ticks including 0
  const yTicks = [rangeMax, rangeMax * 0.5, 0, rangeMin * 0.5, rangeMin].filter(
    (t, i, arr) => arr.indexOf(t) === i && t >= rangeMin && t <= rangeMax,
  );

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/10 p-[1.4vmin]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ maxHeight: 240 }}>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              stroke={t === 0 ? colors.zero : 'rgba(255,255,255,0.06)'}
              strokeDasharray={t === 0 ? undefined : '2 3'}
              strokeWidth={t === 0 ? 1 : 1}
            />
            <text x={PAD_L - 6} y={y(t) + 3} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.45)">
              {t === 0 ? '0' : `${t > 0 ? '+' : ''}${Math.abs(t) >= 1000 ? `${(t / 1000).toFixed(0)}k` : t.toFixed(0)}`}
            </text>
          </g>
        ))}

        {/* Sparsity bars — always above zero line */}
        {points.map((p, i) => {
          const sp = Math.max(0, p.sparsityFix ?? 0);
          const barTop = y(sp);
          const barH = yZero - barTop;
          const cx = xAt(i);
          const selected = selectedKey === p.key;
          return (
            <rect
              key={`bar-${p.key}`}
              x={cx - barW / 2}
              y={barTop}
              width={barW}
              height={Math.max(0, barH)}
              fill={colors.sparsityFix}
              rx={2}
              style={{
                opacity: selectedKey && !selected ? 0.35 : 1,
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Zero baseline redraw over bars */}
        <line x1={PAD_L} x2={W - PAD_R} y1={yZero} y2={yZero} stroke={colors.zero} strokeWidth={1} />

        {/* Trend line */}
        <path d={trendPath} fill="none" stroke={colors.trend} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'drop-shadow(0 1px 3px rgba(244,132,95,0.35))' }} />
        {/* Season line (signed) with monthly markers to emphasize specific peaks/valleys */}
        <path d={seasonPath} fill="none" stroke={colors.season} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
        {seasonSigned.map((v, i) => (
          <circle
            key={`season-mk-${i}`}
            cx={xAt(i)}
            cy={y(v)}
            r={2.4}
            fill={colors.season}
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* Promo markers */}
        {points.map((p, i) => {
          if (!p.hasPromo) return null;
          const cx = xAt(i);
          const cy = y(trendDisplay[i]) - 10;
          return (
            <g key={`promo-${p.key}`} style={{ pointerEvents: 'none' }}>
              <circle cx={cx} cy={cy} r={5} fill={colors.promo} stroke="#0B1224" strokeWidth={1.4} />
              <circle cx={cx} cy={cy} r={2.2} fill="#fff" />
            </g>
          );
        })}

        {/* Month labels + selected highlight + hitbox (large touch target) */}
        {points.map((p, i) => {
          const cx = xAt(i);
          const selected = selectedKey === p.key;
          return (
            <g key={`hit-${p.key}`} className="cursor-pointer" onClick={() => onSelect(p.key)}>
              {selected && (
                <rect
                  x={cx - bandW / 2 + 2}
                  y={PAD_T}
                  width={bandW - 4}
                  height={chartH}
                  fill="rgba(244,132,95,0.10)"
                  stroke="#F4845F"
                  strokeWidth={1.6}
                  rx={4}
                />
              )}
              {/* Full-band invisible hitbox for touch */}
              <rect
                x={cx - bandW / 2}
                y={PAD_T}
                width={bandW}
                height={chartH + PAD_B - 6}
                fill="transparent"
              />
              <text
                x={cx}
                y={H - 10}
                textAnchor="middle"
                fontSize={selected ? 10.5 : 9}
                fill={selected ? '#F4845F' : 'rgba(255,255,255,0.6)'}
                fontWeight={selected ? 'bold' : 'normal'}
                style={{ pointerEvents: 'none' }}
              >
                {(lang === 'pt' ? p.labelPt : p.labelEn).split('/')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-[1.4vmin] mt-[0.8vmin] text-[1.2vmin] text-white/75">
        <LegendDot color={colors.trend} label={L.result.trend} />
        <LegendDot color={colors.season} dashed label={L.result.season} />
        <LegendDot square color={colors.sparsityFix} label={L.result.sparsityFix} />
        <span className="inline-flex items-center gap-[0.5vmin]">
          <span className="inline-block w-[1.4vmin] h-[1.4vmin] rounded-full" style={{ background: colors.promo, border: '1.5px solid #0B1224', boxShadow: '0 0 0 1px rgba(255,255,255,0.15)' }} />
          <span>{L.result.promo}</span>
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// Breakdown card
// ============================================================================

const BreakdownCard = ({
  point, sku, L, lang, onClose,
}: {
  point: MonthPoint;
  sku: SkuDef;
  L: typeof demoLabels['pt'];
  lang: KioskLang;
  onClose: () => void;
}) => {
  const parts = [
    { label: L.result.trend, value: point.trend ?? 0 },
    { label: L.result.season, value: point.season ?? 0 },
    { label: L.result.sparsityFix, value: point.sparsityFix ?? 0 },
  ];
  const positive = parts.reduce((s, p) => s + Math.max(0, p.value), 0);
  const promoText = point.hasPromo ? (lang === 'pt' ? sku.promoNotePt : sku.promoNoteEn) : null;

  return (
    <div className="rounded-xl border border-[#F4845F]/50 bg-[#F4845F]/[0.08] p-[1.4vmin] animate-fade-in">
      <div className="flex items-center justify-between mb-[0.8vmin]">
        <span className="text-[1.5vmin] font-bold text-white">
          {lang === 'pt' ? point.labelPt : point.labelEn}
          <span className="text-white/60 font-normal ml-[0.6vmin]">
            · {L.result.totalMonth}: {fmtNum(point.i6Fcst ?? 0, lang)}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[1.2vmin] text-white/60 hover:text-white uppercase tracking-wider"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-3 gap-[0.6vmin]">
        {parts.map((p) => {
          const pct = positive > 0 ? (Math.max(0, p.value) / positive) * 100 : 0;
          return (
            <div key={p.label} className="rounded-lg bg-white/[0.03] border border-white/10 p-[0.8vmin]">
              <span className="block text-[0.95vmin] tracking-[0.15em] uppercase text-[#F4845F]/80 font-semibold mb-[0.2vmin] leading-tight">
                {p.label}
              </span>
              <span className="block text-[1.5vmin] font-bold text-white leading-none">
                {p.value >= 0 ? '+' : ''}
                {fmtNum(p.value, lang)}
              </span>
              <span className="block text-[1vmin] text-white/50 mt-[0.2vmin]">
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
      {promoText && (
        <div className="mt-[0.8vmin] rounded-lg bg-[#F4845F]/[0.15] border border-[#F4845F]/50 p-[0.9vmin]">
          <span className="block text-[0.95vmin] tracking-[0.18em] uppercase text-[#F4845F] font-bold mb-[0.3vmin]">
            ★ {L.result.promoNote}
          </span>
          <span className="block text-[1.25vmin] text-white/90 leading-snug">{promoText}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Small UI atoms
// ============================================================================

const MiniKpi = ({
  label, value, warn, highlight,
}: { label: string; value: string; warn?: boolean; highlight?: boolean }) => (
  <div
    className={`rounded-lg p-[1vmin] border ${
      highlight
        ? 'bg-[#F4845F]/10 border-[#F4845F]/50'
        : warn
        ? 'bg-white/[0.03] border-white/15'
        : 'bg-white/[0.03] border-white/10'
    }`}
  >
    <span className="block text-[1.05vmin] tracking-[0.18em] uppercase font-semibold text-[#F4845F] mb-[0.2vmin] leading-tight">
      {label}
    </span>
    <span
      className={`block text-[2vmin] font-bold leading-none ${
        warn ? 'text-white/90' : 'text-[#F4845F]'
      }`}
    >
      {value}
    </span>
  </div>
);

const KpiCompare = ({
  label, oldValue, newValue, higherIsBetter, L,
}: {
  label: string;
  oldValue: number;
  newValue: number;
  higherIsBetter?: boolean;
  L: typeof demoLabels['pt'];
}) => {
  const delta = higherIsBetter
    ? ((newValue - oldValue) / Math.max(0.01, oldValue)) * 100
    : ((oldValue - newValue) / Math.max(0.01, oldValue)) * 100;
  const improved = delta > 0;
  return (
    <div className="rounded-lg p-[1vmin] border bg-white/[0.03] border-[#F4845F]/30">
      <span className="block text-[1.05vmin] tracking-[0.18em] uppercase font-semibold text-[#F4845F] mb-[0.3vmin] leading-tight">
        {label}
      </span>
      <div className="flex items-baseline gap-[0.5vmin]">
        <span className="text-[1.35vmin] text-white/40 line-through leading-none">
          {oldValue.toFixed(1)}%
        </span>
        <span className="text-[1.9vmin] font-bold text-[#F4845F] leading-none">
          {newValue.toFixed(1)}%
        </span>
      </div>
      <span
        className={`block text-[1.05vmin] font-bold mt-[0.3vmin] ${
          improved ? 'text-emerald-400' : 'text-red-400'
        }`}
      >
        {L.compare.delta} {improved ? (higherIsBetter ? '+' : '−') : higherIsBetter ? '−' : '+'}
        {Math.abs(delta).toFixed(0)}%
      </span>
    </div>
  );
};

const MetricPill = ({
  label, value, hint,
}: { label: string; value: string; hint?: string }) => (
  <div className="rounded-lg p-[1vmin] border bg-white/[0.03] border-white/10">
    <span className="block text-[1.1vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F] mb-[0.2vmin]">
      {label}
    </span>
    <span className="block text-[1.9vmin] font-bold text-[#F4845F] leading-none">{value}</span>
    {hint && <span className="block mt-[0.4vmin] text-[1vmin] text-white/50 leading-none">{hint}</span>}
  </div>
);

export default DemandForecastDemo;
