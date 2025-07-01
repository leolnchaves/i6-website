
/**
 * Configuração segura do Supabase
 * Utiliza variáveis de ambiente para proteger as chaves sensíveis
 */

// Configurações do Supabase usando apenas variáveis de ambiente
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};

// Validação das configurações necessárias
export const validateSupabaseConfig = () => {
  if (!SUPABASE_CONFIG.url) {
    throw new Error('VITE_SUPABASE_URL não está definida. Configure esta variável de ambiente.');
  }
  
  if (!SUPABASE_CONFIG.anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY não está definida. Configure esta variável de ambiente.');
  }
  
  // Verificar se não são valores de exemplo
  if (SUPABASE_CONFIG.url.includes('seu-projeto') || SUPABASE_CONFIG.url === 'https://seu-projeto.supabase.co') {
    throw new Error('Por favor, substitua VITE_SUPABASE_URL pela URL real do seu projeto Supabase.');
  }
  
  if (SUPABASE_CONFIG.anonKey.includes('sua-chave') || SUPABASE_CONFIG.anonKey === 'sua-chave-anonima-aqui') {
    throw new Error('Por favor, substitua VITE_SUPABASE_ANON_KEY pela chave anônima real do seu projeto Supabase.');
  }
  
  return true;
};
