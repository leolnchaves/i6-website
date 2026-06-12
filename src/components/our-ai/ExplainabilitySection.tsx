import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['explainability'];
}

const ExplainabilitySection = memo(({ content }: Props) => {
  return (
    <section className="relative py-12 md:py-16 bg-[#0A101F] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 relative">
          {content.steps.map((step, idx) => (
            <div key={step.title} className="relative">
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02] h-full">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[#F4845F] text-xl font-mono font-bold">0{idx + 1}</span>
                  <h3 className="text-base md:text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-xs text-white/55 leading-relaxed mb-5">{step.description}</p>

                {/* Sample feature table */}
                {step.sample && (
                  <div className="border border-white/10 rounded p-3 bg-[#0B1224]">
                    <p className="text-[10px] text-white/45 mb-2 font-mono">Data 0 — {step.sample.sku}</p>
                    <ul className="space-y-1.5">
                      {step.sample.rows.map((r) => (
                        <li key={r.feature} className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-white/55 truncate pr-2">{r.feature}</span>
                          <span className={r.weight.startsWith('+') ? 'text-[#F4845F]' : 'text-white/35'}>
                            {r.weight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cards stack */}
                {step.cards && (
                  <ul className="space-y-2">
                    {step.cards.map((c) => (
                      <li
                        key={c.title}
                        className="border border-white/10 rounded p-3 bg-[#0B1224]"
                      >
                        <p className="text-xs font-semibold text-white uppercase tracking-wide">{c.title}</p>
                        <p className="text-[11px] text-white/50 mt-0.5">{c.subtitle}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Arrow between cards (desktop only) */}
              {idx < content.steps.length - 1 && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#F4845F]"
                  aria-hidden="true"
                >
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M0 6h16m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExplainabilitySection.displayName = 'ExplainabilitySection';
export default ExplainabilitySection;
