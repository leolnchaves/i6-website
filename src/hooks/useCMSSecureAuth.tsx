
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import bcrypt from 'bcryptjs';

interface SecureAuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

export const useCMSSecureAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const secureLogin = async (email: string, password: string): Promise<SecureAuthResult> => {
    setIsLoading(true);
    
    try {
      logger.info('Iniciando login seguro', { email }, 'SecureAuth');

      // Buscar usuário por email
      const { data: users, error: fetchError } = await supabase
        .from('cms_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('is_active', true)
        .single();

      if (fetchError || !users) {
        logger.warn('Usuário não encontrado', { email }, 'SecureAuth');
        return { success: false, error: 'Credenciais inválidas' };
      }

      // Verificar senha com bcrypt
      const isPasswordValid = await bcrypt.compare(password, users.password_hash);
      
      if (!isPasswordValid) {
        logger.warn('Senha inválida', { email }, 'SecureAuth');
        return { success: false, error: 'Credenciais inválidas' };
      }

      // Atualizar último login
      await supabase
        .from('cms_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', users.id);

      logger.info('Login realizado com sucesso', { userId: users.id }, 'SecureAuth');
      
      return { 
        success: true, 
        user: {
          id: users.id,
          email: users.email,
          role: users.role,
          loginTime: new Date().toISOString()
        }
      };

    } catch (error) {
      logger.error('Erro no login seguro', { error }, 'SecureAuth');
      return { success: false, error: 'Erro interno do servidor' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    secureLogin,
    isLoading
  };
};
