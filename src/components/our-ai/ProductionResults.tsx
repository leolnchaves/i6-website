import { memo } from 'react';
import { toContentLang } from '@/utils/localizedPath';
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
  const cl = toContentLang(language);

  return (
    <section className="bg-[hsl(24_10%_14%)] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-[2.6rem] font-bold leading-[1.12] text-[hsl(36_43%_98%)]">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[hsl(36_20%_82%)]">{content.lead}</p>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] bg-[hsl(36_20%_82%/0.18)] sm:grid-cols-2 lg:grid-cols-3">
          {realResults.map((r) => (
            <div key={r.slug} className="bg-[hsl(24_10%_14%)] p-7">
              <dt className="text-3xl font-bold text-[hsl(36_43%_98%)]">{r.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[hsl(36_20%_82%/0.85)]">{r.label[cl]}</dd>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {content.sourceLabel} · {r.source[cl]}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
});

ProductionResults.displayName = 'ProductionResults';
export default ProductionResults;
