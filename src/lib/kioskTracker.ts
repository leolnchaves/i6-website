/**
 * Tracker do /demo — 100% client-side, sem backend e sem banco.
 *
 * Três camadas independentes de proteção contra perda de métricas:
 *  1. Persistência local redundante: localStorage + IndexedDB (kioskEventStore)
 *  2. Export automático diário do CSV para a pasta de downloads do totem
 *  3. Cópia remota em lote pelo mesmo canal estático dos leads (kioskEventSync,
 *     desligada por flag até o Apps Script tratar `type=kiosk_event`)
 *
 * A API pública (`trackKioskEvent`) não mudou.
 */

import {
  appendEvent,
  clearAll,
  lsReadAll,
  idbReadAll,
  mergeById,
  reconcile,
  type KioskEvent,
} from '@/lib/kioskEventStore';
import { enqueueForSync, startEventSync, flushEventQueue, getPendingSyncCount, getLastSyncAt } from '@/lib/kioskEventSync';
import { getDeviceId } from '@/lib/kioskDevice';

export type { KioskEvent };
export { getPendingSyncCount, getLastSyncAt, flushEventQueue, getDeviceId };

const LAST_EXPORT_KEY = 'i6_kiosk_last_auto_export';

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    // fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function trackKioskEvent(eventKey: string): void {
  try {
    const event: KioskEvent = { id: newId(), event_key: eventKey, ts: new Date().toISOString() };
    appendEvent(event);
    enqueueForSync(event);
  } catch {
    // tracking nunca pode quebrar a UX
  }
}

/** Leitura síncrona (localStorage) — usada pelo dashboard. */
export function getKioskEvents(): KioskEvent[] {
  return lsReadAll();
}

/** Leitura completa, unindo as duas camadas locais. */
export async function getKioskEventsMerged(): Promise<KioskEvent[]> {
  const [ls, idb] = [lsReadAll(), await idbReadAll()];
  return mergeById(ls, idb);
}

export function clearKioskEvents(): void {
  void clearAll();
}

/* ---------------------------------- CSV ----------------------------------- */

function csvEscape(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function toCSV(events: KioskEvent[]): string {
  const header = 'id,event_key,ts,device_id\n';
  const device = getDeviceId();
  const body = events
    .map((e) => [e.id, e.event_key, e.ts, device].map(csvEscape).join(','))
    .join('\n');
  return header + body + (body ? '\n' : '');
}

function download(filename: string, content: string): void {
  try {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

export async function downloadKioskEventsCSV(): Promise<void> {
  const events = await getKioskEventsMerged();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  download(`kiosk-events-${getDeviceId()}-${stamp}.csv`, toCSV(events));
}

function dayKey(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Exporta o CSV de um dia específico (padrão: hoje). */
export async function downloadKioskEventsCSVForDay(day: Date = new Date()): Promise<number> {
  const key = dayKey(day);
  const events = (await getKioskEventsMerged()).filter((e) => {
    try {
      return dayKey(new Date(e.ts)) === key;
    } catch {
      return false;
    }
  });
  download(`kiosk-events-${getDeviceId()}-${key}.csv`, toCSV(events));
  return events.length;
}

export function getLastAutoExportAt(): string | null {
  try {
    return localStorage.getItem(LAST_EXPORT_KEY);
  } catch {
    return null;
  }
}

/**
 * No primeiro carregamento após virar o dia, baixa automaticamente o CSV do dia
 * anterior — um arquivo físico, imune à limpeza de webstorage do Fully Kiosk.
 */
async function runDailyAutoExport(): Promise<void> {
  try {
    const today = dayKey(new Date());
    const last = localStorage.getItem(LAST_EXPORT_KEY);
    if (last && last.slice(0, 10) >= today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const exported = await downloadKioskEventsCSVForDay(yesterday);

    localStorage.setItem(LAST_EXPORT_KEY, new Date().toISOString());
    if (exported === 0) {
      // nada do dia anterior: só marca a data para não tentar de novo hoje
    }
  } catch {
    // ignore
  }
}

let booted = false;

/** Chamado no boot do /demo e do /demo-metrics. Idempotente. */
export function initKioskTracking(): void {
  if (booted || typeof window === 'undefined') return;
  booted = true;
  getDeviceId();
  void reconcile();
  startEventSync();
  void runDailyAutoExport();
}
