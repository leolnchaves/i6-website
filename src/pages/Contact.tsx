
import ContactHero from '@/components/contact/ContactHero';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import WorldMap from '@/components/contact/WorldMap';
import CalendlySection from '@/components/contact/CalendlySection';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <FAQSection />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <CalendlySection />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <WorldMap />
        </div>
      </section>
    </div>
  );
};

export default Contact;
