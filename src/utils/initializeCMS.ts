
import { supabase } from '@/integrations/supabase/client';

export const initializeCMS = async () => {
  try {
    console.log('🔧 Verificando inicialização do CMS...');
    
    // Testar a conexão com o Supabase
    const { data, error } = await supabase
      .from('cms_content')
      .select('count(*)', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão com Supabase:', error);
      return false;
    }
    
    console.log('✅ CMS conectado com sucesso. Total de registros:', data);
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar CMS:', error);
    return false;
  }
};
