
import { useLanguage } from '@/contexts/LanguageContext';
import ResultsHeader from './results/ResultsHeader';
import ResultsBackground from './results/ResultsBackground';
import ResultCard from './results/ResultCard';

const ResultsSection = () => {
  const { t } = useLanguage();

  const results = [
    {
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      title: t('home.results.predictiveAnalytics.title'),
      description: t('home.results.predictiveAnalytics.description')
    },
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      title: t('home.results.smartRecommendations.title'),
      description: t('home.results.smartRecommendations.description')
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      title: t('home.results.processOptimization.title'),
      description: t('home.results.processOptimization.description')
    },
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      title: t('home.results.dataInsights.title'),
      description: t('home.results.dataInsights.description')
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      title: t('home.results.automatedDecisions.title'),
      description: t('home.results.automatedDecisions.description')
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/30">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              image={result.image}
              title={result.title}
              description={result.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
