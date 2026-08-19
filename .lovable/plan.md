# Landing `/go/:token` — leads vindos do e-mail marketing (v0 funcional)

## Objetivo

Nova rota `/pt/go/:token` e `/en/go/:token` que resolve o token do e-mail no i6 HUB, registra o clique, redireciona quando o link tem destino externo e, quando não tem, renderiza uma landing personalizada com o formulário de contato pré-preenchido.

## Restrição importante (verificada)

O site é uma SPA 100% estática (`src/App.tsx` com `BrowserRouter`, sem SSR). Então:

- O `track-click` **não** pode ser chamado server-side. A chamada será feita no cliente, no primeiro render da rota (`POST .../functions/v1/track-click` com `{ token }`).
- O redirect quando existe `destination_url` não é um HTTP 302: será `window.location.replace(destination_url)` logo após a resposta do `track-click`. Efeito prático é o mesmo para o visitante e o clique já fica registrado na chamada.
- `user-agent` e `x-forwarded-for` são definidos pelo navegador/edge — não podemos encaminhá-los manualmente; a função recebe o UA real do visitante de qualquer forma.

## O que será construído

1. **Rota**: `go/:token` dentro de `LocalizedRoutes` em `src/App.tsx`, usando o `DarkLayout` atual (header, menu, cores, footer iguais ao resto do site).
2. **Hook `useOutreachToken`** (`src/hooks/useOutreachToken.ts`): faz o POST no `track-click`, retorna `{ status, send_id, lang, destination_url, landing }`. Estados: `loading`, `redirect`, `landing`, `invalid`.
3. **Página `GoLanding`** (`src/pages/GoLanding.tsx`):
   - `loading`: spinner existente (`LoadingSpinner`).
   - `destination_url` presente: `window.location.replace(...)`.
   - `landing`: hero com `landing.title` / `landing.subtitle` (fallback para o texto padrão do `/contact` quando nulos) + formulário.
   - token inválido/expirado (400/401/404) ou falha de rede: renderiza a landing genérica (hero padrão + form vazio) em vez de tela de erro.
   - Se `lang` da resposta divergir da URL, respeita o `lang` da URL (o visitante já está na versão que clicou).
   - `SEOHead` com `noindex` (páginas de token não devem ser indexadas).
4. **Formulário**: reaproveitar o `ContactForm` atual, tornando-o parametrizável via props opcionais (`defaultValues` para nome/e-mail/assunto/mensagem, `leadSource`, `extraFields`). Sem props, o `/contact` continua exatamente como está hoje. O envio segue o mesmo pipeline (form + iframe oculto → Apps Script → i6 HUB, com `normalizeLeadFields`, `lead_uid`, honeypot e campos de tracking).
5. **Atribuição**: novo `LeadSource` `'go-landing'` e campo extra `outreach_send_id` no payload. Assunto pré-selecionado quando `landing.subject` casar com uma das opções fixas; senão fica o padrão.

## Ponto a confirmar depois do v0

O `outreach_send_id` só chega ao HUB se o Apps Script repassar esse campo no payload de dispatch. Se ele repassa apenas uma lista fixa de campos, será necessário um ajuste no `Code.gs` (fora deste repositório) para incluir `outreach_send_id`. No site já enviaremos o campo — validamos no teste e, se não chegar, ajustamos o Apps Script.

## Validação

- Abrir um link `{{landing_link}}` real em PT e EN: landing renderiza com título/subtítulo do HUB e form pré-preenchido; clique registrado no HUB.
- Abrir um link com `destination_url`: redireciona para o destino e registra o clique.
- Token inválido: landing genérica, sem erro na tela.
- Submeter o form: linha na planilha com `source: go-landing`, `outreach_send_id` preenchido, e lead associado à campanha no HUB.
- `/contact` continua funcionando igual (mesmo componente).

## Arquivos

- `src/App.tsx` (rota)
- `src/hooks/useOutreachToken.ts` (novo)
- `src/pages/GoLanding.tsx` (novo)
- `src/components/contact/ContactForm.tsx` (props opcionais)
- `src/lib/leadFormConfig.ts` (`'go-landing'` em `LeadSource`)
