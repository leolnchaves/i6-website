/**
 * Camada 3 (opcional): cópia remota dos eventos do Kiosk em lote.
 *
 * Reaproveita o MESMO canal estático já usado pelos leads (Apps Script /
 * planilha). Nenhum backend próprio, nenhum banco. Se `REMOTE_SYNC_ENABLED`
 * for false, tudo aqui vira no-op e as camadas locais seguem funcionando.
 *
 * Estratégia: fila em localStorage → POST no-cors em lotes de até 50 eventos,
 * a cada 20s, e também em `online`, no boot e em `pagehide`.
 */

import { APPS_SCRIPT_URL, SHARED_FORM_TOKEN } from '@/lib/leadFormConfig';
import { getDeviceId } from '@/lib/kioskDevice';
import type { KioskEvent } from '@/lib/kioskEventStore';

/**
 * Ative apenas depois que o Apps Script souber tratar `type=kiosk_event`
 * (senão os lotes caem misturados com os leads na mesma aba da planilha).
 */
export const REMOTE_SYNC_ENABLED = false;

const QUEUE_KEY = 'i6_kiosk_event_queue';
const LAST_SYNC_KEY = 'i6_kiosk_last_sync';
const BATCH_SIZE = 50;
const FLUSH_INTERVAL_MS = 20_000;
const SEND_TIMEOUT_MS = 8000;
const MAX_QUEUE = 5000;

function readQueue(): KioskEvent[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as KioskEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(items: KioskEvent[]): void {
  try {
    const capped = items.length > MAX_QUEUE ? items.slice(items.length - MAX_QUEUE) : items;
    localStorage.setItem(QUEUE_KEY, JSON.stringify(capped));
  } catch {
    // ignore
  }
}

export function getPendingSyncCount(): number {
  return REMOTE_SYNC_ENABLED ? readQueue().length : 0;
}

export function getLastSyncAt(): string | null {
  try {
    return localStorage.getItem(LAST_SYNC_KEY);
  } catch {
    return null;
  }
}

export function enqueueForSync(event: KioskEvent): void {
  if (!REMOTE_SYNC_ENABLED) return;
  try {
    writeQueue([...readQueue(), event]);
  } catch {
    // tracking nunca pode quebrar a UX
  }
}

async function postBatch(batch: KioskEvent[]): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const fd = new FormData();
    fd.append('token', SHARED_FORM_TOKEN);
    fd.append('type', 'kiosk_event');
    fd.append('device_id', getDeviceId());
    fd.append('app_version', 'kiosk-app/1.0');
    fd.append('events', JSON.stringify(batch));
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: fd,
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

let flushing = false;

export async function flushEventQueue(): Promise<{ sent: number; remaining: number }> {
  if (!REMOTE_SYNC_ENABLED) return { sent: 0, remaining: 0 };
  if (flushing) return { sent: 0, remaining: readQueue().length };
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { sent: 0, remaining: readQueue().length };
  }

  flushing = true;
  let sent = 0;
  try {
    for (;;) {
      const queue = readQueue();
      if (queue.length === 0) break;
      const batch = queue.slice(0, BATCH_SIZE);
      const ok = await postBatch(batch);
      if (!ok) break;
      sent += batch.length;
      // relê a fila: eventos podem ter chegado durante o POST
      const current = readQueue();
      const sentIds = new Set(batch.map((e) => e.id));
      writeQueue(current.filter((e) => !sentIds.has(e.id)));
      try {
        localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      } catch {
        // ignore
      }
    }
  } finally {
    flushing = false;
  }
  return { sent, remaining: readQueue().length };
}

let started = false;

/** Liga o flush periódico + gatilhos de rede/visibilidade. Idempotente. */
export function startEventSync(): void {
  if (!REMOTE_SYNC_ENABLED || started || typeof window === 'undefined') return;
  started = true;

  void flushEventQueue();
  window.setInterval(() => void flushEventQueue(), FLUSH_INTERVAL_MS);
  window.addEventListener('online', () => void flushEventQueue());
  window.addEventListener('pagehide', () => void flushEventQueue());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flushEventQueue();
  });
}
