import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSolutionsMarkdown } from '@/hooks/useSolutionsMarkdown';
import ModernSolutionCard from './ModernSolutionCard';

const engineColorMap: { [key: string]: string } = {
  'i6 RecSys': 'bg-blue-500/20',
  'i6 ElasticPrice': 'bg-orange-500/20', 
  'i6 Previsio': 'bg-gray-500/20'
};

const StaticSolutionsGrid = memo(() => {
  const { language } = useLanguage();
  const { solutions, loading, error } = useSolutionsMarkdown();

  if (loading) {
    return (
      <section className="py-20 bg-[#0B1224] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F4845F]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#0B1224] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-white/60">Error loading solutions: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-6 pb-20 bg-[#0B1224] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {solutions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No solutions found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => {
              const bgColor = engineColorMap[solution.engine] || 'bg-blue-500/20';
              
              return (
                <ModernSolutionCard
                  key={solution.id}
                  title={solution.title}
                  focus={solution.target}
                  description={solution.overview}
                  features={solution.keyFeatures}
                  outcome={solution.businessResults}
                  engine={solution.engine}
                  bgColor={bgColor}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
});

StaticSolutionsGrid.displayName = 'StaticSolutionsGrid';

export default StaticSolutionsGrid;
