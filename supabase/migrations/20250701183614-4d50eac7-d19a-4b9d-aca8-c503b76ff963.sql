
-- Remover apenas os dados que foram inseridos pelas migrações recentes
-- Isso preserva a estrutura das tabelas mas remove os dados de exemplo

-- Remover cards de resultados inseridos
DELETE FROM cms_results_cards 
WHERE page_id IN (
  SELECT id FROM cms_pages WHERE slug IN ('home', 'solutions', 'success-stories')
);

-- Remover cards de soluções inseridos  
DELETE FROM cms_solutions_cards 
WHERE page_id IN (
  SELECT id FROM cms_pages WHERE slug IN ('home', 'solutions', 'success-stories')
);

-- Remover cards de cases de sucesso inseridos
DELETE FROM cms_success_stories_cards 
WHERE page_id IN (
  SELECT id FROM cms_pages WHERE slug IN ('home', 'solutions', 'success-stories')
);

-- Remover as páginas criadas
DELETE FROM cms_pages WHERE slug IN ('home', 'solutions', 'success-stories');

-- Verificar o estado final
SELECT 'cms_pages' as tabela, COUNT(*) as total FROM cms_pages
UNION ALL
SELECT 'cms_results_cards' as tabela, COUNT(*) as total FROM cms_results_cards  
UNION ALL
SELECT 'cms_solutions_cards' as tabela, COUNT(*) as total FROM cms_solutions_cards
UNION ALL
SELECT 'cms_success_stories_cards' as tabela, COUNT(*) as total FROM cms_success_stories_cards;
