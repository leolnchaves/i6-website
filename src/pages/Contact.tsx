
import ContactHero from '@/components/contact/ContactHero';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import InteractiveGoogleMap from '@/components/contact/InteractiveGoogleMap';
import CalendlySection from '@/components/contact/CalendlySection';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactInfoCards />
      <FAQSection />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <InteractiveGoogleMap />
          </div>
        </div>
      </section>

      <CalendlySection />
    </div>
  );
};

export default Contact;
