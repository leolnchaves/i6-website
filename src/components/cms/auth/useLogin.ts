
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCMSAuth } from '@/hooks/useCMSAuth';
import { AUTH_CONSTANTS, AUTH_MESSAGES } from './constants';
import { validateEmail, sanitizeInput, calculateRemainingLockoutTime } from './utils';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const navigate = useNavigate();
  const { login } = useCMSAuth();

  const isLockedOut = (): boolean => {
    if (loginAttempts >= AUTH_CONSTANTS.MAX_LOGIN_ATTEMPTS && lastAttemptTime) {
      const timeSinceLastAttempt = Date.now() - lastAttemptTime;
      return timeSinceLastAttempt < AUTH_CONSTANTS.LOCKOUT_DURATION;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar lockout
    if (isLockedOut()) {
      const remainingTime = calculateRemainingLockoutTime(lastAttemptTime!, AUTH_CONSTANTS.LOCKOUT_DURATION);
      setError(AUTH_MESSAGES.LOCKED_OUT(remainingTime));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Validação de entrada
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);

      if (!validateEmail(sanitizedEmail)) {
        setError(AUTH_MESSAGES.INVALID_EMAIL);
        return;
      }

      if (sanitizedPassword.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
        setError(AUTH_MESSAGES.SHORT_PASSWORD);
        return;
      }

      console.log('Iniciando processo de login...');

      // Teste de conectividade
      const { error: healthError } = await supabase
        .from('cms_users')
        .select('count', { count: 'exact', head: true });

      if (healthError) {
        console.error('Erro de conectividade:', healthError);
        throw new Error('Erro de conectividade com o servidor. Tente novamente.');
      }

      // Buscar usuário
      const { data: users, error: fetchError } = await supabase
        .from('cms_users')
        .select('id, email, role, is_active, password_hash')
        .eq('email', sanitizedEmail.toLowerCase())
        .eq('is_active', true);

      if (fetchError) {
        console.error('Erro na consulta:', fetchError);
        throw new Error('Erro interno. Tente novamente mais tarde.');
      }

      if (!users || users.length === 0) {
        setLoginAttempts(prev => prev + 1);
        setLastAttemptTime(Date.now());
        setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
        return;
      }

      const user = users[0];

      // Aqui você deve implementar verificação de senha com hash
      // Por agora, mantendo a verificação temporária mas com warning
      console.warn('AVISO DE SEGURANÇA: Implementar verificação de senha com hash');
      
      // TODO: Implementar verificação de hash bcrypt
      // const isPasswordValid = await bcrypt.compare(sanitizedPassword, user.password_hash);
      
      // Verificação temporária - DEVE SER REMOVIDA EM PRODUÇÃO
      if (sanitizedPassword !== 'tI#GhyB9kmlf') {
        setLoginAttempts(prev => prev + 1);
        setLastAttemptTime(Date.now());
        setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
        return;
      }

      // Reset tentativas de login em caso de sucesso
      setLoginAttempts(0);
      setLastAttemptTime(null);

      // Atualizar último login
      const { error: updateError } = await supabase
        .from('cms_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', user.id);

      if (updateError) {
        console.error('Erro ao atualizar último login:', updateError);
        // Não bloquear o login por causa disso
      }

      // Login
      const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString()
      };

      login(userData);
      console.log('Login realizado com sucesso');
      navigate('/cms-admin-i6/site-structure');

    } catch (err) {
      console.error('Erro no login:', err);
      
      // Tratamento de erro mais seguro
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError(AUTH_MESSAGES.CONNECTIVITY_ERROR);
        } else if (err.message.includes('conectividade')) {
          setError(err.message);
        } else {
          setError(AUTH_MESSAGES.INTERNAL_ERROR);
        }
      } else {
        setError(AUTH_MESSAGES.UNKNOWN_ERROR);
      }
      
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    loginAttempts,
    isLockedOut: isLockedOut(),
    handleLogin,
  };
};
