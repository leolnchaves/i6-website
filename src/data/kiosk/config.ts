import type { TerritoryId } from '@/data/solutionsV2/content';

export type KioskLang = 'pt' | 'en';

export interface QuizOption {
  id: string;
  label: string;
  territory: TerritoryId;
}

export interface QuizContent {
  intro: {
    eyebrow: string;
    title: string;
    subtitle: string;
    startCta: string;
  };
  question: {
    label: string;
    text: string;
    helper: string;
  };
  options: QuizOption[];
  continueCta: string;
  results: {
    eyebrow: string;
    title: string;
    subtitle: string;
    selectSolutionHint: string;
    signalEyebrow: string;
    signalTitle: string;
    signalSubtitle: string;
    signalPickHint: string;
  };
  ebook: {
    eyebrow: string;
    title: (solutionTitle: string) => string;
    subtitle: string;
    cta: string;
    nameLabel: string;
    emailLabel: string;
    submit: string;
    sending: string;
    invalidName: string;
    invalidEmail: string;
    privacy: string;
    successTitle: string;
    successBody: string;
    successFooter: string;
    error: string;
  };
  attract: {
    brand: string;
    headline: string;
    tapHint: string;
  };
  footer: {
    resetLabel: string;
    tagline: string;
  };
}

export const kioskContent: Record<KioskLang, QuizContent> = {
  pt: {
    intro: {
      eyebrow: 'infinity6 · Experiência Interativa',
      title: 'Descubra em 30 segundos como a IA da infinity6 pode gerar valor para o seu negócio.',
      subtitle: 'Responda uma pergunta rápida e veja soluções e sinais preditivos personalizados para o seu contexto.',
      startCta: 'Começar',
    },
    question: {
      label: 'Passo 1 de 1',
      text: 'Qual é o seu maior desafio hoje?',
      helper: 'Selecione uma ou mais opções.',
    },
    options: [
      {
        id: 'grow',
        label: 'Crescer receita, conversão e ticket',
        territory: 'growth',
      },
      {
        id: 'plan',
        label: 'Prever demanda e evitar ruptura ou excesso',
        territory: 'planning',
      },
      {
        id: 'price',
        label: 'Precificar melhor e proteger margem',
        territory: 'pricing',
      },
    ],
    continueCta: 'Ver soluções',
    results: {
      eyebrow: 'Suas alavancas preditivas',
      title: 'Estas são as soluções mais relevantes para o seu desafio.',
      subtitle: 'Toque em uma solução para ver o exemplo de aplicação.',
      selectSolutionHint: 'Toque em uma solução acima',
      signalEyebrow: 'i6 Signal',
      signalTitle: 'Converse com a camada preditiva.',
      signalSubtitle: 'Toque em uma pergunta para ver como a infinity6 transforma dados em decisão.',
      signalPickHint: 'Escolha uma pergunta',
    },
    ebook: {
      eyebrow: 'Leve o conteúdo com você',
      title: (t) => `Receba o eBook: ${t}`,
      subtitle: 'Deixe seu nome e email e enviamos o material completo em minutos.',
      cta: 'Quero receber',
      nameLabel: 'Nome',
      emailLabel: 'Email',
      submit: 'Enviar',
      sending: 'Enviando...',
      invalidName: 'Informe seu nome',
      invalidEmail: 'Email inválido',
      privacy: 'Ao enviar, você concorda com nossa Política de Privacidade.',
      successTitle: 'Tudo certo',
      successBody: 'Enviamos o material para o seu email. Deve chegar em alguns minutos.',
      successFooter: 'Se não aparecer na caixa de entrada, verifique a pasta de SPAM.',
      error: 'Não foi possível enviar. Tente novamente.',
    },
    attract: {
      brand: 'infinity6',
      headline: 'IA aplicada que vira decisão.',
      tapHint: 'Toque para começar',
    },
    footer: {
      resetLabel: 'Recomeçar',
      tagline: 'infinity6 · IA aplicada a resultado',
    },
  },
  en: {
    intro: {
      eyebrow: 'infinity6 · Interactive Experience',
      title: 'Discover in 30 seconds how infinity6 AI can create value for your business.',
      subtitle: 'Answer one quick question and see solutions and predictive signals tailored to your context.',
      startCta: 'Start',
    },
    question: {
      label: 'Step 1 of 1',
      text: 'What is your biggest challenge today?',
      helper: 'Select one or more options.',
    },
    options: [
      { id: 'grow', label: 'Grow revenue, conversion and ticket', territory: 'growth' },
      { id: 'plan', label: 'Forecast demand and avoid stockout or excess', territory: 'planning' },
      { id: 'price', label: 'Price better and protect margin', territory: 'pricing' },
    ],
    continueCta: 'See solutions',
    results: {
      eyebrow: 'Your predictive levers',
      title: 'These are the solutions most relevant to your challenge.',
      subtitle: 'Tap a solution to see an example.',
      selectSolutionHint: 'Tap a solution above',
      signalEyebrow: 'i6 Signal',
      signalTitle: 'Chat with the predictive layer.',
      signalSubtitle: 'Tap a question to see how infinity6 turns data into decisions.',
      signalPickHint: 'Pick a question',
    },
    ebook: {
      eyebrow: 'Take the content with you',
      title: (t) => `Get the eBook: ${t}`,
      subtitle: 'Leave your name and email and we will send the full material in minutes.',
      cta: 'I want it',
      nameLabel: 'Name',
      emailLabel: 'Email',
      submit: 'Submit',
      sending: 'Sending...',
      invalidName: 'Enter your name',
      invalidEmail: 'Invalid email',
      privacy: 'By submitting, you agree to our Privacy Policy.',
      successTitle: 'All set',
      successBody: 'We just sent the material to your inbox. It should arrive in a few minutes.',
      successFooter: "If you don't see it, please check your SPAM folder.",
      error: 'Could not submit. Please try again.',
    },
    attract: {
      brand: 'infinity6',
      headline: 'Applied AI that becomes decision.',
      tapHint: 'Tap to begin',
    },
    footer: {
      resetLabel: 'Restart',
      tagline: 'infinity6 · applied AI for results',
    },
  },
};

/**
 * Map from solutionId → i6Signal scenario keys to show for that solution.
 * Scenario keys must match `Scenario` type from I6SignalDemo.tsx.
 */
export const solutionSignalMap: Record<string, ('supply' | 'forecast' | 'pricing' | 'comercial' | 'mix' | 'pdv')[]> = {
  'predictive-personalization': ['pdv', 'comercial'],
  'smart-discovery': ['pdv', 'comercial'],
  'predictive-campaign-targeting': ['comercial', 'pdv'],
  'demand-forecasting': ['forecast', 'supply'],
  'predictive-commercial-targets': ['comercial', 'forecast'],
  'mix-assortment-order': ['mix', 'forecast'],
  'price-to-margin': ['pricing', 'mix'],
  'price-to-turnover': ['pricing', 'supply'],
  'price-to-conversion': ['pricing', 'comercial'],
};

/**
 * Per-solution eBook copy. The actual PDF asset lives in i6Hub — the kiosk
 * only passes an identifier via the `subscription` field so i6Hub knows which
 * PDF to email. Titles here are shown to the visitor.
 */
export const solutionEbook: Record<string, { pt: string; en: string }> = {
  'predictive-personalization': {
    pt: 'Personalização Preditiva na prática',
    en: 'Predictive Personalization in practice',
  },
  'smart-discovery': {
    pt: 'Descoberta Preditiva: convertendo tráfego anônimo',
    en: 'Smart Discovery: converting anonymous traffic',
  },
  'predictive-campaign-targeting': {
    pt: 'Campanhas por Propensão: mais conversão, menos CAC',
    en: 'Predictive Campaign Targeting: more conversion, less CAC',
  },
  'demand-forecasting': {
    pt: 'Forecast Preditivo de Demanda por SKU e PDV',
    en: 'Predictive Demand Forecast by SKU and POS',
  },
  'predictive-commercial-targets': {
    pt: 'Metas Comerciais Preditivas',
    en: 'Predictive Commercial Goals',
  },
  'mix-assortment-order': {
    pt: 'Mix, Sortimento e Pedido Ideal',
    en: 'Predictive Assortment & Order Recommendation',
  },
  'price-to-margin': {
    pt: 'Preço Orientado à Margem',
    en: 'Price-to-Margin playbook',
  },
  'price-to-turnover': {
    pt: 'Preço Orientado ao Giro',
    en: 'Price-to-Turnover playbook',
  },
  'price-to-conversion': {
    pt: 'Preço Orientado à Conversão',
    en: 'Price-to-Conversion playbook',
  },
};

export const KIOSK_INACTIVITY_MS = 90_000;
