
import bcrypt from 'bcryptjs';
import { logger } from './logger';

/**
 * Utilitário para operações seguras com senhas
 */
export class PasswordSecurity {
  private static readonly SALT_ROUNDS = 12;
  private static readonly MAX_PASSWORD_LENGTH = 128;
  private static readonly MIN_PASSWORD_LENGTH = 8;

  /**
   * Gera hash seguro da senha
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      // Validar comprimento da senha
      if (password.length < this.MIN_PASSWORD_LENGTH || password.length > this.MAX_PASSWORD_LENGTH) {
        throw new Error('Comprimento de senha inválido');
      }

      // Gerar hash com salt
      const hash = await bcrypt.hash(password, this.SALT_ROUNDS);
      
      logger.info('Hash de senha gerado com sucesso', {}, 'PasswordSecurity');
      return hash;
    } catch (error) {
      logger.error('Erro ao gerar hash da senha', { error }, 'PasswordSecurity');
      throw new Error('Erro ao processar senha');
    }
  }

  /**
   * Verifica senha contra hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      // Validações básicas
      if (!password || !hash) {
        return false;
      }

      if (password.length > this.MAX_PASSWORD_LENGTH) {
        return false;
      }

      // Verificar senha
      const isValid = await bcrypt.compare(password, hash);
      
      if (!isValid) {
        logger.warn('Tentativa de login com senha inválida', {}, 'PasswordSecurity');
      }

      return isValid;
    } catch (error) {
      logger.error('Erro ao verificar senha', { error }, 'PasswordSecurity');
      return false;
    }
  }

  /**
   * Valida força da senha
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < this.MIN_PASSWORD_LENGTH) {
      errors.push(`Senha deve ter pelo menos ${this.MIN_PASSWORD_LENGTH} caracteres`);
    }

    if (password.length > this.MAX_PASSWORD_LENGTH) {
      errors.push(`Senha deve ter no máximo ${this.MAX_PASSWORD_LENGTH} caracteres`);
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula');
    }

    if (!/\d/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Senha deve conter pelo menos um caractere especial');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Gera senha segura aleatória
   */
  static generateSecurePassword(length: number = 16): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  }
}
