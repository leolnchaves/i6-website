import { useEffect, useMemo, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
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

  // Latência fake por SKU — sempre abaixo da média de mercado (~180 ms)
  const latencyMs = useMemo(() => {
    if (!selectedId) return '0.00';
    return (22 + Math.random() * 26).toFixed(2);
  }, [selectedId]);


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
      timers.push(setTimeout(() => setProgress(i + 1), elapsed));
    });
    return () => timers.forEach(clearTimeout);
  }, [selected, content.pipeline]);

  const done = !!selected && progress >= content.pipeline.length;

  const reset = () => {
    setSelectedId(null);
    setProgress(0);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vmin] items-start">
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

            {!selected ? (
              <>
                {/* Attention hint */}
                <div className="mb-[1.5vmin] rounded-xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.4vmin] flex items-center gap-[1.2vmin] animate-pulse">
                  <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#F4845F]" />
                  <span className="text-[1.6vmin] text-white/90 font-semibold">
                    {content.pickHint}
                  </span>
                </div>

                {/* Product grid — NO price/margin visible */}
                <div className="grid grid-cols-2 gap-[1.5vmin]">
                  {content.products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className="text-left rounded-xl border-2 p-[1.5vmin] transition-all bg-white/[0.03] border-white/10 hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.06]"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-white/5 mb-[1vmin]">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="block text-[1.3vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.3vmin]">
                        {p.category}
                      </span>
                      <span className="block text-[1.6vmin] leading-tight text-white/90 font-semibold min-h-[3.6vmin]">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Zoom view — single product */
              <div className="flex flex-col animate-fade-in">
                <button
                  type="button"
                  onClick={reset}
                  className="self-start inline-flex items-center gap-[1vmin] min-h-[8vmin] px-[3vmin] py-[2vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.8vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition mb-[2vmin]"
                >
                  {content.backToCatalog}
                </button>


                <div className="rounded-2xl border-2 border-[#F4845F]/40 bg-white/[0.03] p-[2vmin]">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 mb-[1.5vmin]">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="block text-[1.4vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.4vmin]">
                    {selected.category}
                  </span>
                  <h5 className="text-[2.4vmin] leading-tight text-white font-bold mb-[1.5vmin]">
                    {selected.name}
                  </h5>

                  {/* Price reveal zone */}
                  <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-[2vmin] min-h-[10vmin] flex items-center justify-center">
                    {!done ? (
                      <div className="flex items-center gap-[1.5vmin] text-white/60">
                        <span className="w-[2vmin] h-[2vmin] rounded-full border-2 border-[#F4845F] border-t-transparent animate-spin" />
                        <span className="text-[1.6vmin]">{content.analyzingLabel}</span>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-between animate-fade-in">
                        <div>
                          <span className="block text-[1.3vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.4vmin]">
                            {content.idealPriceBadge}
                          </span>
                          <span
                            className="block text-[4.2vmin] font-bold text-white leading-none"
                            style={{ textShadow: '0 0 24px rgba(244,132,95,0.5)' }}
                          >
                            {currency(selected.recommendedPrice, lang)}
                          </span>
                        </div>
                        <span className="rounded-full bg-[#F4845F] text-white text-[1.4vmin] font-bold px-[1.6vmin] py-[0.8vmin] animate-pulse">
                          ✓
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — reasoning + conclusion */}
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

          <div className="flex flex-col gap-[1.4vmin]">
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

          {/* Conclusive panel — appears after pipeline is done */}
          {done && selected && (
            <div className="mt-[2vmin] rounded-2xl border border-[#F4845F]/50 bg-[#F4845F]/[0.08] p-[2vmin] animate-fade-in">
              <div className="flex items-center justify-between mb-[1.5vmin]">
                <span className="text-[1.6vmin] font-semibold text-white/90">{selected.name}</span>
                <span className="flex items-center gap-[0.6vmin] text-[1.4vmin] font-semibold text-[#F4845F]">
                  <Check className="w-[1.8vmin] h-[1.8vmin]" />
                  {content.doneLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[1.5vmin]">
                <MetricPill
                  label={content.productLabels.recommended}
                  value={currency(selected.recommendedPrice, lang)}
                  highlight
                />
                <MetricPill
                  label={content.productLabels.margin}
                  value={`${selected.recommendedMargin.toFixed(1)}% · +${selected.deltaMarginPct.toFixed(1)} pp`}
                  highlight
                />
                <MetricPill
                  label={content.productLabels.deltaRevenue}
                  value={`+${selected.deltaRevenuePct.toFixed(1)}%`}
                  highlight
                />
                <MetricPill
                  label={content.productLabels.latency}
                  value={`${latencyMs} ms`}
                  hint={content.productLabels.latencyHint}
                  highlight
                />
              </div>

              <div
                className="kiosk-insight-card relative mt-[1.5vmin] rounded-xl bg-[#F4845F]/15 border-2 border-[#F4845F]/70 p-[2.2vmin] pr-[10vmin] text-[1.9vmin] text-white/95 leading-relaxed"
              >
                <div className="absolute top-[1.4vmin] right-[1.4vmin] flex items-center gap-[0.6vmin] px-[1.2vmin] py-[0.5vmin] rounded-full bg-[#F4845F] text-white text-[1.2vmin] font-bold uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,132,95,0.6)]">
                  <Sparkles className="w-[1.6vmin] h-[1.6vmin] kiosk-insight-sparkle" strokeWidth={2.5} />
                  <span>Insight</span>
                </div>
                <span className="block text-[1.5vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[1vmin]">
                  {content.rationaleLabel}
                </span>
                {selected.insight}
              </div>

            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes kiosk-progress {
          from { width: 0% }
          to { width: 100% }
        }
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
            kiosk-insight-in .5s ease-out .6s both,
            kiosk-insight-glow 2.4s ease-in-out .6s infinite;
        }
        .kiosk-insight-sparkle {
          animation: kiosk-insight-sparkle 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const MetricPill = ({
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
    className={`rounded-lg p-[1.2vmin] border bg-white/[0.03] border-white/10`}
  >
    <span className="block text-[1.2vmin] tracking-[0.2em] uppercase font-semibold text-[#F4845F] mb-[0.3vmin]">
      {label}
    </span>
    <span className="block text-[2vmin] font-bold text-[#F4845F] leading-none">{value}</span>
    {hint && (
      <span className="block mt-[0.6vmin] text-[1.1vmin] text-white/50 leading-none">{hint}</span>
    )}
  </div>
);


export default PriceToMarginDemo;
