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
      title: 'infinity6 – The Platform for Decision Advantage',
      description: 'Decida antes do mercado. Plataforma de IA aplicada que transforma decisões antecipadas em crescimento de receita, proteção de margem e aceleração de resultados.',
      keywords: [
        'plataforma de decisão',
        'decision advantage',
        'IA aplicada a negócios',
        'inteligência preditiva',
        'crescimento previsível',
        'growth intelligence',
        'IA para precificação',
        'machine learning para varejo',
      ],
    },
    en: {
      title: 'infinity6 – The Platform for Decision Advantage',
      description: 'Decide before the market. Applied-AI platform that turns anticipated decisions into revenue growth, margin protection and faster results.',
      keywords: [
        'decision advantage platform',
        'applied AI',
        'decision intelligence',
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
  insights: {
    pt: {
      title: 'Insights de IA Preditiva | infinity6',
      description: 'Artigos e análises sobre previsão de demanda, forecast de vendas, pricing dinâmico e crescimento de receita com IA.',
      keywords: ['previsão de demanda', 'forecast de vendas', 'gestão de demanda', 'IA para empresas', 'precificação dinâmica', 'inteligência preditiva'],
    },
    en: {
      title: 'Predictive AI Insights | infinity6',
      description: 'Articles and analysis on demand forecasting, dynamic pricing, recommendation engines and revenue growth with AI.',
      keywords: ['demand forecasting', 'sales forecasting', 'predictive AI', 'dynamic pricing', 'recommendation engine'],
    },
  },
  'our-ai': {
    pt: {
      title: 'Proprietary AI — Motores de IA da infinity6',
      description: 'Conheça os motores proprietários da infinity6: i6 RecSys, i6 Previsio, i6 ElasticPrice e i6 Signal. IA aplicada que aprende comportamento, antecipa decisão e prescreve ação.',
      keywords: [
        'IA proprietária brasileira',
        'motor de recomendação',
        'previsão de demanda com IA',
        'precificação dinâmica',
        'i6-RecSys-Base.g1',
        'MAML',
        'Active Learning',
        'IA explicável',
        'predição comportamental',
      ],
    },
    en: {
      title: 'Proprietary AI — infinity6 AI Engines',
      description: 'Meet infinity6 proprietary engines: i6 RecSys, i6 Previsio, i6 ElasticPrice and i6 Signal. Applied AI that learns behavior, anticipates decisions and prescribes action.',
      keywords: [
        'proprietary AI engines',
        'recommendation engine',
        'predictive demand forecasting',
        'dynamic pricing AI',
        'i6-RecSys-Base.g1',
        'MAML foundation model',
        'Active Learning',
        'explainable AI',
        'behavioral prediction',
      ],
    },
  },
};
