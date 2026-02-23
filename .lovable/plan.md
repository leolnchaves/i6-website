

## Corrigir camada das ondas verticais

### Problema

O `VerticalWaves` usa `fixed` com `z-[5]` e fica fora do fluxo de stacking do conteudo. O conteudo todo esta dentro de um container com `z-[2]`, o que cria um stacking context -- os `z-[10]` dos cards e footer so valem **dentro** desse contexto `z-[2]`, nunca ultrapassando o `z-[5]` das ondas.

### Solucao

Reduzir o z-index das ondas para `z-[1]` em `VerticalWaves.tsx`, de modo que fiquem abaixo do container principal (`z-[2]`). Assim, cards e footer (com `z-[10]` dentro do `z-[2]`) ficam automaticamente acima das ondas.

### Mudanca

**Arquivo:** `src/components/solutions/VerticalWaves.tsx` (linha 6)

- De: `z-[5]`
- Para: `z-[1]`

Apenas essa mudanca resolve o problema -- o container principal com `z-[2]` ja fica acima do `z-[1]` das ondas.

