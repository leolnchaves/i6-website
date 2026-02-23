

# Mostrar pergunta completa no board de respostas (sem typing)

## Problema
Quando o sistema simula o clique, a pergunta aparece caractere a caractere no board de respostas (chat). O typing deveria acontecer apenas no campo de input.

## Mudancas no arquivo `src/components/solutions/I6SignalDemo.tsx`

### 1. Alterar `startAnimation` (linhas 427-433)
Ao iniciar a animacao, definir `typedText` com a pergunta completa em vez de string vazia:
```
setTypedText(t.scenarios[sc].question)  // antes: setTypedText('')
```
Adicionar `t.scenarios` como dependencia do useCallback.

### 2. Simplificar o useEffect de typing (linhas 435-451)
Remover a logica de digitacao caractere a caractere no chat board. O useEffect agora apenas aguarda `RESPONSE_DELAY` e transiciona para `phase: 'responding'`:
```
useEffect(() => {
  if (phase !== 'typing') return;
  const timer = setTimeout(() => {
    setPhase('responding');
    setShowResponse(true);
  }, RESPONSE_DELAY);
  return () => clearTimeout(timer);
}, [phase]);
```

### 3. Remover cursor piscante (linha 681)
Remover o `<span>` com `animate-pulse` e cursor `|` da mensagem do usuario no chat, ja que nao ha mais digitacao no board.

### Resultado
1. Usuario clica no botao de cenario (ex: Forecast)
2. Texto digita caractere a caractere no campo de input (parte inferior)
3. Botao Send anima
4. Pergunta aparece **completa** e de uma vez no board de respostas
5. Loading dots, depois resposta do assistente

