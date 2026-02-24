
import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import VerticalWaves from '@/components/solutions/VerticalWaves';
import CookieConsentManager from '@/components/cookies/CookieConsentManager';
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
    <div className="min-h-screen bg-[#0B1224] relative">
      <VerticalWaves />
      <div className="relative">
        <div className="relative z-[20]">
          <HeaderNovo />
        </div>
        <ContactHero />
        <div className="relative z-[10]">
          <FAQSection />
          
          <section id="contact-form" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                <ContactForm />
                <CalendlySection />
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <WorldMap />
            </div>
          </section>
        </div>
        <div className="relative z-[20]">
          <FooterNovo />
        </div>
        <CookieConsentManager />
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
