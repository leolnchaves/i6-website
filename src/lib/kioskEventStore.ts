/**
 * Camada de persistência redundante dos eventos do Kiosk.
 *
 * Duas cópias independentes, ambas no próprio navegador do totem:
 *  - localStorage (leitura síncrona e rápida, usada pelo dashboard)
 *  - IndexedDB    (sem o limite de ~5MB, sobrevive a limpezas parciais)
 *
 * Na inicialização as duas fontes são reconciliadas por união de `id`,
 * de modo que se uma for apagada ela é repopulada a partir da outra.
 *
 * 100% estático: nenhuma chamada de rede aqui.
 */

export type KioskEvent = { id: string; event_key: string; ts: string };

export const LS_KEY = 'i6_kiosk_events';
const DB_NAME = 'i6-kiosk';
const DB_VERSION = 1;
const STORE = 'events';
const MAX_EVENTS = 50000;

/* ------------------------------- localStorage ------------------------------ */

export function lsReadAll(): KioskEvent[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as KioskEvent[]).filter(isEvent) : [];
  } catch {
    return [];
  }
}

function lsWriteAll(events: KioskEvent[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(events));
  } catch {
    // quota estourada: mantém só a cauda mais recente
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(events.slice(-2000)));
    } catch {
      // desiste silenciosamente — o IndexedDB continua com a cópia completa
    }
  }
}

function isEvent(e: unknown): e is KioskEvent {
  const v = e as KioskEvent;
  return !!v && typeof v.id === 'string' && typeof v.event_key === 'string' && typeof v.ts === 'string';
}

/* -------------------------------- IndexedDB -------------------------------- */

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDB(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('ts', 'ts');
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

export async function idbReadAll(): Promise<KioskEvent[]> {
  const db = await openDB();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(((req.result as KioskEvent[]) ?? []).filter(isEvent));
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function idbPut(events: KioskEvent[]): Promise<void> {
  if (events.length === 0) return;
  const db = await openDB();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      events.forEach((e) => store.put(e));
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function idbClear(): Promise<void> {
  const db = await openDB();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/* ------------------------------ escrita unificada --------------------------- */

function sortAndCap(events: KioskEvent[]): KioskEvent[] {
  const sorted = events.slice().sort((a, b) => a.ts.localeCompare(b.ts));
  return sorted.length > MAX_EVENTS ? sorted.slice(sorted.length - MAX_EVENTS) : sorted;
}

export function mergeById(a: KioskEvent[], b: KioskEvent[]): KioskEvent[] {
  const m = new Map<string, KioskEvent>();
  [...a, ...b].forEach((e) => {
    if (isEvent(e)) m.set(e.id, e);
  });
  return sortAndCap([...m.values()]);
}

/** Grava um evento nas duas camadas. Nunca lança. */
export function appendEvent(event: KioskEvent): void {
  try {
    lsWriteAll(sortAndCap([...lsReadAll(), event]));
  } catch {
    // ignore
  }
  void idbPut([event]);
}

/** Apaga as duas camadas. */
export async function clearAll(): Promise<void> {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
  await idbClear();
}

export type ReconcileResult = {
  total: number;
  restoredToLocalStorage: number;
  restoredToIndexedDB: number;
};

/**
 * Une as duas fontes e regrava a união em ambas.
 * Chamado no boot do /demo e do /demo-metrics.
 */
export async function reconcile(): Promise<ReconcileResult> {
  const ls = lsReadAll();
  const idb = await idbReadAll();
  const merged = mergeById(ls, idb);

  const restoredToLocalStorage = merged.length - ls.length;
  const restoredToIndexedDB = merged.length - idb.length;

  if (restoredToLocalStorage > 0) lsWriteAll(merged);
  if (restoredToIndexedDB > 0) {
    const idbIds = new Set(idb.map((e) => e.id));
    await idbPut(merged.filter((e) => !idbIds.has(e.id)));
  }

  return {
    total: merged.length,
    restoredToLocalStorage: Math.max(0, restoredToLocalStorage),
    restoredToIndexedDB: Math.max(0, restoredToIndexedDB),
  };
}
