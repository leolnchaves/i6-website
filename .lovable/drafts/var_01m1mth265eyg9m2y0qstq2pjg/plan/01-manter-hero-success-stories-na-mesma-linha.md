# Manter título do hero de /success-stories em uma única linha

## O que será feito
Remover a quebra de linha (`<br />`) entre `hero.title` e `hero.subtitle` no componente `SuccessStoriesHero.tsx`, mantendo ambos os textos inalterados e o span do subtitle inline.

## Arquivo alterado
- `src/components/success-stories/SuccessStoriesHero.tsx`

## Mudança exata
- Deletar a tag `<br />` na linha 32.
- O `hero.subtitle` continua envolvido por `<span className="text-primary">` e renderizado dentro do mesmo `<h1>`.

## Validação
- Verificar visualmente PT/EN/ES para garantir que o título e subtítulo fiquem na mesma linha sem truncamento em viewports desktop e mobile.
- Build/typecheck após a edição.

## Fora de escopo
Nenhuma alteração de texto, dados, traduções ou outros componentes.