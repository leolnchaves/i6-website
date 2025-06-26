
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
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Business?',
    'cta.description': 'Join hundreds of companies that have already unlocked their infinite potential.',
    'cta.button': 'Get Started Today',
    
    // Video Modal
    'video.title': 'AI Solutions Demo',
    'video.close': 'Close'
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
    
    // CTA Section
    'cta.title': 'Pronto para Transformar Seu Negócio?',
    'cta.description': 'Junte-se a centenas de empresas que já desbloquearam seu potencial infinito.',
    'cta.button': 'Começar Hoje',
    
    // Video Modal
    'video.title': 'Demo de Soluções IA',
    'video.close': 'Fechar'
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
