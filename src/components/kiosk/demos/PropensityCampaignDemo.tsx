import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import {
  channels,
  channelLabel,
  segments,
  periods,
  products,
  pipeline,
  computeResult,
  labels as L,
  type ChannelId,
  type SegmentId,
  type PeriodId,
} from '@/data/kiosk/demos/propensityCampaign';

type Phase = 'setup' | 'running' | 'result';

const fmt = (v: number) => v.toLocaleString('pt-BR');

const PropensityCampaignDemo = () => {
  const [productId, setProductId] = useState<string>(products[0].id);
  const [segment, setSegment] = useState<SegmentId>('active90');
  const [period, setPeriod] = useState<PeriodId>('14d');
  const [allowed, setAllowed] = useState<ChannelId[]>(['whatsapp', 'email', 'push']);
  const [phase, setPhase] = useState<Phase>('setup');
  const [progress, setProgress] = useState(0);
  const [argIndex, setArgIndex] = useState(0);
  const [drillOpen, setDrillOpen] = useState(false);

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? products[0],
    [productId],
  );

  const effectiveAllowed = allowed.length ? allowed : (['email'] as ChannelId[]);

  const result = useMemo(
    () => computeResult(product, segment, period, effectiveAllowed, argIndex),
    [product, segment, period, effectiveAllowed, argIndex],
  );

  const latencyMs = useMemo(() => {
    if (phase !== 'result') return '0.00';
    const base = 42 + (product.baseConversion * 2) + (allowed.length * 1.7);
    return base.toFixed(2);
  }, [phase, product.id, allowed.length]);

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

  const toggleChannel = (id: ChannelId) => {
    setAllowed((cur) => (cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]));
  };

  const reset = () => {
    setPhase('setup');
    setProgress(0);
    setDrillOpen(false);
    setArgIndex((i) => i + 1);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP — CRM setup or results */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          <div className="flex items-baseline justify-between px-[2.5vmin] py-[1.6vmin] bg-white/[0.04] border-b border-white/10">
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">
                {phase === 'result' ? L.result.title : L.crm.title}
              </h4>
              <p className="text-[1.4vmin] text-white/60">
                {phase === 'result' ? L.result.subtitle : L.crm.subtitle}
              </p>
            </div>
            <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
              {L.objective}
            </span>
          </div>

          <div className="p-[2.2vmin] flex flex-col gap-[1.6vmin]">
            {phase !== 'result' && (
              <>
                {/* Product */}
                <Section title={L.crm.product}>
                  <div className="grid grid-cols-2 gap-[0.8vmin]">
                    {products.map((p) => {
                      const active = p.id === productId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={phase === 'running'}
                          onClick={() => setProductId(p.id)}
                          className={`text-left rounded-xl border p-[1.3vmin] transition-all ${
                            active
                              ? 'border-[#F4845F] bg-[#F4845F]/10'
                              : 'border-white/15 bg-white/[0.03] hover:border-white/30'
                          }`}
                        >
                          <div className="text-[1.55vmin] font-semibold text-white leading-tight">
                            {p.name}
                          </div>
                          <div className="text-[1.2vmin] text-white/55 mt-[0.3vmin]">
                            {p.category} · {fmt(p.audienceTotal)} elegíveis
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Section>

                {/* Channels */}
                <Section title={L.crm.channels} hint={L.crm.channelsHint}>
                  <div className="flex flex-wrap gap-[0.6vmin]">
                    {channels.map((c) => {
                      const active = allowed.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          disabled={phase === 'running'}
                          onClick={() => toggleChannel(c.id)}
                          className={`min-h-[4.4vmin] px-[1.4vmin] rounded-full border text-[1.4vmin] font-semibold transition-all ${
                            active
                              ? 'border-[#F4845F] bg-[#F4845F]/15 text-white'
                              : 'border-white/20 bg-white/[0.03] text-white/70 hover:border-white/40'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </Section>

                {phase === 'setup' && (
                  <button
                    type="button"
                    onClick={() => setPhase('running')}
                    className="self-stretch min-h-[7vmin] rounded-2xl bg-[#F4845F] text-white font-bold text-[2vmin] tracking-wide hover:bg-[#F4845F]/90 active:scale-[0.99] transition-all shadow-[0_0_28px_rgba(244,132,95,0.35)]"
                  >
                    {L.crm.cta}
                  </button>
                )}

                {phase === 'running' && (
                  <div className="rounded-2xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.5vmin] flex items-center gap-[1.2vmin] animate-pulse">
                    <span className="w-[1.8vmin] h-[1.8vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                    <span className="text-[1.6vmin] text-white/90 font-semibold">{L.running}</span>
                  </div>
                )}
              </>
            )}

            {phase === 'result' && (
              <>
                {/* Priority table */}
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-[1.6fr_1fr_0.9fr] px-[1.4vmin] py-[1vmin] bg-white/[0.05] text-[1.2vmin] uppercase tracking-[0.2em] font-semibold text-white/60">
                    <span>{L.result.tableTier}</span>
                    <span className="text-right">{L.result.tableClients}</span>
                    <span className="text-right">{L.result.tablePropensity}</span>
                  </div>
                  {result.tiers.map((t, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-[1.6fr_1fr_0.9fr] px-[1.4vmin] py-[1.1vmin] items-center text-[1.55vmin] border-t border-white/10">
                        <span className="flex items-center gap-[0.8vmin]">
                          <span
                            className={`w-[1vmin] h-[1vmin] rounded-full ${
                              i === 0
                                ? 'bg-[#F4845F]'
                                : i === 1
                                ? 'bg-[#F4845F]/60'
                                : 'bg-white/40'
                            }`}
                          />
                          <span className="text-white/90 font-semibold">{t.tier}</span>
                        </span>
                        <span className="text-right text-white font-mono">{fmt(t.clients)}</span>
                        <span className="text-right text-white/90 font-mono">{t.propensityPct}%</span>
                      </div>
                      {t.channels.map((split, j) => (
                        <div
                          key={j}
                          className="grid grid-cols-[1.6fr_1fr_0.9fr] px-[1.4vmin] py-[0.8vmin] items-center text-[1.4vmin] border-t border-white/5 bg-white/[0.02]"
                        >
                          <span className="flex items-center gap-[0.6vmin] pl-[1.8vmin] text-white/70">
                            <span className="text-white/50">↳</span>
                            <span>{channelLabel(split.channel)}</span>
                          </span>
                          <span className="text-right text-white/80 font-mono">{fmt(split.clients)}</span>
                          <span />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* KPI row: reset button + 3 KPIs on the same line */}
                <div className="grid grid-cols-4 gap-[1vmin]">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-xl border border-white/25 bg-white/[0.04] text-[1.5vmin] font-semibold text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition px-[1.4vmin] py-[1.2vmin]"
                  >
                    {L.result.reset}
                  </button>
                  <ConclusionCard
                    label={L.result.audience}
                    value={fmt(result.recommendedAudience)}
                    hint={L.result.audienceHint}
                    highlight
                  />
                  <ConclusionCard
                    label={L.result.conversion}
                    value={`${result.conversionPct}%`}
                  />
                  <ConclusionCard
                    label={L.result.channel}
                    value={channelLabel(result.primaryChannel)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setDrillOpen(true)}
                  className="w-full min-h-[6vmin] rounded-full border border-[#F4845F]/60 bg-[#F4845F]/[0.08] text-[1.55vmin] text-white font-semibold hover:bg-[#F4845F]/[0.16] active:scale-[0.98] transition"
                >
                  {L.result.drillCta}
                </button>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM — reasoning: POR QUE + horizontal timeline */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="flex items-center gap-[1.2vmin] mb-[1.4vmin]">
            <span className="w-[4.2vmin] h-[4.2vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F]" />
            </span>
            <div>
              <h4 className="text-[1.9vmin] font-bold text-white leading-tight">{L.reasoningTitle}</h4>
              <p className="text-[1.35vmin] text-white/60">{L.reasoningSubtitle}</p>
            </div>
          </div>

          {/* Compact POR QUE above timeline */}
          {phase === 'result' && (
            <div className="mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[1.6vmin] py-[1.2vmin] animate-fade-in">
              <div className="flex items-center gap-[1vmin] mb-[0.5vmin]">
                <Sparkles className="w-[1.6vmin] h-[1.6vmin] text-[#F4845F]" strokeWidth={2.5} />
                <span className="text-[1.25vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                  {L.rationaleLabel}
                </span>
                <span className="ml-auto text-[1.15vmin] text-white/60 font-mono">
                  {L.latency}: {latencyMs} ms
                </span>
              </div>
              <p className="text-[1.5vmin] leading-snug text-white/95">{result.argument}</p>
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
        </div>
      </div>


      {/* Drill-down modal */}
      {drillOpen && phase === 'result' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0B1224]/85 backdrop-blur-sm rounded-3xl p-[3vmin]">
          <div className="w-full max-w-[62vmin] rounded-2xl bg-[#0B1224] border-2 border-[#F4845F]/50 p-[2.4vmin] shadow-[0_0_60px_rgba(244,132,95,0.25)]">
            <div className="flex items-center justify-between mb-[1.6vmin]">
              <div>
                <span className="text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                  {L.result.drillTitle}
                </span>
                <h5 className="text-[2.4vmin] font-bold text-white leading-tight mt-[0.2vmin]">
                  {result.drill.id}
                </h5>
              </div>
              <button
                type="button"
                onClick={() => setDrillOpen(false)}
                className="w-[4.4vmin] h-[4.4vmin] rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white hover:border-white/40 flex items-center justify-center"
                aria-label={L.result.drillClose}
              >
                <X className="w-[2vmin] h-[2vmin]" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-[1vmin]">
              <DrillRow label={L.result.drillTopProduct} value={result.drill.topProduct} />
              <DrillRow label={L.result.drillChannel} value={channelLabel(result.drill.channel)} />
              <DrillRow label={L.result.drillMoment} value={result.drill.moment} />
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-[1.4vmin]">
                <span className="block text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.8vmin]">
                  {L.result.drillFactors}
                </span>
                <ul className="flex flex-col gap-[0.6vmin]">
                  {result.drill.factors.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-[0.8vmin] text-[1.5vmin] text-white/85 leading-snug"
                    >
                      <span className="mt-[0.7vmin] w-[0.7vmin] h-[0.7vmin] rounded-full bg-[#F4845F] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDrillOpen(false)}
              className="mt-[1.8vmin] w-full min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.55vmin] text-white/85 hover:text-white hover:border-white/50 transition"
            >
              {L.result.drillClose}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-[1.4vmin]">
    <div className="flex items-baseline justify-between mb-[0.8vmin]">
      <span className="text-[1.25vmin] tracking-[0.25em] uppercase font-semibold text-white/70">
        {title}
      </span>
      {hint && <span className="text-[1.15vmin] text-white/45">{hint}</span>}
    </div>
    {children}
  </div>
);

const PillRow = ({
  options,
  value,
  onChange,
  disabled,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-wrap gap-[0.6vmin]">
    {options.map((o) => {
      const active = o.id === value;
      return (
        <button
          key={o.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(o.id)}
          className={`min-h-[4.4vmin] px-[1.4vmin] rounded-full border text-[1.4vmin] font-semibold transition-all ${
            active
              ? 'border-[#F4845F] bg-[#F4845F]/15 text-white'
              : 'border-white/20 bg-white/[0.03] text-white/70 hover:border-white/40'
          }`}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);

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
    className={`rounded-xl p-[1.4vmin] border ${
      highlight
        ? 'bg-[#F4845F]/12 border-[#F4845F]/50'
        : 'bg-white/[0.04] border-white/10'
    }`}
  >
    <span className="block text-[1.15vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.4vmin]">
      {label}
    </span>
    <span className="block text-[2.2vmin] font-bold text-white leading-tight">
      {value}
      {hint && <span className="text-[1.3vmin] font-normal text-white/55 ml-[0.6vmin]">{hint}</span>}
    </span>
  </div>
);

const DrillRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-white/[0.04] border border-white/10 px-[1.4vmin] py-[1vmin] flex items-baseline justify-between gap-[1vmin]">
    <span className="text-[1.2vmin] tracking-[0.25em] uppercase font-semibold text-white/60">
      {label}
    </span>
    <span className="text-[1.6vmin] text-white font-semibold text-right">{value}</span>
  </div>
);

export default PropensityCampaignDemo;
