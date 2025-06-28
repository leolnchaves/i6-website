
-- Inserir conteúdo atual da Results Section em inglês
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'mainTitle',
  'en',
  'Real AI Impact'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'mainSubtitle',
  'en',
  'Driving Business Growth'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Inserir conteúdo atual da Results Section em português
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'mainTitle',
  'pt',
  'Impacto Real de IA'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'mainSubtitle',
  'pt',
  'Gerando Crescimento dos Negócios'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();
