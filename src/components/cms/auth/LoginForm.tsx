
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { AUTH_CONSTANTS } from './constants';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  error: string;
  loginAttempts: number;
  isLockedOut: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  error,
  loginAttempts,
  isLockedOut,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
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
            maxLength={AUTH_CONSTANTS.MAX_EMAIL_LENGTH}
            disabled={isLoading || isLockedOut}
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
            minLength={AUTH_CONSTANTS.MIN_PASSWORD_LENGTH}
            maxLength={AUTH_CONSTANTS.MAX_PASSWORD_LENGTH}
            disabled={isLoading || isLockedOut}
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
            Tentativas restantes: {AUTH_CONSTANTS.MAX_LOGIN_ATTEMPTS - loginAttempts}
          </div>
        )}

        {/* Enter Button */}
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={isLoading || isLockedOut}
        >
          {isLoading ? 'Entrando...' : 'Enter'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
