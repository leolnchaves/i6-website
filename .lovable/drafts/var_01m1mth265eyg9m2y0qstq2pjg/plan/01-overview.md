# Reorganizar a seção da i6 Decision Suite

O problema do estado atual não é o conteúdo, é a composição: hoje existem **dois blocos que se ignoram**. Duas aberturas do mesmo tamanho, dois títulos grandes competindo, três caixas empilhadas à esquerda e um painel enorme à direita. Nada indica que as duas colunas falam da mesma coisa, e a altura total fica desproporcional.

A correção mantém todo o contexto (tese, três pilares, seis produtos, painel de detalhe, fluxo Entrada/Decisão/Valor, os dois CTAs), mas reorganiza a hierarquia.

## O que muda

1. **Uma única abertura, larga e centrada à esquerda**: logo, um só título (a tese "Uma plataforma de decisão, não um conjunto de dashboards") e a descrição em uma linha de texto confortável. O segundo título grande deixa de existir; "Seis decisões críticas, uma suíte" passa a ser um rótulo de seção discreto acima do explorador.
2. **Os três pilares viram uma faixa horizontal de três colunas**, logo abaixo da abertura — sem cartões pesados, apenas número/traço, título e uma linha de texto. Isso elimina a torre de caixas e encurta a seção.
3. **O explorador de decisões ganha o palco inteiro**, em duas colunas que conversam: à esquerda uma lista vertical dos seis produtos (item ativo marcado por barra terracota e fundo claro), à direita o painel do produto selecionado. A escolha e o resultado ficam lado a lado na mesma linha de leitura — é essa a conversa que falta hoje.
4. **O painel fica mais leve**: cabeçalho (nome + frase), corpo, a dor em citação, capacidades em linha fina e o fluxo Entrada → Decisão → Valor como trilha horizontal contínua com setas entre os passos, não como três caixas soltas.
5. **CTAs centralizados no fim da seção**, servindo à seção inteira em vez de pendurados no fim de uma coluna.

## O que não muda

- Âncora `#decision-suite`, textos de `suiteContent.ts`, os três idiomas, o link externo com seta e o "Falar com especialista".
- Nenhuma altura forçada; espaçamento amplo, sem compressão.
- Somente `DecisionSuiteSection.tsx` é alterado.
