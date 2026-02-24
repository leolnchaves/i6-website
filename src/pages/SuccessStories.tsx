import { useState, memo } from 'react';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import SegmentFilter from '@/components/success-stories/SegmentFilter';
import ModernStoriesGrid from '@/components/success-stories/ModernStoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';

const SuccessStories = memo(() => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  return (
    <>
      <SuccessStoriesHero>
        <SegmentFilter
          onSegmentChange={setSelectedSegment}
          selectedSegment={selectedSegment}
        />
      </SuccessStoriesHero>
      <ModernStoriesGrid selectedSegment={selectedSegment} />
      <TestimonialsSection />
      <CTAFinal />
    </>
  );
});

SuccessStories.displayName = 'SuccessStories';

export default SuccessStories;
