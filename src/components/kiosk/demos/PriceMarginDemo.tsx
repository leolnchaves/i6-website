import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import TouchSelect from '../ui/TouchSelect';
import {
  pipeline,
  skus,
  filterOptions,
  fmtBRL,
  type PriceMarginSku,
  type AlternativeScenario,
} from '@/data/kiosk/demos/priceMargin';

type Phase = 'setup' | 'running' | 'result';

// Derived outcome, reactive to strategy / minMargin / competitive band
interface Derived {
  optimalPrice: number;
  rangeMin: number;
  rangeMax: number;
  confidencePct: number;
  marginImpactPp: number;
  volumeImpactPct: number;
  alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario];
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const computeOutcome = (
  s: PriceMarginSku,
  strategy: string,
  minMargin: string,
  competitiveBand: string,
): Derived => {
  // Strategy shifts price ± and rebalances margin/volume impact
  const strat =
    strategy === 'margin'
      ? { price: 1.018, margin: 1.4, volume: -1.6, conf: -3 }
      : strategy === 'defense'
      ? { price: 0.984, margin: -1.1, volume: 1.9, conf: 2 }
      : { price: 1, margin: 0, volume: 0, conf: 0 };

  // Competitive band controls range width and price ceiling vs. competitor
  const band =
    competitiveBand === 'strict'
      ? { spread: 0.55, ceilingMult: 1.0 }
      : competitiveBand === 'wide'
      ? { spread: 1.4, ceilingMult: 1.06 }
      : { spread: 1, ceilingMult: 1.03 };

  // Minimum margin acts as a floor: raises price and margin, dents confidence and volume
  const mm = parseInt(minMargin, 10);
  const floor =
    mm >= 45
      ? { price: 1.014, margin: 1.1, volume: -0.9, conf: -6 }
      : mm >= 40
      ? { price: 1.007, margin: 0.6, volume: -0.4, conf: -3 }
      : mm >= 35
      ? { price: 1, margin: 0, volume: 0, conf: 0 }
      : { price: 0.997, margin: -0.3, volume: 0.3, conf: 1 };

  const rawOptimal = s.optimalPrice * strat.price * floor.price;
  const ceiling = s.competitorPrice * band.ceilingMult;
  const optimalPrice = Math.min(rawOptimal, ceiling);

  const halfSpread = ((s.rangeMax - s.rangeMin) / 2) * band.spread;
  const rangeMin = optimalPrice - halfSpread;
  const rangeMax = Math.min(optimalPrice + halfSpread, ceiling + halfSpread * 0.3);

  const marginImpactPp = s.marginImpactPp + strat.margin + floor.margin;
  const volumeImpactPct = s.volumeImpactPct + strat.volume + floor.volume;
  const confidencePct = clamp(s.confidencePct + strat.conf + floor.conf, 62, 97);

  const round2 = (v: number) => Math.round(v * 100) / 100;
  const round1 = (v: number) => Math.round(v * 10) / 10;

  const alternatives: [AlternativeScenario, AlternativeScenario, AlternativeScenario] = [
    {
      id: 'conservative',
      label: 'Conservador',
      price: round2(rangeMin),
      margin: 'Maior',
      volume: 'Queda mínima',
    },
    {
      id: 'recommended',
      label: 'Recomendado',
      price: round2(optimalPrice),
      margin: 'Ótima',
      volume: 'Queda controlada',
    },
    {
      id: 'aggressive',
      label: 'Agressivo',
      price: round2(rangeMax),
      margin: 'Máxima',
      volume: 'Maior risco de volume',
    },
  ];

  return {
    optimalPrice: round2(optimalPrice),
    rangeMin: round2(rangeMin),
    rangeMax: round2(rangeMax),
    confidencePct: Math.round(confidencePct),
    marginImpactPp: round1(marginImpactPp),
    volumeImpactPct: round1(volumeImpactPct),
    alternatives,
  };
};

const DASH = '—';

const competitivePositionLabel: Record<PriceMarginSku['competitivePosition'], string> = {
  below: 'Abaixo',
  inline: 'Alinhado',
  above: 'Acima',
};

const PriceMarginDemo = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filters
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

  // If filter removes selected SKU, drop selection
  useEffect(() => {
    if (selectedId && !filtered.find((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

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
    timers.push(setTimeout(() => setPhase('result'), elapsed + 260));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const latencyMs = useMemo(
    () => (28 + Math.random() * 20).toFixed(2),
    [selectedId, phase],
  );

  const reset = () => {
    setPhase('setup');
    setProgress(0);
  };

  const canCalculate = !!selected;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-2 gap-[3vmin] items-stretch">
        {/* ============ LEFT ============ */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
          {/* Fake app bar */}
          <div className="flex items-center justify-between px-[2vmin] py-[1.5vmin] bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-[1vmin]">
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ff5f56]" />
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ffbd2e]" />
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#27c93f]" />
              <span className="ml-[1.5vmin] text-[1.3vmin] text-white/50 font-mono">
                i6ElasticPrice · Central Estratégica de Pricing
              </span>
            </div>
            <span className="text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
              Objetivo: Margem
            </span>
          </div>

          <div className="p-[2vmin] flex-1 flex flex-col gap-[1.6vmin]">
            {phase !== 'result' ? (
              <SetupView
                filtered={filtered}
                selectedId={selectedId}
                onSelect={setSelectedId}
                category={category}
                setCategory={setCategory}
                channel={channel}
                setChannel={setChannel}
                strategy={strategy}
                setStrategy={setStrategy}
                minMargin={minMargin}
                setMinMargin={setMinMargin}
                competitiveBand={competitiveBand}
                setCompetitiveBand={setCompetitiveBand}
                onCalculate={() => setPhase('running')}
                canCalculate={canCalculate}
                running={phase === 'running'}
              />
            ) : (
              selected && <ResultView selected={selected} />
            )}
          </div>
        </div>

        {/* ============ RIGHT ============ */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin] flex flex-col h-full">
          <div className="flex items-center gap-[1.2vmin] mb-[1.2vmin]">
            <span className="w-[4.2vmin] h-[4.2vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />
            </span>
            <div>
              <h4 className="text-[2vmin] font-bold text-white leading-tight">
                Como o modelo está pensando
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                Pipeline preditivo · i6ElasticPrice
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[0.9vmin]">
            {pipeline.map((step, i) => {
              const state =
                phase === 'setup'
                  ? 'idle'
                  : phase === 'result' || i < progress
                  ? 'done'
                  : i === progress
                  ? 'active'
                  : 'idle';
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-[1.2vmin] transition-all ${
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
                      {step.label}
                    </span>
                  </div>
                  <div className="pl-[3.4vmin]">
                    <p className="text-[1.2vmin] text-white/55 mb-[0.4vmin]">{step.micro}</p>
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

          {/* Conclusion card */}
          {phase === 'result' && selected && (
            <div className="mt-[1.4vmin] rounded-2xl border border-[#F4845F]/50 bg-[#F4845F]/[0.08] p-[1.6vmin] animate-fade-in flex flex-col gap-[1.2vmin]">
              <div className="flex items-center justify-between">
                <span className="text-[1.55vmin] font-semibold text-white/90">
                  {selected.name}
                </span>
                <span className="flex items-center gap-[0.6vmin] text-[1.3vmin] font-semibold text-[#F4845F]">
                  <Check className="w-[1.6vmin] h-[1.6vmin]" />
                  Recomendação pronta
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[1vmin]">
                <MetricPill label="Latência do modelo" value={`${latencyMs} ms`} hint="média mercado ~180 ms" />
                <MetricPill
                  label="Confiança"
                  value={`${selected.confidencePct}%`}
                />
                <MetricPill
                  label="Impacto na margem"
                  value={`+${selected.marginImpactPp.toFixed(1)} pp`}
                  highlight
                  trend="up"
                />
                <MetricPill
                  label="Impacto no volume"
                  value={`${selected.volumeImpactPct.toFixed(1)}%`}
                  trend="down"
                />
              </div>

              <div className="kiosk-insight-card relative rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[1.6vmin] pr-[9vmin] text-[1.55vmin] text-white/95 leading-relaxed">
                <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.1vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.4vmin] h-[1.4vmin] kiosk-insight-sparkle" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                  Por que recomendamos este preço
                </span>
                {selected.argument}
              </div>

              <button
                type="button"
                onClick={reset}
                className="self-end inline-flex items-center gap-[1vmin] min-h-[6vmin] px-[2.4vmin] py-[1.4vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.55vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
              >
                Nova simulação
              </button>
            </div>
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
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(244,132,95,.35), 0 0 24px rgba(244,132,95,.25);
            border-color: rgba(244,132,95,.55);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(244,132,95,.10), 0 0 40px rgba(244,132,95,.60);
            border-color: rgba(244,132,95,1);
          }
        }
        @keyframes kiosk-insight-sparkle {
          0%, 100% { transform: scale(1)    rotate(0deg);   opacity: 1;   }
          50%      { transform: scale(1.25) rotate(15deg);  opacity: .85; }
        }
        .kiosk-insight-card {
          animation:
            kiosk-insight-in .5s ease-out .1s both,
            kiosk-insight-glow 2.4s ease-in-out .1s infinite;
        }
        .kiosk-insight-sparkle { animation: kiosk-insight-sparkle 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// ============================================================
// Setup view: portfolio + scatter + filters + CTA
// ============================================================

interface SetupProps {
  filtered: PriceMarginSku[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  category: string; setCategory: (v: string) => void;
  channel: string; setChannel: (v: string) => void;
  strategy: string; setStrategy: (v: string) => void;
  minMargin: string; setMinMargin: (v: string) => void;
  competitiveBand: string; setCompetitiveBand: (v: string) => void;
  onCalculate: () => void;
  canCalculate: boolean;
  running: boolean;
}

const SetupView = ({
  filtered, selectedId, onSelect,
  category, setCategory, channel, setChannel,
  strategy, setStrategy, minMargin, setMinMargin,
  competitiveBand, setCompetitiveBand,
  onCalculate, canCalculate, running,
}: SetupProps) => {
  return (
    <>
      {/* Filters */}
      <div className="grid grid-cols-3 gap-[1vmin]">
        <TouchSelect label="Categoria" value={category} onChange={setCategory} options={filterOptions.category} />
        <TouchSelect label="Região / Canal" value={channel} onChange={setChannel} options={filterOptions.channel} />
        <TouchSelect label="Estratégia corporativa" value={strategy} onChange={setStrategy} options={filterOptions.strategy} />
        <TouchSelect label="Margem mínima" value={minMargin} onChange={setMinMargin} options={filterOptions.minMargin} />
        <TouchSelect label="Banda competitiva" value={competitiveBand} onChange={setCompetitiveBand} options={filterOptions.competitiveBand} />
        <div className="rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-center px-[1.4vmin]">
          <span className="text-[1.05vmin] tracking-[0.2em] uppercase font-semibold text-white/55">Portfólio</span>
          <span className="text-[1.7vmin] font-semibold text-white">{filtered.length} SKUs</span>
        </div>
      </div>

      {/* Portfolio table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_0.9fr_0.9fr_0.7fr_0.8fr] px-[1.4vmin] py-[0.8vmin] bg-white/[0.05] text-[1vmin] uppercase tracking-[0.18em] font-semibold text-white/55">
          <span>SKU</span>
          <span className="text-right">Preço</span>
          <span className="text-right">Volume</span>
          <span className="text-right">Elast.</span>
          <span className="text-right">Posição</span>
          <span className="text-right">Estoque</span>
          <span className="text-right">Concorrente</span>
        </div>
        {filtered.length === 0 && (
          <div className="px-[1.4vmin] py-[1.6vmin] text-[1.4vmin] text-white/50">
            Nenhum SKU nesta seleção de filtros.
          </div>
        )}
        {filtered.map((s) => {
          const active = s.id === selectedId;
          return (
            <button
              type="button"
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`w-full grid grid-cols-[1.6fr_0.7fr_0.7fr_0.9fr_0.9fr_0.7fr_0.8fr] items-center px-[1.4vmin] py-[1vmin] text-[1.35vmin] border-t border-white/10 text-left transition ${
                active
                  ? 'bg-[#F4845F]/15 ring-1 ring-[#F4845F]/60'
                  : 'hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-white/90 font-semibold leading-tight">
                {s.name}
                <span className="block text-[1.1vmin] font-normal text-white/50">
                  {s.category}
                </span>
              </span>
              <span className="text-right text-white/85 font-mono">{fmtBRL(s.currentPrice)}</span>
              <span className="text-right text-white/70 font-mono">{s.volume.toLocaleString('pt-BR')} un/sem</span>
              <span className="text-right text-white/85 font-mono">{s.elasticity.toFixed(2)}</span>
              <span className="text-right text-white/85">{competitivePositionLabel[s.competitivePosition]}</span>
              <span className="text-right text-white/70">{s.stockCoverDays} d</span>
              <span className="text-right text-white/70 font-mono">{fmtBRL(s.competitorPrice)}</span>
            </button>
          );
        })}
      </div>

      {/* Scatter chart */}
      <ScatterChart skus={filtered} selectedId={selectedId} onSelect={onSelect} />

      {/* CTA */}
      <button
        type="button"
        disabled={!canCalculate || running}
        onClick={onCalculate}
        className={`self-center inline-flex items-center gap-[1.2vmin] min-h-[7.5vmin] px-[3.6vmin] py-[1.6vmin] rounded-full text-[1.9vmin] font-bold transition ${
          canCalculate && !running
            ? 'bg-[#F4845F] text-white shadow-[0_0_28px_rgba(244,132,95,0.55)] hover:brightness-110 active:scale-[0.98]'
            : 'bg-white/[0.06] text-white/40 border border-white/10 cursor-not-allowed'
        }`}
      >
        <Sparkles className="w-[2vmin] h-[2vmin]" />
        {running ? 'Calculando…' : 'Calcular faixa ótima de preço'}
      </button>
    </>
  );
};

// ============================================================
// Scatter chart — Elasticidade × Margem
// ============================================================

const ScatterChart = ({
  skus: items,
  selectedId,
  onSelect,
}: {
  skus: PriceMarginSku[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) => {
  const W = 620;
  const H = 180;
  const PAD = { l: 44, r: 16, t: 14, b: 30 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;

  // Fixed axis domains for legibility
  const xMin = -2, xMax = 0;
  const yMin = 30, yMax = 65;

  // Estimate margin% from currentPrice using a plausible cost proxy
  const marginPctOf = (s: PriceMarginSku) => 40 + (Math.abs(s.elasticity) < 0.6 ? 12 : 2) + (s.id.charCodeAt(4) % 6);

  const x = (v: number) => PAD.l + ((v - xMin) / (xMax - xMin)) * iw;
  const y = (v: number) => PAD.t + ih - ((v - yMin) / (yMax - yMin)) * ih;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1.2vmin]">
      <div className="flex items-center justify-between mb-[0.4vmin]">
        <span className="text-[1.2vmin] tracking-[0.2em] uppercase font-semibold text-white/60">
          Elasticidade × Margem por SKU
        </span>
        <span className="text-[1.1vmin] text-white/40">bolha = volume</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={`gy-${t}`}
            x1={PAD.l} x2={W - PAD.r}
            y1={PAD.t + ih * t} y2={PAD.t + ih * t}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1}
          />
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={`gx-${t}`}
            y1={PAD.t} y2={H - PAD.b}
            x1={PAD.l + iw * t} x2={PAD.l + iw * t}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1}
          />
        ))}
        {/* Axes labels */}
        <text x={PAD.l} y={H - 8} fill="rgba(255,255,255,0.5)" fontSize="10">
          -2.0 (alta sensibilidade)
        </text>
        <text x={W - PAD.r} y={H - 8} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="end">
          0 (inelástico)
        </text>
        <text x={6} y={PAD.t + 8} fill="rgba(255,255,255,0.5)" fontSize="10">
          65% margem
        </text>
        <text x={6} y={H - PAD.b} fill="rgba(255,255,255,0.5)" fontSize="10">
          30%
        </text>

        {/* Bubbles */}
        {items.map((s) => {
          const r = 4 + Math.min(18, Math.sqrt(s.volume) / 8);
          const cx = x(s.elasticity);
          const cy = y(marginPctOf(s));
          const active = s.id === selectedId;
          return (
            <g key={s.id} onClick={() => onSelect(s.id)} style={{ cursor: 'pointer' }}>
              {active && (
                <circle cx={cx} cy={cy} r={r + 6} fill="rgba(244,132,95,0.18)" />
              )}
              <circle
                cx={cx} cy={cy} r={r}
                fill={active ? '#F4845F' : 'rgba(244,132,95,0.55)'}
                stroke={active ? '#fff' : 'rgba(255,255,255,0.25)'}
                strokeWidth={active ? 2 : 1}
              />
              <text
                x={cx + r + 4} y={cy + 3}
                fontSize="9"
                fill={active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)'}
              >
                {s.category}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================
// Result view: chart + KPI cards + alternatives table
// ============================================================

const ResultView = ({ selected }: { selected: PriceMarginSku }) => {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div>
          <h4 className="text-[2.2vmin] font-bold text-white leading-tight">{selected.name}</h4>
          <p className="text-[1.4vmin] text-white/60">
            {selected.category} · Volume {selected.volume.toLocaleString('pt-BR')} un/sem · Elasticidade {selected.elasticity.toFixed(2)}
          </p>
        </div>
        <span className="text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
          Preço × Margem projetada
        </span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-[1vmin]">
        <KpiCard label="Preço atual" value={fmtBRL(selected.currentPrice)} />
        <KpiCard
          label="Faixa recomendada"
          value={`${fmtBRL(selected.rangeMin)} – ${fmtBRL(selected.rangeMax)}`}
        />
        <KpiCard label="Preço ótimo" value={fmtBRL(selected.optimalPrice)} highlight />
        <KpiCard label="Confiança" value={`${selected.confidencePct}%`} />
      </div>

      {/* Chart */}
      <PriceMarginCurve sku={selected} />

      {/* Alternatives table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="px-[1.4vmin] py-[0.8vmin] bg-white/[0.05] text-[1.05vmin] uppercase tracking-[0.2em] font-semibold text-white/60 flex items-center gap-[0.8vmin]">
          <Layers className="w-[1.5vmin] h-[1.5vmin] text-[#F4845F]" />
          Cenários alternativos
        </div>
        <div className="grid grid-cols-[1fr_0.9fr_0.9fr_1.1fr] px-[1.4vmin] py-[0.7vmin] text-[1vmin] uppercase tracking-[0.18em] font-semibold text-white/50 border-t border-white/10">
          <span>Cenário</span>
          <span className="text-right">Preço</span>
          <span className="text-right">Margem</span>
          <span className="text-right">Volume</span>
        </div>
        {selected.alternatives.map((a) => {
          const isReco = a.id === 'recommended';
          return (
            <div
              key={a.id}
              className={`grid grid-cols-[1fr_0.9fr_0.9fr_1.1fr] px-[1.4vmin] py-[1vmin] items-center text-[1.35vmin] border-t border-white/10 ${
                isReco ? 'bg-[#F4845F]/10' : ''
              }`}
            >
              <span className={`font-semibold ${isReco ? 'text-[#F4845F]' : 'text-white/90'}`}>
                {a.label}
              </span>
              <span className="text-right text-white font-mono">{fmtBRL(a.price)}</span>
              <span className="text-right text-white/80">{a.margin}</span>
              <span className="text-right text-white/70">{a.volume}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const PriceMarginCurve = ({ sku }: { sku: PriceMarginSku }) => {
  const W = 620;
  const H = 200;
  const PAD = { l: 40, r: 16, t: 16, b: 32 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;

  const pMin = Math.min(sku.currentPrice, sku.rangeMin) - 3;
  const pMax = Math.max(sku.rangeMax, sku.competitorPrice) + 3;

  const x = (p: number) => PAD.l + ((p - pMin) / (pMax - pMin)) * iw;

  // Concave curve peaking at optimalPrice
  const peakY = PAD.t + ih * 0.15;
  const baseY = PAD.t + ih * 0.9;
  const curveAt = (p: number) => {
    const spread = (pMax - pMin) / 2;
    const dist = Math.abs(p - sku.optimalPrice) / spread;
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
  }: {
    price: number; label: string; color: string; dashed?: boolean;
  }) => (
    <g>
      <line
        x1={x(price)} x2={x(price)}
        y1={PAD.t} y2={H - PAD.b}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <text x={x(price)} y={PAD.t - 4} fontSize="10" fill={color} textAnchor="middle">
        {label}
      </text>
    </g>
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1.2vmin]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Recommended band */}
        <rect
          x={x(sku.rangeMin)} y={PAD.t}
          width={x(sku.rangeMax) - x(sku.rangeMin)} height={ih}
          fill="rgba(244,132,95,0.12)"
        />
        {/* Curve */}
        <path d={pathFill} fill="rgba(244,132,95,0.18)" />
        <path d={pathTop} fill="none" stroke="#F4845F" strokeWidth={2} />

        {/* Markers */}
        <Marker price={sku.currentPrice} label="Atual" color="rgba(255,255,255,0.6)" dashed />
        <Marker price={sku.rangeMin} label="Mín" color="rgba(244,132,95,0.55)" dashed />
        <Marker price={sku.rangeMax} label="Máx" color="rgba(244,132,95,0.55)" dashed />
        <Marker price={sku.competitorPrice} label="Concorr." color="rgba(120,180,255,0.75)" dashed />

        {/* Optimal — big pin */}
        <line
          x1={x(sku.optimalPrice)} x2={x(sku.optimalPrice)}
          y1={PAD.t} y2={H - PAD.b}
          stroke="#F4845F" strokeWidth={2}
        />
        <circle cx={x(sku.optimalPrice)} cy={curveAt(sku.optimalPrice)} r={5} fill="#F4845F" stroke="#fff" strokeWidth={2} />
        <text x={x(sku.optimalPrice)} y={PAD.t - 4} fontSize="10" fill="#F4845F" textAnchor="middle" fontWeight={700}>
          Ótimo
        </text>

        {/* X axis labels */}
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

// ============================================================
// Small UI primitives
// ============================================================

const KpiCard = ({
  label, value, highlight,
}: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-xl border px-[1.4vmin] py-[1.2vmin] ${
      highlight
        ? 'border-[#F4845F]/60 bg-[#F4845F]/10'
        : 'border-white/10 bg-white/[0.03]'
    }`}
  >
    <span className="block text-[1.05vmin] tracking-[0.22em] uppercase font-semibold text-white/55 mb-[0.3vmin]">
      {label}
    </span>
    <span
      className={`block text-[2.2vmin] font-bold ${highlight ? 'text-[#F4845F]' : 'text-white'}`}
      style={highlight ? { textShadow: '0 0 18px rgba(244,132,95,0.45)' } : undefined}
    >
      {value}
    </span>
  </div>
);

const MetricPill = ({
  label, value, hint, highlight, trend,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
  trend?: 'up' | 'down';
}) => (
  <div
    className={`rounded-lg border px-[1.2vmin] py-[0.9vmin] ${
      highlight ? 'border-[#F4845F]/50 bg-[#F4845F]/10' : 'border-white/10 bg-white/[0.03]'
    }`}
  >
    <span className="block text-[1vmin] tracking-[0.2em] uppercase font-semibold text-white/55 mb-[0.2vmin]">
      {label}
    </span>
    <span className={`inline-flex items-center gap-[0.5vmin] text-[1.7vmin] font-bold ${highlight ? 'text-[#F4845F]' : 'text-white'}`}>
      {trend === 'up' && <TrendingUp className="w-[1.5vmin] h-[1.5vmin]" />}
      {trend === 'down' && <TrendingDown className="w-[1.5vmin] h-[1.5vmin] text-white/70" />}
      {value}
    </span>
    {hint && <span className="block text-[1vmin] text-white/40 mt-[0.2vmin]">{hint}</span>}
  </div>
);

export default PriceMarginDemo;
