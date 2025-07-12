UPDATE cms_page_content 
SET content = 'Solutions crafted to solve real business challenges.  Powered by real intelligence.', 
    updated_at = now()
WHERE content = 'Built to scale. Designed to deliver. Powered by real intelligence.' 
  AND field_name = 'description' 
  AND section_name = 'solutionsHero' 
  AND language = 'en';