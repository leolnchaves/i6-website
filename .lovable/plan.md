# Cabeçalho padrão nas páginas de políticas

## Problema

Com o novo visual claro (fundo areia) das páginas /privacy-policy e /ethics-policy, o cabeçalho do site fica transparente no topo — e como o texto do menu é branco, ele fica ilegível sobre o fundo claro (visível no print enviado).

O cabeçalho já tem uma lista de "páginas claras" (`isLightPage` em `src/components/hometeste/HeaderNovo.tsx`, linha 94) que força o fundo navy com leve transparência e desfoque — o mesmo padrão das demais páginas claras do site (contato, blog, insights etc.). As duas rotas de políticas ainda não estão nessa lista.

## O que será feito

1. Em `src/components/hometeste/HeaderNovo.tsx`, adicionar `/privacy-policy` e `/ethics-policy` à lista `isLightPage` (comparação por caminho sem prefixo de idioma, então já vale para /pt, /en e /es).
2. Resultado: nas páginas de políticas, o cabeçalho fica com o fundo navy sólido desde o topo — idêntico ao das demais páginas claras — com o menu branco legível.
3. O painel lateral (drawer) não muda: ele se sobrepõe ao cabeçalho e já tem o visual areia/coral aprovado.

## Validação

- Playwright: abrir /pt/privacy-policy e /pt/ethics-policy, conferir o cabeçalho navy legível no desktop e no celular, sem rolagem lateral.
- Conferir que o drawer continua abrindo normalmente pelo rodapé.
- `bunx tsgo --noEmit` e checagem do build.
