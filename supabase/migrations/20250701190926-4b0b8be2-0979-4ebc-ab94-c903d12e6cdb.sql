
-- Limpar dados atuais da tabela cms_solutions_cards
DELETE FROM cms_solutions_cards;

-- Inserir os cards em inglês
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  1,
  'en',
  'Smart Discovery for Anonymous Visitors',
  'B2B, B2C',
  'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.',
  ARRAY[
    'Contextual Affinity Modeling',
    'Cold-Start Personalization',
    'Anonymous Visitor Intelligence',
    'Real-time Recommendations'
  ],
  'Unlocks product discovery and boosts engagement with zero historical data.',
  'i6 RecSys',
  'from-gray-600/80 to-blue-700/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'users'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  2,
  'en',
  'Predictive Personalization for Identified Users',
  'B2B, B2C, B2B2C, D2C',
  'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.',
  ARRAY[
    'Behavioral Data Analysis',
    'Omnichannel Personalization',
    'Cross-sell and Up-sell Intelligence',
    'Profile Enrichment and Scoring'
  ],
  'Increases customer lifetime value with intelligent, behavior-based personalization.',
  'i6 RecSys',
  'from-orange-600/80 to-red-600/80',
  'bg-orange-100/60',
  'border-orange-300/60',
  'brain'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  3,
  'en',
  'Industrial Recommendation Intelligence',
  'B2B, B2B2C',
  'Align commercial targets with intelligent recommendations that optimize assortment, pricing and POS behavior, all in real time.',
  ARRAY[
    'Assortment Optimization',
    'Dynamic Pricing Integration',
    'Commercial Target Alignment',
    'POS Behavioral Forecasting'
  ],
  'Drives product relevance and sell-out, aligned with revenue and margin goals.',
  'i6 RecSys',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'building-2'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  4,
  'en',
  'Predictive Campaign Targeting',
  'B2B, B2C',
  'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.',
  ARRAY[
    'Propensity Modeling',
    'Conversion Likelihood Scoring',
    'Campaign Audience Refinement',
    'Lead Activation Strategy'
  ],
  'Maximizes ROI by targeting the right customer at the right time.',
  'i6 RecSys',
  'from-gray-600/80 to-blue-600/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'target'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  5,
  'en',
  'Smart Price Optimization',
  'B2B, B2C, B2B2C, D2C',
  'A dynamic pricing solution that adapts in real time to demand, behavior and product lifecycle. Maximize profitability without losing competitiveness.',
  ARRAY[
    'Behavior-Based Pricing',
    'Lifecycle-Aware Strategy',
    'Price Sensitivity Calibration',
    'Margin Optimization Engine'
  ],
  'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
  'i6 ElasticPrice',
  'from-orange-600/80 to-gray-600/80',
  'bg-orange-100/60',
  'border-orange-300/60',
  'dollar-sign'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  6,
  'en',
  'Adaptive Demand Forecasting',
  'B2B, B2C',
  'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality and behaviors, empowering supply chain and commercial planning.',
  ARRAY[
    'Self-Reinforcing Forecast Model',
    'Extended Projection (N+M)',
    'Seasonality and Trend Detection',
    'Inventory and Supply Chain Alignment'
  ],
  'Enhances demand planning accuracy and agility in fast-changing markets.',
  'i6 Previsio',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'trending-up'
FROM cms_pages p WHERE p.slug = 'solutions';

-- Inserir os cards em português
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  1,
  'pt',
  'Descoberta Inteligente para Visitantes Anônimos',
  'B2B, B2C',
  'Transforme tráfego anônimo em compradores engajados. Nosso engine usa sinais em tempo real e contexto para gerar recomendações de alto valor sem necessidade de histórico prévio do usuário.',
  ARRAY[
    'Modelagem de Afinidade Contextual',
    'Personalização Cold-Start',
    'Inteligência de Visitantes Anônimos',
    'Recomendações em Tempo Real'
  ],
  'Desbloqueie descoberta de produtos e aumente o engajamento com zero dados históricos.',
  'i6 RecSys',
  'from-gray-600/80 to-blue-700/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'users'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  2,
  'pt',
  'Personalização Preditiva para Usuários Identificados',
  'B2B, B2C, B2B2C, D2C',
  'Entregue experiências verdadeiramente personalizadas prevendo necessidades dos clientes baseado em comportamento individual e preferências. Aumente retenção e gere maior frequência de compra.',
  ARRAY[
    'Análise de Dados Comportamentais',
    'Personalização Omnichannel',
    'Inteligência de Cross-sell e Up-sell',
    'Enriquecimento e Pontuação de Perfil'
  ],
  'Aumenta valor de vida do cliente com personalização inteligente baseada em comportamento.',
  'i6 RecSys',
  'from-orange-600/80 to-red-600/80',
  'bg-orange-100/60',
  'border-orange-300/60',
  'brain'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  3,
  'pt',
  'Inteligência de Recomendação Industrial',
  'B2B, B2B2C',
  'Alinhe objetivos comerciais com recomendações inteligentes que otimizam sortimento, preços e comportamento de PDV, tudo em tempo real.',
  ARRAY[
    'Otimização de Sortimento',
    'Integração de Preços Dinâmicos',
    'Alinhamento de Objetivos Comerciais',
    'Previsão Comportamental de PDV'
  ],
  'Gera relevância de produtos e sell-out, alinhado com objetivos de receita e margem.',
  'i6 RecSys',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'building-2'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  4,
  'pt',
  'Segmentação Preditiva de Campanha',
  'B2B, B2C',
  'Identifique e ative apenas os usuários com maior probabilidade de conversão antes mesmo da campanha começar. Reduza CAC e aumente efetividade com segmentação precisa.',
  ARRAY[
    'Modelagem de Propensão',
    'Pontuação de Probabilidade de Conversão',
    'Refinamento de Audiência de Campanha',
    'Estratégia de Ativação de Leads'
  ],
  'Maximiza ROI segmentando o cliente certo no momento certo.',
  'i6 RecSys',
  'from-gray-600/80 to-blue-600/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'target'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  5,
  'pt',
  'Otimização Inteligente de Preços',
  'B2B, B2C, B2B2C, D2C',
  'Uma solução de precificação dinâmica que se adapta em tempo real à demanda, comportamento e ciclo de vida do produto. Maximize lucratividade sem perder competitividade.',
  ARRAY[
    'Precificação Baseada em Comportamento',
    'Estratégia Consciente de Ciclo de Vida',
    'Calibração de Sensibilidade de Preço',
    'Engine de Otimização de Margem'
  ],
  'Melhora margem, velocidade de vendas e competitividade através de precificação inteligente.',
  'i6 ElasticPrice',
  'from-orange-600/80 to-gray-600/80',
  'bg-orange-100/60',
  'border-orange-300/60',
  'dollar-sign'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  6,
  'pt',
  'Previsão Adaptativa de Demanda',
  'B2B, B2C',
  'Preveja demanda com precisão e adaptabilidade. Nossos modelos auto-ajustáveis projetam vendas futuras baseado em tendências, sazonalidade e comportamentos, capacitando planejamento de supply chain e comercial.',
  ARRAY[
    'Modelo de Previsão Auto-Reforçante',
    'Projeção Estendida (N+M)',
    'Detecção de Sazonalidade e Tendências',
    'Alinhamento de Estoque e Supply Chain'
  ],
  'Melhora precisão do planejamento de demanda e agilidade em mercados que mudam rapidamente.',
  'i6 Previsio',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'trending-up'
FROM cms_pages p WHERE p.slug = 'solutions';
