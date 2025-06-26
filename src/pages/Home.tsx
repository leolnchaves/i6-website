
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import TransformBusinessCTA from '@/components/shared/TransformBusinessCTA';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <ResultsSection />
      <StatsSection />
      <FeaturedStoriesSection />
      <TransformBusinessCTA />
    </div>
  );
};

export default Home;
