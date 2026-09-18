# Faixa de retroalimentação no painel "Do sinal bruto à decisão executada"

## Objetivo

A seção hoje termina em "04 Ativação" e parece um fluxo que se encerra. Vamos fechar o
ciclo dentro do próprio painel, deixando claro que cada decisão executada volta como sinal,
retreina os modelos e compõe resultado — sem criar um quinto card.

## O que construir

Direção escolhida: **conduíte de momentum** — uma faixa de fechamento dentro do painel,
separada dos cards por um filete, em duas colunas:

```text
┌─ i6 DECISION PLATFORM ────────────────────────────────────────────────────┐
│ [01 Captura]  [02 Predição]  [03 Recomendação]  [04 Ativação]             │
│ ------------------------------------------------------------------------ │
│                                                                           │
│  RETROALIMENTAÇÃO            ╭───────────────────────────────────╮        │
│  Cada decisão executada      │   ▮▮▮  (barras de resultado)      │        │
│  volta como sinal, melhora   ╰───────────────────────────────────╯        │
│  o aprendizado dos modelos     retreinamento contínuo →   → resultados    │
│  e escala os resultados.          (ponto pulsante)             compostos  │
└───────────────────────────────────────────────────────────────────────────┘
```

- **Coluna esquerda**: rótulo em coral, em caixa alta, "Retroalimentação", e abaixo a frase
  curta explicando o ciclo.
- **Coluna direita**: o conduíte — uma trilha grossa em degradê coral que sai da ponta
  direita (depois da Ativação), contorna por baixo e retorna à ponta esquerda (de volta à
  Captura de sinais), com um trecho mais claro percorrendo o trajeto, barras crescentes no
  meio sugerindo resultado que se acumula, e pequenos nós ao longo do caminho.
- Dois micro-rótulos acompanham o conduíte: "Retreinamento contínuo" (com um ponto
  pulsante) e "Resultados compostos".
- Nada muda nos quatro cards, no selo "i6 DECISION PLATFORM" nem nos textos existentes.

## Textos (PT / EN / ES)

- Rótulo: Retroalimentação / Feedback loop / Retroalimentación
- Frase: Cada decisão executada volta como sinal, melhora o aprendizado dos modelos e
  escala os resultados. / Every executed decision comes back as a signal, improves model
  learning and scales the results. / Cada decisión ejecutada vuelve como señal, mejora el
  aprendizaje de los modelos y escala los resultados.
- Micro-rótulos: Retreinamento contínuo / Continuous retraining / Reentrenamiento continuo
  e Resultados compostos / Compounding results / Resultados compuestos

## Detalhes técnicos

- Arquivo único alterado: `src/components/home-v3/HowItWorks.tsx`.
- Novos campos de texto entram nos blocos PT, EN e ES já existentes; a lista de quatro
  passos permanece intacta.
- O conduíte é um SVG inline com `viewBox` fixo, traço arredondado e degradê entre dois
  tons da paleta coral; o trecho em movimento usa animação de traço (deslocamento de
  traço interrompido) em loop lento, e o ponto usa pulsação suave.
- Cores vêm dos tokens do tema (primária, borda, texto secundário, sombra do cartão de
  areia), incluindo os pontos de degradê definidos a partir da cor primária — nada de cor
  fixa no componente, para que o painel continue coerente no tema escuro e na versão clara.
- IDs do SVG são prefixados para não colidir com outros SVGs da página.
- A animação é desligada para quem usa "reduzir movimento" no sistema.
- Responsivo: de tablet para cima, rótulo + frase à esquerda e conduíte à direita; no
  celular tudo empilha (rótulo, frase, conduíte) e os micro-rótulos ficam ocultos, sem
  gerar rolagem lateral.

## Verificação

- Checagem de tipos (`tsgo --noEmit`) e log de build.
- Navegação na prévia em PT, EN e ES, em desktop (1280px) e celular (390px): confirmar
  quatro cards, faixa visível dentro do painel, frase correta em cada idioma, animação
  discreta e ausência de rolagem lateral.
