
import HeroSection from '@/components/home/HeroSection';
import ResultsSection from '@/components/home/ResultsSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import PolicyLinksSection from '@/components/home/PolicyLinksSection';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <ResultsSection />
      <StatsSection />
      <CTASection />
      <PolicyLinksSection />
    </div>
  );
};

export default Home;
