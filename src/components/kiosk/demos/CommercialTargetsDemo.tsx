import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Check, Minus, Shuffle, Sparkles, X } from 'lucide-react';
import {
  dimensions,
  fmtBR,
  fmtBRL,
  fmtCAC,
  getAllocation,
  getDimRows,
  labels as L,
  pipeline,
  computeResult,
  type AggregatedRow,
  type DimensionId,
} from '@/data/kiosk/demos/commercialTargets';


type Phase = 'setup' | 'running' | 'result';

const DASH = '—';

const CommercialTargetsDemo = () => {
  const [dim, setDim] = useState<DimensionId>('region');
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [argIndex, setArgIndex] = useState(0);
  const [drillRow, setDrillRow] = useState<AggregatedRow | null>(null);

  const result = useMemo(
    () =>
      computeResult({
        period: 'quarter',
        region: 'all',
        rep: 'all',
        portfolio: 'all',
        category: 'all',
        budget: 'b500',
        argIndex,
      }),
    [argIndex],
  );

  const dimRows = useMemo(() => getDimRows(result), [result]);
  const activeRows = dimRows[dim] ?? [];
  const activeAllocation = useMemo(() => getAllocation(result, dim), [result, dim]);


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
    setDrillRow(null);
    setArgIndex((i) => i + 1);
  };

  const showProjected = phase === 'result';
  const rowsToShow = activeRows.slice(0, 6);


  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-[1.3fr_1fr] gap-[3vmin] items-stretch">
        {/* LEFT — tables + KPIs + highlights */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col h-full">
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10 gap-[1vmin]">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {L.result.title}
              </h4>
              <p className="text-[1.4vmin] text-white/60">{L.result.subtitle}</p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] text-right">
              {L.objective}
            </span>
          </div>

          <div className="p-[2.2vmin] flex-1 flex flex-col gap-[1.4vmin]">
            {/* Dimension switcher — available in setup and after result */}
            <div className="flex flex-wrap gap-[0.6vmin]">
              {dimensions.map((d) => {
                const active = d.id === dim;
                return (
                  <button
                    key={d.id}
                    type="button"
                    disabled={phase === 'running'}
                    onClick={() => {
                      setDim(d.id);
                      setDrillRow(null);
                    }}
                    className={`min-h-[3.8vmin] px-[1.4vmin] rounded-full border text-[1.3vmin] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      active
                        ? 'border-[#F4845F] bg-[#F4845F]/15 text-white'
                        : 'border-white/20 bg-white/[0.03] text-white/70 hover:border-white/40'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>

            {/* Target table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr] px-[1.4vmin] py-[1vmin] bg-white/[0.05] text-[1.15vmin] uppercase tracking-[0.2em] font-semibold text-white/60">
                <span>{dimensions.find((d) => d.id === dim)?.label}</span>

                <span className="text-right">{L.result.tableCurrent}</span>
                <span className="text-right">{L.result.tableSuggested}</span>
                <span className="text-right">{L.result.tablePotential}</span>
                <span className="text-right">{L.result.tableDelta}</span>
              </div>
              {rowsToShow.map((r) => {
                const RowTag: any = showProjected ? 'button' : 'div';
                return (
                  <RowTag
                    key={r.key}
                    {...(showProjected
                      ? { type: 'button', onClick: () => setDrillRow(r) }
                      : {})}
                    className={`w-full grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr] px-[1.4vmin] py-[1.1vmin] items-center text-[1.4vmin] border-t border-white/10 text-left ${
                      showProjected ? 'hover:bg-white/[0.04] transition' : ''
                    }`}
                  >
                    <span className="text-white/90 font-semibold leading-tight">
                      {r.label}
                      {r.sublabel && (
                        <span className="block text-[1.1vmin] font-normal text-white/50">
                          {r.sublabel}
                        </span>
                      )}
                    </span>
                    <span className="text-right text-white/80 font-mono">{fmtBR(r.current)}</span>
                    <span className="text-right text-white font-mono font-semibold">
                      {showProjected ? fmtBR(r.suggested) : DASH}
                    </span>
                    <span className="text-right text-white/70 font-mono">
                      {showProjected ? fmtBR(r.potential) : DASH}
                    </span>
                    <span
                      className={`text-right font-mono font-semibold flex items-center justify-end gap-[0.4vmin] ${
                        !showProjected
                          ? 'text-white/40'
                          : r.action === 'up'
                          ? 'text-[#4ade80]'
                          : r.action === 'down'
                          ? 'text-[#F4845F]'
                          : 'text-white/60'
                      }`}
                    >
                      {showProjected ? (
                        <>
                          {r.action === 'up' ? (
                            <ArrowUp className="w-[1.4vmin] h-[1.4vmin]" />
                          ) : r.action === 'down' ? (
                            <ArrowDown className="w-[1.4vmin] h-[1.4vmin]" />
                          ) : (
                            <Minus className="w-[1.4vmin] h-[1.4vmin]" />
                          )}
                          {r.deltaPct > 0 ? '+' : ''}
                          {r.deltaPct.toFixed(0)}%
                        </>
                      ) : (
                        DASH
                      )}
                    </span>
                  </RowTag>
                );
              })}
            </div>

            {/* Allocation table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="px-[1.4vmin] py-[0.9vmin] bg-white/[0.05] flex items-baseline justify-between">
                <span className="text-[1.25vmin] tracking-[0.25em] uppercase font-semibold text-white/70">
                  {L.result.allocationTitle}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_0.9fr_0.9fr_0.9fr_0.9fr_0.9fr] px-[1.4vmin] py-[0.8vmin] bg-white/[0.02] text-[1.1vmin] uppercase tracking-[0.18em] font-semibold text-white/55 border-t border-white/10">
                <span>{dimensions.find((d) => d.id === dim)?.label}</span>
                <span className="text-right">{L.result.allocationGrowth}</span>
                <span className="text-right">{L.result.allocationCurrent}</span>
                <span className="text-right">{L.result.allocationSuggested}</span>
                <span className="text-right">{L.result.allocationCac}</span>
                <span className="text-right" />
              </div>
              {activeAllocation.map((a) => (
                <div
                  key={a.key}
                  className="grid grid-cols-[1fr_0.9fr_0.9fr_0.9fr_0.9fr_0.9fr] px-[1.4vmin] py-[1vmin] items-center text-[1.35vmin] border-t border-white/10"
                >
                  <span className="text-white/90 font-semibold leading-tight">
                    {a.label}
                    {a.sublabel && (
                      <span className="block text-[1.1vmin] font-normal text-white/50">
                        {a.sublabel}
                      </span>
                    )}
                  </span>
                  <span className="text-right text-white font-mono">
                    {showProjected ? `+${a.growthPct}%` : DASH}
                  </span>
                  <span className="text-right text-white/70 font-mono">
                    {fmtBRL(a.currentInvestment)}
                  </span>
                  <span className="text-right text-white font-mono font-semibold">
                    {showProjected ? fmtBRL(a.suggestedInvestment) : DASH}
                  </span>
                  <span className="text-right text-white/80 font-mono">
                    {showProjected ? fmtCAC(a.cac) : DASH}
                  </span>
                  <span className="text-right">
                    {showProjected ? <ActionBadge action={a.action} /> : <span className="text-white/40 text-[1.2vmin]">{DASH}</span>}
                  </span>
                </div>

              ))}
            </div>

            {/* KPIs + Highlights only after result */}
            {showProjected && (
              <>
                <div className="grid grid-cols-2 gap-[1vmin]">
                  <ConclusionCard
                    label={L.result.kpiVolume}
                    value={`${fmtBR(result.kpis.incrementalVolume)} un.`}
                    highlight
                  />
                  <ConclusionCard
                    label={L.result.kpiTotalTarget}
                    value={`${fmtBR(result.kpis.totalTarget)} un.`}
                  />
                  <ConclusionCard
                    label={L.result.kpiInvestment}
                    value={fmtBRL(result.kpis.suggestedInvestment)}
                  />
                  <ConclusionCard
                    label={L.result.kpiCac}
                    value={fmtCAC(result.kpis.projectedCac)}
                  />
                </div>


              </>
            )}

            {/* CTA to calculate (only in setup on the left side) */}
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

        {/* RIGHT — reasoning steps (always) + POR QUE + Nova simulação */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin] flex flex-col h-full">
          <div className="flex items-center gap-[1.2vmin] mb-[1.2vmin]">
            <span className="w-[4.2vmin] h-[4.2vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />
            </span>
            <div className="flex-1">
              <h4 className="text-[2vmin] font-bold text-white leading-tight">
                {L.reasoningTitle}
              </h4>
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
                    <p className="text-[1.15vmin] text-white/60 font-mono mb-[0.4vmin]">
                      {step.micro}
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
            <>
              <div className="relative mt-[1.4vmin] rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[1.6vmin] pr-[9vmin] text-[1.35vmin] text-white/95 leading-relaxed">
                <div className="absolute top-[1.2vmin] right-[1.2vmin] flex items-center gap-[0.5vmin] px-[1vmin] py-[0.4vmin] rounded-full bg-[#F4845F] text-white text-[1.05vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.3vmin] h-[1.3vmin]" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
                  {L.result.mixTitle}
                </span>
                {result.rationale.increase}
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-auto min-h-[5.4vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.45vmin] text-white/85 hover:text-white hover:border-white/50 active:scale-[0.98] transition"
                style={{ marginTop: '1.4vmin' }}
              >
                {L.result.newSimulation}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Drill-down modal */}
      {drillRow && phase === 'result' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0B1224]/85 backdrop-blur-sm rounded-3xl p-[3vmin]">
          <div className="w-full max-w-[70vmin] rounded-2xl bg-[#0B1224] border-2 border-[#F4845F]/50 p-[2.4vmin] shadow-[0_0_60px_rgba(244,132,95,0.25)]">
            <div className="flex items-center justify-between mb-[1.6vmin]">
              <div>
                <span className="text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                  {L.result.drillTitle}
                </span>
                <h5 className="text-[2.4vmin] font-bold text-white leading-tight mt-[0.2vmin]">
                  {drillRow.label}
                </h5>
                {drillRow.sublabel && (
                  <span className="text-[1.3vmin] text-white/55">{drillRow.sublabel}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDrillRow(null)}
                className="w-[4.4vmin] h-[4.4vmin] rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white hover:border-white/40 flex items-center justify-center"
                aria-label={L.result.drillClose}
              >
                <X className="w-[2vmin] h-[2vmin]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-[1vmin] mb-[1.4vmin]">
              <MiniStat label={L.result.tableCurrent} value={`${fmtBR(drillRow.current)} un.`} />
              <MiniStat
                label={L.result.tableSuggested}
                value={`${fmtBR(drillRow.suggested)} un.`}
                highlight
              />
              <MiniStat label={L.result.tablePotential} value={`${fmtBR(drillRow.potential)} un.`} />
            </div>

            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-[1.4vmin] mb-[1.2vmin]">
              <span className="block text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                {L.result.drillFactors}
              </span>
              <ul className="flex flex-col gap-[0.6vmin]">
                {buildFactors(drillRow).map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[0.8vmin] text-[1.45vmin] text-white/85 leading-snug"
                  >
                    <span className="mt-[0.7vmin] w-[0.7vmin] h-[0.7vmin] rounded-full bg-[#F4845F] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#F4845F]/12 border border-[#F4845F]/40 p-[1.4vmin] text-[1.35vmin] text-white/95 leading-relaxed">
              <span className="block text-[1.1vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.5vmin]">
                {drillRow.action === 'down' ? 'Por que reduzir' : drillRow.action === 'up' ? 'Por que aumentar' : 'Por que manter'}
              </span>
              {drillRow.action === 'down'
                ? result.rationale.decrease
                : drillRow.action === 'up'
                ? result.rationale.target
                : 'A meta atual já está alinhada ao potencial projetado. A recomendação é manter o esforço comercial e monitorar a captura ao longo do período.'}
            </div>

            <button
              type="button"
              onClick={() => setDrillRow(null)}
              className="mt-[1.4vmin] w-full min-h-[5.4vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.45vmin] text-white/85 hover:text-white hover:border-white/50 transition"
            >
              {L.result.drillClose}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const buildFactors = (r: AggregatedRow): string[] => {
  const delta = Math.round(r.suggested - r.current);
  const headroom = Math.round(r.potential - r.suggested);
  const base: string[] = [];
  if (r.action === 'up') {
    base.push(`Volume histórico consistente e frequência de compra crescente na dimensão selecionada.`);
    base.push(`Capacidade incremental de aproximadamente ${fmtBR(Math.max(0, delta))} unidades acima da meta atual.`);
    base.push(`Folga de potencial ainda não capturada: ${fmtBR(Math.max(0, headroom))} unidades.`);
    base.push(`Investimento incremental necessário permanece dentro do limite de CAC definido.`);
  } else if (r.action === 'down') {
    base.push(`Meta atual acima do potencial projetado — exigiria aumento desproporcional de investimento.`);
    base.push(`Redução libera ${fmtBR(Math.max(0, r.current - r.suggested))} unidades de pressão comercial.`);
    base.push(`Vendedor ou canal opera próximo do teto de cobertura razoável.`);
    base.push(`Recursos podem ser redirecionados para clientes/SKUs com maior capacidade de crescimento.`);
  } else {
    base.push(`Meta atual alinhada ao potencial projetado dentro do horizonte do período.`);
    base.push(`Cobertura e investimento sustentam a captura sem estressar o CAC.`);
    base.push(`Monitorar aceleração ou desaceleração de frequência de compra ao longo do ciclo.`);
  }
  return base;
};

const ConclusionCard = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl p-[1.3vmin] border ${
      highlight ? 'bg-[#F4845F]/12 border-[#F4845F]/50' : 'bg-white/[0.04] border-white/10'
    }`}
  >
    <span className="block text-[1.05vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.4vmin]">
      {label}
    </span>
    <span className="block text-[2vmin] font-bold text-white leading-tight">{value}</span>
  </div>
);

const HighlightLine = ({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone?: 'warn';
}) => (
  <div className="flex items-baseline gap-[0.8vmin] text-[1.3vmin] leading-tight">
    <span className="text-[1.05vmin] uppercase tracking-[0.2em] font-semibold text-white/55 w-[16vmin] flex-shrink-0">
      {label}
    </span>
    <span className="flex flex-wrap gap-[0.4vmin]">
      {items.filter(Boolean).map((it, i) => (
        <span
          key={i}
          className={`px-[0.9vmin] py-[0.25vmin] rounded-full text-[1.2vmin] font-semibold border ${
            tone === 'warn'
              ? 'bg-[#F4845F]/15 border-[#F4845F]/40 text-white'
              : 'bg-white/[0.06] border-white/15 text-white/90'
          }`}
        >
          {it}
        </span>
      ))}
    </span>
  </div>
);

const ActionBadge = ({ action }: { action: 'up' | 'down' | 'redistribute' }) => {
  if (action === 'up')
    return (
      <span className="inline-flex items-center gap-[0.4vmin] px-[0.9vmin] py-[0.3vmin] rounded-full text-[1.1vmin] font-bold bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/40">
        <ArrowUp className="w-[1.3vmin] h-[1.3vmin]" /> Aumentar
      </span>
    );
  if (action === 'down')
    return (
      <span className="inline-flex items-center gap-[0.4vmin] px-[0.9vmin] py-[0.3vmin] rounded-full text-[1.1vmin] font-bold bg-[#F4845F]/15 text-[#F4845F] border border-[#F4845F]/40">
        <ArrowDown className="w-[1.3vmin] h-[1.3vmin]" /> Reduzir
      </span>
    );
  return (
    <span className="inline-flex items-center gap-[0.4vmin] px-[0.9vmin] py-[0.3vmin] rounded-full text-[1.1vmin] font-bold bg-white/[0.06] text-white/85 border border-white/25">
      <Shuffle className="w-[1.3vmin] h-[1.3vmin]" /> Redistribuir
    </span>
  );
};

const MiniStat = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl p-[1.2vmin] border ${
      highlight ? 'bg-[#F4845F]/12 border-[#F4845F]/50' : 'bg-white/[0.04] border-white/10'
    }`}
  >
    <span className="block text-[1.05vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.3vmin]">
      {label}
    </span>
    <span className="block text-[1.8vmin] font-bold text-white leading-tight">{value}</span>
  </div>
);

export default CommercialTargetsDemo;
