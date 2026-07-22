import HeroDecisaoV2 from '@/components/hometeste/HeroDecisaoV2';
import TeseSection from '@/components/hometeste/TeseSection';
import SinaisSection from '@/components/hometeste/SinaisSection';
import ClientesSection from '@/components/hometeste/ClientesSection';
import InsightsSection from '@/components/hometeste/InsightsSection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SEOHead from '@/components/common/SEOHead';
import RealResultsStrip from '@/components/common/RealResultsStrip';
import TestemunhosCompact from '@/components/hometeste/TestemunhosCompact';

const HomeV2 = () => (
  <>
    <SEOHead page="home" />
    <HeroDecisaoV2 />
    <TeseSection />
    <SinaisSection />
    <RealResultsStrip compact />
    <TestemunhosCompact />
    <ClientesSection />
    <InsightsSection />
    <CTAFinal />
  </>
);

export default HomeV2;
