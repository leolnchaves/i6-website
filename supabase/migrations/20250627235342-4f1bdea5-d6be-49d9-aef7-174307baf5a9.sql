
-- Criar tabela para armazenar páginas
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para conteúdo das páginas com suporte a múltiplos idiomas
CREATE TABLE IF NOT EXISTS public.cms_page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  section_name VARCHAR(255) NOT NULL,
  field_name VARCHAR(255) NOT NULL,
  language VARCHAR(2) NOT NULL DEFAULT 'en',
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, section_name, field_name, language)
);

-- Criar tabela para SEO e Meta Tags
CREATE TABLE IF NOT EXISTS public.cms_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  language VARCHAR(2) NOT NULL DEFAULT 'en',
  meta_title VARCHAR(255),
  meta_description TEXT,
  slug VARCHAR(255),
  canonical_url VARCHAR(500),
  index_flag BOOLEAN DEFAULT true,
  follow_flag BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, language)
);

-- Inserir a página Home se não existir
INSERT INTO public.cms_pages (name, slug, description)
VALUES ('Home', 'home', 'Página principal do site')
ON CONFLICT (slug) DO NOTHING;

-- Habilitar RLS para as tabelas
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_seo ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS - permitir acesso para usuários autenticados
CREATE POLICY "Allow authenticated users to manage pages" ON public.cms_pages
FOR ALL USING (true);

CREATE POLICY "Allow authenticated users to manage page content" ON public.cms_page_content
FOR ALL USING (true);

CREATE POLICY "Allow authenticated users to manage SEO" ON public.cms_seo
FOR ALL USING (true);

-- Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cms_pages_updated_at BEFORE UPDATE ON public.cms_pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_page_content_updated_at BEFORE UPDATE ON public.cms_page_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_seo_updated_at BEFORE UPDATE ON public.cms_seo
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
