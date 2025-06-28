
-- Primeiro, vamos verificar se existe dados incorretos e corrigir
-- Vamos deletar qualquer dado existente dos cards da seção results e inserir os dados corretos

DELETE FROM cms_page_content 
WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'home') 
AND section_name = 'results_cards';

-- Inserir os dados corretos dos cards em inglês
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
    p.id,
    'results_cards',
    field,
    'en',
    content_value
FROM cms_pages p,
(VALUES 
    ('card_1_title', 'Conversion Rate'),
    ('card_1_description', 'Increase average conversion rates by up to 40% through AI-powered personalization'),
    ('card_1_icon', 'TrendingUp'),
    ('card_1_color', 'text-orange-500'),
    ('card_2_title', 'CRM Cost'),
    ('card_2_description', 'Save up to 60% on CRM costs while improving customer satisfaction'),
    ('card_2_icon', 'Shield'),
    ('card_2_color', 'text-blue-500'),
    ('card_3_title', 'Average Ticket'),
    ('card_3_description', 'Boost average order value by 35% with intelligent upselling'),
    ('card_3_icon', 'ShoppingCart'),
    ('card_3_color', 'text-indigo-500'),
    ('card_4_title', 'Bounce Rate'),
    ('card_4_description', 'Reduce website bounce rates by up to 50% with better user experience'),
    ('card_4_icon', 'Eye'),
    ('card_4_color', 'text-red-500'),
    ('card_5_title', 'Proposal Engagement'),
    ('card_5_description', 'Increase proposal acceptance rates by 45% with tailored presentations'),
    ('card_5_icon', 'Award'),
    ('card_5_color', 'text-orange-600'),
    ('card_6_title', 'Real-time Recommendations'),
    ('card_6_description', 'Deliver personalized experiences with 99.9% uptime'),
    ('card_6_icon', 'Users'),
    ('card_6_color', 'text-pink-500'),
    ('card_7_title', 'Product Discovery'),
    ('card_7_description', 'Improve product discovery by 65% with AI-powered search'),
    ('card_7_icon', 'Search'),
    ('card_7_color', 'text-teal-500'),
    ('card_8_title', 'Dynamic Pricing'),
    ('card_8_description', 'Optimize pricing strategies to increase revenue by 25%'),
    ('card_8_icon', 'DollarSign'),
    ('card_8_color', 'text-green-500'),
    ('card_9_title', 'Market Demand'),
    ('card_9_description', 'Predict market trends with 90% accuracy using advanced analytics'),
    ('card_9_icon', 'Target'),
    ('card_9_color', 'text-purple-500'),
    ('card_10_title', 'Rapid Implementation'),
    ('card_10_description', 'Deploy solutions 70% faster with our streamlined process'),
    ('card_10_icon', 'Clock'),
    ('card_10_color', 'text-blue-600')
) AS card_data(field, content_value)
WHERE p.slug = 'home';

-- Inserir os dados corretos dos cards em português (traduzidos)
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content)
SELECT 
    p.id,
    'results_cards',
    field,
    'pt',
    content_value
FROM cms_pages p,
(VALUES 
    ('card_1_title', 'Taxa de Conversão'),
    ('card_1_description', 'Aumente as taxas de conversão em até 40% através de personalização com IA'),
    ('card_1_icon', 'TrendingUp'),
    ('card_1_color', 'text-orange-500'),
    ('card_2_title', 'Custo de CRM'),
    ('card_2_description', 'Economize até 60% nos custos do CRM melhorando a satisfação do cliente'),
    ('card_2_icon', 'Shield'),
    ('card_2_color', 'text-blue-500'),
    ('card_3_title', 'Ticket Médio'),
    ('card_3_description', 'Aumente o valor médio dos pedidos em 35% com upselling inteligente'),
    ('card_3_icon', 'ShoppingCart'),
    ('card_3_color', 'text-indigo-500'),
    ('card_4_title', 'Taxa de Rejeição'),
    ('card_4_description', 'Reduza a taxa de rejeição do site em até 50% com melhor experiência do usuário'),
    ('card_4_icon', 'Eye'),
    ('card_4_color', 'text-red-500'),
    ('card_5_title', 'Engajamento de Propostas'),
    ('card_5_description', 'Aumente as taxas de aceitação de propostas em 45% com apresentações personalizadas'),
    ('card_5_icon', 'Award'),
    ('card_5_color', 'text-orange-600'),
    ('card_6_title', 'Recomendações em Tempo Real'),
    ('card_6_description', 'Entregue experiências personalizadas com 99,9% de uptime'),
    ('card_6_icon', 'Users'),
    ('card_6_color', 'text-pink-500'),
    ('card_7_title', 'Descoberta de Produtos'),
    ('card_7_description', 'Melhore a descoberta de produtos em 65% com busca com IA'),
    ('card_7_icon', 'Search'),
    ('card_7_color', 'text-teal-500'),
    ('card_8_title', 'Preços Dinâmicos'),
    ('card_8_description', 'Otimize estratégias de preços para aumentar a receita em 25%'),
    ('card_8_icon', 'DollarSign'),
    ('card_8_color', 'text-green-500'),
    ('card_9_title', 'Demanda de Mercado'),
    ('card_9_description', 'Preveja tendências de mercado com 90% de precisão usando análises avançadas'),
    ('card_9_icon', 'Target'),
    ('card_9_color', 'text-purple-500'),
    ('card_10_title', 'Implementação Rápida'),
    ('card_10_description', 'Implemente soluções 70% mais rápido com nosso processo otimizado'),
    ('card_10_icon', 'Clock'),
    ('card_10_color', 'text-blue-600')
) AS card_data(field, content_value)
WHERE p.slug = 'home';
