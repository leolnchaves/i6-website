
-- Criar tabela para o conteúdo do CMS
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

-- Criar tabela para imagens/media
CREATE TABLE public.cms_media (
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

-- Políticas para permitir acesso público de leitura
CREATE POLICY "Allow public read access to cms_content" 
  ON public.cms_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to cms_media" 
  ON public.cms_media 
  FOR SELECT 
  USING (true);

-- Políticas para permitir acesso completo (temporário - depois implementaremos autenticação)
CREATE POLICY "Allow all access to cms_content" 
  ON public.cms_content 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all access to cms_media" 
  ON public.cms_media 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Inserir dados iniciais do conteúdo existente
INSERT INTO public.cms_content (key, content_en, content_pt, content_type, category) VALUES
-- Hero Section
('hero.infinite', 'Infinite', 'Infinitas', 'text', 'hero'),
('hero.possibilities', 'Possibilities', 'Possibilidades', 'text', 'hero'),
('hero.poweredByAI', 'Powered by AI', 'Impulsionadas por IA', 'text', 'hero'),
('hero.description', 'Transform your business with cutting-edge artificial intelligence solutions that unlock unlimited potential and drive extraordinary results.', 'Transforme seu negócio com soluções de inteligência artificial de ponta que desbloqueiam potencial ilimitado e geram resultados extraordinários.', 'text', 'hero'),
('hero.startJourney', 'Start Your Journey', 'Iniciar Jornada', 'text', 'hero'),
('hero.watchDemo', 'Watch Demo', 'Ver Demo', 'text', 'hero'),

-- Header
('header.home', 'Home', 'Início', 'text', 'header'),
('header.solutions', 'Solutions', 'Soluções', 'text', 'header'),
('header.successStories', 'Success Stories', 'Cases de Sucesso', 'text', 'header'),
('header.contact', 'Contact Us', 'Contato', 'text', 'header'),
('header.getStarted', 'Get Started', 'Começar', 'text', 'header'),

-- Results Section  
('results.title', 'Real AI Impact That Drives Business Growth', 'Impacto Real de IA Que Gera Crescimento dos Negócios', 'text', 'results'),
('results.subtitle1', 'No more GenAI solutions and agents that don''t deliver real results. No more focus only on software productivity. No more high technical complexity and long integration journeys.', 'Chega de soluções GenAI e agentes que não entregam resultados reais. Chega de focar apenas na produtividade de software. Chega de alta complexidade técnica e longas jornadas de integração.', 'text', 'results'),
('results.subtitle2', 'Our unique approach combines advanced artificial intelligence with business strategy, delivering measurable impact and real transformation for your company.', 'Nossa abordagem única combina inteligência artificial avançada com estratégia de negócios, entregando impacto mensurável e transformação real para sua empresa.', 'text', 'results');

-- Criar bucket para media
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true);

-- Políticas para o bucket de media
CREATE POLICY "Allow public read access to cms-media bucket" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'cms-media');

CREATE POLICY "Allow all access to cms-media bucket" 
  ON storage.objects 
  FOR ALL 
  USING (bucket_id = 'cms-media')
  WITH CHECK (bucket_id = 'cms-media');
