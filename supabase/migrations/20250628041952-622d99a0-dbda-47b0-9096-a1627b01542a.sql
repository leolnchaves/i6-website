
-- Create table for compact solutions cards
CREATE TABLE public.cms_compact_solutions_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL,
  card_order INTEGER NOT NULL,
  language CHARACTER VARYING(10) NOT NULL DEFAULT 'en',
  engine_name CHARACTER VARYING(255) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name CHARACTER VARYING(100) NOT NULL,
  background_color CHARACTER VARYING(20) DEFAULT '#1E4A94',
  background_opacity NUMERIC(3,2) DEFAULT 1.0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_compact_solutions_cards_page FOREIGN KEY (page_id) REFERENCES public.cms_pages(id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_compact_solutions_cards_page_language ON public.cms_compact_solutions_cards(page_id, language);
CREATE INDEX idx_compact_solutions_cards_order ON public.cms_compact_solutions_cards(card_order);

-- Create trigger to update updated_at column
CREATE TRIGGER trigger_update_cms_compact_solutions_cards_updated_at
    BEFORE UPDATE ON public.cms_compact_solutions_cards
    FOR EACH ROW
    EXECUTE FUNCTION public.update_cms_compact_solutions_cards_updated_at();

-- Insert initial data for home page compact solutions cards (English)
WITH home_page AS (
  SELECT id FROM cms_pages WHERE slug = 'home' LIMIT 1
),
card_data AS (
  SELECT 
    1 as card_order, 'i6 RecSys' as engine_name, 'Smart Discovery' as title, 
    'AI-powered product discovery that learns from user behavior and preferences.' as description,
    'Target' as icon_name
  UNION ALL SELECT 
    2, 'i6 RecSys', 'Predictive Personalization',
    'Personalized experiences that adapt in real-time to user interactions.',
    'Users'
  UNION ALL SELECT 
    3, 'i6 RecSys', 'Industrial Recommendation',
    'Industrial-grade recommendation systems for complex B2B scenarios.',
    'Cog'
  UNION ALL SELECT 
    4, 'i6 RecSys', 'Predictive Campaign',
    'Predictive campaign optimization for maximum engagement and conversion.',
    'TrendingUp'
  UNION ALL SELECT 
    5, 'i6 ElasticPrice', 'Smart Pricing',
    'Dynamic pricing strategies that optimize for revenue and market position.',
    'DollarSign'
  UNION ALL SELECT 
    6, 'i6 Previsio', 'Demand Forecasting',
    'Advanced demand forecasting using machine learning algorithms.',
    'BarChart3'
)
INSERT INTO public.cms_compact_solutions_cards (page_id, card_order, language, engine_name, title, description, icon_name, background_color, background_opacity)
SELECT 
  hp.id,
  cd.card_order,
  'en' as language,
  cd.engine_name,
  cd.title,
  cd.description,
  cd.icon_name,
  '#1E4A94' as background_color,
  1.0 as background_opacity
FROM home_page hp, card_data cd
WHERE NOT EXISTS (
  SELECT 1 FROM cms_compact_solutions_cards csc 
  WHERE csc.page_id = hp.id AND csc.language = 'en'
);

-- Insert Portuguese translations
WITH home_page AS (
  SELECT id FROM cms_pages WHERE slug = 'home' LIMIT 1
),
card_data_pt AS (
  SELECT 
    1 as card_order, 'i6 RecSys' as engine_name, 'Descoberta Inteligente' as title, 
    'Descoberta de produtos baseada em IA que aprende com o comportamento e preferências do usuário.' as description,
    'Target' as icon_name
  UNION ALL SELECT 
    2, 'i6 RecSys', 'Personalização Preditiva',
    'Experiências personalizadas que se adaptam em tempo real às interações do usuário.',
    'Users'
  UNION ALL SELECT 
    3, 'i6 RecSys', 'Recomendação Industrial',
    'Sistemas de recomendação de nível industrial para cenários B2B complexos.',
    'Cog'
  UNION ALL SELECT 
    4, 'i6 RecSys', 'Campanha Preditiva',
    'Otimização preditiva de campanhas para máximo engajamento e conversão.',
    'TrendingUp'
  UNION ALL SELECT 
    5, 'i6 ElasticPrice', 'Precificação Inteligente',
    'Estratégias de precificação dinâmica que otimizam receita e posição no mercado.',
    'DollarSign'
  UNION ALL SELECT 
    6, 'i6 Previsio', 'Previsão de Demanda',
    'Previsão avançada de demanda usando algoritmos de machine learning.',
    'BarChart3'
)
INSERT INTO public.cms_compact_solutions_cards (page_id, card_order, language, engine_name, title, description, icon_name, background_color, background_opacity)
SELECT 
  hp.id,
  cd.card_order,
  'pt' as language,
  cd.engine_name,
  cd.title,
  cd.description,
  cd.icon_name,
  '#1E4A94' as background_color,
  1.0 as background_opacity
FROM home_page hp, card_data_pt cd
WHERE NOT EXISTS (
  SELECT 1 FROM cms_compact_solutions_cards csc 
  WHERE csc.page_id = hp.id AND csc.language = 'pt'
);
