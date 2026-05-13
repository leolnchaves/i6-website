## Objetivo

Adicionar gate de captura de lead em insights marcados como `gated` no MD. Após enviar Nome + Email, o lead é gravado na **mesma planilha do form de contato** (mesmo Apps Script, mesmas colunas) e o conteúdo é liberado inline com botão de download do PDF.

## 1. Marcação no Markdown

Adicionar 2 campos opcionais ao frontmatter de `src/content/insights/*.md`:

```yaml
gated: true
asset_url: /assets/insights/nome-do-pdf.pdf
```

- `gated` (bool, default `false`): se `true`, ativa o gate.
- `asset_url` (string, opcional): caminho do PDF em `public/assets/insights/`. Se ausente, libera só leitura online.

Atualizar `src/hooks/useInsights.ts` para parsear ambos no `InsightFrontmatter` / `Insight`.

## 2. Mapeamento dos campos para a planilha

Reusa o **mesmo endpoint Apps Script** já em uso pelo `ContactForm.tsx`:
`https://script.google.com/macros/s/AKfycbzx_sv6GihHhurFlLvuoYRvjLZOC7TrDHWIayCiJIGO5vvBsGgvUd3ATEmFEuWZxZ6I/exec`

Campos enviados (mesmos nomes que o Apps Script já espera):

| Campo          | Valor                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------|
| `name`         | nome do form                                                                                                      |
| `email`        | email do form                                                                                                     |
| `company`      | `""` (vazio → NULL na planilha)                                                                                   |
| `subscription` | `"FALSE"`                                                                                                         |
| `message`      | `Lead gerado a partir do engajamento com o insight {TÍTULO_INSIGHT} - Página: {URL_ABSOLUTA_DO_INSIGHT}`         |

A coluna `Date` é preenchida automaticamente pelo Apps Script (timestamp do servidor) — não é necessário enviar.

URL absoluta = `https://infinity6.ai/{language}/insights/{slug}`.

## 3. Componente do form

Novo: `src/components/insights/LeadGateForm.tsx`

- Tema dark + coral, alinhado ao restante do site.
- Campos: Nome, Email — validação com `zod` (nome 1–100, email válido até 255).
- Texto introdutório: "Para acessar este conteúdo, deixe seu nome e email." (PT) / "To access this content, leave your name and email." (EN).
- Botão "Acessar conteúdo" / "Access content".
- Submit usa **a mesma técnica do `ContactForm`**: cria form oculto + iframe oculto, faz POST para o Apps Script (evita CORS), remove os elementos após 1s.
- Toast de sucesso, idêntico em estilo ao do contato.
- Nota de privacidade abaixo: "Ao enviar, você concorda com nossa Política de Privacidade." com link para `/privacy`.

## 4. Lógica de gate na página do artigo

Em `src/pages/InsightArticle.tsx`:

- Se `insight.gated === true` E slug não está em `localStorage["i6_unlocked_insights"]` → renderiza `<LeadGateForm />` no lugar do corpo do artigo (mantém header, cover, SEO).
- Após sucesso do form: adiciona slug ao array em `localStorage` → estado local libera o conteúdo na hora.
- Se `asset_url` presente, mostrar botão **"Baixar PDF"** no topo do conteúdo desbloqueado (link para `getPublicAssetUrl(asset_url)`).
- Se `gated === false` (default), comportamento atual segue inalterado.

## 5. PDFs

Ficam em `public/assets/insights/*.pdf`, servidos estaticamente pelo GH Pages. `asset_url` no MD aponta pro caminho relativo (resolvido por `getPublicAssetUrl`).

## 6. Cobertura de idioma

Toda string do form e do botão de download tem versões PT/EN baseadas em `useLanguage()`.

## Arquivos tocados

**Novos:**
- `src/components/insights/LeadGateForm.tsx`

**Editados:**
- `src/hooks/useInsights.ts` — parse `gated`, `asset_url`
- `src/pages/InsightArticle.tsx` — lógica do gate + botão download
- `src/content/insights/*.md` — marcar 1 insight de exemplo como `gated: true` com `asset_url` (placeholder até PDF real ser anexado)

**Sem mudanças necessárias:**
- Nenhum backend, edge function, Supabase, Cloud ou serviço de email.
- Nenhuma alteração no Apps Script (vai gravar normalmente, com `subscription="FALSE"` diferenciando o lead de gate dos outros).

## Próximos passos após aprovação

1. Implementar `useInsights` (parse dos 2 campos novos).
2. Criar `LeadGateForm`.
3. Integrar lógica de gate no `InsightArticle`.
4. Marcar 1 insight como `gated: true` para QA visual.
5. Testar submit no preview → verificar se o lead aparece na planilha.
