/**
 * Conteúdo bilíngue da seção de produto (i6 Decision Suite) na home.
 * Textos derivados da home do próprio produto (i6decision.ai).
 */

export interface SuitePillar {
  title: string;
  body: string;
}

export interface SuiteProduct {
  id: string;
  name: string;
  claim: string;
  pain: string;
  headline: string;
  body: string;
  capabilities: string;
  flow: { input: string; decision: string; value: string };
}

export interface SuiteCopy {
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: SuitePillar[];
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    selectorLabel: string;
    flowLabels: { input: string; decision: string; value: string };
    cta: string;
    items: SuiteProduct[];
  };
}

export const SUITE_URL = 'https://www.i6decision.ai';

export const suiteCopy: Record<'pt' | 'en', SuiteCopy> = {
  pt: {
    intro: {
      eyebrow: 'A suíte',
      title: 'Uma plataforma de decisão, não um conjunto de dashboards',
      description:
        'O i6 Decision Suite transforma dados de negócio em decisões aplicáveis, não apenas indicadores. Seus produtos compartilham contexto, governança e aprendizado para que cada decisão fique mais precisa à medida que a operação evolui.',
      pillars: [
        {
          title: 'Dados prontos para decisão',
          body: 'Dados transacionais, comportamentais, operacionais e contextuais entram em um mesmo contexto de decisão, com validação, qualidade e governança.',
        },
        {
          title: 'Inteligência especializada',
          body: 'Cada produto aplica modelos especializados à decisão que precisa resolver. Prever, recomendar, priorizar ou otimizar é parte do processo. A saída é uma decisão utilizável.',
        },
        {
          title: 'Decisão pronta para executar',
          body: 'A saída não termina no painel. A decisão chega aos times e sistemas de execução, enquanto o resultado retorna à plataforma para melhorar o próximo ciclo.',
        },
      ],
    },
    products: {
      eyebrow: 'Produtos',
      title: 'Seis decisões críticas, uma suíte',
      description:
        'Escolha a decisão que quer melhorar. Cada produto recebe os dados necessários, aplica inteligência especializada e devolve uma ação mensurável para o negócio.',
      selectorLabel: 'Selecione um produto da suíte',
      flowLabels: { input: 'Entrada', decision: 'Decisão', value: 'Valor' },
      cta: 'Conheça o i6 Decision Suite',
      items: [
        {
          id: 'discovery',
          name: 'Discovery',
          claim: 'Recomenda a próxima melhor opção para cada contexto',
          pain: 'Sem isso: todo visitante e todo cliente recebem a mesma oferta, e mídia, CRM e catálogo viram desperdício.',
          headline: 'Recomendações que conectam intenção a resultado',
          body: 'Combina catálogo, comportamento e contexto para decidir o que recomendar em cada interação. As recomendações são consumidas pelos canais de execução, enquanto o produto acompanha cobertura, qualidade, resposta e oportunidades de melhoria.',
          capabilities:
            'Ingestão e validação · Live Events · Recomendações · Integrações · Coverage & Qualidade · Insights de Negócio',
          flow: {
            input: 'Catálogo + comportamento + contexto',
            decision: 'Ranking e recomendação',
            value: 'Mais relevância, conversão e aproveitamento do catálogo',
          },
        },
        {
          id: 'forecasting',
          name: 'Forecasting',
          claim: 'Prevê demanda na granularidade em que o negócio decide',
          pain: 'Sem isso: a demanda é planejada por histórico e média, e a conta chega como ruptura ou excesso.',
          headline: 'Previsões que viram decisões de planejamento',
          body: 'Transforma histórico e sinais do negócio em previsões de demanda na granularidade necessária para planejar estoque, capacidade e metas. O produto acompanha a qualidade das previsões e evidencia onde a decisão precisa de atenção.',
          capabilities:
            'Histórico de demanda · Modelos comparáveis · Forecast granular · Monitoramento de acurácia · Qualidade',
          flow: {
            input: 'Histórico + calendário + sinais operacionais',
            decision: 'Forecast + seleção de modelo + acurácia',
            value: 'Menos ruptura e excesso. Mais precisão no planejamento',
          },
        },
        {
          id: 'assortment',
          name: 'Assortment',
          claim: 'Define o mix ideal por loja, canal ou contexto',
          pain: 'Sem isso: o mix segue igual em lojas e canais que compram de formas completamente diferentes.',
          headline: 'O mix certo para cada contexto de demanda',
          body: 'Combina demanda, desempenho, estoque e restrições para recomendar o sortimento mais adequado por loja, canal ou contexto. Ajuda a decidir o que manter, incluir, retirar ou redistribuir.',
          capabilities: 'Desempenho · Demanda · Recomendação de mix · Restrições · Cobertura',
          flow: {
            input: 'Demanda + catálogo + estoque + restrições',
            decision: 'Priorização e otimização do mix',
            value: 'Mais disponibilidade, giro e produtividade do sortimento',
          },
        },
        {
          id: 'sales-planning',
          name: 'Sales Planning',
          claim: 'Transforma potencial e previsão em metas e prioridades',
          pain: 'Sem isso: metas e esforço comercial seguem o histórico, não o potencial real de cada carteira.',
          headline: 'Metas e prioridades comerciais baseadas em potencial',
          body: 'Conecta histórico, previsão e potencial comercial para distribuir metas e prioridades com mais precisão. O planejamento deixa de depender apenas do histórico e passa a refletir onde está a próxima oportunidade.',
          capabilities: 'Histórico comercial · Forecast · Potencial · Metas preditivas · Priorização',
          flow: {
            input: 'Histórico + forecast + potencial',
            decision: 'Metas e prioridades',
            value: 'Melhor alocação de esforço e maior eficiência comercial',
          },
        },
        {
          id: 'pricing',
          name: 'Pricing',
          claim: 'Recomenda preços para equilibrar demanda, receita e margem',
          pain: 'Sem isso: preço é tabela e reação ao concorrente, não alavanca governada de margem, giro e conversão.',
          headline: 'Preço orientado por elasticidade, margem e demanda',
          body: 'Analisa a resposta histórica a preço, demanda, margem e contexto para recomendar preços dentro das regras do negócio. A decisão deixa de ser apenas reativa e passa a considerar impacto econômico esperado.',
          capabilities: 'Histórico de preços · Elasticidade · Margem · Guardrails · Recomendação',
          flow: {
            input: 'Preço + demanda + margem + contexto',
            decision: 'Elasticidade e preço recomendado',
            value: 'Mais margem e melhor equilíbrio entre preço e demanda',
          },
        },
        {
          id: 'targeting',
          name: 'Targeting',
          claim: 'Prioriza quem tem maior propensão a responder',
          pain: 'Sem isso: campanhas amplas e caras falam com quem nunca ia responder.',
          headline: 'Propensão para decidir quem ativar e quando',
          body: 'Transforma comportamento e histórico de resposta em scores de propensão para priorizar audiências antes da ativação. As decisões seguem para os canais de execução e retornam com os eventos de resposta para alimentar o próximo ciclo.',
          capabilities: 'Eventos · Propensão · Ranking de audiência · Integrações · Medição de resposta',
          flow: {
            input: 'Comportamento + histórico de campanhas',
            decision: 'Propensão + ranking',
            value: 'Mais resposta com menos desperdício de contato',
          },
        },
      ],
    },
  },
  en: {
    intro: {
      eyebrow: 'The suite',
      title: 'A decision platform, not a set of dashboards',
      description:
        'i6 Decision Suite turns business data into applicable decisions, not just indicators. Its products share context, governance and learning, so every decision gets sharper as the operation evolves.',
      pillars: [
        {
          title: 'Data ready for decisions',
          body: 'Transactional, behavioral, operational and contextual data enter a single decision context, with validation, quality and governance.',
        },
        {
          title: 'Specialized intelligence',
          body: 'Each product applies specialized models to the decision it must solve. Predicting, recommending, prioritizing or optimizing is part of the process. The output is a usable decision.',
        },
        {
          title: 'Decisions ready to execute',
          body: 'The output does not end in a dashboard. The decision reaches teams and execution systems, while the result returns to the platform to improve the next cycle.',
        },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'Six critical decisions, one suite',
      description:
        'Pick the decision you want to improve. Each product receives the required data, applies specialized intelligence and returns a measurable action for the business.',
      selectorLabel: 'Select a product from the suite',
      flowLabels: { input: 'Input', decision: 'Decision', value: 'Value' },
      cta: 'Explore i6 Decision Suite',
      items: [
        {
          id: 'discovery',
          name: 'Discovery',
          claim: 'Recommends the next best option for every context',
          pain: 'Without it: every visitor and customer gets the same offer, and media, CRM and catalog turn into waste.',
          headline: 'Recommendations that connect intent to outcome',
          body: 'Combines catalog, behavior and context to decide what to recommend in every interaction. Recommendations are consumed by execution channels while the product tracks coverage, quality, response and improvement opportunities.',
          capabilities:
            'Ingestion & validation · Live Events · Recommendations · Integrations · Coverage & Quality · Business Insights',
          flow: {
            input: 'Catalog + behavior + context',
            decision: 'Ranking and recommendation',
            value: 'More relevance, conversion and catalog usage',
          },
        },
        {
          id: 'forecasting',
          name: 'Forecasting',
          claim: 'Forecasts demand at the granularity the business decides on',
          pain: 'Without it: demand is planned on history and averages, and the bill arrives as stockout or excess.',
          headline: 'Forecasts that become planning decisions',
          body: 'Turns history and business signals into demand forecasts at the granularity needed to plan inventory, capacity and targets. The product tracks forecast quality and highlights where a decision needs attention.',
          capabilities:
            'Demand history · Comparable models · Granular forecast · Accuracy monitoring · Quality',
          flow: {
            input: 'History + calendar + operational signals',
            decision: 'Forecast + model selection + accuracy',
            value: 'Less stockout and excess. Sharper planning',
          },
        },
        {
          id: 'assortment',
          name: 'Assortment',
          claim: 'Defines the ideal mix per store, channel or context',
          pain: 'Without it: the mix stays the same across stores and channels that buy in completely different ways.',
          headline: 'The right mix for every demand context',
          body: 'Combines demand, performance, inventory and constraints to recommend the most suitable assortment per store, channel or context. It helps decide what to keep, add, remove or redistribute.',
          capabilities: 'Performance · Demand · Mix recommendation · Constraints · Coverage',
          flow: {
            input: 'Demand + catalog + inventory + constraints',
            decision: 'Mix prioritization and optimization',
            value: 'More availability, turnover and assortment productivity',
          },
        },
        {
          id: 'sales-planning',
          name: 'Sales Planning',
          claim: 'Turns potential and forecast into targets and priorities',
          pain: 'Without it: targets and sales effort follow history, not the real potential of each portfolio.',
          headline: 'Commercial targets and priorities based on potential',
          body: 'Connects history, forecast and commercial potential to distribute targets and priorities with more precision. Planning stops relying only on history and starts reflecting where the next opportunity is.',
          capabilities: 'Commercial history · Forecast · Potential · Predictive targets · Prioritization',
          flow: {
            input: 'History + forecast + potential',
            decision: 'Targets and priorities',
            value: 'Better effort allocation and higher commercial efficiency',
          },
        },
        {
          id: 'pricing',
          name: 'Pricing',
          claim: 'Recommends prices balancing demand, revenue and margin',
          pain: 'Without it: price is a table and a reaction to competitors, not a governed lever of margin, turnover and conversion.',
          headline: 'Pricing driven by elasticity, margin and demand',
          body: 'Analyzes historical price response, demand, margin and context to recommend prices within business rules. The decision stops being purely reactive and starts considering expected economic impact.',
          capabilities: 'Price history · Elasticity · Margin · Guardrails · Recommendation',
          flow: {
            input: 'Price + demand + margin + context',
            decision: 'Elasticity and recommended price',
            value: 'More margin and a better price-demand balance',
          },
        },
        {
          id: 'targeting',
          name: 'Targeting',
          claim: 'Prioritizes who is most likely to respond',
          pain: 'Without it: broad, expensive campaigns talk to people who were never going to respond.',
          headline: 'Propensity to decide who to activate and when',
          body: 'Turns behavior and response history into propensity scores to prioritize audiences before activation. Decisions flow to execution channels and return with response events to feed the next cycle.',
          capabilities: 'Events · Propensity · Audience ranking · Integrations · Response measurement',
          flow: {
            input: 'Behavior + campaign history',
            decision: 'Propensity + ranking',
            value: 'More response with less wasted contact',
          },
        },
      ],
    },
  },
};
