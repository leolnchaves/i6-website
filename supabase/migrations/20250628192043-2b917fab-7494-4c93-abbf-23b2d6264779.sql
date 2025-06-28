
-- Buscar o ID da página de contato
WITH contact_page AS (
  SELECT id FROM cms_pages WHERE slug = 'contact' LIMIT 1
)
INSERT INTO cms_faq_cards (page_id, question, answer, card_order, language, is_active)
SELECT 
  contact_page.id,
  question,
  answer,
  card_order,
  language,
  true
FROM contact_page
CROSS JOIN (
  VALUES 
    -- Português
    ('Quanto tempo leva a implementação de IA?', 'O tempo de implementação varia dependendo da complexidade do projeto. A maioria dos nossos clientes vê implantação completa de 1 a 3 meses, com resultados mensuráveis começando em apenas algumas semanas.', 1, 'pt'),
    ('Quais indústrias vocês atendem?', 'Atendemos uma ampla gama de indústrias, incluindo varejo, manufatura, finanças, saúde, farmacêutica, educação e tecnologia, sempre com uma abordagem business-first.', 2, 'pt'),
    ('Vocês fornecem suporte contínuo?', 'Sim. Oferecemos suporte 24/7, monitoramento proativo, manutenção e otimização contínua para todas nossas soluções de IA.', 3, 'pt'),
    ('Qual é o ROI típico para suas soluções de IA?', 'Nossos clientes comumente veem até 20x ROI no primeiro ano, impulsionado por maior eficiência, decisões mais inteligentes e crescimento de receita.', 4, 'pt'),
    ('Que tipo de dados preciso para começar?', 'Trabalhamos com os dados que você já tem, incluindo dados comportamentais, transacionais, CRM ou de supply. Todos os dados são 100% anonimizados e tratados com segurança. Nossos modelos são robustos a lacunas e podem entregar valor mesmo com conjuntos de dados não estruturados. O primeiro treinamento do modelo é conduzido usando uma amostra dos seus dados, sem exigir integração completa.', 5, 'pt'),
    ('Seus modelos de IA podem se integrar com nossos sistemas existentes?', 'Sim. O Compass Suite é API-first e baseado em nuvem, facilitando a conexão com ERPs, CRMs, plataformas de e-commerce e fontes de dados internas.', 6, 'pt'),
    ('Preciso de uma equipe de ciência de dados para usar suas soluções?', 'Não. Nossas soluções são projetadas para serem usadas por equipes de negócios. Cuidamos da complexidade da IA para que sua equipe possa focar em ação e resultados.', 7, 'pt'),
    ('Sua IA é explicável e compatível com regulamentações de privacidade de dados?', 'Absolutamente. Todos nossos modelos incluem camadas de explicabilidade para garantir transparência e confiança. Somos compatíveis com GDPR, LGPD e outros padrões globais de privacidade de dados.', 8, 'pt'),
    ('O que torna a Infinity6 diferente de outras empresas de IA?', 'Combinamos inteligência preditiva com ação em tempo real, possibilitando decisões inteligentes em toda a jornada - com integração rápida, resultados mensuráveis e sem carga técnica pesada. Também oferecemos uma fase de teste gratuita, provando o potencial concreto de resultados antes de qualquer custo ser incorrido.', 9, 'pt'),
    ('Vocês podem ajudar a definir nossa estratégia de IA e casos de uso?', 'Sim. Nossos especialistas apoiam você na formatação do ângulo de negócio por trás de cada iniciativa de IA. Cuidamos de todo o processo de engenharia de características — transformando dados brutos em sinais preditivos de alto impacto adaptados aos seus objetivos.', 10, 'pt'),
    -- Inglês
    ('How long does AI implementation take?', 'Implementation time varies depending on the project''s complexity. Most of our clients see full deployment within 1 to 3 months, with measurable results starting in just a few weeks.', 1, 'en'),
    ('What industries do you serve?', 'We serve a wide range of industries, including retail, manufacturing, finance, healthcare, pharma, education and technology, always with a business-first approach.', 2, 'en'),
    ('Do you provide ongoing support?', 'Yes. We offer 24/7 support, proactive monitoring, maintenance and continuous optimization for all our AI solutions.', 3, 'en'),
    ('What''s the typical ROI for your AI solutions?', 'Our clients commonly see up to 20x ROI within the first year, driven by increased efficiency, smarter decisions and revenue growth.', 4, 'en'),
    ('What kind of data do I need to get started?', 'We work with the data you already have, including behavioral, transactional, CRM or supply data. All data is 100% anonymized and handled securely. Our models are robust to gaps and can deliver value even with unstructured datasets. The first model training is conducted using a sample of your data, without requiring full integration.', 5, 'en'),
    ('Can your AI models integrate with our existing systems?', 'Yes. The Compass Suite is API-first and cloud-based, making it easy to connect with ERPs, CRMs, e-commerce platforms and internal data sources.', 6, 'en'),
    ('Do I need a data science team to use your solutions?', 'No. Our solutions are designed to be used by business teams. We take care of the AI complexity so your team can focus on action and results.', 7, 'en'),
    ('Is your AI explainable and compliant with data privacy regulations?', 'Absolutely. All our models include explainability layers to ensure transparency and trust. We are compliant with GDPR, LGPD and other global data privacy standards.', 8, 'en'),
    ('What makes Infinity6 different from other AI companies?', 'We combine predictive intelligence with real-time action, enabling smart decisions across the entire journey - with fast integration, measurable results and no heavy tech lift. We also offer a free test phase, proving the concrete potential of results before any cost is incurred.', 9, 'en'),
    ('Can you help define our AI strategy and use cases?', 'Yes. Our experts support you in shaping the business angle behind each AI initiative. We handle the entire feature engineering process — transforming raw data into high-impact predictive signals tailored to your goals.', 10, 'en')
) AS faq_data(question, answer, card_order, language);
