## Objetivo

Resolver dois pontos no fluxo do i6 Research, mexendo o mínimo possível:

1. O item marcado como `gated: true` no i6Hub não está travando a visualização no site.
2. Quando o Research tem PDF anexado (`asset_url`), o site exibe o texto do corpo em vez de mostrar uma confirmação de "PDF enviado por e-mail", com opção de **reenviar**.

Importante: o PDF **não fica hospedado no site** — ele vive só no i6Hub e é enviado por e-mail via Apps Script. Por isso, **não** existe botão "Baixar PDF" — o botão é **Reenviar por e-mail**.

## Diagnóstico

- Feed do i6Hub confirma `gated: true` e `has_asset: true` para `ruptura-gondola-ia-preditiva` (EN).
- `scripts/sync-content-from-i6hub.mjs` (linha 276) grava `gated: ${!!it.gated}`. Se o valor chega, ele vai pro MD. Como o site está exibindo o corpo, algo se perdeu entre feed e MD gerado no build.
- Em `IntelligenceArticle.tsx`, mesmo após `unlocked`, ele sempre renderiza `<ReactMarkdown>{piece.content}</ReactMarkdown>`. Não há tratamento especial para Research com PDF.

## Plano (2 mudanças cirúrgicas)

### 1) Log de diagnóstico no sync (Research)

Em `scripts/sync-content-from-i6hub.mjs`, no laço que processa Research, imprimir uma linha por item:

```
[research] slug=<slug> lang=<lang> gated_raw=<it.gated> gated_out=<!!it.gated> has_asset=<!!it.asset_url>
```

Sem mudança de lógica — só observabilidade. Assim, o log do próximo deploy no GitHub Actions mostra exatamente o que o feed enviou. Se `gated_raw` vier `undefined`, corrigimos com uma linha (`it.gated ?? it.is_gated`) numa segunda passada.

### 2) Comportamento correto para Research com PDF (`asset_url` presente)

Em `src/pages/IntelligenceArticle.tsx`, quando `piece.asset_url` existir:

- **`isLocked`** → continua mostrando o `LeadGateForm` como hoje (sem mudança). Ao submeter, o Apps Script já dispara o e-mail com o PDF via i6Hub.
- **`unlocked`** → em vez de renderizar o markdown do corpo, mostrar um bloco de confirmação com:
  - Ícone + título: "PDF enviado para o seu e-mail" / "PDF sent to your email"
  - Subtítulo curto: "Verifique sua caixa de entrada — se não achar, olhe a pasta de SPAM."
  - Botão **Reenviar por e-mail** / **Resend to my email** → abre um mini-form (mesmos campos nome + email do `LeadGateForm`) e, ao confirmar, dispara **exatamente o mesmo submit** do `LeadGateForm` (mesmo endpoint Apps Script, mesmo payload `subscription=research:<slug>`, mesmos campos de tracking, mesmo evento `RESEARCH_UNLOCKED`). Ou seja, o backend/i6Hub recebe outro lead com a mesma assinatura e reenvia o PDF.
  - Mantém a seção final com cross-links (`related_product`, `related_story_slug`) e o CTA "Colocar Dados em Movimento" já existentes.

Quando **não há** `asset_url`, o comportamento continua como hoje (renderiza o markdown normalmente após unlock).

### Como implementar o "Reenviar" sem duplicar código

`LeadGateForm` já sabe fazer o submit correto. Duas opções, escolhemos a mais simples:

- **A)** Adicionar uma prop `mode?: 'gate' | 'resend'` em `LeadGateForm`. Em `resend`, muda apenas os textos ("Reenviar por e-mail", "PDF reenviado"). Toda a lógica de submit e tracking é reutilizada.
- **B)** Extrair a função `onSubmit` para um hook e usar em ambos os lugares.

Vamos com **A** — menor superfície de mudança, mesmo evento, mesmo payload.

### O que NÃO muda

- Endpoint Apps Script, `SHARED_FORM_TOKEN`, campos de tracking — nada disso muda.
- `useIntelligence.ts` — já lê `gated` e `asset_url` corretamente.
- Conteúdo dos MDs em `src/content/intelligence/` — são regenerados pelo sync.
- Nenhum outro arquivo/rota.

## Como validar depois do deploy

1. Log do job "Sync research from i6Hub CMS" no GitHub Actions → conferir `[research] slug=ruptura-gondola-ia-preditiva gated_raw=true gated_out=true has_asset=true`.
2. Abrir `/en/i6-intelligence/ruptura-gondola-ia-preditiva`:
   - Deve aparecer o `LeadGateForm`.
   - Após submeter → recebe o PDF por e-mail **e** a tela mostra "PDF sent to your email" com botão **Resend to my email**.
   - Clicar em Resend, preencher nome+email → e-mail é reenviado (novo lead registrado com `subscription=research:<slug>`).
