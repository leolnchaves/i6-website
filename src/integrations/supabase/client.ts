
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG, validateSupabaseConfig } from '@/config/supabase'

// Validar configurações antes de criar o cliente
validateSupabaseConfig();

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
