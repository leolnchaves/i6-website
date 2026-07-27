import type { TerritoryId } from '@/data/solutionsV2/content';

export type KioskLang = 'pt' | 'en';

export type RouteId = 'growth' | 'planning' | 'pricing';

export interface QuizOption {
  id: string;
  label: string;
  helper?: string;
  /** Q1: rota para escolher a Q2. */
  route?: RouteId;
  /** Q2: soluções recomendadas (1 ou mais). */
  solutionIds?: string[];
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
  /** Q1 — roteamento por território. */
  routing: QuizQuestion;
  /** Q2 — uma por rota. */
  branches: Record<RouteId, QuizQuestion>;
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
    keyboardDone: string;
    keyboardSpace: string;
    emailSuggestionsLabel: string;
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

// Territory kept exported for legacy imports elsewhere.
export type { TerritoryId };

export const kioskContent: Record<KioskLang, QuizContent> = {
  pt: {
    intro: {
      eyebrow: 'infinity6 · Experiência Interativa',
      title: 'Descubra em 30 segundos qual solução da infinity6 faz mais sentido para o seu negócio.',
      subtitle:
        'Responda duas perguntas rápidas e veja qual solução preditiva se encaixa no seu contexto.',
      startCta: 'Começar',
    },
    routing: {
      id: 'q1-route',
      eyebrow: 'Pergunta 1',
      text: 'Qual resultado você precisa priorizar agora?',
      helper: 'Escolha a frente mais relevante para o seu momento.',
      options: [
        {
          id: 'r-growth',
          label: 'Aumentar conversão e receita',
          helper:
            'Vender mais por cliente, visitante ou canal, com ofertas e abordagens mais relevantes.',
          route: 'growth',
        },
        {
          id: 'r-planning',
          label: 'Planejar demanda e operação com mais precisão',
          helper:
            'Melhorar previsões, metas, mix e pedidos para reduzir ruptura, excesso e desperdício.',
          route: 'planning',
        },
        {
          id: 'r-pricing',
          label: 'Tomar melhores decisões de preço',
          helper:
            'Proteger margem, acelerar o giro ou aumentar a conversão por meio do preço.',
          route: 'pricing',
        },
      ],
    },
    branches: {
      growth: {
        id: 'q2-growth',
        eyebrow: 'Pergunta 2',
        text: 'Onde está a maior oportunidade de crescimento?',
        options: [
          {
            id: 'g-personalization',
            label: 'Melhorar o que cada cliente ou visitante encontra e recebe',
            helper:
              'Quero recomendar a melhor oferta, produto ou próxima ação para cada pessoa, inclusive visitantes ainda não identificados.',
            solutionIds: ['predictive-personalization', 'smart-discovery'],
          },
          {
            id: 'g-campaign',
            label: 'Identificar quem deve ser abordado em cada campanha',
            helper:
              'Quero priorizar os clientes com maior potencial de resposta, definir audiências e tornar campanhas e ações comerciais mais eficientes.',
            solutionIds: ['predictive-campaign-targeting'],
          },
        ],
      },
      planning: {
        id: 'q2-planning',
        eyebrow: 'Pergunta 2',
        text: 'Qual decisão precisa de mais precisão?',
        options: [
          {
            id: 'p-forecast',
            label: 'Antecipar quanto será demandado, onde e quando',
            helper:
              'Quero prever a demanda por SKU, loja, PDV, canal, região ou cliente.',
            solutionIds: ['demand-forecasting'],
          },
          {
            id: 'p-goals',
            label: 'Definir metas de acordo com o potencial real de mercado',
            helper:
              'Quero estabelecer metas mais precisas por território, carteira, canal, produto, vendedor ou PDV.',
            solutionIds: ['predictive-commercial-targets'],
          },
          {
            id: 'p-mix',
            label: 'Definir o melhor mix, volume ou pedido',
            helper:
              'Quero recomendar quais produtos oferecer, em qual quantidade e para cada loja, PDV ou cliente.',
            solutionIds: ['mix-assortment-order'],
          },
        ],
      },
      pricing: {
        id: 'q2-pricing',
        eyebrow: 'Pergunta 2',
        text: 'O que sua decisão de preço precisa otimizar prioritariamente?',
        options: [
          {
            id: 'pr-margin',
            label: 'Capturar mais margem',
            helper:
              'Quero encontrar o melhor preço por SKU, considerando elasticidade, estoque, concorrência e demanda.',
            solutionIds: ['price-to-margin'],
          },
          {
            id: 'pr-turnover',
            label: 'Acelerar o giro de estoque',
            helper:
              'Quero otimizar markdowns e promoções para vender estoques parados ou envelhecidos, preservando a maior margem possível.',
            solutionIds: ['price-to-turnover'],
          },
          {
            id: 'pr-conversion',
            label: 'Aumentar a conversão',
            helper:
              'Quero ajustar o preço ao contexto, perfil ou intenção de compra imediata para aumentar vendas e receita.',
            solutionIds: ['price-to-conversion'],
          },
        ],
      },
    },
    progressLabel: 'Passo {current} de {total}',
    continueCta: 'Continuar',
    results: {
      eyebrow: 'Sua solução recomendada',
      title: 'Esta é a solução mais aderente ao seu contexto.',
      subtitle: 'Explore o exemplo de aplicação abaixo.',
      tieTitle: 'Seu contexto combina duas soluções complementares.',
      tieSubtitle: 'Toque em uma solução para ver o exemplo de aplicação.',
      selectSolutionHint: 'Toque em uma solução acima',
      signalEyebrow: 'i6 Signal',
      signalTitle: 'Converse com a camada preditiva.',
      signalSubtitle:
        'Disponibilizamos a camada preditiva gerada pelos modelos em uma plataforma conversacional. Faça perguntas em linguagem natural para antecipar movimentos, identificar oportunidades e tomar decisões comerciais, de supply e de pricing antes do mercado.',
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
      keyboardDone: 'Concluir',
      keyboardSpace: 'Espaço',
      emailSuggestionsLabel: 'Sugestões',
    },
    attract: {
      brand: 'infinity6',
      headline: 'Decida <span class="text-[#F4845F]">antes</span> do mercado.',
      tapHint: 'Toque para começar',
    },
    footer: {
      resetLabel: 'Explorar outra solução',
      tagline: 'infinity6 - the platform for decision advantage',
    },
  },
  en: {
    intro: {
      eyebrow: 'infinity6 · Interactive Experience',
      title: 'Discover in 30 seconds which infinity6 solution fits your business.',
      subtitle:
        'Answer two quick questions and see which predictive solution matches your context.',
      startCta: 'Start',
    },
    routing: {
      id: 'q1-route',
      eyebrow: 'Question 1',
      text: 'Which outcome do you need to prioritize right now?',
      helper: 'Pick the front that matters most for your moment.',
      options: [
        {
          id: 'r-growth',
          label: 'Increase conversion and revenue',
          helper:
            'Sell more per customer, visitor or channel, with more relevant offers and approaches.',
          route: 'growth',
        },
        {
          id: 'r-planning',
          label: 'Plan demand and operations with more precision',
          helper:
            'Improve forecasts, targets, mix and orders to reduce stockouts, excess and waste.',
          route: 'planning',
        },
        {
          id: 'r-pricing',
          label: 'Make better pricing decisions',
          helper:
            'Protect margin, accelerate turnover or boost conversion through price.',
          route: 'pricing',
        },
      ],
    },
    branches: {
      growth: {
        id: 'q2-growth',
        eyebrow: 'Question 2',
        text: 'Where is the biggest growth opportunity?',
        options: [
          {
            id: 'g-personalization',
            label: 'Improve what each customer or visitor finds and receives',
            helper:
              'I want to recommend the best offer, product or next action for each person, including anonymous visitors.',
            solutionIds: ['predictive-personalization', 'smart-discovery'],
          },
          {
            id: 'g-campaign',
            label: 'Identify who should be approached in each campaign',
            helper:
              'I want to prioritize customers with the highest response potential and make campaigns more efficient.',
            solutionIds: ['predictive-campaign-targeting'],
          },
        ],
      },
      planning: {
        id: 'q2-planning',
        eyebrow: 'Question 2',
        text: 'Which decision needs more precision?',
        options: [
          {
            id: 'p-forecast',
            label: 'Anticipate how much will be demanded, where and when',
            helper:
              'I want to forecast demand by SKU, store, POS, channel, region or customer.',
            solutionIds: ['demand-forecasting'],
          },
          {
            id: 'p-goals',
            label: 'Set targets aligned with real market potential',
            helper:
              'I want to set more precise targets by territory, portfolio, channel, product, rep or POS.',
            solutionIds: ['predictive-commercial-targets'],
          },
          {
            id: 'p-mix',
            label: 'Define the best mix, volume or order',
            helper:
              'I want to recommend which products to offer, in which quantity and for each store, POS or customer.',
            solutionIds: ['mix-assortment-order'],
          },
        ],
      },
      pricing: {
        id: 'q2-pricing',
        eyebrow: 'Question 2',
        text: 'What should your pricing decision optimize first?',
        options: [
          {
            id: 'pr-margin',
            label: 'Capture more margin',
            helper:
              'I want to find the best price per SKU, considering elasticity, stock, competition and demand.',
            solutionIds: ['price-to-margin'],
          },
          {
            id: 'pr-turnover',
            label: 'Accelerate inventory turnover',
            helper:
              'I want to optimize markdowns and promotions to sell aged or stuck stock while preserving the highest possible margin.',
            solutionIds: ['price-to-turnover'],
          },
          {
            id: 'pr-conversion',
            label: 'Boost conversion',
            helper:
              'I want to adjust price to context, profile or immediate purchase intent to grow sales and revenue.',
            solutionIds: ['price-to-conversion'],
          },
        ],
      },
    },
    progressLabel: 'Step {current} of {total}',
    continueCta: 'Continue',
    results: {
      eyebrow: 'Your recommended solution',
      title: 'This is the solution that best fits your context.',
      subtitle: 'Explore the example below.',
      tieTitle: 'Your context combines two complementary solutions.',
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
      keyboardDone: 'Done',
      keyboardSpace: 'Space',
      emailSuggestionsLabel: 'Suggestions',
    },
    attract: {
      brand: 'infinity6',
      headline: 'Decide <span class="text-[#F4845F]">before</span> the market.',
      tapHint: 'Tap to begin',
    },
    footer: {
      resetLabel: 'Explore another solution',
      tagline: 'infinity6 - the platform for decision advantage',
    },
  },
};

/**
 * Map from solutionId → i6Signal scenario keys to show for that solution.
 */
export const solutionSignalMap: Record<string, ('supply' | 'forecast' | 'pricing' | 'comercial' | 'mix' | 'pdv' | 'propensity' | 'clusters' | 'targetsPotential' | 'targetsRisk' | 'mixBehavior' | 'mixGaps' | 'marginOpportunities' | 'marginSignals' | 'turnoverRisk' | 'turnoverMarkdown' | 'personalizationBehavior' | 'personalizationRepurchase' | 'priceConversionFriction' | 'priceConversionIncentiveNeed')[]> = {
  'predictive-personalization': ['personalizationBehavior', 'personalizationRepurchase'],
  'smart-discovery': ['personalizationBehavior', 'personalizationRepurchase'],
  'predictive-campaign-targeting': ['propensity', 'clusters'],
  'demand-forecasting': ['forecast', 'supply'],
  'predictive-commercial-targets': ['targetsPotential', 'targetsRisk'],
  'mix-assortment-order': ['mixBehavior', 'mixGaps'],
  'price-to-margin': ['marginOpportunities', 'marginSignals'],
  'price-to-turnover': ['turnoverRisk', 'turnoverMarkdown'],
  'price-to-conversion': ['priceConversionFriction', 'priceConversionIncentiveNeed'],
};

/**
 * One eBook per territory (route). Any solution inside a route yields the
 * same eBook on the results screen.
 */
export const territoryEbook: Record<RouteId, { pt: string; en: string }> = {
  growth: {
    pt: 'eBook Inteligência Preditiva do Consumidor',
    en: 'eBook Predictive Customer Intelligence',
  },
  planning: {
    pt: 'eBook Supply Preditivo',
    en: 'eBook Predictive Supply',
  },
  pricing: {
    pt: 'eBook Pricing Orientado a Resultados',
    en: 'Results-Driven Pricing eBook',
  },
};

export const KIOSK_INACTIVITY_MS = 90_000;
