
-- Inserir conteúdo do footer na tabela cms_page_content para a página de componentes
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'company_description',
  'en',
  'Transforming businesses with cutting-edge AI solutions. Unlock infinite possibilities with our innovative technology.'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'company_description' 
  AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'company_description',
  'pt',
  'Transformando negócios com soluções de IA de ponta. Desbloqueie possibilidades infinitas com nossa tecnologia inovadora.'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'company_description' 
  AND language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'contact_email',
  'en',
  'hello@infinity6.ai'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'contact_email' 
  AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'contact_email',
  'pt',
  'hello@infinity6.ai'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'contact_email' 
  AND language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'contact_phone',
  'en',
  '+1 (555) 123-4567'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'contact_phone' 
  AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'contact_phone',
  'pt',
  '+1 (555) 123-4567'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'contact_phone' 
  AND language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'copyright_text',
  'en',
  '© 2024 Infinity6.ai. All rights reserved.'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'copyright_text' 
  AND language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  (SELECT id FROM cms_pages WHERE slug = 'components'),
  'footer',
  'copyright_text',
  'pt',
  '© 2024 Infinity6.ai. Todos os direitos reservados.'
WHERE NOT EXISTS (
  SELECT 1 FROM cms_page_content 
  WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'components') 
  AND section_name = 'footer' 
  AND field_name = 'copyright_text' 
  AND language = 'pt'
);
