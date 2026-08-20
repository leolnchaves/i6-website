# Passo a passo "Como implementamos" na landing /go

## Objetivo
Exibir, na landing `/pt/go/:token` (e `/en/go/:token`), o mesmo bloco de 5 etapas com o selo "Custo zero até o Backtest" que já existe em `/solutions`, logo antes do formulário de contato.

## O que será feito
- Reaproveitar o componente existente `src/components/solutions-v2/HowWeImplement.tsx` (sem duplicar código nem texto).
- Inseri-lo em `src/pages/GoLanding.tsx` entre o hero personalizado e o `ContactForm`.
- O idioma já vem automaticamente: o componente lê `useLanguage()` e busca os textos em `src/data/solutionsV2/content.ts` (PT e EN já existem, incluindo os 5 passos e o `costNote`).

## Detalhes técnicos
- `HowWeImplement` é `memo` e autossuficiente (section própria com fundo `#0B1224`), então basta importá-lo e renderizá-lo — nenhuma prop necessária.
- Sem alterações no `ContactForm`, no conteúdo Markdown ou nas rotas.
- Ajuste apenas de espaçamento na `GoLanding` se o empilhamento das seções ficar apertado.

## Fora de escopo
- Alterar textos das etapas ou o layout de `/solutions`.
