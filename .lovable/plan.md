# Beacon de campanha no site infinity6

Enviar as visitas do site para o endpoint externo `track-campaign-landing`, reaproveitando o identificador anônimo e o primeiro toque que já existem hoje — sem criar um segundo identificador e sem depender do aceite do banner (mesmo tratamento de essencial/legítimo interesse do rastreio atual).

## Comportamento

1. A cada troca de página, além do registro local que já acontece hoje, o site envia um aviso ao endpoint com: identificador anônimo, sessão, página atual, título, página de entrada, jornada resumida, primeiro e último toque (UTMs e referenciador), idioma e horário.
2. O envio é disparado depois do registro local, então o identificador já existe no primeiro envio de um visitante novo.
3. O envio nunca bloqueia a navegação nem mostra erro ao visitante: falha de rede é silenciosa.
4. Proteção contra repetição: o mesmo caminho não é reenviado duas vezes seguidas dentro da mesma sessão (evita duplicar em re-render e no voltar/avançar).
5. Nada muda nos formulários: contato, gates de conteúdo e Ebook continuam com o payload atual intacto.

## Privacidade e textos

- O banner ganha `i6_first_touch`, `i6_pages` e `i6_events` na lista de itens essenciais (hoje só `i6_aid` e `i6_session` aparecem por nome).
- A política de privacidade passa a dizer, em PT e EN, que as visitas anônimas são enviadas a um serviço próprio da infinity6 para medir campanhas.
- Fica registrado como pendência separada (fora deste plano, se você quiser): a política não tem versão em espanhol — a rota ES mostra o texto em inglês.

## Detalhes técnicos

- Novo `src/lib/campaignBeacon.ts`: `sendLandingBeacon(path, title)` monta o corpo a partir de `getLeadContext()`/`getLeadContextFields()` de `src/lib/tracker.ts` (chaves `i6_aid`, `i6_session`, `i6_first_touch`, `i6_last_touch`, `i6_pages` — lidas, nunca duplicadas) e envia para `https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-campaign-landing`.
- Transporte: `fetch(..., { method: 'POST', keepalive: true, mode: 'cors', headers: { 'content-type': 'application/json' } })`, com `try/catch` silencioso; sem `sendBeacon` porque precisamos de `content-type: application/json`.
- URL do endpoint em constante exportada do próprio módulo (site estático, sem variável de ambiente em runtime).
- Gancho: chamada em `src/hooks/useTracker.ts`, dentro do mesmo efeito de rota, logo após `recordPageView`; dedupe por `useRef` do último caminho enviado.
- Sem dependência do consent: não passa por `ga4ConsentGranted`.
- Textos: `src/types/cookies.ts` (lista de essenciais) e `src/components/privacy/PrivacyPolicyPT.tsx` + `src/pages/PrivacyPolicy.tsx` (bloco EN).

## Pendência do lado do endpoint

O endpoint é de outro projeto. Para o envio funcionar do navegador ele precisa: aceitar requisição sem token (`verify_jwt = false`) e liberar CORS para `https://infinity6.ai` (e para o preview). Se ele exigir chave, me diga qual cabeçalho usar. Depois de aplicar, eu verifico no navegador se a chamada volta 2xx e reporto o resultado.
