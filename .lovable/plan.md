

## Ajustes no Header da Secao i6Signal Demo

### Problema
1. O subtitulo esta mais proximo do titulo do que do seletor de cenarios (deveria ser o inverso)
2. A fonte do subtitulo esta muito pequena (`text-sm`)
3. O texto do subtitulo precisa ser atualizado

### Alteracoes

**Arquivo:** `src/components/solutions/I6SignalDemo.tsx`

1. **Espacamento**: Aumentar o `mb` do titulo (de `mb-1` para `mb-4` ou similar) para afastar o subtitulo do titulo, e reduzir o `mb` do container do subtitulo (de `mb-6` para `mb-2`) para aproxima-lo do seletor de cenarios.

2. **Tamanho da fonte**: Aumentar de `text-sm` para `text-base md:text-lg`.

3. **Texto PT** (linha 22): Trocar para:
   - "Escolha um tema e explore como sinais viram decisoes que movem crescimento e margem."

4. **Texto EN** (linha 177): Traduzir equivalente:
   - "Choose a topic and explore how signals become decisions that drive growth and margin."

### Detalhes Tecnicos

```text
Antes:
  Titulo (mb-1)
  Subtitulo
  (mb-6)
  Seletor

Depois:
  Titulo (mb-4)
  Subtitulo
  (mb-2)
  Seletor
```

- Linha 22: atualizar `sectionSubtitle` PT
- Linha 177: atualizar `sectionSubtitle` EN
- Linhas 615-618: ajustar classes de espacamento e tamanho de fonte

