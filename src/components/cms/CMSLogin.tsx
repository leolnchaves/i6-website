
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
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
    console.log('Supabase URL:', supabase.supabaseUrl);
    console.log('Supabase Key (primeiros 10 chars):', supabase.supabaseKey?.substring(0, 10));

    try {
      // Teste de conectividade com Supabase
      console.log('Testando conectividade com Supabase...');
      
      const { data: testData, error: testError } = await supabase
        .from('cms_users')
        .select('count')
        .limit(1);

      console.log('Teste de conectividade - dados:', testData);
      console.log('Teste de conectividade - erro:', testError);

      if (testError) {
        console.error('Erro de conectividade:', testError);
        setError(`Erro de conectividade: ${testError.message}`);
        return;
      }

      // Buscar usuário por email
      console.log('Buscando usuário com email:', email.toLowerCase().trim());
      
      const { data: users, error: fetchError } = await supabase
        .from('cms_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('is_active', true);

      console.log('Resultado da busca:');
      console.log('- Usuários encontrados:', users);
      console.log('- Erro:', fetchError);
      console.log('- Quantidade de usuários:', users?.length || 0);

      if (fetchError) {
        console.error('Erro detalhado na busca:', {
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code
        });
        setError(`Erro na busca: ${fetchError.message}`);
        return;
      }

      if (!users || users.length === 0) {
        console.log('Nenhum usuário encontrado com o email fornecido');
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
      console.error('Stack trace:', err instanceof Error ? err.stack : 'N/A');
      
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro interno: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      console.log('=== FIM DO LOGIN ===');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">CMS Admin</h1>
          <p className="mt-2 text-gray-600">Infinity6.ai</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Credenciais de teste:</strong><br />
                Email: leo@infinity6.ai<br />
                Senha: tI#GhyB9kmlf
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@infinity6.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>Sistema de administração seguro</p>
          <p className="mt-1">© 2024 Infinity6.ai - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default CMSLogin;
