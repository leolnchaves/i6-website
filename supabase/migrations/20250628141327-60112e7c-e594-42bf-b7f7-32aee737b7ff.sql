
-- Inserir a nova página "Cases de Sucesso" na tabela cms_pages
INSERT INTO public.cms_pages (name, slug, description)
VALUES ('Cases de Sucesso', 'success-stories', 'Página de casos de sucesso e histórias de clientes')
ON CONFLICT (slug) DO NOTHING;
