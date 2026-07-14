import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles, TrendingUp } from 'lucide-react';
import type { KioskLang } from '@/data/kiosk/config';
import { priceToMarginDemo, type DemoProduct } from '@/data/kiosk/demos/priceToMargin';

interface Props {
  lang: KioskLang;
}

const currency = (v: number, lang: KioskLang) =>
  lang === 'pt'
    ? `R$ ${v.toFixed(2).replace('.', ',')}`
    : `$ ${v.toFixed(2)}`;

const PriceToMarginDemo = ({ lang }: Props) => {
  const content = priceToMarginDemo[lang];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // 0..pipeline.length

  const selected = useMemo<DemoProduct | null>(
    () => content.products.find((p) => p.id === selectedId) ?? null,
    [content.products, selectedId],
  );

  // Advance pipeline steps when a product is selected
  useEffect(() => {
    if (!selected) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    content.pipeline.forEach((step, i) => {
      elapsed += step.durationMs;
      timers.push(
        setTimeout(() => {
          setProgress(i + 1);
        }, elapsed),
      );
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selected, content.pipeline]);

  // Interpolate price/margin as steps advance
  const t = selected ? Math.min(progress / content.pipeline.length, 1) : 0;
  const livePrice = selected ? selected.currentPrice + (selected.recommendedPrice - selected.currentPrice) * t : 0;
  const liveMargin = selected ? selected.currentMargin + (selected.recommendedMargin - selected.currentMargin) * t : 0;
  const done = selected && progress >= content.pipeline.length;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vmin]">
        {/* LEFT — scenario */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 overflow-hidden flex flex-col">
          {/* Fake browser bar */}
          <div className="flex items-center gap-[1vmin] px-[2vmin] py-[1.5vmin] bg-white/[0.04] border-b border-white/10">
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ff5f56]" />
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#ffbd2e]" />
            <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#27c93f]" />
            <span className="ml-[1.5vmin] text-[1.4vmin] text-white/50 font-mono">
              vivashop.b2b / {content.catalogLabel.toLowerCase()}
            </span>
          </div>

          <div className="p-[2.5vmin] flex-1 flex flex-col">
            <div className="flex items-baseline justify-between mb-[1.5vmin]">
              <div>
                <h4 className="text-[2.4vmin] font-bold text-white">{content.scenarioTitle}</h4>
                <p className="text-[1.6vmin] text-white/60">{content.scenarioSubtitle}</p>
              </div>
              <span className="text-[1.4vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F]">
                {content.objectiveLabel}
              </span>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-[1.5vmin]">
              {content.products.map((p) => {
                const isActive = selectedId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`text-left rounded-xl border-2 p-[1.5vmin] transition-all bg-white/[0.03] ${
                      isActive
                        ? 'border-[#F4845F] shadow-[0_0_20px_rgba(244,132,95,0.3)] bg-[#F4845F]/10'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5 mb-[1vmin]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="block text-[1.3vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.3vmin]">
                      {p.category}
                    </span>
                    <span className="block text-[1.6vmin] leading-tight text-white/90 font-semibold mb-[0.8vmin] min-h-[3.6vmin]">
                      {p.name}
                    </span>
                    <div className="flex justify-between text-[1.4vmin] text-white/60">
                      <span>{currency(p.currentPrice, lang)}</span>
                      <span>{p.currentMargin.toFixed(1)}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected product live panel */}
            {selected ? (
              <div className="mt-[2vmin] rounded-xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] p-[2vmin]">
                <div className="flex items-center justify-between mb-[1.2vmin]">
                  <span className="text-[1.5vmin] font-semibold text-white/90">{selected.name}</span>
                  {done && (
                    <span className="flex items-center gap-[0.6vmin] text-[1.3vmin] font-semibold text-[#F4845F]">
                      <Check className="w-[1.8vmin] h-[1.8vmin]" />
                      {content.doneLabel}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-[1.5vmin]">
                  <MetricPill
                    label={content.productLabels.recommended}
                    value={currency(livePrice, lang)}
                    highlight={done}
                  />
                  <MetricPill
                    label={content.productLabels.margin}
                    value={`${liveMargin.toFixed(1)}%`}
                    highlight={done}
                  />
                  {done && (
                    <>
                      <MetricPill
                        label={content.productLabels.deltaRevenue}
                        value={`+${selected.deltaRevenuePct.toFixed(1)}%`}
                        highlight
                      />
                      <MetricPill
                        label={content.productLabels.deltaMargin}
                        value={`+${selected.deltaMarginPct.toFixed(1)} pp`}
                        highlight
                      />
                    </>
                  )}
                </div>
                {done && (
                  <button
                    type="button"
                    className="mt-[1.5vmin] w-full rounded-lg bg-[#F4845F] text-white text-[1.8vmin] font-semibold py-[1.5vmin] flex items-center justify-center gap-[1vmin]"
                    disabled
                  >
                    <TrendingUp className="w-[2vmin] h-[2vmin]" />
                    {content.ctaLabel}
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-[2vmin] text-[1.6vmin] text-white/50 text-center py-[2vmin]">
                {content.pickHint}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — reasoning */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2.5vmin] flex flex-col">
          <div className="flex items-center gap-[1.5vmin] mb-[2vmin]">
            <span className="w-[5vmin] h-[5vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
              <Sparkles className="w-[2.6vmin] h-[2.6vmin] text-[#F4845F]" />
            </span>
            <div>
              <h4 className="text-[2.2vmin] font-bold text-white leading-tight">{content.reasoningTitle}</h4>
              <p className="text-[1.5vmin] text-white/60">{content.reasoningSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-[1.4vmin] flex-1">
            {content.pipeline.map((step, i) => {
              const state = !selected
                ? 'idle'
                : i < progress
                ? 'done'
                : i === progress
                ? 'active'
                : 'idle';
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-[1.8vmin] transition-all ${
                    state === 'active'
                      ? 'border-[#F4845F] bg-[#F4845F]/10'
                      : state === 'done'
                      ? 'border-white/20 bg-white/[0.04]'
                      : 'border-white/10 bg-white/[0.02] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-[1.5vmin] mb-[0.8vmin]">
                    <span
                      className={`flex-shrink-0 w-[2.8vmin] h-[2.8vmin] rounded-full flex items-center justify-center text-[1.4vmin] font-bold border-2 ${
                        state === 'done'
                          ? 'bg-[#F4845F] border-[#F4845F] text-white'
                          : state === 'active'
                          ? 'border-[#F4845F] text-[#F4845F]'
                          : 'border-white/30 text-white/50'
                      }`}
                    >
                      {state === 'done' ? <Check className="w-[1.6vmin] h-[1.6vmin]" /> : i + 1}
                    </span>
                    <span className="text-[1.8vmin] leading-tight text-white/90 font-semibold">
                      {step.label}
                    </span>
                  </div>
                  <div className="pl-[4.3vmin]">
                    <p className="text-[1.4vmin] text-white/60 font-mono mb-[0.6vmin]">
                      {step.microMetric}
                    </p>
                    {state === 'active' && (
                      <div className="h-[0.4vmin] rounded-full bg-white/10 overflow-hidden">
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

          {selected && (
            <div className="mt-[1.5vmin] rounded-xl bg-white/[0.03] border border-white/10 p-[1.5vmin] text-[1.4vmin] text-white/70 leading-snug">
              <strong className="text-[#F4845F]">·</strong> {selected.insight}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes kiosk-progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
};

const MetricPill = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-lg p-[1.2vmin] border ${
      highlight ? 'bg-[#F4845F]/15 border-[#F4845F]/50' : 'bg-white/5 border-white/10'
    }`}
  >
    <span className="block text-[1.2vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F] mb-[0.3vmin]">
      {label}
    </span>
    <span className="block text-[2vmin] font-bold text-white leading-none">{value}</span>
  </div>
);

export default PriceToMarginDemo;
