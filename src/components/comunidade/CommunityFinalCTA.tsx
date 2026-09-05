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
      </div>
    </div>
  );
};

export default CommunityFinalCTA;
