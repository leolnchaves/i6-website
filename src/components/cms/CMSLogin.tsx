
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCMSAuth } from '@/hooks/useCMSAuth';
import GradientBackground from '@/components/ui/gradient-background';

// Constantes de segurança
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutos
const MIN_PASSWORD_LENGTH = 8;

// Validação de entrada
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

const CMSLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const navigate = useNavigate();
  const { login } = useCMSAuth();

  // Verificar se o usuário está bloqueado
  const isLockedOut = (): boolean => {
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS && lastAttemptTime) {
      const timeSinceLastAttempt = Date.now() - lastAttemptTime;
      return timeSinceLastAttempt < LOCKOUT_DURATION;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar lockout
    if (isLockedOut()) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - (Date.now() - (lastAttemptTime || 0))) / 60000);
      setError(`Muitas tentativas de login. Tente novamente em ${remainingTime} minutos.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Validação de entrada
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);

      if (!validateEmail(sanitizedEmail)) {
        setError('Por favor, insira um email válido.');
        return;
      }

      if (sanitizedPassword.length < MIN_PASSWORD_LENGTH) {
        setError('A senha deve ter pelo menos 8 caracteres.');
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
        setError('Credenciais inválidas.');
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
        setError('Credenciais inválidas.');
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
          setError('Erro de conectividade. Verifique sua conexão com a internet.');
        } else if (err.message.includes('conectividade')) {
          setError(err.message);
        } else {
          setError('Erro interno. Tente novamente mais tarde.');
        }
      } else {
        setError('Erro desconhecido. Tente novamente.');
      }
      
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
            <h2 className="text-4xl font-bold mb-4">CMS Admin</h2>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/f08aa06e-bc23-4432-8793-168fae4076af.png" 
                alt="Logo" 
                className="h-12 object-contain"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 text-white">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Aviso de segurança durante desenvolvimento */}
              {process.env.NODE_ENV === 'development' && (
                <Alert className="bg-yellow-500/20 border-yellow-500/30 text-white">
                  <AlertDescription>
                    Modo de desenvolvimento: Implementar hash de senha antes da produção
                  </AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/70 rounded-full px-6"
                  required
                  maxLength={254}
                  disabled={isLoading || isLockedOut()}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 backdrop-blur-sm text-white placeholder:text-white/70 rounded-full px-6 pr-12"
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  maxLength={128}
                  disabled={isLoading || isLockedOut()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Status de tentativas */}
              {loginAttempts > 0 && (
                <div className="text-sm text-yellow-300 text-center">
                  Tentativas restantes: {MAX_LOGIN_ATTEMPTS - loginAttempts}
                </div>
              )}

              {/* Enter Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading || isLockedOut()}
              >
                {isLoading ? 'Entrando...' : 'Enter'}
              </Button>
            </form>

            {/* Test Credentials Info - Remover em produção */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <p className="text-sm text-white/90 mb-2">
                  <strong>Credenciais de teste (DEV):</strong>
                </p>
                <p className="text-sm text-white/80">
                  Email: leo@infinity6.ai<br />
                  Senha: tI#GhyB9kmlf
                </p>
                <p className="text-xs text-yellow-300 mt-2">
                  ⚠️ Remover em produção
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default CMSLogin;
