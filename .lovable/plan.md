
## Correção das Traduções dos CTAs

### Problema
Os botões CTA nas versões em inglês não traduzem corretamente o que está escrito em português:

| Componente | PT (correto) | EN (atual - incorreto) | EN (corrigido) |
|---|---|---|---|
| Hero (HeroMovimento) | "Antecipe suas decisões agora!" | "Talk to a specialist" | "Anticipate your decisions now!" |
| CTA Final | "Pronto para transformar dados em lucro?" | "Move your data" | "Ready to turn data into profit?" |

### Alteracoes

**Arquivo 1: `src/components/hometeste/HeroMovimento.tsx`**
- Linha 19: Alterar `cta` de `'Talk to a specialist'` para `'Anticipate your decisions now!'`

**Arquivo 2: `src/components/hometeste/CTAFinal.tsx`**
- Linha 16: Alterar `cta` de `'Move your data'` para `'Ready to turn data into profit?'`
