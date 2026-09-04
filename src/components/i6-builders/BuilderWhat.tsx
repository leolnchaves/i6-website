import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

/**
 * Manifesto: texto grande e três frases separadas por divisórias.
 * Sem cards — a leitura é editorial.
 */
const BuilderWhat = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).what;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        </div>
        <div className="max-w-2xl">
          {copy.body.map((p) => (
            <p key={p} className="mb-5 text-base md:text-lg text-muted-foreground leading-relaxed last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-14 border-t border-border">
        {copy.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="grid md:grid-cols-[0.85fr_1.15fr] gap-3 md:gap-16 border-b border-border py-7 transition-colors hover:bg-secondary/50"
          >
            <h3 className="text-lg md:text-xl font-semibold text-foreground">{pillar.title}</h3>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuilderWhat;
