
import { supabase } from '@/integrations/supabase/client';

export const initializeCMS = async () => {
  try {
    console.log('🔧 Verificando inicialização do CMS...');
    
    // Testar a conexão com o Supabase usando uma consulta simples
    const { data, error } = await supabase
      .from('cms_content' as any)
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão com Supabase:', error);
      // Não retornar false, deixar o sistema tentar usar dados estáticos
      console.log('🔄 Sistema funcionará com dados estáticos');
      return true;
    }
    
    console.log('✅ CMS conectado com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar CMS:', error);
    console.log('🔄 Sistema funcionará com dados estáticos');
    return true;
  }
};
