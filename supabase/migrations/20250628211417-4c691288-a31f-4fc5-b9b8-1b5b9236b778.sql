
-- Add the missing icon column to the cms_solutions_cards table
ALTER TABLE cms_solutions_cards ADD COLUMN icon CHARACTER VARYING NOT NULL DEFAULT 'building-2';

-- Now re-insert the English records with the icon column
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  1,
  'en',
  'Smart Discovery',
  'Recommendation Systems',
  'AI-powered product discovery engine that learns from user behavior patterns and preferences to deliver highly relevant product recommendations in real-time.',
  ARRAY[
    'Real-time behavioral analysis',
    'Advanced ML algorithms',
    'Personalized user journeys',
    'Cross-platform integration'
  ],
  'Increased conversion rates and enhanced user engagement through intelligent product discovery',
  'i6 RecSys',
  'from-gray-600/80 to-blue-700/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'brain'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  2,
  'en',
  'Predictive Personalization',
  'Customer Experience',
  'Advanced personalization platform that predicts customer preferences and delivers tailored experiences across all touchpoints.',
  ARRAY[
    'Predictive analytics',
    'Dynamic content optimization',
    'Multi-channel personalization',
    'Real-time adaptation'
  ],
  'Higher customer satisfaction and loyalty through personalized experiences',
  'i6 RecSys',
  'from-orange-600/80 to-red-600/80',
  'bg-orange-100/60',
  'border-orange-300/60',
  'target'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  3,
  'en',
  'Industrial Recommendation',
  'B2B Solutions',
  'Specialized recommendation engine designed for industrial and B2B environments, optimizing complex product catalogs and procurement processes.',
  ARRAY[
    'Complex catalog management',
    'Procurement optimization',
    'Supply chain integration',
    'Enterprise-grade security'
  ],
  'Streamlined procurement processes and optimized industrial operations',
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
  'Predictive Campaign',
  'Marketing Automation',
  'AI-driven campaign optimization platform that predicts customer behavior and automates marketing strategies for maximum ROI.',
  ARRAY[
    'Campaign automation',
    'Behavioral prediction',
    'ROI optimization',
    'Multi-channel orchestration'
  ],
  'Improved marketing efficiency and higher campaign performance',
  'i6 RecSys',
  'from-gray-600/80 to-blue-600/80',
  'bg-gray-100/60',
  'border-gray-300/60',
  'trending-up'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color, icon)
SELECT 
  p.id,
  5,
  'en',
  'Smart Pricing',
  'Dynamic Pricing',
  'Intelligent pricing optimization system that dynamically adjusts prices based on market conditions, demand patterns, and competitive landscape.',
  ARRAY[
    'Dynamic price optimization',
    'Market analysis',
    'Demand forecasting',
    'Competitive intelligence'
  ],
  'Maximized revenue and profit margins through intelligent pricing strategies',
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
  'Demand Forecasting',
  'Supply Chain Optimization',
  'Advanced forecasting system that predicts market demand with high accuracy, enabling optimized inventory management and production planning.',
  ARRAY[
    'Accurate demand prediction',
    'Inventory optimization',
    'Production planning',
    'Market trend analysis'
  ],
  'Reduced inventory costs and improved supply chain efficiency',
  'i6 Previsio',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60',
  'bar-chart-3'
FROM cms_pages p WHERE p.slug = 'solutions';
