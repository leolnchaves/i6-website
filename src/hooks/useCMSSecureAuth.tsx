
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import { PasswordSecurity } from '@/utils/passwordSecurity';
import { useInputValidation } from './useInputValidation';

interface SecureAuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

export const useCMSSecureAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { validateEmail, sanitizeInput } = useInputValidation();

  const secureLogin = async (email: string, password: string): Promise<SecureAuthResult> => {
    setIsLoading(true);
    
    try {
      // Sanitize and validate inputs
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      
      // Validate email format
      const emailValidation = validateEmail(sanitizedEmail);
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error };
      }

      // Validate password length (basic check)
      if (!password || password.length < 8 || password.length > 128) {
        return { success: false, error: 'Credenciais inválidas' };
      }

      logger.info('Iniciando autenticação segura', { email: sanitizedEmail }, 'SecureAuth');

      // Buscar usuário por email
      const { data: users, error: fetchError } = await supabase
        .from('cms_users')
        .select('*')
        .eq('email', sanitizedEmail)
        .eq('is_active', true)
        .single();

      if (fetchError || !users) {
        logger.warn('Usuário não encontrado ou inativo', { email: sanitizedEmail }, 'SecureAuth');
        // Delay para prevenir timing attacks
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: false, error: 'Credenciais inválidas' };
      }

      // Verificar senha com bcrypt de forma segura
      const isPasswordValid = await PasswordSecurity.verifyPassword(password, users.password_hash);
      
      if (!isPasswordValid) {
        logger.warn('Senha inválida', { email: sanitizedEmail, userId: users.id }, 'SecureAuth');
        // Delay para prevenir timing attacks
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: false, error: 'Credenciais inválidas' };
      }

      // Atualizar último login de forma segura
      const { error: updateError } = await supabase
        .from('cms_users')
        .update({ 
          last_login_at: new Date().toISOString(),
          login_attempts: 0 // Reset tentativas de login
        })
        .eq('id', users.id);

      if (updateError) {
        logger.error('Erro ao atualizar último login', { error: updateError, userId: users.id }, 'SecureAuth');
        // Não bloquear o login por causa disso
      }

      logger.info('Login realizado com sucesso', { userId: users.id, email: sanitizedEmail }, 'SecureAuth');
      
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
      logger.error('Erro crítico na autenticação', { error }, 'SecureAuth');
      return { success: false, error: 'Erro interno do servidor' };
    } finally {
      setIsLoading(false);
    }
  };

  const createSecureUser = async (email: string, password: string, role: 'admin' | 'editor' | 'viewer' = 'viewer'): Promise<SecureAuthResult> => {
    try {
      // Validar entrada
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      const emailValidation = validateEmail(sanitizedEmail);
      
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error };
      }

      // Validar força da senha
      const passwordValidation = PasswordSecurity.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.errors.join(', ') };
      }

      // Gerar hash seguro da senha
      const passwordHash = await PasswordSecurity.hashPassword(password);

      // Criar usuário no banco
      const { data: newUser, error: createError } = await supabase
        .from('cms_users')
        .insert({
          email: sanitizedEmail,
          password_hash: passwordHash,
          role,
          is_active: true,
          created_at: new Date().toISOString(),
          login_attempts: 0
        })
        .select()
        .single();

      if (createError || !newUser) {
        logger.error('Erro ao criar usuário', { error: createError }, 'SecureAuth');
        return { success: false, error: 'Erro ao criar usuário' };
      }

      logger.info('Usuário criado com sucesso', { userId: newUser.id, email: sanitizedEmail }, 'SecureAuth');

      return {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          loginTime: new Date().toISOString()
        }
      };

    } catch (error) {
      logger.error('Erro ao criar usuário seguro', { error }, 'SecureAuth');
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  return {
    secureLogin,
    createSecureUser,
    isLoading
  };
};
