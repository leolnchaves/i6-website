
import React from 'react';
import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ResultsSection = () => {
  const { content, loading, error } = useMarkdownContent('results');

  if (loading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error || !content) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-500">Error loading content: {error}</p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block mb-2">{content.title}</span>
            <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent pb-2">
              {content.subtitle}
            </span>
          </h2>
          <div className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            {content.description.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {content.sections.map((section, index) => (
            <ResultCard
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
              solutions={section.outcomes}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
