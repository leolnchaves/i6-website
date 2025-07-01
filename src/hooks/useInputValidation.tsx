
import { useState, useCallback } from 'react';
import { logger } from '@/utils/logger';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const useInputValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((
    fieldName: string,
    value: string,
    rules: ValidationRule
  ): ValidationResult => {
    // Sanitize input
    const sanitizedValue = value.trim();

    // Required check
    if (rules.required && !sanitizedValue) {
      return { isValid: false, error: `${fieldName} é obrigatório` };
    }

    // Length checks
    if (rules.minLength && sanitizedValue.length < rules.minLength) {
      return { 
        isValid: false, 
        error: `${fieldName} deve ter pelo menos ${rules.minLength} caracteres` 
      };
    }

    if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
      return { 
        isValid: false, 
        error: `${fieldName} deve ter no máximo ${rules.maxLength} caracteres` 
      };
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
      return { isValid: false, error: `Formato de ${fieldName} inválido` };
    }

    // Custom validation
    if (rules.custom && !rules.custom(sanitizedValue)) {
      return { isValid: false, error: `${fieldName} não atende aos critérios` };
    }

    return { isValid: true };
  }, []);

  const validateEmail = useCallback((email: string): ValidationResult => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validateField('Email', email, {
      required: true,
      maxLength: 254,
      pattern: emailPattern
    });
  }, [validateField]);

  const validatePassword = useCallback((password: string): ValidationResult => {
    return validateField('Senha', password, {
      required: true,
      minLength: 8,
      maxLength: 128,
      custom: (value) => {
        // Password strength check
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
      }
    });
  }, [validateField]);

  const sanitizeInput = useCallback((input: string): string => {
    // Remove potentially dangerous characters
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove basic XSS vectors
      .replace(/['"]/g, '') // Remove quotes to prevent injection
      .substring(0, 1000); // Limit length
  }, []);

  const logValidationAttempt = useCallback((fieldName: string, isValid: boolean) => {
    if (!isValid) {
      logger.warn('Validação falhou', { field: fieldName }, 'InputValidation');
    }
  }, []);

  return {
    validateField,
    validateEmail,
    validatePassword,
    sanitizeInput,
    logValidationAttempt,
    errors,
    setErrors
  };
};
