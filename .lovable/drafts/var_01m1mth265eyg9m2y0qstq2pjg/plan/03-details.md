## Comportamento

- Clique (e teclado: Enter/Espaço, setas) troca a família ativa; a família ativa fica marcada com filete terracota e texto em destaque.
- A linha de conexão é desenhada em SVG entre a família ativa e a borda do quadro, com animação curta de traço (`stroke-dashoffset`) — sutil, sem exagero, respeitando redução de movimento.
- O conteúdo do quadro entra com fade e leve deslocamento vertical.

## Detalhes técnicos

- `src/components/i6-builders/BuilderModels.tsx`: reescrever como grid de duas colunas (`md:grid-cols-[minmax(0,340px)_1fr]`), com `useState` para o índice ativo, `role="tablist"`/`role="tabpanel"` e `aria-selected`. Overlay SVG absoluto na área da seção para a linha, escondido abaixo de `md`. Tokens do `theme-sand` já existentes (`text-primary`, `border-border`, `sand-card`), sem cores literais.
- `src/data/i6Builders/content.ts`: cada item de `models.cards` ganha `long` (parágrafo), `outputs` (lista de tipos de saída) e `engines` (etiquetas), nos três idiomas. Nada mais na seção muda; `placeholders.ts` intacto.
- Sem mudança de rota, SEO, formulário ou envio de leads.
- Verificação: build, checagem de tipos e capturas em `/pt`, `/en`, `/es` e em largura de celular, com troca de família.
