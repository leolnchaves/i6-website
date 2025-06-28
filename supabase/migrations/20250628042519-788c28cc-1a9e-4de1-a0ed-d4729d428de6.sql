
-- Update English texts for compact solutions cards
UPDATE cms_compact_solutions_cards 
SET 
  title = 'Smart Discovery for Anonymous Visitors',
  description = 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 1;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Predictive Personalization for Identified Users',
  description = 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 2;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Industrial Recommendation Intelligence',
  description = 'Align commercial targets with intelligent recommendations that optimize assortment, pricing and POS behavior, all in real time.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 3;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Predictive Campaign Targeting',
  description = 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 4;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Smart Price Optimization',
  description = 'A dynamic pricing solution that adapts in real time to demand, behavior and product lifecycle. Maximize profitability without losing competitiveness.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 5;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Adaptive Demand Forecasting',
  description = 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality and behaviors, empowering supply chain and commercial planning.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'en' 
  AND card_order = 6;

-- Update Portuguese translations
UPDATE cms_compact_solutions_cards 
SET 
  title = 'Descoberta Inteligente para Visitantes Anônimos',
  description = 'Transforme tráfego anônimo em compradores engajados. Nosso motor usa sinais em tempo real e contexto para gerar recomendações de alto valor sem precisar de histórico prévio do usuário.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 1;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Personalização Preditiva para Usuários Identificados',
  description = 'Entregue experiências verdadeiramente personalizadas prevendo necessidades do cliente baseadas em comportamento e preferências individuais. Aumente retenção e gere maior frequência de compra.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 2;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Inteligência de Recomendação Industrial',
  description = 'Alinhe metas comerciais com recomendações inteligentes que otimizam sortimento, precificação e comportamento de PDV, tudo em tempo real.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 3;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Segmentação Preditiva de Campanhas',
  description = 'Identifique e ative apenas os usuários com maior probabilidade de conversão antes mesmo da campanha começar. Reduza CAC e aumente efetividade com segmentação precisa.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 4;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Otimização Inteligente de Preços',
  description = 'Uma solução de precificação dinâmica que se adapta em tempo real à demanda, comportamento e ciclo de vida do produto. Maximize lucratividade sem perder competitividade.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 5;

UPDATE cms_compact_solutions_cards 
SET 
  title = 'Previsão Adaptativa de Demanda',
  description = 'Preveja demanda com precisão e adaptabilidade. Nossos modelos auto-ajustáveis projetam vendas futuras baseadas em tendências, sazonalidade e comportamentos, capacitando planejamento de supply chain e comercial.'
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
  AND language = 'pt' 
  AND card_order = 6;
