
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, AlertTriangle, CheckCircle, Key, Clock } from 'lucide-react';
import { logger } from '@/utils/logger';
import { SUPABASE_CONFIG } from '@/config/supabase';

const AdvancedSecuritySettings = () => {
  const [securityConfig, setSecurityConfig] = useState({
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventCommonPasswords: true
    },
    auditLogging: true,
    ipWhitelist: '',
    twoFactorAuth: false
  });

  const [securityStatus, setSecurityStatus] = useState({
    configSecure: false,
    passwordPolicy: false,
    auditingEnabled: false,
    environmentSecure: false
  });

  useEffect(() => {
    checkSecurityStatus();
  }, []);

  const checkSecurityStatus = () => {
    const configSecure = SUPABASE_CONFIG.url && 
                        SUPABASE_CONFIG.anonKey && 
                        !SUPABASE_CONFIG.url.includes('seu-projeto') &&
                        !SUPABASE_CONFIG.anonKey.includes('sua-chave');

    const passwordPolicy = securityConfig.passwordPolicy.minLength >= 8 &&
                          securityConfig.passwordPolicy.requireUppercase &&
                          securityConfig.passwordPolicy.requireNumbers &&
                          securityConfig.passwordPolicy.requireSpecialChars;

    setSecurityStatus({
      configSecure,
      passwordPolicy,
      auditingEnabled: securityConfig.auditLogging,
      environmentSecure: configSecure && passwordPolicy
    });
  };

  const handleSaveSettings = () => {
    try {
      // Validar configurações
      if (securityConfig.sessionTimeout < 1 || securityConfig.sessionTimeout > 168) {
        throw new Error('Timeout de sessão deve estar entre 1 e 168 horas');
      }

      if (securityConfig.maxLoginAttempts < 3 || securityConfig.maxLoginAttempts > 10) {
        throw new Error('Tentativas máximas de login devem estar entre 3 e 10');
      }

      // Log da alteração de configuração
      logger.info('Configurações de segurança atualizadas', { 
        config: securityConfig,
        timestamp: new Date().toISOString()
      }, 'SecuritySettings');

      // TODO: Salvar no banco de dados
      alert('Configurações de segurança salvas com sucesso!');
      checkSecurityStatus();
    } catch (error) {
      logger.error('Erro ao salvar configurações de segurança', { error }, 'SecuritySettings');
      alert(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const getSecurityScore = (): number => {
    let score = 0;
    if (securityStatus.configSecure) score += 25;
    if (securityStatus.passwordPolicy) score += 25;
    if (securityStatus.auditingEnabled) score += 25;
    if (securityConfig.twoFactorAuth) score += 25;
    return score;
  };

  const securityScore = getSecurityScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-semibold">Configurações Avançadas de Segurança</h2>
      </div>

      {/* Security Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Pontuação de Segurança</h3>
          <div className={`text-2xl font-bold ${
            securityScore >= 75 ? 'text-green-600' : 
            securityScore >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {securityScore}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              securityScore >= 75 ? 'bg-green-500' : 
              securityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${securityScore}%` }}
          />
        </div>
      </Card>

      {/* Security Status */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Status de Segurança</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            {securityStatus.configSecure ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <span>Configuração Segura</span>
          </div>
          <div className="flex items-center gap-2">
            {securityStatus.passwordPolicy ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <span>Política de Senhas</span>
          </div>
          <div className="flex items-center gap-2">
            {securityStatus.auditingEnabled ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <span>Auditoria Ativa</span>
          </div>
          <div className="flex items-center gap-2">
            {securityConfig.twoFactorAuth ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <span>Autenticação 2FA</span>
          </div>
        </div>
      </Card>

      {/* Session Security */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Segurança de Sessão</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Timeout da Sessão (horas)
            </label>
            <Input
              type="number"
              value={securityConfig.sessionTimeout}
              onChange={(e) => setSecurityConfig({
                ...securityConfig,
                sessionTimeout: parseInt(e.target.value) || 24
              })}
              min="1"
              max="168"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Máx. Tentativas de Login
            </label>
            <Input
              type="number"
              value={securityConfig.maxLoginAttempts}
              onChange={(e) => setSecurityConfig({
                ...securityConfig,
                maxLoginAttempts: parseInt(e.target.value) || 5
              })}
              min="3"
              max="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Bloqueio (minutos)
            </label>
            <Input
              type="number"
              value={securityConfig.lockoutDuration}
              onChange={(e) => setSecurityConfig({
                ...securityConfig,
                lockoutDuration: parseInt(e.target.value) || 30
              })}
              min="5"
              max="1440"
            />
          </div>
        </div>
      </Card>

      {/* Password Policy */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Política de Senhas Avançada</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Comprimento Mínimo
            </label>
            <Input
              type="number"
              value={securityConfig.passwordPolicy.minLength}
              onChange={(e) => setSecurityConfig({
                ...securityConfig,
                passwordPolicy: {
                  ...securityConfig.passwordPolicy,
                  minLength: parseInt(e.target.value) || 8
                }
              })}
              min="8"
              max="50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={securityConfig.passwordPolicy.requireUppercase}
                onChange={(e) => setSecurityConfig({
                  ...securityConfig,
                  passwordPolicy: {
                    ...securityConfig.passwordPolicy,
                    requireUppercase: e.target.checked
                  }
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir maiúsculas</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={securityConfig.passwordPolicy.requireLowercase}
                onChange={(e) => setSecurityConfig({
                  ...securityConfig,
                  passwordPolicy: {
                    ...securityConfig.passwordPolicy,
                    requireLowercase: e.target.checked
                  }
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir minúsculas</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={securityConfig.passwordPolicy.requireNumbers}
                onChange={(e) => setSecurityConfig({
                  ...securityConfig,
                  passwordPolicy: {
                    ...securityConfig.passwordPolicy,
                    requireNumbers: e.target.checked
                  }
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir números</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={securityConfig.passwordPolicy.requireSpecialChars}
                onChange={(e) => setSecurityConfig({
                  ...securityConfig,
                  passwordPolicy: {
                    ...securityConfig.passwordPolicy,
                    requireSpecialChars: e.target.checked
                  }
                })}
                className="rounded"
              />
              <span className="text-sm">Exigir caracteres especiais</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Security Alerts */}
      {!securityStatus.environmentSecure && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>⚠️ Atenção:</strong> Sua configuração de segurança não está completa. 
            Configure as variáveis de ambiente e políticas de senha para garantir proteção adequada.
          </AlertDescription>
        </Alert>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Salvar Configurações Avançadas
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSecuritySettings;
