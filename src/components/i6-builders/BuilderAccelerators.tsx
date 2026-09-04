import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';
import { DOMAIN_ACCELERATORS } from '@/data/i6Builders/placeholders';

const BuilderAccelerators = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).accelerators;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {DOMAIN_ACCELERATORS.map((acc) => (
          <article key={acc.id} className="sand-card sand-card-hover p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{acc.name[language]}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{acc.desc[language]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {acc.engines.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {e}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/80">{copy.exampleNote}</p>
    </section>
  );
};

export default BuilderAccelerators;
