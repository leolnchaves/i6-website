
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useResultsCards } from '@/hooks/useResultsCards';
import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';
import { Skeleton } from '@/components/ui/skeleton';

const ResultsSection = () => {
  const { scrollY } = useScrollAnimation();
  const { language } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);
  const { cards, loading, error } = useResultsCards();

  if (error) {
    console.error('Error loading results cards:', error);
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {loading ? (
            // Show skeleton loading cards
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="border-0 shadow-lg rounded-lg p-6">
                <div className="text-center">
                  <Skeleton className="w-8 h-8 mx-auto mb-4 rounded-full" />
                  <Skeleton className="h-5 w-3/4 mx-auto mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            cards.map((card, index) => (
              <ResultCard
                key={index}
                icon={card.icon}
                iconColor={card.color}
                title={card.title}
                description={card.description}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
