export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieCategoryInfo {
  id: CookieCategory;
  name: string;
  description: string;
  required: boolean;
  cookies: string[];
}

// Soft opt-in: analytics (GA4) ativo por padrão.
// O tracker próprio anônimo de primeira parte é essencial (legítimo interesse)
// e não pode ser desativado por toggle — apenas limpando o localStorage.
export const defaultCookieConsent: CookieConsent = {
  essential: true,
  analytics: true,
  marketing: false,
  preferences: false,
};

export const cookieCategories: CookieCategoryInfo[] = [
  {
    id: 'essential',
    name: 'Essenciais',
    description:
      'Cookies necessários para o funcionamento do site e métricas anônimas de primeira parte (anonymous_id, sessão, UTMs, journey) sob legítimo interesse. Não podem ser desabilitados.',
    required: true,
    cookies: ['session_id', 'csrf_token', 'language_preference', 'i6_aid', 'i6_session'],
  },
  {
    id: 'analytics',
    name: 'Análise (GA4)',
    description:
      'Envio anônimo para Google Analytics 4 (terceira parte): tipo de dispositivo, navegador, país aproximado. Você pode desativar a qualquer momento.',
    required: false,
    cookies: ['_ga', '_ga_*'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies usados para entregar anúncios relevantes e campanhas de marketing.',
    required: false,
    cookies: ['facebook_pixel', 'google_ads', 'remarketing'],
  },
  {
    id: 'preferences',
    name: 'Preferências',
    description: 'Cookies que lembram suas escolhas e personalizam sua experiência.',
    required: false,
    cookies: ['theme_preference', 'layout_settings', 'user_preferences'],
  },
];
