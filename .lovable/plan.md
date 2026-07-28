# Remover Supabase / backend do projeto

Objetivo: deixar o site **100% estático**, sem qualquer código, dependência ou config apontando para banco/backend. O tracking do kiosk já roda em `localStorage`, então nada da aplicação depende mais de Supabase.

## Impacto zero em GitHub / Actions / Pages

- `.github/workflows/deploy-gh-pages.yml` **não referencia nenhum secret ou env var de Supabase**. Os únicos secrets usados são `I6HUB_FEED_URL*` e `I6HUB_SYNC_TOKEN`, que continuam.
- Build é `npm install` + `npm run build`. Como nenhum arquivo em `src/**` importa `@supabase/supabase-js` nem `@/integrations/supabase/client`, remover a dep e os arquivos auto-gerados não afeta o build.
- Deploy no GitHub Pages continua servindo `dist/` estático. Trigger por tag `v*` e `repository_dispatch` do i6Hub permanecem inalterados.

## O que será removido

**Código auto-gerado (não é mais usado por nenhum import):**
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- pasta `src/integrations/supabase/` inteira

**Configuração de backend do repo:**
- `supabase/config.toml`
- `supabase/migrations/` (histórico)
- pasta `supabase/` inteira

**Dependência npm:**
- `@supabase/supabase-js` removido do `package.json` e do lockfile

**Variáveis de ambiente:**
- Remover `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` do `.env`

## O que NÃO muda

- `src/lib/kioskTracker.ts` — já usa apenas `localStorage`.
- `src/pages/KioskMetrics.tsx` — já lê do `localStorage` e exporta CSV.
- Formulários (contato / lead-gate) continuam via Google Apps Script (fire-and-forget iframe).
- Sync do i6Hub CMS e todos os scripts em `scripts/` — não usam Supabase.

## Verificação após a remoção

1. `rg "supabase"` em `src/` deve retornar zero resultados.
2. `npm run build` local passa sem erros.
3. `/kiosk` grava eventos e `/kiosk-metrics/<token>` continua listando e exportando CSV.
4. Publicar release patch **v2.2.12** disparando o deploy no GitHub Pages e validar site online.

## Observação sobre Lovable Cloud

Isso desacopla o app do backend da Lovable Cloud **a nível de código**. A conexão Cloud continua existindo no workspace (não dá para "desconectar" pelo agente), mas nenhum arquivo do site referencia mais nada dela — o site pode ser servido de qualquer host estático.
