
-- Add icon fields to cms_page_content table for Success Stories metrics
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'avgROIIcon' as field_name,
  'en' as language,
  'trending-up' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'avgROIIcon'
  AND c.language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'companiesServedIcon' as field_name,
  'en' as language,
  'users' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'companiesServedIcon'
  AND c.language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'costSavingsIcon' as field_name,
  'en' as language,
  'dollar-sign' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'costSavingsIcon'
  AND c.language = 'en'
);

-- Add Portuguese versions
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'avgROIIcon' as field_name,
  'pt' as language,
  'trending-up' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'avgROIIcon'
  AND c.language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'companiesServedIcon' as field_name,
  'pt' as language,
  'users' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'companiesServedIcon'
  AND c.language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'successStoriesMetrics' as section_name,
  'costSavingsIcon' as field_name,
  'pt' as language,
  'dollar-sign' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'successStoriesMetrics' 
  AND c.field_name = 'costSavingsIcon'
  AND c.language = 'pt'
);
