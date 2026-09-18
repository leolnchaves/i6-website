# Fechar o loop de aprendizado em "Do sinal bruto à decisão executada"

## Objetivo

A seção hoje termina em "04 Ativação" e passa a impressão de fluxo linear e descartável.
Vamos deixar explícito que o ciclo se realimenta — cada decisão executada vira sinal de
treino — sem adicionar um quinto card ao painel.

Depois de comparar três tratamentos lado a lado, o escolhido é o mais discreto: um trilho
pontilhado com um pequeno marcador coral na ponta que volta para a primeira etapa, e a
frase logo abaixo. Sem arco grande, sem pílula colorida, sem mudança no painel existente.


## O que muda

Dentro do painel existente do i6 Decision Platform (o mesmo que hoje guarda os 4 passos),
abaixo da linha de cards, entra uma faixa de fechamento com três partes:

```text
┌─ i6 DECISION PLATFORM ──────────────────────────────────────────────┐
│  [01 Captura]  [02 Predição]  [03 Recomendação]  [04 Ativação]      │
│                                                                     │
│  (↺) ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●    │
│  Cada decisão executada volta como sinal, melhora o aprendizado     │
│  dos modelos e escala os resultados.                                │
└─────────────────────────────────────────────────────────────────────┘
```

1. **Seta de retorno**: um pequeno círculo com ícone de repetição à esquerda e uma linha
   pontilhada que atravessa o painel até um ponto de destaque à direita. Lê-se como o
   caminho de volta da última etapa para a primeira.
2. **Linha curta de texto**: uma frase só, em tamanho menor que os cards, com cor de
   apoio (mesma dos textos secundários da seção).
3. **Idiomas**: a frase entra como um campo novo de texto nos blocos PT, EN e ES, ao lado
   do título e da introdução — a lista de 4 passos continua intacta, então o painel segue
   com exatamente quatro cards.

## Textos

- **PT**: Cada decisão executada volta como sinal, melhora o aprendizado dos modelos e escala os resultados.
- **EN**: Every executed decision comes back as a signal, improves model learning and scales the results.
- **ES**: Cada decisión ejecutada vuelve como señal, mejora el aprendizaje de los modelos y escala los resultados.

## Detalhes técnicos

- Arquivo: `src/components/home-v3/HowItWorks.tsx` — único arquivo alterado.
- A faixa é inserida no mesmo container do painel, depois do grid de cards, com
  espaçamento próprio e sem alterar bordas, cantos nem o selo "i6 DECISION PLATFORM".
- Ícone vem da biblioteca de ícones já instalada (`lucide-react`, usado em outras seções da
  Home) e é ocultado para leitores de tela; a frase é texto real, então permanece acessível.
- Cores e sombras usam os tokens existentes do tema (primária, borda e texto secundário),
  sem valores fixos — o resultado se adapta ao tema escuro e à versão clara.
- Comportamento responsivo: no celular a linha pontilhada e a frase ficam empilhadas e o
  texto quebra normalmente, sem criar rolagem lateral.

## Verificação

- Checagem de tipos (`tsgo --noEmit`) e log de build.
- Navegação na prévia em PT, EN e ES, desktop e celular, confirmando: quatro cards (não
  cinco), a faixa visível dentro do painel, a frase correta em cada idioma e ausência de
  rolagem lateral.
