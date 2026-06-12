import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['learnInfluence'];
}

const LearnInfluenceFlow = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A101F]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed">{content.lead}</p>
        </div>

        {/* Horizontal flow */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 md:gap-2 mb-10">
          {content.stages.map((stage, idx) => (
            <>
              <div
                key={stage.label}
                className="border border-white/10 rounded-lg p-6 bg-white/[0.02] text-center md:text-left"
              >
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
                  Step 0{idx + 1}
                </p>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{stage.label}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{stage.detail}</p>

                {/* Middle stage gets journey sub-flow */}
                {idx === 1 && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center md:justify-start gap-2 flex-wrap">
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
                  key={`arrow-${idx}`}
                  className="hidden md:flex items-center justify-center text-[#F4845F]"
                  aria-hidden="true"
                >
                  <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                    <path d="M0 6h28m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>

        {/* Conclusion */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-base md:text-lg text-white/80 leading-relaxed italic">
            {content.conclusion}
          </p>
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
    </section>
  );
});

LearnInfluenceFlow.displayName = 'LearnInfluenceFlow';
export default LearnInfluenceFlow;
