
import ClientCarousel from '@/components/ClientCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHybridPageContent } from '@/hooks/useHybridPageContent';
import StatCard from './stats/StatCard';
import StatsBackground from './stats/StatsBackground';

const StatsSection = () => {
  const { t, language } = useLanguage();
  const { getContent } = useHybridPageContent('home', language);

  console.log('StatsSection - Getting content for home page, language:', language);

  // Função para obter conteúdo com fallback para traduções
  const getContentWithFallback = (field: string, translationKey: string) => {
    const content = getContent('stats', field);
    console.log(`StatsSection - Content for stats ${field}:`, content);
    return content || t(translationKey);
  };

  // Get the actual values and labels
  const stat1Value = getContentWithFallback('stat1Value', 'stats.topEngine');
  const stat1Label = getContentWithFallback('stat1Label', 'stats.topEngine');
  const stat2Value = getContentWithFallback('stat2Value', 'stats.securityIssue');
  const stat2Label = getContentWithFallback('stat2Label', 'stats.securityIssue');
  const stat3Value = getContentWithFallback('stat3Value', 'stats.leadtime');
  const stat3Label = getContentWithFallback('stat3Label', 'stats.leadtime');
  const stat4Value = getContentWithFallback('stat4Value', 'stats.explainability');
  const stat4Label = getContentWithFallback('stat4Label', 'stats.explainability');

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
            value={stat1Value || "97%"} 
            label={stat1Label || "Top Performance Engine"} 
          />
          <StatCard 
            value={stat2Value || "0"} 
            label={stat2Label || "Security Issues"} 
            delay="0.2s"
          />
          <StatCard 
            value={stat3Value || "< 1,5"} 
            label={stat3Label || "Months Lead Time"} 
            delay="0.4s"
          />
          <StatCard 
            value={stat4Value || "100%"} 
            label={stat4Label || "Explainable AI"} 
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
