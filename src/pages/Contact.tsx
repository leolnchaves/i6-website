import { memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHero from '@/components/contact/ContactHero';
import FAQSection from '@/components/contact/FAQSection';
import ContactForm from '@/components/contact/ContactForm';
import DirectContactStrip from '@/components/contact/DirectContactStrip';
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
          { q: 'Quanto tempo leva para colocar a inteligência em produção?', a: 'Colocamos inteligência preditiva em produção entre 4 e 12 semanas, com geração de impacto financeiro mensurável já nas primeiras ativações, seja em crescimento de receita, proteção de margem ou ganho de eficiência operacional.' },
          { q: 'Como iniciar sem alto risco de investimento?', a: 'Iniciamos com uma fase de validação orientada a negócio, utilizando amostras de dados para estimar potencial de impacto antes da integração completa. O modelo é progressivo, permitindo começar com escopo controlado e expandir conforme os resultados são comprovados.' },
          { q: 'Em quais indústrias atuam?', a: 'Atuamos em setores como varejo, indústria, finanças, saúde, farmacêutica, educação e tecnologia, sempre com foco direto em impacto de negócio e resultados mensuráveis.' },
          { q: 'O suporte é contínuo?', a: 'Sim. Monitoramos performance, ajustamos modelos continuamente e garantimos evolução constante dos resultados em produção.' },
          { q: 'Como garantem que os modelos continuam performando ao longo do tempo?', a: 'Utilizamos modelos adaptativos e monitoramento contínuo de performance. Ajustes são realizados conforme mudanças de comportamento, mercado ou estratégia, mantendo impacto consistente ao longo do tempo.' },
          { q: 'Qual o ROI típico das soluções?', a: 'Projetos podem gerar até 20x de ROI no primeiro ano, impulsionando receita, protegendo margem e reduzindo ineficiências operacionais.' },
          { q: 'Que tipo de dados são necessários para começar?', a: 'Utilizamos os dados que sua empresa já possui, como transações, comportamento, CRM e supply. Iniciamos com amostras para validar potencial antes da integração completa, com modelos robustos a lacunas de dados.' },
          { q: 'A solução integra com nossos sistemas atuais?', a: 'Sim. Nossa arquitetura é API-first e conecta-se facilmente a ERPs, CRMs, e-commerce e outras bases internas.' },
          { q: 'É necessário ter equipe de ciência de dados?', a: 'Não. As soluções são projetadas para equipes de negócio operarem decisões preditivas sem dependência técnica.' },
          { q: 'A inteligência é explicável e compatível com regulamentações?', a: 'Sim. Trabalhamos com camadas de explicabilidade e aderência a normas como LGPD e GDPR, garantindo transparência e segurança.' },
          { q: 'O que diferencia vocês de outras empresas de IA?', a: 'Unimos inteligência preditiva com ativação em tempo real. Nossos motores proprietários transformam dados em decisões operacionais, enquanto o i6Signal conecta esses insights diretamente às equipes, convertendo análise em ação imediata.' },
          { q: 'Como vocês mensuram impacto no negócio?', a: 'Trabalhamos com indicadores claros de receita, margem e eficiência desde o início do projeto, acompanhando variações diretamente atribuíveis às ativações preditivas em produção.' },
        ]
      : [
          { q: 'How long does it take to put intelligence into production?', a: 'We deploy predictive intelligence into production within 4 to 12 weeks, generating measurable financial impact from the first activations, whether in revenue growth, margin protection or operational efficiency gains.' },
          { q: 'How to start without high investment risk?', a: 'We start with a business-oriented validation phase, using data samples to estimate impact potential before full integration. The model is progressive, allowing you to begin with a controlled scope and expand as results are proven.' },
          { q: 'What industries do you serve?', a: 'We serve sectors such as retail, manufacturing, finance, healthcare, pharma, education and technology, always with a direct focus on business impact and measurable results.' },
          { q: 'Is support ongoing?', a: 'Yes. We monitor performance, continuously adjust models and ensure constant evolution of results in production.' },
          { q: 'How do you ensure models keep performing over time?', a: 'We use adaptive models and continuous performance monitoring. Adjustments are made according to changes in behavior, market or strategy, maintaining consistent impact over time.' },
          { q: 'What is the typical ROI of your solutions?', a: 'Projects can generate up to 20x ROI in the first year, driving revenue, protecting margins and reducing operational inefficiencies.' },
          { q: 'What kind of data is needed to get started?', a: 'We work with the data your company already has, such as transactions, behavior, CRM and supply. We start with samples to validate potential before full integration, with models robust to data gaps.' },
          { q: 'Does the solution integrate with our current systems?', a: 'Yes. Our architecture is API-first and easily connects to ERPs, CRMs, e-commerce and other internal databases.' },
          { q: 'Do we need a data science team?', a: 'No. Our solutions are designed for business teams to operate predictive decisions without technical dependency.' },
          { q: 'Is the intelligence explainable and compliant with regulations?', a: 'Yes. We work with explainability layers and adherence to standards such as LGPD and GDPR, ensuring transparency and security.' },
          { q: 'What sets you apart from other AI companies?', a: 'We combine predictive intelligence with real-time activation. Our proprietary engines transform data into operational decisions, while i6Signal connects these insights directly to teams, converting analysis into immediate action.' },
          { q: 'How do you measure business impact?', a: 'We work with clear revenue, margin and efficiency indicators from the start of the project, tracking variations directly attributable to predictive activations in production.' },
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
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <DirectContactStrip />

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
