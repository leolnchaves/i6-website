## Detalhes técnicos

### Arquivo
`src/components/i6-builders/BuilderModels.tsx`

### Mudanças no cabeçalho (linhas 96–100)
1. Remover `max-w-3xl` do `<div>` que envolve o cabeçalho, permitindo que o texto ocupe a largura total do container da seção.
2. No `<h2>`:
   - Remover `truncate`.
   - Manter `whitespace-nowrap`.
   - Ajustar o tamanho da fonte para que caiba em uma linha (ex: `text-2xl md:text-3xl lg:text-[2.2rem]` ou `text-[clamp(1.5rem,3.5vw,2.2rem)]`).
3. No segundo `<p>`:
   - Remover `truncate`.
   - Manter `whitespace-nowrap`.
   - Reduzir o tamanho da fonte para `text-sm md:text-base` ou usar `clamp()` para escalar com a largura da tela.

### Considerações
- O texto não será alterado.
- Em telas muito estreitas, `whitespace-nowrap` pode forçar overflow horizontal. A solução é a escala responsiva do tamanho da fonte (`clamp` ou breakpoints menores).
- A seção abaixo (lista de famílias + painel) não será alterada.

### Validação
- `bun run build` e `tsgo` (ou `tsc --noEmit`) devem passar.
- Screenshot da seção em `/pt/i6-builders` para confirmar que título e subtítulo aparecem completos em uma linha.
