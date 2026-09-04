import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy } from '@/data/i6Builders/content';
import { PARTNER_CASES } from '@/data/i6Builders/placeholders';
import { getPublicAssetUrl } from '@/utils/assetUtils';

const BuilderCases = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).cases;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {PARTNER_CASES.map((c) => (
          <article key={c.id} className="sand-card sand-card-hover p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={getPublicAssetUrl(c.logo)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-8 w-8 object-contain opacity-60"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.company}</p>
                <p className="text-[11px] uppercase tracking-wider text-primary">{c.context[language]}</p>
              </div>
            </div>
            <Quote size={16} className="text-primary mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.quote[language]}</p>
            <p className="mt-5 text-xs font-medium text-foreground/70">{c.author[language]}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/80">{copy.exampleNote}</p>
    </section>
  );
};

export default BuilderCases;
