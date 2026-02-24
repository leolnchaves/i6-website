import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHero from '@/components/contact/ContactHero';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import CalendlySection from '@/components/contact/CalendlySection';
import WorldMap from '@/components/contact/WorldMap';
import SEOHead from '@/components/common/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = memo(() => {
  const location = useLocation();
  const { language } = useLanguage();

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

  const faqJsonLd = useMemo(() => {
    const faqs = language === 'pt'
      ? [
          { q: 'Quanto tempo leva para colocar a inteligência em produção?', a: 'Colocamos inteligência preditiva em produção entre 4 e 12 semanas, com geração de impacto financeiro mensurável já nas primeiras ativações.' },
          { q: 'Qual o ROI típico das soluções?', a: 'Projetos podem gerar até 20x de ROI no primeiro ano, impulsionando receita, protegendo margem e reduzindo ineficiências operacionais.' },
          { q: 'A solução integra com nossos sistemas atuais?', a: 'Sim. Nossa arquitetura é API-first e conecta-se facilmente a ERPs, CRMs, e-commerce e outras bases internas.' },
          { q: 'É necessário ter equipe de ciência de dados?', a: 'Não. As soluções são projetadas para equipes de negócio operarem decisões preditivas sem dependência técnica.' },
          { q: 'O que diferencia vocês de outras empresas de IA?', a: 'Unimos inteligência preditiva com ativação em tempo real. Nossos motores proprietários transformam dados em decisões operacionais.' },
        ]
      : [
          { q: 'How long does it take to put intelligence into production?', a: 'We deploy predictive intelligence into production within 4 to 12 weeks, generating measurable financial impact from the first activations.' },
          { q: 'What is the typical ROI of your solutions?', a: 'Projects can generate up to 20x ROI in the first year, driving revenue, protecting margins and reducing operational inefficiencies.' },
          { q: 'Does the solution integrate with our current systems?', a: 'Yes. Our architecture is API-first and easily connects to ERPs, CRMs, e-commerce and other internal databases.' },
          { q: 'Do we need a data science team?', a: 'No. Our solutions are designed for business teams to operate predictive decisions without technical dependency.' },
          { q: 'What sets you apart from other AI companies?', a: 'We combine predictive intelligence with real-time activation. Our proprietary engines transform data into operational decisions.' },
        ];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
  }, [language]);

  return (
    <>
      <SEOHead page="contact" jsonLd={faqJsonLd} />
      <ContactHero />
      
      <section id="contact-form" className="pt-0 pb-6">
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
