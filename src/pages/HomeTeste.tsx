import HeroDecisaoV4 from '@/components/hometeste/HeroDecisaoV4';
import TeseSection from '@/components/hometeste/TeseSection';
import SinaisSection from '@/components/hometeste/SinaisSection';
import ClientesSection from '@/components/hometeste/ClientesSection';

import InsightsSection from '@/components/hometeste/InsightsSection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SEOHead from '@/components/common/SEOHead';
import RealResultsStrip from '@/components/common/RealResultsStrip';
import TestemunhosCompact from '@/components/hometeste/TestemunhosCompact';

const HomeTeste = () => (
  <>
    <SEOHead page="home" />
    <HeroDecisaoV4 />
    <TeseSection />
    <SinaisSection />
    
    <RealResultsStrip compact />
    <TestemunhosCompact />
    <ClientesSection />
    <InsightsSection />
    <CTAFinal />
  </>
);

export default HomeTeste;
