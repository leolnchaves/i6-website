
-- Adicionar políticas RLS para permitir operações na tabela cms_compact_solutions_cards
-- Criar política para permitir inserção de novos cards
CREATE POLICY "Allow authenticated users to insert compact solutions cards" 
  ON public.cms_compact_solutions_cards 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Criar política para permitir atualização de cards existentes
CREATE POLICY "Allow authenticated users to update compact solutions cards" 
  ON public.cms_compact_solutions_cards 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Criar política para permitir exclusão de cards
CREATE POLICY "Allow authenticated users to delete compact solutions cards" 
  ON public.cms_compact_solutions_cards 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Garantir que usuários anônimos possam ler cards ativos (já existe mas vamos garantir)
DROP POLICY IF EXISTS "Allow public read access to active cards" ON public.cms_compact_solutions_cards;
CREATE POLICY "Allow public read access to active cards" 
  ON public.cms_compact_solutions_cards 
  FOR SELECT 
  USING (is_active = true);
