import type { ContentLang } from '@/utils/localizedPath';
import type { Language } from '@/types/language';
import ourAIMeta from '@/data/ourAIMeta.json';

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

// ES é opcional: quando ausente, a página cai no par PT/EN.
type SEODataMap = Record<string, Record<ContentLang, PageSEO> & { es?: PageSEO }>;

export const seoData: SEODataMap = {
  home: {
    pt: {
      title: 'infinity6 – i6 Decision Platform',
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
      title: 'infinity6 – i6 Decision Platform',
      description: 'Decide before the market. Applied-AI platform that turns anticipated decisions into revenue growth, margin protection and faster results.',
      keywords: [
        'i6 Decision Platform',
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
    es: {
      title: 'Casos de Éxito con IA | infinity6',
      description: 'Vea cómo las empresas aumentaron ingresos, protegieron margen y redujeron quiebres de stock con la inteligencia predictiva de infinity6.',
      keywords: [
        'aumentar ticket promedio',
        'reducir churn',
        'previsión de demanda',
        'mejorar margen',
        'ROI de campañas',
        'personalización predictiva',
        'reducir quiebre de stock',
        'precio dinámico',
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
  // Fonte única de title/description/keywords de /our-ai: também usada pelo prerender.
  'our-ai': ourAIMeta as Record<Language, PageSEO>,
  i6Builders: {
    pt: {
      title: 'i6 Builder Platform — Engines, SDKs e APIs de modelagem',
      description: 'Plataforma de modelagem da infinity6 para times de tecnologia: engines preditivos, SDKs, APIs e toolkits para construir produtos próprios de decisão orientada a dados.',
      keywords: [
        'plataforma de modelagem',
        'SDK de machine learning',
        'API de previsão',
        'engines preditivos',
        'OEM de IA',
        'IA embarcada em produto',
      ],
    },
    en: {
      title: 'i6 Builder Platform — Modeling engines, SDKs and APIs',
      description: 'The infinity6 modeling platform for technology teams: predictive engines, SDKs, APIs and toolkits to build your own data-driven decision products.',
      keywords: [
        'modeling platform',
        'machine learning SDK',
        'forecasting API',
        'predictive engines',
        'AI OEM',
        'embedded AI product',
      ],
    },
  },
  comunidade: {
    pt: {
      title: 'Comunidade infinity6 — para quem constrói decisão com dados',
      description: 'Comunidade técnica da infinity6 para times que projetam, treinam e colocam modelos de decisão em produção: Office Hours, meetups regionais e Builder Summit',
      keywords: [
        'comunidade técnica de IA',
        'machine learning em produção',
        'forecasting',
        'sistemas de recomendação',
        'meetup de dados',
        'builder summit',
      ],
    },
    en: {
      title: 'infinity6 community — for people who build decisions with data',
      description: 'The infinity6 technical community for teams that design, train and ship decision models to production: Office Hours, regional meetups and Builder Summit',
      keywords: [
        'AI technical community',
        'machine learning in production',
        'forecasting',
        'recommender systems',
        'data meetup',
        'builder summit',
      ],
    },
  },
  docs: {
    pt: {
      title: 'Documentação i6 — engines, SDKs e APIs de modelagem',
      description: 'Referência técnica da infinity6: autenticação, envio de dados, execução de modelagem, consumo de predições e códigos de erro das APIs e SDKs',
      keywords: [
        'documentação técnica',
        'referência de API',
        'SDK de machine learning',
        'autenticação de API',
        'engines preditivos',
        'integração de dados',
      ],
    },
    en: {
      title: 'i6 documentation — modeling engines, SDKs and APIs',
      description: 'infinity6 technical reference: authentication, data ingestion, modeling executions, prediction retrieval and error codes for the APIs and SDKs',
      keywords: [
        'technical documentation',
        'API reference',
        'machine learning SDK',
        'API authentication',
        'predictive engines',
        'data integration',
      ],
    },
  },
};


