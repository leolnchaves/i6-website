import { useEffect, useMemo, useState } from 'react';
import TouchSelect from '@/components/kiosk/ui/TouchSelect';

import { ArrowDown, ArrowUp, Check, Minus, Plus, Repeat, Sparkles, X } from 'lucide-react';
import {
  actionMeta,
  cartFor,
  contextFor,
  fmtBR,
  fmtBRL,
  generalInsightFor,
  kpisFor,
  labels as L,
  pdvs,
  pipeline,
  recommendedFor,
  regionsOptions,
  type Action,
  type CartRow,
  type PdvId,
  type RegionId,
} from '@/data/kiosk/demos/mixAssortmentOrder';

type Phase = 'setup' | 'running' | 'result';

const DASH = '—';

const actionIcon: Record<Action, JSX.Element> = {
  manter: <Minus className="w-[1.3vmin] h-[1.3vmin]" />,
  incluir: <Plus className="w-[1.3vmin] h-[1.3vmin]" />,
  aumentar: <ArrowUp className="w-[1.3vmin] h-[1.3vmin]" />,
  substituir: <Repeat className="w-[1.3vmin] h-[1.3vmin]" />,
  reduzir: <ArrowDown className="w-[1.3vmin] h-[1.3vmin]" />,
  remover: <X className="w-[1.3vmin] h-[1.3vmin]" />,
};

const MixAssortmentOrderDemo = () => {
  const [pdv, setPdv] = useState<PdvId>('all');
  const [region, setRegion] = useState<RegionId>('all');
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [selectedSku, setSelectedSku] = useState<CartRow | null>(null);

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
    setSelectedSku(null);
  };

  const showResult = phase === 'result';
  const context = useMemo(() => contextFor(pdv, region), [pdv, region]);
  const filteredCart = useMemo(() => cartFor(pdv, region), [pdv, region]);
  const recommended = useMemo(() => recommendedFor(filteredCart), [filteredCart]);
  const kpis = useMemo(() => kpisFor(filteredCart, context), [filteredCart, context]);
  const generalInsight = useMemo(() => generalInsightFor(filteredCart), [filteredCart]);

  // If the SKU is filtered out by a filter change, drop selection
  useEffect(() => {
    if (selectedSku && !filteredCart.find((r) => r.sku === selectedSku.sku)) {
      setSelectedSku(null);
    }
  }, [filteredCart, selectedSku]);

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP — dashboard / result */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10 gap-[1vmin]">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {showResult ? L.result.title : L.setup.title}
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                {showResult ? L.result.subtitle : L.setup.subtitle}
              </p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] text-right">
              {L.objective}
            </span>
          </div>

          <div className="p-[2.2vmin] flex flex-col gap-[1.4vmin]">
            {!showResult && (
              <>
                {/* Filters — apenas Loja/PDV e Região */}
                <div className="grid grid-cols-2 gap-[1vmin]">
                  <TouchSelect
                    label={L.setup.pdv}
                    value={pdv}
                    onChange={(v) => setPdv(v as PdvId)}
                    options={pdvs.map((p) => ({ value: p.id, label: p.label }))}
                  />
                  <TouchSelect
                    label={L.setup.region}
                    value={region}
                    onChange={(v) => setRegion(v as RegionId)}
                    options={regionsOptions.map((r) => ({ value: r.id, label: r.label }))}
                  />
                </div>

                {/* Context cards — reagem aos filtros */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.4vmin] flex flex-col gap-[1vmin]">
                  <span className="text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                    {L.setup.contextTitle}
                  </span>
                  <div className="grid grid-cols-6 gap-[0.8vmin]">
                    <ContextTile label={L.setup.contextMix} value={`${context.skus} SKUs`} />
                    <ContextTile label={L.setup.contextStock} value={`${fmtBR(context.stockUnits)} un.`} />
                    <ContextTile label={L.setup.contextSales} value={`${fmtBR(context.recentSales30d)} un.`} />
                    <ContextTile
                      label={L.setup.contextLast}
                      value={fmtBRL(context.lastOrder.value)}
                      hint={`${fmtBR(context.lastOrder.units)} un.`}
                    />
                    <ContextTile label={L.setup.contextNotPos} value={`${context.notPositivated}`} tone="warn" />
                    <ContextTile label={L.setup.contextRupture} value={`${context.atRisk}`} tone="warn" />
                  </div>
                </div>
              </>
            )}

            {showResult && (
              <>
                {/* Filtros persistentes */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.2vmin] flex flex-col gap-[0.8vmin]">
                  <span className="text-[1.05vmin] tracking-[0.2em] uppercase font-semibold text-white/50">
                    {L.result.filtersTitle}
                  </span>
                  <div className="grid grid-cols-2 gap-[1vmin]">
                    <TouchSelect
                      label={L.setup.pdv}
                      value={pdv}
                      onChange={(v) => setPdv(v as PdvId)}
                      options={pdvs.map((p) => ({ value: p.id, label: p.label }))}
                    />
                    <TouchSelect
                      label={L.setup.region}
                      value={region}
                      onChange={(v) => setRegion(v as RegionId)}
                      options={regionsOptions.map((r) => ({ value: r.id, label: r.label }))}
                    />
                  </div>
                </div>

                {/* Comparison + Cart lado a lado */}
                <div className="grid grid-cols-[1fr_1.4fr] gap-[1.2vmin]">
                  <div className="flex flex-col gap-[1vmin]">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.2vmin] flex flex-col gap-[0.7vmin]">
                      <span className="text-[1.1vmin] tracking-[0.25em] uppercase font-semibold text-white/60">
                        {L.result.currentTitle}
                      </span>
                      <MixLine label={L.result.currentSkus} value={context.skus} />
                      <MixLine label={L.result.currentAtRisk} value={context.atRisk} tone="warn" />
                      <MixLine label={L.result.currentLowTurn} value={context.lowTurn} tone="warn" />
                      <MixLine label={L.result.currentNotPos} value={context.notPositivated} tone="warn" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSku(null)}
                      className={`text-left rounded-xl border-2 p-[1.2vmin] flex flex-col gap-[0.7vmin] transition-all ${
                        selectedSku
                          ? 'border-[#F4845F]/50 bg-[#F4845F]/[0.05] hover:border-[#F4845F] hover:bg-[#F4845F]/[0.1] cursor-pointer'
                          : 'border-[#F4845F] bg-[#F4845F]/[0.1] shadow-[0_0_16px_rgba(244,132,95,0.25)]'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-[0.5vmin]">
                        <span className="text-[1.1vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                          {L.result.recommendedTitle}
                        </span>
                        {selectedSku && (
                          <span className="text-[1vmin] font-semibold text-[#F4845F]">{L.result.recommendedHint}</span>
                        )}
                      </div>
                      <MixLine label={L.result.recKeep} value={recommended.keep} />
                      <MixLine label={L.result.recInclude} value={recommended.include} tone="good" />
                      <MixLine label={L.result.recSubstitute} value={recommended.substitute} tone="accent" />
                      <MixLine label={L.result.recRemove} value={recommended.remove} tone="bad" />
                      <MixLine label={L.result.recIncrease} value={recommended.increase} tone="info" />
                    </button>
                  </div>

                  {/* Cart */}
                  <div className="rounded-xl border border-white/10 overflow-hidden flex flex-col">
                    <div className="px-[1.4vmin] py-[0.9vmin] bg-white/[0.05] flex items-baseline justify-between border-b border-white/10">
                      <span className="text-[1.25vmin] tracking-[0.25em] uppercase font-semibold text-white/70">
                        {L.result.cartTitle}
                      </span>
                      <span className="text-[1.1vmin] font-semibold text-[#F4845F]">{L.result.cartHint}</span>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr] px-[1.4vmin] py-[0.7vmin] bg-white/[0.02] text-[1.1vmin] uppercase tracking-[0.18em] font-semibold text-white/55">
                      <span>{L.result.colSku}</span>
                      <span className="text-center">{L.result.colAction}</span>
                      <span className="text-right">{L.result.colVolume}</span>
                    </div>
                    <div className="max-h-[32vmin] overflow-y-auto">
                      {filteredCart.map((row) => {
                        const meta = actionMeta[row.action];
                        const active = selectedSku?.sku === row.sku;
                        return (
                          <button
                            key={row.sku}
                            type="button"
                            onClick={() => setSelectedSku(row)}
                            className={`w-full grid grid-cols-[2fr_1fr_1fr] px-[1.4vmin] py-[1vmin] items-center text-[1.35vmin] border-t border-white/10 text-left transition ${
                              active ? 'bg-[#F4845F]/10' : 'hover:bg-white/[0.04]'
                            }`}
                          >
                            <span className="text-white/90 font-semibold leading-tight">
                              {row.name}
                              <span className="block text-[1.05vmin] font-normal text-white/45">
                                {row.sku} · {row.category}
                              </span>
                            </span>
                            <span className="flex justify-center">
                              <span
                                className={`inline-flex items-center gap-[0.5vmin] px-[1vmin] py-[0.35vmin] rounded-full border text-[1.1vmin] font-semibold ${meta.tone}`}
                              >
                                {actionIcon[row.action]}
                                {meta.label}
                              </span>
                            </span>
                            <span className="text-right text-white font-mono font-semibold">
                              {row.action === 'remover'
                                ? DASH
                                : row.delta !== 0 && row.action !== 'incluir'
                                ? `${row.delta > 0 ? '+' : ''}${row.delta}`
                                : row.volume}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-4 gap-[1vmin]">
                  <ConclusionCard
                    label={L.result.kpiIncremental}
                    value={fmtBRL(kpis.incrementalOrder)}
                    highlight
                  />
                  <ConclusionCard label={L.result.kpiTicket} value={fmtBRL(kpis.potentialTicket)} />
                  <ConclusionCard
                    label={L.result.kpiNewPos}
                    value={`${kpis.newPositivated}`}
                    hint="novos SKUs"
                  />
                  <ConclusionCard
                    label={L.result.kpiRupture}
                    value={`-${kpis.ruptureReduction}%`}
                  />
                </div>
              </>
            )}

            {phase === 'setup' && (
              <button
                type="button"
                onClick={() => setPhase('running')}
                className="self-stretch min-h-[7vmin] rounded-2xl bg-[#F4845F] text-white font-bold text-[2vmin] tracking-wide hover:bg-[#F4845F]/90 active:scale-[0.99] transition-all shadow-[0_0_28px_rgba(244,132,95,0.35)]"
              >
                {L.setup.cta}
              </button>
            )}

            {phase === 'running' && (
              <div className="rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">{L.running}</span>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM — reasoning: POR QUE + horizontal timeline */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="flex items-center gap-[1.2vmin] mb-[1.4vmin]">
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">{L.reasoningTitle}</h4>
              {L.reasoningSubtitle && <p className="text-[1.35vmin] text-white/60">{L.reasoningSubtitle}</p>}
            </div>
          </div>

          {/* POR QUE above timeline */}
          {showResult && (
            <div className="kiosk-insight-card mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.8vmin]">
              <div className="flex items-center gap-[1vmin] mb-[0.8vmin]">
                <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F] kiosk-insight-sparkle" strokeWidth={2.5} />
                <span className="text-[1.7vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                  {selectedSku ? L.result.insightSkuTitle : L.result.insightGeneralTitle}
                </span>
              </div>
              {selectedSku ? (
                <>
                  <span className="block text-[1.7vmin] font-semibold text-white mb-[0.6vmin] leading-tight">
                    {selectedSku.name}
                  </span>
                  <p className="text-[1.7vmin] leading-relaxed text-white/95 mb-[1vmin]">
                    {selectedSku.reason}
                  </p>
                  <div className="grid grid-cols-4 gap-[0.8vmin]">
                    <MiniStat label={L.result.drillTurn} value={selectedSku.turn} />
                    <MiniStat label={L.result.drillCoverage} value={selectedSku.coverage} />
                    <MiniStat label={L.result.drillCluster} value={selectedSku.cluster} />
                    <MiniStat label={L.result.drillPotential} value={selectedSku.potential} />
                  </div>
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
              {L.result.newSimulation}
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
          animation: kiosk-insight-in .5s ease-out .3s both, kiosk-insight-glow 2.4s ease-in-out .3s infinite;
        }
        .kiosk-insight-sparkle { animation: kiosk-insight-sparkle 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// --- Subcomponents ---



const ContextTile = ({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: 'warn';
}) => (
  <div
    className={`rounded-lg border p-[0.9vmin] flex flex-col gap-[0.2vmin] ${
      tone === 'warn' ? 'border-[#F4845F]/30 bg-[#F4845F]/[0.06]' : 'border-white/10 bg-white/[0.04]'
    }`}
  >
    <span className="text-[0.85vmin] tracking-[0.15em] uppercase font-semibold text-white/50 leading-tight">
      {label}
    </span>
    <span
      className={`text-[1.6vmin] font-bold leading-tight ${
        tone === 'warn' ? 'text-[#F4845F]' : 'text-white'
      }`}
    >
      {value}
    </span>
    {hint && <span className="text-[1.05vmin] text-white/50">{hint}</span>}
  </div>
);

const MixLine = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'warn' | 'good' | 'bad' | 'accent' | 'info';
}) => {
  const color =
    tone === 'warn'
      ? 'text-[#F4845F]'
      : tone === 'good'
      ? 'text-[#4ade80]'
      : tone === 'bad'
      ? 'text-[#f87171]'
      : tone === 'accent'
      ? 'text-[#F4845F]'
      : tone === 'info'
      ? 'text-[#60a5fa]'
      : 'text-white';
  return (
    <div className="flex items-center justify-between text-[1.3vmin]">
      <span className="text-white/70">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
};

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
    className={`rounded-xl border p-[1.2vmin] flex flex-col gap-[0.3vmin] ${
      highlight
        ? 'border-[#F4845F]/60 bg-[#F4845F]/[0.08]'
        : 'border-white/10 bg-white/[0.03]'
    }`}
  >
    <span className="text-[1vmin] tracking-[0.2em] uppercase font-semibold text-white/55 leading-tight">
      {label}
    </span>
    <span
      className={`text-[1.9vmin] font-bold leading-tight ${
        highlight ? 'text-[#F4845F]' : 'text-white'
      }`}
    >
      {value}
    </span>
    {hint && <span className="text-[1.05vmin] text-white/55">{hint}</span>}
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-[0.7vmin] flex flex-col">
    <span className="text-[0.95vmin] tracking-[0.18em] uppercase font-semibold text-white/50 leading-tight">
      {label}
    </span>
    <span className="text-[1.3vmin] font-bold text-white leading-tight">{value}</span>
  </div>
);

export default MixAssortmentOrderDemo;
