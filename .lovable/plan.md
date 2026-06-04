## Mudança no fluxo de gated insights

Form captura nome+email → envia ao Apps Script (CRM) → exibe confirmação. **Nada é desbloqueado.** Conteúdo e PDF seguem ocultos. Material chega por email via CRM.

### 1. `src/components/insights/LeadGateForm.tsx`
- Remover prop `onUnlock` e a chamada `onUnlock()`.
- Remover gravação em `localStorage` (`i6_unlocked_insights`).
- Após submit com sucesso, trocar o form por estado de confirmação:
  - Ícone de check (coral), título "Pedido recebido" / "Request received".
  - Mensagem PT: "Recebemos seu pedido. Em instantes você receberá o material no email informado."
  - Mensagem EN: "We received your request. You'll receive the material at the provided email shortly."
- Manter: iframe POST ao Apps Script, validação Zod, link de Política de Privacidade.

### 2. `src/pages/InsightArticle.tsx`
- Remover state `unlocked` e o `useEffect` que lia `localStorage`.
- `isLocked = insight.gated === true` (sempre bloqueado se gated).
- Remover prop `onUnlock` no `<LeadGateForm>`.
- Markdown e botão de PDF nunca aparecem em insights gated.

### 3. Limpeza de `localStorage`
- Adicionar pequeno efeito (em `InsightArticle.tsx` ou `App.tsx`) que executa uma vez e remove a chave legada `i6_unlocked_insights` do navegador do visitante.

### Inalterado
- Frontmatter `gated`/`asset_url`, sync do i6Hub, Apps Script recebendo leads, arquitetura 100% estática.
