import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Check, Sparkles } from 'lucide-react';
import TouchSelect from '../ui/TouchSelect';
import {
  pipeline,
  clusters as allClusters,
  filterOptions,
  fmtBRL,
  fmtBRLk,
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

// Deterministic outcome sensitive to objective / minMargin
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

  // Recompute SKU-level prices based on cluster factor.
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

const PriceTurnoverDemo = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>('interior-sp');

  const [product, setProduct] = useState('sku-1');
  const [region, setRegion] = useState('all');
  const [objective, setObjective] = useState('balanced');
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
    visibleClusters.forEach((c) => map.set(c.id, computeOutcome(c, objective, minMargin)));
    return map;
  }, [visibleClusters, objective, minMargin]);

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
                derivedByCluster={derivedByCluster}
                selectedId={selected?.id ?? null}
                onSelect={setSelectedId}
                product={product} setProduct={setProduct}
                region={region} setRegion={setRegion}
                objective={objective} setObjective={setObjective}
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
                  selected={selected}
                  derived={derived}
                  onSelect={setSelectedId}
                />
              )
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin] flex flex-col h-full">
          <div className="flex items-center gap-[1.2vmin] mb-[1.2vmin]">
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
      `}</style>
    </div>
  );
};

// ============================================================
// Cluster list (shared setup + result)
// ============================================================

const ClusterList = ({
  clusters,
  derivedByCluster,
  selectedId,
  onSelect,
  showPrice,
}: {
  clusters: TurnoverCluster[];
  derivedByCluster: Map<string, Derived>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  showPrice?: boolean;
}) => {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className={`grid ${showPrice ? 'grid-cols-[1.4fr_1fr_0.9fr_1.3fr]' : 'grid-cols-[1.4fr_1fr_1fr_1fr]'} px-[1.2vmin] py-[0.8vmin] bg-white/[0.05] text-[1.05vmin] uppercase tracking-[0.18em] font-semibold text-white/60`}>
        <span>Cluster</span>
        <span>Situação</span>
        {showPrice ? (
          <>
            <span className="text-right">Preço</span>
            <span className="text-right">Próxima ação</span>
          </>
        ) : (
          <>
            <span className="text-right">Estoque</span>
            <span className="text-right">Velocidade</span>
          </>
        )}
      </div>
      {clusters.map((c) => {
        const d = derivedByCluster.get(c.id);
        const active = c.id === selectedId;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`w-full grid ${showPrice ? 'grid-cols-[1.4fr_1fr_0.9fr_1.3fr]' : 'grid-cols-[1.4fr_1fr_1fr_1fr]'} items-center px-[1.2vmin] py-[1vmin] text-[1.3vmin] border-t border-white/10 text-left transition ${
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
            {showPrice && d ? (
              <>
                <span className="text-right text-white font-mono">{fmtBRL(d.recommendedPrice)}</span>
                <span className="text-right text-white/85">{d.nextAction}</span>
              </>
            ) : (
              <>
                <span className="text-right text-white/85 font-mono">{c.stockUnits.toLocaleString('pt-BR')} un</span>
                <span className="text-right text-white/85 font-mono">{c.sellVelocity} un/sem</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ============================================================
// Setup view
// ============================================================

interface SetupProps {
  clusters: TurnoverCluster[];
  derivedByCluster: Map<string, Derived>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  product: string; setProduct: (v: string) => void;
  region: string; setRegion: (v: string) => void;
  objective: string; setObjective: (v: string) => void;
  minMargin: string; setMinMargin: (v: string) => void;
  onCalculate: () => void;
  running: boolean;
  canCalculate: boolean;
}

const SetupView = ({
  clusters, derivedByCluster, selectedId, onSelect,
  product, setProduct, region, setRegion,
  objective, setObjective, minMargin, setMinMargin,
  onCalculate, running, canCalculate,
}: SetupProps) => {
  const selected = clusters.find((c) => c.id === selectedId) ?? clusters[0] ?? null;
  return (
    <>
      <ClusterList
        clusters={clusters}
        derivedByCluster={derivedByCluster}
        selectedId={selected?.id ?? null}
        onSelect={onSelect}
      />

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
              <span className="text-[1.2vmin] text-white/55">· {selected.region}</span>
            </div>
            <span className="text-[1.1vmin] uppercase tracking-[0.18em] font-semibold text-white/50">
              {selected.stores} lojas
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[0.6vmin]">
            <StatCell label="Estoque" value={`${selected.stockUnits.toLocaleString('pt-BR')} un`} />
            <StatCell label="Idade média" value={`${selected.avgStockAgeDays} d`} />
            <StatCell label="Velocidade" value={`${selected.sellVelocity} un/sem`} />
            <StatCell label="Média cat." value={`${selected.categoryAvgVelocity} un/sem`} />
            <StatCell label="Markdown atual" value={`${selected.currentMarkdownPct}%`} />
            <StatCell label="Margem restante" value={`${selected.remainingMarginPp} pp`} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-[1vmin]">
        <FilterRow label="Filtros" cols={2}>
          <TouchSelect label="Produto" value={product} onChange={setProduct} options={filterOptions.product} />
          <TouchSelect label="Loja / Região / Cluster" value={region} onChange={setRegion} options={filterOptions.region} />
        </FilterRow>
        <FilterRow label="Restrições" cols={1}>
          <TouchSelect label="Margem mínima" value={minMargin} onChange={setMinMargin} options={filterOptions.minMargin} />
        </FilterRow>
        <FilterRow label="Objetivo" cols={1}>
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
// Result — left panel (list + SKU table + ruler)
// ============================================================

const ResultLeft = ({
  clusters,
  derivedByCluster,
  selected,
  derived,
  onSelect,
}: {
  clusters: TurnoverCluster[];
  derivedByCluster: Map<string, Derived>;
  selected: TurnoverCluster;
  derived: Derived;
  onSelect: (id: string) => void;
}) => {
  return (
    <>
      <ClusterList
        clusters={clusters}
        derivedByCluster={derivedByCluster}
        selectedId={selected.id}
        onSelect={onSelect}
        showPrice
      />

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-[1.2vmin] py-[0.8vmin] bg-white/[0.05]">
          <span className="text-[1.05vmin] uppercase tracking-[0.18em] font-semibold text-white/60">
            Preços por SKU · {selected.name}
          </span>
          <span
            className="text-[1.1vmin] font-semibold uppercase tracking-[0.15em]"
            style={{ color: actionColor[selected.action] }}
          >
            {actionLabel[selected.action]}
          </span>
        </div>
        <div className="grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.9fr] px-[1.2vmin] py-[0.6vmin] text-[1vmin] uppercase tracking-[0.16em] font-semibold text-white/55 border-t border-white/10">
          <span>SKU</span>
          <span className="text-right">Preço atual</span>
          <span className="text-right">Recomendado</span>
          <span className="text-right">Markdown</span>
          <span className="text-right">Sell-through</span>
        </div>
        {derived.skus.map((s) => (
          <div
            key={s.sku}
            className="grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.9fr] items-center px-[1.2vmin] py-[0.9vmin] text-[1.25vmin] border-t border-white/10"
          >
            <span className="text-white/90">
              <span className="block font-semibold leading-tight">{s.name}</span>
              <span className="block text-[1vmin] text-white/45 font-mono">{s.sku}</span>
            </span>
            <span className="text-right text-white/60 font-mono line-through">{fmtBRL(s.currentPrice)}</span>
            <span className="text-right text-white font-mono font-semibold">{fmtBRL(s.recommendedPrice)}</span>
            <span className="text-right font-mono" style={{ color: s.markdownPct > 0 ? '#F4845F' : 'rgba(255,255,255,0.55)' }}>
              {s.markdownPct > 0 ? `−${s.markdownPct}%` : '—'}
            </span>
            <span className="text-right text-white/85 font-mono">{s.sellThroughProjectedPct}%</span>
          </div>
        ))}
      </div>

      <MarkdownRuler derived={derived} price={derived.recommendedPrice} />

      {/* Post-model KPIs (left column) */}
      <div className="grid grid-cols-4 gap-[0.8vmin]">
        <KpiPill label="Estoque envelhecido" value={`${derived.agedStockPct}%`} />
        <KpiPill label="Sell-through projetado" value={`${derived.sellThroughProjectedPct}%`} highlight />
        <KpiPill label="Margem preservada" value={`+${derived.marginPreservedPp.toFixed(1)} pp`} highlight />
        <KpiPill label="Capital liberado" value={fmtBRLk(derived.capitalUnlockedBRL)} />
      </div>
    </>
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
      : 0;

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

const FilterRow = ({ label, cols, children }: { label: string; cols: 1 | 2 | 3; children: ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.02] px-[1.2vmin] py-[1vmin]">
    <span className="block text-[1vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.7vmin]">
      {label}
    </span>
    <div
      className="grid gap-[0.9vmin]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
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
