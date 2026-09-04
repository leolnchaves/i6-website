# Typewriter caractere por caractere em /i6-builders

Trocar a animação do painel de código da hero de linha-por-linha para caractere-por-caractere, com cadência de digitação humana e zero reflow.

## O que muda

1. **Granularidade por caractere** — o hook `useTypewriter` deixa de contar linhas e passa a contar caracteres sobre o código completo. O cursor acompanha a posição exata do último caractere digitado.
2. **Cadência humana** — ~40ms por caractere com variação aleatória de ±15ms a cada tecla, mais uma pausa extra de ~350ms a cada quebra de linha antes de começar a próxima.
3. **Anti-reflow por linha** — cada linha ganha uma camada "fantasma" com o texto completo invisível (reservando largura e quebra finais desde o primeiro frame) e o texto digitado fica sobreposto por cima, crescendo sem nunca alterar a largura ocupada.

## O que se mantém (já aprovado)

- Ao terminar: cursor piscando ao final do bloco, sem loop.
- `aria-hidden` no bloco animado + código completo em `sr-only` para leitores de tela.
- `prefers-reduced-motion` mostra tudo de imediato, sem elemento duplicado.
- Escopo: apenas `BuilderHero.tsx`. Nenhum painel de `/community` é tocado.

## Verificação

Build, checagem de tipos e inspeção visual em PT/EN/ES, desktop e mobile, incluindo a animação em andamento (não só o estado final).
