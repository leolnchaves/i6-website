## Alterações

### 1. Nome do eBook (Growth / PT)
Em `src/data/kiosk/config.ts`:
- `territoryEbook.growth.pt`: `'eBook Inteligência Preditiva do Consumidor'` → `'Inteligência do Consumidor Orientada à Decisão'`.
- `kioskContent.pt.ebook.title`: retornar JSX com o nome do eBook destacado em coral (`#F4845F`), no formato:
  > Receba o <span class="text-[#F4845F]">eBook Inteligência do Consumidor Orientada à Decisão</span>

### 2. Suporte a título com destaque
Em `src/data/kiosk/config.ts`:
- Alterar a assinatura de `ebook.title` de `(solutionTitle: string) => string` para `(solutionTitle: string) => ReactNode`, retornando JSX com `<span>` colorido envolvendo `eBook {nome}`.

Em `src/components/kiosk/EbookCTA.tsx`:
- O `<h3>` já renderiza `{t.title(ebookTitle)}` — passa a renderizar o ReactNode diretamente, sem outras mudanças.
- Para PT (Growth): `Receba o <span coral>eBook Inteligência do Consumidor Orientada à Decisão</span>`.
- Para os demais casos (Planning, Pricing, EN e branches ainda com "eBook " no início do nome): manter o mesmo padrão — envolver `eBook {t}` no `<span coral>`, mantendo a palavra "Receba o" fora do destaque.

## Escopo
- Aplica-se automaticamente às duas soluções do território Growth (Personalização + Descoberta, Campanhas por Propensão).
- Destaque em coral também vale para EN (`Get the <span coral>eBook ...</span>`) para manter consistência visual.
- Nenhuma outra parte do Kiosk é alterada.
