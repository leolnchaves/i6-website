import { memo, Fragment } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  dualValue: OurAIContent['dualValue'];
  learnInfluence: OurAIContent['learnInfluence'];
}

const UnifiedImpactSection = memo(({ dualValue, learnInfluence }: Props) => {
  const { language } = useLanguage();
  const bridge = language === 'pt' ? 'Do comportamento ao resultado' : 'From behavior to outcome';

  return (
    <section className="relative py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 max-w-3xl mx-auto leading-tight">
          {dualValue.title}
        </h2>

        {/* Two-column value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-lg overflow-hidden">
          {dualValue.columns.map((col, idx) => (
            <div key={col.title} className="bg-[#0B1224] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#F4845F] text-2xl font-mono font-bold">0{idx + 1}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">{col.title}</h3>
              </div>
              <ul className="space-y-3 mb-8">
                {col.points.map((p) => (
                  <li key={p} className="text-sm text-white/60 leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-white/10">
                <code className="text-xs md:text-sm text-[#F4845F] font-mono leading-relaxed block">
                  {col.formula}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge eyebrow */}
        <div className="mt-12 pt-10 border-t border-white/10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-8">
            {bridge}
          </p>

          {/* Horizontal flow */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 md:gap-2 mb-8 text-left">
            {learnInfluence.stages.map((stage, idx) => (
              <Fragment key={stage.label}>
                <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
                    Step 0{idx + 1}
                  </p>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">{stage.label}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{stage.detail}</p>

                  {idx === 1 && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 flex-wrap">
                      {learnInfluence.journey.map((j, jIdx) => (
                        <span key={j} className="flex items-center gap-2">
                          <span className="text-xs text-white/70 italic">{j}</span>
                          {jIdx < learnInfluence.journey.length - 1 && (
                            <span className="text-[#F4845F]/60 text-xs">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {idx < learnInfluence.stages.length - 1 && (
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
            {learnInfluence.attributes.map((a) => (
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

UnifiedImpactSection.displayName = 'UnifiedImpactSection';
export default UnifiedImpactSection;
