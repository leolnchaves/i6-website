
-- Criar tabela para conteúdo CMS com suporte a múltiplos idiomas
CREATE TABLE public.cms_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  content_en TEXT NOT NULL,
  content_pt TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para mídia do CMS
CREATE TABLE public.cms_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  alt_text_en TEXT,
  alt_text_pt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (Row Level Security) para as tabelas
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para permitir acesso público de leitura (para o site)
CREATE POLICY "Allow public read access to cms_content" 
  ON public.cms_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to cms_media" 
  ON public.cms_media 
  FOR SELECT 
  USING (true);

-- Criar políticas RLS para permitir acesso total sem autenticação (para admin)
CREATE POLICY "Allow all operations on cms_content" 
  ON public.cms_content 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all operations on cms_media" 
  ON public.cms_media 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Inserir conteúdo inicial para o site
INSERT INTO public.cms_content (key, content_en, content_pt, content_type, category) VALUES
-- Hero section
('hero.infinite', 'Infinite', 'Infinitas', 'text', 'hero'),
('hero.possibilities', 'Possibilities', 'Possibilidades', 'text', 'hero'),
('hero.poweredByAI', 'Powered by AI', 'Alimentado por IA', 'text', 'hero'),
('hero.description', 'Transform your business with our cutting-edge AI solutions. Unlock unprecedented efficiency and innovation.', 'Transforme seu negócio com nossas soluções de IA de ponta. Desbloqueie eficiência e inovação sem precedentes.', 'text', 'hero'),
('hero.startJourney', 'Start Your Journey', 'Comece Sua Jornada', 'text', 'hero'),
('hero.watchDemo', 'Watch Demo', 'Assistir Demo', 'text', 'hero'),

-- Stats section
('stats.topEngine', 'Top 1% Search Engine', 'Top 1% Motor de Busca', 'text', 'stats'),
('stats.securityIssue', 'Security Issues', 'Problemas de Segurança', 'text', 'stats'),
('stats.leadtime', 'sec Lead Time', 'seg Tempo de Resposta', 'text', 'stats'),
('stats.explainability', 'Explainability', 'Explicabilidade', 'text', 'stats'),

-- CTA section
('cta.title', 'Ready to Transform Your Business?', 'Pronto para Transformar seu Negócio?', 'text', 'cta'),
('cta.description', 'Join thousands of companies already using our AI solutions to drive growth and innovation.', 'Junte-se a milhares de empresas que já usam nossas soluções de IA para impulsionar crescimento e inovação.', 'text', 'cta'),
('cta.button', 'Get Started Today', 'Comece Hoje', 'text', 'cta');
