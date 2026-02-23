

# Corrigir fluxo: digitar no input, animar botao, depois exibir no chat

## Problema atual
Quando o usuario clica numa pergunta sugerida, o texto aparece diretamente no board de respostas. O efeito de digitacao no input existe mas o `startAnimation` limpa o input imediatamente e comeca a digitar no chat.

## Solucao

### Arquivo: `src/components/solutions/I6SignalDemo.tsx`

### 1. Novo estado para animacao do botao Send
- Adicionar `isSendAnimating` (boolean) para controlar o efeito visual no botao Send (scale/pulse)

### 2. Modificar o useEffect de input filling (linhas 458-478)
Quando a digitacao no input terminar:
- Em vez de chamar `startAnimation` diretamente, primeiro ativar `isSendAnimating = true`
- Aguardar ~400ms (efeito visual do botao)
- Depois chamar `startAnimation` com o cenario pendente
- Resetar `isSendAnimating = false`

Fluxo revisado:
```text
inputText completo
  → setIsSendAnimating(true)
  → aguarda 400ms
  → setIsSendAnimating(false)
  → startAnimation(pendingScenario) — agora sim exibe no chat
```

### 3. Adicionar animacao visual no botao Send (linha 747)
- Quando `isSendAnimating === true`, aplicar classes de animacao: `scale-110 ring-2 ring-orange-300` ou similar para simular o "clique"
- Usar `transition-transform` para suavizar

### 4. Garantir que startAnimation limpa o input corretamente
- `startAnimation` ja faz `setInputText('')` (linha 430) — isso esta correto pois nesse ponto o texto ja deve sair do input e ir para o chat

### Resultado esperado
1. Usuario clica na pergunta sugerida
2. Texto aparece caractere a caractere no campo de input (parte inferior)
3. Botao Send (seta laranja) recebe animacao de "clique" (scale + glow)
4. Texto desaparece do input e aparece no board do chat como mensagem do usuario
5. Loading dots, depois resposta do assistente

