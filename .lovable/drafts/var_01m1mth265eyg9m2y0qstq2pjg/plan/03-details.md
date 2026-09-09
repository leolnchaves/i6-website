## Detalhes de execução

Arquivos tocados: `src/components/home-v3/HeroSuite.tsx`, `src/components/home-v3/SolutionBands.tsx`, `src/components/home-v3/ClientProof.tsx`, `src/pages/HomeTeste.tsx`.

**HeroSuite** — passa a ser `flex flex-col` com três camadas e padding vertical simétrico (`pt-24 pb-6`):
1. Linha superior: badge à esquerda (mantendo o pill com borda e o texto atual) e as três provas à direita em `text-[10px] uppercase tracking-[0.16em]`, separadas por pontos terracota; empilha abaixo de `lg`.
2. Camada central: grid de 12 colunas — título em `col-span-8` com `text-[3.2rem] xl:text-[3.6rem] leading-[0.95] tracking-[-0.04em]` (mantendo as quebras em quatro linhas e `decisão preditiva` em `text-primary`) e subtítulo em `max-w-xl` logo abaixo. A pilha de decisões vai em `col-span-4` com `-ml-16 xl:-ml-24` para sobrepor a coluna do título; cada cartão em `bg-card border-l-2 border-primary` com sombra suave e deslocamentos alternados (`translate-x-2 / translate-x-6 / translate-x-4`) que se anulam no hover.
3. O carrossel atual é preservado: mesma lógica de `cursor`, `slots`, transição e pausa no hover, com `ROW`/`GAP` recalculados (aproximadamente `ROW 92` / `GAP 16`) e cartões contendo tag, frase e métrica em terracota. O cabeçalho "Próxima melhor decisão / agora" vira um rótulo discreto acima da pilha, alinhado à direita.
4. Abaixo de `lg` a pilha volta a ficar em coluna cheia, sem sobreposição negativa.

**SolutionBands** — deixa de ser duas faixas de largura total e passa a ser a camada inferior lateral: `grid grid-cols-12` com Decision Suite em `col-span-3` (alinhada à esquerda) e Builder em `col-span-3` (alinhada à direita, `text-right`, com a seta antes do rótulo), ambas com `border-t border-border pt-4`, eyebrow, título curto, descrição em `text-[13px]` e "Saiba mais" com `ArrowDown`. Os destinos `#decision-suite` e `#builder-platform` não mudam. Abaixo de `md` as duas empilham à esquerda com os logos no fim.

**ClientProof** — perde as bordas e o fundo próprio; vira o miolo central da camada inferior (`col-span-6`), com rótulo centralizado e marquee de logos mantido, incluindo os fades laterais. O componente recebe uma prop opcional de variante para não afetar outros usos, se houver.

**HomeTeste** — a primeira dobra vira um único bloco `md:h-[100svh] flex flex-col`: `HeroSuite` cresce e a camada inferior (`SolutionBands` + `ClientProof` no mesmo grid) fecha a tela. Os gaps intermediários e o `border-y` atual saem.

Sem mudanças em textos, hooks, rotas, âncoras ou nas seções abaixo da dobra.

**Validação** — typecheck e build; verificação visual em 1280×800 e 1440×900 nos três idiomas, confirmando que a faixa de logos termina dentro da tela sem rolagem e que os cartões sobrepostos não cobrem o texto do título; mobile 390×844 empilhado. Sem release nem deploy.
