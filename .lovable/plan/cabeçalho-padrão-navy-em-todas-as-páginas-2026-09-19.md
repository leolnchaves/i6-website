# Cabeçalho padrão navy em todas as páginas

## O que aconteceu

As páginas de privacidade e ética ganharam o fundo claro (areia), mas o cabeçalho do site só fica navy em uma lista fixa de endereços. Como as duas não estavam na lista, ele ficou transparente e o menu branco ficou ilegível sobre o areia.

Em vez de só acrescentar as duas à lista, o cabeçalho passa a ser sempre o padrão navy — como você pediu, já que nenhuma página precisa dele claro.

## O que será feito

1. Em `src/components/hometeste/HeaderNovo.tsx`, o cabeçalho sempre usa o fundo navy com leve transparência, desfoque e sombra (o mesmo visual de hoje quando a página está rolada).
2. Remover a lista de endereços que hoje decide quando o cabeçalho escurece, junto com o código que vigia a rolagem só para esse efeito — o cabeçalho deixa de depender de qualquer lista.
3. Nenhuma página precisa ser incluída manualmente; as políticas e qualquer página futura já nascem com o cabeçalho padrão.
4. O painel lateral (drawer) das políticas não muda: continua areia/coral, por cima do cabeçalho.
5. Nenhum texto é alterado.

## Efeito colateral bom

A tela de endereço inexistente também tem fundo claro e hoje mostra o menu branco ilegível — com o cabeçalho sempre navy ela fica legível também.

## Detalhe para você decidir

Nos casos de sucesso individuais, a foto de capa ocupa o topo inteiro da tela e hoje o cabeçalho é invisível sobre ela. Com o cabeçalho sempre navy, a faixa do menu aparece no topo da foto (a foto continua aparecendo inteira logo abaixo). É o preço de ter o menu sempre legível; se preferir a capa limpa nesses casos, me avise que mantenho o transparente só ali.

## Validação

- Conferir no navegador: /pt/privacy-policy, /pt/ethics-policy, /pt, /pt/contact, um caso de sucesso, /pt/docs e um endereço errado — o menu navy legível em todos, no computador e no celular, sem rolagem lateral.
- Conferir que o painel continua abrindo pelo rodapé, fechando no X, no Esc e clicando fora.
- Checagem de tipos e do build.
