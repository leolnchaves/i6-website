
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import MetricsSection from '@/components/success-stories/MetricsSection';
import StoriesGrid from '@/components/success-stories/StoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';
import TransformBusinessCTA from '@/components/shared/TransformBusinessCTA';

const SuccessStories = () => {
  return (
    <div className="min-h-screen">
      <SuccessStoriesHero />
      <MetricsSection />
      <StoriesGrid />
      <TestimonialsSection />
      <TransformBusinessCTA />
    </div>
  );
};

export default SuccessStories;
