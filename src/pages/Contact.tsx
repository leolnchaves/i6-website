
import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHero from '@/components/contact/ContactHero';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import WorldMap from '@/components/contact/WorldMap';
import CalendlySection from '@/components/contact/CalendlySection';

const Contact = memo(() => {
  const location = useLocation();

  useEffect(() => {
    // Scroll para o formulário se a URL contém a âncora
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Aguarda a página carregar
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <ContactHero />
      <FAQSection />
      
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
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
});

Contact.displayName = 'Contact';

export default Contact;
