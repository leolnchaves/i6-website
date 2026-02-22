import HeaderNovo from '@/components/hometeste/HeaderNovo';
import HeroMovimento from '@/components/hometeste/HeroMovimento';
import TeseSection from '@/components/hometeste/TeseSection';
import SinaisSection from '@/components/hometeste/SinaisSection';
import ClientesSection from '@/components/hometeste/ClientesSection';
import ResultadosSection from '@/components/hometeste/ResultadosSection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import FooterNovo from '@/components/hometeste/FooterNovo';

const HomeTeste = () => (
  <div className="min-h-screen bg-[#0B1224]">
    <HeaderNovo />
    <main>
      <HeroMovimento />
      <TeseSection />
      <SinaisSection />
      <ClientesSection />
      <ResultadosSection />
      <CTAFinal />
    </main>
    <FooterNovo />
  </div>
);

export default HomeTeste;
