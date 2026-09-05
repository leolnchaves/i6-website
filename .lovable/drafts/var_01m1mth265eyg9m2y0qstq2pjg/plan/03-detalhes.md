## Detalhes técnicos

**`src/pages/I6Builders.tsx` e `src/pages/Comunidade.tsx`**
- Remover o wrapper `bg-[#0B1224]` em volta de `BuilderFinalCTA` / `CommunityFinalCTA` e o `div` de degradê `h-16 bg-gradient-to-b from-[#0B1224] to-background`.
- Envolver o CTA final + o formulário numa única `section` (mantendo os ids `fale-com-o-time` / `fale-com-a-comunidade` e `scroll-mt-28`), com a linguagem visual do bloco de destaque da home: `bg-accent`, camada `sand-glow` decorativa (`aria-hidden`), borda `border-primary/25`, `rounded-[calc(var(--radius)+8px)]` no container interno e paddings equivalentes (`py-14 md:py-16`, `pb-24` no fim).

**`src/components/i6-builders/BuilderFinalCTA.tsx` e `src/components/comunidade/CommunityFinalCTA.tsx`**
- Trocar as cores fixas de tema escuro por tokens do tema claro: `text-white` → `text-foreground`, `text-white/60` → `text-muted-foreground`, links `text-[#F4845F]` → `text-primary`.
- Botão principal no padrão claro: `bg-primary text-primary-foreground shadow-[var(--sand-shadow-lift)]` com hover `brightness-[1.06]`.
- Remover o padding vertical próprio duplicado (o espaçamento passa a vir da seção que os envolve) e o comentário sobre "faixa navy".

**Sem mudanças em**: `ContactForm.tsx` (endpoint, honeypot, `lead_uid`, normalização, validação, tracking, textos, idiomas), `/contact`, header/rodapé, conteúdo em `src/data/i6Builders/content.ts`.

**Verificação**: checagem de tipos e build; conferência visual em `/pt/i6-builders` e `/pt/community`. Sem lead de teste, sem release.
