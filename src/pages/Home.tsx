
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import CompactSolutionsSection from '@/components/home/CompactSolutionsSection';
import StatsSection from '@/components/home/StatsSection';
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
      
      {/* Statistics and metrics section */}
      <StatsSection />
      
      {/* Featured success stories section */}
      <FeaturedStoriesSection />
      
      {/* Call-to-action section */}
      <CTASection />
    </div>
  );
};

export default Home;
