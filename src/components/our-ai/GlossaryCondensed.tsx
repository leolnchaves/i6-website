import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['glossary'];
}

/** Glossário condensado: só os termos desta página + link para /docs. */
const GlossaryCondensed = memo(({ content }: Props) => {
  const localized = useLocalizedPath();

  return (
    <section id="glossario" className="scroll-mt-28 bg-secondary/60 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] font-bold leading-[1.14] text-foreground">{content.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{content.lead}</p>
        </div>

        <dl className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.terms.map((t) => (
            <div key={t.slug} id={`glossario-${t.slug}`} className="sand-card scroll-mt-28 p-6">
              <dt className="text-base font-semibold text-foreground">{t.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.definition}</dd>
            </div>
          ))}
        </dl>

        <Link
          to={localized('/docs')}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {content.cta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  );
});

GlossaryCondensed.displayName = 'GlossaryCondensed';
export default GlossaryCondensed;
