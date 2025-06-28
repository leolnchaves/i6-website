
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';
import { useState } from 'react';
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import MetricsSection from '@/components/success-stories/MetricsSection';
import SegmentFilter from '@/components/success-stories/SegmentFilter';
import StoriesGrid from '@/components/success-stories/StoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';
import SuccessStoriesCTA from '@/components/success-stories/SuccessStoriesCTA';

/**
 * Success Stories page component
 * Showcases customer success stories, metrics, and testimonials
 * Includes performance monitoring and error handling
 */
const SuccessStories = () => {
  // Performance monitoring
  const metrics = usePerformanceMonitor('SuccessStoriesPage', 50);
  
  // Language context
  const { t } = useLanguage();
  
  // Segment filter state
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  
  // Log page visit
  logger.info('Success Stories page loaded', { 
    timestamp: new Date().toISOString() 
  }, 'SuccessStoriesPage');
  
  return (
    <div className="min-h-screen">
      {/* Hero section for success stories */}
      <SuccessStoriesHero />
      
      {/* Metrics and achievements section */}
      <MetricsSection />
      
      {/* Segment filter */}
      <SegmentFilter 
        onSegmentChange={setSelectedSegment} 
        selectedSegment={selectedSegment} 
      />
      
      {/* Grid of success stories */}
      <StoriesGrid selectedSegment={selectedSegment} />
      
      {/* Customer testimonials section */}
      <TestimonialsSection />
      
      {/* Call-to-action section */}
      <SuccessStoriesCTA />
    </div>
  );
};

export default SuccessStories;
