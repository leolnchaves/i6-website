
-- Inserir campo de descrição da Results Section em inglês
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'description',
  'en',
  'No more GenAI solutions and agents that don''t deliver real results. No more focus only on software productivity. No more high technical complexity and long integration journeys.

Our unique approach combines advanced artificial intelligence with business strategy, delivering measurable impact and real transformation for your company.'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Inserir campo de descrição da Results Section em português
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
  p.id,
  'results',
  'description',
  'pt',
  'Chega de soluções GenAI e agentes que não entregam resultados reais. Chega de foco apenas na produtividade do software. Chega de alta complexidade técnica e longas jornadas de integração.

Nossa abordagem única combina inteligência artificial avançada com estratégia de negócios, entregando impacto mensurável e transformação real para sua empresa.'
FROM cms_pages p 
WHERE p.slug = 'home'
ON CONFLICT (page_id, section_name, field_name, language) 
DO UPDATE SET content = EXCLUDED.content, updated_at = now();
