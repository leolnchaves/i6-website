import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { builderCopy, COMMUNITY_PATH, CONTACT_ANCHOR, DOCS_PATH } from '@/data/i6Builders/content';

/**
 * Fechamento escuro: já dentro da faixa navy que emenda no rodapé.
 */
const BuilderFinalCTA = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, builderCopy).finalCta;

  return (
    <section className="container mx-auto px-6 pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-[2.8rem] leading-[1.12] font-bold text-white">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">{copy.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CONTACT_ANCHOR}
            className="group inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#F4845F]/60 bg-[#F4845F]/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#F4845F] hover:bg-[#F4845F]/20"
          >
            {copy.primary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#F4845F]">
            <Link to={localized(COMMUNITY_PATH)}>{copy.community}</Link>
            <Link to={localized(DOCS_PATH)}>{copy.docs}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderFinalCTA;
