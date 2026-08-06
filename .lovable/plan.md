# Correção da captura de leads (duplicados + leads não chegando no i6 HUB)

## Diagnóstico (confirmado na planilha e no código)

**1. Duplicados — causa: fila de reenvio do Kiosk**

Os 15 registros da Thais entram a cada ~2 minutos (17:10, 17:12, 17:16 … 17:48). Esse intervalo é exatamente o `LEAD_FLUSH_INTERVAL_MS = 2 min` de `src/pages/Kiosk.tsx`.

O envio usa `fetch(..., mode: 'no-cors')` com timeout de 6s (`src/lib/leadQueue.ts`). Com `no-cors` a resposta é opaca: não há como saber se o servidor aceitou. No Wi-Fi do evento o POST chegava no Apps Script, mas o `AbortController` cortava antes de resolver → o lead era considerado "falha", ia para a fila local e era reenviado indefinidamente. Não existe limite de tentativas nem chave de idempotência.

**2. Leads não chegando no i6 HUB — causa: payload rejeitado no encaminhamento**

A aba de log da planilha mostra as falhas do Apps Script ao chamar o HUB:
- `EXCEPTION` — falta de permissão `UrlFetchApp.fetch` (autorização do script)
- `FAIL_401 {"error":"unauthorized"}` — token do HUB
- `FAIL_400 {"metadata":["Expected string, received null", x3]}`
- `FAIL_400 {"source":["String must contain at most 50 character(s)"]}`

O registro da Victoria Baumann veio do formulário de contato (`/en/contact`, subscription `partnership`). Esse formulário (`src/components/contact/ContactForm.tsx`) não envia `insight_id`, `reason` nem os campos de UTM — daí os três campos nulos de `metadata` rejeitados pelo HUB. E o campo usado como `source` em alguns envios é um texto longo (título do conteúdo), estourando o limite de 50 caracteres.

## O que será feito no site

**A. Idempotência em todos os formulários**
- Novo helper em `src/lib/leadFormConfig.ts`: `newLeadUid()` (UUID) e um campo padrão `lead_uid`.
- Passa a ser enviado por `ContactForm`, `LeadGateForm`, `ArticleCTAForm` e `EbookCTA` (Kiosk). O UID é gerado **uma vez por submissão** e reaproveitado em qualquer retentativa da fila — é a chave que permite o Apps Script descartar duplicados.

**B. Fila de reenvio segura (`src/lib/leadQueue.ts`)**
- Timeout do POST de 6s → 20s (evento com rede lenta não é falha).
- Máximo de 3 tentativas por lead; ao estourar, o item sai da fila e é marcado como "não confirmado" (permanece exportável em CSV) em vez de reenviar para sempre.
- `enqueueLead` passa a deduplicar por `lead_uid`, então o mesmo lead nunca ocupa dois lugares na fila.
- Reenvio com `Retry-After` progressivo (2min → 5min → 15min) em vez de fixo a cada 2min.

**C. Payload sempre completo (fim dos nulos e do `source` longo)**
- Todos os formulários passam a enviar sempre, como string (vazia quando não se aplica): `reason`, `insight_id`, `subscription`, `utm_source`, `utm_medium`, `utm_campaign`, `user_agent`.
- Novo campo curto `source` (máx. 50 caracteres), derivado da origem e não do título: `contact-form`, `lead-gate-insight`, `lead-gate-research`, `article-cta-insight`, `article-cta-research`, `kiosk-demo`. O título continua indo em `company`/`message`, como hoje.
- No formulário de contato, `subscription` continua sendo o assunto (`general` / `demo` / `partnership` / `support`) e passa a ir junto `reason: "contact-form"`.

## Trecho para colar no Apps Script

Depois de aprovado, entrego um trecho pronto para o `doPost` que:
- lê `lead_uid` e ignora o POST se esse UID já existir na planilha (dedupe definitivo, inclusive contra retentativas de rede);
- normaliza qualquer campo ausente para string vazia antes de montar o payload do HUB;
- trunca `source` em 50 caracteres;
- registra na aba de log o `lead_uid` junto do status, para rastrear caso a caso.

Também preciso que você reautorize o script (o `EXCEPTION` de `UrlFetchApp.fetch` significa que a autorização de requisição externa foi perdida) e revalide o token do HUB (`FAIL_401`) — sem isso, nenhum lead é encaminhado, independente do que o site envie.

## Fora de escopo

Limpeza das linhas duplicadas já existentes na planilha (você cuida disso).
