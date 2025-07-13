import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const PrivacyPolicy = () => {
  useScrollAnimation();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      subtitle: "Your privacy is our priority. Learn how we protect and handle your data.",
      lastUpdated: "Last updated: December 2024",
      sections: {
        introduction: {
          title: "1. Introduction",
          text: "At Infinity6 (\"we,\" \"our,\" or \"us\"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
        },
        information: {
          title: "2. Information We Collect",
          personalTitle: "Personal Information",
          personalText: "We may collect personal information that you voluntarily provide to us, including:",
          personalItems: [
            "Name and contact information (email, phone number)",
            "Company information and job title",
            "Communications with us through contact forms or email",
            "Information provided during consultations or demos"
          ],
          technicalTitle: "Technical Information",
          technicalText: "We automatically collect certain information when you visit our website:",
          technicalItems: [
            "IP address and device information",
            "Browser type and version",
            "Website usage data and analytics",
            "Cookies and similar tracking technologies"
          ]
        },
        usage: {
          title: "3. How We Use Your Information",
          text: "We use the collected information for the following purposes:",
          items: [
            "Provide and improve our AI solutions and services",
            "Respond to your inquiries and provide customer support",
            "Send you relevant information about our products and services",
            "Analyze website usage to improve user experience",
            "Comply with legal obligations and protect our rights"
          ]
        },
        security: {
          title: "4. Data Security",
          text: "We implement appropriate technical and organizational security measures to protect your personal information:",
          items: [
            "Encryption of data in transit and at rest",
            "Regular security assessments and updates",
            "Access controls and employee training",
            "Secure cloud infrastructure with leading providers"
          ]
        },
        sharing: {
          title: "5. Information Sharing",
          text: "We do not sell your personal information. We may share your information in the following circumstances:",
          items: [
            "With trusted service providers who assist in our operations",
            "To comply with legal requirements or protect our rights",
            "In connection with a business transaction (merger, acquisition)",
            "With your explicit consent for specific purposes"
          ]
        },
        rights: {
          title: "6. Your Rights",
          text: "Depending on your location, you may have the following rights regarding your personal information:",
          items: [
            "Access and receive a copy of your personal data",
            "Rectify inaccurate or incomplete information",
            "Request deletion of your personal data",
            "Object to or restrict processing of your data",
            "Data portability rights"
          ]
        },
        transfers: {
          title: "7. International Data Transfers",
          text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws."
        },
        changes: {
          title: "8. Changes to This Policy",
          text: "We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website and updating the \"Last updated\" date."
        },
        contact: {
          title: "9. Contact Us",
          text: "If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:",
          email: "Email:",
          address: "Address:",
          company: "Infinity6 AI Solutions",
          dpo: "Data Protection Officer"
        }
      }
    },
    pt: {
      title: "Política de Privacidade",
      subtitle: "Sua privacidade é nossa prioridade. Saiba como protegemos e gerenciamos seus dados.",
      lastUpdated: "Última atualização: Dezembro 2024",
      sections: {
        introduction: {
          title: "1. Introdução",
          text: "Na Infinity6 (\"nós\", \"nosso\" ou \"conosco\"), estamos comprometidos em proteger sua privacidade e informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site ou usa nossos serviços."
        },
        information: {
          title: "2. Informações que Coletamos",
          personalTitle: "Informações Pessoais",
          personalText: "Podemos coletar informações pessoais que você fornece voluntariamente, incluindo:",
          personalItems: [
            "Nome e informações de contato (email, telefone)",
            "Informações da empresa e cargo",
            "Comunicações conosco através de formulários ou email",
            "Informações fornecidas durante consultas ou demonstrações"
          ],
          technicalTitle: "Informações Técnicas",
          technicalText: "Coletamos automaticamente certas informações quando você visita nosso site:",
          technicalItems: [
            "Endereço IP e informações do dispositivo",
            "Tipo e versão do navegador",
            "Dados de uso do site e analytics",
            "Cookies e tecnologias de rastreamento similares"
          ]
        },
        usage: {
          title: "3. Como Usamos Suas Informações",
          text: "Usamos as informações coletadas para os seguintes propósitos:",
          items: [
            "Fornecer e melhorar nossas soluções de IA e serviços",
            "Responder às suas consultas e fornecer suporte ao cliente",
            "Enviar informações relevantes sobre nossos produtos e serviços",
            "Analisar o uso do site para melhorar a experiência do usuário",
            "Cumprir obrigações legais e proteger nossos direitos"
          ]
        },
        security: {
          title: "4. Segurança dos Dados",
          text: "Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais:",
          items: [
            "Criptografia de dados em trânsito e em repouso",
            "Avaliações e atualizações regulares de segurança",
            "Controles de acesso e treinamento de funcionários",
            "Infraestrutura em nuvem segura com provedores líderes"
          ]
        },
        sharing: {
          title: "5. Compartilhamento de Informações",
          text: "Não vendemos suas informações pessoais. Podemos compartilhar suas informações nas seguintes circunstâncias:",
          items: [
            "Com provedores de serviços confiáveis que auxiliam em nossas operações",
            "Para cumprir requisitos legais ou proteger nossos direitos",
            "Em conexão com uma transação comercial (fusão, aquisição)",
            "Com seu consentimento explícito para propósitos específicos"
          ]
        },
        rights: {
          title: "6. Seus Direitos",
          text: "Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas informações pessoais:",
          items: [
            "Acessar e receber uma cópia de seus dados pessoais",
            "Retificar informações incorretas ou incompletas",
            "Solicitar exclusão de seus dados pessoais",
            "Objetar ou restringir o processamento de seus dados",
            "Direitos de portabilidade de dados"
          ]
        },
        transfers: {
          title: "7. Transferências Internacionais de Dados",
          text: "Suas informações podem ser transferidas e processadas em países diferentes do seu. Garantimos que as proteções apropriadas estejam em vigor para proteger seus dados de acordo com as leis aplicáveis."
        },
        changes: {
          title: "8. Alterações nesta Política",
          text: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer mudanças materiais publicando a nova política em nosso site e atualizando a data \"Última atualização\"."
        },
        contact: {
          title: "9. Contate-nos",
          text: "Se você tiver alguma dúvida sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato conosco:",
          email: "Email:",
          address: "Endereço:",
          company: "Infinity6 AI Solutions",
          dpo: "Encarregado de Proteção de Dados"
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative overflow-hidden">
      {/* Hero-inspired header section */}
      <section className="w-full min-h-[35vh] flex items-center justify-center relative overflow-hidden">
        {/* Background image with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            filter: 'blur(10px)'
          }}
        ></div>
        
        {/* Minimal grid pattern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
        </div>
        
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
              <span className="block mb-2">{currentContent.title}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 drop-shadow-lg leading-relaxed">
              {currentContent.subtitle}
            </p>
            <p className="text-sm text-gray-300 drop-shadow-sm">
              {currentContent.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <div className="bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none scroll-reveal space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.introduction.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.introduction.text}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.information.title}</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.information.personalTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.information.personalText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.information.personalItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.information.technicalTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.information.technicalText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.information.technicalItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.usage.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.usage.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.usage.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.security.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.security.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.security.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.sharing.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.sharing.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.sharing.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.rights.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.rights.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.rights.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.transfers.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.transfers.text}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.changes.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.changes.text}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.contact.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.contact.text}
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>{currentContent.sections.contact.email}</strong> privacy@infinity6.ai</p>
                  <p className="text-gray-700 mb-2"><strong>{currentContent.sections.contact.address}</strong> {currentContent.sections.contact.company}</p>
                  <p className="text-gray-700">{currentContent.sections.contact.dpo}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;