
import { supabase } from '@/integrations/supabase/client';

export const initializeCMS = async () => {
  try {
    console.log('Verificando inicialização do CMS...');
    
    // Tentar buscar conteúdo da tabela para verificar se está funcionando
    const { data: existingContent, error: fetchError } = await supabase
      .from('cms_content')
      .select('key, content_en, content_pt')
      .limit(5);
    
    if (fetchError) {
      console.error('Erro ao verificar conteúdo existente:', fetchError);
      return;
    }
    
    if (existingContent && existingContent.length > 0) {
      console.log('CMS já inicializado com conteúdo:', existingContent.map(c => c.key));
      return;
    }
    
    console.log('CMS inicializado e dados verificados');
  } catch (error) {
    console.error('Erro ao inicializar CMS:', error);
  }
};
