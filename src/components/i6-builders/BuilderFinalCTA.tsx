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
    <div className="px-0">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-[2.8rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CONTACT_ANCHOR}
            className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--sand-shadow-lift)] transition-all hover:brightness-[1.06]"
          >
            {copy.primary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-primary">
            <Link to={localized(COMMUNITY_PATH)}>{copy.community}</Link>
            <Link to={localized(DOCS_PATH)}>{copy.docs}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderFinalCTA;
