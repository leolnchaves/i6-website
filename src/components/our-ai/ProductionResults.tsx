import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { realResults } from '@/data/staticData/realResults';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['results'];
}

/**
 * Apresentação própria desta página para os KPIs de realResults.ts.
 * O rótulo de segmento é mantido: aqui ele é procedência da evidência.
 * RealResultsStrip.tsx (compartilhado com /solutions) não é usado nem alterado.
 */
const ProductionResults = memo(({ content }: Props) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();

  return (
    <section className="bg-secondary/60 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-[2.6rem] font-bold leading-[1.12] text-foreground">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{content.lead}</p>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {realResults.map((r) => (
            <div key={r.slug} className="bg-card p-7">
              <dt className="text-3xl font-bold text-foreground">{pickLang(language, r.value)}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLang(language, r.label)}</dd>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {content.sourceLabel} · {pickLang(language, r.source)}
              </p>
            </div>
          ))}
        </dl>

        {/* Atalho da Evidência → cases de sucesso */}
        <Link
          to={localized('/success-stories')}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {content.ctaLink}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>

      </div>
    </section>
  );
});

ProductionResults.displayName = 'ProductionResults';
export default ProductionResults;
