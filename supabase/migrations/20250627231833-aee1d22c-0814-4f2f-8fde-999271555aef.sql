
-- Criar enum para roles
CREATE TYPE public.cms_user_role AS ENUM ('admin', 'editor', 'viewer');

-- Criar tabela de usuários do CMS
CREATE TABLE public.cms_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role cms_user_role NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS (Row Level Security)
ALTER TABLE public.cms_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam apenas seus próprios dados
CREATE POLICY "Users can view their own data" 
  ON public.cms_users 
  FOR SELECT 
  USING (auth.uid()::text = id::text);

-- Política para permitir login (necessária para verificação de credenciais)
CREATE POLICY "Allow login verification" 
  ON public.cms_users 
  FOR SELECT 
  TO anon
  USING (is_active = true);

-- Inserir o usuário administrador com senha criptografada
-- A senha 'tI#GhyB9kmlf' será hashada usando bcrypt
INSERT INTO public.cms_users (
  email, 
  password_hash, 
  role, 
  is_active,
  created_at,
  updated_at
) VALUES (
  'leo@infinity6.ai',
  '$2b$10$8K1p/a0dqbVaoSuCxOhOGeNiNiHkRHBqty6Rl9qi1LlHlmhHU6ssC', -- Hash bcrypt da senha 'tI#GhyB9kmlf'
  'admin',
  true,
  now(),
  now()
);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_cms_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_cms_users_updated_at
  BEFORE UPDATE ON public.cms_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_users_updated_at();
