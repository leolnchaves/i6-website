
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsHeroData } from '@/data/staticData/solutionsHeroData';
import heroBg from '@/assets/images/hero-bg.jpg';

const SolutionsHero = memo(() => {
  const { language } = useLanguage();
  
  // Get static data based on language
  const heroContent = solutionsHeroData[language] || solutionsHeroData.en;

  return (
    <section className="w-full min-h-[70vh] flex items-center pt-20 relative overflow-hidden">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          filter: 'blur(10px)'
        }}
      ></div>
      
      {/* Minimal grid pattern overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
      </div>
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            <span className="block mb-2">
              {heroContent.mainTitle}
            </span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {heroContent.mainSubtitle}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg leading-relaxed">
            {heroContent.description}
          </p>
        </div>
      </div>
    </section>
  );
});

SolutionsHero.displayName = 'SolutionsHero';

export default SolutionsHero;
