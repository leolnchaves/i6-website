/**
 * Beacon de visita para o i6 HUB (track-campaign-landing).
 *
 * Dispara SOMENTE com consent da categoria "Análise" — mesmo gate de
 * qualquer rastreamento não essencial do site. Reaproveita i6_aid e os
 * toques de src/lib/tracker.ts; nunca cria um segundo identificador.
 */

import { getAnonymousId, parseUtms, readJSON, type FirstTouch, type LastTouch } from '@/lib/tracker';

export const CAMPAIGN_BEACON_URL =
  'https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-campaign-landing';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i;
const GO_TOKEN_RE = /^(\/(?:pt|en|es))?\/go\/[^/]+$/;

type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content';
const UTM_KEYS: UtmKey[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const maskPath = (pathname: string): string => {
  const m = pathname.match(GO_TOKEN_RE);
  return m ? `${m[1] ?? ''}/go/:token` : pathname;
};

/** Pathname sem o prefixo de idioma, para guards de rota sensível. */
const stripLangPrefix = (pathname: string): string =>
  pathname.replace(/^\/(pt|en|es)(?=\/|$)/, '') || '/';

const clamp = (v: string, max: number) => v.slice(0, max);

/**
 * Envia a visita ao i6 HUB. Corpo estrito: visitor_id, page_url,
 * utm_* (opcionais) e user_agent (opcional) — nenhum campo a mais.
 * Sem visitor_id válido, aborta sem chamar a rede.
 * Silencioso: nunca lança, nunca bloqueia a navegação.
 */
export const sendLandingBeacon = async (pathname: string, search: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  if (stripLangPrefix(pathname).startsWith('/demo-metrics')) return;

  const visitorId = getAnonymousId();
  if (!visitorId || !UUID_RE.test(visitorId)) return;

  // UTMs: URL atual primeiro (passagem de rota em curso), depois último
  // toque e primeiro toque — todos já persistidos por tracker.ts.
  const fromUrl = parseUtms(search);
  const last = readJSON<LastTouch>('i6_last_touch') ?? {};
  const first = readJSON<FirstTouch>('i6_first_touch') ?? {};

  const body: Record<string, string> = {
    visitor_id: visitorId,
    page_url: window.location.origin + maskPath(pathname),
  };

  for (const key of UTM_KEYS) {
    const value = fromUrl[key] ?? last[key] ?? first[key];
    if (value) body[key] = clamp(value, 200);
  }
  if (navigator.userAgent) body.user_agent = clamp(navigator.userAgent, 500);

  try {
    await fetch(CAMPAIGN_BEACON_URL, {
      method: 'POST',
      keepalive: true,
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    /* rede/CORS: silencioso por design */
  }
};
