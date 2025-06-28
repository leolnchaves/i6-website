
-- Criar tabela para os cards da seção Compact Solutions
CREATE TABLE public.cms_compact_solutions_cards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid NOT NULL,
  language character varying NOT NULL DEFAULT 'en'::character varying,
  title text NOT NULL,
  description text NOT NULL,
  engine character varying NOT NULL,
  icon_name character varying NOT NULL,
  background_color character varying DEFAULT '#1E4A94'::character varying,
  card_order integer NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.cms_compact_solutions_cards ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública dos cards ativos
CREATE POLICY "Allow public read access to active cards" 
  ON public.cms_compact_solutions_cards 
  FOR SELECT 
  USING (is_active = true);

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_cms_compact_solutions_cards_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER update_cms_compact_solutions_cards_updated_at
  BEFORE UPDATE ON public.cms_compact_solutions_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_compact_solutions_cards_updated_at();

-- Inserir os cards em inglês
INSERT INTO public.cms_compact_solutions_cards (page_id, language, title, description, engine, icon_name, card_order) VALUES
-- Buscar o page_id da página home
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Smart Discovery for Anonymous Visitors', 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.', 'i6 RecSys', 'Target', 1),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Predictive Personalization for Identified Users', 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.', 'i6 RecSys', 'Users', 2),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Industrial Recommendation Intelligence', 'Align commercial targets with intelligent recommendations that optimize assortment, pricing and POS behavior, all in real time.', 'i6 RecSys', 'Cog', 3),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Predictive Campaign Targeting', 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.', 'i6 RecSys', 'TrendingUp', 4),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Smart Price Optimization', 'A dynamic pricing solution that adapts in real time to demand, behavior and product lifecycle. Maximize profitability without losing competitiveness.', 'i6 ElasticPrice', 'DollarSign', 5),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'en', 'Adaptive Demand Forecasting', 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality and behaviors, empowering supply chain and commercial planning.', 'i6 Previsio', 'BarChart3', 6);

-- Inserir os cards em português (traduzidos)
INSERT INTO public.cms_compact_solutions_cards (page_id, language, title, description, engine, icon_name, card_order) VALUES
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Descoberta Inteligente para Visitantes Anônimos', 'Transforme tráfego anônimo em compradores engajados. Nosso motor usa sinais em tempo real e contexto para impulsionar recomendações de alto valor sem precisar de histórico do usuário.', 'i6 RecSys', 'Target', 1),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Personalização Preditiva para Usuários Identificados', 'Entregue experiências verdadeiramente personalizadas prevendo as necessidades do cliente com base no comportamento e preferências individuais. Aumente a retenção e impulsione maior frequência de compra.', 'i6 RecSys', 'Users', 2),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Inteligência de Recomendação Industrial', 'Alinhe metas comerciais com recomendações inteligentes que otimizam sortimento, preços e comportamento no PDV, tudo em tempo real.', 'i6 RecSys', 'Cog', 3),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Segmentação Preditiva de Campanhas', 'Identifique e ative apenas os usuários com maior probabilidade de conversão antes mesmo da campanha começar. Reduza CAC e aumente a eficácia com segmentação de precisão.', 'i6 RecSys', 'TrendingUp', 4),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Otimização Inteligente de Preços', 'Uma solução de precificação dinâmica que se adapta em tempo real à demanda, comportamento e ciclo de vida do produto. Maximize a lucratividade sem perder competitividade.', 'i6 ElasticPrice', 'DollarSign', 5),
((SELECT id FROM cms_pages WHERE slug = 'home'), 'pt', 'Previsão Adaptativa de Demanda', 'Preveja demanda com precisão e adaptabilidade. Nossos modelos auto-ajustáveis projetam vendas futuras baseadas em tendências, sazonalidade e comportamentos, capacitando o planejamento da cadeia de suprimentos e comercial.', 'i6 Previsio', 'BarChart3', 6);
