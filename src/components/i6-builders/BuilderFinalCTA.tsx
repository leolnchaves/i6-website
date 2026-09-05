import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy, COMMUNITY_PATH, DOCS_PATH } from '@/data/i6Builders/content';

const BuilderFinalCTA = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, builderCopy).finalCta;

  return (
    <div className="px-0">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-[2.8rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

        <div className="mt-9 flex flex-col items-start gap-y-4">
          <Link
            to={localized(COMMUNITY_PATH)}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {copy.community}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to={localized(DOCS_PATH)}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {copy.docs}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuilderFinalCTA;
