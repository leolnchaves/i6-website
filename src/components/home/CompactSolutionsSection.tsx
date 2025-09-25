
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSolutionsMarkdown } from '@/hooks/useSolutionsMarkdown';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import CompactVerticalCard from './compact-solutions/CompactVerticalCard';

const CompactSolutionsSection = () => {
  const { language } = useLanguage();
  const { solutions, loading } = useSolutionsMarkdown();
  
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {solutions.map((solution, index) => (
            <CompactVerticalCard
              key={solution.id}
              title={solution.title}
              description={solution.overview}
              icon={solution.icon}
              index={index}
              category={solution.engine}
              features={solution.keyFeatures}
              outcome={solution.businessResults}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CompactSolutionsSection);
