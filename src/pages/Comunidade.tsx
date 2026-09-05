import SEOHead from '@/components/common/SEOHead';
import ContactForm from '@/components/contact/ContactForm';
import CommunityOpening from '@/components/comunidade/CommunityOpening';
import CommunityScaleBand from '@/components/comunidade/CommunityScaleBand';
import CommunityMural from '@/components/comunidade/CommunityMural';
import CommunityEvents from '@/components/comunidade/CommunityEvents';
import CommunityBelonging from '@/components/comunidade/CommunityBelonging';
import CommunityFinalCTA from '@/components/comunidade/CommunityFinalCTA';

const Comunidade = () => (
  <>
    <SEOHead page="comunidade" />
    <div className="theme-sand">
      <CommunityOpening />
      <CommunityScaleBand />
      <CommunityMural />
      <CommunityEvents />
      <CommunityBelonging />

      {/* Fecho escuro: emenda direto no rodapé, sem corte seco */}
      <div className="bg-[#0B1224]">
        <CommunityFinalCTA />

        {/* Captura de lead: mesmo formulário do site (planilha + sync i6 HUB) */}
        <section id="fale-com-a-comunidade" className="container mx-auto px-6 pb-24 scroll-mt-28">
          <div className="max-w-4xl mx-auto">
            <ContactForm leadSource="i6-community" variant="community" />
          </div>
        </section>
      </div>
    </div>
  </>
);

export default Comunidade;
