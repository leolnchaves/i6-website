/**
 * Fire-and-forget tracker for the /kiosk experience.
 * 100% client-side: events are stored in localStorage on the totem itself.
 * No network calls, no backend, no PII.
 *
 * Each event: { id, event_key, ts } where event_key is a stable namespaced
 * string like "q1:r-growth", "results:predictive-personalization",
 * "ebook:growth". Aggregation across machines requires manually exporting
 * the CSV from each totem via /kiosk-metrics/<token>.
 */

const STORAGE_KEY = 'i6_kiosk_events';
const MAX_EVENTS = 5000;

export type KioskEvent = { id: string; event_key: string; ts: string };

function readAll(): KioskEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as KioskEvent[]) : [];
  } catch {
    return [];
  }
}

function writeAll(events: KioskEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // quota or serialization error — drop silently
  }
}

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function trackKioskEvent(eventKey: string): void {
  try {
    const events = readAll();
    events.push({ id: newId(), event_key: eventKey, ts: new Date().toISOString() });
    // FIFO cap
    const trimmed = events.length > MAX_EVENTS ? events.slice(events.length - MAX_EVENTS) : events;
    writeAll(trimmed);
  } catch {
    // tracking must never break UX
  }
}

export function getKioskEvents(): KioskEvent[] {
  return readAll();
}

export function clearKioskEvents(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function csvEscape(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function downloadKioskEventsCSV(): void {
  const events = readAll();
  const header = 'id,event_key,ts\n';
  const body = events.map((e) => [e.id, e.event_key, e.ts].map(csvEscape).join(',')).join('\n');
  const blob = new Blob([header + body + (body ? '\n' : '')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = url;
  a.download = `kiosk-events-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
