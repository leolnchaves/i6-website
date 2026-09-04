import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy, COMMUNITY_CONTACT_ANCHOR } from '@/data/comunidade/content';

/**
 * Fechamento escuro: já dentro da faixa navy que emenda no rodapé.
 */
const CommunityFinalCTA = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).finalCta;

  return (
    <section className="container mx-auto px-6 pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-[2.8rem] leading-[1.12] font-bold text-white">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">{copy.sub}</p>
        <a
          href={COMMUNITY_CONTACT_ANCHOR}
          className="group mt-9 inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#F4845F]/60 bg-[#F4845F]/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#F4845F] hover:bg-[#F4845F]/20"
        >
          {copy.primary}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </a>
      </div>
    </section>
  );
};

export default CommunityFinalCTA;
