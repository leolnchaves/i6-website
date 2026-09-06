import { useState, memo } from 'react';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import SegmentFilter from '@/components/success-stories/SegmentFilter';
import ModernStoriesGrid from '@/components/success-stories/ModernStoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';
import SEOHead from '@/components/common/SEOHead';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';

const SuccessStories = memo(() => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const { stories } = useSuccessStoriesMarkdown();

  const visibleCount = selectedSegment
    ? stories.filter((s) => s.segment === selectedSegment).length
    : stories.length;

  return (
    <>
      <SEOHead page="successStories" />
      <div className="theme-sand">
        <SuccessStoriesHero count={visibleCount}>
          <SegmentFilter
            onSegmentChange={setSelectedSegment}
            selectedSegment={selectedSegment}
          />
        </SuccessStoriesHero>
        <ModernStoriesGrid selectedSegment={selectedSegment} />
        <TestimonialsSection />
      </div>
      <CTAFinal />
    </>
  );
});

SuccessStories.displayName = 'SuccessStories';

export default SuccessStories;
