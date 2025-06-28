
-- Create table for testimonials
CREATE TABLE public.cms_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL,
  card_order INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  
  -- Testimonial content
  quote TEXT NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  author_title VARCHAR(255),
  company_name VARCHAR(255),
  rating INTEGER NOT NULL DEFAULT 5,
  
  -- Status and metadata
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  UNIQUE(page_id, card_order, language),
  CHECK (rating >= 1 AND rating <= 5)
);

-- Create indexes for better performance
CREATE INDEX idx_cms_testimonials_page_language ON public.cms_testimonials(page_id, language);
CREATE INDEX idx_cms_testimonials_order ON public.cms_testimonials(card_order);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_cms_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cms_testimonials_updated_at
  BEFORE UPDATE ON public.cms_testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_testimonials_updated_at();

-- Add testimonials section content fields to cms_page_content for success-stories page
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'testimonialsSection' as section_name,
  'title' as field_name,
  'en' as language,
  'What Our Clients Say' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'testimonialsSection' 
  AND c.field_name = 'title'
  AND c.language = 'en'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'testimonialsSection' as section_name,
  'subtitle' as field_name,
  'en' as language,
  'Hear directly from the leaders who''ve transformed their businesses with Infinity6.' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'testimonialsSection' 
  AND c.field_name = 'subtitle'
  AND c.language = 'en'
);

-- Add Portuguese versions
INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'testimonialsSection' as section_name,
  'title' as field_name,
  'pt' as language,
  'O Que Nossos Clientes Dizem' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'testimonialsSection' 
  AND c.field_name = 'title'
  AND c.language = 'pt'
);

INSERT INTO cms_page_content (page_id, section_name, field_name, language, content) 
SELECT 
  p.id as page_id,
  'testimonialsSection' as section_name,
  'subtitle' as field_name,
  'pt' as language,
  'Ouça diretamente dos líderes que transformaram seus negócios com a Infinity6.' as content
FROM cms_pages p 
WHERE p.slug = 'success-stories'
AND NOT EXISTS (
  SELECT 1 FROM cms_page_content c 
  WHERE c.page_id = p.id 
  AND c.section_name = 'testimonialsSection' 
  AND c.field_name = 'subtitle'
  AND c.language = 'pt'
);

-- Insert sample testimonials data for success-stories page (both languages)
INSERT INTO public.cms_testimonials (
  page_id, card_order, language, quote, author_name, author_title, company_name, rating
) 
SELECT 
  p.id as page_id,
  1 as card_order,
  'en' as language,
  'The AI implementation exceeded our expectations. ROI was achieved within 6 months.' as quote,
  'David Kim' as author_name,
  'CTO' as author_title,
  'DataTech' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  2 as card_order,
  'en' as language,
  'Incredible support team and cutting-edge technology. Highly recommended.' as quote,
  'Emma Watson' as author_name,
  'CEO' as author_title,
  'InnovateCorp' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  3 as card_order,
  'en' as language,
  'Game-changing AI solutions that transformed our entire operation.' as quote,
  'Robert Taylor' as author_name,
  'VP' as author_title,
  'FutureTech' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories';

-- Insert Portuguese versions
INSERT INTO public.cms_testimonials (
  page_id, card_order, language, quote, author_name, author_title, company_name, rating
) 
SELECT 
  p.id as page_id,
  1 as card_order,
  'pt' as language,
  'A implementação de IA superou nossas expectativas. O ROI foi alcançado em 6 meses.' as quote,
  'David Kim' as author_name,
  'CTO' as author_title,
  'DataTech' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  2 as card_order,
  'pt' as language,
  'Equipe de suporte incrível e tecnologia de ponta. Altamente recomendado.' as quote,
  'Emma Watson' as author_name,
  'CEO' as author_title,
  'InnovateCorp' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories'

UNION ALL

SELECT 
  p.id as page_id,
  3 as card_order,
  'pt' as language,
  'Soluções de IA revolucionárias que transformaram toda nossa operação.' as quote,
  'Robert Taylor' as author_name,
  'VP' as author_title,
  'FutureTech' as company_name,
  5 as rating
FROM cms_pages p WHERE p.slug = 'success-stories';
