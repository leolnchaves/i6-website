# Decision Suite em uma tela, sem scroll

Direção aprovada: "Architectural suite condensed" — toda a seção passa a caber em uma tela (~900px) sem rolagem, mantendo todos os textos, os seis produtos, o painel completo e os dois CTAs.

## O que muda

1. **Abertura em duas colunas na mesma linha**: à esquerda o logo, o título "Uma plataforma de decisão, não um conjunto de dashboards" e a descrição; à direita os três pilares encurtados em três mini-colunas. Uma linha divisória fina fecha o bloco — elimina a faixa separada de pilares.
2. **Explorador logo abaixo**: eyebrow PRODUTOS e o título "Seis decisões críticas, uma suíte" sobem para o topo da coluna da lista (à esquerda), junto aos seis botões. O painel do produto ativo ocupa a área maior à direita.
3. **Painel reorganizado**: nome/eyebrow, headline, corpo e a dor em citação à esquerda; capacidades em linha fina abaixo; o fluxo Entrada → Decisão → Valor fica preso à base do painel, em três mini-cartões com setas.
4. **CTAs centralizados na base da seção**, imediatamente após o painel, fechando a tela.
5. **Seção mais compacta no geral**: espaçamentos e tipografia ligeiramente reduzidos, sem apertar; meta é caber em 900px de altura no desktop.

## O que não muda

- Nenhum texto, nenhum dos seis produtos, o fluxo, os dois CTAs e seus destinos (`SUITE_URL` externo com seta, "Falar com especialista").
- Âncora `#decision-suite`, trilinguismo, animação de troca de produto e tokens de tema (sem cores fixas).
- Somente `DecisionSuiteSection.tsx` é alterado; `suiteContent.ts` e `HomeTeste.tsx` intactos.
