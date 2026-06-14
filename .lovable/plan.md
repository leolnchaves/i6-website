## Mudanças em `src/components/hometeste/TestemunhosCompact.tsx`

1. **Reduzir distância entre os cards de resultados e os testemunhos**
   - Trocar `<section className="py-16">` por `<section className="pt-6 pb-16">`.
   - Reduzir o espaçamento abaixo do título: `mb-10` → `mb-6`.

2. **Igualar o tamanho do título ao "Real results in production"**
   - A seção `RealResultsStrip` usa `text-2xl md:text-3xl font-bold` no `<h2>`.
   - Trocar o título do bloco de testemunhos de `text-3xl lg:text-4xl font-semibold` para `text-2xl md:text-3xl font-bold` (mantendo tracking-tight e cor).

3. **Eliminar o truncamento dos depoimentos**
   - Remover `line-clamp-4` do `<blockquote>` para que o texto apareça inteiro.
   - Reduzir levemente a tipografia para acomodar as citações mais longas sem quebrar o layout: `text-sm` → `text-[13px]` e `leading-relaxed` mantém boa legibilidade.
   - Remover `min-h-[200px]` do card (era usado para igualar alturas quando havia line-clamp); com `h-full` + `items-stretch` o carrossel já equaliza alturas pelo maior depoimento.
   - Manter `flex-grow` no blockquote para que autor/empresa continuem ancorados na base do card.

Nenhuma outra mudança (CTA, cores, carousel, etc.) será tocada.
