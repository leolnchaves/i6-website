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
    selectorLabel: string;
    cta: string;
    items: SuiteProduct[];
  };
}

export const SUITE_URL = 'https://i6decision.ai';

export const suiteCopy: { pt: SuiteCopy; en: SuiteCopy; es: SuiteCopy } = {
  pt: {
    intro: {
      eyebrow: 'A suíte',
      title: 'A decisão certa para cada momento do negócio.',
      description:
        'Cada produto do i6 Decision Suite pega o dado do seu negócio, aplica inteligência especializada e devolve uma ação mensurável — não mais um indicador para interpretar.',
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
      selectorLabel: 'Selecione um produto da suíte',
      flowLabels: { input: 'Entrada', decision: 'Decisão', value: 'Valor' },
      cta: 'Conheça o i6 Decision Suite',
      items: [
        {
          id: 'relevance',
          name: 'Relevance',
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
      title: 'The right decision for every moment of the business.',
      description:
        'Each product in the i6 Decision Suite takes the data from your business, applies specialized intelligence and returns a measurable action — not another indicator to interpret.',
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
      selectorLabel: 'Select a product from the suite',
      flowLabels: { input: 'Input', decision: 'Decision', value: 'Value' },
      cta: 'Explore i6 Decision Suite',
      items: [
        {
          id: 'relevance',
          name: 'Relevance',
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
  es: {
    intro: {
      eyebrow: 'La suite',
      title: 'La decisión correcta para cada momento del negocio.',
      description:
        'Cada producto del i6 Decision Suite toma el dato de su negocio, aplica inteligencia especializada y devuelve una acción medible — no un indicador más para interpretar.',
      pillars: [
        {
          title: 'Datos listos para decidir',
          body: 'Datos transaccionales, de comportamiento, operativos y contextuales entran en un mismo contexto de decisión, con validación, calidad y gobernanza.',
        },
        {
          title: 'Inteligencia especializada',
          body: 'Cada producto aplica modelos especializados a la decisión que debe resolver. Predecir, recomendar, priorizar u optimizar es parte del proceso. La salida es una decisión utilizable.',
        },
        {
          title: 'Decisión lista para ejecutar',
          body: 'La salida no termina en el panel. La decisión llega a los equipos y sistemas de ejecución, y el resultado vuelve a la plataforma para mejorar el próximo ciclo.',
        },
      ],
    },
    products: {
      eyebrow: 'Productos',
      title: 'Seis decisiones críticas, una suite',
      selectorLabel: 'Selecciona un producto de la suite',
      flowLabels: { input: 'Entrada', decision: 'Decisión', value: 'Valor' },
      cta: 'Conoce el i6 Decision Suite',
      items: [
        {
          id: 'relevance',
          name: 'Relevance',
          claim: 'Recomienda la próxima mejor opción para cada contexto',
          pain: 'Sin esto: todo visitante y todo cliente recibe la misma oferta, y medios, CRM y catálogo se convierten en desperdicio.',
          headline: 'Recomendaciones que conectan intención con resultado',
          body: 'Combina catálogo, comportamiento y contexto para decidir qué recomendar en cada interacción. Las recomendaciones se consumen en los canales de ejecución, mientras el producto monitorea cobertura, calidad, respuesta y oportunidades de mejora.',
          capabilities:
            'Ingesta y validación · Live Events · Recomendaciones · Integraciones · Cobertura y Calidad · Insights de Negocio',
          flow: {
            input: 'Catálogo + comportamiento + contexto',
            decision: 'Ranking y recomendación',
            value: 'Más relevancia, conversión y aprovechamiento del catálogo',
          },
        },
        {
          id: 'forecasting',
          name: 'Forecasting',
          claim: 'Predice la demanda en la granularidad en que el negocio decide',
          pain: 'Sin esto: la demanda se planifica por histórico y promedio, y la cuenta llega como quiebre o exceso.',
          headline: 'Pronósticos que se vuelven decisiones de planificación',
          body: 'Convierte histórico y señales del negocio en pronósticos de demanda con la granularidad necesaria para planificar inventario, capacidad y metas. El producto monitorea la calidad de los pronósticos y evidencia dónde la decisión necesita atención.',
          capabilities:
            'Histórico de demanda · Modelos comparables · Forecast granular · Monitoreo de precisión · Calidad',
          flow: {
            input: 'Histórico + calendario + señales operativas',
            decision: 'Forecast + selección de modelo + precisión',
            value: 'Menos quiebres y excesos. Más precisión en la planificación',
          },
        },
        {
          id: 'assortment',
          name: 'Assortment',
          claim: 'Define el mix ideal por tienda, canal o contexto',
          pain: 'Sin esto: el mix se repite en tiendas y canales que compran de formas completamente distintas.',
          headline: 'El mix correcto para cada contexto de demanda',
          body: 'Combina demanda, desempeño, inventario y restricciones para recomendar el surtido más adecuado por tienda, canal o contexto. Ayuda a decidir qué mantener, incluir, retirar o redistribuir.',
          capabilities: 'Desempeño · Demanda · Recomendación de mix · Restricciones · Cobertura',
          flow: {
            input: 'Demanda + catálogo + inventario + restricciones',
            decision: 'Priorización y optimización del mix',
            value: 'Más disponibilidad, rotación y productividad del surtido',
          },
        },
        {
          id: 'sales-planning',
          name: 'Sales Planning',
          claim: 'Convierte potencial y pronóstico en metas y prioridades',
          pain: 'Sin esto: metas y esfuerzo comercial siguen el histórico, no el potencial real de cada cartera.',
          headline: 'Metas y prioridades comerciales basadas en potencial',
          body: 'Conecta histórico, pronóstico y potencial comercial para distribuir metas y prioridades con más precisión. La planificación deja de depender solo del histórico y pasa a reflejar dónde está la próxima oportunidad.',
          capabilities: 'Histórico comercial · Forecast · Potencial · Metas predictivas · Priorización',
          flow: {
            input: 'Histórico + forecast + potencial',
            decision: 'Metas y prioridades',
            value: 'Mejor asignación del esfuerzo y mayor eficiencia comercial',
          },
        },
        {
          id: 'pricing',
          name: 'Pricing',
          claim: 'Recomienda precios para equilibrar demanda, ingreso y margen',
          pain: 'Sin esto: el precio es tabla y reacción al competidor, no una palanca gobernada de margen, rotación y conversión.',
          headline: 'Precio orientado por elasticidad, margen y demanda',
          body: 'Analiza la respuesta histórica al precio, la demanda, el margen y el contexto para recomendar precios dentro de las reglas del negocio. La decisión deja de ser solo reactiva y pasa a considerar el impacto económico esperado.',
          capabilities: 'Histórico de precios · Elasticidad · Margen · Guardrails · Recomendación',
          flow: {
            input: 'Precio + demanda + margen + contexto',
            decision: 'Elasticidad y precio recomendado',
            value: 'Más margen y mejor equilibrio entre precio y demanda',
          },
        },
        {
          id: 'targeting',
          name: 'Targeting',
          claim: 'Prioriza a quien tiene mayor propensión a responder',
          pain: 'Sin esto: campañas amplias y costosas hablan con quien nunca iba a responder.',
          headline: 'Propensión para decidir a quién activar y cuándo',
          body: 'Convierte comportamiento e histórico de respuesta en scores de propensión para priorizar audiencias antes de la activación. Las decisiones van a los canales de ejecución y regresan con los eventos de respuesta para alimentar el próximo ciclo.',
          capabilities: 'Eventos · Propensión · Ranking de audiencia · Integraciones · Medición de respuesta',
          flow: {
            input: 'Comportamiento + histórico de campañas',
            decision: 'Propensión + ranking',
            value: 'Más respuesta con menos desperdicio de contacto',
          },
        },
      ],
    },
  },
};
