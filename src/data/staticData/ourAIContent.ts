import type { Language } from '@/types/language';

export interface EngineDef {
  id: 'i6previsio' | 'i6recsys' | 'i6elasticprice';
  name: string;
  tagline: string;
  description: string;
  points: string[];
}

export interface OurAIContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    layers: { name: string; role: string; current?: boolean }[];
    /** Mini-índice do cartão base: âncoras para as seções da própria página. */
    indexLinks: { label: string; anchor: string }[];
    /** Faixa de credenciais (KPIs reais) no rodapé do cartão base. */
    credentials: { value: string; label: string }[];
  };
  engines: {
    eyebrow: string;
    title: string;
    /** Duas frases: a segunda é sempre renderizada na linha de baixo. */
    lead: readonly [string, string];
    items: EngineDef[];
    note: string;
  };
  builder: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: { title: string; text: string }[];
    cta: string;
  };
  foundation: {
    eyebrow: string;
    label: string;
    name: string;
    description: string;
    architectureTitle: string;
    architecture: { term: string; detail: string }[];
    statsTitle: string;
    /** Escala de treino agrupada por ano: o ano vira linha de destaque e sai dos textos. */
    statYears: { year: string; items: { value: string; label: string }[] }[];
    mixTitle: string;
    mix: { value: string; label: string }[];
  };
  reasoning: {
    eyebrow: string;
    title: string;
    lead: string;
    parts: { index: string; title: string; description: string; points: string[] }[];
  };
  security: {
    eyebrow: string;
    title: string;
    lead: string;
    pillars: { title: string; description: string }[];
  };
  results: {
    eyebrow: string;
    title: string;
    lead: string;
    sourceLabel: string;
  };
  science: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    founder: { label: string; url: string };
  };
  glossary: {
    eyebrow: string;
    title: string;
    lead: string;
    terms: { slug: string; term: string; definition: string }[];
    cta: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export const ourAIContent: Record<Language, OurAIContent> = {
  pt: {
    hero: {
      eyebrow: 'infinity6 · a camada de inteligência',
      title: 'A inteligência que sustenta tudo o que entregamos',
      lead: 'Sob a i6 Decision Suite e a i6 Builder Platform, motores proprietários, modelos fundacionais e métodos científicos sustentam cada decisão.',
      layers: [
        { name: 'i6 Decision Suite', role: 'Decisões prontas, do problema de negócio ao resultado.' },
        { name: 'i6 Builder Platform', role: 'SDK e API para construir seus próprios produtos.' },
        { name: 'A inteligência', role: 'Pilares de profundidade técnica, do motor à governança.', current: true },
      ],
      indexLinks: [
        { label: 'Motores', anchor: '#motores' },
        { label: 'Modelo Fundacional', anchor: '#modelo-fundacional' },
        { label: 'Método', anchor: '#metodo' },
        { label: 'Base Científica', anchor: '#base-cientifica' },
        { label: 'Camada de Abstração', anchor: '#camada-abstracao' },
        { label: 'Governança', anchor: '#governanca' },
      ],
      credentials: [
        { value: '3', label: 'motores proprietários' },
        { value: '20 bi registros', label: 'escala de treino fundacional' },
        { value: '50', label: 'bases públicas/adquiridas de pré-treinamento' },
        { value: '3', label: 'publicações revisadas por pares' },
        { value: '9', label: 'palestras & conferências técnicas' },
      ],
    },
    engines: {
      eyebrow: 'Núcleo preditivo',
      title: 'Três motores proprietários',
      lead: [
        'Cada motor resolve uma classe própria de decisão, sobre a mesma base fundacional.',
        'Não geram texto: geram decisões calibradas, com incerteza medida e explicação rastreável.',
      ],
      items: [
        {
          id: 'i6previsio',
          name: 'i6 Previsio',
          tagline: 'Previsão de demanda granular',
          description: 'Estima a demanda por SKU, canal e janela temporal e mede a incerteza de cada previsão.',
          points: [
            'Granularidade até SKU × ponto de venda × dia',
            'Decomposição de tendência, sazonalidade e evento',
            'Reprocessamento contínuo conforme o dado novo chega',
          ],
        },
        {
          id: 'i6recsys',
          name: 'i6 RecSys',
          tagline: 'Recomendação contextual',
          description: 'Ranqueamento comportamental que combina histórico, contexto e restrição operacional na mesma função de decisão.',
          points: [
            'Aprende comportamento transacional, identificado ou anônimo, no mesmo espaço latente',
            'Balanceamento explícito entre precisão e diversidade',
            'Cada recomendação sai com os fatores que a motivaram e o argumento pronto',
          ],
        },
        {
          id: 'i6elasticprice',
          name: 'i6 ElasticPrice',
          tagline: 'Precificação adaptativa',
          description: 'Estimação contínua de elasticidade por SKU, canal e ciclo de vida, substituindo curvas estáticas por aprendizado online.',
          points: [
            'Elasticidade recalculada a cada ciclo de dado',
            'Restrições de margem e posicionamento como limites do modelo',
            'Simulação de cenário antes da aplicação do preço',
          ],
        },
      ],
      note: 'Em comum aos três: arquitetura híbrida, operação sobre dados anonimizados e equilíbrio ajustável entre metas concorrentes, como precisão e diversidade, margem e posicionamento.',
    },
    builder: {
      eyebrow: 'Camada de abstração',
      title: 'i6 Builder Platform',
      lead: 'Os motores chegam a você por duas vias: prontos, na i6 Decision Suite, ou de forma programável, na i6 Builder Platform — SDK, API e toolkits — para que times técnicos e parceiros construam suas próprias aplicações sobre a mesma inteligência.',
      bullets: [
        { title: 'SDK', text: 'Bibliotecas para treinar, adaptar e servir modelos derivados do modelo fundacional.' },
        { title: 'API', text: 'Endpoints de previsão, ranqueamento e elasticidade com contrato estável e versionado.' },
        { title: 'Toolkits', text: 'Blocos prontos de avaliação, monitoramento de deriva e explicabilidade.' },
      ],
      cta: 'Construa com a i6 Builder Platform',
    },
    foundation: {
      eyebrow: 'Modelo fundacional',
      label: 'Modelo fundacional',
      name: 'i6-RecSys-Base.g1',
      description: 'A base compartilhada pelos três motores: meta-aprendizado, aprendizado ativo e perda topológica para se adaptar a novas tarefas com poucas amostras.',
      architectureTitle: 'Arquitetura',
      architecture: [
        { term: 'MAML (Model-Agnostic Meta-Learning)', detail: 'Meta-aprendizado que deixa o modelo pronto para se adaptar a uma nova tarefa com poucas amostras do cliente.' },
        { term: 'Active Learning', detail: 'O próprio modelo escolhe quais amostras valem a pena rotular, acelerando o aprendizado e reduzindo o custo de rotulagem.' },
        { term: 'Topological Loss', detail: 'Preserva as relações topológicas do espaço latente, o que estabiliza os embeddings e melhora a generalização com poucos exemplos.' },
        { term: 'External Memory', detail: 'Memória externa que guarda e recupera padrões de tarefas já vistas, permitindo aprender novas tarefas rapidamente sem retreinar o modelo inteiro.' },
      ],
      statsTitle: 'Escala de treino',
      statYears: [
        {
          year: '2025',
          items: [
            { value: '1,45 bi', label: 'registros transacionais' },
            { value: '12', label: 'bases públicas/adquiridas' },
          ],
        },
        {
          year: '2026',
          items: [
            { value: '20 bi', label: 'registros transacionais' },
            { value: '50', label: 'bases públicas/adquiridas' },
          ],
        },
      ],
      mixTitle: 'Composição dos dados de treino (2026)',
      mix: [
        { value: '15%', label: 'Produtos financeiros' },
        { value: '45%', label: 'E-commerce' },
        { value: '20%', label: 'Telecom' },
        { value: '20%', label: 'Atacado / varejo' },
      ],
    },
    reasoning: {
      eyebrow: 'Método',
      title: 'Como a inteligência decide',
      lead: 'Duas propriedades definem a qualidade de uma decisão preditiva: a saída não pode colapsar no óbvio, e cada decisão precisa ser auditável até os sinais que a produziram.',
      parts: [
        {
          index: '01',
          title: 'Precisão e diversidade, juntas',
          description: 'Um modelo que só repete o histórico é preciso e inútil. O treinamento aplica um ajuste que mantém a precisão comportamental enquanto abre o espaço de saída para alternativas ainda não exploradas.',
          points: [
            'Precisão e diversidade tratadas como objetivos simultâneos, não como concessão',
            'Sinais raros preservados em vez de suprimidos pela frequência',
            'Mesmo nível de relevância mantido também para perfis anônimos',
          ],
        },
        {
          index: '02',
          title: 'Explicabilidade como parte da saída',
          description: 'A explicação não é um relatório posterior: cada decisão carrega o peso dos sinais que a determinaram, o que permite auditoria, contestação e correção.',
          points: [
            'Contribuição de cada variável em cada decisão individual',
            'Sinais rastreáveis: comportamento, propensão, estoque, margem, demanda, elasticidade e similaridade',
            'Registro versionado de modelo, dado e decisão, disponível para auditoria',
          ],
        },
      ],
    },
    security: {
      eyebrow: 'Governança',
      title: 'Segurança e conformidade por design',
      lead: 'Privacidade e isolamento são pré-requisitos de arquitetura, não camadas adicionadas depois.',
      pillars: [
        { title: 'Anonimização na origem', description: 'Dados sensíveis são anonimizados antes de qualquer treinamento — pré-requisito de segurança para todos os modelos' },
        { title: 'Arquitetura segura', description: 'Autenticação multinível e controle de acesso baseado em rotas' },
        { title: 'Ambiente isolado', description: 'Ambientes seguros e isolados protegem dados e modelos contra acesso não autorizado' },
        { title: 'Pronto para escalar', description: 'Solução 100% em nuvem, com escalonamento automático de recursos' },
      ],
    },
    results: {
      eyebrow: 'Evidência',
      title: 'Resultados reais em produção',
      lead: 'Números medidos em operação de clientes. O setor aparece como procedência da evidência — é o que torna o número verificável.',
      sourceLabel: 'Setor',
    },
    science: {
      eyebrow: 'Base científica',
      title: 'Pesquisa acadêmica na origem do time',
      lead: 'Publicações revisadas por pares de Everton Gago, cofundador e COO da infinity6, em mineração de dados, mapas auto-organizáveis e inteligência de negócios',
      cta: 'Ver todas as publicações e palestras',
      founder: {
        label: 'Veja o perfil acadêmico de Everton Gago, cofundador & COO da infinity6',
        url: 'https://unicamp.academia.edu/EvertonGago',
      },
    },
    glossary: {
      eyebrow: 'Vocabulário',
      title: 'Termos usados nesta página',
      lead: 'Definições curtas do que é necessário para ler o restante desta página.',
      terms: [
        { slug: 'maml', term: 'MAML', definition: 'Model-Agnostic Meta-Learning. Algoritmo (Finn, Abbeel & Levine, 2017) que treina modelos para se adaptarem rapidamente a novas tarefas com poucas amostras — base do i6-RecSys-Base.g1.' },
        { slug: 'active-learning', term: 'Active Learning', definition: 'Estratégia em que o próprio modelo escolhe quais amostras valem a pena rotular, acelerando o aprendizado e reduzindo o custo de rotulagem.' },
        { slug: 'topological-loss', term: 'Topological Loss', definition: 'Função de perda que preserva as relações topológicas do espaço latente, o que estabiliza os embeddings e melhora a generalização com poucos exemplos.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', definition: 'Modelo fundacional proprietário da infinity6 (MAML + Active Learning + Topological Loss) pré-treinado em 20 bi de registros multissetoriais, adaptável com poucas amostras por cliente.' },
        { slug: 'predicao-comportamental', term: 'Predição comportamental', definition: 'Modelagem que aprende o comportamento real do cliente, canal ou produto a partir de dados transacionais — não declarados — para antecipar a próxima ação relevante.' },
        { slug: 'elasticidade-dinamica', term: 'Elasticidade dinâmica', definition: 'Sensibilidade de demanda a preço calculada continuamente por SKU, canal e ciclo de vida — substitui curvas estáticas por aprendizado online.' },
      ],
      cta: 'Glossário completo na documentação',
    },
    closing: {
      eyebrow: 'Próximo passo',
      title: 'Quer avaliar a inteligência em profundidade?',
      lead: 'Conversamos com times técnicos sobre arquitetura, avaliação de modelo e integração — sem intermediação comercial.',
      primary: 'Falar com o time técnico',
      secondary: 'Construir sobre a i6 Builder Platform',
      tertiary: 'Contratar a Decision Suite',
    },
  },

  en: {
    hero: {
      eyebrow: 'infinity6 · the intelligence layer',
      title: 'The intelligence beneath everything we ship',
      lead: 'Beneath the i6 Decision Suite and the i6 Builder Platform, proprietary engines, foundation models and scientific methods sustain every decision.',
      layers: [
        { name: 'i6 Decision Suite', role: 'Decisions ready, from business problem to result.' },
        { name: 'i6 Builder Platform', role: 'SDK and API to build your own products.' },
        { name: 'The intelligence', role: 'Pillars of technical depth, from engine to governance.', current: true },
      ],
      indexLinks: [
        { label: 'Engines', anchor: '#motores' },
        { label: 'Foundation Model', anchor: '#modelo-fundacional' },
        { label: 'Method', anchor: '#metodo' },
        { label: 'Scientific Base', anchor: '#base-cientifica' },
        { label: 'Abstraction Layer', anchor: '#camada-abstracao' },
        { label: 'Governance', anchor: '#governanca' },
      ],
      credentials: [
        { value: '3', label: 'proprietary engines' },
        { value: '20B records', label: 'foundation training scale' },
        { value: '50', label: 'public/acquired pre-training datasets' },
        { value: '3', label: 'peer-reviewed publications' },
        { value: '9', label: 'technical talks & conferences' },
      ],
    },
    engines: {
      eyebrow: 'Predictive core',
      title: 'Three proprietary engines',
      lead: [
        'Each engine solves its own class of decision, on the same foundation base.',
        'They do not generate text: they generate calibrated decisions, with measured uncertainty and traceable explanation.',
      ],
      items: [
        {
          id: 'i6previsio',
          name: 'i6 Previsio',
          tagline: 'Granular demand forecasting',
          description: 'Estimates demand by SKU, channel and time window and measures the uncertainty of each forecast.',
          points: [
            'Granularity down to SKU × point of sale × day',
            'Decomposition of trend, seasonality and event',
            'Continuous reprocessing as new data arrives',
          ],
        },
        {
          id: 'i6recsys',
          name: 'i6 RecSys',
          tagline: 'Contextual recommendation',
          description: 'Behavioral ranking that combines history, context and operational constraint in a single decision function.',
          points: [
            'Learns transactional behavior, identified or anonymous, in the same latent space',
            'Explicit balance between precision and diversity',
            'Each recommendation comes with the factors behind it and the argument ready to use',
          ],
        },
        {
          id: 'i6elasticprice',
          name: 'i6 ElasticPrice',
          tagline: 'Adaptive pricing',
          description: 'Continuous elasticity estimation per SKU, channel and lifecycle, replacing static curves with online learning.',
          points: [
            'Elasticity recomputed on every data cycle',
            'Margin and positioning constraints as model bounds',
            'Scenario simulation before any price is applied',
          ],
        },
      ],
      note: 'Shared by all three: hybrid architecture, operation on anonymized data and an adjustable balance across competing goals, such as accuracy and diversity, margin and positioning.',
    },
    builder: {
      eyebrow: 'Abstraction layer',
      title: 'i6 Builder Platform',
      lead: 'The engines reach you two ways: ready to use, in the i6 Decision Suite, or programmatically, in the i6 Builder Platform — SDK, API and toolkits — so technical teams and partners can build their own applications on the same intelligence.',
      bullets: [
        { title: 'SDK', text: 'Libraries to train, adapt and serve models derived from the foundation model.' },
        { title: 'API', text: 'Forecasting, ranking and elasticity endpoints with a stable, versioned contract.' },
        { title: 'Toolkits', text: 'Ready-made blocks for evaluation, drift monitoring and explainability.' },
      ],
      cta: 'Build with the i6 Builder Platform',
    },
    foundation: {
      eyebrow: 'Foundation model',
      label: 'Foundation model',
      name: 'i6-RecSys-Base.g1',
      description: 'The base shared by all three engines: meta-learning, active learning and topological loss to adapt to new tasks from few samples.',
      architectureTitle: 'Architecture',
      architecture: [
        { term: 'MAML (Model-Agnostic Meta-Learning)', detail: 'Meta-learning that leaves the model ready to adapt to a new task from a handful of client samples.' },
        { term: 'Active Learning', detail: 'The model itself picks which samples are worth labeling, accelerating learning and reducing labeling cost.' },
        { term: 'Topological Loss', detail: 'Preserves topological relations in the latent space, which stabilizes the embeddings and improves generalization from few examples.' },
        { term: 'External Memory', detail: 'External memory that stores and retrieves patterns from tasks already seen, allowing new tasks to be learned quickly without retraining the whole model.' },
      ],
      statsTitle: 'Training scale',
      statYears: [
        {
          year: '2025',
          items: [
            { value: '1.45B', label: 'transactional records' },
            { value: '12', label: 'public/acquired sources' },
          ],
        },
        {
          year: '2026',
          items: [
            { value: '20B', label: 'transactional records' },
            { value: '50', label: 'public/acquired sources' },
          ],
        },
      ],
      mixTitle: 'Training data composition (2026)',
      mix: [
        { value: '15%', label: 'Financial products' },
        { value: '45%', label: 'E-commerce' },
        { value: '20%', label: 'Telecom' },
        { value: '20%', label: 'Wholesale / retail' },
      ],
    },
    reasoning: {
      eyebrow: 'Method',
      title: 'How the intelligence decides',
      lead: 'Two properties define the quality of a predictive decision: the output must not collapse into the obvious, and every decision must be auditable back to the signals that produced it.',
      parts: [
        {
          index: '01',
          title: 'Precision and diversity, together',
          description: 'A model that merely repeats history is accurate and useless. Training applies a tuning step that keeps behavioral precision while opening the output space to alternatives not yet explored.',
          points: [
            'Precision and diversity as simultaneous objectives, not a concession',
            'Rare signals preserved instead of suppressed by frequency',
            'Same relevance level maintained for anonymous profiles as well',
          ],
        },
        {
          index: '02',
          title: 'Explainability as part of the output',
          description: 'Explanation is not a report written afterwards: every decision carries the weight of the signals that determined it, enabling audit, challenge and correction.',
          points: [
            'Contribution of each variable in every individual decision',
            'Traceable signals: behavior, propensity, inventory, margin, demand, elasticity and similarity',
            'Versioned record of model, data and decision, available for audit',
          ],
        },
      ],
    },
    security: {
      eyebrow: 'Governance',
      title: 'Security and compliance by design',
      lead: 'Privacy and isolation are architectural prerequisites, not layers added later.',
      pillars: [
        { title: 'Anonymization at source', description: 'Sensitive data is anonymized before any training — a security prerequisite for every model' },
        { title: 'Secure architecture', description: 'Multi-level authentication and route-based access control' },
        { title: 'Isolated environment', description: 'Secure, isolated environments protect your data and models from unauthorized access' },
        { title: 'Ready to scale', description: '100% cloud-native solution with automatic resource scaling' },
      ],
    },
    results: {
      eyebrow: 'Evidence',
      title: 'Real results in production',
      lead: 'Numbers measured in client operations. The sector appears as the provenance of the evidence — it is what makes the number verifiable.',
      sourceLabel: 'Sector',
    },
    science: {
      eyebrow: 'Scientific foundations',
      title: "Academic research at the team's origin",
      lead: 'Peer-reviewed publications by Everton Gago, co-founder and COO of infinity6, in data mining, self-organizing maps and business intelligence',
      cta: 'See all publications and talks',
      founder: {
        label: 'See the academic profile of Everton Gago, co-founder & COO of infinity6',
        url: 'https://unicamp.academia.edu/EvertonGago',
      },
    },
    glossary: {
      eyebrow: 'Vocabulary',
      title: 'Terms used on this page',
      lead: 'Short definitions of what you need to read the rest of this page.',
      terms: [
        { slug: 'maml', term: 'MAML', definition: 'Model-Agnostic Meta-Learning. Algorithm (Finn, Abbeel & Levine, 2017) that trains models to adapt quickly to new tasks from few samples — the basis of i6-RecSys-Base.g1.' },
        { slug: 'active-learning', term: 'Active Learning', definition: 'Strategy in which the model itself picks which samples are worth labeling, accelerating learning and reducing labeling cost.' },
        { slug: 'topological-loss', term: 'Topological Loss', definition: 'Loss function that preserves topological relations in the latent space, which stabilizes the embeddings and improves generalization from few examples.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', definition: 'infinity6 proprietary foundation model (MAML + Active Learning + Topological Loss) pre-trained on 20B cross-sector records, adaptable from few client samples.' },
        { slug: 'behavioral-prediction', term: 'Behavioral prediction', definition: 'Modeling that learns the real behavior of a customer, channel or product from transactional data — not declared preferences — to anticipate the next relevant action.' },
        { slug: 'dynamic-elasticity', term: 'Dynamic elasticity', definition: 'Price sensitivity of demand computed continuously by SKU, channel and lifecycle — replacing static curves with online learning.' },
      ],
      cta: 'Full glossary in the documentation',
    },
    closing: {
      eyebrow: 'Next step',
      title: 'Want to assess the intelligence in depth?',
      lead: 'We talk to technical teams about architecture, model evaluation and integration — with no commercial layer in between.',
      primary: 'Talk to the technical team',
      secondary: 'Build on the i6 Builder Platform',
      tertiary: 'Get the Decision Suite',
    },
  },

  es: {
    hero: {
      eyebrow: 'infinity6 · la capa de inteligencia',
      title: 'La inteligencia que sostiene todo lo que entregamos',
      lead: 'Bajo la i6 Decision Suite y la i6 Builder Platform, motores propios, modelos fundacionales y métodos científicos sostienen cada decisión.',
      layers: [
        { name: 'i6 Decision Suite', role: 'Decisiones listas, del problema de negocio al resultado.' },
        { name: 'i6 Builder Platform', role: 'SDK y API para construir tus propios productos.' },
        { name: 'La inteligencia', role: 'Pilares de profundidad técnica, del motor a la gobernanza.', current: true },
      ],
      indexLinks: [
        { label: 'Motores', anchor: '#motores' },
        { label: 'Modelo Fundacional', anchor: '#modelo-fundacional' },
        { label: 'Método', anchor: '#metodo' },
        { label: 'Base Científica', anchor: '#base-cientifica' },
        { label: 'Capa de Abstracción', anchor: '#camada-abstracao' },
        { label: 'Gobernanza', anchor: '#governanca' },
      ],
      credentials: [
        { value: '3', label: 'motores propios' },
        { value: '20 mil millones de registros', label: 'escala de entrenamiento fundacional' },
        { value: '50', label: 'bases públicas/adquiridas de preentrenamiento' },
        { value: '3', label: 'publicaciones revisadas por pares' },
        { value: '9', label: 'charlas y conferencias técnicas' },
      ],
    },
    engines: {
      eyebrow: 'Núcleo predictivo',
      title: 'Tres motores propios',
      lead: [
        'Cada motor resuelve su propia clase de decisión, sobre la misma base fundacional.',
        'No generan texto: generan decisiones calibradas, con incertidumbre medida y explicación rastreable.',
      ],
      items: [
        {
          id: 'i6previsio',
          name: 'i6 Previsio',
          tagline: 'Previsión de demanda granular',
          description: 'Estima la demanda por SKU, canal y ventana temporal y mide la incertidumbre de cada previsión.',
          points: [
            'Granularidad hasta SKU × punto de venta × día',
            'Descomposición de tendencia, estacionalidad y evento',
            'Reprocesamiento continuo a medida que llega dato nuevo',
          ],
        },
        {
          id: 'i6recsys',
          name: 'i6 RecSys',
          tagline: 'Recomendación contextual',
          description: 'Ranking conductual que combina histórico, contexto y restricción operativa en una única función de decisión.',
          points: [
            'Aprende comportamiento transaccional, identificado o anónimo, en el mismo espacio latente',
            'Equilibrio explícito entre precisión y diversidad',
            'Cada recomendación sale con los factores que la motivaron y el argumento listo',
          ],
        },
        {
          id: 'i6elasticprice',
          name: 'i6 ElasticPrice',
          tagline: 'Precificación adaptativa',
          description: 'Estimación continua de elasticidad por SKU, canal y ciclo de vida, sustituyendo curvas estáticas por aprendizaje en línea.',
          points: [
            'Elasticidad recalculada en cada ciclo de datos',
            'Restricciones de margen y posicionamiento como límites del modelo',
            'Simulación de escenarios antes de aplicar el precio',
          ],
        },
      ],
      note: 'En común a los tres: arquitectura híbrida, operación sobre datos anonimizados y equilibrio ajustable entre metas en competencia, como precisión y diversidad, margen y posicionamiento.',
    },
    builder: {
      eyebrow: 'Capa de abstracción',
      title: 'i6 Builder Platform',
      lead: 'Los motores llegan a ti por dos vías: listos, en la i6 Decision Suite, o de forma programable, en la i6 Builder Platform — SDK, API y toolkits — para que equipos técnicos y aliados construyan sus propias aplicaciones sobre la misma inteligencia.',
      bullets: [
        { title: 'SDK', text: 'Bibliotecas para entrenar, adaptar y servir modelos derivados del modelo fundacional.' },
        { title: 'API', text: 'Endpoints de previsión, ranking y elasticidad con contrato estable y versionado.' },
        { title: 'Toolkits', text: 'Bloques listos de evaluación, monitoreo de deriva y explicabilidad.' },
      ],
      cta: 'Construye con la i6 Builder Platform',
    },
    foundation: {
      eyebrow: 'Modelo fundacional',
      label: 'Modelo fundacional',
      name: 'i6-RecSys-Base.g1',
      description: 'La base compartida por los tres motores: meta-aprendizaje, aprendizaje activo y pérdida topológica para adaptarse a nuevas tareas con pocas muestras.',
      architectureTitle: 'Arquitectura',
      architecture: [
        { term: 'MAML (Model-Agnostic Meta-Learning)', detail: 'Meta-aprendizaje que deja el modelo listo para adaptarse a una nueva tarea con pocas muestras del cliente.' },
        { term: 'Active Learning', detail: 'El propio modelo elige qué muestras vale la pena etiquetar, acelerando el aprendizaje y reduciendo el costo de etiquetado.' },
        { term: 'Topological Loss', detail: 'Preserva las relaciones topológicas del espacio latente, lo que estabiliza los embeddings y mejora la generalización con pocas muestras.' },
        { term: 'External Memory', detail: 'Memoria externa que guarda y recupera patrones de tareas ya vistas, permitiendo aprender nuevas tareas rápidamente sin reentrenar todo el modelo.' },
      ],
      statsTitle: 'Escala de entrenamiento',
      statYears: [
        {
          year: '2025',
          items: [
            { value: '1,45 bi', label: 'registros transaccionales' },
            { value: '12', label: 'bases públicas/adquiridas' },
          ],
        },
        {
          year: '2026',
          items: [
            { value: '20 bi', label: 'registros transaccionales' },
            { value: '50', label: 'bases públicas/adquiridas' },
          ],
        },
      ],
      mixTitle: 'Composición de los datos de entrenamiento (2026)',
      mix: [
        { value: '15%', label: 'Productos financieros' },
        { value: '45%', label: 'E-commerce' },
        { value: '20%', label: 'Telecom' },
        { value: '20%', label: 'Mayorista / retail' },
      ],
    },
    reasoning: {
      eyebrow: 'Método',
      title: 'Cómo decide la inteligencia',
      lead: 'Dos propiedades definen la calidad de una decisión predictiva: la salida no puede colapsar en lo obvio, y cada decisión debe ser auditable hasta las señales que la produjeron.',
      parts: [
        {
          index: '01',
          title: 'Precisión y diversidad, juntas',
          description: 'Un modelo que solo repite el histórico es preciso e inútil. El entrenamiento aplica un ajuste que mantiene la precisión conductual mientras abre el espacio de salida a alternativas aún no exploradas.',
          points: [
            'Precisión y diversidad como objetivos simultáneos, no como concesión',
            'Señales raras preservadas en lugar de suprimidas por la frecuencia',
            'Mismo nivel de relevancia también para perfiles anónimos',
          ],
        },
        {
          index: '02',
          title: 'Explicabilidad como parte de la salida',
          description: 'La explicación no es un informe posterior: cada decisión carga el peso de las señales que la determinaron, lo que permite auditoría, cuestionamiento y corrección.',
          points: [
            'Contribución de cada variable en cada decisión individual',
            'Señales rastreables: comportamiento, propensión, inventario, margen, demanda, elasticidad y similitud',
            'Registro versionado de modelo, dato y decisión, disponible para auditoría',
          ],
        },
      ],
    },
    security: {
      eyebrow: 'Gobernanza',
      title: 'Seguridad y cumplimiento por diseño',
      lead: 'Privacidad y aislamiento son requisitos de arquitectura, no capas añadidas después.',
      pillars: [
        { title: 'Anonimización en el origen', description: 'Los datos sensibles se anonimizan antes de cualquier entrenamiento — requisito de seguridad para todos los modelos' },
        { title: 'Arquitectura segura', description: 'Autenticación multinivel y control de acceso basado en rutas' },
        { title: 'Entorno aislado', description: 'Entornos seguros y aislados protegen datos y modelos contra accesos no autorizados' },
        { title: 'Listo para escalar', description: 'Solución 100% en la nube, con escalado automático de recursos' },
      ],
    },
    results: {
      eyebrow: 'Evidencia',
      title: 'Resultados reales en producción',
      lead: 'Números medidos en operaciones de clientes. El sector aparece como procedencia de la evidencia: es lo que hace verificable el número.',
      sourceLabel: 'Sector',
    },
    science: {
      eyebrow: 'Base científica',
      title: 'Investigación académica en el origen del equipo',
      lead: 'Publicaciones con revisión por pares de Everton Gago, cofundador y COO de infinity6, en minería de datos, mapas autoorganizados e inteligencia de negocios',
      cta: 'Ver todas las publicaciones y charlas',
      founder: {
        label: 'Mira el perfil académico de Everton Gago, cofundador & COO de infinity6',
        url: 'https://unicamp.academia.edu/EvertonGago',
      },
    },
    glossary: {
      eyebrow: 'Vocabulario',
      title: 'Términos usados en esta página',
      lead: 'Definiciones breves de lo necesario para leer el resto de esta página.',
      terms: [
        { slug: 'maml', term: 'MAML', definition: 'Model-Agnostic Meta-Learning. Algoritmo (Finn, Abbeel & Levine, 2017) que entrena modelos para adaptarse rápidamente a nuevas tareas con pocas muestras — base del i6-RecSys-Base.g1.' },
        { slug: 'active-learning', term: 'Active Learning', definition: 'Estrategia en la que el propio modelo elige qué muestras vale la pena etiquetar, acelerando el aprendizaje y reduciendo el costo de etiquetado.' },
        { slug: 'topological-loss', term: 'Topological Loss', definition: 'Función de pérdida que preserva las relaciones topológicas del espacio latente, lo que estabiliza los embeddings y mejora la generalización con pocas muestras.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', definition: 'Modelo fundacional propio de infinity6 (MAML + Active Learning + Topological Loss) preentrenado en 20 mil millones de registros multisectoriales, adaptable con pocas muestras por cliente.' },
        { slug: 'prediccion-conductual', term: 'Predicción conductual', definition: 'Modelado que aprende el comportamiento real del cliente, canal o producto a partir de datos transaccionales — no declarados — para anticipar la próxima acción relevante.' },
        { slug: 'elasticidad-dinamica', term: 'Elasticidad dinámica', definition: 'Sensibilidad de la demanda al precio calculada de forma continua por SKU, canal y ciclo de vida — sustituye curvas estáticas por aprendizaje en línea.' },
      ],
      cta: 'Glosario completo en la documentación',
    },
    closing: {
      eyebrow: 'Siguiente paso',
      title: '¿Quieres evaluar la inteligencia en profundidad?',
      lead: 'Hablamos con equipos técnicos sobre arquitectura, evaluación de modelos e integración — sin intermediación comercial.',
      primary: 'Hablar con el equipo técnico',
      secondary: 'Construir sobre la i6 Builder Platform',
      tertiary: 'Contratar la Decision Suite',
    },
  },
};
