
-- Verificar e restaurar dados da tabela cms_pages
INSERT INTO cms_pages (id, name, slug, description, is_active, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Home', 'home', 'Página inicial do site', true, now(), now()),
  (gen_random_uuid(), 'Soluções', 'solutions', 'Página de soluções', true, now(), now()),
  (gen_random_uuid(), 'Cases de Sucesso', 'success-stories', 'Página de cases de sucesso', true, now(), now()),
  (gen_random_uuid(), 'Contato', 'contact', 'Página de contato', true, now(), now())
ON CONFLICT (slug) DO NOTHING;

-- Restaurar dados da tabela cms_page_content para a página home em inglês
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'title',
  'en',
  'Infinite Possibilities'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'subtitle',
  'en',
  'Powered by AI'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'description',
  'en',
  'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'primaryButtonText',
  'en',
  'Start Your AI Journey'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'secondaryButtonText',
  'en',
  'Watch Demo'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'demoLink',
  'en',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Restaurar dados da tabela cms_page_content para a página home em português
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'title',
  'pt',
  'Infinitas Possibilidades'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'subtitle',
  'pt',
  'Impulsionado por IA'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'description',
  'pt',
  'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'primaryButtonText',
  'pt',
  'Inicie Sua Jornada de IA'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'secondaryButtonText',
  'pt',
  'Assistir Demo'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'hero',
  'demoLink',
  'pt',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
FROM cms_pages p WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Restaurar dados de SEO para a página home
INSERT INTO cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'home'),
  'en',
  'Infinite Possibilities Powered by AI - Transform Your Business',
  'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.',
  'home',
  '/',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_seo 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home')
  AND language = 'en'
);

INSERT INTO cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'home'),
  'pt',
  'Infinitas Possibilidades Impulsionado por IA - Transforme Seu Negócio',
  'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.',
  'home',
  '/',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_seo 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home')
  AND language = 'pt'
);

-- Limpar e corrigir dados da tabela cms_solutions_cards para match com a versão restaurada
DELETE FROM cms_solutions_cards;

-- Inserir os cards corretos para a página home (não solutions) conforme versão restaurada
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

-- Inserir os cards em português
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

-- Verificar o estado final das tabelas
SELECT 'cms_pages' as table_name, COUNT(*) as count FROM cms_pages
UNION ALL
SELECT 'cms_page_content' as table_name, COUNT(*) as count FROM cms_page_content
UNION ALL
SELECT 'cms_seo' as table_name, COUNT(*) as count FROM cms_seo
UNION ALL
SELECT 'cms_solutions_cards' as table_name, COUNT(*) as count FROM cms_solutions_cards
ORDER BY table_name;
