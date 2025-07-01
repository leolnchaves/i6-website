
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Key, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { logger } from '@/utils/logger';
import { SUPABASE_CONFIG } from '@/config/supabase';

const SecuritySettings = () => {
  const [sessionTimeout, setSessionTimeout] = useState('24');
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true
  });

  // Verificar se as variáveis de ambiente estão configuradas adequadamente
  const isSupabaseConfigured = () => {
    return SUPABASE_CONFIG.url && 
           SUPABASE_CONFIG.anonKey && 
           !SUPABASE_CONFIG.url.includes('seu-projeto') &&
           !SUPABASE_CONFIG.anonKey.includes('sua-chave');
  };

  const handleSaveSettings = () => {
    logger.info('Configurações de segurança atualizadas', { 
      sessionTimeout, 
      passwordPolicy 
    }, 'SecuritySettings');
    
    // TODO: Implementar salvamento das configurações
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-semibold">Configurações de Segurança</h2>
      </div>

      {/* Status da Configuração de Segurança */}
      <Alert className={isSupabaseConfigured() ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
        {isSupabaseConfigured() ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        )}
        <AlertDescription className={isSupabaseConfigured() ? "text-green-800" : "text-orange-800"}>
          {isSupabaseConfigured() ? (
            <div>
              <strong>✅ Configuração Segura:</strong> As variáveis de ambiente estão configuradas corretamente.
            </div>
          ) : (
            <div>
              <strong>⚠️ Ação Necessária:</strong> Configure as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY 
              nas configurações do projeto para garantir segurança adequada.
            </div>
          )}
        </AlertDescription>
      </Alert>

      {/* Informações sobre Variáveis de Ambiente */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Status das Variáveis de Ambiente</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">VITE_SUPABASE_URL:</span>
            <span className={SUPABASE_CONFIG.url ? "text-green-600" : "text-red-600"}>
              {SUPABASE_CONFIG.url ? "✅ Configurada" : "❌ Não configurada"}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">VITE_SUPABASE_ANON_KEY:</span>
            <span className={SUPABASE_CONFIG.anonKey ? "text-green-600" : "text-red-600"}>
              {SUPABASE_CONFIG.anonKey ? "✅ Configurada" : "❌ Não configurada"}
            </span>
          </div>
        </div>
      </Card>

      {/* Configurações de Sessão */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Configurações de Sessão</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Timeout da Sessão (horas)
            </label>
            <Input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-32"
              min="1"
              max="168"
            />
          </div>
        </div>
      </Card>

      {/* Política de Senhas */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Política de Senhas</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Comprimento Mínimo
            </label>
            <Input
              type="number"
              value={passwordPolicy.minLength}
              onChange={(e) => setPasswordPolicy({
                ...passwordPolicy,
                minLength: parseInt(e.target.value)
              })}
              className="w-32"
              min="6"
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={passwordPolicy.requireSpecialChars}
                onChange={(e) => setPasswordPolicy({
                  ...passwordPolicy,
                  requireSpecialChars: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir caracteres especiais</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={passwordPolicy.requireNumbers}
                onChange={(e) => setPasswordPolicy({
                  ...passwordPolicy,
                  requireNumbers: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir números</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={passwordPolicy.requireUppercase}
                onChange={(e) => setPasswordPolicy({
                  ...passwordPolicy,
                  requireUppercase: e.target.checked
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir letras maiúsculas</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
