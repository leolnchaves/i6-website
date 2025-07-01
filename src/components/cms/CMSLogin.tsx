import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCMSAuth } from '@/hooks/useCMSAuth';
import GradientBackground from '@/components/ui/gradient-background';

const CMSLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useCMSAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('=== INÍCIO DO LOGIN ===');
    console.log('Email:', email);
    console.log('URL do Supabase:', 'https://lwhxacuxkwbdptyjwgds.supabase.co');

    try {
      // Primeiro, vamos testar a conectividade básica com uma consulta simples
      console.log('Testando conectividade básica...');
      
      const { data: healthCheck, error: healthError } = await supabase
        .from('cms_users')
        .select('count', { count: 'exact', head: true });

      console.log('Health check resultado:', { data: healthCheck, error: healthError });

      if (healthError) {
        console.error('Erro na verificação de conectividade:', healthError);
        throw new Error(`Falha na conectividade: ${healthError.message}`);
      }

      // Buscar usuário por email
      console.log('Buscando usuário com email:', email.toLowerCase().trim());
      
      const { data: users, error: fetchError } = await supabase
        .from('cms_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('is_active', true);

      console.log('Resultado da busca por usuário:');
      console.log('- Dados:', users);
      console.log('- Erro:', fetchError);
      console.log('- Quantidade:', users?.length || 0);

      if (fetchError) {
        console.error('Erro detalhado na busca:', fetchError);
        throw new Error(`Erro na consulta: ${fetchError.message}`);
      }

      if (!users || users.length === 0) {
        console.log('Nenhum usuário encontrado');
        setError('Email ou senha inválidos');
        return;
      }

      const user = users[0];
      console.log('Usuário encontrado:', {
        id: user.id,
        email: user.email,
        role: user.role,
        is_active: user.is_active
      });

      // Verificar senha (simplificado para teste)
      console.log('Verificando senha...');
      if (password !== 'tI#GhyB9kmlf') {
        console.log('Senha incorreta');
        setError('Email ou senha inválidos');
        return;
      }

      console.log('Senha correta! Atualizando último login...');

      // Atualizar último login
      const { error: updateError } = await supabase
        .from('cms_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', user.id);

      if (updateError) {
        console.error('Erro ao atualizar último login:', updateError);
        // Não bloquear o login por causa disso
      } else {
        console.log('Último login atualizado com sucesso');
      }

      // Fazer login através do contexto
      const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString()
      };

      console.log('Fazendo login com dados:', userData);
      login(userData);

      console.log('Login realizado com sucesso! Redirecionando...');
      
      // Redirecionar para o CMS
      navigate('/cms-admin-i6/site-structure');
    } catch (err) {
      console.error('=== ERRO CAPTURADO ===');
      console.error('Tipo do erro:', typeof err);
      console.error('Erro completo:', err);
      
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Erro de conectividade. Verifique sua conexão com a internet e tente novamente.');
      } else if (err instanceof Error) {
        setError(`Erro: ${err.message}`);
      } else {
        setError('Erro desconhecido. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
      console.log('=== FIM DO LOGIN ===');
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
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

            {/* Test Credentials Info */}
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <p className="text-sm text-white/90 mb-2">
                <strong>Credenciais de teste:</strong>
              </p>
              <p className="text-sm text-white/80">
                Email: leo@infinity6.ai<br />
                Senha: tI#GhyB9kmlf
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default CMSLogin;
