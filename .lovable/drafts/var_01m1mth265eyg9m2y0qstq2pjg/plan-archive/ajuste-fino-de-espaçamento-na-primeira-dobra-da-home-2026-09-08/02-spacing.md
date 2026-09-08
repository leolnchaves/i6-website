## Ajustes específicos

### 1. HeroSuite — descer o bloco

Em `src/components/home-v3/HeroSuite.tsx`, aumentar o padding superior do container interno:

- Mobile: `pt-28` → `pt-32`
- Desktop: `md:pt-28` → `md:pt-36`

Isso cria mais respiro entre o header fixo e o conteúdo do hero, posicionando o bloco um pouco mais baixo.

### 2. SolutionBands — subir o bloco

Em `src/components/home-v3/SolutionBands.tsx`, reduzir o padding vertical interno das faixas para que o conteúdo ocupe menos altura e fique visualmente mais próximo do hero:

- Mobile: `py-0` → manter `py-0` (já está mínimo)
- Desktop: `md:py-0` → manter `md:py-0`
- Desktop largo: `xl:py-3` → `xl:py-2`

Se necessário, reduzir ainda mais para `xl:py-1.5` durante a validação visual.

### 3. HomeTeste — espaço entre faixas e prova social

Em `src/pages/HomeTeste.tsx`, ajustar o gap entre `SolutionBands` e `ClientProof` para ficar visualmente próximo dos outros espaços:

- `<div className="h-1 md:h-1.5" />` → `<div className="h-2 md:h-2.5" />`

Isso aumenta levemente o respiro entre as faixas e a prova social, aproximando-o do espaço hero → faixas.

### 4. ClientProof — ajuste de altura (condicional)

Se a validação em 1280×800 mostrar que a prova social ainda extrapola a tela, reduzir o padding vertical em `src/components/home-v3/ClientProof.tsx`:

- `py-5` → `py-4`

Essa alteração só será aplicada se o teste visual indicar necessidade.

## Validação

- Visual check em PT/EN/ES nos viewports desktop 1280×800 e 1440×900.
- Mobile 390×844 (esperado empilhamento natural, sem alteração radical).
- Confirmar que a faixa de logos continua visível sem scroll vertical em desktop.
- `bunx tsgo --noEmit` e `bun run build`.

## Sem deploy/release

Ajuste de layout da home; não dispara release/deploy.
