Ajustar a apresentação do destaque de custo zero na seção "Como implementamos" de `/solutions-v2` para que ele fique colado nos cards dos passos 1, 2 e 3, sobrepondo parcialmente a borda inferior desses cards.

Alterações propostas:

1. Remover o pill centralizado atual (entre título e grid de passos).
2. Adicionar um badge/label "Custo zero" que sobrepõe os cards 01, 02 e 03, posicionado na parte inferior do card com `absolute` e sobreposição negativa (`-bottom-3` ou similar) para criar o efeito de "colado" sobrepondo o card - não é um badge por card, mas um bagde unico, extenso, cobrindo os 3 cards.
3. Manter a legibilidade: fundo escuro com borda/accento coral, texto claro, sombra sutil para separar do fundo da seção.
4. Preservar o texto completo do destaque no bagde único.

Arquivos envolvidos:

- `src/data/solutionsV2/content.ts` — ajustar estrutura do `howWeImplement` para remover o `costNote` centralizado e adicionar um campo de destaque por passo (ex: `zeroCost: true` nos passos 1–3, com texto do badge).
- `src/components/solutions-v2/HowWeImplement.tsx` — renderizar o badge nos cards 01–03 com posicionamento absoluto e sobreposição na borda inferior, e ajustar espaçamento do container para evitar colapso visual.

Observação: ajuste aplicado apenas na versão PT de `/solutions-v2`.