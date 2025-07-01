
/**
 * Configuração segura do Supabase
 * Utiliza variáveis de ambiente para proteger as chaves sensíveis
 */

// Configurações do Supabase
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://lwhxacuxkwbdptyjwgds.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aHhhY3V4a3diZHB0eWp3Z2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNjAyMTUsImV4cCI6MjA2NjYzNjIxNX0.BdWVpSkdeDvXbRJ0bL8g0inAnceBHIz8e0WZeoi4sWw'
};

// Validação das configurações necessárias
export const validateSupabaseConfig = () => {
  if (!SUPABASE_CONFIG.url) {
    throw new Error('VITE_SUPABASE_URL não está definida');
  }
  
  if (!SUPABASE_CONFIG.anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY não está definida');
  }
  
  return true;
};
