import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy, DOCS_PATH } from '@/data/i6Builders/content';

const BuilderHowItWorks = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, builderCopy).how;

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">{copy.eyebrow}</p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-5">
        {copy.blocks.map((block, i) => (
          <article key={block.title} className="sand-card sand-card-hover p-6 flex flex-col">
            <span className="text-3xl font-bold text-primary leading-none mb-4">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2">{block.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{block.desc}</p>
            <Link
              to={localized(DOCS_PATH)}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {copy.docsLink}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BuilderHowItWorks;
