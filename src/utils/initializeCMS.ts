
import { supabase } from '@/integrations/supabase/client';

export const initializeCMS = async () => {
  try {
    console.log('Verificando inicialização do CMS...');
    
    // Tentar buscar qualquer conteúdo da tabela
    const { data: existingContent, error: fetchError } = await supabase
      .from('cms_content')
      .select('key')
      .limit(1);
    
    if (fetchError) {
      console.error('Erro ao verificar conteúdo existente:', fetchError);
      return;
    }
    
    if (existingContent && existingContent.length > 0) {
      console.log('CMS já inicializado com conteúdo');
      return;
    }
    
    console.log('CMS verificado - dados devem estar disponíveis na base de dados');
  } catch (error) {
    console.error('Erro ao inicializar CMS:', error);
  }
};
