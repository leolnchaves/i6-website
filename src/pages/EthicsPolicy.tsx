import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';

const EthicsPolicy = () => {
  useScrollAnimation();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Ethics Policy",
      subtitle: "Our commitment to ethical AI and responsible business practices.",
      lastUpdated: "Last updated: January 2025",
      sections: {
        foundation: {
          title: "1. Our Ethical Foundation",
          text: "At infinity6, we believe that artificial intelligence should serve humanity's best interests. Our commitment to ethical AI development guides every aspect of our work, from research and development to deployment and ongoing maintenance of our solutions."
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
        contact: {
          title: "9. Contact Our Ethics Team",
          text: "For questions about our ethics policy, to report concerns, or to discuss ethical considerations:",
          officer: "Chief Ethics Officer",
          email: "Email:",
          phone: "Phone:",
          address: "Address:",
          company: "infinity6 AI Solutions, Ethics Department"
        }
      }
    },
    pt: {
      title: "Política de Ética",
      subtitle: "Nosso compromisso com IA ética e práticas comerciais responsáveis.",
      lastUpdated: "Última atualização: Janeiro 2025",
      sections: {
        foundation: {
          title: "1. Nossa Base Ética",
          text: "Na infinity6, acreditamos que a inteligência artificial deve servir aos melhores interesses da humanidade. Nosso compromisso com o desenvolvimento ético de IA orienta todos os aspectos do nosso trabalho, desde pesquisa e desenvolvimento até implantação e manutenção contínua de nossas soluções."
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
        contact: {
          title: "9. Contate Nossa Equipe de Ética",
          text: "Para perguntas sobre nossa política de ética, para relatar preocupações ou discutir considerações éticas:",
          officer: "Diretor de Ética",
          email: "Email:",
          phone: "Telefone:",
          address: "Endereço:",
          company: "infinity6 AI Solutions, Departamento de Ética"
        }
      }
    }
  };

  const currentContent = content[language];

  const renderSection = (title: string, text: string, items?: string[]) => (
    <section className="border-b border-white/10 pb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-white/70 mb-4">{text}</p>
      {items && (
        <ul className="list-disc list-inside text-white/70 space-y-1 marker:text-[#F4845F]">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );

  const renderSubSection = (title: string, text: string, items: string[]) => (
    <>
      <h3 className="text-lg font-semibold text-white/80 mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{text}</p>
      <ul className="list-disc list-inside text-white/70 mb-6 space-y-1 marker:text-[#F4845F]">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </>
  );

  return (
    <div className="relative overflow-hidden">
      <SEOHead page="ethicsPolicy" />
      
      {/* Hero */}
      <section className="w-full flex items-center justify-center pt-28 pb-16 relative bg-gradient-to-b from-[#F4845F]/30 via-[#F4845F]/10 to-[#0B1224]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-base sm:text-lg text-white/60 mb-2 leading-relaxed">
              {currentContent.subtitle}
            </p>
            <p className="text-sm text-white/40">
              {currentContent.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative bg-[#0B1224]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {renderSection(currentContent.sections.foundation.title, currentContent.sections.foundation.text)}

            <section className="border-b border-white/10 pb-8">
              <h2 className="text-2xl font-bold text-white mb-4">{currentContent.sections.development.title}</h2>
              {renderSubSection(currentContent.sections.development.fairnessTitle, currentContent.sections.development.fairnessText, currentContent.sections.development.fairnessItems)}
              {renderSubSection(currentContent.sections.development.transparencyTitle, currentContent.sections.development.transparencyText, currentContent.sections.development.transparencyItems)}
            </section>

            <section className="border-b border-white/10 pb-8">
              <h2 className="text-2xl font-bold text-white mb-4">{currentContent.sections.data.title}</h2>
              {renderSubSection(currentContent.sections.data.minimizationTitle, currentContent.sections.data.minimizationText, currentContent.sections.data.minimizationItems)}
              {renderSubSection(currentContent.sections.data.privacyTitle, currentContent.sections.data.privacyText, currentContent.sections.data.privacyItems)}
            </section>

            {renderSection(currentContent.sections.human.title, currentContent.sections.human.text, currentContent.sections.human.items)}
            {renderSection(currentContent.sections.environmental.title, currentContent.sections.environmental.text, currentContent.sections.environmental.items)}
            {renderSection(currentContent.sections.stakeholder.title, currentContent.sections.stakeholder.text, currentContent.sections.stakeholder.items)}
            {renderSection(currentContent.sections.improvement.title, currentContent.sections.improvement.text, currentContent.sections.improvement.items)}
            {renderSection(currentContent.sections.compliance.title, currentContent.sections.compliance.text, currentContent.sections.compliance.items)}

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{currentContent.sections.contact.title}</h2>
              <p className="text-white/70 mb-4">{currentContent.sections.contact.text}</p>
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                <p className="text-white/70 mb-2"><strong className="text-white">{currentContent.sections.contact.officer}</strong></p>
                <p className="text-white/70 mb-2"><strong className="text-white">{currentContent.sections.contact.email}</strong> ethics@infinity6.ai</p>
                
                <p className="text-white/70"><strong className="text-white">{currentContent.sections.contact.address}</strong> {currentContent.sections.contact.company}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;
