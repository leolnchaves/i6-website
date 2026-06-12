import type { Language } from '@/types/language';

export interface EngineDef {
  id: 'i6recsys' | 'i6previsio' | 'i6elasticprice' | 'i6signal';
  name: string;
  tagline: string;
  description: string;
}

export interface ChallengeRow {
  challenge: string;
  learning: string;
  resolution: string;
}

export interface OurAIContent {
  hero: { eyebrow: string; title: string; subtitle: string; lead: string };
  thesis: {
    title: string;
    pillars: { title: string; text: string }[];
    foundation: {
      label: string;
      name: string;
      description: string;
      stats: { value: string; label: string }[];
      mix: { value: string; label: string }[];
      references: { title: string; items: { author: string; paper: string; note: string }[] };
    };
  };
  engines: {
    title: string;
    lead: string;
    items: EngineDef[];
    differentiators: { title: string; items: string[] };
  };
  dualValue: {
    title: string;
    columns: {
      title: string;
      points: string[];
      formula: string;
    }[];
  };
  learnInfluence: {
    title: string;
    lead: string;
    stages: { label: string; detail: string }[];
    journey: string[];
    conclusion: string;
    attributes: string[];
  };
  diversity: {
    title: string;
    lead: string;
    tasks: string[];
    middle: { title: string; subtitle: string };
    chartNote: string;
  };
  explainability: {
    title: string;
    lead: string;
    steps: {
      title: string;
      description: string;
      sample?: { sku: string; rows: { feature: string; weight: string }[] };
      cards?: { title: string; subtitle: string }[];
    }[];
  };
  security: {
    title: string;
    pillars: { title: string; description: string }[];
  };
  challenges: {
    title: string;
    lead: string;
    headers: { challenge: string; learning: string; resolution: string };
    rows: ChallengeRow[];
  };
  community: {
    title: string;
    description: string;
    cta: string;
  };
  cta: {
    title: string;
    button: string;
  };
}

export const ourAIContent: Record<Language, OurAIContent> = {
  pt: {
    hero: {
      eyebrow: 'Proprietary AI',
      title: 'Nossos motores de IA proprietária',
      subtitle: 'IA aplicada é um organismo que se constrói, se alimenta e se adapta',
      lead: 'Quatro motores próprios que aprendem comportamento, antecipam decisão e prescrevem ação — não geram texto, geram resultado.',
    },
    thesis: {
      title: 'IA só precisa saber o que muda o jogo',
      pillars: [
        {
          title: 'Clareza do problema',
          text: 'Dar à IA o problema certo para resolver — não dados crus, mas a decisão de negócio que importa.',
        },
        {
          title: 'Isolar o comportamento',
          text: 'O treinamento isola o comportamento que leva ao objetivo de negócio e elimina variáveis ruidosas.',
        },
        {
          title: 'Aderência contextual',
          text: 'Não é o que o cliente "gosta" — é o que ele tem intenção e condição de comprar agora.',
        },
      ],
      foundation: {
        label: 'Modelo fundacional',
        name: 'i6-RecSys-Base.g1',
        description: 'MAML + Active Learning + Topological Loss Foundation Model — adaptável com poucas amostras, com memória externa para aprender novas tarefas rapidamente.',
        stats: [
          { value: '1,45B', label: 'registros (2025)' },
          { value: '20B', label: 'registros (2026)' },
          { value: '12', label: 'bases públicas/adquiridas (2025)' },
          { value: '~50', label: 'bases públicas/adquiridas (2026)' },
        ],
        mix: [
          { value: '15%', label: 'transações bancárias' },
          { value: '45%', label: 'e-commerce' },
          { value: '20%', label: 'telecom' },
          { value: '20%', label: 'atacado / varejo' },
        ],
        references: {
          title: 'Referências acadêmicas',
          items: [
            { author: 'Finn, Abbeel & Levine', paper: 'Model-Agnostic Meta-Learning (MAML)', note: 'Algoritmo que treina modelos para serem adaptáveis com poucas amostras' },
            { author: 'Vinyals et al.', paper: 'Matching Networks for One Shot Learning', note: 'Fundamenta abordagens metric-based de meta-learning' },
            { author: 'Ravi & Larochelle', paper: 'Optimization as a Model for Few-Shot Learning', note: 'Redes recorrentes para aprender otimizadores que generalizam' },
            { author: 'Santoro et al.', paper: 'Meta-Learning with Memory-Augmented Neural Networks', note: 'Memória externa para aprender novas tarefas rapidamente' },
          ],
        },
      },
    },
    engines: {
      title: 'Quatro motores. Uma camada conversacional.',
      lead: 'Cada motor resolve uma classe de decisão. O i6 Signal lê o output preditivo dos três e entrega a próxima ação ao time de negócio.',
      items: [
        {
          id: 'i6recsys',
          name: 'i6 RecSys',
          tagline: 'Recomendação de alto desempenho',
          description: 'Sugestões personalizadas e escaláveis para mix e volume de produtos — em PDV, e-commerce e canais digitais.',
        },
        {
          id: 'i6previsio',
          name: 'i6 Previsio',
          tagline: 'Previsão de demanda granular',
          description: 'Previsões precisas que otimizam produção, estoque e distribuição — eliminando ruptura e excesso.',
        },
        {
          id: 'i6elasticprice',
          name: 'i6 ElasticPrice',
          tagline: 'Precificação dinâmica',
          description: 'Aprende continuamente com sinais de mercado e demanda para entregar recomendações de preço rápidas e precisas.',
        },
        {
          id: 'i6signal',
          name: 'i6 Signal',
          tagline: 'Camada conversacional preditiva',
          description: 'Conversa com o output preditivo dos três motores e entrega recomendações antecipatórias e prescritivas para a decisão.',
        },
      ],
      differentiators: {
        title: 'Recursos incomparáveis',
        items: [
          'Arquitetura híbrida',
          'Operação com dados anonimizados',
          'Ajuste fino do equilíbrio entre metas comerciais',
        ],
      },
    },
    dualValue: {
      title: 'O impacto não vem de prever — vem de como a IA se conecta ao contexto do problema',
      columns: [
        {
          title: 'Clareza ao caos',
          points: [
            'Enxergar padrões que o olho humano não percebe e agir em escala sobre eles',
            'Detectar intenção antes que a pessoa declare interesse',
            'Permitir que decisões antes reativas se tornem proativas e autônomas',
          ],
          formula: 'consumo + tempo + contexto + similaridade = insight acionável',
        },
        {
          title: 'Números se movem',
          points: [
            'Aprende o comportamento de um cliente, canal ou produto específico',
            'Usa o contexto para ajustar cada decisão ao objetivo de negócio',
            'Não tenta ser inteligente sobre tudo — apenas sobre o que realmente importa',
          ],
          formula: 'dados + contexto + decisão = influência',
        },
      ],
    },
    learnInfluence: {
      title: 'IA aprende. Influência vende.',
      lead: 'Fine tuning a partir do comportamento isolado — mirando não apenas precisão, mas resultado de negócio: margem, conversão, market share, savings.',
      stages: [
        { label: 'Fine tuning', detail: 'Calibração a partir do comportamento isolado' },
        { label: 'Necessidade específica', detail: 'Para influência e continuidade da jornada' },
        { label: 'Resultado de negócio', detail: 'Necessidades do negócio e metas a alcançar' },
      ],
      journey: ['interesse', 'pesquisa', 'compra'],
      conclusion: 'Afinidade comportamental e contextual gera propensão real baseada em influência',
      attributes: ['Relevância', 'Oportunidade', 'Timing', 'Necessidade', 'Substituição', 'Elasticidade', 'Similaridade', 'Explicabilidade'],
    },
    diversity: {
      title: 'Balanceamento de diversidade',
      lead: 'Ao analisar comportamentos únicos e padrões de recomendação, identificamos os melhores produtos inexplorados para cada cliente — garantindo sugestões diversas e relevantes além do histórico.',
      tasks: ['Recommended for you', 'Frequently bought together', 'Buy it again', 'Similar items', 'On sale'],
      middle: {
        title: 'Treinamento com ajuste fino',
        subtitle: 'Para precisão e diversidade',
      },
      chartNote: 'Distribuição de clientes por número de produtos diversos recomendados — clientes com previsões diversas, mantendo alta precisão no alinhamento comportamental.',
    },
    explainability: {
      title: 'Explicabilidade que vira argumento de venda',
      lead: 'Para cada previsão, o modelo retorna as características que influenciaram a recomendação. O insight vira um argumento dinâmico, pronto para o ponto de venda.',
      steps: [
        {
          title: 'Identifica motivadores',
          description: 'Detecta os principais fatores que influenciam a recomendação',
          sample: {
            sku: 'SKU 3874',
            rows: [
              { feature: 'ct_lst_15_days', weight: '+0.0824' },
              { feature: 'cx_time_tobuy', weight: '+0.0360' },
              { feature: 'ct_lst_7_days', weight: '−0.0352' },
              { feature: 'cx_item_id_weighted', weight: '−0.0239' },
            ],
          },
        },
        {
          title: 'Prioriza fatores e estrutura',
          description: 'Classifica fatores pelo impacto estimado no aumento de vendas e escolhe o melhor modelo de mensagem',
          cards: [
            { title: 'Increase in demand', subtitle: 'prioritize argument of growth opportunity' },
            { title: 'Repurchase occasion', subtitle: 'emphasize need for immediate restocking' },
            { title: 'New product', subtitle: 'highlight market trend' },
            { title: 'High-selling product', subtitle: 'stress risk of stockout' },
          ],
        },
        {
          title: 'Gera argumento dinâmico',
          description: 'Preenche o modelo com elementos dinâmicos, compondo a mensagem personalizada para cada PDV/SKU',
          cards: [
            { title: 'High engagement', subtitle: 'from similar customer profiles in the last 30 days' },
            { title: 'Optimized bundling', subtitle: 'based on successful cross-sell patterns' },
            { title: 'Strong correlation', subtitle: 'with the preferred products of high-value customers' },
          ],
        },
      ],
    },
    security: {
      title: 'Segurança e conformidade por design',
      pillars: [
        { title: 'Arquitetura segura', description: 'Autenticação multinível e controle de acesso baseado em rotas' },
        { title: 'Ambiente isolado', description: 'Ambientes seguros e isolados protegem dados e modelos contra acesso não autorizado' },
        { title: 'Conformidade by design', description: 'Práticas rigorosas de criptografia de dados confidenciais' },
        { title: 'Pronto para escalar', description: 'Solução 100% em nuvem, com escalonamento automático de recursos' },
      ],
    },
    challenges: {
      title: 'Por que a IA aplicada falha — e como resolvemos',
      lead: 'IA aplicada é um organismo que se constrói, se alimenta e se adapta. Os principais desafios que enfrentamos com clientes e como a infinity6 endereça cada um.',
      headers: { challenge: 'Desafio', learning: 'Aprendizado', resolution: 'Como resolvemos' },
      rows: [
        { challenge: 'Jornadas não digitais ou fragmentadas', learning: 'Sem interação, IA não aprende', resolution: 'Touchpoints híbridos (contextual, WhatsApp, integrações simples)' },
        { challenge: 'Dados transacionais sem contexto', learning: 'Dados frios geram modelos cegos', resolution: 'Modelos funcionais que generalizam o comportamento' },
        { challenge: 'Dado bom, mas desorganizado', learning: 'Volume não é qualidade', resolution: 'Estruturação e curadoria de variáveis mais relevantes' },
        { challenge: 'CPC (Contato Pessoa Certa)', learning: 'Canal errado anula mensagem certa', resolution: 'Enriquecimento de dados' },
        { challenge: 'Falta de estratégia corporativa', learning: 'IA isolada é IA ineficiente', resolution: 'Rastreabilidade entre aplicação da IA, objetivos estratégicos e áreas' },
        { challenge: 'Expectativas irreais', learning: '"IA vai resolver tudo" é o primeiro passo do fracasso', resolution: 'Processo incremental com entregas rápidas' },
        { challenge: 'Foco em modelo, não em resultado', learning: 'O modelo é meio, não fim', resolution: 'IA orientada à decisão, não à curiosidade técnica' },
        { challenge: 'Dependência de IA genérica', learning: 'Nem toda IA precisa ser proprietária', resolution: 'Combinar GLM (general large model) para automação e SAM (small actionable model) para precisão e escala' },
        { challenge: 'Governança e privacidade', learning: 'Medo de errar trava inovação', resolution: 'AI by design: anonimização, segurança e experimentação responsável' },
      ],
    },
    community: {
      title: 'Comunidade infinity6',
      description: 'Publicamos modelos, datasets e experimentos abertos no Hugging Face — parte do que aprendemos volta para a comunidade.',
      cta: 'Visitar nossa comunidade',
    },
    cta: {
      title: 'Quer conhecer os motores em profundidade?',
      button: 'Converse com nosso time técnico',
    },
  },
  en: {
    hero: {
      eyebrow: 'Proprietary AI',
      title: 'Our proprietary AI engines',
      subtitle: 'Applied AI is an organism that builds itself, feeds itself and adapts',
      lead: 'Four in-house engines that learn behavior, anticipate decisions and prescribe action — they do not generate text, they generate outcomes.',
    },
    thesis: {
      title: 'AI only needs to know what changes the game',
      pillars: [
        {
          title: 'Clarity of the problem',
          text: 'Give AI the right problem to solve — not raw data, but the business decision that actually matters.',
        },
        {
          title: 'Isolate the behavior',
          text: 'Training isolates the behavior that leads to the business goal and removes noisy variables.',
        },
        {
          title: 'Contextual adherence',
          text: "It's not about what the customer 'likes' — it's about what they intend and are ready to buy now.",
        },
      ],
      foundation: {
        label: 'Foundation model',
        name: 'i6-RecSys-Base.g1',
        description: 'MAML + Active Learning + Topological Loss Foundation Model — adaptable from few samples, with external memory to learn new tasks fast.',
        stats: [
          { value: '1.45B', label: 'records (2025)' },
          { value: '20B', label: 'records (2026)' },
          { value: '12', label: 'public/acquired sources (2025)' },
          { value: '~50', label: 'public/acquired sources (2026)' },
        ],
        mix: [
          { value: '15%', label: 'banking transactions' },
          { value: '45%', label: 'e-commerce' },
          { value: '20%', label: 'telecom' },
          { value: '20%', label: 'wholesale / retail' },
        ],
        references: {
          title: 'Academic references',
          items: [
            { author: 'Finn, Abbeel & Levine', paper: 'Model-Agnostic Meta-Learning (MAML)', note: 'Algorithm that trains models to adapt from few samples' },
            { author: 'Vinyals et al.', paper: 'Matching Networks for One Shot Learning', note: 'Foundation for metric-based meta-learning' },
            { author: 'Ravi & Larochelle', paper: 'Optimization as a Model for Few-Shot Learning', note: 'Recurrent networks to learn optimizers that generalize' },
            { author: 'Santoro et al.', paper: 'Meta-Learning with Memory-Augmented Neural Networks', note: 'External memory to learn new tasks rapidly' },
          ],
        },
      },
    },
    engines: {
      title: 'Four engines. One conversational layer.',
      lead: 'Each engine solves a class of decision. i6 Signal reads the predictive output of all three and delivers the next action to the business team.',
      items: [
        {
          id: 'i6recsys',
          name: 'i6 RecSys',
          tagline: 'High-performance recommendation',
          description: 'Personalized, scalable suggestions for product mix and volume — across POS, e-commerce and digital channels.',
        },
        {
          id: 'i6previsio',
          name: 'i6 Previsio',
          tagline: 'Granular demand forecasting',
          description: 'Accurate forecasts that optimize production, inventory and distribution — eliminating stockouts and overstock.',
        },
        {
          id: 'i6elasticprice',
          name: 'i6 ElasticPrice',
          tagline: 'Dynamic pricing',
          description: 'Continuously learns from market and demand signals to deliver fast, precise price recommendations.',
        },
        {
          id: 'i6signal',
          name: 'i6 Signal',
          tagline: 'Predictive conversational layer',
          description: 'Talks to the predictive output of the three engines and delivers anticipatory, prescriptive recommendations for decision-making.',
        },
      ],
      differentiators: {
        title: 'Unmatched capabilities',
        items: [
          'Hybrid architecture',
          'Operates on anonymized data',
          'Fine-tuned balance across business goals',
        ],
      },
    },
    dualValue: {
      title: 'Impact does not come from predicting — it comes from how AI connects to the problem context',
      columns: [
        {
          title: 'Clarity from chaos',
          points: [
            'See patterns the human eye misses and act on them at scale',
            'Detect intent before the person declares interest',
            'Turn reactive decisions into proactive, autonomous ones',
          ],
          formula: 'consumption + time + context + similarity = actionable insight',
        },
        {
          title: 'Numbers move',
          points: [
            'Learns the behavior of a specific customer, channel or product',
            'Uses context to align each decision to the business objective',
            "Doesn't try to be smart about everything — only about what actually matters",
          ],
          formula: 'data + context + decision = influence',
        },
      ],
    },
    learnInfluence: {
      title: 'AI learns. Influence sells.',
      lead: 'Fine tuning from isolated behavior — targeting not just accuracy, but business outcomes: margin, conversion, market share, savings.',
      stages: [
        { label: 'Fine tuning', detail: 'Calibration from isolated behavior' },
        { label: 'Specific need', detail: 'For influence and journey continuity' },
        { label: 'Business outcome', detail: 'Business needs and goals to achieve' },
      ],
      journey: ['interest', 'research', 'purchase'],
      conclusion: 'Behavioral and contextual affinity generate real propensity grounded in influence',
      attributes: ['Relevance', 'Opportunity', 'Timing', 'Need', 'Substitution', 'Elasticity', 'Similarity', 'Explainability'],
    },
    diversity: {
      title: 'Diversity balancing',
      lead: 'By analyzing unique behaviors and recommendation patterns, we identify the best unexplored products for each customer — ensuring diverse, relevant suggestions beyond purchase history.',
      tasks: ['Recommended for you', 'Frequently bought together', 'Buy it again', 'Similar items', 'On sale'],
      middle: {
        title: 'Fine-tuned training',
        subtitle: 'For precision and diversity',
      },
      chartNote: 'Distribution of customers by number of diverse products recommended — customers with diverse predictions, while keeping high precision in behavioral alignment.',
    },
    explainability: {
      title: 'Explainability that becomes a sales argument',
      lead: 'For each prediction, the model returns the features that influenced the recommendation. The insight becomes a dynamic argument, ready for the point of sale.',
      steps: [
        {
          title: 'Identify drivers',
          description: 'Detect the main factors that influence the recommendation',
          sample: {
            sku: 'SKU 3874',
            rows: [
              { feature: 'ct_lst_15_days', weight: '+0.0824' },
              { feature: 'cx_time_tobuy', weight: '+0.0360' },
              { feature: 'ct_lst_7_days', weight: '−0.0352' },
              { feature: 'cx_item_id_weighted', weight: '−0.0239' },
            ],
          },
        },
        {
          title: 'Prioritize factors and structure',
          description: 'Classify factors by estimated impact on sales growth and pick the best message template',
          cards: [
            { title: 'Increase in demand', subtitle: 'prioritize argument of growth opportunity' },
            { title: 'Repurchase occasion', subtitle: 'emphasize need for immediate restocking' },
            { title: 'New product', subtitle: 'highlight market trend' },
            { title: 'High-selling product', subtitle: 'stress risk of stockout' },
          ],
        },
        {
          title: 'Generate dynamic argument',
          description: 'Fill the template with dynamic elements, composing a personalized message per POS/SKU',
          cards: [
            { title: 'High engagement', subtitle: 'from similar customer profiles in the last 30 days' },
            { title: 'Optimized bundling', subtitle: 'based on successful cross-sell patterns' },
            { title: 'Strong correlation', subtitle: 'with the preferred products of high-value customers' },
          ],
        },
      ],
    },
    security: {
      title: 'Security and compliance by design',
      pillars: [
        { title: 'Secure architecture', description: 'Multi-level authentication and route-based access control' },
        { title: 'Isolated environment', description: 'Secure, isolated environments protect your data and models from unauthorized access' },
        { title: 'Compliance by design', description: 'Strict encryption practices for confidential data' },
        { title: 'Ready to scale', description: '100% cloud-native solution with automatic resource scaling' },
      ],
    },
    challenges: {
      title: 'Why applied AI fails — and how we solve it',
      lead: 'Applied AI is an organism that builds itself, feeds itself and adapts. The main challenges we face with clients and how infinity6 addresses each one.',
      headers: { challenge: 'Challenge', learning: 'Learning', resolution: 'How we solve it' },
      rows: [
        { challenge: 'Non-digital or fragmented journeys', learning: 'Without interaction, AI cannot learn', resolution: 'Hybrid touchpoints (contextual, WhatsApp, simple integrations)' },
        { challenge: 'Transactional data without context', learning: 'Cold data produces blind models', resolution: 'Functional models that generalize behavior' },
        { challenge: 'Good data, but disorganized', learning: 'Volume is not quality', resolution: 'Structuring and curating the most relevant variables' },
        { challenge: 'Right Person Contact', learning: 'The wrong channel cancels the right message', resolution: 'Data enrichment' },
        { challenge: 'No corporate strategy', learning: 'Isolated AI is inefficient AI', resolution: 'Traceability between AI application, strategic goals and business areas' },
        { challenge: 'Unrealistic expectations', learning: '"AI will solve everything" is the first step toward failure', resolution: 'Incremental process with fast deliveries' },
        { challenge: 'Focus on model, not on outcome', learning: 'The model is means, not end', resolution: 'Decision-oriented AI, not technical curiosity' },
        { challenge: 'Dependence on generic AI', learning: 'Not every AI needs to be proprietary', resolution: 'Combine GLM (general large model) for automation and SAM (small actionable model) for precision and scale' },
        { challenge: 'Governance and privacy', learning: 'Fear of failure blocks innovation', resolution: 'AI by design: anonymization, security and responsible experimentation' },
      ],
    },
    community: {
      title: 'infinity6 community',
      description: 'We publish open models, datasets and experiments on Hugging Face — part of what we learn flows back to the community.',
      cta: 'Visit our community',
    },
    cta: {
      title: 'Want to explore the engines in depth?',
      button: 'Talk to our technical team',
    },
  },
};
