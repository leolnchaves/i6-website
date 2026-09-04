import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';
import { DOMAIN_ACCELERATORS } from '@/data/i6Builders/placeholders';

/**
 * Carrossel horizontal com snap: os pacotes deslizam em vez de formar grade.
 */
const BuilderAccelerators = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).accelerators;

  return (
    <section className="py-16 md:py-24 bg-secondary/60">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
            <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
          </div>
          <p className="max-w-2xl self-start text-base md:text-lg text-muted-foreground leading-relaxed lg:pt-[1.75rem]">{copy.intro}</p>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        <div className="flex gap-5 px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
          {DOMAIN_ACCELERATORS.map((acc) => (
            <article
              key={acc.id}
              className="snap-start shrink-0 w-[82vw] sm:w-[380px] sand-card sand-card-hover p-7 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{acc.name[language]}</h3>
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed flex-1">{acc.desc[language]}</p>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                {acc.engines.map((e) => (
                  <li key={e} className="font-mono text-[11px] text-foreground/60">
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
};

export default BuilderAccelerators;
