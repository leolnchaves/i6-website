## Detalhes técnicos

**Novo componente** `src/components/docs/DocsSupport.tsx`
- `<section>` com `rounded-2xl border border-border bg-card p-5`, título `text-sm font-semibold` + linha de apoio `text-sm text-muted-foreground`.
- `<ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">` com cartões `rounded-xl border border-border bg-muted/20 p-4`: ícone lucide (`Mail`, `MessageCircle`, `MessagesSquare`), rótulo, descrição `text-xs`, `Badge variant="secondary" size="sm"` para disponibilidade e botão `Button variant="outline" size="sm"` no rodapé do cartão.
- E-mail: `<Button asChild>` com `mailto:performance@infinity6.ai`. WhatsApp e Assistente: botão `disabled` com o texto "Em breve"/"Coming soon"/"Muy pronto".
- Componente sem estado, dados vindos de props/constante local — nenhuma chamada de rede, nenhum dado do i6 HUB.

**Textos** em `src/data/docs/content.ts`
- Estender `DocsUiCopy` com `support: { title, body, comingSoon, channels: { email: {...}, whatsapp: {...}, assistant: {...} } }` e preencher nos três idiomas (base pt do i6 Decision Suite; EN/ES traduzidos).

**Integração** em `src/components/docs/DocsShell.tsx`
- Renderizar `<DocsSupport copy={copy.support} />` depois de `<DocsPager />`, dentro do `<article>`, com `mt-12`.
- Nenhuma alteração no grid sticky, no índice lateral, na busca ou nas páginas de vídeo/download.

**Fora de escopo**: número real de WhatsApp, cartão de central de ajuda, assistente funcional, release/deploy.

**Verificação**: `npx tsgo --noEmit`, `bun run build` e screenshots de `/pt/docs/...` e `/en/docs/...` confirmando o bloco acima do rodapé.
