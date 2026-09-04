import { Check, Layers, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

const icons = [Layers, Rocket];

const BuilderPersona = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).persona;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {copy.modes.map((mode, i) => {
          const Icon = icons[i] ?? Layers;
          return (
            <article key={mode.title} className="sand-card sand-card-hover p-6 md:p-8">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-[calc(var(--radius)-6px)] bg-accent text-primary mb-5">
                <Icon size={18} />
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-2">{mode.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {mode.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BuilderPersona;
