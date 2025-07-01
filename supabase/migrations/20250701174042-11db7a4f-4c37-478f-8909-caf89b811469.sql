
-- Verificar se existem páginas na tabela cms_pages
SELECT id, name, slug, is_active FROM cms_pages ORDER BY created_at;

-- Verificar se existe a página 'home' especificamente
SELECT id, name, slug, is_active FROM cms_pages WHERE slug = 'home';

-- Se a página home existir, verificar se há cards associados
SELECT 
  p.slug as page_slug,
  COUNT(rc.id) as results_cards_count,
  COUNT(sc.id) as solutions_cards_count,
  COUNT(ssc.id) as success_stories_cards_count
FROM cms_pages p
LEFT JOIN cms_results_cards rc ON p.id = rc.page_id AND rc.is_active = true
LEFT JOIN cms_solutions_cards sc ON p.id = sc.page_id AND sc.is_active = true  
LEFT JOIN cms_success_stories_cards ssc ON p.id = ssc.page_id AND ssc.is_active = true
WHERE p.slug = 'home' AND p.is_active = true
GROUP BY p.id, p.slug;

-- Verificar todas as páginas e seus cards associados
SELECT 
  p.slug as page_slug,
  p.id as page_id,
  COUNT(rc.id) as results_cards,
  COUNT(sc.id) as solutions_cards,
  COUNT(ssc.id) as success_stories_cards
FROM cms_pages p
LEFT JOIN cms_results_cards rc ON p.id = rc.page_id AND rc.is_active = true
LEFT JOIN cms_solutions_cards sc ON p.id = sc.page_id AND sc.is_active = true
LEFT JOIN cms_success_stories_cards ssc ON p.id = ssc.page_id AND ssc.is_active = true
WHERE p.is_active = true
GROUP BY p.id, p.slug
ORDER BY p.slug;

-- Se não houver página 'home', vamos criá-la
INSERT INTO cms_pages (name, slug, description)
VALUES ('Home', 'home', 'Página principal do site')
ON CONFLICT (slug) DO NOTHING;

-- Se não houver página 'solutions', vamos criá-la também
INSERT INTO cms_pages (name, slug, description)
VALUES ('Solutions', 'solutions', 'Página de soluções')
ON CONFLICT (slug) DO NOTHING;

-- Se não houver página 'success-stories', vamos criá-la
INSERT INTO cms_pages (name, slug, description)
VALUES ('Success Stories', 'success-stories', 'Página de cases de sucesso')
ON CONFLICT (slug) DO NOTHING;
