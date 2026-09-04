import { Boxes, Code2, LineChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

const icons = [Boxes, Code2, LineChart];

const BuilderWhat = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).what;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        {copy.body.map((p) => (
          <p key={p} className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-5">
        {copy.pillars.map((pillar, i) => {
          const Icon = icons[i] ?? Boxes;
          return (
            <article key={pillar.title} className="sand-card sand-card-hover p-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-[calc(var(--radius)-6px)] bg-accent text-primary mb-5">
                <Icon size={18} />
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BuilderWhat;
