import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['glossary'];
}

const GlossarySection = memo(({ content }: Props) => {
  return (
    <section id="glossario" className="relative py-20 md:py-24 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
          GEO · Glossary
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{content.title}</h2>
        <p className="text-sm md:text-base text-white/55 max-w-2xl leading-relaxed mb-10">
          {content.lead}
        </p>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {content.terms.map((t) => (
            <div
              key={t.slug}
              id={`glossario-${t.slug}`}
              className="border-l border-white/10 pl-5 scroll-mt-24"
            >
              <dt className="text-sm font-semibold text-[#F4845F] mb-1.5 tracking-tight">
                {t.term}
              </dt>
              <dd className="text-sm text-white/65 leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
});

GlossarySection.displayName = 'GlossarySection';
export default GlossarySection;
