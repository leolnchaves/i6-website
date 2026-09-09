import SEOHead from '@/components/common/SEOHead';
import HeroSuite from '@/components/home-v3/HeroSuite';
import SolutionBands from '@/components/home-v3/SolutionBands';
import ClientProof from '@/components/home-v3/ClientProof';
import DecisionSuiteSection from '@/components/home-v3/product/DecisionSuiteSection';
import BuilderSection from '@/components/home-v3/BuilderSection';
import WhyInfinity6 from '@/components/home-v3/WhyInfinity6';

import HowItWorks from '@/components/home-v3/HowItWorks';
import ProofAndVoices from '@/components/home-v3/ProofAndVoices';
import InsightsRow from '@/components/home-v3/InsightsRow';
import FinalCTA from '@/components/home-v3/FinalCTA';

const HomeTeste = () => (
  <>
    <SEOHead page="home" />
    <div className="theme-sand">
      <div className="flex flex-col md:min-h-screen">
        <div className="flex-1 min-h-0">
          <HeroSuite />
        </div>
        <div className="flex flex-col">
          <SolutionBands />
          <div className="h-1.5 md:h-2" aria-hidden />
          <ClientProof />
        </div>
      </div>
      <DecisionSuiteSection />
      <BuilderSection />
      <WhyInfinity6 />
      
      <HowItWorks />
      <ProofAndVoices />
      <InsightsRow />
      <FinalCTA />
    </div>
  </>
);

export default HomeTeste;
