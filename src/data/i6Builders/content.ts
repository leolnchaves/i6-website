/**
 * Textos institucionais da página /i6-builders (PT / EN / ES).
 * Linguagem agnóstica de segmento, sem menção a produtos comerciais.
 */

export const DOCS_PATH = '/documentacao';
export const COMMUNITY_PATH = '/comunidade';
export const CONTACT_ANCHOR = '#fale-com-o-time';

export const builderCopy = {
  pt: {
    hero: {
      eyebrow: 'i6 Builder Platform',
      title: 'A camada de plataforma para quem constrói inteligência de decisão',
      highlight: 'constrói',
      sub: 'Engines de modelagem, SDKs, APIs e toolkits da infinity6 disponíveis para times de tecnologia desenvolverem seus próprios produtos de decisão orientada a dados',
      cta: 'Fale com o time',
      badges: ['Engines proprietários', 'Explicabilidade nativa', 'Integração por API'],
      codeTitle: 'quickstart.py',
      codeLines: [
        'from i6 import Builder',
        '',
        'builder = Builder(api_key=I6_KEY)',
        'forecast = builder.forecast(',
        '    series="demanda_sku",',
        '    horizon=12,',
        ')',
        '# cada saída acompanha seus drivers',
        'forecast.drivers()',
      ],
    },
    what: {
      eyebrow: 'O que é o i6 Builder',
      title: 'Capacidade de modelagem como plataforma, não como projeto',
      body: [
        'O i6 Builder expõe as capacidades de modelagem da infinity6 como blocos de construção: engines treinados, interfaces programáveis e ferramentas de avaliação, prontos para serem compostos dentro de um produto de terceiros',
        'Em vez de reconstruir pipelines de dados, treinamento, validação e explicabilidade, o time de tecnologia consome capacidade pronta e concentra o esforço no que diferencia o próprio produto',
      ],
      pillars: [
        { title: 'Engines de modelagem', desc: 'Capacidade preditiva mantida, versionada e monitorada pela infinity6' },
        { title: 'Interfaces programáveis', desc: 'SDKs e APIs para integrar previsão, recomendação e elasticidade ao seu produto' },
        { title: 'Ferramentas de avaliação', desc: 'Toolkits para backtest, comparação de cenários e leitura dos drivers de cada saída' },
      ],
    },
    how: {
      eyebrow: 'Como funciona',
      title: 'SDKs, APIs e toolkits',
      docsLink: 'Ver documentação completa',
      railLabel: 'Percurso de integração',
      blocks: [
        {
          title: 'SDKs',
          desc: 'Bibliotecas para incorporar as capacidades de modelagem diretamente no código do seu produto, com autenticação, versionamento e contratos de dados definidos',
        },
        {
          title: 'APIs',
          desc: 'Endpoints de previsão, recomendação e precificação consumidos em tempo real ou em lote, com respostas acompanhadas dos fatores que as sustentam',
        },
        {
          title: 'Toolkits',
          desc: 'Ferramentas de backtest, avaliação de performance e simulação de cenários para validar o comportamento dos modelos antes de entrar em produção',
        },
      ],
    },
    models: {
      eyebrow: 'Os modelos',
      title: 'Três famílias de capacidade de modelagem',
      intro: 'Capacidades técnicas disponíveis na plataforma, combináveis conforme o produto que você constrói',
      cards: [
        {
          name: 'Forecasting, Demand Modeling & Sales Planning',
          desc: 'Projeção de comportamento futuro de demanda, volume e capacidade em diferentes horizontes e níveis de agregação',
          long: 'Modela a série histórica de vendas, estoque, capacidade e variáveis externas para antecipar o que tende a acontecer em cada combinação de produto, canal e local. Sustenta decisões de reposição, plano de vendas, alocação de capacidade e definição de metas, com leitura dos fatores que empurram cada projeção para cima ou para baixo',
          outputs: [
            'Previsão de demanda por período, produto, canal e local',
            'Intervalos de confiança e cenários otimista/pessimista',
            'Risco de ruptura e de excesso de estoque por item',
            'Sugestão de reposição e cobertura em dias',
            'Plano de vendas e metas por hierarquia comercial',
            'Drivers de cada projeção: sazonalidade, tendência, preço, eventos',
          ],
          engines: ['i6Previsio'],
        },
        {
          name: 'Recommendation, Personalization, Propension & Assortment',
          desc: 'Ordenação de itens, públicos e combinações por probabilidade de resposta e aderência ao contexto de cada decisão',
          long: 'Modela comportamento individual e coletivo a partir de eventos de navegação, compra e interação para ordenar o que oferecer, a quem e em que momento. Cobre desde recomendação dentro do produto até desenho de sortimento por loja e priorização de listas de contato',
          outputs: [
            'Lista ordenada de itens por cliente ou sessão',
            'Score de propensão a compra, recompra e churn',
            'Público priorizado por campanha e canal',
            'Sortimento sugerido por loja, região ou cluster',
            'Combinações de cross-sell e up-sell',
            'Drivers de cada recomendação: afinidade, contexto, histórico',
          ],
          engines: ['i6RecSys', 'i6Previsio'],
        },
        {
          name: 'Pricing & Elasticity Modeling',
          desc: 'Estimativa de sensibilidade a preço e de trade-off entre volume e margem em cada cenário simulado',
          long: 'Estima como a demanda responde a variações de preço por item, canal e região, considerando concorrência, promoção e posicionamento. Permite simular cenários antes de mexer no preço e escolher o ponto que equilibra volume, receita e margem',
          outputs: [
            'Preço recomendado por item, canal e região',
            'Curva de elasticidade e faixa de preço aceitável',
            'Simulação volume x receita x margem por cenário',
            'Impacto estimado de promoção e markdown',
            'Prioridade de ajuste: onde a margem está sendo drenada',
            'Drivers de cada recomendação de preço',
          ],
          engines: ['i6ElasticPrice'],
        },
      ],

    },
    accelerators: {
      eyebrow: 'Domain Accelerators',
      title: 'Pacotes por vertical para reduzir o time-to-value',
      intro: 'Combinações pré-configuradas de múltiplos engines, com parametrização e métricas típicas de cada domínio, para encurtar o caminho entre integração e primeiro resultado',
      exampleNote: 'Verticais abaixo são exemplos ilustrativos',
    },
    persona: {
      eyebrow: 'Como você constrói com o i6 Builder',
      title: 'Feito para o Tech Builder',
      intro: 'Times de tecnologia que constroem software e querem capacidade de decisão dentro do próprio produto, com dois caminhos de entrega',
      modes: [
        {
          title: 'Embedded (OEM)',
          desc: 'As capacidades do Builder são incorporadas a um produto que já existe e já tem base instalada, ampliando o que ele entrega sem reescrever a solução',
          points: ['Integração progressiva por módulo', 'Sua marca, sua experiência', 'Capacidade mantida e evoluída pela infinity6'],
        },
        {
          title: 'Novo Produto',
          desc: 'Um produto novo é construído do zero sobre o Builder, usando engines, SDKs e toolkits como fundação técnica desde o primeiro dia',
          points: ['Fundação preditiva pronta', 'Menos engenharia de plataforma', 'Foco total em experiência e domínio'],
        },
      ],
    },
    cases: {
      eyebrow: 'Cases de parceiros',
      title: 'Como outros times entregaram sobre o Builder',
      exampleNote: 'Cases abaixo são fictícios, usados para validação de layout',
    },
    finalCta: {
      title: 'Vamos avaliar o que você quer construir',
      sub: 'O time técnico da infinity6 avalia o caso, o caminho de integração e o desenho de entrega',
      primary: 'Fale com o time',
      community: 'Comunidade',
      docs: 'Documentação',
    },
  },
  en: {
    hero: {
      eyebrow: 'i6 Builder Platform',
      title: 'The platform layer for teams that build decision intelligence',
      highlight: 'build',
      sub: 'infinity6 modeling engines, SDKs, APIs and toolkits available for technology teams developing their own data-driven decision products',
      cta: 'Talk to the team',
      badges: ['Proprietary engines', 'Native explainability', 'API-first integration'],
      codeTitle: 'quickstart.py',
      codeLines: [
        'from i6 import Builder',
        '',
        'builder = Builder(api_key=I6_KEY)',
        'forecast = builder.forecast(',
        '    series="sku_demand",',
        '    horizon=12,',
        ')',
        '# every output carries its drivers',
        'forecast.drivers()',
      ],
    },
    what: {
      eyebrow: 'What the i6 Builder is',
      title: 'Modeling capability as a platform, not as a project',
      body: [
        'The i6 Builder exposes infinity6 modeling capability as building blocks: trained engines, programmable interfaces and evaluation tooling, ready to be composed inside a third-party product',
        'Instead of rebuilding data, training, validation and explainability pipelines, technology teams consume ready capability and focus effort on what differentiates their own product',
      ],
      pillars: [
        { title: 'Modeling engines', desc: 'Predictive capability maintained, versioned and monitored by infinity6' },
        { title: 'Programmable interfaces', desc: 'SDKs and APIs to integrate forecasting, recommendation and elasticity into your product' },
        { title: 'Evaluation tooling', desc: 'Toolkits for backtesting, scenario comparison and reading the drivers behind each output' },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'SDKs, APIs and toolkits',
      docsLink: 'See full documentation',
      railLabel: 'Integration path',
      blocks: [
        {
          title: 'SDKs',
          desc: 'Libraries to embed modeling capability directly into your product code, with authentication, versioning and defined data contracts',
        },
        {
          title: 'APIs',
          desc: 'Forecasting, recommendation and pricing endpoints consumed in real time or in batch, with responses carrying the factors that support them',
        },
        {
          title: 'Toolkits',
          desc: 'Backtesting, performance evaluation and scenario simulation tools to validate model behavior before going to production',
        },
      ],
    },
    models: {
      eyebrow: 'The models',
      title: 'Three families of modeling capability',
      intro: 'Technical capabilities available on the platform, composable according to the product you build',
      cards: [
        {
          name: 'Forecasting, Demand Modeling & Sales Planning',
          desc: 'Projection of future demand, volume and capacity behavior across horizons and aggregation levels',
          long: 'Models sales history, inventory, capacity and external variables to anticipate what tends to happen for every product, channel and location combination. It supports replenishment, sales planning, capacity allocation and target setting, always exposing the factors pushing each projection up or down',
          outputs: [
            'Demand forecast by period, product, channel and location',
            'Confidence intervals and optimistic/pessimistic scenarios',
            'Stockout and overstock risk per item',
            'Replenishment suggestion and days of coverage',
            'Sales plan and targets by commercial hierarchy',
            'Drivers behind each projection: seasonality, trend, price, events',
          ],
          engines: ['i6Previsio'],
        },
        {
          name: 'Recommendation, Personalization, Propension & Assortment',
          desc: 'Ranking of items, audiences and combinations by response probability and fit to each decision context',
          long: 'Models individual and collective behavior from browsing, purchase and interaction events to rank what to offer, to whom and when. It spans in-product recommendation, store-level assortment design and contact-list prioritization',
          outputs: [
            'Ranked item list per customer or session',
            'Propensity score for purchase, repurchase and churn',
            'Prioritized audience per campaign and channel',
            'Suggested assortment by store, region or cluster',
            'Cross-sell and up-sell combinations',
            'Drivers behind each recommendation: affinity, context, history',
          ],
          engines: ['i6RecSys', 'i6Previsio'],
        },
        {
          name: 'Pricing & Elasticity Modeling',
          desc: 'Estimation of price sensitivity and of the volume versus margin trade-off in every simulated scenario',
          long: 'Estimates how demand responds to price changes by item, channel and region, accounting for competition, promotion and positioning. It allows simulating scenarios before touching price and choosing the point that balances volume, revenue and margin',
          outputs: [
            'Recommended price by item, channel and region',
            'Elasticity curve and acceptable price range',
            'Volume x revenue x margin simulation per scenario',
            'Estimated impact of promotion and markdown',
            'Adjustment priority: where margin is being drained',
            'Drivers behind each pricing recommendation',
          ],
          engines: ['i6ElasticPrice'],
        },
      ],

    },
    accelerators: {
      eyebrow: 'Domain Accelerators',
      title: 'Vertical packages that shorten time-to-value',
      intro: 'Pre-configured combinations of multiple engines, with the parameterization and metrics typical of each domain, shortening the path between integration and first result',
      exampleNote: 'Verticals below are illustrative examples',
    },
    persona: {
      eyebrow: 'How you build with the i6 Builder',
      title: 'Made for the Tech Builder',
      intro: 'Technology teams that build software and want decision capability inside their own product, with two delivery paths',
      modes: [
        {
          title: 'Embedded (OEM)',
          desc: 'Builder capabilities are embedded into a product that already exists and already has an installed base, extending what it delivers without rewriting the solution',
          points: ['Progressive module-by-module integration', 'Your brand, your experience', 'Capability maintained and evolved by infinity6'],
        },
        {
          title: 'New Product',
          desc: 'A new product is built from scratch on top of the Builder, using engines, SDKs and toolkits as the technical foundation from day one',
          points: ['Predictive foundation ready', 'Less platform engineering', 'Full focus on experience and domain'],
        },
      ],
    },
    cases: {
      eyebrow: 'Partner cases',
      title: 'How other teams delivered on the Builder',
      exampleNote: 'Cases below are fictional, used for layout validation',
    },
    finalCta: {
      title: "Let's assess what you want to build",
      sub: 'The infinity6 technical team reviews the case, the integration path and the delivery design',
      primary: 'Talk to the team',
      community: 'Community',
      docs: 'Documentation',
    },
  },
  es: {
    hero: {
      eyebrow: 'i6 Builder Platform',
      title: 'La capa de plataforma para quien construye inteligencia de decisión',
      highlight: 'construye',
      sub: 'Engines de modelado, SDKs, APIs y toolkits de infinity6 disponibles para equipos de tecnología que desarrollan sus propios productos de decisión orientada a datos',
      cta: 'Habla con el equipo',
      badges: ['Engines propietarios', 'Explicabilidad nativa', 'Integración por API'],
      codeTitle: 'quickstart.py',
      codeLines: [
        'from i6 import Builder',
        '',
        'builder = Builder(api_key=I6_KEY)',
        'forecast = builder.forecast(',
        '    series="demanda_sku",',
        '    horizon=12,',
        ')',
        '# cada salida acompaña sus drivers',
        'forecast.drivers()',
      ],
    },
    what: {
      eyebrow: 'Qué es el i6 Builder',
      title: 'Capacidad de modelado como plataforma, no como proyecto',
      body: [
        'El i6 Builder expone las capacidades de modelado de infinity6 como bloques de construcción: engines entrenados, interfaces programables y herramientas de evaluación, listos para componerse dentro de un producto de terceros',
        'En lugar de reconstruir pipelines de datos, entrenamiento, validación y explicabilidad, el equipo de tecnología consume capacidad lista y concentra el esfuerzo en lo que diferencia su propio producto',
      ],
      pillars: [
        { title: 'Engines de modelado', desc: 'Capacidad predictiva mantenida, versionada y monitoreada por infinity6' },
        { title: 'Interfaces programables', desc: 'SDKs y APIs para integrar predicción, recomendación y elasticidad en tu producto' },
        { title: 'Herramientas de evaluación', desc: 'Toolkits de backtest, comparación de escenarios y lectura de los drivers de cada salida' },
      ],
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'SDKs, APIs y toolkits',
      docsLink: 'Ver documentación completa',
      railLabel: 'Recorrido de integración',
      blocks: [
        {
          title: 'SDKs',
          desc: 'Bibliotecas para incorporar las capacidades de modelado directamente en el código de tu producto, con autenticación, versionado y contratos de datos definidos',
        },
        {
          title: 'APIs',
          desc: 'Endpoints de predicción, recomendación y precios consumidos en tiempo real o en lote, con respuestas acompañadas de los factores que las sustentan',
        },
        {
          title: 'Toolkits',
          desc: 'Herramientas de backtest, evaluación de performance y simulación de escenarios para validar el comportamiento de los modelos antes de producción',
        },
      ],
    },
    models: {
      eyebrow: 'Los modelos',
      title: 'Tres familias de capacidad de modelado',
      intro: 'Capacidades técnicas disponibles en la plataforma, combinables según el producto que construyes',
      cards: [
        {
          name: 'Forecasting, Demand Modeling & Sales Planning',
          desc: 'Proyección del comportamiento futuro de demanda, volumen y capacidad en distintos horizontes y niveles de agregación',
        },
        {
          name: 'Recommendation, Personalization, Propension & Assortment',
          desc: 'Ordenación de ítems, públicos y combinaciones por probabilidad de respuesta y ajuste al contexto de cada decisión',
        },
        {
          name: 'Pricing & Elasticity Modeling',
          desc: 'Estimación de sensibilidad al precio y del trade-off entre volumen y margen en cada escenario simulado',
        },
      ],
    },
    accelerators: {
      eyebrow: 'Domain Accelerators',
      title: 'Paquetes por vertical para reducir el time-to-value',
      intro: 'Combinaciones preconfiguradas de múltiples engines, con la parametrización y las métricas típicas de cada dominio, para acortar el camino entre integración y primer resultado',
      exampleNote: 'Las verticales abajo son ejemplos ilustrativos',
    },
    persona: {
      eyebrow: 'Cómo construyes con el i6 Builder',
      title: 'Hecho para el Tech Builder',
      intro: 'Equipos de tecnología que construyen software y quieren capacidad de decisión dentro de su propio producto, con dos caminos de entrega',
      modes: [
        {
          title: 'Embedded (OEM)',
          desc: 'Las capacidades del Builder se incorporan a un producto que ya existe y ya tiene base instalada, ampliando lo que entrega sin reescribir la solución',
          points: ['Integración progresiva por módulo', 'Tu marca, tu experiencia', 'Capacidad mantenida y evolucionada por infinity6'],
        },
        {
          title: 'Nuevo Producto',
          desc: 'Un producto nuevo se construye desde cero sobre el Builder, usando engines, SDKs y toolkits como fundación técnica desde el primer día',
          points: ['Fundación predictiva lista', 'Menos ingeniería de plataforma', 'Foco total en experiencia y dominio'],
        },
      ],
    },
    cases: {
      eyebrow: 'Cases de partners',
      title: 'Cómo otros equipos entregaron sobre el Builder',
      exampleNote: 'Los cases abajo son ficticios, usados para validación de layout',
    },
    finalCta: {
      title: 'Vamos a evaluar lo que quieres construir',
      sub: 'El equipo técnico de infinity6 evalúa el caso, el camino de integración y el diseño de entrega',
      primary: 'Habla con el equipo',
      community: 'Comunidad',
      docs: 'Documentación',
    },
  },
};
