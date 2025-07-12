export interface StaticSolutionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  outcome: string;
  focus: string;
  engine: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
}

export const solutionsCardsData = {
  en: [
    {
      id: '1',
      title: 'Smart Discovery for Anonymous Visitors',
      description: 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.',
      icon: 'users',
      features: [
        'Contextual Affinity Modeling',
        'Cold-Start Personalization',
        'Anonymous Visitor Intelligence',
        'Real-time Recommendations'
      ],
      outcome: 'Unlocks product discovery and boosts engagement with zero historical data.',
      focus: 'Hyperpersonalization Intelligence & Growth Acceleration',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-gray-600/80 to-blue-700/80'
    },
    {
      id: '2',
      title: 'Predictive Personalization for Identified Users',
      description: 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.',
      icon: 'shopping-cart',
      features: [
        'Behavioral Data Analysis',
        'Omnichannel Personalization',
        'Cross-sell and Up-sell Intelligence',
        'Profile Enrichment and Scoring'
      ],
      outcome: 'Increases customer lifetime value with intelligent, behavior-based personalization.',
      focus: 'Hyperpersonalization Intelligence & Growth Acceleration',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-orange-600/80 to-red-600/80'
    },
    {
      id: '3',
      title: 'Industrial Recommendation Intelligence',
      description: 'Align commercial targets with intelligent recommendations that optimize assortment, pricing and POS behavior, all in real time.',
      icon: 'building-2',
      features: [
        'Assortment Optimization',
        'Dynamic Pricing Integration',
        'Commercial Target Alignment',
        'POS Behavioral Forecasting'
      ],
      outcome: 'Drives product relevance and sell-out, aligned with revenue and margin goals.',
      focus: 'Supply & Profitability Optimization',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-blue-600/80 to-gray-700/80'
    },
    {
      id: '4',
      title: 'Predictive Campaign Targeting',
      description: 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.',
      icon: 'target',
      features: [
        'Propensity Modeling',
        'Conversion Likelihood Scoring',
        'Campaign Audience Refinement',
        'Lead Activation Strategy'
      ],
      outcome: 'Maximizes ROI by targeting the right customer at the right time.',
      focus: 'Growth Acceleration',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-gray-600/80 to-blue-600/80'
    },
    {
      id: '5',
      title: 'Smart Price Optimization',
      description: 'A dynamic pricing solution that adapts in real time to demand, behavior and product lifecycle. Maximize profitability without losing competitiveness.',
      icon: 'dollar-sign',
      features: [
        'Behavior-Based Pricing',
        'Lifecycle-Aware Strategy',
        'Price Sensitivity Calibration',
        'Margin Optimization Engine'
      ],
      outcome: 'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
      focus: 'Supply & Profitability Optimization',
      engine: 'i6 ElasticPrice',
      bgColor: 'bg-orange-100/60',
      borderColor: 'border-orange-300/60',
      gradient: 'from-orange-600/80 to-gray-600/80'
    },
    {
      id: '6',
      title: 'Adaptive Demand Forecasting',
      description: 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality and behaviors, empowering supply chain and commercial planning.',
      icon: 'bar-chart-3',
      features: [
        'Self-Reinforcing Forecast Model',
        'Extended Projection (N+M)',
        'Seasonality and Trend Detection',
        'Inventory and Supply Chain Alignment'
      ],
      outcome: 'Enhances demand planning accuracy and agility in fast-changing markets.',
      focus: 'Supply & Profitability Optimization',
      engine: 'i6 Previsio',
      bgColor: 'bg-gray-100/60',
      borderColor: 'border-gray-300/60',
      gradient: 'from-blue-600/80 to-gray-700/80'
    }
  ],
  pt: [
    {
      id: '1',
      title: 'Descoberta Inteligente para Visitantes Anônimos',
      description: 'Transforme tráfego anônimo em compradores engajados. Nosso engine usa sinais em tempo real e contexto para gerar recomendações de alto valor sem necessidade de histórico prévio do usuário.',
      icon: 'users',
      features: [
        'Modelagem de Afinidade Contextual',
        'Personalização Cold-Start',
        'Inteligência de Visitantes Anônimos',
        'Recomendações em Tempo Real'
      ],
      outcome: 'Desbloqueie descoberta de produtos e aumente o engajamento com zero dados históricos.',
      focus: 'B2B, B2C',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-gray-600/80 to-blue-700/80'
    },
    {
      id: '2',
      title: 'Personalização Preditiva para Usuários Identificados',
      description: 'Entregue experiências verdadeiramente personalizadas prevendo necessidades dos clientes baseado em comportamento individual e preferências. Aumente retenção e gere maior frequência de compra.',
      icon: 'shopping-cart',
      features: [
        'Análise de Dados Comportamentais',
        'Personalização Omnichannel',
        'Inteligência de Cross-sell e Up-sell',
        'Enriquecimento e Pontuação de Perfil'
      ],
      outcome: 'Aumenta valor de vida do cliente com personalização inteligente baseada em comportamento.',
      focus: 'B2B, B2C, B2B2C, D2C',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-orange-600/80 to-red-600/80'
    },
    {
      id: '3',
      title: 'Inteligência de Recomendação Industrial',
      description: 'Alinhe objetivos comerciais com recomendações inteligentes que otimizam sortimento, preços e comportamento de PDV, tudo em tempo real.',
      icon: 'building-2',
      features: [
        'Otimização de Sortimento',
        'Integração de Preços Dinâmicos',
        'Alinhamento de Objetivos Comerciais',
        'Previsão Comportamental de PDV'
      ],
      outcome: 'Gera relevância de produtos e sell-out, alinhado com objetivos de receita e margem.',
      focus: 'B2B, B2B2C',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-blue-600/80 to-gray-700/80'
    },
    {
      id: '4',
      title: 'Segmentação Preditiva de Campanha',
      description: 'Identifique e ative apenas os usuários com maior probabilidade de conversão antes mesmo da campanha começar. Reduza CAC e aumente efetividade com segmentação precisa.',
      icon: 'target',
      features: [
        'Modelagem de Propensão',
        'Pontuação de Probabilidade de Conversão',
        'Refinamento de Audiência de Campanha',
        'Estratégia de Ativação de Leads'
      ],
      outcome: 'Maximiza ROI segmentando o cliente certo no momento certo.',
      focus: 'B2B, B2C',
      engine: 'i6 RecSys',
      bgColor: 'bg-blue-100/60',
      borderColor: 'border-blue-300/60',
      gradient: 'from-gray-600/80 to-blue-600/80'
    },
    {
      id: '5',
      title: 'Otimização Inteligente de Preços',
      description: 'Uma solução de precificação dinâmica que se adapta em tempo real à demanda, comportamento e ciclo de vida do produto. Maximize lucratividade sem perder competitividade.',
      icon: 'dollar-sign',
      features: [
        'Precificação Baseada em Comportamento',
        'Estratégia Consciente de Ciclo de Vida',
        'Calibração de Sensibilidade de Preço',
        'Engine de Otimização de Margem'
      ],
      outcome: 'Melhora margem, velocidade de vendas e competitividade através de precificação inteligente.',
      focus: 'B2B, B2C, B2B2C, D2C',
      engine: 'i6 ElasticPrice',
      bgColor: 'bg-orange-100/60',
      borderColor: 'border-orange-300/60',
      gradient: 'from-orange-600/80 to-gray-600/80'
    },
    {
      id: '6',
      title: 'Previsão Adaptativa de Demanda',
      description: 'Preveja demanda com precisão e adaptabilidade. Nossos modelos auto-ajustáveis projetam vendas futuras baseado em tendências, sazonalidade e comportamentos, capacitando planejamento de supply chain e comercial.',
      icon: 'bar-chart-3',
      features: [
        'Modelo de Previsão Auto-Reforçante',
        'Projeção Estendida (N+M)',
        'Detecção de Sazonalidade e Tendências',
        'Alinhamento de Estoque e Supply Chain'
      ],
      outcome: 'Melhora precisão do planejamento de demanda e agilidade em mercados que mudam rapidamente.',
      focus: 'B2B, B2C',
      engine: 'i6 Previsio',
      bgColor: 'bg-gray-100/60',
      borderColor: 'border-gray-300/60',
      gradient: 'from-blue-600/80 to-gray-700/80'
    }
  ]
};