import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Check, Minus, Plus, Repeat, Sparkles, X } from 'lucide-react';
import {
  actionMeta,
  cart,
  categories,
  clusters,
  currentMix,
  cycles,
  fmtBR,
  fmtBRL,
  generalInsight,
  kpis,
  labels as L,
  pdvs,
  pipeline,
  recommendedMix,
  regionsOptions,
  type Action,
  type CartRow,
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
  const [pdv, setPdv] = useState(pdvs[0].id);
  const [region, setRegion] = useState(regionsOptions[1].id);
  const [cluster, setCluster] = useState(clusters[2].id);
  const [category, setCategory] = useState(categories[0].id);
  const [cycle, setCycle] = useState(cycles[1].id);
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
  const pdvInfo = useMemo(() => pdvs.find((p) => p.id === pdv)!, [pdv]);

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-[1.35fr_1fr] gap-[3vmin] items-stretch">
        {/* LEFT */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
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

          <div className="p-[2.2vmin] flex-1 flex flex-col gap-[1.4vmin]">
            {!showResult && (
              <>
                {/* Filters grid */}
                <div className="grid grid-cols-2 gap-[1vmin]">
                  <SelectField
                    label={L.setup.pdv}
                    value={pdv}
                    onChange={(v) => setPdv(v as typeof pdv)}
                    options={pdvs.map((p) => ({ value: p.id, label: p.label }))}
                  />
                  <SelectField
                    label={L.setup.region}
                    value={region}
                    onChange={(v) => setRegion(v as typeof region)}
                    options={regionsOptions.map((r) => ({ value: r.id, label: r.label }))}
                  />
                  <SelectField
                    label={L.setup.cluster}
                    value={cluster}
                    onChange={(v) => setCluster(v as typeof cluster)}
                    options={clusters.map((c) => ({ value: c.id, label: c.label }))}
                  />
                  <SelectField
                    label={L.setup.category}
                    value={category}
                    onChange={(v) => setCategory(v as typeof category)}
                    options={categories.map((c) => ({ value: c.id, label: c.label }))}
                  />
                  <SelectField
                    label={L.setup.cycle}
                    value={cycle}
                    onChange={(v) => setCycle(v as typeof cycle)}
                    options={cycles.map((c) => ({ value: c.id, label: c.label }))}
                  />
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.2vmin] flex flex-col justify-center">
                    <span className="text-[1.05vmin] tracking-[0.2em] uppercase font-semibold text-white/50">
                      PDV
                    </span>
                    <span className="text-[1.4vmin] text-white/90 font-semibold leading-tight">
                      {pdvInfo.sublabel}
                    </span>
                  </div>
                </div>

                {/* Context cards */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.4vmin] flex flex-col gap-[1vmin]">
                  <span className="text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                    {L.setup.contextTitle}
                  </span>
                  <div className="grid grid-cols-3 gap-[0.8vmin]">
                    <ContextTile label={L.setup.contextMix} value={`${currentMix.skus} SKUs`} />
                    <ContextTile label={L.setup.contextStock} value={`${fmtBR(currentMix.stockUnits)} un.`} />
                    <ContextTile label={L.setup.contextSales} value={`${fmtBR(currentMix.recentSales30d)} un.`} />
                    <ContextTile
                      label={L.setup.contextLast}
                      value={fmtBRL(currentMix.lastOrder.value)}
                      hint={`${fmtBR(currentMix.lastOrder.units)} un.`}
                    />
                    <ContextTile label={L.setup.contextNotPos} value={`${currentMix.notPositivated}`} tone="warn" />
                    <ContextTile label="Ruptura em curso" value={`${currentMix.atRisk}`} tone="warn" />
                  </div>
                </div>
              </>
            )}

            {showResult && (
              <>
                {/* Comparison */}
                <div className="grid grid-cols-2 gap-[1vmin]">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.2vmin] flex flex-col gap-[0.7vmin]">
                    <span className="text-[1.1vmin] tracking-[0.25em] uppercase font-semibold text-white/60">
                      {L.result.currentTitle}
                    </span>
                    <MixLine label={L.result.currentSkus} value={currentMix.skus} />
                    <MixLine label={L.result.currentAtRisk} value={currentMix.atRisk} tone="warn" />
                    <MixLine label={L.result.currentLowTurn} value={currentMix.lowTurn} tone="warn" />
                    <MixLine label={L.result.currentNotPos} value={currentMix.notPositivated} tone="warn" />
                  </div>
                  <div className="rounded-xl border-2 border-[#F4845F]/50 bg-[#F4845F]/[0.05] p-[1.2vmin] flex flex-col gap-[0.7vmin]">
                    <span className="text-[1.1vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                      {L.result.recommendedTitle}
                    </span>
                    <MixLine label={L.result.recKeep} value={recommendedMix.keep} />
                    <MixLine label={L.result.recInclude} value={recommendedMix.include} tone="good" />
                    <MixLine label={L.result.recSubstitute} value={recommendedMix.substitute} tone="accent" />
                    <MixLine label={L.result.recRemove} value={recommendedMix.remove} tone="bad" />
                    <MixLine label={L.result.recIncrease} value={recommendedMix.increase} tone="info" />
                  </div>
                </div>

                {/* Cart */}
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <div className="px-[1.4vmin] py-[0.9vmin] bg-white/[0.05] flex items-baseline justify-between border-b border-white/10">
                    <span className="text-[1.25vmin] tracking-[0.25em] uppercase font-semibold text-white/70">
                      {L.result.cartTitle}
                    </span>
                    <span className="text-[1.1vmin] text-white/50">{L.result.cartHint}</span>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr_1fr] px-[1.4vmin] py-[0.7vmin] bg-white/[0.02] text-[1.1vmin] uppercase tracking-[0.18em] font-semibold text-white/55">
                    <span>{L.result.colSku}</span>
                    <span className="text-center">{L.result.colAction}</span>
                    <span className="text-right">{L.result.colVolume}</span>
                  </div>
                  <div className="max-h-[38vmin] overflow-y-auto">
                    {cart.map((row) => {
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
                className="mt-auto self-stretch min-h-[7vmin] rounded-2xl bg-[#F4845F] text-white font-bold text-[2vmin] tracking-wide hover:bg-[#F4845F]/90 active:scale-[0.99] transition-all shadow-[0_0_28px_rgba(244,132,95,0.35)]"
              >
                {L.setup.cta}
              </button>
            )}

            {phase === 'running' && (
              <div className="mt-auto rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                <span className="text-[1.6vmin] text-white/90 font-semibold">{L.running}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
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
                phase === 'setup'
                  ? 'idle'
                  : phase === 'result'
                  ? 'done'
                  : i < progress
                  ? 'done'
                  : i === progress
                  ? 'active'
                  : 'idle';
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
                    <span className="text-[1.5vmin] leading-tight text-white/90 font-semibold">
                      {step.label}
                    </span>
                  </div>
                  <div className="pl-[3.4vmin]">
                    <p className="text-[1.15vmin] text-white/60 font-mono mb-[0.4vmin]">{step.micro}</p>
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

          {showResult && (
            <div className="mt-[1.4vmin] flex flex-col gap-[1vmin] flex-1">
              <div className="relative rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[1.6vmin] pr-[9vmin] text-[1.35vmin] text-white/95 leading-relaxed">
                <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.05vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.3vmin] h-[1.3vmin]" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
                  {selectedSku ? L.result.insightSkuTitle : L.result.insightGeneralTitle}
                </span>
                {selectedSku ? (
                  <>
                    <span className="block text-[1.45vmin] font-semibold text-white mb-[0.6vmin] leading-tight">
                      {selectedSku.name}
                    </span>
                    {selectedSku.reason}
                    <div className="mt-[1vmin] grid grid-cols-2 gap-[0.5vmin]">
                      <MiniStat label={L.result.drillTurn} value={selectedSku.turn} />
                      <MiniStat label={L.result.drillCoverage} value={selectedSku.coverage} />
                      <MiniStat label={L.result.drillCluster} value={selectedSku.cluster} />
                      <MiniStat label={L.result.drillPotential} value={selectedSku.potential} />
                    </div>
                    <div className="mt-[1vmin]">
                      <span className="block text-[1.1vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F] mb-[0.4vmin]">
                        {L.result.drillFactors}
                      </span>
                      <ul className="flex flex-col gap-[0.4vmin]">
                        {selectedSku.factors.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-[0.6vmin] text-[1.25vmin] text-white/85 leading-snug"
                          >
                            <span className="mt-[0.55vmin] w-[0.55vmin] h-[0.55vmin] rounded-full bg-[#F4845F] flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  generalInsight
                )}
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-auto w-full min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.55vmin] text-white/85 hover:text-white hover:border-white/50 active:scale-[0.98] transition"
              >
                {L.result.newSimulation}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <label className="rounded-xl border border-white/10 bg-white/[0.03] p-[1.2vmin] flex flex-col gap-[0.4vmin]">
    <span className="text-[1.05vmin] tracking-[0.2em] uppercase font-semibold text-white/50">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white text-[1.5vmin] font-semibold outline-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#0B1224]">
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

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
    <span className="text-[1vmin] tracking-[0.18em] uppercase font-semibold text-white/50 leading-tight">
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
