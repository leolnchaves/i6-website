
-- Primeiro, vamos verificar o estado atual dos dados
SELECT 
  p.slug,
  p.id as page_id,
  COUNT(rc.id) as results_cards_count,
  COUNT(sc.id) as solutions_cards_count,
  COUNT(ssc.id) as success_stories_cards_count
FROM cms_pages p
LEFT JOIN cms_results_cards rc ON p.id = rc.page_id AND rc.is_active = true
LEFT JOIN cms_solutions_cards sc ON p.id = sc.page_id AND sc.is_active = true
LEFT JOIN cms_success_stories_cards ssc ON p.id = ssc.page_id AND ssc.is_active = true
WHERE p.is_active = true
GROUP BY p.id, p.slug
ORDER BY p.slug;

-- Agora vamos fazer um UPSERT mais seguro para os cards
DO $$
DECLARE
    home_page_id UUID;
    solutions_page_id UUID;
    success_stories_page_id UUID;
BEGIN
    -- Obter IDs das páginas
    SELECT id INTO home_page_id FROM cms_pages WHERE slug = 'home';
    SELECT id INTO solutions_page_id FROM cms_pages WHERE slug = 'solutions';
    SELECT id INTO success_stories_page_id FROM cms_pages WHERE slug = 'success-stories';
    
    -- UPSERT cards de resultados em inglês (usando ON CONFLICT)
    INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color) VALUES
    (home_page_id, 1, 'en', '85% Conversion Rate', 'AI-powered recommendations increase conversion rates significantly', 'trending-up', '#f97316'),
    (home_page_id, 2, 'en', '40% Cost Reduction', 'Automated processes reduce operational costs', 'dollar-sign', '#10b981'),
    (home_page_id, 3, 'en', '92% Customer Satisfaction', 'Enhanced user experience drives satisfaction', 'award', '#8b5cf6'),
    (home_page_id, 4, 'en', '60% Faster Processing', 'AI optimization speeds up critical processes', 'clock', '#3b82f6'),
    (home_page_id, 5, 'en', '150% Revenue Growth', 'Smart analytics drive business growth', 'target', '#ef4444')
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        icon_name = EXCLUDED.icon_name,
        icon_color = EXCLUDED.icon_color,
        updated_at = now();
    
    -- UPSERT cards de resultados em português
    INSERT INTO cms_results_cards (page_id, card_order, language, title, description, icon_name, icon_color) VALUES
    (home_page_id, 1, 'pt', '85% Taxa de Conversão', 'Recomendações com IA aumentam significativamente as taxas de conversão', 'trending-up', '#f97316'),
    (home_page_id, 2, 'pt', '40% Redução de Custos', 'Processos automatizados reduzem custos operacionais', 'dollar-sign', '#10b981'),
    (home_page_id, 3, 'pt', '92% Satisfação do Cliente', 'Experiência aprimorada do usuário aumenta a satisfação', 'award', '#8b5cf6'),
    (home_page_id, 4, 'pt', '60% Processamento Mais Rápido', 'Otimização com IA acelera processos críticos', 'clock', '#3b82f6'),
    (home_page_id, 5, 'pt', '150% Crescimento de Receita', 'Analytics inteligentes impulsionam o crescimento do negócio', 'target', '#ef4444')
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        icon_name = EXCLUDED.icon_name,
        icon_color = EXCLUDED.icon_color,
        updated_at = now();
    
    -- UPSERT cards de soluções em inglês
    INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine) VALUES
    (solutions_page_id, 1, 'en', 'Recommendation Engine', 'Personalized product recommendations', 'AI-powered engine that analyzes user behavior to suggest relevant products', ARRAY['Real-time processing', 'Machine learning', 'A/B testing'], 'Increased conversion rates and customer satisfaction', 'i6 RecSys'),
    (solutions_page_id, 2, 'en', 'Dynamic Pricing', 'Intelligent price optimization', 'Advanced algorithms optimize pricing strategies in real-time', ARRAY['Market analysis', 'Competitor tracking', 'Demand forecasting'], 'Maximized revenue and market competitiveness', 'i6 RecSys'),
    (solutions_page_id, 3, 'en', 'Customer Analytics', 'Deep customer insights', 'Comprehensive analytics platform for understanding customer behavior', ARRAY['Behavioral tracking', 'Predictive modeling', 'Segmentation'], 'Better customer understanding and targeting', 'i6 RecSys')
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        title = EXCLUDED.title,
        focus = EXCLUDED.focus,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        outcome = EXCLUDED.outcome,
        updated_at = now();
    
    -- UPSERT cards de soluções em português  
    INSERT INTO cms_solutions_cards (page_id, card_order, language, title, focus, description, features, outcome, engine) VALUES
    (solutions_page_id, 1, 'pt', 'Motor de Recomendação', 'Recomendações personalizadas de produtos', 'Motor alimentado por IA que analisa comportamento do usuário para sugerir produtos relevantes', ARRAY['Processamento em tempo real', 'Aprendizado de máquina', 'Testes A/B'], 'Aumento das taxas de conversão e satisfação do cliente', 'i6 RecSys'),
    (solutions_page_id, 2, 'pt', 'Precificação Dinâmica', 'Otimização inteligente de preços', 'Algoritmos avançados otimizam estratégias de preços em tempo real', ARRAY['Análise de mercado', 'Rastreamento de concorrentes', 'Previsão de demanda'], 'Receita maximizada e competitividade no mercado', 'i6 RecSys'),
    (solutions_page_id, 3, 'pt', 'Analytics de Cliente', 'Insights profundos do cliente', 'Plataforma de analytics abrangente para entender comportamento do cliente', ARRAY['Rastreamento comportamental', 'Modelagem preditiva', 'Segmentação'], 'Melhor compreensão e direcionamento do cliente', 'i6 RecSys')
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        title = EXCLUDED.title,
        focus = EXCLUDED.focus,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        outcome = EXCLUDED.outcome,
        updated_at = now();
    
    -- UPSERT cards de cases de sucesso em inglês
    INSERT INTO cms_success_stories_cards (page_id, card_order, language, industry, company_name, challenge, solution, metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label, customer_quote, customer_name, customer_title, image_url, is_active_home) VALUES
    (home_page_id, 1, 'en', 'E-commerce', 'TechShop Pro', 'Low conversion rates and poor product discovery', 'Implemented AI-powered recommendation system', '85%', 'Conversion Rate Increase', '40%', 'Revenue Growth', '92%', 'Customer Satisfaction', 'The AI recommendations transformed our business completely.', 'John Smith', 'CEO', '/lovable-uploads/05313f6e-5f31-4189-8824-1615d0b72bfc.png', true),
    (home_page_id, 2, 'en', 'Retail', 'Fashion Forward', 'Inventory management and pricing challenges', 'Dynamic pricing and demand forecasting solution', '60%', 'Cost Reduction', '150%', 'Profit Increase', '95%', 'Accuracy', 'Outstanding results that exceeded our expectations.', 'Sarah Johnson', 'COO', '/lovable-uploads/6b931e8f-e382-4984-80d6-7fcf4ebf91d8.png', true),
    (home_page_id, 3, 'en', 'Technology', 'InnovateNow', 'Scaling customer support efficiently', 'AI-powered customer service automation', '70%', 'Response Time Reduction', '88%', 'Issue Resolution Rate', '94%', 'Customer Satisfaction', 'The automation solution revolutionized our support operations.', 'Mike Davis', 'CTO', '/lovable-uploads/8c0acc2d-915a-484e-b83e-c82c3de47aa5.png', true)
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        industry = EXCLUDED.industry,
        company_name = EXCLUDED.company_name,
        challenge = EXCLUDED.challenge,
        solution = EXCLUDED.solution,
        metric1_value = EXCLUDED.metric1_value,
        metric1_label = EXCLUDED.metric1_label,
        metric2_value = EXCLUDED.metric2_value,
        metric2_label = EXCLUDED.metric2_label,
        metric3_value = EXCLUDED.metric3_value,
        metric3_label = EXCLUDED.metric3_label,
        customer_quote = EXCLUDED.customer_quote,
        customer_name = EXCLUDED.customer_name,
        customer_title = EXCLUDED.customer_title,
        image_url = EXCLUDED.image_url,
        is_active_home = EXCLUDED.is_active_home,
        updated_at = now();
    
    -- UPSERT cards de cases de sucesso em português
    INSERT INTO cms_success_stories_cards (page_id, card_order, language, industry, company_name, challenge, solution, metric1_value, metric1_label, metric2_value, metric2_label, metric3_value, metric3_label, customer_quote, customer_name, customer_title, image_url, is_active_home) VALUES
    (home_page_id, 1, 'pt', 'E-commerce', 'TechShop Pro', 'Baixas taxas de conversão e descoberta de produtos deficiente', 'Implementação de sistema de recomendação com IA', '85%', 'Aumento Taxa Conversão', '40%', 'Crescimento Receita', '92%', 'Satisfação Cliente', 'As recomendações de IA transformaram nosso negócio completamente.', 'John Smith', 'CEO', '/lovable-uploads/05313f6e-5f31-4189-8824-1615d0b72bfc.png', true),
    (home_page_id, 2, 'pt', 'Varejo', 'Fashion Forward', 'Gestão de estoque e desafios de precificação', 'Solução de precificação dinâmica e previsão de demanda', '60%', 'Redução Custos', '150%', 'Aumento Lucro', '95%', 'Precisão', 'Resultados excepcionais que superaram nossas expectativas.', 'Sarah Johnson', 'COO', '/lovable-uploads/6b931e8f-e382-4984-80d6-7fcf4ebf91d8.png', true),
    (home_page_id, 3, 'pt', 'Tecnologia', 'InnovateNow', 'Escalar suporte ao cliente de forma eficiente', 'Automação de atendimento ao cliente com IA', '70%', 'Redução Tempo Resposta', '88%', 'Taxa Resolução', '94%', 'Satisfação Cliente', 'A solução de automação revolucionou nossas operações de suporte.', 'Mike Davis', 'CTO', '/lovable-uploads/8c0acc2d-915a-484e-b83e-c82c3de47aa5.png', true)
    ON CONFLICT (page_id, card_order, language) 
    DO UPDATE SET 
        industry = EXCLUDED.industry,
        company_name = EXCLUDED.company_name,
        challenge = EXCLUDED.challenge,
        solution = EXCLUDED.solution,
        metric1_value = EXCLUDED.metric1_value,
        metric1_label = EXCLUDED.metric1_label,
        metric2_value = EXCLUDED.metric2_value,
        metric2_label = EXCLUDED.metric2_label,
        metric3_value = EXCLUDED.metric3_value,
        metric3_label = EXCLUDED.metric3_label,
        customer_quote = EXCLUDED.customer_quote,
        customer_name = EXCLUDED.customer_name,
        customer_title = EXCLUDED.customer_title,
        image_url = EXCLUDED.image_url,
        is_active_home = EXCLUDED.is_active_home,
        updated_at = now();
        
END $$;

-- Verificar o resultado final
SELECT 
  p.slug,
  COUNT(rc.id) as results_cards_count,
  COUNT(sc.id) as solutions_cards_count, 
  COUNT(ssc.id) as success_stories_cards_count
FROM cms_pages p
LEFT JOIN cms_results_cards rc ON p.id = rc.page_id AND rc.is_active = true
LEFT JOIN cms_solutions_cards sc ON p.id = sc.page_id AND sc.is_active = true
LEFT JOIN cms_success_stories_cards ssc ON p.id = ssc.page_id AND ssc.is_active = true
WHERE p.is_active = true
GROUP BY p.id, p.slug
ORDER BY p.slug;
