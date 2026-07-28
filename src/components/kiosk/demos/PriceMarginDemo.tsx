import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import TouchSelect from '../ui/TouchSelect';
import {
  actionLabel,
  filterOptions,
  fmtBRL,
  generalInsightFor,
  pipeline,
  skus,
  type AlternativeScenario,
  type PriceMarginSku,
} from '@/data/kiosk/demos/priceMargin';

type Phase = 'setup' | 'running' | 'result';

interface Derived {
  optimalPrice: number;
  rangeMin: number;
  rangeMax: number;
  confidencePct: number;
  marginImpactPp: number;
  volumeImpactPct: number;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

const DASH = '—';
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const round2 = (v: number) => Math.round(v * 100) / 100;
const round1 = (v: number) => Math.round(v * 10) / 10;

const computeOutcome = (
  s: PriceMarginSku,
  strategy: string,
  minMargin: string,
  competitiveBand: string,
): Derived => {
  const strat =
    strategy === 'margin'
      ? { price: 1.012, margin: 1.1, volume: -1.2, conf: -3 }
      : strategy === 'defense'
      ? { price: 0.988, margin: -0.9, volume: 1.4, conf: 2 }
      : { price: 1, margin: 0, volume: 0, conf: 0 };

  const band =
    competitiveBand === 'strict'
      ? { spread: 0.55, ceilingMult: 1.0 }
      : competitiveBand === 'wide'
      ? { spread: 1.4, ceilingMult: 1.06 }
      : { spread: 1, ceilingMult: 1.03 };

  const mm = parseInt(minMargin, 10);
  const floor =
    mm >= 45 ? { price: 1.012, margin: 1.0, volume: -0.7, conf: -6 }
    : mm >= 40 ? { price: 1.006, margin: 0.5, volume: -0.3, conf: -3 }
    : mm >= 35 ? { price: 1, margin: 0, volume: 0, conf: 0 }
    : { price: 0.998, margin: -0.2, volume: 0.2, conf: 1 };

  const rawOptimal = s.optimalPrice * strat.price * floor.price;
  const ceiling = s.competitorPrice * band.ceilingMult;
  const optimalPrice = Math.min(rawOptimal, ceiling);

  const halfSpread = ((s.rangeMax - s.rangeMin) / 2) * band.spread;
  const rangeMin = optimalPrice - halfSpread;
  const rangeMax = Math.min(optimalPrice + halfSpread, ceiling + halfSpread * 0.3);

  return {
    optimalPrice: round2(optimalPrice),
    rangeMin: round2(rangeMin),
    rangeMax: round2(rangeMax),
    confidencePct: Math.round(clamp(s.confidencePct + strat.conf + floor.conf, 62, 97)),
    marginImpactPp: round1(s.marginImpactPp + strat.margin + floor.margin),
    volumeImpactPct: round1(s.volumeImpactPct + strat.volume + floor.volume),
    alternatives: s.alternatives,
  };
};

const competitivePositionLabel: Record<PriceMarginSku['competitivePosition'], string> = {
  below: 'Abaixo',
  inline: 'Alinhado',
  above: 'Acima',
};

const actionToneClass: Record<PriceMarginSku['action'], string> = {
  aumentar: 'text-[#4ade80]',
  manter: 'text-white/85',
  reduzir: 'text-[#F4845F]',
};

const PriceMarginDemo = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [category, setCategory] = useState('all');
  const [channel, setChannel] = useState('all');
  const [strategy, setStrategy] = useState('balanced');
  const [minMargin, setMinMargin] = useState('35');
  const [competitiveBand, setCompetitiveBand] = useState('medium');

  const filtered = useMemo(
    () =>
      skus.filter((s) => {
        if (category !== 'all' && s.categoryId !== category) return false;
        if (channel !== 'all' && s.channelId !== channel) return false;
        return true;
      }),
    [category, channel],
  );

  const selected = useMemo(
    () => filtered.find((s) => s.id === selectedId) ?? null,
    [filtered, selectedId],
  );

  const derived = useMemo(
    () => (selected ? computeOutcome(selected, strategy, minMargin, competitiveBand) : null),
    [selected, strategy, minMargin, competitiveBand],
  );

  const generalInsight = useMemo(() => generalInsightFor(filtered), [filtered]);

  useEffect(() => {
    if (selectedId && !filtered.find((s) => s.id === selectedId)) setSelectedId(null);
  }, [filtered, selectedId]);

  useEffect(() => {
    if (phase !== 'running') return;
    setProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    pipeline.forEach((step, i) => {
      elapsed += step.durationMs;
      timers.push(setTimeout(() => setProgress(i + 1), elapsed));
    });
    timers.push(
      setTimeout(() => {
        setSelectedId((prev) => prev ?? filtered[0]?.id ?? null);
        setPhase('result');
      }, elapsed + 260),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, filtered]);

  const reset = () => {
    setPhase('setup');
    setProgress(0);
  };

  const showResult = phase === 'result';
  const canCalculate = filtered.length > 0;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP — dashboard / result */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10 gap-[1vmin]">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {showResult ? 'Preço ótimo e cenários alternativos' : 'Portfólio de precificação'}
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                {showResult
                  ? 'Faixa recomendada, impacto em margem e volume por SKU.'
                  : 'Selecione os filtros e ajuste restrições para simular a faixa ótima de preço por SKU.'}
              </p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] text-right">
              Objetivo: Margem
            </span>
          </div>

          <div className="p-[2.2vmin] flex flex-col gap-[1.4vmin]">
            {/* Filters */}
            <div className="grid grid-cols-2 gap-[1vmin]">
              <TouchSelect label="Categoria" value={category} onChange={setCategory} options={filterOptions.category} />
              <TouchSelect label="Canal" value={channel} onChange={setChannel} options={filterOptions.channel} />
            </div>
            <div className="grid grid-cols-[1.5fr_0.7fr_1fr] gap-[1vmin]">
              <TouchSelect label="Estratégia" value={strategy} onChange={setStrategy} options={filterOptions.strategy} />
              <TouchSelect label="Margem mínima" value={minMargin} onChange={setMinMargin} options={filterOptions.minMargin} />
              <TouchSelect label="Banda competitiva" value={competitiveBand} onChange={setCompetitiveBand} options={filterOptions.competitiveBand} />
            </div>

            {/* Portfolio table — 3 lines, headers in 2 lines */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.8fr_0.9fr_0.9fr_1fr] px-[1.4vmin] py-[0.7vmin] bg-white/[0.05] text-[0.95vmin] uppercase tracking-[0.16em] font-semibold text-white/60 leading-tight">
                <span>SKU</span>
                <span className="text-right">Ação<br/>sugerida</span>
                <span className="text-right">Preço<br/>atual</span>
                <span className="text-right">Elast.</span>
                <span className="text-right">Posição<br/>concorr.</span>
                <span className="text-right">Cobertura<br/>estoque</span>
                <span className="text-right">Preço<br/>concorrente</span>
              </div>
              {filtered.length === 0 && (
                <div className="px-[1.4vmin] py-[1.6vmin] text-[1.4vmin] text-white/50">
                  Nenhum SKU nesta seleção de filtros.
                </div>
              )}
              {filtered.map((s) => {
                const active = s.id === selectedId && showResult;
                const rowDisabled = !showResult;
                return (
                  <button
                    type="button"
                    key={s.id}
                    disabled={rowDisabled}
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full grid grid-cols-[1.6fr_0.9fr_0.9fr_0.8fr_0.9fr_0.9fr_1fr] items-center px-[1.4vmin] py-[1vmin] text-[1.35vmin] border-t border-white/10 text-left transition ${
                      active
                        ? 'bg-[#F4845F]/10'
                        : rowDisabled
                        ? 'cursor-default'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-white/90 font-semibold leading-tight">
                      {s.name}
                      <span className="block text-[1.05vmin] font-normal text-white/50">{s.category}</span>
                    </span>
                    <span className={`text-right font-semibold ${showResult ? actionToneClass[s.action] : 'text-white/40'}`}>
                      {showResult ? actionLabel[s.action] : '—'}
                    </span>
                    <span className="text-right text-white/85 font-mono">{fmtBRL(s.currentPrice)}</span>
                    <span className="text-right text-white/85 font-mono">{s.elasticity.toFixed(2)}</span>
                    <span className="text-right text-white/85">{competitivePositionLabel[s.competitivePosition]}</span>
                    <span className="text-right text-white/70 font-mono">{s.stockCoverDays} d</span>
                    <span className="text-right text-white/70 font-mono">{fmtBRL(s.competitorPrice)}</span>
                  </button>
                );
              })}
            </div>

            {/* Result panel */}
            {showResult && selected && derived && (
              <>
                <div className="grid grid-cols-[1fr_1.4fr] gap-[1.2vmin]">
                  {/* Left: KPIs */}
                  <div className="flex flex-col gap-[1vmin] h-full">
                    <ConclusionCard label="Preço ótimo" value={fmtBRL(derived.optimalPrice)} highlight />
                    <ConclusionCard
                      label="Faixa recomendada"
                      value={`${fmtBRL(derived.rangeMin)} – ${fmtBRL(derived.rangeMax)}`}
                    />
                    <ConclusionCard label="Confiança" value={`${derived.confidencePct}%`} />
                  </div>

                  {/* Right: curve */}
                  <PriceMarginCurve sku={selected} derived={derived} />
                </div>

                {/* Alternatives — 3 rows, headers in 2 lines, no coloured badges */}
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-[1fr_0.9fr_0.9fr_1.1fr] px-[1.4vmin] py-[0.7vmin] bg-white/[0.05] text-[0.95vmin] uppercase tracking-[0.16em] font-semibold text-white/60 leading-tight">
                    <span>Cenário</span>
                    <span className="text-right">Preço</span>
                    <span className="text-right">Margem</span>
                    <span className="text-right">Volume</span>
                  </div>
                  {derived.alternatives.map((a) => {
                    const isReco = a.id === 'recommended';
                    return (
                      <div
                        key={a.id}
                        className="grid grid-cols-[1fr_0.9fr_0.9fr_1.1fr] px-[1.4vmin] py-[1vmin] items-center text-[1.35vmin] border-t border-white/10"
                      >
                        <span className={`font-semibold ${isReco ? 'text-[#F4845F]' : 'text-white/85'}`}>
                          {a.label}
                        </span>
                        <span className="text-right text-white font-mono">{fmtBRL(a.price)}</span>
                        <span className={`text-right ${isReco ? 'text-[#F4845F]' : 'text-white/80'}`}>{a.margin}</span>
                        <span className="text-right text-white/75">{a.volume}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom KPIs */}
                <div className="grid grid-cols-3 gap-[1vmin]">
                  <ConclusionCard label="Impacto na margem" value={`${derived.marginImpactPp > 0 ? '+' : ''}${derived.marginImpactPp.toFixed(1)} pp`} highlight />
                  <ConclusionCard label="Impacto no volume" value={`${derived.volumeImpactPct > 0 ? '+' : ''}${derived.volumeImpactPct.toFixed(1)}%`} />
                  <ConclusionCard label="Confiança do modelo" value={`${derived.confidencePct}%`} />
                </div>
              </>
            )}

            {phase === 'setup' && (
              <button
                type="button"
                disabled={!canCalculate}
                onClick={() => setPhase('running')}
                className={`self-stretch min-h-[7vmin] rounded-2xl font-bold text-[2vmin] tracking-wide transition-all ${
                  canCalculate
                    ? 'bg-[#F4845F] text-white hover:bg-[#F4845F]/90 active:scale-[0.99] shadow-[0_0_28px_rgba(244,132,95,0.35)]'
                    : 'bg-white/[0.06] text-white/40 border border-white/10 cursor-not-allowed'
                }`}
              >
                {canCalculate ? 'Calcular faixa ótima de preço' : 'Ajuste os filtros para simular'}
              </button>
            )}

            {phase === 'running' && (
              <div className="rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">Calculando faixa ótima…</span>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM — POR QUE + horizontal timeline */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="flex items-center gap-[1.2vmin] mb-[1.4vmin]">
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">
                Explicabilidade e raciocínio do modelo
              </h4>
            </div>
          </div>

          {showResult && (
            <div className="kiosk-insight-card mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.8vmin]">
              <div className="flex items-center gap-[1vmin] mb-[0.8vmin]">
                <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F] kiosk-insight-sparkle" strokeWidth={2.5} />
                <span className="text-[1.7vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                  {selected ? 'Por que este preço' : 'O que o modelo aprendeu'}
                </span>
              </div>
              {selected ? (
                <>
                  <span className="block text-[1.7vmin] font-semibold text-white mb-[0.6vmin] leading-tight">
                    {selected.name}
                  </span>
                  <p className="text-[1.7vmin] leading-relaxed text-white/95">{selected.argument}</p>
                </>
              ) : (
                <p className="text-[1.85vmin] leading-relaxed text-white/95">{generalInsight}</p>
              )}
            </div>
          )}

          {/* Micro-metric of active step */}
          <div className="h-[2vmin] mb-[1vmin] flex items-center justify-center">
            {phase === 'running' && progress < pipeline.length && (
              <span className="text-[1.2vmin] text-white/60 font-mono">
                {pipeline[progress].micro}
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
                  phase === 'setup'
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
                      {step.label}
                    </span>
                    <span
                      className={`text-center text-[1.1vmin] leading-tight font-mono ${
                        state === 'idle' ? 'text-white/30' : 'text-white/55'
                      }`}
                    >
                      {step.micro}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {showResult && (
            <button
              type="button"
              onClick={reset}
              className="mt-[1.4vmin] w-full min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.6vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
            >
              Nova simulação
            </button>
          )}
        </div>
      </div>

      <style>{`
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
          animation: kiosk-insight-in .5s ease-out .3s both, kiosk-insight-glow 2.4s ease-in-out .3s infinite;
        }
        .kiosk-insight-sparkle { animation: kiosk-insight-sparkle 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// --- Subcomponents ---

const ConclusionCard = ({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl border p-[1.2vmin] flex flex-1 flex-col justify-center gap-[0.3vmin] ${
      highlight ? 'border-[#F4845F]/60 bg-[#F4845F]/[0.08]' : 'border-white/10 bg-white/[0.03]'
    }`}
  >
    <span className="text-[0.9vmin] tracking-[0.18em] uppercase font-semibold text-white/55 leading-tight">
      {label}
    </span>
    <span className={`text-[1.9vmin] font-bold leading-tight ${highlight ? 'text-[#F4845F]' : 'text-white'}`}>
      {value}
    </span>
    {hint && <span className="text-[1.05vmin] text-white/55">{hint}</span>}
  </div>
);

const PriceMarginCurve = ({ sku, derived }: { sku: PriceMarginSku; derived: Derived }) => {
  const W = 620;
  const H = 160;
  const PAD = { l: 34, r: 12, t: 18, b: 30 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;

  const pMin = Math.min(sku.currentPrice, derived.rangeMin) - 3;
  const pMax = Math.max(derived.rangeMax, sku.competitorPrice) + 3;

  const x = (p: number) => PAD.l + ((p - pMin) / (pMax - pMin)) * iw;

  const peakY = PAD.t + ih * 0.15;
  const baseY = PAD.t + ih * 0.9;
  const curveAt = (p: number) => {
    const spread = (pMax - pMin) / 2;
    const dist = Math.abs(p - derived.optimalPrice) / spread;
    return peakY + (baseY - peakY) * Math.min(1, dist * dist);
  };

  const samples = 60;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const p = pMin + ((pMax - pMin) * i) / samples;
    pts.push(`${x(p).toFixed(1)},${curveAt(p).toFixed(1)}`);
  }
  const pathTop = `M ${pts.join(' L ')}`;
  const pathFill = `${pathTop} L ${x(pMax)},${baseY} L ${x(pMin)},${baseY} Z`;

  const Marker = ({
    price, label, color, dashed,
  }: { price: number; label: string; color: string; dashed?: boolean }) => (
    <g>
      <line
        x1={x(price)} x2={x(price)}
        y1={PAD.t} y2={H - PAD.b}
        stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <text x={x(price)} y={PAD.t - 4} fontSize="10" fill={color} textAnchor="middle">
        {label}
      </text>
    </g>
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] h-full flex">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
        <rect
          x={x(derived.rangeMin)} y={PAD.t}
          width={x(derived.rangeMax) - x(derived.rangeMin)} height={ih}
          fill="rgba(244,132,95,0.12)"
        />
        <path d={pathFill} fill="rgba(244,132,95,0.18)" />
        <path d={pathTop} fill="none" stroke="#F4845F" strokeWidth={2} />

        <Marker price={sku.currentPrice} label="Atual" color="rgba(255,255,255,0.6)" dashed />
        <Marker price={derived.rangeMin} label="Mín" color="rgba(244,132,95,0.55)" dashed />
        <Marker price={derived.rangeMax} label="Máx" color="rgba(244,132,95,0.55)" dashed />
        <Marker price={sku.competitorPrice} label="Concorr." color="rgba(120,180,255,0.75)" dashed />

        <line
          x1={x(derived.optimalPrice)} x2={x(derived.optimalPrice)}
          y1={PAD.t} y2={H - PAD.b}
          stroke="#F4845F" strokeWidth={2}
        />
        <circle cx={x(derived.optimalPrice)} cy={curveAt(derived.optimalPrice)} r={5} fill="#F4845F" stroke="#fff" strokeWidth={2} />
        <text x={x(derived.optimalPrice)} y={PAD.t - 4} fontSize="10" fill="#F4845F" textAnchor="middle" fontWeight={700}>
          Ótimo
        </text>

        <text x={PAD.l} y={H - 10} fontSize="10" fill="rgba(255,255,255,0.5)">
          {fmtBRL(pMin)}
        </text>
        <text x={W - PAD.r} y={H - 10} fontSize="10" fill="rgba(255,255,255,0.5)" textAnchor="end">
          {fmtBRL(pMax)}
        </text>
        <text x={6} y={PAD.t + 8} fontSize="10" fill="rgba(255,255,255,0.5)">
          margem total
        </text>
      </svg>
    </div>
  );
};

// Silence unused-import lints for the exported type
export type { AlternativeScenario, PriceMarginSku };
// preserve DASH re-usability in case of future scenarios
export const _DASH = DASH;

export default PriceMarginDemo;
