
import ClientCarousel from '@/components/ClientCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHybridPageContent } from '@/hooks/useHybridPageContent';
import StatCard from './stats/StatCard';
import StatsBackground from './stats/StatsBackground';

const StatsSection = () => {
  const { t, language } = useLanguage();
  const { getContent } = useHybridPageContent('home', language);

  console.log('StatsSection - Getting content for home page, language:', language);

  // Get the actual values and labels with proper fallbacks
  const stat1Value = getContent('stats', 'stat1Value', '97%');
  const stat1Label = getContent('stats', 'stat1Label', 'Top Performance Engine');
  const stat2Value = getContent('stats', 'stat2Value', '0');
  const stat2Label = getContent('stats', 'stat2Label', 'Security Issues');
  const stat3Value = getContent('stats', 'stat3Value', '< 1,5');
  const stat3Label = getContent('stats', 'stat3Label', 'Months Lead Time');
  const stat4Value = getContent('stats', 'stat4Value', '100%');
  const stat4Label = getContent('stats', 'stat4Label', 'Explainable AI');

  console.log('StatsSection - All stats content:', {
    stat1Value, stat1Label,
    stat2Value, stat2Label,
    stat3Value, stat3Label,
    stat4Value, stat4Label
  });
  
  return (
    <section className="py-12 gradient-secondary text-white relative overflow-hidden">
      <StatsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8">
          <StatCard 
            value={stat1Value} 
            label={stat1Label} 
          />
          <StatCard 
            value={stat2Value} 
            label={stat2Label} 
            delay="0.2s"
          />
          <StatCard 
            value={stat3Value} 
            label={stat3Label} 
            delay="0.4s"
          />
          <StatCard 
            value={stat4Value} 
            label={stat4Label} 
            delay="0.6s"
          />
        </div>
        
        {/* Client Carousel */}
        <div className="mt-8">
          <ClientCarousel />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
