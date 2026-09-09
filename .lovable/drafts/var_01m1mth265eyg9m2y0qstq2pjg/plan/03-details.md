## Detalhes de execução

Arquivos tocados: `src/components/home-v3/HeroSuite.tsx`, `src/components/home-v3/SolutionBands.tsx`, `src/components/home-v3/ClientProof.tsx`, `src/pages/HomeTeste.tsx`.

**HeroSuite** — vira `flex flex-col` com padding vertical simétrico (`pt-24 pb-6`) e três blocos:
1. Linha superior: o pill do badge (texto atual, mantido) à esquerda e as três provas à direita em `text-[11px]` com marcadores terracota; abaixo de `lg` as provas descem para uma linha própria.
2. Camada central: grid de 12 colunas — título em `col-span-7` **sem qualquer mudança de tipografia**: mesmas classes atuais (`text-[2.1rem] sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.08]`), mesmas quebras e `decisão preditiva` em `text-primary`; subtítulo logo abaixo em `max-w-xl`. Pilha em `col-span-5`, alinhada à direita, com `-ml-8 xl:-ml-16` para sobrepor de leve a coluna do título.
3. A animação é **exatamente a atual**: o mesmo `cursor`/`slots`/`ROW`/`GAP`, o cartão que sai recebendo `opacity 0` em fade, o novo entrando pela base com `animate-decision-fade` e a mesma curva `cubic-bezier(.22,1,.36,1)` de 0,6s; hover continua pausando. Só o visual do cartão muda: `bg-card`, `border-l-2 border-primary`, sombra suave e deslocamento horizontal alternado leve (`translate-x-0 / translate-x-3 / translate-x-1.5`). O cabeçalho "Próxima melhor decisão / agora" fica como rótulo discreto acima da pilha, alinhado à direita, sem o cartão branco externo.
4. Abaixo de `lg`, pilha em coluna cheia, sem sobreposição negativa.

**SolutionBands** — deixa de ser duas faixas com fundo e vira a camada de escolha: `border-t border-border` no topo, `grid md:grid-cols-2` com `md:divide-x md:divide-border`, padding interno amplo (`px-0 md:pr-12 / md:pl-12`, `py-8`). Cada coluna: número `01`/`02` em `text-4xl font-bold text-primary/25 leading-none`, nome em `text-xl md:text-2xl font-bold`, descrição atual em `text-sm text-muted-foreground` e "Saiba mais" em `text-[11px] uppercase tracking-widest` com `ArrowDown`, hover em terracota. Destinos `#decision-suite` e `#builder-platform` inalterados. As descrições longas atuais são mantidas; a coluna acomoda duas linhas.

**ClientProof** — perde as bordas duplas e o fundo próprio; vira uma linha fina sob as colunas: `border-t border-border pt-4`, rótulo à esquerda e marquee de logos à direita (com os fades laterais preservados), empilhando e centralizando abaixo de `md`.

**HomeTeste** — a primeira dobra vira um bloco único `md:h-[100svh] flex flex-col`: `HeroSuite` cresce e a camada inferior (`SolutionBands` + `ClientProof`) fecha a tela. Os gaps intermediários e o `border-y` atual saem.

Sem mudanças em textos, hooks, rotas, âncoras ou nas seções abaixo da dobra.

**Validação** — typecheck e build; verificação visual em 1280×800 e 1440×900 nos três idiomas, confirmando que os logos terminam dentro da tela sem rolagem, que a animação dos cartões continua idêntica e que o título ficou intacto; mobile 390×844 empilhado. Sem release nem deploy.
