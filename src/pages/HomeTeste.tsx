import SEOHead from '@/components/common/SEOHead';
import HeroSuite from '@/components/home-v3/HeroSuite';
import ClientProof from '@/components/home-v3/ClientProof';
import SuiteIntro from '@/components/home-v3/product/SuiteIntro';
import ProductSuite from '@/components/home-v3/product/ProductSuite';
import WhyInfinity6 from '@/components/home-v3/WhyInfinity6';
import AnticipateGrid from '@/components/home-v3/AnticipateGrid';
import HowItWorks from '@/components/home-v3/HowItWorks';
import ProofAndVoices from '@/components/home-v3/ProofAndVoices';
import InsightsRow from '@/components/home-v3/InsightsRow';
import FinalCTA from '@/components/home-v3/FinalCTA';

const HomeTeste = () => (
  <>
    <SEOHead page="home" />
    <div className="theme-sand">
      <HeroSuite />
      <ClientProof />
      <WhyInfinity6 />
      <AnticipateGrid />
      <HowItWorks />
      <ProofAndVoices />
      <InsightsRow />
      <FinalCTA />
    </div>
  </>
);

export default HomeTeste;
