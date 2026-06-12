## Conferência i6Hub CMS (research, landings, stories)

Você implementou no i6Hub o backend dos 3 conteúdos. Aqui no repo precisamos só de:
um script consolidado, atualizar o workflow do GitHub Pages e o roadmap.

---

### 1. Consolidar sync em um script único

**Novo arquivo:** `scripts/sync-content-from-i6hub.mjs`
- Aceita `--type=insights|research|landings|stories` (1 obrigatório).
- Reaproveita a mesma lógica do `sync-insights-from-i6hub.mjs` atual (fetch +
  X-Sync-Token, 3 estratégias de imagem: base64 → URL → preserva, cleanup de
  órfãs no fim, log estruturado, exit 1 se feed tem capa e nada materializou).
- Tabela interna de configuração por tipo:

  | type | env feed | MD dir | filename | IMG dir | extra |
  |---|---|---|---|---|---|
  | insights | `I6HUB_FEED_URL` | `src/content/insights/` | `<lang>-<slug>.md` | `public/content/insights/` | — |
  | research | `I6HUB_FEED_URL_RESEARCH` | `src/content/intelligence/` | `<slug>-<lang>.md` | `public/lovable-uploads/intelligence/` | — |
  | landings | `I6HUB_FEED_URL_LANDINGS` | `src/content/landings/` | `<slug>-<lang>.md` | (sem imagens hoje — pula bloco) | — |
  | stories  | `I6HUB_FEED_URL_STORIES`  | `src/content/stories/`    | `<slug>-<lang>.md` | `public/content/success-stories/` | logo extra em `public/content/logos/` |

- Para `stories`, depois do bloco de cover, processar `logo_data`+`logo_mime`
  → `public/content/logos/<slug>-logo.<ext>` (mesmo cleanup de órfãos).
- Para cada tipo, função de monta-frontmatter dedicada, espelhando o
  `README.md` do diretório correspondente — só escreve as chaves que vierem
  preenchidas no feed.
- Preserva `README.md` em todos os diretórios MD (não apaga).
- Diretório `intelligence/`: pasta interna do repo continua chamada
  "intelligence" (rota `/i6-intelligence` e arquivos do `src/content/intelligence/`
  já existem); só o **rótulo público** é "i6 Research". O `--type=research`
  serve para casar com o nome da edge no i6Hub (`public-research-feed`).

**Apagar:** `scripts/sync-insights-from-i6hub.mjs` (legado, substituído).

---

### 2. Atualizar workflow

`.github/workflows/deploy-gh-pages.yml`:

- `repository_dispatch.types`: adicionar `research-updated`, `landings-updated`,
  `stories-updated` ao `insights-updated` existente.
- Substituir o step atual "Sync insights from i6Hub CMS" por 4 steps em sequência
  (1 por tipo), cada um chamando o script consolidado com seu `--type` e
  exportando o feed env correspondente + `I6HUB_SYNC_TOKEN`.
- Rodam sempre na ordem: insights → research → landings → stories
  (independentes, mas execução serial deixa logs limpos).

---

### 3. Atualizar `docs/I6HUB_CMS_ROADMAP.md`

- Renomear "i6 Intelligence" → "i6 Research" no item 1 (label e secret
  `I6HUB_FEED_URL_INTELLIGENCE` → `I6HUB_FEED_URL_RESEARCH`).
- Marcar a tabela "CMS já implementado?" como ✅ para os 3 (research, landings,
  stories) — ficou só insights como já-em-produção antes.
- Trocar referências a "3 scripts" pela arquitetura consolidada
  (`scripts/sync-content-from-i6hub.mjs --type=<x>`).
- Refrescar a tabela 5 (secrets) com o novo nome.

---

### 4. Valores dos secrets do GitHub (`Settings → Secrets and variables → Actions`)

| Secret | Valor a colar |
|---|---|
| `I6HUB_FEED_URL_RESEARCH` | `https://<projeto-i6hub>.supabase.co/functions/v1/public-research-feed` |
| `I6HUB_FEED_URL_LANDINGS` | `https://<projeto-i6hub>.supabase.co/functions/v1/public-landings-feed` |
| `I6HUB_FEED_URL_STORIES`  | `https://<projeto-i6hub>.supabase.co/functions/v1/public-stories-feed`  |

`<projeto-i6hub>` é o **mesmo project ref** que você usou em `I6HUB_FEED_URL`
(insights) — abra o secret atual no GitHub para copiar o subdomínio e só troque
o nome da edge function no final do path. Os 3 reaproveitam o
`I6HUB_SYNC_TOKEN` que já existe.

Se preferir confirmar a URL exata, dentro do projeto i6Hub no chat do Lovable
peça "qual é a URL pública da edge function `public-research-feed` /
`public-landings-feed` / `public-stories-feed`".

---

### Fora de escopo
- Nenhum componente React, hook, rota ou conteúdo MD atual será tocado — os
  loaders (`useIntelligence.ts`, `useLandings.ts`,
  `useSuccessStoriesMarkdown.ts`) já leem do formato que o script vai gerar.
- Não criamos secret novo no i6Hub (já tem `GITHUB_DISPATCH_TOKEN` e
  `I6HUB_SYNC_TOKEN`).
- Não alteramos `public/sitemap.xml` nem `public/llms.txt` neste passo
  (continuam manuais — pode virar próximo capítulo do roadmap).

### Critério de aceitação
- Toggle "publish" em qualquer um dos 3 tipos no i6Hub dispara o respectivo
  `repository_dispatch.type`, GitHub Actions roda em 1–2 min, MDs são
  regenerados em `src/content/{intelligence,landings,stories}/` e a build
  publica sem regressão de insights.
