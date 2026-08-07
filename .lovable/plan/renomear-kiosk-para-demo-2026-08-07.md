# Renomear /kiosk para /demo

A experiência de totem passa a ser servida em `/demo`, e a tela de métricas em `/demo-metrics/:token`. As rotas antigas deixam de existir (qualquer acesso a `/kiosk` cai no comportamento normal de rota inexistente).

## Mudanças

1. **Rotas (src/App.tsx)**
   - `/kiosk` → `/demo`
   - `/kiosk-metrics/:token` → `/demo-metrics/:token`
   - Sem redirect da rota antiga (conforme decidido).

2. **Arquivos estáticos de deploy (scripts/prerender-seo-stubs.mjs)**
   - Gerar `dist/demo/index.html` e `dist/demo-metrics/<token>/index.html` em vez das versões `kiosk`, para que o app do totem receba HTTP 200 no GitHub Pages.

3. **Referências textuais**
   - Ajustar comentários/labels que citam a URL `/kiosk` para `/demo` (ex.: `src/lib/kioskTracker.ts`, `src/lib/kioskEventStore.ts`).

## Fora de escopo

Nomes internos de arquivos, componentes, chaves de storage (`i6_kiosk_*`) e eventos de tracking (`kiosk_session_started`) permanecem como estão — renomeá-los não afeta a URL e quebraria dados/histórico já persistidos nos dispositivos.

## Após aprovação

O totem (Fully Kiosk) precisa ter a URL inicial atualizada para `https://infinity6.ai/demo`. Publico um patch para disparar o deploy se você pedir.
