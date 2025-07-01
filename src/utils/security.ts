
/**
 * Utilitários de segurança para o aplicativo
 */

// Sanitização de entrada
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove tags HTML básicas
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limita tamanho
};

// Validação de email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
};

// Validação de UUID
export const validateUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Rate limiting simples (client-side)
interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remover tentativas antigas
    const validAttempts = attempts.filter(time => now - time < config.windowMs);
    
    if (validAttempts.length >= config.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Constantes de segurança
export const SECURITY_CONSTANTS = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  SESSION_DURATION: 8 * 60 * 60 * 1000, // 8 horas
  MIN_PASSWORD_LENGTH: 8,
  MAX_INPUT_LENGTH: 1000,
  CSRF_TOKEN_LENGTH: 32,
} as const;

// Geração de token CSRF simples
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(SECURITY_CONSTANTS.CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Logging seguro (remove informações sensíveis)
export const secureLog = (message: string, data?: any): void => {
  if (process.env.NODE_ENV === 'development') {
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.log(`[SECURITY] ${message}`, sanitizedData);
  }
};

const sanitizeLogData = (data: any): any => {
  if (typeof data !== 'object' || data === null) return data;
  
  const sanitized = { ...data };
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'credential'];
  
  for (const key in sanitized) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  }
  
  return sanitized;
};
