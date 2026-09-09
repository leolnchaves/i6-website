# Centralizar hero entre header e faixas de soluções

## Problema
Com a mudança anterior (`lg:items-center` no grid), o conteúdo da hero ficou encostado demais nas faixas de soluções — visualmente "estourando" contra elas, em vez de flutuar centrado no espaço disponível.

## Correção (1 arquivo: `src/components/home-v3/HeroSuite.tsx`)

O grid central já é `flex-1` (ocupa todo o espaço entre a faixa superior — badge/provas — e o fim da seção). O problema é que o alinhamento vertical do conteúdo não está distribuindo esse espaço de forma simétrica.

Ajuste:

1. **Remover a margem superior fixa do grid** (`mt-10 lg:mt-12`) e deixar o espaçamento vir do próprio flex: o grid `flex-1` passa a centrar seu conteúdo no espaço livre, em vez de começar a uma distância fixa do topo.
2. **Manter `lg:items-center`** — colunas esquerda (badge + título + descrição) e direita (rótulo + cards animados) ficam ambas centralizadas verticalmente uma em relação à outra e ao espaço disponível entre header e faixas de soluções.
3. Garantir uma margem inferior mínima (`mb-6` ou similar) no grid para que os cards nunca colem visualmente nas faixas, mesmo em viewports mais baixos (Mac 13").

Resultado: o bloco inteiro da hero (as duas colunas) fica verticalmente centrado na área entre o header e as faixas de soluções, com respiro simétrico em cima e embaixo.

## Fora de escopo
- Textos, animação dos cards, faixas de soluções, prova social e mobile (já empilha naturalmente) — nada muda.

## Verificação
- Screenshot 1280×800 (Mac 13) e 1440×900: espaço acima e abaixo do bloco hero visualmente simétrico; cards não colidem com as faixas.
- Mobile 390×844: ordem e espaçamentos inalterados.
- Typecheck/build.
