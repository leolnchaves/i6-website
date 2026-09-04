import { TrendingUp, Sparkles, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

const icons = [TrendingUp, Sparkles, Tag];

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

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {copy.cards.map((card, i) => {
          const Icon = icons[i] ?? TrendingUp;
          return (
            <article key={card.name} className="sand-card sand-card-hover p-6 md:p-7">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-[calc(var(--radius)-6px)] bg-accent text-primary mb-5">
                <Icon size={18} />
              </span>
              <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">{card.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BuilderModels;
