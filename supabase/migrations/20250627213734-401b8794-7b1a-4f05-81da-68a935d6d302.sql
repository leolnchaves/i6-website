
-- First, let's verify our tables exist and add some sample CMS content to get started
-- Insert some basic content for the website sections that are already using CMSText components

INSERT INTO public.cms_content (key, content_en, content_pt, content_type, category) VALUES
-- Hero section content
('hero.infinite', 'Infinite', 'Infinitas', 'text', 'hero'),
('hero.possibilities', 'Possibilities', 'Possibilidades', 'text', 'hero'),
('hero.poweredByAI', 'Powered by AI', 'Alimentado por IA', 'text', 'hero'),
('hero.description', 'Transform your business with our cutting-edge AI solutions. Unlock unprecedented efficiency and innovation.', 'Transforme seu negócio com nossas soluções de IA de ponta. Desbloqueie eficiência e inovação sem precedentes.', 'text', 'hero'),
('hero.startJourney', 'Start Your Journey', 'Comece Sua Jornada', 'text', 'hero'),
('hero.watchDemo', 'Watch Demo', 'Assistir Demo', 'text', 'hero'),

-- Stats section content
('stats.topEngine', 'Top 1% Search Engine', 'Top 1% Motor de Busca', 'text', 'stats'),
('stats.securityIssue', 'Security Issues', 'Problemas de Segurança', 'text', 'stats'),
('stats.leadtime', 'sec Lead Time', 'seg Tempo de Resposta', 'text', 'stats'),
('stats.explainability', 'Explainability', 'Explicabilidade', 'text', 'stats'),

-- CTA section content
('cta.title', 'Ready to Transform Your Business?', 'Pronto para Transformar seu Negócio?', 'text', 'cta'),
('cta.description', 'Join thousands of companies already using our AI solutions to drive growth and innovation.', 'Junte-se a milhares de empresas que já usam nossas soluções de IA para impulsionar crescimento e inovação.', 'text', 'cta'),
('cta.button', 'Get Started Today', 'Comece Hoje', 'text', 'cta')

ON CONFLICT (key) DO NOTHING;
