
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import CompactSolutionsSection from '@/components/home/CompactSolutionsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import CTASection from '@/components/home/CTASection';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';

/**
 * Home page component
 * Main landing page with hero section, results, stats, and featured stories
 * Optimized for performance and includes comprehensive logging
 */
const Home = () => {
  // Performance monitoring only in development mode
  const metrics = process.env.NODE_ENV === 'development' ? usePerformanceMonitor('HomePage', 50) : null;
  
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
    </div>
  );
};

export default Home;
