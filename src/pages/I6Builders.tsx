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

      {/* Fecho + captura de lead numa única faixa areia */}
      <section id="fale-com-o-time" className="container mx-auto px-6 pb-24 pt-8 scroll-mt-28">
        <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16">
          <div aria-hidden className="absolute inset-0 sand-glow" />
          <div className="relative max-w-4xl mx-auto">
            <BuilderFinalCTA />
            <div className="mt-12">
              <ContactForm leadSource="i6-builders" variant="builders" />
            </div>
          </div>
        </div>
      </section>


    </div>
  </>
);

export default I6Builders;
