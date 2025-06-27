
-- Verificar se as tabelas existem e recriar se necessário
-- Primeiro, vamos garantir que as tabelas existem
CREATE TABLE IF NOT EXISTS public.cms_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  content_en TEXT NOT NULL,
  content_pt TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text_en TEXT,
  alt_text_pt TEXT,
  file_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Allow public read access to cms_content" ON public.cms_content;
DROP POLICY IF EXISTS "Allow all access to cms_content" ON public.cms_content;
DROP POLICY IF EXISTS "Allow public read access to cms_media" ON public.cms_media;
DROP POLICY IF EXISTS "Allow all access to cms_media" ON public.cms_media;

-- Criar políticas para permitir acesso público de leitura e escrita (para teste)
CREATE POLICY "Allow public read access to cms_content" 
  ON public.cms_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public write access to cms_content" 
  ON public.cms_content 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to cms_content" 
  ON public.cms_content 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to cms_content" 
  ON public.cms_content 
  FOR DELETE 
  USING (true);

CREATE POLICY "Allow public read access to cms_media" 
  ON public.cms_media 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public write access to cms_media" 
  ON public.cms_media 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access to cms_media" 
  ON public.cms_media 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to cms_media" 
  ON public.cms_media 
  FOR DELETE 
  USING (true);

-- Inserir conteúdo inicial se não existir
INSERT INTO public.cms_content (key, content_en, content_pt, content_type, category) 
SELECT * FROM (VALUES
  ('hero.infinite', 'Infinite', 'Infinitas', 'text', 'hero'),
  ('hero.possibilities', 'Possibilities', 'Possibilidades', 'text', 'hero'),
  ('hero.poweredByAI', 'Powered by AI', 'Potencializadas por IA', 'text', 'hero'),
  ('hero.description', 'Transform your business with cutting-edge AI solutions that deliver measurable results and drive growth.', 'Transforme seu negócio com soluções de IA de ponta que entregam resultados mensuráveis e impulsionam o crescimento.', 'text', 'hero'),
  ('hero.startJourney', 'Start Your Journey', 'Comece Sua Jornada', 'text', 'hero'),
  ('hero.watchDemo', 'Watch Demo', 'Ver Demo', 'text', 'hero'),
  ('stats.topEngine', 'Top Recommendation Engine', 'Motor de Recomendação Líder', 'text', 'stats'),
  ('stats.securityIssue', 'Security Issues', 'Problemas de Segurança', 'text', 'stats'),
  ('stats.leadtime', 'sec Lead Time', 'seg Tempo de Resposta', 'text', 'stats'),
  ('stats.explainability', 'Explainability', 'Explicabilidade', 'text', 'stats'),
  ('cta.title', 'Ready to Transform Your Business?', 'Pronto para Transformar Seu Negócio?', 'text', 'cta'),
  ('cta.description', 'Join thousands of companies already using our AI solutions to drive growth and innovation.', 'Junte-se a milhares de empresas que já usam nossas soluções de IA para impulsionar crescimento e inovação.', 'text', 'cta'),
  ('cta.button', 'Get Started Today', 'Comece Hoje', 'text', 'cta')
) AS t(key, content_en, content_pt, content_type, category)
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_content WHERE cms_content.key = t.key
);
