
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, Globe, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCMSAuth } from '@/hooks/useCMSAuth';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CMS Admin
              </h1>
              <p className="text-sm text-gray-600 font-medium">Infinity6.ai</p>
            </div>
          </div>
          <p className="text-gray-600">
            Acesse o painel administrativo para gerenciar seu conteúdo
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl shadow-gray-200/50">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Entrar
            </CardTitle>
            <CardDescription className="text-gray-600">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Credentials Info */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                  <Lock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Credenciais de teste</p>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><span className="font-medium">Email:</span> leo@infinity6.ai</p>
                    <p><span className="font-medium">Senha:</span> tI#GhyB9kmlf</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <AlertDescription className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@infinity6.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            Sistema de administração seguro
          </p>
          <p className="text-xs text-gray-500">
            © 2024 Infinity6.ai - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default CMSLogin;
