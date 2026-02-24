import type { Language } from '@/types/language';

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

type SEODataMap = Record<string, Record<Language, PageSEO>>;

export const seoData: SEODataMap = {
  home: {
    pt: {
      title: 'infinity6 – Inteligência Preditiva para Empresas',
      description: 'Transformamos dados em decisões que antecipam o mercado. IA preditiva para aumentar receita, proteger margem e acelerar crescimento.',
      keywords: [
        'inteligência artificial para empresas',
        'IA aplicada a negócios',
        'inteligência preditiva',
        'crescimento previsível',
        'growth intelligence',
        'IA para crescimento',
        'IA para precificação',
        'machine learning para varejo',
      ],
    },
    en: {
      title: 'infinity6 – Predictive Intelligence for Business',
      description: 'We turn data into decisions that anticipate the market. Predictive AI to grow revenue, protect margins and accelerate growth.',
      keywords: [
        'artificial intelligence for business',
        'applied AI',
        'predictive intelligence',
        'predictable growth',
        'growth intelligence',
        'AI for pricing',
        'machine learning for retail',
      ],
    },
  },
  solutions: {
    pt: {
      title: 'Soluções de IA Preditiva | infinity6',
      description: 'Recomendação em tempo real, preço dinâmico, forecasting adaptativo. Soluções de IA que aumentam ticket médio, reduzem churn e otimizam margem.',
      keywords: [
        'motor de recomendação B2B',
        'dynamic pricing varejo',
        'forecast preditivo',
        'precificação inteligente',
        'otimização de sortimento',
        'elasticidade de preço',
        'IA para supply chain',
        'propensão de compra por cliente',
      ],
    },
    en: {
      title: 'Predictive AI Solutions | infinity6',
      description: 'Real-time recommendations, dynamic pricing, adaptive forecasting. AI solutions that increase average ticket, reduce churn and optimize margins.',
      keywords: [
        'B2B recommendation engine',
        'retail dynamic pricing',
        'predictive forecasting',
        'intelligent pricing',
        'assortment optimization',
        'price elasticity',
        'AI for supply chain',
        'customer purchase propensity',
      ],
    },
  },
  successStories: {
    pt: {
      title: 'Cases de Sucesso com IA | infinity6',
      description: 'Veja como empresas aumentaram receita, protegeram margem e reduziram rupturas com inteligência preditiva da infinity6.',
      keywords: [
        'como aumentar ticket médio',
        'como reduzir churn',
        'como prever demanda',
        'como melhorar margem de lucro',
        'ROI de campanhas',
        'personalização preditiva',
        'como reduzir ruptura de estoque',
        'como definir preço dinâmico',
      ],
    },
    en: {
      title: 'AI Success Stories | infinity6',
      description: 'See how companies grew revenue, protected margins and reduced stockouts with infinity6 predictive intelligence.',
      keywords: [
        'increase average ticket',
        'reduce churn',
        'demand forecasting',
        'improve profit margins',
        'campaign ROI',
        'predictive personalization',
        'reduce stockouts',
        'dynamic pricing strategy',
      ],
    },
  },
  contact: {
    pt: {
      title: 'Fale Conosco | infinity6',
      description: 'Agende uma conversa estratégica. Colocamos IA preditiva em produção em 4-12 semanas com impacto financeiro mensurável.',
      keywords: [
        'IA para indústria',
        'inteligência comercial B2B',
        'recomendação para PDV',
        'IA para previsão de demanda',
      ],
    },
    en: {
      title: 'Contact Us | infinity6',
      description: 'Schedule a strategic conversation. We deploy predictive AI into production in 4-12 weeks with measurable financial impact.',
      keywords: [
        'AI for industry',
        'B2B commercial intelligence',
        'point of sale recommendation',
        'AI demand forecasting',
      ],
    },
  },
  privacyPolicy: {
    pt: {
      title: 'Política de Privacidade | infinity6',
      description: 'Saiba como a infinity6 protege e gerencia seus dados pessoais com transparência e segurança.',
      keywords: ['política de privacidade', 'LGPD', 'proteção de dados'],
    },
    en: {
      title: 'Privacy Policy | infinity6',
      description: 'Learn how infinity6 protects and manages your personal data with transparency and security.',
      keywords: ['privacy policy', 'GDPR', 'data protection'],
    },
  },
  ethicsPolicy: {
    pt: {
      title: 'Política de Ética em IA | infinity6',
      description: 'Nosso compromisso com IA ética, transparente e responsável em todas as soluções.',
      keywords: ['ética em IA', 'IA responsável', 'transparência'],
    },
    en: {
      title: 'AI Ethics Policy | infinity6',
      description: 'Our commitment to ethical, transparent and responsible AI across all solutions.',
      keywords: ['AI ethics', 'responsible AI', 'transparency'],
    },
  },
};
