import { memo, Fragment } from 'react';
import { Target, Filter, Compass } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['thesis'];
}

const icons = [Target, Filter, Compass];

const ThesisSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] text-center mb-4">
          {content.eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 max-w-3xl mx-auto leading-tight">
          {content.title}
        </h2>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <div key={p.title} className="text-center md:text-left">
                <Icon size={22} strokeWidth={1.25} className="text-[#F4845F] mx-auto md:mx-0 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>

        {/* Behavior → Outcome flow */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 md:gap-2 mb-8 text-left">
            {content.stages.map((stage, idx) => (
              <Fragment key={stage.label}>
                <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
                    Step 0{idx + 1}
                  </p>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">{stage.label}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{stage.detail}</p>

                  {idx === 1 && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 flex-wrap">
                      {content.journey.map((j, jIdx) => (
                        <span key={j} className="flex items-center gap-2">
                          <span className="text-xs text-white/70 italic">{j}</span>
                          {jIdx < content.journey.length - 1 && (
                            <span className="text-[#F4845F]/60 text-xs">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {idx < content.stages.length - 1 && (
                  <div
                    className="hidden md:flex items-center justify-center text-[#F4845F]"
                    aria-hidden="true"
                  >
                    <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                      <path d="M0 6h28m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Attributes chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {content.attributes.map((a) => (
              <span
                key={a}
                className="text-xs text-white/55 px-3 py-1.5 rounded-full border border-white/10"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ThesisSection.displayName = 'ThesisSection';
export default ThesisSection;
