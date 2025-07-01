
// Authentication constants
export const AUTH_CONSTANTS = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  MIN_PASSWORD_LENGTH: 8,
  MAX_EMAIL_LENGTH: 254,
  MAX_PASSWORD_LENGTH: 128,
} as const;

export const AUTH_MESSAGES = {
  INVALID_EMAIL: 'Por favor, insira um email válido.',
  SHORT_PASSWORD: 'A senha deve ter pelo menos 8 caracteres.',
  INVALID_CREDENTIALS: 'Credenciais inválidas.',
  CONNECTIVITY_ERROR: 'Erro de conectividade. Verifique sua conexão com a internet.',
  INTERNAL_ERROR: 'Erro interno. Tente novamente mais tarde.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
  LOCKED_OUT: (minutes: number) => `Muitas tentativas de login. Tente novamente em ${minutes} minutos.`,
} as const;
