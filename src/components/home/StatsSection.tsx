
import ClientCarousel from '@/components/ClientCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from './stats/StatCard';
import StatsBackground from './stats/StatsBackground';

const StatsSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 gradient-secondary text-white relative overflow-hidden">
      <StatsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8">
          <StatCard 
            value={t('stats.stat1Value')} 
            label={t('stats.topEngine')} 
          />
          <StatCard 
            value={t('stats.stat2Value')} 
            label={t('stats.securityIssue')} 
            delay="0.2s"
          />
          <StatCard 
            value={t('stats.stat3Value')} 
            label={t('stats.leadtime')} 
            delay="0.4s"
          />
          <StatCard 
            value={t('stats.stat4Value')} 
            label={t('stats.explainability')} 
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
