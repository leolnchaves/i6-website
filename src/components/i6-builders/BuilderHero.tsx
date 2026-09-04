import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy, CONTACT_ANCHOR } from '@/data/i6Builders/content';

const BuilderHero = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).hero;

  const [before, after] = copy.title.split(copy.highlight);

  return (
    <section className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-5">{copy.eyebrow}</p>
        <h1 className="text-4xl md:text-[3.2rem] leading-[1.08] font-bold text-foreground">
          {before}
          <span className="text-primary">{copy.highlight}</span>
          {after}
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={CONTACT_ANCHOR}
            className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {copy.badges.map((b) => (
            <li
              key={b}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/75"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BuilderHero;
