import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';

interface SuccessStoriesHeroProps {
  /** Filtro de segmento (mecânica inalterada) */
  children?: React.ReactNode;
  /** Quantidade de cases visíveis após filtro */
  count?: number;
}

/**
 * Abertura tipográfica em areia: título em duas linhas (2ª em terracota),
 * linha de apoio e contador discreto de cases visíveis.
 */
const SuccessStoriesHero = memo(({ children, count }: SuccessStoriesHeroProps) => {
  const { language } = useLanguage();
  const content = successStoriesData[language] || successStoriesData.en;
  const hero = content.hero;
  const copy = content.listing;

  return (
    <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
      <div aria-hidden className="absolute inset-0 sand-glow" />
      <div className="container relative mx-auto px-6">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-foreground">
            {hero.title}
            <br />
            <span className="text-primary">{hero.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
            {hero.description}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">{children}</div>
          {typeof count === 'number' && (
            <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {count} {count === 1 ? copy.countOne : copy.countMany}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});

SuccessStoriesHero.displayName = 'SuccessStoriesHero';

export default SuccessStoriesHero;
