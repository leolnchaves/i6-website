
-- Criar enum para idiomas suportados
CREATE TYPE public.supported_language AS ENUM ('en', 'pt');

-- Criar tabela para gerenciar páginas/seções do site
CREATE TABLE public.cms_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para conteúdo das páginas (com suporte a múltiplos idiomas)
CREATE TABLE public.cms_page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE CASCADE NOT NULL,
  section VARCHAR(100) NOT NULL, -- ex: 'hero', 'about', 'features'
  field_key VARCHAR(100) NOT NULL, -- ex: 'title', 'subtitle', 'description'
  language public.supported_language NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, section, field_key, language)
);

-- Criar tabela para metadados SEO (por página e idioma)
CREATE TABLE public.cms_seo_meta (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE CASCADE NOT NULL,
  language public.supported_language NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  slug VARCHAR(255),
  canonical_url VARCHAR(500),
  robots_index BOOLEAN DEFAULT true,
  robots_follow BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, language)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_seo_meta ENABLE ROW LEVEL SECURITY;

-- Políticas para cms_pages (apenas usuários autenticados podem ver e editar)
CREATE POLICY "Allow authenticated users to view pages" 
  ON public.cms_pages 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage pages" 
  ON public.cms_pages 
  FOR ALL 
  TO authenticated
  USING (true);

-- Políticas para cms_page_content
CREATE POLICY "Allow authenticated users to view page content" 
  ON public.cms_page_content 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage page content" 
  ON public.cms_page_content 
  FOR ALL 
  TO authenticated
  USING (true);

-- Políticas para cms_seo_meta
CREATE POLICY "Allow authenticated users to view SEO meta" 
  ON public.cms_seo_meta 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage SEO meta" 
  ON public.cms_seo_meta 
  FOR ALL 
  TO authenticated
  USING (true);

-- Políticas públicas para leitura (para o site funcionar sem autenticação)
CREATE POLICY "Allow public read access to active pages" 
  ON public.cms_pages 
  FOR SELECT 
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow public read access to page content" 
  ON public.cms_page_content 
  FOR SELECT 
  TO anon
  USING (EXISTS (SELECT 1 FROM public.cms_pages WHERE id = page_id AND is_active = true));

CREATE POLICY "Allow public read access to SEO meta" 
  ON public.cms_seo_meta 
  FOR SELECT 
  TO anon
  USING (EXISTS (SELECT 1 FROM public.cms_pages WHERE id = page_id AND is_active = true));

-- Inserir a página HOME inicial
INSERT INTO public.cms_pages (slug, name, description, is_active) 
VALUES ('home', 'Página Inicial', 'Página principal do site', true);

-- Inserir conteúdo inicial para a seção Hero mantendo os textos atuais do site
WITH home_page AS (SELECT id FROM public.cms_pages WHERE slug = 'home')
INSERT INTO public.cms_page_content (page_id, section, field_key, language, content)
SELECT 
  home_page.id,
  'hero',
  field_key,
  language::public.supported_language,
  content
FROM home_page,
(VALUES 
  ('infinite', 'en', 'Infinite'),
  ('infinite', 'pt', 'Infinitas'),
  ('possibilities', 'en', 'Possibilities'),
  ('possibilities', 'pt', 'Possibilidades'),
  ('poweredByAI', 'en', 'Powered by AI'),
  ('poweredByAI', 'pt', 'Impulsionadas por IA'),
  ('description', 'en', 'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.'),
  ('description', 'pt', 'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.'),
  ('startJourney', 'en', 'Start Your Journey'),
  ('startJourney', 'pt', 'Iniciar Jornada'),
  ('watchDemo', 'en', 'Watch Demo'),
  ('watchDemo', 'pt', 'Ver Demo')
) AS initial_content(field_key, language, content);

-- Inserir metadados SEO iniciais mantendo os textos atuais
WITH home_page AS (SELECT id FROM public.cms_pages WHERE slug = 'home')
INSERT INTO public.cms_seo_meta (page_id, language, meta_title, meta_description, slug, canonical_url, robots_index, robots_follow)
SELECT 
  home_page.id,
  language::public.supported_language,
  meta_title,
  meta_description,
  slug,
  canonical_url,
  robots_index,
  robots_follow
FROM home_page,
(VALUES 
  ('en', 'Infinite Possibilities - AI Solutions', 'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.', '/', 'https://infinity6.ai/', true, true),
  ('pt', 'Infinitas Possibilidades - Soluções IA', 'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.', '/', 'https://infinity6.ai/pt', true, true)
) AS initial_seo(language, meta_title, meta_description, slug, canonical_url, robots_index, robots_follow);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_cms_pages_updated_at
    BEFORE UPDATE ON public.cms_pages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_page_content_updated_at
    BEFORE UPDATE ON public.cms_page_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_seo_meta_updated_at
    BEFORE UPDATE ON public.cms_seo_meta
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
