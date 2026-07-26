import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

  const latencyMs = useMemo(() => {
    if (phase === 'planning') return '0.00';
    return (28 + Math.random() * 34).toFixed(2);
  }, [phase, sku.id]);

  // Reset when filters change
  useEffect(() => {
    setPhase('planning');
    setProgress(0);
    setSelectedMonth(null);
  }, [skuId, channel, region, horizon]);

  // Pipeline animation
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

  const containerRef = useRef<HTMLDivElement>(null);
  const mainChartRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  useLayoutEffect(() => {
    if (phase !== 'result') {
      setLine(null);
      return;
    }
    const measure = () => {
      const c = containerRef.current;
      const m = mainChartRef.current;
      const i = insightRef.current;
      if (!c || !m || !i) return;
      const cr = c.getBoundingClientRect();
      const mr = m.getBoundingClientRect();
      const ir = i.getBoundingClientRect();
      setLine({
        x1: mr.right - cr.left,
        y1: mr.top + mr.height / 2 - cr.top,
        x2: ir.left - cr.left,
        y2: ir.top + ir.height / 2 - cr.top,
      });
    };
    const t = setTimeout(measure, 700);
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (mainChartRef.current) ro.observe(mainChartRef.current);
    if (insightRef.current) ro.observe(insightRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [phase, sku.id]);

  const reset = () => {
    setPhase('planning');
    setProgress(0);
    setSelectedMonth(null);
  };

  const forecastPoints = series.filter((p) => p.i6Fcst !== null || p.currentFcst !== null);
  const clickedPoint = selectedMonth ? forecastPoints.find((p) => p.key === selectedMonth) ?? null : null;

  const kpiStrip = phase === 'planning' ? (
    <div className="grid grid-cols-4 gap-[1vmin] mt-[1.5vmin]">
      <MiniKpi label={L.kpi.accuracy} value={`${sku.historicalAccuracyPct.toFixed(1)}%`} />
      <MiniKpi label={L.kpi.meanError} value={`${sku.meanErrorPct.toFixed(1)}%`} />
      <MiniKpi label={L.kpi.stockout} value={`${sku.stockoutPct.toFixed(1)}%`} warn />
      <MiniKpi label={L.kpi.excess} value={`${sku.excessPct.toFixed(1)}%`} warn />
    </div>
  ) : null;

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]"
    >
      <div className="grid grid-cols-2 gap-[3vmin] items-stretch">
        {/* LEFT — dashboard / result */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
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

          <div className="p-[2.2vmin] flex-1 flex flex-col gap-[1.5vmin]">
            {/* Filters */}
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

            {/* Main chart */}
            <div ref={mainChartRef}>
              <MainChart
                series={series}
                phase={phase}
                lang={lang}
                horizon={horizon}
              />
            </div>

            {/* KPI strip (planning) or result KPIs / composition */}
            {phase === 'planning' && (
              <>
                {kpiStrip}
                <button
                  type="button"
                  onClick={() => setPhase('running')}
                  className="mt-auto self-stretch min-h-[7vmin] rounded-2xl bg-[#F4845F] text-white font-bold text-[2vmin] tracking-wide hover:bg-[#F4845F]/90 active:scale-[0.99] transition-all shadow-[0_0_28px_rgba(244,132,95,0.35)]"
                >
                  {L.cta}
                </button>
              </>
            )}

            {phase === 'running' && (
              <div className="mt-auto rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">{L.running}</span>
              </div>
            )}

            {phase === 'result' && (
              <>
                {!clickedPoint ? (
                  <div className="grid grid-cols-4 gap-[1vmin]">
                    <MiniKpi label={L.result.currentError} value={`${sku.currentErrorPct.toFixed(1)}%`} warn />
                    <MiniKpi label={L.result.i6Error} value={`${sku.i6ErrorPct.toFixed(1)}%`} highlight />
                    <MiniKpi label={L.result.projectedAcc} value={`${(100 - sku.i6ErrorPct).toFixed(1)}%`} highlight />
                    <MiniKpi label={L.result.horizon} value={`${horizon}m`} />
                  </div>
                ) : (
                  <BreakdownCard point={clickedPoint} L={L} lang={lang} onClose={() => setSelectedMonth(null)} />
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

        {/* RIGHT — reasoning + insight */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin] flex flex-col h-full">
          <div className="flex items-center gap-[1.2vmin] mb-[1.2vmin]">
            <span className="w-[4.2vmin] h-[4.2vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />
            </span>
            <div className="flex-1">
              <h4 className="text-[2vmin] font-bold text-white leading-tight">{L.reasoningTitle}</h4>
              <p className="text-[1.4vmin] text-white/60">{L.reasoningSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-[0.9vmin]">
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
                <div
                  key={i}
                  className={`rounded-xl border p-[1.1vmin] transition-all ${
                    state === 'active'
                      ? 'border-[#F4845F] bg-[#F4845F]/10'
                      : state === 'done'
                      ? 'border-white/20 bg-white/[0.04]'
                      : 'border-white/10 bg-white/[0.02] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-[1.2vmin] mb-[0.4vmin]">
                    <span
                      className={`flex-shrink-0 w-[2.2vmin] h-[2.2vmin] rounded-full flex items-center justify-center text-[1.2vmin] font-bold border-2 ${
                        state === 'done'
                          ? 'bg-[#F4845F] border-[#F4845F] text-white'
                          : state === 'active'
                          ? 'border-[#F4845F] text-[#F4845F]'
                          : 'border-white/30 text-white/50'
                      }`}
                    >
                      {state === 'done' ? <Check className="w-[1.3vmin] h-[1.3vmin]" /> : i + 1}
                    </span>
                    <span className="text-[1.55vmin] leading-tight text-white/90 font-semibold">
                      {lang === 'pt' ? step.labelPt : step.labelEn}
                    </span>
                  </div>
                  <div className="pl-[3.4vmin]">
                    <p className="text-[1.2vmin] text-white/60 font-mono mb-[0.4vmin]">
                      {lang === 'pt' ? step.microPt : step.microEn}
                    </p>
                    {state === 'active' && (
                      <div className="h-[0.35vmin] rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-[#F4845F] animate-[kiosk-progress_var(--dur)_linear_forwards]"
                          style={{ ['--dur' as string]: `${step.durationMs}ms` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {phase === 'result' && (
            <div className="mt-[1.4vmin] flex flex-col gap-[1vmin]">
              <div className="grid grid-cols-2 gap-[0.8vmin]">
                <MetricPill label={L.result.i6Error} value={`${sku.i6ErrorPct.toFixed(1)}%`} />
                <MetricPill label={L.latency} value={`${latencyMs} ms`} hint={L.latencyHint} />
              </div>

              <div
                ref={insightRef}
                className="kiosk-insight-card relative rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[1.6vmin] pr-[9vmin] text-[1.5vmin] text-white/95 leading-relaxed"
              >
                <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.1vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.4vmin] h-[1.4vmin] kiosk-insight-sparkle" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.3vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                  {L.rationaleLabel}
                </span>
                {lang === 'pt' ? sku.argumentPt : sku.argumentEn}
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-[0.4vmin] min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.6vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
              >
                {L.reset}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Connector */}
      {line && (
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="kiosk-forecast-connector" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F4845F" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4845F" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
            fill="none"
            stroke="url(#kiosk-forecast-connector)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            style={{ filter: 'drop-shadow(0 0 6px rgba(244,132,95,0.7))' }}
            className="kiosk-connector-path"
          />
          <circle cx={line.x1} cy={line.y1} r={4} fill="#F4845F" className="kiosk-connector-dot" />
          <circle cx={line.x2} cy={line.y2} r={4} fill="#F4845F" className="kiosk-connector-dot" />
        </svg>
      )}

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
        @keyframes kiosk-connector-flow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        @keyframes kiosk-connector-in { from { opacity: 0; } to { opacity: 1; } }
        .kiosk-connector-path { animation: kiosk-connector-in .5s ease-out both, kiosk-connector-flow 1.2s linear infinite; }
        .kiosk-connector-dot { animation: kiosk-connector-in .5s ease-out both; filter: drop-shadow(0 0 6px rgba(244,132,95,0.9)); }
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
    <div className="flex flex-wrap gap-[0.8vmin]">
      <ChipSelect
        label={L.filters.sku}
        value={skus.find((s) => s.id === sku.id) ? (lang === 'pt' ? sku.namePt : sku.nameEn) : ''}
        options={skus.map((s) => ({ id: s.id, label: lang === 'pt' ? s.namePt : s.nameEn }))}
        selectedId={sku.id}
        onSelect={onSku}
        disabled={disabled}
      />
      <ChipSelect
        label={L.filters.channel}
        value={L.channelOptions[channel]}
        options={(['total', 'digital', 'physical'] as Channel[]).map((c) => ({ id: c, label: L.channelOptions[c] }))}
        selectedId={channel}
        onSelect={(v) => onChannel(v as Channel)}
        disabled={disabled}
      />
      <ChipSelect
        label={L.filters.region}
        value={L.regionOptions[region]}
        options={(['total', 'sudeste', 'sul', 'nordeste'] as Region[]).map((r) => ({ id: r, label: L.regionOptions[r] }))}
        selectedId={region}
        onSelect={(v) => onRegion(v as Region)}
        disabled={disabled}
      />
      <div className="inline-flex items-center gap-[0.6vmin] rounded-full border border-white/15 bg-white/[0.02] px-[1.2vmin] py-[0.6vmin] opacity-70">
        <span className="text-[1.1vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F]/80">
          {L.filters.store}
        </span>
        <span className="text-[1.35vmin] text-white/80 font-semibold">{L.filters.allStores}</span>
      </div>
      <ChipSelect
        label={L.filters.horizon}
        value={L.horizonOptions[horizon]}
        options={([6, 12] as Horizon[]).map((h) => ({ id: String(h), label: L.horizonOptions[h] }))}
        selectedId={String(horizon)}
        onSelect={(v) => onHorizon(Number(v) as Horizon)}
        disabled={disabled}
      />
    </div>
  );
};

const ChipSelect = ({
  label, value, options, selectedId, onSelect, disabled,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-[0.6vmin] rounded-full border px-[1.2vmin] py-[0.6vmin] transition ${
          open
            ? 'border-[#F4845F] bg-[#F4845F]/10'
            : 'border-white/15 bg-white/[0.03] hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="text-[1.1vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F]">
          {label}
        </span>
        <span className="text-[1.35vmin] text-white font-semibold">{value}</span>
        <span className="text-[1.1vmin] text-white/60">▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-[0.6vmin] left-0 min-w-[24vmin] rounded-xl border border-white/15 bg-[#0B1224] shadow-2xl overflow-hidden">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                onSelect(o.id);
                setOpen(false);
              }}
              className={`block w-full text-left px-[1.4vmin] py-[1vmin] text-[1.4vmin] transition ${
                o.id === selectedId
                  ? 'bg-[#F4845F]/15 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/[0.06]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Main chart — history + current fcst + i6 fcst + CI band
// ============================================================================

const MainChart = ({
  series, phase, lang, horizon,
}: {
  series: MonthPoint[];
  phase: Phase;
  lang: KioskLang;
  horizon: Horizon;
}) => {
  const W = 520;
  const H = 180;
  const PAD_L = 32;
  const PAD_R = 8;
  const PAD_T = 12;
  const PAD_B = 24;

  const all: number[] = [];
  series.forEach((p) => {
    if (p.history !== null) all.push(p.history);
    if (p.currentFcst !== null) all.push(p.currentFcst);
    if (phase === 'result' && p.i6Fcst !== null) all.push(p.i6Fcst);
    if (phase === 'result' && p.ciHigh !== null) all.push(p.ciHigh);
  });
  const maxY = Math.max(...all) * 1.08;
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

  // CI band as polygon
  let ciPath = '';
  if (phase === 'result') {
    const top: string[] = [];
    const bot: string[] = [];
    series.forEach((p, i) => {
      if (p.ciHigh !== null && p.ciLow !== null) {
        top.push(`${x(i)},${y(p.ciHigh)}`);
        bot.push(`${x(i)},${y(p.ciLow)}`);
      }
    });
    if (top.length) {
      ciPath = `M ${top.join(' L ')} L ${bot.reverse().join(' L ')} Z`;
    }
  }

  // Y ticks (3)
  const ticks = [0, 0.5, 1].map((t) => minY + (maxY - minY) * t);

  // X labels — every 3 months
  const xLabels = series
    .map((p, i) => ({ i, label: lang === 'pt' ? p.labelPt : p.labelEn }))
    .filter((_, i) => i % 3 === 0);

  const historyEndIdx = series.findIndex((p) => p.i6Fcst !== null || p.currentFcst !== null);

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/10 p-[1.2vmin]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ maxHeight: 220 }}>
        {/* grid */}
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
        {/* history / forecast divider */}
        {historyEndIdx > 0 && (
          <line
            x1={x(historyEndIdx - 0.5)}
            x2={x(historyEndIdx - 0.5)}
            y1={PAD_T}
            y2={H - PAD_B}
            stroke="rgba(244,132,95,0.35)"
            strokeDasharray="3 3"
          />
        )}
        {/* CI band */}
        {ciPath && <path d={ciPath} fill="rgba(244,132,95,0.16)" stroke="none" />}
        {/* history line */}
        <path d={historyPath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" />
        {/* current fcst */}
        <path d={currentPath} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeDasharray="4 3" />
        {/* i6 fcst */}
        {i6Path && <path d={i6Path} fill="none" stroke="#F4845F" strokeWidth="2" />}
        {/* x labels */}
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
      {/* legend */}
      <div className="flex flex-wrap gap-[1.4vmin] mt-[0.8vmin] text-[1.15vmin] text-white/70">
        <LegendDot color="rgba(255,255,255,0.85)" label={demoLabels[lang].legend.history} />
        <LegendDot color="rgba(255,255,255,0.5)" dashed label={demoLabels[lang].legend.currentFcst} />
        {phase === 'result' && <LegendDot color="#F4845F" label={demoLabels[lang].legend.i6Fcst} />}
        {phase === 'result' && <LegendDot color="rgba(244,132,95,0.35)" square label={demoLabels[lang].legend.ci} />}
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
// Composition chart — stacked bars (trend/season/promo/sparsity/accel)
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
  const W = 520;
  const H = 120;
  const PAD_L = 32;
  const PAD_R = 8;
  const PAD_T = 8;
  const PAD_B = 20;

  const totals = points.map((p) => (p.trend ?? 0) + Math.max(0, p.season ?? 0) + (p.promo ?? 0) + (p.sparsityFix ?? 0) + (p.accel ?? 0));
  const maxY = Math.max(...totals) * 1.08;

  const bandW = (W - PAD_L - PAD_R) / points.length;
  const barW = Math.max(6, bandW * 0.62);

  const colors = {
    trend: '#F4845F',
    season: 'rgba(244,132,95,0.65)',
    promo: 'rgba(255,255,255,0.55)',
    sparsityFix: 'rgba(255,255,255,0.32)',
    accel: 'rgba(244,132,95,0.35)',
  };
  const y = (v: number) => PAD_T + (1 - v / maxY) * (H - PAD_T - PAD_B);
  const yBar = (v: number) => (v / maxY) * (H - PAD_T - PAD_B);

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/10 p-[1.2vmin]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" style={{ maxHeight: 150 }}>
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={PAD_L}
            x2={W - PAD_R}
            y1={y(maxY * t)}
            y2={y(maxY * t)}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 3"
          />
        ))}
        {points.map((p, i) => {
          const cx = PAD_L + bandW * i + bandW / 2;
          const trend = Math.max(0, p.trend ?? 0);
          const season = Math.max(0, p.season ?? 0);
          const promo = Math.max(0, p.promo ?? 0);
          const sparsity = Math.max(0, p.sparsityFix ?? 0);
          const accel = Math.max(0, p.accel ?? 0);
          let cursor = H - PAD_B;
          const push = (v: number, color: string, key: string) => {
            const h = yBar(v);
            const el = (
              <rect
                key={key}
                x={cx - barW / 2}
                y={cursor - h}
                width={barW}
                height={h}
                fill={color}
              />
            );
            cursor -= h;
            return el;
          };
          const selected = selectedKey === p.key;
          return (
            <g
              key={p.key}
              className="cursor-pointer"
              onClick={() => onSelect(p.key)}
              style={{ opacity: selectedKey && !selected ? 0.4 : 1 }}
            >
              {push(trend, colors.trend, 'trend')}
              {push(season, colors.season, 'season')}
              {push(promo, colors.promo, 'promo')}
              {push(sparsity, colors.sparsityFix, 'sparsity')}
              {push(accel, colors.accel, 'accel')}
              {selected && (
                <rect
                  x={cx - barW / 2 - 2}
                  y={PAD_T}
                  width={barW + 4}
                  height={H - PAD_T - PAD_B}
                  fill="none"
                  stroke="#F4845F"
                  strokeWidth={1.5}
                />
              )}
              <text
                x={cx}
                y={H - 6}
                textAnchor="middle"
                fontSize="7"
                fill={selected ? '#F4845F' : 'rgba(255,255,255,0.5)'}
                fontWeight={selected ? 'bold' : 'normal'}
              >
                {(lang === 'pt' ? p.labelPt : p.labelEn).split('/')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-[1.2vmin] mt-[0.6vmin] text-[1.1vmin] text-white/70">
        <LegendDot square color={colors.trend} label={L.result.trend} />
        <LegendDot square color={colors.season} label={L.result.season} />
        <LegendDot square color={colors.promo} label={L.result.promo} />
        <LegendDot square color={colors.sparsityFix} label={L.result.sparsityFix} />
        <LegendDot square color={colors.accel} label={L.result.accel} />
      </div>
    </div>
  );
};

// ============================================================================
// Breakdown card (when a month is clicked)
// ============================================================================

const BreakdownCard = ({
  point, L, lang, onClose,
}: {
  point: MonthPoint;
  L: typeof demoLabels['pt'];
  lang: KioskLang;
  onClose: () => void;
}) => {
  const parts = [
    { label: L.result.trend, value: point.trend ?? 0 },
    { label: L.result.season, value: point.season ?? 0 },
    { label: L.result.promo, value: point.promo ?? 0 },
    { label: L.result.sparsityFix, value: point.sparsityFix ?? 0 },
    { label: L.result.accel, value: point.accel ?? 0 },
  ];
  const positive = parts.reduce((s, p) => s + Math.max(0, p.value), 0);
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
      <div className="grid grid-cols-5 gap-[0.6vmin]">
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
