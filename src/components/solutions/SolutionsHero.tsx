
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsHeroData } from '@/data/staticData/solutionsHeroData';

const SolutionsHero = memo(() => {
  const { language } = useLanguage();
  const heroContent = solutionsHeroData[language] || solutionsHeroData.en;

  return (
    <section className="w-full flex items-center justify-center pt-28 pb-0 relative bg-[#0B1224]">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            <span className="block mb-2 whitespace-nowrap">
              {heroContent.mainTitle}{' '}
              <span className="text-[#F4845F]" style={{
                textShadow: '0 0 30px rgba(244,132,95,0.3), 0 0 60px rgba(244,132,95,0.15)'
              }}>
                {heroContent.mainSubtitle}
              </span>
            </span>
            <span className="block">
              {heroContent.mainSuffix}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-4 leading-relaxed">
            {heroContent.description}
          </p>
        </div>
      </div>
    </section>
  );
});

SolutionsHero.displayName = 'SolutionsHero';

export default SolutionsHero;
