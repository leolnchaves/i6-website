import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHero from '@/components/contact/ContactHero';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import CalendlySection from '@/components/contact/CalendlySection';
import WorldMap from '@/components/contact/WorldMap';

const Contact = memo(() => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <ContactHero />
      
      <section id="contact-form" className="pt-0 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <ContactForm />
            <CalendlySection />
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <WorldMap />
        </div>
      </section>
    </>
  );
});

Contact.displayName = 'Contact';

export default Contact;
