
-- Adicionar dados iniciais para o novo campo 'demoLink' na seção hero
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
    p.id,
    'hero',
    'demoLink',
    'en',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
FROM cms_pages p
WHERE p.slug = 'home'
AND NOT EXISTS (
    SELECT 1 FROM cms_page_content c 
    WHERE c.page_id = p.id 
    AND c.section_name = 'hero' 
    AND c.field_name = 'demoLink' 
    AND c.language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
    p.id,
    'hero',
    'demoLink',
    'pt',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
FROM cms_pages p
WHERE p.slug = 'home'
AND NOT EXISTS (
    SELECT 1 FROM cms_page_content c 
    WHERE c.page_id = p.id 
    AND c.section_name = 'hero' 
    AND c.field_name = 'demoLink' 
    AND c.language = 'pt'
);
