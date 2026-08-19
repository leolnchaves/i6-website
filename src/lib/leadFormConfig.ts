/**
 * Shared config for forms that submit to the Google Apps Script CRM endpoint.
 *
 * SHARED_FORM_TOKEN: deve ser identico ao token validado no doPost do Apps Script.
 *   - Não é segredo absoluto (vai no bundle JS público), mas barra POSTs avulsos
 *     feitos direto na URL do Apps Script por scripts/bots que não scraperam o site.
 *   - Para trocar: gerar novo valor, atualizar aqui e atualizar o Apps Script
 *     (constante SHARED_TOKEN no projeto Apps Script), publicar nova versão.
 *
 * HONEYPOT_FIELD: nome do campo invisivel. Bots tendem a preencher tudo;
 *   se vier valor, descartamos o submit silenciosamente.
 */
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzx_sv6GihHhurFlLvuoYRvjLZOC7TrDHWIayCiJIGO5vvBsGgvUd3ATEmFEuWZxZ6I/exec';

export const SHARED_FORM_TOKEN = 'i6-web-2026-mvmnt';

export const HONEYPOT_FIELD = 'website_url';

/**
 * Chave de idempotência do lead.
 *
 * Gerada UMA vez por submissão e reaproveitada em qualquer retentativa
 * (inclusive nos reenvios da fila offline do Kiosk). O Apps Script usa esse
 * valor para descartar POSTs repetidos do mesmo lead — é o que impede as
 * linhas duplicadas na planilha quando a rede é lenta e o cliente não
 * consegue confirmar o sucesso do envio (`mode: 'no-cors'`).
 */
export const LEAD_UID_FIELD = 'lead_uid';

export function newLeadUid(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    // fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Origem curta do lead. O HUB valida `source` com máximo de 50 caracteres,
 * então nunca use títulos de conteúdo aqui.
 */
export type LeadSource =
  | 'contact-form'
  | 'lead-gate-insight'
  | 'lead-gate-research'
  | 'article-cta-insight'
  | 'article-cta-research'
  | 'go-landing'
  | 'kiosk-demo';


export const LEAD_SOURCE_MAX_LEN = 50;

/**
 * Campos que o i6 HUB exige como string. Ausentes viravam `null` no payload
 * do Apps Script e o HUB rejeitava com `invalid_payload`. Sempre enviamos
 * todos, com string vazia quando não se aplicam.
 *
 * `insight_id` NÃO entra aqui: o HUB valida esse campo como UUID e rejeita
 * string vazia (`insight_id: ["Invalid uuid"]`), derrubando o lead inteiro.
 * Ele só é enviado quando existe de fato um insight — caso contrário é omitido.
 */
export const REQUIRED_LEAD_FIELDS = [
  'reason',
  'subscription',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'user_agent',
  'source',
] as const;

/**
 * Normaliza o payload antes do envio: garante `lead_uid`, garante que todos os
 * campos obrigatórios existam como string, trunca `source` e remove
 * `insight_id` vazio (que o HUB rejeita por não ser UUID).
 */
export function normalizeLeadFields(
  fields: Record<string, string | undefined>,
  source: LeadSource,
): Record<string, string> {
  const out: Record<string, string> = {};
  Object.entries(fields).forEach(([k, v]) => {
    out[k] = v == null ? '' : String(v);
  });
  out.source = source.slice(0, LEAD_SOURCE_MAX_LEN);
  REQUIRED_LEAD_FIELDS.forEach((k) => {
    if (typeof out[k] !== 'string') out[k] = '';
  });
  if (!out.insight_id) delete out.insight_id;

  if (!out[LEAD_UID_FIELD]) out[LEAD_UID_FIELD] = newLeadUid();
  return out;
}
