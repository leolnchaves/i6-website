
-- Inserir a página Solutions se ela não existir
INSERT INTO cms_pages (name, slug, description, is_active)
SELECT 'Soluções', 'solutions', 'Página de soluções da empresa', true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_pages WHERE slug = 'solutions'
);

-- Inserir conteúdo padrão para a seção Hero da página Solutions em inglês
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'mainTitle',
  'en',
  'Transform Your Business with'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'mainTitle' AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'mainSubtitle',
  'en',
  'AI-Powered Solutions'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'mainSubtitle' AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'description',
  'en',
  'Discover our comprehensive suite of artificial intelligence solutions designed to optimize your operations, enhance decision-making, and drive sustainable growth across all sectors of your business.'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'description' AND language = 'en'
);

-- Inserir conteúdo padrão para a seção Hero da página Solutions em português
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'mainTitle',
  'pt',
  'Transforme Seu Negócio com'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'mainTitle' AND language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'mainSubtitle',
  'pt',
  'Soluções Baseadas em IA'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'mainSubtitle' AND language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'solutionsHero',
  'description',
  'pt',
  'Descubra nossa suíte abrangente de soluções de inteligência artificial projetadas para otimizar suas operações, aprimorar a tomada de decisões e impulsionar o crescimento sustentável em todos os setores do seu negócio.'
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = p.id AND section_name = 'solutionsHero' AND field_name = 'description' AND language = 'pt'
);

-- Inserir dados SEO padrão para a página Solutions
INSERT INTO cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  p.id,
  'en',
  'AI Solutions - Transform Your Business',
  'Discover our comprehensive AI solutions designed to optimize operations and drive growth.',
  'solutions',
  NULL,
  true,
  true
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_seo 
  WHERE page_id = p.id AND language = 'en'
);

INSERT INTO cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  p.id,
  'pt',
  'Soluções de IA - Transforme Seu Negócio',
  'Descubra nossas soluções de IA abrangentes projetadas para otimizar operações e impulsionar o crescimento.',
  'solucoes',
  NULL,
  true,
  true
FROM cms_pages p
WHERE p.slug = 'solutions'
AND NOT EXISTS (
  SELECT 1 FROM cms_seo 
  WHERE page_id = p.id AND language = 'pt'
);
