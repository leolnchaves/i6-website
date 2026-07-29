/**
 * Identificador estável do totem (100% client-side, sem PII).
 * Guardado em localStorage; se for apagado, um novo id é gerado.
 */

const DEVICE_KEY = 'i6_kiosk_device_id';

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    // fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

let cached: string | null = null;

export function getDeviceId(): string {
  if (cached) return cached;
  try {
    const existing = localStorage.getItem(DEVICE_KEY);
    if (existing) {
      cached = existing;
      return existing;
    }
    const id = `totem-${newId().slice(0, 8)}`;
    localStorage.setItem(DEVICE_KEY, id);
    cached = id;
    return id;
  } catch {
    cached = cached ?? `totem-${newId().slice(0, 8)}`;
    return cached;
  }
}

/** Permite recuperar/forçar o mesmo id em outro navegador do mesmo totem. */
export function setDeviceId(id: string): void {
  const clean = id.trim();
  if (!clean) return;
  cached = clean;
  try {
    localStorage.setItem(DEVICE_KEY, clean);
  } catch {
    // ignore
  }
}
