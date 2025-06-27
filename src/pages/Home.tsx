
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import CompactSolutionsSection from '@/components/home/CompactSolutionsSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedStoriesSection from '@/components/home/FeaturedStoriesSection';
import CTASection from '@/components/home/CTASection';

/**
 * Home page component
 * Main landing page with hero section, results, stats, and featured stories
 */
const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResultsSection />
      <CompactSolutionsSection />
      <StatsSection />
      <FeaturedStoriesSection />
      <CTASection />
    </div>
  );
};

export default Home;
