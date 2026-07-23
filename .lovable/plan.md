## Problema
No mobile, a barra de tópicos do demo do i6 Signal (Supply, Forecast, Optimal Price, Commercial Focus, Mix/Assortment, PDV) fica em uma única linha horizontal e estoura a largura da tela.

## Solução
Em `src/components/solutions/I6SignalDemo.tsx` (linhas ~622-638), permitir que a barra quebre em várias linhas no mobile, mantendo o visual atual no desktop:

- No wrapper externo `<div className="flex justify-center mb-6">`: manter.
- No container `inline-flex rounded-full ...`: trocar por `flex flex-wrap justify-center gap-1 rounded-2xl md:rounded-full md:inline-flex md:flex-nowrap` para que:
  - No mobile: os botões empilhem em linhas (2-3 linhas), centralizados, com cantos arredondados suaves.
  - No desktop (md+): comportamento atual preservado (pill contínua, uma linha).
- Manter `whitespace-nowrap` em cada botão para que o rótulo de cada tópico não quebre internamente.

## Escopo
- Apenas ajuste visual/responsivo em `I6SignalDemo.tsx`.
- Nenhuma mudança em textos, PT/EN, lógica ou outras seções.
