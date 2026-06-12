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
    chartHighlight: string;
  };
  explainability: {
    title: string;
    lead: string;
    steps: {
      title: string;
      description: string;
      sample?: { sku: string; rows: { feature: string; weight: string }[] };
      cards?: { title: string; subtitle: string }[];
      segments?: { label: string; items: { title: string; subtitle: string }[] }[];
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
  research: {
    eyebrow: string;
    title: string;
    lead: string;
    publicationsLabel: string;
    talksLabel: string;
    openLabel: string;
    watchLabel: string;
    publications: { badge: string; title: string; venue: string; url: string }[];
    talks: { title: string; venue: string; url: string }[];
  };
  glossary: {
    title: string;
    lead: string;
    terms: { slug: string; term: string; definition: string }[];
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
      title: 'O impacto não vem só de prever, mas de como a IA se conecta ao contexto do problema',
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
      tasks: ['Recomendado para você', 'Comprados juntos com frequência', 'Compre novamente', 'Itens similares', 'Em promoção'],
      middle: {
        title: 'Treinamento com ajuste fino',
        subtitle: 'Para precisão e diversidade',
      },
      chartNote: 'Distribuição de clientes por número de produtos diversos recomendados — clientes com previsões diversas, mantendo alta precisão no alinhamento comportamental.',
      chartHighlight: '9 recomendações com o mesmo nível de relevância — inclusive para usuários anônimos',
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
            { title: 'Aumento de demanda', subtitle: 'priorize o argumento de oportunidade de crescimento' },
            { title: 'Ocasião de recompra', subtitle: 'enfatize a necessidade de reposição imediata' },
            { title: 'Produto novo', subtitle: 'destaque a tendência de mercado' },
            { title: 'Produto de alta venda', subtitle: 'reforce o risco de ruptura' },
          ],
        },
        {
          title: 'Gera argumento dinâmico',
          description: 'Preenche o modelo com elementos dinâmicos, compondo a mensagem personalizada para cada PDV/SKU',
          segments: [
            {
              label: 'Indústria',
              items: [
                { title: 'Padrão de consumo', subtitle: 'replicado em janelas sazonais comparáveis' },
                { title: 'Sazonalidade prevista', subtitle: 'antecipa pico de demanda em 21 dias' },
                { title: 'Reposição inteligente', subtitle: 'evita ruptura no canal de maior giro' },
              ],
            },
            {
              label: 'Varejo',
              items: [
                { title: 'Alto engajamento', subtitle: 'de perfis de cliente similares nos últimos 30 dias' },
                { title: 'Bundling otimizado', subtitle: 'baseado em padrões bem-sucedidos de cross-sell' },
                { title: 'Forte correlação', subtitle: 'com os produtos preferidos de clientes de alto valor' },
              ],
            },
            {
              label: 'Financeiro',
              items: [
                { title: 'Propensão a contratar', subtitle: 'score elevado de afinidade com a oferta' },
                { title: 'Perfil de risco alinhado', subtitle: 'dentro do apetite definido pela carteira' },
                { title: 'Cross-sell de produto', subtitle: 'aderente à jornada do cliente já ativo' },
              ],
            },
            {
              label: 'Farma',
              items: [
                { title: 'Aderência ao tratamento', subtitle: 'momento ideal de renovação da receita' },
                { title: 'Recompra prevista', subtitle: 'janela de continuidade da terapia' },
                { title: 'Recomendação por perfil clínico', subtitle: 'coerente com a categoria prescrita' },
              ],
            },
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
    research: {
      eyebrow: 'Pesquisa & Fundamentos',
      title: 'Base científica dos motores i6',
      lead: 'Os fundamentos de mapas auto-organizáveis, clustering não-supervisionado e descoberta de padrões sem regras prévias que alimentam i6Previsio, i6RecSys e i6ElasticPrice têm origem em pesquisa acadêmica revisada por pares e em palestras técnicas em conferências de engenharia',
      publicationsLabel: 'Publicações revisadas por pares',
      talksLabel: 'Palestras técnicas',
      openLabel: 'Acessar',
      watchLabel: 'Assistir',
      publications: [
        {
          badge: 'SPRINGER · LNBIP · 2013',
          title: 'Knowledge Discovery: Data Mining by Self-organizing Maps',
          venue: 'Web Information Systems and Technologies — Lecture Notes in Business Information Processing, vol. 140, pp. 185–200, Springer, Berlin, Heidelberg',
          url: 'https://link.springer.com/chapter/10.1007/978-3-642-36608-6_12',
        },
        {
          badge: 'CONFERÊNCIA · WEBIST · 2012',
          title: 'Self-Organizing Maps — An Approach Applied to the Electronic Government',
          venue: 'Proceedings of the 8th International Conference on Web Information Systems and Technologies (WEBIST 2012)',
          url: 'https://www.academia.edu/122408553/SELF_ORGANIZING_MAPS_An_Approach_Applied_to_the_Electronic_Government',
        },
        {
          badge: 'SPRINGER · LNCS · 2010',
          title: 'Development of a Business Intelligence Environment for e-Gov using Open Source Technologies',
          venue: 'Lecture Notes in Computer Science, Springer',
          url: 'https://www.academia.edu/24631504/Development_of_a_Business_Intelligence_Environment_for_e_Gov_Using_Open_Source_Technologies',
        },
        {
          badge: 'ARTIGO · PT-BR',
          title: 'Mapas auto-organizáveis aplicados em governo eletrônico',
          venue: 'Publicação acadêmica · Academia.edu',
          url: 'https://www.academia.edu/122408570/Mapas_auto_organiz%C3%A1veis_aplicados_em_governo_eletr%C3%B4nico',
        },
        {
          badge: 'ARTIGO · Open Access',
          title: 'Knowledge Discovery: Data Mining by Self-organizing Maps',
          venue: 'Repositório acadêmico · Academia.edu',
          url: 'https://www.academia.edu/24631415/Knowledge_Discovery_Data_Mining_by_Self_organizing_Maps',
        },
      ],
      talks: [
        { title: 'Ciência de dados para alinhar produto', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/ciencia-de-dados-alinhar-produto/' },
        { title: 'Recomendação de conteúdo na escala do iFood', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/recomendacao-de-conteudo-na-escala-do-ifood/' },
        { title: 'Machine Learning — do gênesis ao apocalipse', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-genesis-ao-apocalipse/' },
        { title: 'Classificação de padrões: uma abordagem prática com redes neurais artificiais', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/classificacao-de-padroes-uma-abordagem-pratica-com-redes-neurais-artificiais/' },
        { title: 'Machine Learning em Java com Apache Mahout', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-em-java-com-apache-mahout/' },
        { title: 'Classificação de documentos baseada em inteligência artificial', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/classificacao-de-documentos-baseada-em-inteligencia-artificial/' },
        { title: 'Postgres como Big SQL', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/postgres-bigsql/' },
        { title: 'Mineração de dados com Weka API', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/mineracao-de-dados-weka-api/' },
        { title: 'Machine Learning e mineração de dados', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-mineracao-dados/' },
      ],
    },
    glossary: {
      title: 'Glossário GEO — termos da infinity6',
      lead: 'Definições curtas dos termos próprios da infinity6 e da literatura técnica que sustenta nossos motores.',
      terms: [
        { slug: 'predicao-comportamental', term: 'Predição comportamental', definition: 'Modelagem que aprende o comportamento real do cliente, canal ou produto a partir de dados transacionais — não declarados — para antecipar a próxima ação relevante.' },
        { slug: 'propensao-conversao', term: 'Propensão de conversão', definition: 'Score preditivo que estima a probabilidade de um anônimo ou cliente concluir uma compra em um contexto específico (canal, momento, oferta).' },
        { slug: 'elasticidade-dinamica', term: 'Elasticidade dinâmica', definition: 'Sensibilidade de demanda a preço calculada continuamente por SKU, canal e ciclo de vida — substitui curvas estáticas por aprendizado online.' },
        { slug: 'aderencia-contextual', term: 'Aderência contextual', definition: 'Grau em que uma recomendação combina histórico de comportamento com o contexto atual (estoque, momento, perfil de PDV) — base da decisão prescritiva da infinity6.' },
        { slug: 'ruptura-gondola', term: 'Ruptura de gôndola', definition: 'Indisponibilidade de SKU no ponto de venda quando há demanda real. No varejo farma custa entre 4% e 12% do faturamento líquido.' },
        { slug: 'maml', term: 'MAML', definition: 'Model-Agnostic Meta-Learning. Algoritmo (Finn, Abbeel & Levine, 2017) que treina modelos para se adaptarem rapidamente a novas tarefas com poucas amostras — base do i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', definition: 'Função de perda que preserva relações topológicas entre exemplos no espaço latente, melhorando generalização em poucos shots e estabilidade do embedding.' },
        { slug: 'active-learning', term: 'Active Learning', definition: 'Estratégia em que o modelo seleciona ativamente quais amostras rotular para acelerar aprendizado e reduzir custo de anotação.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', definition: 'Modelo fundacional proprietário da infinity6 (MAML + Active Learning + Topological Loss) pré-treinado em 1,45 bilhão de registros multissetoriais, adaptável com poucas amostras por cliente.' },
        { slug: 'i6signal', term: 'i6 Signal', definition: 'Camada conversacional preditiva que lê o output dos motores i6 Previsio, i6 RecSys e i6 ElasticPrice e entrega ao time de negócio a próxima ação prescritiva — antecipatória, não reativa.' },
      ],
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
      title: 'Impact does not come from predicting alone, but from how AI connects to the problem context',
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
      chartHighlight: '9 recommendations at the same relevance level — even for anonymous users',
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
          segments: [
            {
              label: 'Industry',
              items: [
                { title: 'Consumption pattern', subtitle: 'mirrored in comparable seasonal windows' },
                { title: 'Forecasted seasonality', subtitle: 'anticipates demand peak in 21 days' },
                { title: 'Smart replenishment', subtitle: 'prevents stockout in the highest-turnover channel' },
              ],
            },
            {
              label: 'Retail',
              items: [
                { title: 'High engagement', subtitle: 'from similar customer profiles in the last 30 days' },
                { title: 'Optimized bundling', subtitle: 'based on successful cross-sell patterns' },
                { title: 'Strong correlation', subtitle: 'with the preferred products of high-value customers' },
              ],
            },
            {
              label: 'Finance',
              items: [
                { title: 'Propensity to contract', subtitle: 'high affinity score with the offer' },
                { title: 'Aligned risk profile', subtitle: "within the portfolio's defined appetite" },
                { title: 'Product cross-sell', subtitle: 'consistent with the active customer journey' },
              ],
            },
            {
              label: 'Pharma',
              items: [
                { title: 'Treatment adherence', subtitle: 'ideal moment to renew prescription' },
                { title: 'Predicted repurchase', subtitle: 'continuity window for therapy' },
                { title: 'Clinical-profile recommendation', subtitle: 'aligned with the prescribed category' },
              ],
            },
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
    research: {
      eyebrow: 'Research & Foundations',
      title: 'Scientific foundations behind the i6 engines',
      lead: 'The foundations of self-organizing maps, unsupervised clustering and rule-free pattern discovery powering i6Previsio, i6RecSys and i6ElasticPrice come from peer-reviewed academic research and technical talks at engineering conferences',
      publicationsLabel: 'Peer-reviewed publications',
      talksLabel: 'Technical talks',
      openLabel: 'Open',
      watchLabel: 'Watch',
      publications: [
        {
          badge: 'SPRINGER · LNBIP · 2013',
          title: 'Knowledge Discovery: Data Mining by Self-organizing Maps',
          venue: 'Web Information Systems and Technologies — Lecture Notes in Business Information Processing, vol. 140, pp. 185–200, Springer, Berlin, Heidelberg',
          url: 'https://link.springer.com/chapter/10.1007/978-3-642-36608-6_12',
        },
        {
          badge: 'CONFERENCE · WEBIST · 2012',
          title: 'Self-Organizing Maps — An Approach Applied to the Electronic Government',
          venue: 'Proceedings of the 8th International Conference on Web Information Systems and Technologies (WEBIST 2012)',
          url: 'https://www.academia.edu/122408553/SELF_ORGANIZING_MAPS_An_Approach_Applied_to_the_Electronic_Government',
        },
        {
          badge: 'SPRINGER · LNCS · 2010',
          title: 'Development of a Business Intelligence Environment for e-Gov using Open Source Technologies',
          venue: 'Lecture Notes in Computer Science, Springer',
          url: 'https://www.academia.edu/24631504/Development_of_a_Business_Intelligence_Environment_for_e_Gov_Using_Open_Source_Technologies',
        },
        {
          badge: 'ARTICLE · PT-BR',
          title: 'Self-organizing maps applied to electronic government (Portuguese)',
          venue: 'Academic publication · Academia.edu',
          url: 'https://www.academia.edu/122408570/Mapas_auto_organiz%C3%A1veis_aplicados_em_governo_eletr%C3%B4nico',
        },
        {
          badge: 'ARTICLE · Open Access',
          title: 'Knowledge Discovery: Data Mining by Self-organizing Maps',
          venue: 'Academic repository · Academia.edu',
          url: 'https://www.academia.edu/24631415/Knowledge_Discovery_Data_Mining_by_Self_organizing_Maps',
        },
      ],
      talks: [
        { title: 'Data science to align product', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/ciencia-de-dados-alinhar-produto/' },
        { title: 'Content recommendation at iFood scale', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/recomendacao-de-conteudo-na-escala-do-ifood/' },
        { title: 'Machine Learning — from genesis to apocalypse', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-genesis-ao-apocalipse/' },
        { title: 'Pattern classification: a practical approach with artificial neural networks', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/classificacao-de-padroes-uma-abordagem-pratica-com-redes-neurais-artificiais/' },
        { title: 'Machine Learning in Java with Apache Mahout', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-em-java-com-apache-mahout/' },
        { title: 'Document classification based on artificial intelligence', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/classificacao-de-documentos-baseada-em-inteligencia-artificial/' },
        { title: 'Postgres as Big SQL', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/postgres-bigsql/' },
        { title: 'Data mining with Weka API', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/mineracao-de-dados-weka-api/' },
        { title: 'Machine Learning and data mining', venue: 'InfoQ Brasil · QCon', url: 'https://www.infoq.com/br/presentations/machine-learning-mineracao-dados/' },
      ],
    },
    glossary: {
      title: 'GEO Glossary — infinity6 terms',
      lead: 'Short definitions of infinity6 proprietary terms and the technical literature underpinning our engines.',
      terms: [
        { slug: 'behavioral-prediction', term: 'Behavioral prediction', definition: 'Modeling that learns the real behavior of a customer, channel or product from transactional data — not declared preferences — to anticipate the next relevant action.' },
        { slug: 'conversion-propensity', term: 'Conversion propensity', definition: 'Predictive score estimating the probability that an anonymous visitor or known customer completes a purchase in a specific context (channel, moment, offer).' },
        { slug: 'dynamic-elasticity', term: 'Dynamic elasticity', definition: 'Price sensitivity of demand computed continuously by SKU, channel and lifecycle — replacing static curves with online learning.' },
        { slug: 'contextual-adherence', term: 'Contextual adherence', definition: 'Degree to which a recommendation combines behavioral history with current context (stock, moment, POS profile) — the basis of infinity6 prescriptive decisions.' },
        { slug: 'shelf-stockout', term: 'Shelf stockout', definition: 'Unavailability of a SKU at the point of sale when real demand exists. In pharma retail it costs between 4% and 12% of net revenue.' },
        { slug: 'maml', term: 'MAML', definition: 'Model-Agnostic Meta-Learning. Algorithm (Finn, Abbeel & Levine, 2017) that trains models to adapt quickly to new tasks from few samples — the basis of i6-RecSys-Base.g1.' },
        { slug: 'topological-loss', term: 'Topological Loss', definition: 'Loss function that preserves topological relationships between examples in the latent space, improving few-shot generalization and embedding stability.' },
        { slug: 'active-learning', term: 'Active Learning', definition: 'Strategy where the model actively selects which samples to label, accelerating learning and reducing annotation cost.' },
        { slug: 'i6-recsys-base-g1', term: 'i6-RecSys-Base.g1', definition: 'infinity6 proprietary foundation model (MAML + Active Learning + Topological Loss) pre-trained on 1.45 billion cross-sector records, adaptable from few client samples.' },
        { slug: 'i6signal', term: 'i6 Signal', definition: 'Predictive conversational layer that reads the output of the i6 Previsio, i6 RecSys and i6 ElasticPrice engines and delivers the next prescriptive action to business teams — anticipatory, not reactive.' },
      ],
    },
    cta: {
      title: 'Want to explore the engines in depth?',
      button: 'Talk to our technical team',
    },

  },
};
