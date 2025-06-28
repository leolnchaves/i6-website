
-- Inserir conteúdo da seção hero em inglês
INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'infinite',
  'en',
  'Infinite'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'infinite' AND language = 'en'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'possibilities',
  'en',
  'Possibilities'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'possibilities' AND language = 'en'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'poweredByAI',
  'en',
  'Powered by AI'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'poweredByAI' AND language = 'en'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'description',
  'en',
  'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'description' AND language = 'en'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'startJourney',
  'en',
  'Start Your Journey'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'startJourney' AND language = 'en'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'watchDemo',
  'en',
  'Watch Demo'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'watchDemo' AND language = 'en'
);

-- Inserir conteúdo da seção hero em português
INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'infinite',
  'pt',
  'Infinitas'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'infinite' AND language = 'pt'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'possibilities',
  'pt',
  'Possibilidades'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'possibilities' AND language = 'pt'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'poweredByAI',
  'pt',
  'Impulsionado por IA'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'poweredByAI' AND language = 'pt'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'description',
  'pt',
  'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'description' AND language = 'pt'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'startJourney',
  'pt',
  'Comece Sua Jornada'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'startJourney' AND language = 'pt'
);

INSERT INTO public.cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'hero',
  'watchDemo',
  'pt',
  'Assistir Demo'
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_page_content 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND section_name = 'hero' AND field_name = 'watchDemo' AND language = 'pt'
);
