## Objetivo

1. Remover o botão "Download PDF" / "Baixar PDF" dos artigos de Research e Insights — o PDF é sempre enviado por email pelo i6Hub.
2. Unificar o CTA do formulário de lead-gate para "Liberar conteúdo" (PT) / "Unlock content" (EN), cobrindo tanto o caso "apenas email" (Insights) quanto "leitura inline + email" (Research).

## Mudanças

### 1. `src/pages/IntelligenceArticle.tsx`
- Remover o bloco do botão Download PDF (linhas ~176–188), incluindo o `<Button asChild>` com `<a href={pdfUrl} download>`.
- Remover o import de `Download` do `lucide-react` se não for mais usado.
- Manter a variável `pdfUrl` apenas se ainda for passada ao `LeadGateForm` (é — segue passando para tracking/i6Hub).

### 2. `src/pages/InsightArticle.tsx`
- Mesma remoção do bloco de Download PDF (linhas ~174–186) e do import `Download` se ficar órfão.

### 3. `src/components/insights/LeadGateForm.tsx`
- Trocar o texto do CTA:
  - PT: `cta: 'Liberar conteúdo'`
  - EN: `cta: 'Unlock content'`
- Manter `sending` ("Enviando..." / "Sending...") e toda a lógica intacta.
- Mensagens de sucesso (`successMsgBefore`, etc.) permanecem como estão — já cobrem bem o caso "enviamos por email".

## Fora do escopo
- Não mexer no fluxo de envio (Apps Script), nem no `LeadGateKind`, nem no comportamento pós-submit (Research revela inline, Insights mostra tela de sucesso). Apenas remover o botão de download e ajustar a label do CTA.
- Nenhuma mudança em `public/content/` ou no schema dos arquivos MD.
