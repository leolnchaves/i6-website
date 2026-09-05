import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHeroSplit from '@/components/contact/ContactHeroSplit';
import FAQSection from '@/components/contact/FAQSection';
import ContactMap from '@/components/contact/ContactMap';
import SEOHead from '@/components/common/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { contactCopy } from '@/data/contact/content';

const Contact = memo(() => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location]);

  // JSON-LD gerado a partir da lista final de 13 perguntas
  const faqJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pickLang(language, contactCopy).faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }), [language]);

  return (
    <>
      <SEOHead page="contact" jsonLd={faqJsonLd} />
      <div className="theme-sand">
        <ContactHeroSplit />
        <FAQSection />
        <ContactMap />
      </div>
    </>
  );
});

Contact.displayName = 'Contact';

export default Contact;
