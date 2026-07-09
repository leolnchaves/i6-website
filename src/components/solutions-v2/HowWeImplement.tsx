import { memo } from 'react';
import { solutionsV2Content } from '@/data/solutionsV2/content';

const HowWeImplement = memo(() => {
  const { howWeImplement } = solutionsV2Content;

  return (
    <section className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
            {howWeImplement.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {howWeImplement.title}
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {howWeImplement.steps.map((step) => (
            <li
              key={step.n}
              className="relative rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 transition-all duration-500 p-5"
            >
              <span className="text-3xl font-bold text-[#F4845F]/80 leading-none block mb-3">
                {step.n}
              </span>
              <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="text-center text-sm text-white/70 italic mt-8 max-w-2xl mx-auto">
          {howWeImplement.footer}
        </p>
      </div>
    </section>
  );
});

HowWeImplement.displayName = 'HowWeImplement';
export default HowWeImplement;
