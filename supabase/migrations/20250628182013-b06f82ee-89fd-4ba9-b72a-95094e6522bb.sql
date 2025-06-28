
-- Criar tabela para cards de FAQ
CREATE TABLE public.cms_faq_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  card_order INTEGER NOT NULL,
  language CHARACTER VARYING NOT NULL DEFAULT 'en',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_cms_faq_cards_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER update_cms_faq_cards_updated_at_trigger
  BEFORE UPDATE ON public.cms_faq_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_faq_cards_updated_at();

-- Inserir página Contact Us se não existir
INSERT INTO public.cms_pages (name, slug, description, is_active)
SELECT 'Contact Us', 'contact', 'Página de contato com FAQ', true
WHERE NOT EXISTS (
  SELECT 1 FROM public.cms_pages WHERE slug = 'contact'
);
