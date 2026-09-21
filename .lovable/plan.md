# Beacon de campanha no site infinity6

Enviar as visitas do site para o endpoint externo `track-campaign-landing`, reaproveitando o identificador anônimo e o primeiro toque que já existem hoje — sem criar um segundo identificador e sem depender do aceite do banner (mesmo tratamento de essencial/legítimo interesse do rastreio atual).

## Comportamento

1. A cada troca de página, além do registro local que já acontece hoje, o site envia um aviso ao endpoint com **somente** os campos que o endpoint aceita: identificador do visitante, endereço da página, os cinco UTMs da URL atual (opcionais, até 200 caracteres) e o agente do navegador (opcional, até 500).
2. Sessão, título, página de entrada, jornada e último toque **não** vão no beacon — continuam indo normalmente nos formulários, sem mudança.
3. O envio é disparado depois do registro local, então o identificador já existe no primeiro envio de um visitante novo.
4. O envio nunca bloqueia a navegação nem mostra erro ao visitante: falha de rede é silenciosa.
5. O mesmo caminho não é reenviado duas vezes seguidas na mesma sessão (evita duplicar em re-render e voltar/avançar).
6. Proteções já acordadas: sem disparo em `/demo-metrics/*` (hoje redireciona para a Home, mas o guard fica explícito); em `/go/:token` o endereço enviado é mascarado com string literal no lugar do token.

## Confirmações técnicas pedidas

- **Identificador**: `crypto.randomUUID()` gera UUID v4 no formato validado (ex.: `3fa85f64-5717-4562-b3fc-2c963f66afa6`). O plano inclui um guard de formato antes do envio: se o valor não casar o padrão UUID (fallback raro de navegador sem suporte), o campo sai vazio em vez de rejeitar a chamada inteira.
- **UTMs**: o formulário usa nomes achatados (`first_touch_source` etc.); para o beacon a leitura vem direto das chaves internas `utm_source`/`utm_medium`/`utm_campaign`/`utm_term`/`utm_content` — mapeamento resolvido internamente, o corpo sai com os nomes exatos do schema.
- **page_url**: `window.location.origin + window.location.pathname` (sem query string), com o token de `/go/:token` substituído por máscara literal — nunca o `href` completo.

## Privacidade e textos

- O banner ganha `i6_first_touch`, `i6_pages` e `i6_events` na lista de itens essenciais (hoje só `i6_aid` e `i6_session` aparecem por nome).
- A política de privacidade passa a dizer, em PT e EN, que as visitas anônimas são enviadas a um serviço próprio da infinity6 para medir campanhas.
- Pendência separada (fora deste plano, se você quiser): a política não tem versão em espanhol — a rota ES mostra o texto em inglês.

## Detalhes técnicos

- Novo `src/lib/campaignBeacon.ts`: `sendLandingBeacon()` lê de `src/lib/tracker.ts` (`getAnonymousId`, `i6_first_touch`/`i6_last_touch` com fallback para a URL atual) e monta `{ visitor_id, page_url, utm_source?, utm_medium?, utm_campaign?, utm_term?, utm_content?, user_agent? }` — nenhum campo a mais, nada undefined serializado; endpoint `https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-campaign-landing` em constante exportada do módulo.
- UTMs do beacon: prioridade para o último toque (`i6_last_touch`), senão o primeiro toque, senão a URL atual; cada valor truncado a 200 caracteres; `user_agent` a 500.
- Transporte: `fetch(..., { method: 'POST', keepalive: true, mode: 'cors', headers: { 'content-type': 'application/json' } })` com `try/catch` silencioso.
- Gancho: `src/hooks/useTracker.ts`, no efeito de rota após `recordPageView`; guard `pathname.startsWith('/demo-metrics')`; máscara `/go/:token` → `/go/:token` literal; dedupe por `useRef` do último caminho; sem dependência do consent.
- Textos: `src/types/cookies.ts` (lista de essenciais) e `src/components/privacy/PrivacyPolicyPT.tsx` + `src/pages/PrivacyPolicy.tsx` (bloco EN).

## Pendência do lado do endpoint

O endpoint precisa aceitar requisição sem token (`verify_jwt = false`) e liberar CORS para `https://infinity6.ai` (e para o preview). Se exigir chave, me diga o cabeçalho. Depois de aplicar, verifico no navegador se a chamada volta 2xx e reporto.
