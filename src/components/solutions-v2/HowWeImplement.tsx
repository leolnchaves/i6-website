import { memo, Fragment } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsContent } from '@/data/solutionsV2/content';

interface HowWeImplementProps {
  hideHeader?: boolean;
  compact?: boolean;
}

const HowWeImplement = memo(({ hideHeader = false, compact = false }: HowWeImplementProps) => {
  const { language } = useLanguage();
  const { howWeImplement } = solutionsContent[language];

  const costBadge = (
    <div className={`flex items-center justify-center gap-2 rounded-full border border-[#F4845F]/40 bg-[#0B1224] px-3 py-1.5 shadow-lg shadow-black/20 w-full ${compact ? 'max-w-xl mx-auto' : ''}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#F4845F] shrink-0" />
      <span className={`font-semibold text-[#F4845F] ${compact ? 'text-[10px]' : 'text-sm'}`}>
        {howWeImplement.costNote}
      </span>
    </div>
  );

  return (
    <section className={`bg-[#0B1224] ${compact ? 'py-0' : 'py-16 md:py-20 border-t border-white/5'}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${compact ? 'max-w-5xl' : 'max-w-6xl'}`}>
        {!hideHeader && (
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
              {howWeImplement.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line">
              {howWeImplement.title}
            </h2>
          </div>
        )}

        <div className={`${compact ? '' : 'relative'}`}>
          <ol className={`grid grid-cols-1 md:grid-cols-5 ${compact ? 'gap-1.5' : 'gap-4'}`}>
            {howWeImplement.steps.map((step, idx) => (
              <Fragment key={step.n}>
                <li
                  className={`relative rounded-xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 transition-all duration-500 ${compact ? 'p-2' : 'p-5'}`}
                >
                  <span className={`font-bold text-[#F4845F]/80 leading-none block ${compact ? 'text-xl mb-1' : 'text-3xl mb-3'}`}>
                    {step.n}
                  </span>
                  <h3 className={`font-bold text-white mb-0.5 ${compact ? 'text-[10px]' : 'text-sm'}`}>{step.title}</h3>
                  <p className={`text-white/60 ${compact ? 'text-[9px] leading-tight' : 'text-xs leading-relaxed'}`}>{step.description}</p>
                </li>
                {idx === 2 && (
                  <li className="md:hidden list-none">
                    {costBadge}
                  </li>
                )}
              </Fragment>
            ))}

          </ol>

          <div className={`hidden md:block ${compact ? 'mt-2' : 'absolute left-0 bottom-0 w-[calc(60%-0.4rem)] translate-y-1/2 z-10'}`}>
            {costBadge}
          </div>
        </div>

      </div>
    </section>
  );
});

HowWeImplement.displayName = 'HowWeImplement';
export default HowWeImplement;
