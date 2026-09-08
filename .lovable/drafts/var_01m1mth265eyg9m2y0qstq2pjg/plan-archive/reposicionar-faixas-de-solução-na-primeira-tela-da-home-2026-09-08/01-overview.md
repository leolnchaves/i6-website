# Reposicionar faixas de solução na primeira tela da home

## Objetivo
Descer as duas faixas do `SolutionBands` para que fiquem visualmente próximas — mas não coladas — à faixa de prova social (`ClientProof`) na primeira tela desktop, preservando o título, o painel animado e a faixa de logos.

## Diagnóstico
Hoje `HomeTeste.tsx` empilha `HeroSuite`, `SolutionBands` e `ClientProof` em um `flex flex-col md:min-h-screen`. O `ClientProof` usa `md:mt-auto`, o que o joga para o fundo da tela e cria um vazio perceptível entre as faixas de solução e a prova social. As faixas acabam flutuando no meio da altura restante.

## Mudanças propostas

### 1. `src/pages/HomeTeste.tsx`
Reagrupar a base da primeira tela:
- Envolver `SolutionBands` + `ClientProof` em um único bloco na parte inferior.
- Fazer com que `HeroSuite` ocupe o espaço vertical restante (`flex-1` ou wrapper crescendo), empurrando o bloco de base para baixo.
- Inserir um pequeno gap entre `SolutionBands` e `ClientProof` para que fiquem próximas, mas não coladas.
- Remover o `md:mt-auto` isolado do `ClientProof` (ele passa a ser posicionado pelo novo grupo de base).

### 2. `src/components/home-v3/SolutionBands.tsx` (se necessário)
Revisar padding interno das faixas para garantir que o novo posicionamento não fique apertado nem perca legibilidade. Não alterar textos, cores, ícones, links ou comportamento de hover.

## Validação
- Visual check em PT/EN/ES nos viewports desktop 1280×800 e 1440×900.
- Mobile 390×844 (esperado empilhamento natural, sem alteração radical).
- `bunx tsgo --noEmit` e `bun run build`.
- Confirmar que a primeira tela continua sem scroll vertical em desktop.

## Sem deploy/release
Ajuste de layout da home; não dispara release/deploy.
