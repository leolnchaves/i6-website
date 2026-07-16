import type { TerritoryId } from '@/data/solutionsV2/content';

export type KioskLang = 'pt' | 'en';

export type PricingBucket = 'margin' | 'turnover' | 'conversion';

export interface QuizOption {
  id: string;
  label: string;
  /** Peso somado a cada bucket de pricing. Ausência = 0. */
  weights: Partial<Record<PricingBucket, number>>;
}

export interface QuizQuestion {
  id: string;
  eyebrow: string;
  text: string;
  helper?: string;
  options: QuizOption[];
}

export interface QuizContent {
  intro: {
    eyebrow: string;
    title: string;
    subtitle: string;
    startCta: string;
  };
  /** As três perguntas base (Q1..Q3). */
  questions: QuizQuestion[];
  /** Q4 — só exibida em caso de empate entre os dois maiores buckets. */
  tiebreaker: QuizQuestion;
  progressLabel: string; // ex.: "Passo {current} de {total}"
  continueCta: string;
  results: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tieTitle: string;
    tieSubtitle: string;
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

/** Bucket vencedor → solutionId correspondente. */
export const bucketToSolutionId: Record<PricingBucket, string> = {
  margin: 'price-to-margin',
  turnover: 'price-to-turnover',
  conversion: 'price-to-conversion',
};

/** IDs das 3 soluções de pricing (usadas no fallback de empate). */
export const PRICING_SOLUTION_IDS = [
  'price-to-margin',
  'price-to-turnover',
  'price-to-conversion',
] as const;

// Territory kept exported for legacy imports elsewhere (unused here now).
export type { TerritoryId };

export const kioskContent: Record<KioskLang, QuizContent> = {
  pt: {
    intro: {
      eyebrow: 'infinity6 · Experiência Interativa',
      title: 'Descubra em 30 segundos qual estratégia de preço faz mais sentido para o seu negócio.',
      subtitle:
        'Responda três perguntas rápidas e veja qual das soluções de pricing preditivo da infinity6 se encaixa no seu contexto.',
      startCta: 'Começar',
    },
    questions: [
      {
        id: 'q1-roteamento',
        eyebrow: 'Pergunta 1',
        text: 'Com que frequência o seu preço precisa mudar para acompanhar o mercado?',
        helper: 'Escolha a opção que mais se aproxima da sua realidade.',
        options: [
          { id: 'q1-mensal', label: 'Uma vez por mês, ou por semana', weights: { margin: 2 } },
          {
            id: 'q1-encalhe',
            label: 'Toda semana, e muda de novo quando o produto encalha',
            weights: { turnover: 2 },
          },
          { id: 'q1-sessao', label: 'A cada visita do cliente ao site', weights: { conversion: 2 } },
          { id: 'q1-fixo', label: 'Nunca mudou. É tabela fixa', weights: {} },
        ],
      },
      {
        id: 'q2-granularidade',
        eyebrow: 'Pergunta 2',
        text: 'Qual é a menor unidade em que o preço é decidido hoje?',
        helper: 'Nível em que o preço realmente varia na sua operação.',
        options: [
          { id: 'q2-sku', label: 'O SKU. Mesmo preço em todo canal', weights: { margin: 2 } },
          { id: 'q2-sku-loja', label: 'O SKU em cada loja ou região', weights: { turnover: 2 } },
          {
            id: 'q2-cliente',
            label: 'O produto, para cada cliente que entra',
            weights: { conversion: 2 },
          },
        ],
      },
      {
        id: 'q3-dor',
        eyebrow: 'Pergunta 3',
        text: 'O que mais te incomoda no preço atual?',
        helper: 'A dor que você mais gostaria de resolver primeiro.',
        options: [
          {
            id: 'q3-margem',
            label: 'Margem que ficou na mesa em SKUs que aguentavam mais',
            weights: { margin: 2 },
          },
          {
            id: 'q3-estoque',
            label: 'Estoque parado e desconto dado no momento errado',
            weights: { turnover: 2 },
          },
          {
            id: 'q3-conversao',
            label: 'Visita que entrou, olhou e não converteu',
            weights: { conversion: 2 },
          },
        ],
      },
    ],
    tiebreaker: {
      id: 'q4-desempate',
      eyebrow: 'Última pergunta',
      text: 'O produto tem prazo para sair (coleção, validade, temporada)?',
      helper: 'Ajuda a definir a estratégia final.',
      options: [
        { id: 'q4-sim', label: 'Sim', weights: { turnover: 1 } },
        { id: 'q4-nao', label: 'Não, o giro é estável', weights: { margin: 1 } },
        { id: 'q4-sessao', label: 'O prazo é a própria sessão', weights: { conversion: 1 } },
      ],
    },
    progressLabel: 'Passo {current} de {total}',
    continueCta: 'Continuar',
    results: {
      eyebrow: 'Sua estratégia de preço recomendada',
      title: 'Esta é a solução de pricing mais aderente ao seu contexto.',
      subtitle: 'Explore o exemplo de aplicação abaixo.',
      tieTitle: 'Seu perfil combina mais de uma frente de pricing.',
      tieSubtitle: 'Toque em uma solução para ver o exemplo de aplicação.',
      selectSolutionHint: 'Toque em uma solução acima',
      signalEyebrow: 'i6 Signal',
      signalTitle: 'Converse com a camada preditiva.',
      signalSubtitle:
        'Toque em uma pergunta para ver como a infinity6 transforma dados em decisão.',
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
      headline: 'Decida <span class="text-[#F4845F]">ANTES</span> do mercado',
      tapHint: 'Toque para começar',
    },
    footer: {
      resetLabel: 'Recomeçar',
      tagline: 'infinity6 · IA aplicada a resultado',
    },
  },
  // NOTE: EN mirrors the PT structure so nothing quebra type-wise, mas o toggle
  // de idioma está temporariamente oculto no AttractScreen — traduzimos na
  // próxima rodada.
  en: {
    intro: {
      eyebrow: 'infinity6 · Interactive Experience',
      title: 'Discover in 30 seconds which pricing strategy fits your business.',
      subtitle:
        'Answer three quick questions and see which infinity6 predictive pricing solution matches your context.',
      startCta: 'Start',
    },
    questions: [
      {
        id: 'q1-routing',
        eyebrow: 'Question 1',
        text: 'How often does your price need to change to follow the market?',
        helper: 'Pick the option closest to your reality.',
        options: [
          { id: 'q1-monthly', label: 'Once a month, or once a week', weights: { margin: 2 } },
          {
            id: 'q1-stuck',
            label: 'Weekly, and again when a product gets stuck',
            weights: { turnover: 2 },
          },
          { id: 'q1-session', label: 'On every customer visit', weights: { conversion: 2 } },
          { id: 'q1-fixed', label: 'Never. It is a fixed price list', weights: {} },
        ],
      },
      {
        id: 'q2-granularity',
        eyebrow: 'Question 2',
        text: 'What is the smallest unit at which price is decided today?',
        options: [
          { id: 'q2-sku', label: 'The SKU. Same price across channels', weights: { margin: 2 } },
          { id: 'q2-sku-store', label: 'The SKU per store or region', weights: { turnover: 2 } },
          {
            id: 'q2-customer',
            label: 'The product, per customer visiting',
            weights: { conversion: 2 },
          },
        ],
      },
      {
        id: 'q3-pain',
        eyebrow: 'Question 3',
        text: 'What bothers you the most about pricing today?',
        options: [
          {
            id: 'q3-margin',
            label: 'Margin left on the table on SKUs that could hold more',
            weights: { margin: 2 },
          },
          {
            id: 'q3-stock',
            label: 'Stuck inventory and discounts given at the wrong moment',
            weights: { turnover: 2 },
          },
          {
            id: 'q3-conversion',
            label: 'Visits that came, looked and did not convert',
            weights: { conversion: 2 },
          },
        ],
      },
    ],
    tiebreaker: {
      id: 'q4-tiebreak',
      eyebrow: 'Last question',
      text: 'Does the product have a deadline to leave (collection, expiry, season)?',
      options: [
        { id: 'q4-yes', label: 'Yes', weights: { turnover: 1 } },
        { id: 'q4-no', label: 'No, turnover is steady', weights: { margin: 1 } },
        { id: 'q4-session', label: 'The deadline is the session itself', weights: { conversion: 1 } },
      ],
    },
    progressLabel: 'Step {current} of {total}',
    continueCta: 'Continue',
    results: {
      eyebrow: 'Your recommended pricing strategy',
      title: 'This is the pricing solution that best fits your context.',
      subtitle: 'Explore the example below.',
      tieTitle: 'Your profile combines more than one pricing angle.',
      tieSubtitle: 'Tap a solution to see the example.',
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
      headline: 'Decide <span class="text-[#F4845F]">BEFORE</span> the market',
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
