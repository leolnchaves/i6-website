

## Ajustar layout do rich label do card Varejo

### O que sera feito

Mudar o formato da terceira metrica do card Varejo de inline (tudo numa linha corrida) para o formato empilhado (bold em cima, texto embaixo), identico ao que ja foi feito no card Financeiro. Cada par bold+texto ficara alinhado verticalmente, lado a lado.

### Detalhes tecnicos

**Arquivo: `src/components/hometeste/ResultadosSection.tsx`** (linhas 117-123)

Substituir o bloco `<span>` inline por um layout flex identico ao do Finance:

De:
```
+36% positivacao de produtos +23% ticket medio por PDV.
```

Para:
```
+36%              +23%
positivacao       ticket medio
de produtos       por PDV.
```

Trocar o `<span>` por um `<div className="flex gap-4">` com dois `<div className="flex flex-col">` internos, cada um contendo o valor bold laranja em cima e o texto descritivo embaixo.

