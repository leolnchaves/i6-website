## Objetivo
Reordenar a Hero **apenas em ENG** para testar: título um pouco mais abaixo, descrição logo abaixo do título, e a imagem descendo até ficar próxima do botão CTA.

## Layout atual (ambos idiomas)
1. Título
2. Imagem (ocupa o meio, `flex-1`)
3. Descrição + CTA

## Layout proposto (apenas EN)
1. Título (com `pt` maior para descer um pouco)
2. Descrição (movida para logo abaixo do título)
3. Imagem (mesma proporção/tamanho `w-[90%]` e `max-h-[50vh]/[48vh]`, mas colada ao CTA)
4. CTA (sozinho no bloco inferior)

PT continua exatamente como está hoje.

## Mudanças em `src/components/hometeste/HeroDecisaoV4.tsx`
- Renderização condicional por `isPt`:
  - **EN**: novo JSX com a ordem Título → Descrição → Imagem (`flex-1`) → CTA. Aumentar `pt` do título (ex.: `pt-[12vh] md:pt-[15vh]`) para descê-lo. Descrição colocada em um bloco logo abaixo do título com `mt-6`. Imagem mantém `w-[90%]`, `max-h-[50vh] md:max-h-[48vh]`, `object-contain` e o `clipPath` atual — só muda a posição no fluxo (fica próxima do CTA porque a descrição saiu de perto do botão). CTA fica sozinho no bloco final com `pb-[2vh] md:pb-[3vh]`.
  - **PT**: mantém o JSX atual sem alterações.

Sem mudanças em assets, estilos globais, i18n ou em outros componentes.

## Validação
- Abrir `/en` e confirmar: título um pouco mais baixo, descrição logo abaixo, imagem descendo próxima do CTA, botão visível acima da dobra, imagem sem deformação.
- Abrir `/` (PT) e confirmar que nada mudou.