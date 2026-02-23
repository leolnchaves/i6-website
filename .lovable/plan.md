

# Aumentar altura do I6SignalDemo e mover perguntas sugeridas para dentro do chat

## Mudancas

### 1. Aumentar altura do container principal (linha 496)
- Mudar `h-[520px] md:h-[500px]` para `h-[600px] md:h-[650px]` para ocupar mais da tela

### 2. Mover "Suggested Questions" para dentro do fluxo do chat (linhas 648-666)
- Remover o bloco fixo de suggested questions que fica entre o chat e o input (o `div` com `border-t border-orange-200/30`)
- Mover as perguntas sugeridas para DENTRO da area de scroll do chat, logo apos as "Recommended Actions" (depois da linha 641)
- Manter o mesmo estilo visual (icone Lightbulb, fundo `from-orange-50/80 to-amber-50/80`, botoes ghost)
- Agora fara parte do conteudo scrollavel junto com a resposta do assistente

### Resultado esperado
- O demo ocupa quase toda a viewport sem scroll
- As perguntas sugeridas aparecem naturalmente como parte da resposta do assistente, nao como barra fixa separada

