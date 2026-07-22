import HeroDecisaoV3 from '@/components/hometeste/HeroDecisaoV3';
import TeseSection from '@/components/hometeste/TeseSection';
import SinaisSection from '@/components/hometeste/SinaisSection';
import ClientesSection from '@/components/hometeste/ClientesSection';
import InsightsSection from '@/components/hometeste/InsightsSection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SEOHead from '@/components/common/SEOHead';
import RealResultsStrip from '@/components/common/RealResultsStrip';
import TestemunhosCompact from '@/components/hometeste/TestemunhosCompact';

const HomeV3 = () => (
  <>
    <SEOHead page="home" />
    <HeroDecisaoV3 />
    <TeseSection />
    <SinaisSection />
    <RealResultsStrip compact />
    <TestemunhosCompact />
    <ClientesSection />
    <InsightsSection />
    <CTAFinal />
  </>
);

export default HomeV3;
