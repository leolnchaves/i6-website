
import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesData } from '@/data/staticData/successStoriesData';

interface SuccessStoriesHeroProps {
  children?: React.ReactNode;
}

const SuccessStoriesHero = memo(({ children }: SuccessStoriesHeroProps) => {
  const { language } = useLanguage();
  const heroContent = successStoriesData[language]?.hero || successStoriesData.en.hero;

  return (
    <section className="w-full pt-32 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {heroContent.title}
            <br />
            <span
              style={{
                color: '#F4845F',
                textShadow: '0 0 40px rgba(244,132,95,0.4)',
              }}
            >
              {heroContent.subtitle}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed mb-8">
            {heroContent.description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
});

SuccessStoriesHero.displayName = 'SuccessStoriesHero';

export default SuccessStoriesHero;
