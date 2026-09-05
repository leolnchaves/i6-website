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

      {/* Fecho + captura de lead numa única faixa areia */}
      <section id="fale-com-a-comunidade" className="container mx-auto px-6 pb-24 pt-8 scroll-mt-28">
        <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16">
          <div aria-hidden className="absolute inset-0 sand-glow" />
          <div className="relative max-w-4xl mx-auto">
            <CommunityFinalCTA />
            <div className="mt-12">
              <ContactForm leadSource="i6-community" variant="community" />
            </div>
          </div>
        </div>
      </section>


    </div>
  </>
);

export default Comunidade;
