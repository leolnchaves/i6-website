

## Corrigir visibilidade das ondas verticais

### Problema

A estrutura atual e:

```text
div (bg-[#0B1224], relative)        -- fundo da pagina
  VerticalWaves (fixed, z-[1])      -- ondas
  div (relative, z-[2])             -- wrapper do conteudo
    Header
    Hero
    Cards (z-[10])
    ProcessFlow
    CTA
    Footer (z-[10])
```

O wrapper `z-[2]` tem fundo herdado/opaco e cobre tudo abaixo dele, incluindo as ondas em `z-[1]`. As ondas ficam invisiveis porque o conteudo inteiro esta numa camada acima.

### Solucao

1. Remover o `z-[2]` do wrapper de conteudo e remover o `bg-[#0B1224]` redundante dele (o fundo ja vem do container pai)
2. Subir as ondas para `z-[1]`  (ja esta assim)
3. Dar `relative z-[2]` apenas aos componentes que precisam ficar ACIMA das ondas: cards e footer
4. Os demais (hero, process flow, CTA) ficam sem z-index especifico, permitindo que as ondas aparecam por cima deles como efeito visual

Estrutura final:

```text
div (bg-[#0B1224], relative)
  VerticalWaves (fixed, z-[1])
  div (relative) -- sem z-index, sem bg, transparente
    Header (relative z-[20]) -- header precisa ficar acima de tudo
    Hero -- ondas visiveis por cima
    Cards (relative z-[2]) -- acima das ondas
    ProcessFlow -- ondas visiveis por cima  
    CTA -- ondas visiveis por cima
    Footer (relative z-[2]) -- acima das ondas
```

### Mudancas

**Arquivo:** `src/pages/Solutions.tsx`

- Remover `z-[2]` do wrapper principal de conteudo
- Manter `z-[10]` nos wrappers de cards e footer (ou ajustar para `z-[2]`, ja suficiente)
- Isso torna o wrapper transparente ao stacking, e as ondas em `z-[1]` ficam visiveis nos espacos entre os elementos

Apenas 1 arquivo editado.
