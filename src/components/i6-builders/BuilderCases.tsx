import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';
import { PARTNER_CASES } from '@/data/i6Builders/placeholders';

/**
 * Citações empilhadas: tipografia grande, sem grade de cards.
 */
const BuilderCases = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).cases;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
      </div>

      <div className="mt-12 border-t border-border">
        {PARTNER_CASES.map((c) => (
          <figure
            key={c.id}
            className="grid md:grid-cols-[0.7fr_1.3fr] gap-4 md:gap-16 border-b border-border py-9 md:py-11"
          >
            <figcaption className="order-2 md:order-1">
              <p className="text-sm font-semibold text-foreground">{c.company}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-primary">{c.context[language]}</p>
              <p className="mt-3 text-xs text-muted-foreground">{c.author[language]}</p>
            </figcaption>
            <blockquote className="order-1 md:order-2 relative pl-6 md:pl-8">
              <span
                aria-hidden
                className="absolute left-0 top-0 font-display text-4xl leading-none text-primary/40"
              >
                &ldquo;
              </span>
              <p className="text-lg md:text-[1.45rem] leading-[1.45] text-foreground/85 font-display">
                {c.quote[language]}
              </p>
            </blockquote>
          </figure>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/80">{copy.exampleNote}</p>
    </section>
  );
};

export default BuilderCases;
