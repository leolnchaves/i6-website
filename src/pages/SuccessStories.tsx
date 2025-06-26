
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import MetricsSection from '@/components/success-stories/MetricsSection';
import StoriesGrid from '@/components/success-stories/StoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';
import SuccessStoriesCTA from '@/components/success-stories/SuccessStoriesCTA';

const SuccessStories = () => {
  return (
    <div className="min-h-screen">
      <SuccessStoriesHero />
      <MetricsSection />
      <StoriesGrid />
      <TestimonialsSection />
      <SuccessStoriesCTA />
    </div>
  );
};

export default SuccessStories;
