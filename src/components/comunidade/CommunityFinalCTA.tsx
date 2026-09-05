import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';

const CommunityFinalCTA = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).finalCta;

  return (
    <div className="px-0">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-[2.8rem] leading-[1.12] font-bold text-foreground">{copy.title}</h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>
        <a
          href={COMMUNITY_CONTACT_ANCHOR}
          className="group mt-9 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--sand-shadow-lift)] transition-all hover:brightness-[1.06]"
        >
          {copy.primary}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </a>
      </div>
    </div>
  );
};

export default CommunityFinalCTA;
