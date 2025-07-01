
// Authentication utility functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const calculateRemainingLockoutTime = (lastAttemptTime: number, lockoutDuration: number): number => {
  return Math.ceil((lockoutDuration - (Date.now() - lastAttemptTime)) / 60000);
};
