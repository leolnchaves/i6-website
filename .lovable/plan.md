

# Corrigir comportamento dos botoes de cenario e perguntas sugeridas

## Problema
- Os botoes de cenario (Supply, Forecast, Pricing, Comercial, Mix) chamam `startAnimation` diretamente, pulando a animacao de digitacao no input e clique no botao Send.
- As perguntas sugeridas sao clicaveis quando deveriam ser apenas informativas.

## Mudancas no arquivo `src/components/solutions/I6SignalDemo.tsx`

### 1. Modificar `handleScenarioClick` (linha 491-494)
Usar o mesmo fluxo que `handleSuggestedQuestionClick` usa hoje:
- Limpar o chat atual (phase idle, showResponse false, typedText vazio)
- Definir `pendingQuestion` com a pergunta do cenario clicado
- Definir `pendingScenario` com o cenario clicado
- Ativar `isFillingInput` para iniciar a digitacao no input

### 2. Tornar perguntas sugeridas nao clicaveis (linhas 702-709)
- Trocar `<button>` por `<span>` ou `<div>`
- Remover `onClick`
- Remover estilos de hover e cursor-pointer
- Manter apenas estilo visual informativo

### Resultado esperado
1. Usuario clica em "Forecast" (botao de cenario)
2. Texto da pergunta do Forecast digita caractere a caractere no campo de input
3. Botao Send anima (scale + glow)
4. Texto vai para o board de respostas com typing effect e resposta
5. Perguntas sugeridas aparecem como texto informativo, sem interacao

