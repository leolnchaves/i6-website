
import React from 'react';
import { TrendingUp, Award, Target, DollarSign } from 'lucide-react';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';


const ResultsSection = () => {
  const { results, loading, error } = useMarkdownContent();
  const { t } = useLanguage();

  console.log('Results received:', results.length, results);

  // Icon mapping
  const iconComponents = {
    TrendingUp: <TrendingUp className="text-primary text-3xl" />,
    Target: <Target className="text-primary text-3xl" />,
    DollarSign: <DollarSign className="text-primary text-3xl" />,
    Award: <Award className="text-primary text-3xl" />
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
              icon={iconComponents[result.icon as keyof typeof iconComponents] || iconComponents.TrendingUp}
              title={result.title}
              description={result.description}
              solutions={result.outcomes}
              index={index}
              backgroundColor={undefined}
              backgroundOpacity={undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
