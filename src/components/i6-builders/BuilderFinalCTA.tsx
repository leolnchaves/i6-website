import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy, COMMUNITY_PATH, CONTACT_ANCHOR, DOCS_PATH } from '@/data/i6Builders/content';

const BuilderFinalCTA = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, builderCopy).finalCta;

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16 text-center">
        <div aria-hidden className="absolute inset-0 sand-glow" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[2.6rem] leading-[1.14] font-bold text-foreground">{copy.title}</h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{copy.sub}</p>

          <a
            href={CONTACT_ANCHOR}
            className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy.primary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-primary">
            <Link to={localized(COMMUNITY_PATH)}>{copy.community}</Link>
            <Link to={localized(DOCS_PATH)}>{copy.docs}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderFinalCTA;
