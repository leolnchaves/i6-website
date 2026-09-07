## Detalhes técnicos

Escopo: `src/pages/IntelligenceArticle.tsx`, `src/pages/InsightArticle.tsx`, `src/components/insights/LeadGateForm.tsx`. Sem mudança em hooks de conteúdo, listagens, sync ou `.md`.

### `IntelligenceArticle.tsx`
- Remover o ramo `piece.asset_url ?` que hoje substitui a página. Passa a existir um só ramo de conteúdo: `isLocked ? <LeadGateForm/> : <corpo + extras>`.
- Novo bloco `AssetDelivery` (extraído do cartão atual "PDF enviado para o seu e-mail" + botão de reenvio + `LeadGateForm mode="resend"`), renderizado **depois** do corpo e antes do CTA quando `piece.asset_url` existir. Estado `resendOpen` preservado.
- Quando `piece.content.trim() === ''` e existir `asset_url`, o bloco de entrega assume o lugar do corpo (comportamento de hoje para peças sem texto).
- CTA (`cta_form` + `cta_form_text`) e cross-links (`related_product`, `related_story_slug`) passam a valer também para peças com `asset_url` — hoje o CTA nunca aparecia nesse ramo. Fim do trecho de cross-links duplicado.

### `InsightArticle.tsx`
- `isLocked` passa a considerar desbloqueio: `insight.gated === true && !unlocked`, com `unlocked` lido de `localStorage` na chave `i6_unlocked_insight:<slug>:<language>` (mesmo padrão da chave de research, que continua intacta).
- `LeadGateForm` recebe `onUnlock={() => setUnlocked(true)}` **apenas quando há corpo** (`insight.content.trim() !== ''`). Sem corpo, segue sem `onUnlock` e o formulário exibe a confirmação de e-mail como hoje.
- Limpeza de chave legada existente permanece.

### `LeadGateForm.tsx`
- Hoje o desbloqueio está condicionado a `kind === 'research'`. Passa a valer para qualquer `kind` quando `mode === 'gate'` e `onUnlock` foi informado; a chave gravada é `i6_unlocked_research:` para research e `i6_unlocked_insight:` para os demais.
- Eventos de tracking, campos enviados, `subscription`, `reason`, honeypot e endpoint permanecem exatamente como estão.

## Verificação

- Checagem de tipos e build.
- Research aberta com `asset_url` (arquivo temporário): artigo visível, bloco do PDF depois do texto, reenvio funcionando, CTA e relacionados presentes.
- Research aberta sem `asset_url`: página idêntica à de hoje.
- Research bloqueada: gate, envio libera o texto e sobrevive a recarregar (comportamento atual).
- eBook e artigo de blog bloqueados com corpo: envio libera o texto e sobrevive a recarregar.
- Peça bloqueada sem corpo: continua na tela de confirmação por e-mail.
- Mídia com `external_url` e sem `gated`: continua abrindo em nova aba.

Sem release nem deploy. O envio de leads é real: o teste de formulário usará dados claramente fictícios.
