
-- Limpar dados atuais da tabela cms_results_cards
DELETE FROM cms_results_cards;

-- Inserir os cards em inglês
INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  1,
  'en',
  'Conversion Rate Optimization',
  'Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations',
  'trending-up',
  '#f97316'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  2,
  'en',
  'CRM Cost Reduction',
  'Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality',
  'shield',
  '#3b82f6'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  3,
  'en',
  'Average Ticket Enhancement',
  'Substantial increase in average ticket value through AI-guided cross-selling with diversity balancing',
  'shopping-cart',
  '#6366f1'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  4,
  'en',
  'Bounce Rate Optimization',
  'Significant reduction of bounce rate in digital funnels through AI-driven user experience optimization',
  'eye',
  '#ef4444'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  5,
  'en',
  'Enhanced Proposal Engagement',
  'Data-driven insights and AI-powered personalization dramatically improve proposal success rates',
  'award',
  '#ea580c'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  6,
  'en',
  'Real-Time Recommendations',
  'Predictive behavior recommendations with equal precision for logged users (with history) and anonymous users (without history)',
  'users',
  '#ec4899'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  7,
  'en',
  'Relevant Product Discovery',
  'AI-powered product complementarity discovery based on navigation behavior patterns and user preferences',
  'search',
  '#14b8a6'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  8,
  'en',
  'Dynamic Pricing Intelligence',
  'Self-reinforcing pricing model adjusting prices based on demand, where adjustments increase either demand or margin, feeding back into the system',
  'dollar-sign',
  '#22c55e'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  9,
  'en',
  'Market Demand Forecasting',
  'AI-powered forecast precision directing production plans and commercial goals, optimizing stock breaks and turnover',
  'target',
  '#a855f7'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  10,
  'en',
  'Rapid Implementation',
  '100% API-first and cloud-native AI solutions deliver measurable outcomes in weeks, not months',
  'clock',
  '#2563eb'
FROM cms_pages p WHERE p.slug = 'home';

-- Inserir os cards em português (versões traduzidas)
INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  1,
  'pt',
  'Otimização da Taxa de Conversão',
  'Algoritmos avançados de IA aumentam as taxas de conversão através de análise inteligente do comportamento do cliente e recomendações personalizadas',
  'trending-up',
  '#f97316'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  2,
  'pt',
  'Redução de Custos de CRM',
  'Operações simplificadas e processos automatizados reduzem significativamente as despesas operacionais mantendo a qualidade do serviço',
  'shield',
  '#3b82f6'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  3,
  'pt',
  'Aumento do Ticket Médio',
  'Aumento substancial no valor do ticket médio através de cross-selling guiado por IA com balanceamento de diversidade',
  'shopping-cart',
  '#6366f1'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  4,
  'pt',
  'Otimização da Taxa de Rejeição',
  'Redução significativa da taxa de rejeição em funis digitais através de otimização da experiência do usuário orientada por IA',
  'eye',
  '#ef4444'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  5,
  'pt',
  'Engajamento Aprimorado de Propostas',
  'Insights orientados por dados e personalização alimentada por IA melhoram dramaticamente as taxas de sucesso das propostas',
  'award',
  '#ea580c'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  6,
  'pt',
  'Recomendações em Tempo Real',
  'Recomendações preditivas de comportamento com precisão igual para usuários logados (com histórico) e usuários anônimos (sem histórico)',
  'users',
  '#ec4899'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  7,
  'pt',
  'Descoberta Relevante de Produtos',
  'Descoberta de complementaridade de produtos alimentada por IA baseada em padrões de comportamento de navegação e preferências do usuário',
  'search',
  '#14b8a6'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  8,
  'pt',
  'Inteligência de Precificação Dinâmica',
  'Modelo de precificação auto-reforçante ajustando preços com base na demanda, onde os ajustes aumentam demanda ou margem, realimentando o sistema',
  'dollar-sign',
  '#22c55e'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  9,
  'pt',
  'Previsão de Demanda de Mercado',
  'Precisão de previsão alimentada por IA direcionando planos de produção e metas comerciais, otimizando quebras de estoque e rotatividade',
  'target',
  '#a855f7'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color)
SELECT 
  p.id,
  10,
  'pt',
  'Implementação Rápida',
  'Soluções de IA 100% API-first e cloud-native entregam resultados mensuráveis em semanas, não meses',
  'clock',
  '#2563eb'
FROM cms_pages p WHERE p.slug = 'home';
