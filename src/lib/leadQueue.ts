/**
 * Fila de fallback para leads do Kiosk (CTA de eBook).
 *
 * Estratégia: o envio online continua sendo a via principal. Só quando o POST
 * falha (rede fora, timeout, DNS) o lead cai nesta fila em localStorage, e é
 * reenviado depois — no load do kiosk, no evento `online` ou periodicamente.
 *
 * 100% client-side. Nenhum backend envolvido.
 */

import { APPS_SCRIPT_URL } from '@/lib/leadFormConfig';

const STORAGE_KEY = 'i6_kiosk_lead_queue';
const MAX_ITEMS = 500;
const SEND_TIMEOUT_MS = 6000;

export type QueuedLead = {
  id: string;
  ts: string;
  attempts: number;
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

function readAll(): QueuedLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QueuedLead[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: QueuedLead[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota — ignora silenciosamente
  }
}

export function getPendingLeads(): QueuedLead[] {
  return readAll();
}

export function getPendingLeadsCount(): number {
  return readAll().length;
}

export function clearPendingLeads(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Grava um lead na fila (usado só quando o envio online falhou). */
export function enqueueLead(fields: Record<string, string>): void {
  try {
    const items = readAll();
    items.push({ id: newId(), ts: new Date().toISOString(), attempts: 1, fields });
    const trimmed = items.length > MAX_ITEMS ? items.slice(items.length - MAX_ITEMS) : items;
    writeAll(trimmed);
  } catch {
    // nunca quebrar a UX
  }
}

function toFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  return fd;
}

/**
 * POST para o Apps Script com timeout curto.
 * O modo é `no-cors` (resposta opaca), então só é possível detectar falha de
 * rede via exceção do fetch — mesmo sinal já usado hoje no CTA.
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

/** Tenta reenviar os pendentes. Remove da fila apenas os que passaram. */
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
    const remaining: QueuedLead[] = [];
    for (const item of items) {
      const ok = await postLead(item.fields);
      if (ok) {
        sent += 1;
      } else {
        remaining.push({ ...item, attempts: item.attempts + 1 });
      }
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

/** Exporta os leads pendentes em CSV — rede de segurança se o evento acabar sem internet. */
export function downloadPendingLeadsCSV(): void {
  const items = readAll();
  const keys = new Set<string>();
  items.forEach((i) => Object.keys(i.fields).forEach((k) => keys.add(k)));
  const cols = ['id', 'ts', 'attempts', ...[...keys].sort()];
  const header = cols.join(',') + '\n';
  const body = items
    .map((i) =>
      cols
        .map((c) => {
          if (c === 'id') return i.id;
          if (c === 'ts') return i.ts;
          if (c === 'attempts') return String(i.attempts);
          return i.fields[c] ?? '';
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
