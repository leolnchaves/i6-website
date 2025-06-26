
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    // TODO: Implement actual CTA action (navigation, form, etc.)
  };
  
  return (
    <section className="py-20 bg-gray-50" role="region" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* CTA Heading */}
        <h2 
          id="cta-heading"
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {t('cta.title')}
        </h2>
        
        {/* CTA Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        
        {/* CTA Button */}
        <Button 
          size="lg" 
          onClick={handleCTAClick}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
          aria-describedby="cta-description"
        >
          {t('cta.button')}
          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>
        
        {/* Screen reader description */}
        <div id="cta-description" className="sr-only">
          Click to start your AI transformation journey
        </div>
      </div>
    </section>
  );
};

export default CTASection;
