import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';

/**
 * Dois caminhos em metades contrastantes: claro (embutir) x escuro (criar).
 */
const BuilderPersona = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).persona;

  return (
    <section>
      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {copy.modes.map((mode, i) => {
          const dark = i === 1;
          return (
            <div
              key={mode.title}
              className={`px-6 py-12 md:py-16 ${dark ? 'bg-[#0B1224]' : 'bg-accent'}`}
            >
              <div className={`mx-auto max-w-xl ${dark ? 'md:mr-auto md:ml-10' : 'md:ml-auto md:mr-10'}`}>
                <span
                  className={`font-mono text-xs ${dark ? 'text-[#F4845F]' : 'text-primary'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`mt-4 text-2xl md:text-[1.8rem] font-semibold ${dark ? 'text-white' : 'text-foreground'}`}>
                  {mode.title}
                </h3>
                <p className={`mt-4 text-sm md:text-[15px] leading-relaxed ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {mode.desc}
                </p>
                <ul className={`mt-7 space-y-3 border-t pt-6 ${dark ? 'border-white/10' : 'border-primary/20'}`}>
                  {mode.points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-start gap-2.5 text-sm ${dark ? 'text-white/80' : 'text-foreground/80'}`}
                    >
                      <Check size={15} className={`mt-0.5 shrink-0 ${dark ? 'text-[#F4845F]' : 'text-primary'}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BuilderPersona;
