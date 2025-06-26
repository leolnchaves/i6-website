import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.solutions': 'Solutions',
    'header.successStories': 'Success Stories',
    'header.contact': 'Contact Us',
    'header.getStarted': 'Get Started',
    
    // Hero Section
    'hero.infinite': 'Infinite',
    'hero.possibilities': 'Possibilities',
    'hero.poweredByAI': 'Powered by AI',
    'hero.description': 'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.',
    'hero.startJourney': 'Start Your Journey',
    'hero.watchDemo': 'Watch Demo',
    
    // Results Section
    'results.title': 'Real AI Impact That Drives Business Growth',
    'results.subtitle1': 'No more GenAI solutions and agents that don\'t deliver real results. No more focus only on software productivity. No more high technical complexity and long integration journeys.',
    'results.subtitle2': 'Our unique approach combines advanced artificial intelligence with business strategy, delivering measurable impact and real transformation for your company.',
    'results.conversionRate.title': 'Conversion Rate Optimization',
    'results.conversionRate.description': 'Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations',
    'results.crmCost.title': 'CRM Cost Reduction',
    'results.crmCost.description': 'Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality',
    'results.avgTicket.title': 'Average Ticket Enhancement',
    'results.avgTicket.description': 'Substantial increase in average ticket value through AI-guided cross-selling with diversity balancing',
    'results.bounceRate.title': 'Bounce Rate Optimization',
    'results.bounceRate.description': 'Significant reduction of bounce rate in digital funnels through AI-driven user experience optimization',
    'results.proposalEngagement.title': 'Enhanced Proposal Engagement',
    'results.proposalEngagement.description': 'Data-driven insights and AI-powered personalization dramatically improve proposal success rates',
    'results.realTimeRec.title': 'Real-Time Recommendations',
    'results.realTimeRec.description': 'Predictive behavior recommendations with equal precision for logged users (with history) and anonymous users (without history)',
    'results.productDiscovery.title': 'Relevant Product Discovery',
    'results.productDiscovery.description': 'AI-powered product complementarity discovery based on navigation behavior patterns and user preferences',
    'results.dynamicPricing.title': 'Dynamic Pricing Intelligence',
    'results.dynamicPricing.description': 'Self-reinforcing pricing model adjusting prices based on demand, where adjustments increase either demand or margin, feeding back into the system',
    'results.marketDemand.title': 'Market Demand Forecasting',
    'results.marketDemand.description': 'AI-powered forecast precision directing production plans and commercial goals, optimizing stock breaks and turnover',
    'results.rapidImplementation.title': 'Rapid Implementation',
    'results.rapidImplementation.description': '100% API-first and cloud-native AI solutions deliver measurable outcomes in weeks, not months',
    
    // Stats Section
    'stats.companiesTransformed': 'Companies Transformed',
    'stats.accuracyRate': 'Accuracy Rate',
    'stats.expertSupport': 'Expert Support',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Business?',
    'cta.description': 'Join hundreds of companies that have already unlocked their infinite potential.',
    'cta.button': 'Get Started Today',
    
    // Video Modal
    'video.title': 'AI Solutions Demo',
    'video.close': 'Close',
    
    // Solutions Page
    'solutions.hero.title': 'AI Solutions That',
    'solutions.hero.subtitle': 'Drive Results',
    'solutions.hero.description': 'Discover our comprehensive suite of AI-powered solutions designed to transform your business operations and accelerate growth.',
    'solutions.aiAnalytics.title': 'AI Analytics',
    'solutions.aiAnalytics.description': 'Transform raw data into actionable insights with our advanced machine learning algorithms.',
    'solutions.aiAnalytics.feature1': 'Predictive Analytics',
    'solutions.aiAnalytics.feature2': 'Real-time Processing',
    'solutions.aiAnalytics.feature3': 'Custom Dashboards',
    'solutions.aiAnalytics.feature4': 'API Integration',
    'solutions.processAutomation.title': 'Process Automation',
    'solutions.processAutomation.description': 'Streamline operations and reduce costs with intelligent automation solutions.',
    'solutions.processAutomation.feature1': 'Workflow Automation',
    'solutions.processAutomation.feature2': 'Document Processing',
    'solutions.processAutomation.feature3': 'Quality Control',
    'solutions.processAutomation.feature4': 'Performance Monitoring',
    'solutions.dataIntelligence.title': 'Data Intelligence',
    'solutions.dataIntelligence.description': 'Unlock the full potential of your data with comprehensive intelligence solutions.',
    'solutions.dataIntelligence.feature1': 'Data Mining',
    'solutions.dataIntelligence.feature2': 'Pattern Recognition',
    'solutions.dataIntelligence.feature3': 'Anomaly Detection',
    'solutions.dataIntelligence.feature4': 'Trend Analysis',
    'solutions.cloudIntegration.title': 'Cloud Integration',
    'solutions.cloudIntegration.description': 'Seamlessly integrate AI capabilities with your existing cloud infrastructure.',
    'solutions.cloudIntegration.feature1': 'Multi-Cloud Support',
    'solutions.cloudIntegration.feature2': 'Scalable Architecture',
    'solutions.cloudIntegration.feature3': 'Security Compliance',
    'solutions.cloudIntegration.feature4': 'Cost Optimization',
    'solutions.learnMore': 'Learn More',
    'solutions.process.title': 'Our Implementation Process',
    'solutions.process.description': 'We follow a proven methodology to ensure successful AI integration and maximum return on investment.',
    'solutions.process.discovery.title': 'Discovery',
    'solutions.process.discovery.description': 'Analyze your current systems and identify opportunities',
    'solutions.process.strategy.title': 'Strategy',
    'solutions.process.strategy.description': 'Develop a customized AI implementation roadmap',
    'solutions.process.implementation.title': 'Implementation',
    'solutions.process.implementation.description': 'Deploy and integrate AI solutions seamlessly',
    'solutions.process.optimization.title': 'Optimization',
    'solutions.process.optimization.description': 'Monitor, refine, and scale for maximum impact',
    'solutions.cta.title': 'Ready to Implement AI Solutions?',
    'solutions.cta.description': 'Contact our experts today to discuss how our AI solutions can transform your business.',
    'solutions.cta.button': 'Schedule Consultation',
    
    // Success Stories Page
    'successStories.title': 'Success Stories',
    'successStories.subtitle': 'Real Results from Real Companies',
    'successStories.description': 'Discover how leading companies have transformed their operations with our AI solutions.',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in Touch',
    'contact.description': 'Ready to transform your business with AI? Contact our experts today.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company Name',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Business Hours',
    
    // Footer
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.news': 'News',
    'footer.solutions': 'Solutions',
    'footer.aiAnalytics': 'AI Analytics',
    'footer.automation': 'Automation',
    'footer.dataIntelligence': 'Data Intelligence',
    'footer.support': 'Support',
    'footer.documentation': 'Documentation',
    'footer.help': 'Help Center',
    'footer.contactSupport': 'Contact Support',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.ethics': 'Ethics Policy',
    'footer.copyright': '© 2024 Infinity6. All rights reserved.',
    'footer.followUs': 'Follow Us',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your privacy is our priority. Learn how we protect and handle your data.',
    'privacy.lastUpdated': 'Last updated: December 2024',
    
    // Ethics Policy
    'ethics.title': 'Ethics Policy',
    'ethics.subtitle': 'Our commitment to ethical AI and responsible business practices.',
    'ethics.lastUpdated': 'Last updated: December 2024',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.subtitle': 'Oops! Page not found',
    'notFound.backHome': 'Return to Home'
  },
  pt: {
    // Header
    'header.home': 'Início',
    'header.solutions': 'Soluções',
    'header.successStories': 'Cases de Sucesso',
    'header.contact': 'Contato',
    'header.getStarted': 'Começar',
    
    // Hero Section
    'hero.infinite': 'Infinitas',
    'hero.possibilities': 'Possibilidades',
    'hero.poweredByAI': 'Impulsionadas por IA',
    'hero.description': 'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.',
    'hero.startJourney': 'Iniciar Jornada',
    'hero.watchDemo': 'Ver Demo',
    
    // Results Section
    'results.title': 'Impacto Real de IA Que Gera Crescimento dos Negócios',
    'results.subtitle1': 'Chega de soluções GenAI e agentes que não entregam resultados reais. Chega de focar apenas na produtividade de software. Chega de alta complexidade técnica e longas jornadas de integração.',
    'results.subtitle2': 'Nossa abordagem única combina inteligência artificial avançada com estratégia de negócios, entregando impacto mensurável e transformação real para sua empresa.',
    'results.conversionRate.title': 'Otimização da Taxa de Conversão',
    'results.conversionRate.description': 'Algoritmos avançados de IA aumentam taxas de conversão através de análise inteligente do comportamento do cliente e recomendações personalizadas',
    'results.crmCost.title': 'Redução de Custos CRM',
    'results.crmCost.description': 'Operações otimizadas e processos automatizados reduzem significativamente despesas operacionais mantendo a qualidade do serviço',
    'results.avgTicket.title': 'Aumento do Ticket Médio',
    'results.avgTicket.description': 'Aumento substancial no valor do ticket médio através de cross-selling guiado por IA com balanceamento de diversidade',
    'results.bounceRate.title': 'Otimização da Taxa de Rejeição',
    'results.bounceRate.description': 'Redução significativa da taxa de rejeição em funis digitais através de otimização de experiência do usuário guiada por IA',
    'results.proposalEngagement.title': 'Engajamento Aprimorado de Propostas',
    'results.proposalEngagement.description': 'Insights baseados em dados e personalização impulsionada por IA melhoram drasticamente as taxas de sucesso de propostas',
    'results.realTimeRec.title': 'Recomendações em Tempo Real',
    'results.realTimeRec.description': 'Recomendações preditivas de comportamento com precisão igual para usuários logados (com histórico) e usuários anônimos (sem histórico)',
    'results.productDiscovery.title': 'Descoberta Relevante de Produtos',
    'results.productDiscovery.description': 'Descoberta de complementaridade de produtos impulsionada por IA baseada em padrões de comportamento de navegação e preferências do usuário',
    'results.dynamicPricing.title': 'Inteligência de Preços Dinâmica',
    'results.dynamicPricing.description': 'Modelo de preços auto-reforçado ajustando preços baseado na demanda, onde ajustes aumentam demanda ou margem, realimentando o sistema',
    'results.marketDemand.title': 'Previsão de Demanda de Mercado',
    'results.marketDemand.description': 'Precisão de previsão impulsionada por IA direcionando planos de produção e metas comerciais, otimizando quebras de estoque e giro',
    'results.rapidImplementation.title': 'Implementação Rápida',
    'results.rapidImplementation.description': 'Soluções de IA 100% API-first e cloud-native entregam resultados mensuráveis em semanas, não meses',
    
    // Stats Section
    'stats.companiesTransformed': 'Empresas Transformadas',
    'stats.accuracyRate': 'Taxa de Precisão',
    'stats.expertSupport': 'Suporte Especializado',
    
    // CTA Section
    'cta.title': 'Pronto para Transformar Seu Negócio?',
    'cta.description': 'Junte-se a centenas de empresas que já desbloquearam seu potencial infinito.',
    'cta.button': 'Começar Hoje',
    
    // Video Modal
    'video.title': 'Demo de Soluções IA',
    'video.close': 'Fechar',
    
    // Solutions Page
    'solutions.hero.title': 'Soluções de IA Que',
    'solutions.hero.subtitle': 'Geram Resultados',
    'solutions.hero.description': 'Descubra nosso conjunto abrangente de soluções impulsionadas por IA projetadas para transformar as operações do seu negócio e acelerar o crescimento.',
    'solutions.aiAnalytics.title': 'Analytics com IA',
    'solutions.aiAnalytics.description': 'Transforme dados brutos em insights acionáveis com nossos algoritmos avançados de aprendizado de máquina.',
    'solutions.aiAnalytics.feature1': 'Analytics Preditiva',
    'solutions.aiAnalytics.feature2': 'Processamento em Tempo Real',
    'solutions.aiAnalytics.feature3': 'Dashboards Personalizados',
    'solutions.aiAnalytics.feature4': 'Integração de API',
    'solutions.processAutomation.title': 'Automação de Processos',
    'solutions.processAutomation.description': 'Otimize operações e reduza custos com soluções inteligentes de automação.',
    'solutions.processAutomation.feature1': 'Automação de Fluxo de Trabalho',
    'solutions.processAutomation.feature2': 'Processamento de Documentos',
    'solutions.processAutomation.feature3': 'Controle de Qualidade',
    'solutions.processAutomation.feature4': 'Monitoramento de Performance',
    'solutions.dataIntelligence.title': 'Inteligência de Dados',
    'solutions.dataIntelligence.description': 'Desbloqueie todo o potencial dos seus dados com soluções abrangentes de inteligência.',
    'solutions.dataIntelligence.feature1': 'Mineração de Dados',
    'solutions.dataIntelligence.feature2': 'Reconhecimento de Padrões',
    'solutions.dataIntelligence.feature3': 'Detecção de Anomalias',
    'solutions.dataIntelligence.feature4': 'Análise de Tendências',
    'solutions.cloudIntegration.title': 'Integração na Nuvem',
    'solutions.cloudIntegration.description': 'Integre perfeitamente capacidades de IA com sua infraestrutura de nuvem existente.',
    'solutions.cloudIntegration.feature1': 'Suporte Multi-Nuvem',
    'solutions.cloudIntegration.feature2': 'Arquitetura Escalável',
    'solutions.cloudIntegration.feature3': 'Compliance de Segurança',
    'solutions.cloudIntegration.feature4': 'Otimização de Custos',
    'solutions.learnMore': 'Saiba Mais',
    'solutions.process.title': 'Nosso Processo de Implementação',
    'solutions.process.description': 'Seguimos uma metodologia comprovada para garantir integração bem-sucedida de IA e máximo retorno sobre investimento.',
    'solutions.process.discovery.title': 'Descoberta',
    'solutions.process.discovery.description': 'Analisamos seus sistemas atuais e identificamos oportunidades',
    'solutions.process.strategy.title': 'Estratégia',
    'solutions.process.strategy.description': 'Desenvolvemos um roadmap personalizado de implementação de IA',
    'solutions.process.implementation.title': 'Implementação',
    'solutions.process.implementation.description': 'Implantamos e integramos soluções de IA perfeitamente',
    'solutions.process.optimization.title': 'Otimização',
    'solutions.process.optimization.description': 'Monitoramos, refinamos e escalamos para máximo impacto',
    'solutions.cta.title': 'Pronto para Implementar Soluções de IA?',
    'solutions.cta.description': 'Entre em contato com nossos especialistas hoje para discutir como nossas soluções de IA podem transformar seu negócio.',
    'solutions.cta.button': 'Agendar Consultoria',
    
    // Success Stories Page
    'successStories.title': 'Cases de Sucesso',
    'successStories.subtitle': 'Resultados Reais de Empresas Reais',
    'successStories.description': 'Descubra como empresas líderes transformaram suas operações com nossas soluções de IA.',
    
    // Contact Page
    'contact.title': 'Contato',
    'contact.subtitle': 'Entre em Contato',
    'contact.description': 'Pronto para transformar seu negócio com IA? Entre em contato com nossos especialistas hoje.',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'Endereço de Email',
    'contact.form.company': 'Nome da Empresa',
    'contact.form.message': 'Mensagem',
    'contact.form.send': 'Enviar Mensagem',
    'contact.info.address': 'Endereço',
    'contact.info.phone': 'Telefone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Horário Comercial',
    
    // Footer
    'footer.company': 'Empresa',
    'footer.about': 'Sobre Nós',
    'footer.careers': 'Carreiras',
    'footer.news': 'Notícias',
    'footer.solutions': 'Soluções',
    'footer.aiAnalytics': 'Analytics com IA',
    'footer.automation': 'Automação',
    'footer.dataIntelligence': 'Inteligência de Dados',
    'footer.support': 'Suporte',
    'footer.documentation': 'Documentação',
    'footer.help': 'Central de Ajuda',
    'footer.contactSupport': 'Contatar Suporte',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Serviço',
    'footer.ethics': 'Política de Ética',
    'footer.copyright': '© 2024 Infinity6. Todos os direitos reservados.',
    'footer.followUs': 'Siga-nos',
    
    // Privacy Policy
    'privacy.title': 'Política de Privacidade',
    'privacy.subtitle': 'Sua privacidade é nossa prioridade. Saiba como protegemos e tratamos seus dados.',
    'privacy.lastUpdated': 'Última atualização: Dezembro 2024',
    
    // Ethics Policy
    'ethics.title': 'Política de Ética',
    'ethics.subtitle': 'Nosso compromisso com IA ética e práticas comerciais responsáveis.',
    'ethics.lastUpdated': 'Última atualização: Dezembro 2024',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.subtitle': 'Ops! Página não encontrada',
    'notFound.backHome': 'Voltar ao Início'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
