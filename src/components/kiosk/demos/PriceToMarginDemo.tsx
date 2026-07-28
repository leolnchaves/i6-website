import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import type { KioskLang } from '@/data/kiosk/config';
import { priceToMarginDemo, type DemoProduct } from '@/data/kiosk/demos/priceToMargin';

interface Props {
  lang: KioskLang;
}

const currency = (v: number, lang: KioskLang) =>
  lang === 'pt'
    ? `R$ ${v.toFixed(2).replace('.', ',')}`
    : `$ ${v.toFixed(2)}`;

const uiCopy = {
  pt: {
    explainTitle: 'Explicabilidade e raciocínio do modelo',
    whyEyebrow: 'Por que este preço',
    defaultWhy: 'O modelo cruza intenção da sessão, elasticidade por SKU e piso de margem para achar o preço com maior probabilidade de conversão.',
    newSim: 'Nova simulação',
  },
  en: {
    explainTitle: 'Model reasoning & explainability',
    whyEyebrow: 'Why this price',
    defaultWhy: 'The model blends session intent, per-SKU elasticity and margin floor to find the price with the highest conversion probability.',
    newSim: 'New simulation',
  },
} as const;

const PriceToMarginDemo = ({ lang }: Props) => {
  const content = priceToMarginDemo[lang];
  const ui = uiCopy[lang];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const selected = useMemo<DemoProduct | null>(
    () => content.products.find((p) => p.id === selectedId) ?? null,
    [content.products, selectedId],
  );

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
  const running = !!selected && !done;

  const reset = () => {
    setSelectedId(null);
    setProgress(0);
  };

  const N = content.pipeline.length;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[3vmin]">
      <div className="flex flex-col gap-[2.4vmin]">
        {/* TOP CARD — scenario / product */}
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
                <div className="mb-[1.5vmin] rounded-xl border border-[#F4845F]/40 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.4vmin] flex items-center gap-[1.2vmin] animate-pulse">
                  <span className="w-[1.4vmin] h-[1.4vmin] rounded-full bg-[#F4845F]" />
                  <span className="text-[1.6vmin] text-white/90 font-semibold">
                    {content.pickHint}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-[1.5vmin]">
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
              <div className="flex flex-col animate-fade-in">
                <button
                  type="button"
                  onClick={reset}
                  className="group self-start inline-flex items-center gap-[1vmin] min-h-[6vmin] px-[2.4vmin] py-[1.4vmin] rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/15 shadow-md text-[1.5vmin] font-semibold uppercase tracking-[0.14em] text-white active:scale-[0.98] transition mb-[1.6vmin]"
                >
                  <ArrowLeft className="w-[1.8vmin] h-[1.8vmin] transition-transform group-hover:-translate-x-[0.3vmin]" strokeWidth={2.5} />
                  {content.backToCatalog.replace(/^←\s*/, '')}
                </button>

                <div className="rounded-2xl border-2 border-[#F4845F]/40 bg-white/[0.03] p-[2vmin]">
                  <div className="grid grid-cols-[1fr_1.4fr] gap-[2vmin] items-stretch">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                      <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="block text-[1.4vmin] uppercase tracking-wider text-[#F4845F]/80 font-semibold mb-[0.4vmin]">
                        {selected.category}
                      </span>
                      <h5 className="text-[2.4vmin] leading-tight text-white font-bold mb-[1.5vmin]">
                        {selected.name}
                      </h5>

                      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-[2vmin] min-h-[10vmin] flex items-center justify-center flex-1">
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

                  {done && (
                    <div className="grid grid-cols-4 gap-[1vmin] mt-[1.5vmin] animate-fade-in">
                      <MetricPill
                        label={content.productLabels.recommended}
                        value={currency(selected.recommendedPrice, lang)}
                        highlight
                      />
                      <MetricPill
                        label={content.productLabels.deltaConversion}
                        value={`+${selected.deltaConversionPct.toFixed(1)}%`}
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM CARD — POR QUE + horizontal timeline */}
        <div className="rounded-2xl bg-[#0B1224] border border-white/10 p-[2vmin]">
          <div className="mb-[1.4vmin]">
            <h4 className="text-[1.9vmin] font-bold text-white leading-tight">
              {ui.explainTitle}
            </h4>
            {content.reasoningSubtitle && (
              <p className="text-[1.4vmin] text-white/60">{content.reasoningSubtitle}</p>
            )}
          </div>

          {done && selected && (
            <div className="kiosk-insight-card mb-[1.4vmin] rounded-xl border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] px-[2vmin] py-[1.8vmin]">
              <div className="flex items-center gap-[1vmin] mb-[0.8vmin]">
                <Sparkles className="w-[2.2vmin] h-[2.2vmin] text-[#F4845F] kiosk-insight-sparkle" strokeWidth={2.5} />
                <span className="text-[1.7vmin] tracking-[0.25em] uppercase font-bold text-[#F4845F]">
                  {ui.whyEyebrow}
                </span>
              </div>
              <span className="block text-[1.7vmin] font-semibold text-white mb-[0.6vmin] leading-tight">
                {selected.name} · {currency(selected.recommendedPrice, lang)}
              </span>
              <p className="text-[1.7vmin] leading-relaxed text-white/95">{selected.insight}</p>
            </div>
          )}

          {/* Micro-metric of active step */}
          <div className="h-[2vmin] mb-[1vmin] flex items-center justify-center">
            {running && progress < N && (
              <span className="text-[1.2vmin] text-white/60 font-mono">
                {content.pipeline[progress].microMetric}
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
                  N > 1 ? Math.min(progress, N - 1) / (N - 1) : 0
                })`,
              }}
            />
            <div
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}
            >
              {content.pipeline.map((step, i) => {
                const state = !selected
                  ? 'idle'
                  : i < progress
                  ? 'done'
                  : i === progress
                  ? 'active'
                  : 'idle';
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
                      {step.microMetric}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {done && (
            <button
              type="button"
              onClick={reset}
              className="mt-[1.4vmin] w-full min-h-[6vmin] rounded-full border border-white/25 bg-white/[0.04] text-[1.6vmin] text-white/85 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.08] active:scale-[0.98] transition"
            >
              {ui.newSim}
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
  <div className="rounded-lg p-[1.2vmin] border bg-white/[0.03] border-white/10">
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
