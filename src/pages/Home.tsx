
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <ResultsSection />
      <StatsSection />
      <FeaturedStoriesSection />
      <CTASection />
    </div>
  );
};

export default Home;
