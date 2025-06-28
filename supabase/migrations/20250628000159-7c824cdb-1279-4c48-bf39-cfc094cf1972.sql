
-- Inserir dados de SEO para a página home em inglês
INSERT INTO public.cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'en',
  'Infinite Possibilities Powered by AI - Transform Your Business',
  'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.',
  'home',
  '/',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_seo 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND language = 'en'
);

-- Inserir dados de SEO para a página home em português
INSERT INTO public.cms_seo (page_id, language, meta_title, meta_description, slug, canonical_url, index_flag, follow_flag)
SELECT 
  (SELECT id FROM public.cms_pages WHERE slug = 'home'),
  'pt',
  'Infinitas Possibilidades Impulsionado por IA - Transforme Seu Negócio',
  'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.',
  'home',
  '/',
  true,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_seo 
  WHERE page_id = (SELECT id FROM public.cms_pages WHERE slug = 'home')
  AND language = 'pt'
);
