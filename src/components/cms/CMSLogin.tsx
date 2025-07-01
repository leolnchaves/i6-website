
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { useCMSAuth } from '@/hooks/useCMSAuth';
import { useCMSSecureAuth } from '@/hooks/useCMSSecureAuth';
import GradientBackground from '@/components/ui/gradient-background';
import { logger } from '@/utils/logger';

const CMSLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useCMSAuth();
  const { secureLogin, isLoading } = useCMSSecureAuth();

  // Input validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (!email.trim()) {
      setError('Email é obrigatório');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Formato de email inválido');
      return;
    }

    if (!password) {
      setError('Senha é obrigatória');
      return;
    }

    if (!validatePassword(password)) {
      setError('Senha deve ter pelo menos 8 caracteres');
      return;
    }

    logger.info('Tentativa de login', { email: email.toLowerCase().trim() }, 'CMSLogin');

    try {
      const result = await secureLogin(email.trim(), password);

      if (result.success && result.user) {
        logger.info('Login realizado com sucesso', { userId: result.user.id }, 'CMSLogin');
        login(result.user);
        navigate('/cms-admin-i6/site-structure');
      } else {
        logger.warn('Falha no login', { email: email.toLowerCase().trim(), error: result.error }, 'CMSLogin');
        setError(result.error || 'Erro durante o login');
      }
    } catch (err) {
      logger.error('Erro crítico no login', { error: err }, 'CMSLogin');
      setError('Erro interno do servidor. Tente novamente.');
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
                  autoComplete="email"
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
                  maxLength={128}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between text-white/80 text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-orange-400 hover:text-orange-300">
                  Forgot password
                </button>
              </div>

              {/* Enter Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Enter'}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <p className="text-sm text-white/90 mb-2">
                <strong>Acesso Seguro:</strong>
              </p>
              <p className="text-sm text-white/80">
                Entre em contato com o administrador do sistema para obter suas credenciais de acesso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default CMSLogin;
