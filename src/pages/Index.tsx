
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import CompactSolutionsSection from '@/components/home/CompactSolutionsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import CTASection from '@/components/home/CTASection';
import IconProcessor from '@/components/debug/IconProcessor';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';

/**
 * Home page component
 * Main landing page with hero section, results, partners, and featured stories
 * Optimized for performance and includes comprehensive logging
 */
const Index = () => {
  // Performance monitoring for the entire page
  const metrics = usePerformanceMonitor('HomePage', 50);
  
  // Log page visit
  logger.info('Home page loaded', { 
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent 
  }, 'HomePage');
  
  return (
    <div className="min-h-screen">
      {/* Hero section with main value proposition */}
      <HeroSection />
      
      {/* Results showcase section */}
      <ResultsSection />
      
      {/* Compact solutions section */}
      <CompactSolutionsSection />
      
      {/* Partners section */}
      <PartnersSection />
      
      {/* Featured success stories section */}
      <FeaturedStoriesSection />
      
      {/* Call-to-action section */}
      <CTASection />
      
      {/* Debug: Icon processor (only in development) */}
      {process.env.NODE_ENV === 'development' && <IconProcessor />}
    </div>
  );
};

export default Index;
