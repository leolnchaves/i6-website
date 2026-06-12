## Problema

Texto do corpo aparece praticamente preto sobre o fundo escuro em três tipos de página:

- `/[lang]/solutions/<slug>` — `src/pages/TransformationLanding.tsx`
- `/[lang]/i6-intelligence/<slug>` (Research) — `src/pages/IntelligenceArticle.tsx`
- Insights — `src/pages/InsightArticle.tsx`

Todas renderizam Markdown com classes `prose prose-invert prose-p:text-white/75 ...`. O pacote `@tailwindcss/typography` está em `package.json`, mas **não está registrado no `tailwind.config.ts`**, então as classes `prose-*` não geram CSS e o texto cai para a cor padrão (preto).

## Mudança

Arquivo único: `tailwind.config.ts` (linha 136).

```ts
// antes
plugins: [require("tailwindcss-animate")],

// depois
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
```

Nenhuma outra alteração necessária — as classes `prose-invert prose-p:text-white/75 prose-strong:text-white prose-headings:text-white prose-a:text-[#F4845F]` já estão corretas nos três componentes.

## Validação

1. `/pt/solutions/demand-supply-efficiency` e outras 3 landings — corpo em branco/cinza claro
2. `/pt/i6-intelligence/ruptura-gondola-ia-preditiva` — corpo legível, `<strong>` em branco
3. Um artigo de Insights — mesma verificação
