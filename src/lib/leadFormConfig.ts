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
