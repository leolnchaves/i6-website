## Detalhes técnicos

Arquivos tocados (apenas dois):

1. `src/data/comunidade/placeholders.ts`
   - Ajuste fino de `place` nos cinco itens de `OPENING_IMAGES` para fechar os vãos (sem alterar a interface).
   - Nova constante `OPENING_CODE_CARDS: OpeningCodeCard[]` com três itens: `id`, `place` (posição/tamanho absolutos, lg+), `tilt`, `opacity`, `title` (nome de arquivo monoespaçado) e `lines: string[]` — trechos curtos e neutros (chamada de SDK, treino, deploy), sem dados de cliente.

2. `src/components/comunidade/CommunityOpening.tsx`
   - Renderiza os cartões dentro da camada `aria-hidden` decorativa existente (`hidden lg:block`), com o mesmo `animate-sand-rise` e delays escalonados.
   - Estilo do cartão reusa o vocabulário do painel de i6-builders: `bg-[#0B1224]`, `border-[#0B1224]/15`, barra com três pontos (o primeiro `#F4845F`), `font-mono text-[11px] leading-[1.7] text-white/75`, linhas iniciadas por `#` em `text-white/35`.
   - Abaixo de `lg`: a faixa horizontal mantém dois recortes de foto e passa a ter um mini cartão de código como terceiro item, mesma altura, sem overflow e sem sobreposição.
   - Respeita `prefers-reduced-motion` pelo mesmo caminho já usado (`motion-reduce`), e os cartões seguem `pointer-events-none`.

Sem mudanças em rota, SEO, formulário, `leadSource`, textos de conteúdo (`content.ts`) ou nas demais seções. Ao final: typecheck, build e captura desktop/mobile PT.
