
-- Criar tabela para os cards da seção Solutions Grid
CREATE TABLE cms_solutions_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL,
  card_order INTEGER NOT NULL,
  language CHARACTER VARYING NOT NULL DEFAULT 'en',
  title TEXT NOT NULL,
  focus TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  outcome TEXT NOT NULL,
  engine CHARACTER VARYING NOT NULL DEFAULT 'i6 RecSys',
  gradient CHARACTER VARYING NOT NULL DEFAULT 'from-gray-600/80 to-blue-700/80',
  bg_color CHARACTER VARYING NOT NULL DEFAULT 'bg-gray-100/60',
  border_color CHARACTER VARYING NOT NULL DEFAULT 'border-gray-300/60',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, card_order, language)
);

-- Adicionar foreign key para cms_pages
ALTER TABLE cms_solutions_cards ADD CONSTRAINT fk_solutions_cards_page_id 
FOREIGN KEY (page_id) REFERENCES cms_pages(id) ON DELETE CASCADE;

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_cms_solutions_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cms_solutions_cards_updated_at
  BEFORE UPDATE ON cms_solutions_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_cms_solutions_cards_updated_at();

-- Inserir os cards em inglês com os dados exatos da página atual
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-gray-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-orange-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-blue-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-gray-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-orange-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
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
  'border-blue-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

-- Inserir os cards em português
INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  1,
  'pt',
  'Descoberta Inteligente',
  'Sistemas de Recomendação',
  'Motor de descoberta de produtos alimentado por IA que aprende com padrões de comportamento do usuário e preferências para entregar recomendações de produtos altamente relevantes em tempo real.',
  ARRAY[
    'Análise comportamental em tempo real',
    'Algoritmos avançados de ML',
    'Jornadas de usuário personalizadas',
    'Integração multiplataforma'
  ],
  'Aumento das taxas de conversão e engajamento do usuário através de descoberta inteligente de produtos',
  'i6 RecSys',
  'from-gray-600/80 to-blue-700/80',
  'bg-gray-100/60',
  'border-gray-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  2,
  'pt',
  'Personalização Preditiva',
  'Experiência do Cliente',
  'Plataforma avançada de personalização que prevê preferências do cliente e entrega experiências personalizadas em todos os pontos de contato.',
  ARRAY[
    'Análise preditiva',
    'Otimização dinâmica de conteúdo',
    'Personalização multicanal',
    'Adaptação em tempo real'
  ],
  'Maior satisfação e fidelidade do cliente através de experiências personalizadas',
  'i6 RecSys',
  'from-orange-600/80 to-red-600/80',
  'bg-orange-100/60',
  'border-orange-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  3,
  'pt',
  'Recomendação Industrial',
  'Soluções B2B',
  'Motor de recomendação especializado projetado para ambientes industriais e B2B, otimizando catálogos de produtos complexos e processos de aquisição.',
  ARRAY[
    'Gestão de catálogos complexos',
    'Otimização de aquisições',
    'Integração da cadeia de suprimentos',
    'Segurança empresarial'
  ],
  'Processos de aquisição simplificados e operações industriais otimizadas',
  'i6 RecSys',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  4,
  'pt',
  'Campanha Preditiva',
  'Automação de Marketing',
  'Plataforma de otimização de campanhas orientada por IA que prevê comportamento do cliente e automatiza estratégias de marketing para máximo ROI.',
  ARRAY[
    'Automação de campanhas',
    'Previsão comportamental',
    'Otimização de ROI',
    'Orquestração multicanal'
  ],
  'Eficiência de marketing melhorada e maior performance de campanhas',
  'i6 RecSys',
  'from-gray-600/80 to-blue-600/80',
  'bg-gray-100/60',
  'border-gray-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  5,
  'pt',
  'Precificação Inteligente',
  'Precificação Dinâmica',
  'Sistema inteligente de otimização de preços que ajusta dinamicamente os preços baseado em condições de mercado, padrões de demanda e cenário competitivo.',
  ARRAY[
    'Otimização dinâmica de preços',
    'Análise de mercado',
    'Previsão de demanda',
    'Inteligência competitiva'
  ],
  'Maximização de receita e margens de lucro através de estratégias inteligentes de precificação',
  'i6 ElasticPrice',
  'from-orange-600/80 to-gray-600/80',
  'bg-orange-100/60',
  'border-orange-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';

INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine, gradient, bg_color, border_color)
SELECT 
  p.id,
  6,
  'pt',
  'Previsão de Demanda',
  'Otimização da Cadeia de Suprimentos',
  'Sistema avançado de previsão que prediz demanda de mercado com alta precisão, permitindo gestão otimizada de estoque e planejamento de produção.',
  ARRAY[
    'Previsão precisa de demanda',
    'Otimização de estoque',
    'Planejamento de produção',
    'Análise de tendências de mercado'
  ],
  'Redução de custos de estoque e melhoria da eficiência da cadeia de suprimentos',
  'i6 Previsio',
  'from-blue-600/80 to-gray-700/80',
  'bg-blue-100/60',
  'border-blue-300/60'
FROM cms_pages p WHERE p.slug = 'solutions';
