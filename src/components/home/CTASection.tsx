
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';

/**
 * Call-to-Action section component
 * Reusable CTA section with consistent styling and functionality
 * Includes performance monitoring and proper accessibility
 */
const CTASection = () => {
  const { t } = useLanguage();
  
  // Performance monitoring for this component
  const metrics = usePerformanceMonitor('CTASection', 10);
  
  // Handle CTA button click with logging
  const handleCTAClick = () => {
    logger.info('CTA button clicked', { section: 'home' }, 'CTASection');
  };
  
  return (
    <section className="py-20 bg-[#0B1224]" role="region" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          id="cta-heading"
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          {t('cta.title')}
        </h2>
        <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Link 
          to="/contact#contact-form"
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60 animate-glow-coral transition-all duration-500 ease-out hover:bg-[#F4845F] hover:border-[#F4845F] hover:shadow-[0_0_30px_rgba(244,132,95,0.5),0_0_60px_rgba(244,132,95,0.2)]"
          aria-describedby="cta-description"
        >
          {t('cta.button')}
          <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <div id="cta-description" className="sr-only">
          Click to start your AI transformation journey
        </div>
      </div>
    </section>
  );
};

export default CTASection;
