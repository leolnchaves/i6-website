/**
 * infinity6 first-party visitor tracker
 *
 * Base legal: LEGÍTIMO INTERESSE. Coleta anônima de primeira parte (UUID local,
 * UTMs, journey, eventos) — sem terceiros, sem fingerprinting. Sempre ativo,
 * mesmo sem opt-in no banner de cookies. O toggle "Análise" controla apenas o
 * envio para GA4 (terceira parte).
 */

const STORAGE = {
  aid: 'i6_aid',
  firstTouch: 'i6_first_touch',
  lastTouch: 'i6_last_touch',
  pages: 'i6_pages',
  events: 'i6_events',
  session: 'i6_session',
} as const;

const MAX_PAGES = 20;
const MAX_EVENTS = 30;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type UtmRecord = Partial<Record<UtmKey, string>>;

export type FirstTouch = UtmRecord & {
  referrer?: string;
  landing_page?: string;
  ts: string;
};

export type LastTouch = UtmRecord & {
  referrer?: string;
  ts: string;
};

export type PageView = { path: string; title?: string; ts: string };
export type TrackedEvent = { name: string; props?: Record<string, unknown>; ts: string };

export type LeadContext = {
  anonymous_id: string | null;
  session_id: string | null;
  first_touch: FirstTouch | null;
  last_touch: LastTouch | null;
  landing_page: string | null;
  pages_viewed_count: number;
  pages: PageView[];
  events: TrackedEvent[];
  session_duration_ms: number | null;
  consent_granted: boolean;
};

// Apenas para GA4 (terceira parte). Tracker próprio é sempre on.
let ga4ConsentGranted = false;
let inMemorySessionId: string | null = null;
let sessionStart = 0;

const isBrowser = () => typeof window !== 'undefined';
const safeUuid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const readJSON = <T>(key: string): T | null => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
};

const writeString = (key: string, value: string) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
};

const parseUtms = (search: string): UtmRecord => {
  const params = new URLSearchParams(search);
  const out: UtmRecord = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) out[k] = v.slice(0, 200);
  }
  return out;
};

/**
 * Controla apenas o envio para GA4 (terceira parte). O tracker próprio
 * (primeira parte, anônimo) permanece ativo independente desta flag.
 * Mantemos o nome antigo como alias para compatibilidade.
 */
export const setThirdPartyAnalyticsConsent = (granted: boolean) => {
  if (!isBrowser()) return;
  ga4ConsentGranted = granted;
  // Inicializa baseline do tracker próprio na primeira chamada.
  ensureAnonymousId();
  ensureSession();
  captureTouches();
};

/** @deprecated use setThirdPartyAnalyticsConsent */
export const setTrackerConsent = setThirdPartyAnalyticsConsent;

export const ensureAnonymousId = (): string | null => {
  if (!isBrowser()) return null;
  let aid = localStorage.getItem(STORAGE.aid);
  if (!aid) {
    aid = safeUuid();
    writeString(STORAGE.aid, aid);
  }
  return aid;
};

export const getAnonymousId = (): string | null => {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE.aid);
};

const ensureSession = (): string | null => {
  if (!isBrowser()) return null;
  const now = Date.now();
  let session = readJSON<{ id: string; started_at: number; last_activity: number }>(STORAGE.session);
  if (!session || now - session.last_activity > SESSION_TIMEOUT_MS) {
    session = { id: safeUuid(), started_at: now, last_activity: now };
  } else {
    session.last_activity = now;
  }
  writeJSON(STORAGE.session, session);
  inMemorySessionId = session.id;
  sessionStart = session.started_at;
  return session.id;
};

const captureTouches = () => {
  if (!isBrowser()) return;
  const utms = parseUtms(window.location.search);
  const hasUtms = Object.keys(utms).length > 0;
  const referrer = document.referrer || undefined;

  const existingFirst = readJSON<FirstTouch>(STORAGE.firstTouch);
  if (!existingFirst) {
    const first: FirstTouch = {
      ...utms,
      referrer,
      landing_page: window.location.pathname + window.location.search,
      ts: new Date().toISOString(),
    };
    writeJSON(STORAGE.firstTouch, first);
  }

  if (hasUtms) {
    const last: LastTouch = { ...utms, referrer, ts: new Date().toISOString() };
    writeJSON(STORAGE.lastTouch, last);
  }
};

/** Sempre registra (primeira parte, anônimo, legítimo interesse). */
export const recordPageView = (path: string, title?: string) => {
  if (!isBrowser()) return;
  ensureAnonymousId();
  ensureSession();
  const pages = readJSON<PageView[]>(STORAGE.pages) ?? [];
  pages.push({ path, title, ts: new Date().toISOString() });
  if (pages.length > MAX_PAGES) pages.splice(0, pages.length - MAX_PAGES);
  writeJSON(STORAGE.pages, pages);
};

/** Sempre persiste local; só encaminha para GA4 se houver consent. */
export const trackEvent = (name: string, props?: Record<string, unknown>) => {
  if (!isBrowser()) return;
  ensureSession();
  const events = readJSON<TrackedEvent[]>(STORAGE.events) ?? [];
  events.push({ name, props, ts: new Date().toISOString() });
  if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
  writeJSON(STORAGE.events, events);

  if (ga4ConsentGranted) {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      try {
        gtag('event', name, { ...(props ?? {}), anonymous_id: getAnonymousId() ?? undefined });
      } catch {
        /* noop */
      }
    }
  }
};

export const getLeadContext = (): LeadContext => {
  return {
    anonymous_id: getAnonymousId(),
    session_id: inMemorySessionId,
    first_touch: readJSON<FirstTouch>(STORAGE.firstTouch),
    last_touch: readJSON<LastTouch>(STORAGE.lastTouch),
    landing_page: readJSON<FirstTouch>(STORAGE.firstTouch)?.landing_page ?? null,
    pages: readJSON<PageView[]>(STORAGE.pages) ?? [],
    pages_viewed_count: (readJSON<PageView[]>(STORAGE.pages) ?? []).length,
    events: readJSON<TrackedEvent[]>(STORAGE.events) ?? [],
    session_duration_ms: sessionStart ? Date.now() - sessionStart : null,
    consent_granted: ga4ConsentGranted,
  };
};

export const formatLeadContextForMessage = (ctx: LeadContext): string => {
  const fmtTouch = (t: (UtmRecord & { referrer?: string }) | null) => {
    if (!t) return '-';
    const parts: string[] = [];
    for (const k of UTM_KEYS) if (t[k]) parts.push(`${k}=${t[k]}`);
    if (t.referrer) parts.push(`referrer=${t.referrer}`);
    return parts.length ? parts.join(', ') : '(direct)';
  };
  const fmtDuration = (ms: number | null) => {
    if (!ms || ms < 0) return '-';
    const s = Math.round(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}m${s % 60}s`;
  };
  const lastPages = ctx.pages.slice(-10).map((p) => p.path).join(' > ') || '-';
  return [
    '--- Contexto do visitante ---',
    `anonymous_id: ${ctx.anonymous_id ?? '-'}`,
    `session_id: ${ctx.session_id ?? '-'}`,
    `session_duration: ${fmtDuration(ctx.session_duration_ms)}`,
    `first_touch: ${fmtTouch(ctx.first_touch)}`,
    `last_touch: ${fmtTouch(ctx.last_touch)}`,
    `landing_page: ${ctx.landing_page ?? '-'}`,
    `pages_viewed: ${ctx.pages_viewed_count}`,
    `journey: ${lastPages}`,
    `ga4_consent: ${ctx.consent_granted ? 'granted' : 'denied'}`,
  ].join('\n');
};

export const getLeadContextFields = (): Record<string, string> => {
  if (!isBrowser()) return {};
  const ctx = getLeadContext();
  const ft = ctx.first_touch ?? ({} as FirstTouch);
  const lt = ctx.last_touch ?? ({} as LastTouch);
  const journey = ctx.pages.slice(-10).map((p) => p.path).join(' > ');
  const fmtDuration = (ms: number | null) => {
    if (!ms || ms < 0) return '';
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}m${s % 60}s`;
  };
  return {
    anonymous_id:              ctx.anonymous_id ?? '',
    session_id:                ctx.session_id ?? '',
    first_touch_source:        ft.utm_source ?? '',
    first_touch_medium:        ft.utm_medium ?? '',
    first_touch_campaign:      ft.utm_campaign ?? '',
    first_touch_referrer:      ft.referrer ?? '',
    first_touch_landing_page:  ctx.landing_page ?? '',
    last_touch_source:         lt.utm_source ?? '',
    last_touch_medium:         lt.utm_medium ?? '',
    last_touch_campaign:       lt.utm_campaign ?? '',
    pages_viewed_count:        String(ctx.pages_viewed_count),
    journey,
    session_duration:          fmtDuration(ctx.session_duration_ms),
    language:                  document.documentElement.lang || '',
    user_agent:                navigator.userAgent.slice(0, 500),
  };
};
