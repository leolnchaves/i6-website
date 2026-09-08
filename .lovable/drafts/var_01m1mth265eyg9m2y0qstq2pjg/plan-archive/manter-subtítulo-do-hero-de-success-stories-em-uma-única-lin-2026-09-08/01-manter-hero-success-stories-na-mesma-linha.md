# Manter subtítulo do hero de /success-stories em uma única linha

## O que será feito
Adicionar `whitespace-nowrap` ao `<span>` que envolve `hero.subtitle` no componente `SuccessStoriesHero.tsx`, garantindo que o texto "Resultados comprovados." não quebre em mais de uma linha. O `<br />` entre título e subtítulo permanece, e todos os textos continuam inalterados.

## Arquivo alterado
- `src/components/success-stories/SuccessStoriesHero.tsx`

## Mudança exata
- Alterar a classe do span do subtitle de `className="text-primary"` para `className="text-primary whitespace-nowrap"`.
- Manter `<br />`, `hero.title`, `hero.description`, eyebrow e contador exatamente como estão.

## Validação
- Verificar visualmente PT/EN/ES para garantir que o subtítulo fique inteiro na segunda linha, sem truncamento ou overflow, em viewports desktop e mobile.
- Build/typecheck após a edição.

## Fora de escopo
Nenhuma alteração de texto, dados, traduções, quebra de linha entre título/subtítulo ou outros componentes.