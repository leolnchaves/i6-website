

# Ajuste do CTA Final no Mobile

## O que muda

Atualmente no mobile o texto do botao e "Vamos transformar dados em lucro?". O usuario quer trocar para "Pronto para transformar dados em lucro?" tambem no mobile, mas com as palavras distribuidas harmonicamente em duas linhas para evitar uma linha longa e outra curta.

## Solucao

No `src/components/hometeste/CTAFinal.tsx`:

1. **Texto mobile PT**: Mudar de "Vamos transformar dados em lucro?" para "Pronto para transformar\ndados em lucro?" -- com quebra manual (`\n`) apos "transformar" para equilibrar as duas linhas (~3-4 palavras cada).

2. **Texto mobile EN**: Mudar de "Let's turn data into profit?" para "Ready to turn\ndata into profit?" -- mesma logica de balanceamento.

3. **Adicionar `whitespace-pre-line`** ao botao CTA para que o `\n` funcione corretamente (apenas no mobile, via classe condicional ou inline).

4. **Desktop fica inalterado** -- o texto continua em uma unica linha como esta hoje.

### Resultado visual no mobile

```text
+---------------------------+
| Pronto para transformar   |
|   dados em lucro?     ->  |
+---------------------------+
```

### Arquivos modificados
- `src/components/hometeste/CTAFinal.tsx`

