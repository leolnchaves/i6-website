import HeroMovimento from '@/components/hometeste/HeroMovimento';
import TeseSection from '@/components/hometeste/TeseSection';
import SinaisSection from '@/components/hometeste/SinaisSection';
import ClientesSection from '@/components/hometeste/ClientesSection';
import ResultadosSection from '@/components/hometeste/ResultadosSection';
import InsightsSection from '@/components/hometeste/InsightsSection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SEOHead from '@/components/common/SEOHead';

const HomeTeste = () => (
  <>
    <SEOHead page="home" />
    <HeroMovimento />
    <TeseSection />
    <SinaisSection />
    <ResultadosSection />
    <InsightsSection />
    <ClientesSection />
    <CTAFinal />
  </>
);

export default HomeTeste;
