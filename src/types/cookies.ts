export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// Strict opt-in: nenhuma categoria não-essencial fica ativa até o visitante decidir.
// O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
// e não pode ser desativado por toggle — apenas limpando o localStorage.
export const defaultCookieConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

