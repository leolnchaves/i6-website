import SEOHead from '@/components/common/SEOHead';
import ContactForm from '@/components/contact/ContactForm';
import BuilderHero from '@/components/i6-builders/BuilderHero';
import BuilderWhat from '@/components/i6-builders/BuilderWhat';
import BuilderHowItWorks from '@/components/i6-builders/BuilderHowItWorks';
import BuilderModels from '@/components/i6-builders/BuilderModels';
import BuilderAccelerators from '@/components/i6-builders/BuilderAccelerators';
import BuilderPersona from '@/components/i6-builders/BuilderPersona';
import BuilderCases from '@/components/i6-builders/BuilderCases';
import BuilderFinalCTA from '@/components/i6-builders/BuilderFinalCTA';

const I6Builders = () => (
  <>
    <SEOHead page="i6Builders" />
    <div className="theme-sand">
      <BuilderHero />
      <BuilderWhat />
      <BuilderHowItWorks />
      <BuilderModels />
      <BuilderAccelerators />
      <BuilderPersona />
      <BuilderCases />
      <BuilderFinalCTA />

      {/* Captura de lead: reutiliza o formulário existente (planilha + sync i6 HUB) */}
      <section id="fale-com-o-time" className="container mx-auto px-6 pb-24 scroll-mt-28">
        <div className="max-w-4xl mx-auto">
          <ContactForm leadSource="i6-builders" />
        </div>
      </section>
    </div>
  </>
);

export default I6Builders;
