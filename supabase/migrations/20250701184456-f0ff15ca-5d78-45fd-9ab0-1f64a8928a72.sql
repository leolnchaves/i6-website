
-- Reverter todas as alterações e limpar dados de teste
-- Primeiro, vamos remover todos os cards de teste que foram criados

-- Remover todos os cards de resultados que foram inseridos
DELETE FROM cms_results_cards 
WHERE title IN (
  '85% Conversion Rate', '85% Taxa de Conversão',
  '40% Cost Reduction', '40% Redução de Custos', 
  '92% Customer Satisfaction', '92% Satisfação do Cliente',
  '60% Faster Processing', '60% Processamento Mais Rápido',
  '150% Revenue Growth', '150% Crescimento de Receita'
);

-- Remover todos os cards de soluções que foram inseridos
DELETE FROM cms_solutions_cards 
WHERE title IN (
  'Recommendation Engine', 'Motor de Recomendação',
  'Dynamic Pricing', 'Precificação Dinâmica',
  'Customer Analytics', 'Analytics de Cliente'
);

-- Remover todos os cards de cases de sucesso que foram inseridos
DELETE FROM cms_success_stories_cards 
WHERE company_name IN (
  'TechShop Pro', 'Fashion Forward', 'InnovateNow'
);

-- Verificar se existem outras entradas que precisam ser removidas
-- Vamos limpar qualquer card que tenha sido criado recentemente (último dia)
DELETE FROM cms_results_cards 
WHERE created_at > NOW() - INTERVAL '1 day';

DELETE FROM cms_solutions_cards 
WHERE created_at > NOW() - INTERVAL '1 day';

DELETE FROM cms_success_stories_cards 
WHERE created_at > NOW() - INTERVAL '1 day';

-- Verificar o estado atual das tabelas após limpeza
SELECT 'cms_pages' as table_name, COUNT(*) as count FROM cms_pages
UNION ALL
SELECT 'cms_results_cards' as table_name, COUNT(*) as count FROM cms_results_cards  
UNION ALL
SELECT 'cms_solutions_cards' as table_name, COUNT(*) as count FROM cms_solutions_cards
UNION ALL
SELECT 'cms_success_stories_cards' as table_name, COUNT(*) as count FROM cms_success_stories_cards
ORDER BY table_name;

-- Verificar se as páginas básicas ainda existem
SELECT id, name, slug, is_active, created_at FROM cms_pages ORDER BY created_at;
