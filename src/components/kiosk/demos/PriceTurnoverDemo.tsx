import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Check, Sparkles, MapPin } from 'lucide-react';
import TouchSelect from '../ui/TouchSelect';
import {
  pipeline,
  clusters as allClusters,
  filterOptions,
  fmtBRL,
  fmtBRLk,
  type TurnoverCluster,
  type ClusterAction,
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
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// Deterministic outcome sensitive to objective / horizon / minMargin
const computeOutcome = (
  c: TurnoverCluster,
  objective: string,
  horizon: string,
  minMargin: string,
): Derived => {
  const obj =
    objective === 'aggressive'
      ? { markdown: 1.35, sellThrough: 6, margin: -1.8, capital: 1.25 }
      : objective === 'preserve'
      ? { markdown: 0.6, sellThrough: -4, margin: 2.4, capital: 0.7 }
      : { markdown: 1, sellThrough: 0, margin: 0, capital: 1 };

  const hz = parseInt(horizon, 10);
  const horizonAdj =
    hz <= 14
      ? { markdown: 1.2, sellThrough: -3, margin: -0.8, capital: 1.15 }
      : hz <= 30
      ? { markdown: 1, sellThrough: 0, margin: 0, capital: 1 }
      : hz <= 45
      ? { markdown: 0.85, sellThrough: 2, margin: 0.9, capital: 0.9 }
      : { markdown: 0.7, sellThrough: 4, margin: 1.6, capital: 0.8 };

  const mm = parseInt(minMargin, 10);
  const floor =
    mm >= 40
      ? { markdown: 0.55, sellThrough: -5, margin: 2.2, capital: 0.6 }
      : mm >= 35
      ? { markdown: 0.8, sellThrough: -2, margin: 1.1, capital: 0.85 }
      : mm >= 30
      ? { markdown: 1, sellThrough: 0, margin: 0, capital: 1 }
      : { markdown: 1.15, sellThrough: 2, margin: -0.8, capital: 1.1 };

  // Only 'markdown' clusters actually shift with these levers.
  const shift = c.action === 'markdown';

  const markdownPct = shift
    ? Math.round(c.recommendedMarkdownPct * obj.markdown * horizonAdj.markdown * floor.markdown)
    : c.recommendedMarkdownPct;

  const recommendedPrice = shift
    ? Math.round(c.currentPrice * (1 - markdownPct / 100) * 10) / 10
    : c.recommendedPrice;

  const sellThroughProjectedPct = clamp(
    Math.round(c.sellThroughProjectedPct + obj.sellThrough + horizonAdj.sellThrough + floor.sellThrough),
    50,
    95,
  );

  const marginPreservedPp =
    Math.round((c.marginPreservedPp + obj.margin + horizonAdj.margin + floor.margin) * 10) / 10;

  const capitalUnlockedBRL = Math.round(
    (c.capitalUnlockedBRL * obj.capital * horizonAdj.capital * floor.capital) / 1000,
  ) * 1000;

  const nextAction =
    c.action === 'markdown'
      ? `Markdown de ${markdownPct}% agora`
      : c.nextAction;

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

const PriceTurnoverDemo = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>('interior-sp');

  const [category, setCategory] = useState('all');
  const [product, setProduct] = useState('sku-1');
  const [region, setRegion] = useState('all');
  const [objective, setObjective] = useState('balanced');
  const [horizon, setHorizon] = useState('30');
  const [minMargin, setMinMargin] = useState('30');

  const visibleClusters = useMemo(
    () => (region === 'all' ? allClusters : allClusters.filter((c) => c.id === region)),
    [region],
  );

  const selected = useMemo(
    () => visibleClusters.find((c) => c.id === selectedId) ?? visibleClusters[0] ?? null,
    [visibleClusters, selectedId],
  );

  const derivedByCluster = useMemo(() => {
    const map = new Map<string, Derived>();
    visibleClusters.forEach((c) => map.set(c.id, computeOutcome(c, objective, horizon, minMargin)));
    return map;
  }, [visibleClusters, objective, horizon, minMargin]);

  const derived = selected ? derivedByCluster.get(selected.id) ?? null : null;

  useEffect(() => {
    if (selectedId && !visibleClusters.find((c) => c.id === selectedId)) {
      setSelectedId(visibleClusters[0]?.id ?? null);
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
    timers.push(setTimeout(() => setPhase('result'), elapsed + 260));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const reset = () => {
    setPhase('setup');
    setProgress(0);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-2 gap-[3vmin] items-stretch">
        {/* LEFT */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
          <div className="flex items-center justify-between px-[2vmin] py-[1.5vmin] bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-[1vmin]">
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ff5f56]" />
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ffbd2e]" />
              <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#27c93f]" />
              <span className="ml-[1.5vmin] text-[1.3vmin] text-white/50 font-mono">
                i6ElasticPrice · Central Regional de Estoque e Markdown
              </span>
            </div>
            <span className="text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
              Objetivo: Giro
            </span>
          </div>

          <div className="p-[2vmin] flex-1 flex flex-col gap-[1.6vmin]">
            {phase !== 'result' ? (
              <SetupView
                clusters={visibleClusters}
                selectedId={selected?.id ?? null}
                onSelect={setSelectedId}
                category={category} setCategory={setCategory}
                product={product} setProduct={setProduct}
                region={region} setRegion={setRegion}
                objective={objective} setObjective={setObjective}
                horizon={horizon} setHorizon={setHorizon}
                minMargin={minMargin} setMinMargin={setMinMargin}
                onCalculate={() => setPhase('running')}
                running={phase === 'running'}
                canCalculate={!!selected}
              />
            ) : (
              selected && derived && (
                <ResultLeft
                  clusters={visibleClusters}
                  derivedByCluster={derivedByCluster}
                  selectedId={selected.id}
                  onSelect={setSelectedId}
                />
              )
            )}
          </div>
        </div>

        {/* RIGHT */}
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

          {phase === 'result' && selected && derived && (
            <div className="mt-[1.4vmin] rounded-2xl border border-[#F4845F]/50 bg-[#F4845F]/[0.08] p-[1.6vmin] animate-fade-in flex flex-col gap-[1.2vmin]">
              <div className="flex items-center justify-between">
                <span className="text-[1.55vmin] font-semibold text-white/90">
                  {selected.name} · {selected.situation}
                </span>
                <span className="flex items-center gap-[0.6vmin] text-[1.3vmin] font-semibold text-[#F4845F]">
                  <Check className="w-[1.6vmin] h-[1.6vmin]" />
                  Recomendação pronta
                </span>
              </div>

              <div className="grid grid-cols-4 gap-[0.8vmin]">
                <KpiPill label="Estoque envelhecido" value={`${derived.agedStockPct}%`} />
                <KpiPill label="Sell-through projetado" value={`${derived.sellThroughProjectedPct}%`} highlight />
                <KpiPill label="Margem preservada" value={`+${derived.marginPreservedPp.toFixed(1)} pp`} highlight />
                <KpiPill label="Capital liberado" value={fmtBRLk(derived.capitalUnlockedBRL)} />
              </div>

              <MarkdownRuler derived={derived} price={derived.recommendedPrice} />

              <div className="kiosk-insight-card relative rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[1.6vmin] pr-[9vmin] text-[1.55vmin] text-white/95 leading-relaxed">
                <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.1vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.4vmin] h-[1.4vmin] kiosk-insight-sparkle" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                  Por que {selected.action === 'hold' ? 'manter o preço' : selected.action === 'wait' ? 'aguardar' : 'recomendamos este markdown'}
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,132,95,.35), 0 0 24px rgba(244,132,95,.25); border-color: rgba(244,132,95,.55); }
          50%      { box-shadow: 0 0 0 6px rgba(244,132,95,.10), 0 0 40px rgba(244,132,95,.60); border-color: rgba(244,132,95,1); }
        }
        @keyframes kiosk-insight-sparkle {
          0%, 100% { transform: scale(1)    rotate(0deg);   opacity: 1;   }
          50%      { transform: scale(1.25) rotate(15deg);  opacity: .85; }
        }
        .kiosk-insight-card { animation: kiosk-insight-in .5s ease-out .1s both, kiosk-insight-glow 2.4s ease-in-out .1s infinite; }
        .kiosk-insight-sparkle { animation: kiosk-insight-sparkle 1.8s ease-in-out infinite; }
        @keyframes kiosk-pin-pulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%      { transform: scale(1.25); opacity: .85; }
        }
      `}</style>
    </div>
  );
};

// ============================================================
// Setup view
// ============================================================

interface SetupProps {
  clusters: TurnoverCluster[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  category: string; setCategory: (v: string) => void;
  product: string; setProduct: (v: string) => void;
  region: string; setRegion: (v: string) => void;
  objective: string; setObjective: (v: string) => void;
  horizon: string; setHorizon: (v: string) => void;
  minMargin: string; setMinMargin: (v: string) => void;
  onCalculate: () => void;
  running: boolean;
  canCalculate: boolean;
}

const SetupView = ({
  clusters, selectedId, onSelect,
  category, setCategory, product, setProduct, region, setRegion,
  objective, setObjective, horizon, setHorizon, minMargin, setMinMargin,
  onCalculate, running, canCalculate,
}: SetupProps) => {
  const selected = clusters.find((c) => c.id === selectedId) ?? clusters[0] ?? null;
  return (
    <>
      <div className="grid grid-cols-[1.15fr_1fr] gap-[1.2vmin]">
        <BrazilMap clusters={clusters} selectedId={selected?.id ?? null} onSelect={onSelect} />

        {selected && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1.4vmin] flex flex-col gap-[0.9vmin]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[0.8vmin]">
                <span
                  className="w-[1.4vmin] h-[1.4vmin] rounded-full"
                  style={{ background: actionColor[selected.action] }}
                />
                <span className="text-[1.55vmin] font-bold text-white leading-tight">
                  {selected.name}
                </span>
              </div>
              <span className="text-[1.1vmin] uppercase tracking-[0.18em] font-semibold text-white/50">
                {selected.stores} lojas
              </span>
            </div>
            <span className="text-[1.2vmin] text-white/55">{selected.region}</span>

            <div className="grid grid-cols-2 gap-[0.6vmin] mt-[0.4vmin]">
              <StatCell label="Estoque" value={`${selected.stockUnits.toLocaleString('pt-BR')} un`} />
              <StatCell label="Idade média" value={`${selected.avgStockAgeDays} d`} />
              <StatCell label="Velocidade" value={`${selected.sellVelocity} un/sem`} />
              <StatCell label="Média cat." value={`${selected.categoryAvgVelocity} un/sem`} />
              <StatCell label="Markdown atual" value={`${selected.currentMarkdownPct}%`} />
              <StatCell label="Margem restante" value={`${selected.remainingMarginPp} pp`} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[1vmin]">
        <FilterRow label="Filtros">
          <TouchSelect label="Categoria" value={category} onChange={setCategory} options={filterOptions.category} />
          <TouchSelect label="Produto" value={product} onChange={setProduct} options={filterOptions.product} />
          <TouchSelect label="Loja / Região / Cluster" value={region} onChange={setRegion} options={filterOptions.region} />
        </FilterRow>
        <FilterRow label="Restrições">
          <TouchSelect label="Prazo" value={horizon} onChange={setHorizon} options={filterOptions.horizon} />
          <TouchSelect label="Margem mínima" value={minMargin} onChange={setMinMargin} options={filterOptions.minMargin} />
        </FilterRow>
        <FilterRow label="Objetivo">
          <TouchSelect label="Objetivo de desova" value={objective} onChange={setObjective} options={filterOptions.objective} />
        </FilterRow>
      </div>

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
        {running ? 'Calculando…' : 'Otimizar preço e markdown'}
      </button>
    </>
  );
};

// ============================================================
// Result — left panel (map + table)
// ============================================================

const ResultLeft = ({
  clusters,
  derivedByCluster,
  selectedId,
  onSelect,
}: {
  clusters: TurnoverCluster[];
  derivedByCluster: Map<string, Derived>;
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <>
      <BrazilMap clusters={clusters} selectedId={selectedId} onSelect={onSelect} showBadges derivedByCluster={derivedByCluster} />

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_0.9fr_1.3fr] px-[1.2vmin] py-[0.8vmin] bg-white/[0.05] text-[1.05vmin] uppercase tracking-[0.18em] font-semibold text-white/60">
          <span>Cluster</span>
          <span>Situação</span>
          <span className="text-right">Preço</span>
          <span className="text-right">Próxima ação</span>
        </div>
        {clusters.map((c) => {
          const d = derivedByCluster.get(c.id);
          if (!d) return null;
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={`w-full grid grid-cols-[1.4fr_1fr_0.9fr_1.3fr] items-center px-[1.2vmin] py-[1vmin] text-[1.3vmin] border-t border-white/10 text-left transition ${
                active ? 'bg-[#F4845F]/15 ring-1 ring-[#F4845F]/60' : 'hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-[0.7vmin] text-white/90 font-semibold">
                <span
                  className="w-[1.2vmin] h-[1.2vmin] rounded-full flex-shrink-0"
                  style={{ background: actionColor[c.action] }}
                />
                {c.name}
              </span>
              <span className="text-white/70">{c.situation}</span>
              <span className="text-right text-white font-mono">{fmtBRL(d.recommendedPrice)}</span>
              <span className="text-right text-white/85">{d.nextAction}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

// ============================================================
// Brazil-ish map (stylised SVG)
// ============================================================

const BrazilMap = ({
  clusters,
  selectedId,
  onSelect,
  showBadges,
  derivedByCluster,
}: {
  clusters: TurnoverCluster[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showBadges?: boolean;
  derivedByCluster?: Map<string, Derived>;
}) => {
  const W = 400;
  const H = 500;

  // Simplified silhouette (approximate Brazil outline)
  const outline =
    'M 210 40 L 245 60 L 275 55 L 305 75 L 330 100 L 340 140 L 355 180 L 345 220 L 355 260 L 340 300 L 320 330 L 300 355 L 285 385 L 260 410 L 240 435 L 220 445 L 195 435 L 170 410 L 150 375 L 140 335 L 125 300 L 110 260 L 100 220 L 105 180 L 120 145 L 140 110 L 165 80 L 190 55 Z';

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1vmin]">
      <div className="flex items-center justify-between mb-[0.6vmin]">
        <span className="flex items-center gap-[0.6vmin] text-[1.2vmin] tracking-[0.2em] uppercase font-semibold text-white/60">
          <MapPin className="w-[1.6vmin] h-[1.6vmin] text-[#F4845F]" />
          Mapa de clusters
        </span>
        <div className="flex items-center gap-[1vmin] text-[1.05vmin] text-white/50">
          <LegendDot color={actionColor.hold} label="Manter" />
          <LegendDot color={actionColor.markdown} label="Markdown" />
          <LegendDot color={actionColor.wait} label="Aguardar" />
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <radialGradient id="brazil-fill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(244,132,95,0.10)" />
            <stop offset="100%" stopColor="rgba(244,132,95,0.02)" />
          </radialGradient>
        </defs>
        <path d={outline} fill="url(#brazil-fill)" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} />

        {clusters.map((c) => {
          const active = c.id === selectedId;
          const color = actionColor[c.action];
          const derived = derivedByCluster?.get(c.id);
          return (
            <g
              key={c.id}
              transform={`translate(${c.x} ${c.y})`}
              onClick={() => onSelect(c.id)}
              style={{ cursor: 'pointer' }}
            >
              {active && <circle r={18} fill={color} opacity={0.18} />}
              <circle
                r={active ? 10 : 8}
                fill={color}
                stroke={active ? '#fff' : 'rgba(255,255,255,0.35)'}
                strokeWidth={active ? 2 : 1.2}
                style={active ? { transformOrigin: 'center', animation: 'kiosk-pin-pulse 1.6s ease-in-out infinite' } : undefined}
              />
              <text x={14} y={4} fontSize="11" fill={active ? '#fff' : 'rgba(255,255,255,0.75)'} fontWeight={active ? 700 : 500}>
                {c.name}
              </text>
              {showBadges && derived && (
                <g transform="translate(14, 10)">
                  <rect
                    x={0} y={0} rx={4} ry={4}
                    width={c.action === 'markdown' ? 82 : 68}
                    height={14}
                    fill={color}
                    opacity={0.9}
                  />
                  <text x={6} y={10} fontSize="9" fill="#fff" fontWeight={700}>
                    {c.action === 'markdown'
                      ? `Markdown ${derived.recommendedMarkdownPct}%`
                      : c.action === 'wait'
                      ? `Aguardar ${derived.actInDays}d`
                      : 'Manter preço'}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================
// Markdown ruler
// ============================================================

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
      : 0; // markdown = act now

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-[1.2vmin]">
      <div className="flex items-center justify-between mb-[0.8vmin]">
        <span className="text-[1.1vmin] tracking-[0.2em] uppercase font-semibold text-white/55">
          Régua progressiva de markdown
        </span>
        <span className="text-[1.2vmin] text-white/70">
          Ação em <span className="text-[#F4845F] font-semibold">{derived.actInDays === 0 ? 'agora' : `${derived.actInDays} dias`}</span>
          {' · '}Preço {fmtBRL(price)}
        </span>
      </div>
      <div className="relative h-[3.6vmin]">
        {/* base line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[0.35vmin] bg-white/10 rounded-full" />
        {/* filled portion up to target */}
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
            style={{ left: `${s.t * 100}%` }}
          >
            <span
              className={`w-[1.2vmin] h-[1.2vmin] rounded-full border-2 ${
                s.t <= targetT + 0.001
                  ? 'bg-[#F4845F] border-[#F4845F]'
                  : 'bg-[#0B1224] border-white/25'
              }`}
              style={{ marginTop: '1.1vmin' }}
            />
            <span className="mt-[0.4vmin] text-[1vmin] text-white/55">{s.label}</span>
          </div>
        ))}
        {/* target pin */}
        <div
          className="absolute -translate-x-1/2"
          style={{ left: `${targetT * 100}%`, top: '-0.6vmin' }}
        >
          <span className="block px-[0.8vmin] py-[0.2vmin] rounded-full bg-[#F4845F] text-white text-[1vmin] font-bold uppercase tracking-[0.15em] whitespace-nowrap shadow-[0_0_12px_rgba(244,132,95,0.6)]">
            {actionLabel[derived.action]}
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Small primitives
// ============================================================

const FilterRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.02] px-[1.2vmin] py-[1vmin]">
    <span className="block text-[1vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.7vmin]">
      {label}
    </span>
    <div className="grid grid-cols-3 gap-[0.9vmin]">{children}</div>
  </div>
);

const StatCell = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.03] px-[1vmin] py-[0.7vmin]">
    <span className="block text-[0.95vmin] tracking-[0.2em] uppercase font-semibold text-white/50">
      {label}
    </span>
    <span className="block text-[1.5vmin] font-semibold text-white/90 font-mono leading-tight">
      {value}
    </span>
  </div>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-[0.4vmin]">
    <span className="w-[1vmin] h-[1vmin] rounded-full" style={{ background: color }} />
    {label}
  </span>
);

const KpiPill = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-lg p-[1vmin] border ${
      highlight ? 'bg-[#F4845F]/10 border-[#F4845F]/40' : 'bg-white/[0.03] border-white/10'
    }`}
  >
    <span className="block text-[1vmin] tracking-[0.18em] uppercase font-semibold text-[#F4845F] mb-[0.2vmin]">
      {label}
    </span>
    <span className={`block text-[1.6vmin] font-bold leading-none ${highlight ? 'text-[#F4845F]' : 'text-white'}`}>
      {value}
    </span>
  </div>
);

export default PriceTurnoverDemo;
