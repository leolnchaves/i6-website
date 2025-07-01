
import ClientCarousel from '@/components/ClientCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import StatCard from './stats/StatCard';
import StatsBackground from './stats/StatsBackground';

const StatsSection = () => {
  const { t, language } = useLanguage();
  const { getContent } = useCMSPageContent('home', language);

  console.log('StatsSection - Getting CMS content for home page, language:', language);

  // Função para obter conteúdo do CMS com fallback para traduções
  const getContentWithFallback = (field: string, translationKey: string) => {
    const cmsContent = getContent('stats', field);
    console.log(`StatsSection - CMS content for stats ${field}:`, cmsContent);
    return cmsContent || t(translationKey);
  };

  console.log('StatsSection - All CMS stats content:', {
    stat1Value: getContent('stats', 'stat1Value'),
    stat1Label: getContent('stats', 'stat1Label'),
    stat2Value: getContent('stats', 'stat2Value'),
    stat2Label: getContent('stats', 'stat2Label'),
    stat3Value: getContent('stats', 'stat3Value'),
    stat3Label: getContent('stats', 'stat3Label'),
    stat4Value: getContent('stats', 'stat4Value'),
    stat4Label: getContent('stats', 'stat4Label'),
  });
  
  return (
    <section className="py-12 gradient-secondary text-white relative overflow-hidden">
      <StatsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8">
          <StatCard 
            value={getContentWithFallback('stat1Value', 'stats.topEngine').split('%')[0] + '%' || "97%"} 
            label={getContentWithFallback('stat1Label', 'stats.topEngine')} 
          />
          <StatCard 
            value={getContentWithFallback('stat2Value', 'stats.securityIssue') || "0"} 
            label={getContentWithFallback('stat2Label', 'stats.securityIssue')} 
            delay="0.2s"
          />
          <StatCard 
            value={getContentWithFallback('stat3Value', 'stats.leadtime') || "< 1,5"} 
            label={getContentWithFallback('stat3Label', 'stats.leadtime')} 
            delay="0.4s"
          />
          <StatCard 
            value={getContentWithFallback('stat4Value', 'stats.explainability').split('%')[0] + '%' || "100%"} 
            label={getContentWithFallback('stat4Label', 'stats.explainability')} 
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
