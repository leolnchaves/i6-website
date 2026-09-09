## Detalhes de execução

Arquivos tocados: `src/pages/HomeTeste.tsx`, `src/components/home-v3/HeroSuite.tsx`, `src/components/home-v3/SolutionBands.tsx`, `src/components/home-v3/ClientProof.tsx`.

**HomeTeste** — a primeira dobra passa a ser um único `flex flex-col md:h-[100svh]` com três filhos: hero (cresce), faixas das frentes e prova social (ambas com altura natural). O gap artificial entre faixas e prova social sai; a separação vira a régua superior de cada bloco. O hero recebe `justify-center` para o conteúdo respirar igualmente acima e abaixo em vez de grudar no header.

**HeroSuite** — `pt-32 pb-0` vira um padding vertical simétrico e menor (`pt-24 pb-8`), com o grid `lg:grid-cols-[1.05fr_0.95fr]` mantido e `items-start` preservado para o painel alinhar pelo topo do título. Badge ganha borda em terracota suave (`border-primary/20`) e texto no acento, como no protótipo. Subtítulo sobe para `text-base` com `leading-relaxed` e as três provas ficam no rodapé da coluna esquerda (`mt-auto`), alinhando-se à base do painel. Painel: `p-6`, cabeçalho com mais respiro e três cartões visíveis com `ROW`/`GAP` recalculados para caber na altura disponível (aproximadamente `ROW 104` / `GAP 12`), mantendo a rotação e o hover que pausa.

**SolutionBands** — a `<section>` perde `border-y` e passa a ter apenas `border-t`; fundo único `bg-card/60` nas duas metades (nenhum lado mais chamativo que o outro), divisor central `md:border-l md:border-border`, padding interno generoso (`px-10 py-6`) e hover suave para `bg-card`. O `Saiba mais` mantém destino e seta para baixo; o título ganha hover em terracota.

**ClientProof** — mantém `border-t` (sem `border-b`), fundo areia levemente distinto, rótulo e marquee centralizados, altura estável (`py-5`) e os gradientes laterais de fade preservados.

Sem mudanças em textos, hooks, rotas, âncoras (`#decision-suite`, `#builder-platform`) ou nas seções abaixo da dobra.

**Validação** — typecheck e build; verificação visual em 1280×800 e 1440×900 nos três idiomas, medindo os três intervalos verticais e confirmando que a faixa de logos termina dentro da tela sem rolagem; mobile 390×844 empilhado. Sem release nem deploy.
