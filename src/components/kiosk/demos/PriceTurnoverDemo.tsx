import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import TouchSelect from '../ui/TouchSelect';
import {
  pipeline,
  clusters as allClusters,
  filterOptions,
  fmtBRL,
  fmtBRLk,
  generalInsightFor,
  type TurnoverCluster,
  type ClusterAction,
  type SkuRow,
} from '@/data/kiosk/demos/priceTurnover';

type Phase = 'setup' | 'running' | 'result';

interface Derived {
  recommendedPrice: number;
  recommendedMarkdownPct: number;
  nextAction: string;
  action: ClusterAction;
  actInDays: number;
  sellThroughProjectedPct: number;
  agedStockPct: number;
  marginPreservedPp: number;
  capitalUnlockedBRL: number;
  skus: SkuRow[];
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const computeOutcome = (
  c: TurnoverCluster,
  objective: string,
  minMargin: string,
): Derived => {
  const obj =
    objective === 'aggressive'
      ? { markdown: 1.35, sellThrough: 6, margin: -1.8, capital: 1.25 }
      : objective === 'preserve'
      ? { markdown: 0.6, sellThrough: -4, margin: 2.4, capital: 0.7 }
      : { markdown: 1, sellThrough: 0, margin: 0, capital: 1 };

  const mm = parseInt(minMargin, 10);
  const floor =
    mm >= 40
      ? { markdown: 0.55, sellThrough: -5, margin: 2.2, capital: 0.6 }
      : mm >= 35
      ? { markdown: 0.8, sellThrough: -2, margin: 1.1, capital: 0.85 }
      : mm >= 30
      ? { markdown: 1, sellThrough: 0, margin: 0, capital: 1 }
      : { markdown: 1.15, sellThrough: 2, margin: -0.8, capital: 1.1 };

  const shift = c.action === 'markdown';
  const factor = obj.markdown * floor.markdown;

  const markdownPct = shift
    ? Math.round(c.recommendedMarkdownPct * factor)
    : c.recommendedMarkdownPct;

  const recommendedPrice = shift
    ? Math.round(c.currentPrice * (1 - markdownPct / 100) * 10) / 10
    : c.recommendedPrice;

  const sellThroughProjectedPct = clamp(
    Math.round(c.sellThroughProjectedPct + obj.sellThrough + floor.sellThrough),
    50,
    95,
  );

  const marginPreservedPp =
    Math.round((c.marginPreservedPp + obj.margin + floor.margin) * 10) / 10;

  const capitalUnlockedBRL = Math.round(
    (c.capitalUnlockedBRL * obj.capital * floor.capital) / 1000,
  ) * 1000;

  const nextAction =
    c.action === 'markdown' ? `Markdown de ${markdownPct}% agora` : c.nextAction;

  const skus: SkuRow[] = c.skus.map((s) => {
    if (!shift || s.markdownPct === 0) return s;
    const mdPct = Math.max(0, Math.round(s.markdownPct * factor));
    const price = Math.round(s.currentPrice * (1 - mdPct / 100) * 10) / 10;
    return { ...s, markdownPct: mdPct, recommendedPrice: price };
  });

  return {
    recommendedPrice,
    recommendedMarkdownPct: markdownPct,
    nextAction,
    action: c.action,
    actInDays: c.actInDays,
    sellThroughProjectedPct,
    agedStockPct: c.agedStockPct,
    marginPreservedPp,
    capitalUnlockedBRL,
    skus,
  };
};

const actionColor: Record<ClusterAction, string> = {
  hold: '#22c55e',
  markdown: '#F4845F',
  wait: '#60a5fa',
};

const actionLabel: Record<ClusterAction, string> = {
  hold: 'Manter',
  markdown: 'Markdown',
  wait: 'Aguardar',
};

const actionToneClass: Record<ClusterAction, string> = {
  hold: 'text-[#4ade80]',
  markdown: 'text-[#F4845F]',
  wait: 'text-[#60a5fa]',
};

const PriceTurnoverDemo = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [product, setProduct] = useState('sku-1');
  const [region, setRegion] = useState('all');
  const [objective, setObjective] = useState('balanced');
  const [minMargin, setMinMargin] = useState('30');

  const visibleClusters = useMemo(
    () => (region === 'all' ? allClusters : allClusters.filter((c) => c.id === region)),
    [region],
  );

  const derivedByCluster = useMemo(() => {
    const map = new Map<string, Derived>();
    visibleClusters.forEach((c) => map.set(c.id, computeOutcome(c, objective, minMargin)));
    return map;
  }, [visibleClusters, objective, minMargin]);

  const selected = useMemo(
    () => visibleClusters.find((c) => c.id === selectedId) ?? null,
    [visibleClusters, selectedId],
  );

  const derived = selected ? derivedByCluster.get(selected.id) ?? null : null;

  const generalInsight = useMemo(() => generalInsightFor(visibleClusters), [visibleClusters]);

  useEffect(() => {
    if (selectedId && !visibleClusters.find((c) => c.id === selectedId)) {
      setSelectedId(null);
    }
  }, [visibleClusters, selectedId]);

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
        setSelectedId((prev) => prev ?? visibleClusters[0]?.id ?? null);
        setPhase('result');
      }, elapsed + 260),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, visibleClusters]);

  const reset = () => {
    setPhase('setup');
    setProgress(0);
  };

  const showResult = phase === 'result';
  const canCalculate = visibleClusters.length > 0;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP — dashboard / result */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10 gap-[1vmin]">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {showResult ? 'Preço e markdown recomendados por cluster' : 'Clusters e giro atual'}
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                {showResult
                  ? 'Ação sugerida, sell-through e capital liberado por cluster.'
                  : 'Selecione os filtros e ajuste restrições para simular a ação ideal por cluster.'}
              </p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] text-right">
              Objetivo: Giro
            </span>
          </div>

          <div className="p-[2.2vmin] flex flex-col gap-[1.4vmin]">
            {/* Filters */}
            <div className="grid grid-cols-[1.25fr_0.75fr] gap-[1vmin]">
              <TouchSelect label="Produto" value={product} onChange={setProduct} options={filterOptions.product} />
              <TouchSelect label="Região / Cluster" value={region} onChange={setRegion} options={filterOptions.region} />
            </div>
            <div className="grid grid-cols-[1.25fr_0.75fr] gap-[1vmin]">
              <TouchSelect label="Objetivo" value={objective} onChange={setObjective} options={filterOptions.objective} />
              <TouchSelect label="Margem mínima" value={minMargin} onChange={setMinMargin} options={filterOptions.minMargin} />
            </div>

            {/* Cluster table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_0.9fr_0.9fr_0.9fr_1.1fr] px-[1.4vmin] py-[0.7vmin] gap-x-[0.6vmin] bg-white/[0.05] text-[0.8vmin] uppercase tracking-[0.1em] font-semibold text-white/60 leading-tight">
                <span>Cluster</span>
                <span>Situação</span>
                <span className="text-right">Estoque</span>
                <span className="text-right">Idade<br/>média</span>
                <span className="text-right">Veloc.<br/>vs. cat.</span>
                <span className="text-right">Ação<br/>sugerida</span>
              </div>
              {visibleClusters.length === 0 && (
                <div className="px-[1.4vmin] py-[1.6vmin] text-[1.4vmin] text-white/50">
                  Nenhum cluster nesta seleção de filtros.
                </div>
              )}
              {visibleClusters.map((c) => {
                const d = derivedByCluster.get(c.id);
                const active = c.id === selectedId && showResult;
                const rowDisabled = !showResult;
                return (
                  <button
                    type="button"
                    key={c.id}
                    disabled={rowDisabled}
                    onClick={() => setSelectedId(c.id)}
                    className={`w-full grid grid-cols-[1.4fr_1fr_0.9fr_0.9fr_0.9fr_1.1fr] items-center px-[1.4vmin] py-[1vmin] text-[1.35vmin] border-t border-white/10 text-left transition ${
                      active
                        ? 'bg-[#F4845F]/10'
                        : rowDisabled
                        ? 'cursor-default'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-[0.7vmin] text-white/90 font-semibold leading-tight">
                      <span
                        className="w-[1.1vmin] h-[1.1vmin] rounded-full flex-shrink-0"
                        style={{ background: actionColor[c.action] }}
                      />
                      <span>
                        {c.name}
                        <span className="block text-[1.05vmin] font-normal text-white/50">{c.region}</span>
                      </span>
                    </span>
                    <span className="text-white/70">{c.situation}</span>
                    <span className="text-right text-white/85 font-mono">{c.stockUnits.toLocaleString('pt-BR')} un</span>
                    <span className="text-right text-white/85 font-mono">{c.avgStockAgeDays} d</span>
                    <span className="text-right text-white/85 font-mono">{c.sellVelocity}/{c.categoryAvgVelocity}</span>
                    <span className={`text-right font-semibold ${showResult && d ? actionToneClass[d.action] : 'text-white/40'}`}>
                      {showResult && d ? d.nextAction : '—'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Result panel */}
            {showResult && selected && derived && (
              <>
                <div className="grid grid-cols-2 gap-[1.2vmin]">
                  <ConclusionCard
                    label="Preço recomendado"
                    value={fmtBRL(derived.recommendedPrice)}
                    highlight
                  />
                  <ConclusionCard
                    label={derived.action === 'wait' ? 'Aguardar' : 'Markdown'}
                    value={
                      derived.action === 'wait'
                        ? `${derived.actInDays} dias`
                        : derived.recommendedMarkdownPct > 0
                        ? `−${derived.recommendedMarkdownPct}%`
                        : '—'
                    }
                  />
                </div>

                {/* SKU table — 3 rows */}
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-[1.6fr_0.9fr_1fr_0.8fr_0.9fr] px-[1.4vmin] py-[0.7vmin] gap-x-[0.6vmin] bg-white/[0.05] text-[0.8vmin] uppercase tracking-[0.1em] font-semibold text-white/60 leading-tight">
                    <span>SKU · {selected.name}</span>
                    <span className="text-right">Preço<br/>atual</span>
                    <span className="text-right">Preço<br/>recomendado</span>
                    <span className="text-right">Markdown</span>
                    <span className="text-right">Sell-<br/>through</span>
                  </div>
                  {derived.skus.map((s) => (
                    <div
                      key={s.sku}
                      className="grid grid-cols-[1.6fr_0.9fr_1fr_0.8fr_0.9fr] items-center px-[1.4vmin] py-[1vmin] text-[1.35vmin] border-t border-white/10"
                    >
                      <span className="text-white/90 leading-tight">
                        <span className="block font-semibold">{s.name}</span>
                        <span className="block text-[1.05vmin] font-normal text-white/45 font-mono">{s.sku}</span>
                      </span>
                      <span className="text-right text-white/60 font-mono line-through">{fmtBRL(s.currentPrice)}</span>
                      <span className="text-right text-white font-mono font-semibold">{fmtBRL(s.recommendedPrice)}</span>
                      <span
                        className="text-right font-mono"
                        style={{ color: s.markdownPct > 0 ? '#F4845F' : 'rgba(255,255,255,0.55)' }}
                      >
                        {s.markdownPct > 0 ? `−${s.markdownPct}%` : '—'}
                      </span>
                      <span className="text-right text-white/85 font-mono">{s.sellThroughProjectedPct}%</span>
                    </div>
                  ))}
                </div>

                {/* Bottom KPIs */}
                <div className="grid grid-cols-3 gap-[1vmin]">
                  <ConclusionCard
                    label="Sell-through projetado"
                    value={`${derived.sellThroughProjectedPct}%`}
                    highlight
                  />
                  <ConclusionCard
                    label="Margem preservada"
                    value={`+${derived.marginPreservedPp.toFixed(1)} pp`}
                  />
                  <ConclusionCard
                    label="Capital liberado"
                    value={fmtBRLk(derived.capitalUnlockedBRL)}
                  />
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
                {canCalculate ? 'Otimizar preço e markdown' : 'Ajuste os filtros para simular'}
              </button>
            )}

            {phase === 'running' && (
              <div className="rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">Calculando ação ideal…</span>
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
                  {selected ? `Por que ${selected.action === 'hold' ? 'manter' : selected.action === 'wait' ? 'aguardar' : 'este markdown'}` : 'O que o modelo aprendeu'}
                </span>
              </div>
              {selected ? (
                <>
                  <span className="block text-[1.7vmin] font-semibold text-white mb-[0.6vmin] leading-tight">
                    {selected.name} · {selected.situation}
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

const MarkdownRuler = ({ derived, price }: { derived: Derived; price: number }) => {
  const stops = [
    { t: 0, label: 'Hoje' },
    { t: 0.22, label: '7 dias' },
    { t: 0.44, label: '14 dias' },
    { t: 0.7, label: '21 dias' },
    { t: 1, label: 'Liquidação' },
  ];

  const targetT =
    derived.action === 'hold'
      ? 0
      : derived.action === 'wait'
      ? 0.44
      : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1.2vmin] flex flex-col">
      <div className="flex items-center justify-between mb-[0.8vmin]">
        <span className="text-[0.9vmin] tracking-[0.18em] uppercase font-semibold text-white/55">
          Régua progressiva de markdown
        </span>
        <span className="text-[1.2vmin] text-white/70">
          Ação em <span className="text-[#F4845F] font-semibold">{derived.actInDays === 0 ? 'agora' : `${derived.actInDays} dias`}</span>
          {' · '}Preço {fmtBRL(price)}
        </span>
      </div>
      <div className="relative h-[4vmin] flex-1">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[0.35vmin] bg-white/10 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[0.35vmin] rounded-full"
          style={{
            width: `${Math.max(4, targetT * 100)}%`,
            background: 'linear-gradient(90deg, rgba(244,132,95,0.35), #F4845F)',
          }}
        />
        {stops.map((s) => (
          <div
            key={s.label}
            className="absolute -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${s.t * 100}%`, top: 0 }}
          >
            <span
              className={`w-[1.2vmin] h-[1.2vmin] rounded-full border-2 ${
                s.t <= targetT + 0.001
                  ? 'bg-[#F4845F] border-[#F4845F]'
                  : 'bg-[#0B1224] border-white/25'
              }`}
              style={{ marginTop: '1.4vmin' }}
            />
            <span className="mt-[0.4vmin] text-[1vmin] text-white/55 whitespace-nowrap">{s.label}</span>
          </div>
        ))}
        <div
          className="absolute -translate-x-1/2"
          style={{ left: `${targetT * 100}%`, top: '-0.4vmin' }}
        >
          <span className="block px-[0.8vmin] py-[0.2vmin] rounded-full bg-[#F4845F] text-white text-[1vmin] font-bold uppercase tracking-[0.15em] whitespace-nowrap shadow-[0_0_12px_rgba(244,132,95,0.6)]">
            {actionLabel[derived.action]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceTurnoverDemo;
