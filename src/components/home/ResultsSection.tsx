
import React from 'react';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';

// Import impact card images
import growthAccelerationIcon from '@/assets/icons/growth-acceleration.png';
import hyperpersonalizationIcon from '@/assets/icons/hyperpersonalization.png';
import supplyOptimizationIcon from '@/assets/icons/supply-optimization.png';
import commercialEfficiencyIcon from '@/assets/icons/commercial-efficiency.png';


const ResultsSection = () => {
  const { results, loading, error } = useMarkdownContent();
  const { t } = useLanguage();

  console.log('Results received:', results.length, results);

  // Images mapping in order of presentation
  const cardImages = {
    TrendingUp: growthAccelerationIcon,
    Target: hyperpersonalizationIcon,
    DollarSign: supplyOptimizationIcon,
    Award: commercialEfficiencyIcon
  };

  if (loading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <ResultsBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ResultsHeader />
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <ResultsBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ResultsHeader />
          <div className="text-center py-16">
            <p className="text-gray-600">{t('results.error.loading')}</p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto items-stretch">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              icon={null}
              title={result.title}
              description={result.description}
              solutions={result.outcomes}
              index={index}
              backgroundColor={undefined}
              backgroundOpacity={undefined}
              cardImage={cardImages[result.icon as keyof typeof cardImages] || cardImages.TrendingUp}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
