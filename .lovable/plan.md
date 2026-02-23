

# Simular digitação no input ao clicar em pergunta sugerida

## Comportamento desejado
1. Usuário clica em uma pergunta sugerida
2. O texto é "digitado" caractere a caractere no campo de input (rounded-full, na parte inferior)
3. Após completar a digitação, simula um clique no botão laranja (Send)
4. O fluxo normal continua: mensagem aparece no chat, loading dots, resposta do assistente

## Mudanças técnicas

### Arquivo: `src/components/solutions/I6SignalDemo.tsx`

**Novos estados (após linha 416):**
- `inputText` (string) — texto visível no campo de input
- `isFillingInput` (boolean) — controla se está no modo de digitação no input
- `pendingQuestion` (string) — a pergunta completa que está sendo digitada
- `inputRef` — ref para o input element

**Novo useEffect — digitação no input:**
- Quando `isFillingInput === true`, digita `pendingQuestion` caractere a caractere no `inputText` (mesma velocidade `TYPING_SPEED`)
- Ao completar, aguarda `RESPONSE_DELAY` ms, depois:
  - Limpa `inputText` e `isFillingInput`
  - Inicia `startAnimation()` com o cenário atual (que faz o texto aparecer no chat como mensagem do usuário)

**Handler para clique na pergunta sugerida:**
- Identifica qual cenário corresponde à pergunta clicada (busca no objeto `content`)
- Seta `pendingQuestion` com o texto da pergunta
- Seta `isFillingInput = true`
- Limpa o chat atual (`setPhase('idle')`, `setShowResponse(false)`)

**Modificação no input (linha 692-697):**
- Trocar `readOnly` por `value={inputText}`
- Manter `readOnly` mas mostrar o valor dinâmico

**Modificação no startAnimation (linha 421-426):**
- Adicionar `setInputText('')` para limpar o input quando a animação de chat começa

**Botões de pergunta sugerida (linhas 650-657):**
- Adicionar `onClick` handler que dispara o fluxo de preenchimento do input

## Fluxo visual
```text
[Clique na pergunta] 
  → Limpa chat atual
  → Texto aparece gradualmente no input (campo inferior)
  → Ao completar, simula "click" no Send
  → Texto aparece como mensagem do user no chat
  → Loading dots → Resposta do assistente
```

## O que NÃO muda
- Visual/estilo do input, botão Send, perguntas sugeridas
- Lógica dos cenários e tabs
- Auto-start na montagem do componente

