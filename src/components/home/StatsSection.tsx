
import ClientCarousel from '@/components/ClientCarousel';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 gradient-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-8">
          <div className="scroll-reveal">
            <div className="text-5xl font-bold mb-2 animate-bounce-in">97%</div>
            <div className="text-xl opacity-90">{t('stats.topEngine')}</div>
          </div>
          <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl font-bold mb-2 animate-bounce-in">0</div>
            <div className="text-xl opacity-90">{t('stats.securityIssue')}</div>
          </div>
          <div className="scroll-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl font-bold mb-2 animate-bounce-in">{'< 1,5'}</div>
            <div className="text-xl opacity-90">{t('stats.leadtime')}</div>
          </div>
          <div className="scroll-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="text-5xl font-bold mb-2 animate-bounce-in">100%</div>
            <div className="text-xl opacity-90">{t('stats.explainability')}</div>
          </div>
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
