/**
 * Fila de fallback para leads do Kiosk (CTA de eBook).
 *
 * Estratégia: o envio online continua sendo a via principal. Só quando o POST
 * falha (rede fora, timeout, DNS) o lead cai nesta fila em localStorage, e é
 * reenviado depois — no load do kiosk, no evento `online` ou periodicamente.
 *
 * IMPORTANTE — por que existem limites e idempotência aqui:
 * o POST usa `mode: 'no-cors'`, então a resposta é opaca e NÃO é possível
 * confirmar sucesso. Num Wi-Fi lento o request chega no Apps Script mas o
 * cliente considera falha, enfileira e reenvia — foi isso que gerou as linhas
 * duplicadas na planilha (um mesmo lead reenviado a cada 2 minutos).
 * Mitigações:
 *   1. `lead_uid` acompanha o lead em todas as tentativas (dedupe no servidor);
 *   2. timeout generoso (20s) para não classificar rede lenta como falha;
 *   3. máximo de 3 tentativas, com backoff progressivo;
 *   4. ao estourar, o lead sai da fila e vai para um arquivo local de
 *      "não confirmados", que continua saindo no CSV.
 *
 * 100% client-side. Nenhum backend envolvido.
 */

import { APPS_SCRIPT_URL, LEAD_UID_FIELD } from '@/lib/leadFormConfig';

const STORAGE_KEY = 'i6_kiosk_lead_queue';
const UNCONFIRMED_KEY = 'i6_kiosk_lead_unconfirmed';
const MAX_ITEMS = 500;
const SEND_TIMEOUT_MS = 20000;
const MAX_ATTEMPTS = 3;
/** Backoff por número de tentativas já feitas: 2min, 5min, 15min. */
const BACKOFF_MS = [2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000];

export type QueuedLead = {
  id: string;
  ts: string;
  attempts: number;
  /** epoch ms — só tenta reenviar a partir deste momento. */
  nextAttemptAt?: number;
  fields: Record<string, string>;
};

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    // fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function read(key: string): QueuedLead[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QueuedLead[]) : [];
  } catch {
    return [];
  }
}

function write(key: string, items: QueuedLead[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // quota — ignora silenciosamente
  }
}

function readAll(): QueuedLead[] {
  return read(STORAGE_KEY);
}

function writeAll(items: QueuedLead[]): void {
  write(STORAGE_KEY, items);
}

export function getPendingLeads(): QueuedLead[] {
  return readAll();
}

export function getPendingLeadsCount(): number {
  return readAll().length;
}

/** Leads que esgotaram as tentativas — podem ou não ter chegado no servidor. */
export function getUnconfirmedLeads(): QueuedLead[] {
  return read(UNCONFIRMED_KEY);
}

export function getUnconfirmedLeadsCount(): number {
  return read(UNCONFIRMED_KEY).length;
}

export function clearPendingLeads(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UNCONFIRMED_KEY);
  } catch {
    // ignore
  }
}

function uidOf(fields: Record<string, string>): string {
  return fields[LEAD_UID_FIELD] || '';
}

/**
 * Grava um lead na fila (usado só quando o envio online falhou).
 * Deduplica por `lead_uid`, então o mesmo lead nunca ocupa dois lugares.
 */
export function enqueueLead(fields: Record<string, string>): void {
  try {
    const items = readAll();
    const uid = uidOf(fields);
    if (uid && items.some((i) => uidOf(i.fields) === uid)) return;

    items.push({
      id: newId(),
      ts: new Date().toISOString(),
      attempts: 1,
      nextAttemptAt: Date.now() + BACKOFF_MS[0],
      fields,
    });
    const trimmed = items.length > MAX_ITEMS ? items.slice(items.length - MAX_ITEMS) : items;
    writeAll(trimmed);
  } catch {
    // nunca quebrar a UX
  }
}

function archiveUnconfirmed(item: QueuedLead): void {
  try {
    const items = read(UNCONFIRMED_KEY);
    const uid = uidOf(item.fields);
    if (uid && items.some((i) => uidOf(i.fields) === uid)) return;
    items.push(item);
    write(UNCONFIRMED_KEY, items.length > MAX_ITEMS ? items.slice(items.length - MAX_ITEMS) : items);
  } catch {
    // ignore
  }
}

function toFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

/**
 * POST para o Apps Script com timeout longo.
 * O modo é `no-cors` (resposta opaca), então só é possível detectar falha de
 * rede via exceção do fetch. Por isso o timeout é generoso: abortar cedo
 * classifica rede lenta como falha e gera reenvio (duplicidade).
 */
export async function postLead(fields: Record<string, string>): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: toFormData(fields),
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

/**
 * Tenta reenviar os pendentes que já passaram do backoff.
 * Remove da fila os que passaram e os que esgotaram MAX_ATTEMPTS
 * (estes últimos vão para o arquivo de não confirmados).
 */
export async function flushLeadQueue(): Promise<{ sent: number; remaining: number }> {
  if (flushing) return { sent: 0, remaining: getPendingLeadsCount() };
  const items = readAll();
  if (items.length === 0) return { sent: 0, remaining: 0 };
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { sent: 0, remaining: items.length };
  }

  flushing = true;
  let sent = 0;
  try {
    const now = Date.now();
    const remaining: QueuedLead[] = [];
    for (const item of items) {
      if (item.nextAttemptAt && item.nextAttemptAt > now) {
        remaining.push(item);
        continue;
      }
      const ok = await postLead(item.fields);
      if (ok) {
        sent += 1;
        continue;
      }
      const attempts = item.attempts + 1;
      if (attempts >= MAX_ATTEMPTS) {
        archiveUnconfirmed({ ...item, attempts });
        continue;
      }
      remaining.push({
        ...item,
        attempts,
        nextAttemptAt: now + (BACKOFF_MS[attempts - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1]),
      });
    }
    writeAll(remaining);
    return { sent, remaining: remaining.length };
  } finally {
    flushing = false;
  }
}

function csvEscape(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

/** Exporta pendentes + não confirmados em CSV — rede de segurança do evento. */
export function downloadPendingLeadsCSV(): void {
  const pending = readAll().map((i) => ({ item: i, status: 'pending' }));
  const unconfirmed = getUnconfirmedLeads().map((i) => ({ item: i, status: 'unconfirmed' }));
  const rows = [...pending, ...unconfirmed];
  const keys = new Set<string>();
  rows.forEach(({ item }) => Object.keys(item.fields).forEach((k) => keys.add(k)));
  const cols = ['id', 'ts', 'status', 'attempts', ...[...keys].sort()];
  const header = cols.join(',') + '\n';
  const body = rows
    .map(({ item, status }) =>
      cols
        .map((c) => {
          if (c === 'id') return item.id;
          if (c === 'ts') return item.ts;
          if (c === 'status') return status;
          if (c === 'attempts') return String(item.attempts);
          return item.fields[c] ?? '';
        })
        .map(csvEscape)
        .join(','),
    )
    .join('\n');
  const blob = new Blob([header + body + (body ? '\n' : '')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = url;
  a.download = `kiosk-leads-pendentes-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
