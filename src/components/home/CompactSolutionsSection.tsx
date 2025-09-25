
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsCardsData } from '@/data/staticData/solutionsCards';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import CompactVerticalCard from './compact-solutions/CompactVerticalCard';

const CompactSolutionsSection = () => {
  const { language } = useLanguage();
  
  // Get static data based on current language
  const cards = solutionsCardsData[language] || solutionsCardsData.en;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {cards.map((card, index) => (
            <CompactVerticalCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
              category={card.focus || 'Solução AI'}
              features={card.features}
              outcome={card.outcome}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CompactSolutionsSection);
