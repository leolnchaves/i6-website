import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

/**
 * Colunas editoriais numeradas, separadas apenas por filete vertical.
 */
const BuilderModels = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).models;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 md:divide-x divide-border">
        {copy.cards.map((card, i) => (
          <div
            key={card.name}
            className="border-t border-border pt-6 pb-8 md:border-t-0 md:pt-0 md:pb-0 md:px-8 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-lg md:text-xl font-semibold text-foreground leading-snug">{card.name}</h3>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuilderModels;
