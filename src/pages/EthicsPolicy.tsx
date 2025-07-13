import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const EthicsPolicy = () => {
  useScrollAnimation();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Ethics Policy",
      subtitle: "Our commitment to ethical AI and responsible business practices.",
      lastUpdated: "Last updated: December 2024",
      sections: {
        foundation: {
          title: "1. Our Ethical Foundation",
          text: "At Infinity6, we believe that artificial intelligence should serve humanity's best interests. Our commitment to ethical AI development guides every aspect of our work, from research and development to deployment and ongoing maintenance of our solutions."
        },
        development: {
          title: "2. Responsible AI Development",
          fairnessTitle: "Fairness and Non-Discrimination",
          fairnessText: "We are committed to developing AI systems that are fair and unbiased:",
          fairnessItems: [
            "Regular bias testing and mitigation in all our AI models",
            "Diverse training datasets that represent different demographics",
            "Continuous monitoring for discriminatory outcomes",
            "Inclusive design practices throughout development"
          ],
          transparencyTitle: "Transparency and Explainability",
          transparencyText: "We believe in making AI decisions understandable:",
          transparencyItems: [
            "Clear documentation of AI system capabilities and limitations",
            "Explainable AI techniques where decision transparency is critical",
            "Open communication about how our systems work",
            "Regular reporting on AI system performance and impact"
          ]
        },
        data: {
          title: "3. Data Ethics and Privacy",
          minimizationTitle: "Data Minimization",
          minimizationText: "We collect and use only the data necessary for our services:",
          minimizationItems: [
            "Purpose limitation - data used only for stated purposes",
            "Data retention policies with automatic deletion",
            "Regular audits of data collection and usage practices",
            "Strong consent mechanisms for data processing"
          ],
          privacyTitle: "Privacy by Design",
          privacyText: "Privacy is built into every system we develop:",
          privacyItems: [
            "End-to-end encryption for all data transmissions",
            "Anonymization and pseudonymization techniques",
            "Secure multi-party computation where applicable",
            "Regular privacy impact assessments"
          ]
        },
        human: {
          title: "4. Human-Centered AI",
          text: "Our AI solutions are designed to augment human capabilities, not replace human judgment:",
          items: [
            "Human oversight in critical decision-making processes",
            "Easy opt-out mechanisms for automated systems",
            "Support for human skill development and adaptation",
            "Respect for human autonomy and choice"
          ]
        },
        environmental: {
          title: "5. Environmental Responsibility",
          text: "We are committed to sustainable AI development:",
          items: [
            "Energy-efficient model architectures and training practices",
            "Green cloud infrastructure and renewable energy usage",
            "Carbon footprint monitoring and offset programs",
            "Lifecycle assessment of our AI systems' environmental impact"
          ]
        },
        stakeholder: {
          title: "6. Stakeholder Engagement",
          text: "We actively engage with various stakeholders to ensure our ethical standards:",
          items: [
            "Regular consultation with ethics experts and advisory boards",
            "Collaboration with academic institutions and research organizations",
            "Participation in industry standards and best practice initiatives",
            "Open dialogue with civil society and advocacy groups"
          ]
        },
        improvement: {
          title: "7. Continuous Improvement",
          text: "Ethics is an ongoing commitment, not a one-time achievement:",
          items: [
            "Regular ethics training for all team members",
            "Continuous monitoring and evaluation of ethical practices",
            "Feedback mechanisms for reporting ethical concerns",
            "Annual ethics audits and public reporting"
          ]
        },
        compliance: {
          title: "8. Compliance and Governance",
          text: "We adhere to the highest standards of compliance and governance:",
          items: [
            "Compliance with GDPR, CCPA, and other privacy regulations",
            "Adherence to emerging AI governance frameworks",
            "Regular legal and compliance reviews",
            "Transparent reporting of compliance metrics"
          ]
        },
        reporting: {
          title: "9. Reporting and Accountability",
          text: "We believe in transparency and accountability in our ethical practices:",
          hotline: "Ethics Hotline:",
          hotlineText: "Report concerns confidentially",
          email: "Email:",
          report: "Annual Ethics Report:",
          reportText: "Published annually on our website"
        },
        contact: {
          title: "10. Contact Our Ethics Team",
          text: "For questions about our ethics policy, to report concerns, or to discuss ethical considerations:",
          officer: "Chief Ethics Officer",
          email: "Email:",
          phone: "Phone:",
          address: "Address:",
          company: "Infinity6 AI Solutions, Ethics Department"
        }
      }
    },
    pt: {
      title: "Política de Ética",
      subtitle: "Nosso compromisso com IA ética e práticas comerciais responsáveis.",
      lastUpdated: "Última atualização: Dezembro 2024",
      sections: {
        foundation: {
          title: "1. Nossa Base Ética",
          text: "Na Infinity6, acreditamos que a inteligência artificial deve servir aos melhores interesses da humanidade. Nosso compromisso com o desenvolvimento ético de IA orienta todos os aspectos do nosso trabalho, desde pesquisa e desenvolvimento até implantação e manutenção contínua de nossas soluções."
        },
        development: {
          title: "2. Desenvolvimento Responsável de IA",
          fairnessTitle: "Equidade e Não-Discriminação",
          fairnessText: "Estamos comprometidos em desenvolver sistemas de IA que sejam justos e imparciais:",
          fairnessItems: [
            "Testes regulares de viés e mitigação em todos os nossos modelos de IA",
            "Conjuntos de dados de treinamento diversificados que representam diferentes demografias",
            "Monitoramento contínuo para resultados discriminatórios",
            "Práticas de design inclusivo em todo o desenvolvimento"
          ],
          transparencyTitle: "Transparência e Explicabilidade",
          transparencyText: "Acreditamos em tornar as decisões de IA compreensíveis:",
          transparencyItems: [
            "Documentação clara das capacidades e limitações do sistema de IA",
            "Técnicas de IA explicável onde a transparência da decisão é crítica",
            "Comunicação aberta sobre como nossos sistemas funcionam",
            "Relatórios regulares sobre desempenho e impacto do sistema de IA"
          ]
        },
        data: {
          title: "3. Ética de Dados e Privacidade",
          minimizationTitle: "Minimização de Dados",
          minimizationText: "Coletamos e usamos apenas os dados necessários para nossos serviços:",
          minimizationItems: [
            "Limitação de propósito - dados usados apenas para fins declarados",
            "Políticas de retenção de dados com exclusão automática",
            "Auditorias regulares das práticas de coleta e uso de dados",
            "Mecanismos de consentimento rigorosos para processamento de dados"
          ],
          privacyTitle: "Privacidade por Design",
          privacyText: "A privacidade é incorporada em todos os sistemas que desenvolvemos:",
          privacyItems: [
            "Criptografia de ponta a ponta para todas as transmissões de dados",
            "Técnicas de anonimização e pseudonimização",
            "Computação segura multi-partes quando aplicável",
            "Avaliações regulares de impacto na privacidade"
          ]
        },
        human: {
          title: "4. IA Centrada no Humano",
          text: "Nossas soluções de IA são projetadas para aumentar as capacidades humanas, não substituir o julgamento humano:",
          items: [
            "Supervisão humana em processos críticos de tomada de decisão",
            "Mecanismos fáceis de opt-out para sistemas automatizados",
            "Suporte para desenvolvimento e adaptação de habilidades humanas",
            "Respeito pela autonomia e escolha humana"
          ]
        },
        environmental: {
          title: "5. Responsabilidade Ambiental",
          text: "Estamos comprometidos com o desenvolvimento sustentável de IA:",
          items: [
            "Arquiteturas de modelo energeticamente eficientes e práticas de treinamento",
            "Infraestrutura em nuvem verde e uso de energia renovável",
            "Monitoramento da pegada de carbono e programas de compensação",
            "Avaliação do ciclo de vida do impacto ambiental dos nossos sistemas de IA"
          ]
        },
        stakeholder: {
          title: "6. Engajamento das Partes Interessadas",
          text: "Nos envolvemos ativamente com várias partes interessadas para garantir nossos padrões éticos:",
          items: [
            "Consulta regular com especialistas em ética e conselhos consultivos",
            "Colaboração com instituições acadêmicas e organizações de pesquisa",
            "Participação em padrões da indústria e iniciativas de melhores práticas",
            "Diálogo aberto com a sociedade civil e grupos de advocacia"
          ]
        },
        improvement: {
          title: "7. Melhoria Contínua",
          text: "A ética é um compromisso contínuo, não uma conquista única:",
          items: [
            "Treinamento regular em ética para todos os membros da equipe",
            "Monitoramento e avaliação contínua das práticas éticas",
            "Mecanismos de feedback para relatar preocupações éticas",
            "Auditorias anuais de ética e relatórios públicos"
          ]
        },
        compliance: {
          title: "8. Conformidade e Governança",
          text: "Aderimos aos mais altos padrões de conformidade e governança:",
          items: [
            "Conformidade com GDPR, CCPA e outras regulamentações de privacidade",
            "Aderência a estruturas emergentes de governança de IA",
            "Revisões regulares legais e de conformidade",
            "Relatórios transparentes de métricas de conformidade"
          ]
        },
        reporting: {
          title: "9. Relatórios e Responsabilização",
          text: "Acreditamos na transparência e responsabilização em nossas práticas éticas:",
          hotline: "Linha Direta de Ética:",
          hotlineText: "Relate preocupações confidencialmente",
          email: "Email:",
          report: "Relatório Anual de Ética:",
          reportText: "Publicado anualmente em nosso site"
        },
        contact: {
          title: "10. Contate Nossa Equipe de Ética",
          text: "Para perguntas sobre nossa política de ética, para relatar preocupações ou discutir considerações éticas:",
          officer: "Diretor de Ética",
          email: "Email:",
          phone: "Telefone:",
          address: "Endereço:",
          company: "Infinity6 AI Solutions, Departamento de Ética"
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative overflow-hidden">
      {/* Hero-inspired header section */}
      <section className="w-full min-h-[70vh] flex items-center pt-20 relative overflow-hidden">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.foundation.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.foundation.text}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.development.title}</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.development.fairnessTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.development.fairnessText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.development.fairnessItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.development.transparencyTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.development.transparencyText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.development.transparencyItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.data.title}</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.data.minimizationTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.data.minimizationText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.data.minimizationItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentContent.sections.data.privacyTitle}</h3>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.data.privacyText}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.data.privacyItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.human.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.human.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.human.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.environmental.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.environmental.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.environmental.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.stakeholder.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.stakeholder.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.stakeholder.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.improvement.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.improvement.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.improvement.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.compliance.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.compliance.text}
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {currentContent.sections.compliance.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.reporting.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.reporting.text}
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <p className="text-gray-700 mb-2">
                    <strong>{currentContent.sections.reporting.hotline}</strong> {currentContent.sections.reporting.hotlineText}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{currentContent.sections.reporting.email}</strong> ethics@infinity6.ai
                  </p>
                  <p className="text-gray-700">
                    <strong>{currentContent.sections.reporting.report}</strong> {currentContent.sections.reporting.reportText}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.sections.contact.title}</h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.sections.contact.text}
                </p>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>{currentContent.sections.contact.officer}</strong></p>
                  <p className="text-gray-700 mb-2"><strong>{currentContent.sections.contact.email}</strong> ethics@infinity6.ai</p>
                  <p className="text-gray-700 mb-2"><strong>{currentContent.sections.contact.phone}</strong> +55 (19) 99819-7775</p>
                  <p className="text-gray-700">
                    <strong>{currentContent.sections.contact.address}</strong> {currentContent.sections.contact.company}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;