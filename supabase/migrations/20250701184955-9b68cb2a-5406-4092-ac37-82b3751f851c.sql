
-- Primeiro, obter o page_id da página home
-- Reinserir os cards de resultados em inglês
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

-- Reinserir os cards de resultados em português
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

-- Reinserir cards de soluções em inglês
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  1,
  'en',
  'Recommendation Engine',
  'Personalized Product Discovery',
  'AI-powered recommendation system that analyzes user behavior and preferences to deliver highly relevant product suggestions.',
  ARRAY['Real-time personalization', 'Behavioral analysis', 'Cross-selling optimization', 'A/B testing integration'],
  'Increase conversion rates by up to 40% through intelligent product recommendations',
  'i6 RecSys',
  'from-blue-600/80 to-cyan-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'target'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  2,
  'en',
  'Dynamic Pricing',
  'Market-Responsive Pricing Strategy',
  'Advanced pricing optimization that automatically adjusts prices based on demand, competition, and market conditions.',
  ARRAY['Real-time price adjustments', 'Competitive analysis', 'Demand forecasting', 'Margin optimization'],
  'Boost revenue by 25% while maintaining competitive positioning',
  'i6 PricingAI',
  'from-green-600/80 to-emerald-700/80',
  'bg-green-100/60',
  'border-green-300/60',
  'trending-up'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  3,
  'en',
  'Customer Analytics',
  'Deep Customer Intelligence',
  'Comprehensive customer behavior analysis providing actionable insights for better business decisions.',
  ARRAY['Customer segmentation', 'Lifetime value prediction', 'Churn prevention', 'Engagement optimization'],
  'Reduce customer churn by 30% through predictive analytics',
  'i6 Analytics',
  'from-purple-600/80 to-indigo-700/80',
  'bg-purple-100/60',
  'border-purple-300/60',
  'users'
FROM cms_pages p WHERE p.slug = 'home';

-- Reinserir cards de soluções em português
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  1,
  'pt',
  'Motor de Recomendação',
  'Descoberta Personalizada de Produtos',
  'Sistema de recomendação alimentado por IA que analisa o comportamento e preferências do usuário para entregar sugestões de produtos altamente relevantes.',
  ARRAY['Personalização em tempo real', 'Análise comportamental', 'Otimização de cross-selling', 'Integração com testes A/B'],
  'Aumente as taxas de conversão em até 40% através de recomendações inteligentes de produtos',
  'i6 RecSys',
  'from-blue-600/80 to-cyan-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'target'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  2,
  'pt',
  'Precificação Dinâmica',
  'Estratégia de Preços Responsiva ao Mercado',
  'Otimização avançada de preços que ajusta automaticamente os preços baseado na demanda, competição e condições de mercado.',
  ARRAY['Ajustes de preço em tempo real', 'Análise competitiva', 'Previsão de demanda', 'Otimização de margem'],
  'Aumente a receita em 25% mantendo o posicionamento competitivo',
  'i6 PricingAI',
  'from-green-600/80 to-emerald-700/80',
  'bg-green-100/60',
  'border-green-300/60',
  'trending-up'
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  3,
  'pt',
  'Analytics de Cliente',
  'Inteligência Profunda do Cliente',
  'Análise abrangente do comportamento do cliente fornecendo insights acionáveis para melhores decisões de negócio.',
  ARRAY['Segmentação de clientes', 'Previsão de valor vitalício', 'Prevenção de churn', 'Otimização de engajamento'],
  'Reduza o churn de clientes em 30% através de analytics preditivos',
  'i6 Analytics',
  'from-purple-600/80 to-indigo-700/80',
  'bg-purple-100/60',
  'border-purple-300/60',
  'users'
FROM cms_pages p WHERE p.slug = 'home';

-- Reinserir cards de cases de sucesso em inglês
INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  1,
  'en',
  'TechShop Pro',
  'E-commerce',
  'Low conversion rates and poor product discovery were limiting growth potential.',
  'Implemented AI-powered recommendation engine and dynamic pricing optimization.',
  '+85%',
  'Conversion Rate',
  '+40%',
  'Average Order Value',
  '-60%',
  'Cart Abandonment',
  'The AI recommendations transformed our customer experience. Sales increased dramatically within weeks.',
  'Sarah Johnson',
  'VP of Digital Strategy',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  2,
  'en',
  'Fashion Forward',
  'Retail',
  'Inventory management issues and inability to predict customer demand accurately.',
  'Deployed predictive analytics and customer behavior analysis platform.',
  '+60%',
  'Demand Accuracy',
  '-45%',
  'Inventory Waste',
  '+35%',
  'Profit Margin',
  'Predictive analytics completely changed how we manage inventory. Results exceeded expectations.',
  'Michael Chen',
  'Operations Director',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  3,
  'en',
  'InnovateNow',
  'Technology',
  'High customer churn rates and low engagement with existing products.',
  'Implemented customer analytics platform with churn prediction and engagement optimization.',
  '-70%',
  'Customer Churn',
  '+90%',
  'User Engagement',
  '+120%',
  'Customer Lifetime Value',
  'The customer analytics platform gave us insights we never had before. Churn dropped significantly.',
  'Emily Rodriguez',
  'Chief Product Officer',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

-- Reinserir cards de cases de sucesso em português
INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  1,
  'pt',
  'TechShop Pro',
  'E-commerce',
  'Baixas taxas de conversão e descoberta de produtos ruim limitavam o potencial de crescimento.',
  'Implementamos motor de recomendação alimentado por IA e otimização de preços dinâmicos.',
  '+85%',
  'Taxa de Conversão',
  '+40%',
  'Valor Médio do Pedido',
  '-60%',
  'Abandono de Carrinho',
  'As recomendações de IA transformaram nossa experiência do cliente. As vendas aumentaram drasticamente em semanas.',
  'Sarah Johnson',
  'VP de Estratégia Digital',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  2,
  'pt',
  'Fashion Forward',
  'Varejo',
  'Problemas de gestão de estoque e incapacidade de prever a demanda do cliente com precisão.',
  'Implementamos analytics preditivos e plataforma de análise de comportamento do cliente.',
  '+60%',
  'Precisão de Demanda',
  '-45%',
  'Desperdício de Estoque',
  '+35%',
  'Margem de Lucro',
  'Analytics preditivos mudaram completamente como gerenciamos estoque. Resultados superaram expectativas.',
  'Michael Chen',
  'Diretor de Operações',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

INSERT INTO cms_success_stories_cards (
  page_id, card_order, language, company_name, industry, challenge, solution,
  metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label,
  customer_quote, customer_name, customer_title, image_url, is_active_home
)
SELECT 
  p.id,
  3,
  'pt',
  'InnovateNow',
  'Tecnologia',
  'Altas taxas de churn de clientes e baixo engajamento com produtos existentes.',
  'Implementamos plataforma de analytics de cliente com previsão de churn e otimização de engajamento.',
  '-70%',
  'Churn de Clientes',
  '+90%',
  'Engajamento do Usuário',
  '+120%',
  'Valor Vitalício do Cliente',
  'A plataforma de analytics de cliente nos deu insights que nunca tivemos antes. O churn caiu significativamente.',
  'Emily Rodriguez',
  'Chief Product Officer',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  true
FROM cms_pages p WHERE p.slug = 'home';

-- Verificar o que foi inserido
SELECT 'cms_results_cards' as table_name, COUNT(*) as count FROM cms_results_cards
UNION ALL
SELECT 'cms_solutions_cards' as table_name, COUNT(*) as count FROM cms_solutions_cards  
UNION ALL
SELECT 'cms_success_stories_cards' as table_name, COUNT(*) as count FROM cms_success_stories_cards
ORDER BY table_name;
