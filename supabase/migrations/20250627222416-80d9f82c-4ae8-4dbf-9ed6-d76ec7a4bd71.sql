
-- Adicionar campo 'page' à tabela cms_content
ALTER TABLE public.cms_content ADD COLUMN page TEXT;

-- Atualizar os dados existentes para incluir a página apropriada
UPDATE public.cms_content SET 
  page = CASE 
    WHEN category = 'hero' THEN 'home'
    WHEN category = 'stats' THEN 'home'
    WHEN category = 'cta' THEN 'component'
    WHEN category = 'header' THEN 'component'
    WHEN category = 'results' THEN 'home'
    ELSE 'component'
  END;

-- Inserir alguns exemplos de conteúdo organizados com a nova estrutura
INSERT INTO public.cms_content (key, content_en, content_pt, content_type, category, page) VALUES
-- Página Home - Seção Hero
('home.hero.title', 'AI-Powered Business Solutions', 'Soluções Empresariais com IA', 'text', 'hero', 'home'),
('home.hero.subtitle', 'Transform your operations with intelligent automation', 'Transforme suas operações com automação inteligente', 'text', 'hero', 'home'),

-- Página Solutions - Seção Hero
('solutions.hero.title', 'Our AI Solutions', 'Nossas Soluções de IA', 'text', 'hero', 'solutions'),
('solutions.hero.subtitle', 'Comprehensive AI tools for every business need', 'Ferramentas de IA abrangentes para cada necessidade empresarial', 'text', 'hero', 'solutions'),

-- Página Contact - Seção Hero
('contact.hero.title', 'Get in Touch', 'Entre em Contato', 'text', 'hero', 'contact'),
('contact.hero.subtitle', 'Ready to start your AI journey?', 'Pronto para começar sua jornada com IA?', 'text', 'hero', 'contact'),

-- Componentes comuns - Header
('component.header.logo', 'AI Solutions', 'Soluções IA', 'text', 'header', 'component'),
('component.header.tagline', 'The Future is Now', 'O Futuro é Agora', 'text', 'header', 'component'),

-- Componentes comuns - Footer
('component.footer.copyright', '© 2024 AI Solutions. All rights reserved.', '© 2024 Soluções IA. Todos os direitos reservados.', 'text', 'footer', 'component')

ON CONFLICT (key) DO NOTHING;
