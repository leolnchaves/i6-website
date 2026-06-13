## Reduzir cards da página /insights

Arquivo: `src/pages/Insights.tsx` (componente `InsightCard`)

Mudanças:

1. **Grid**: trocar `md:grid-cols-2 lg:grid-cols-3` por `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` — mais cards por linha, cada um ~25% mais estreito.
2. **Imagem de capa**: reduzir altura de `h-40` para `h-28`.
3. **Padding interno**: `p-6` → `p-4`.
4. **Tipografia**:
   - Título: `text-lg` → `text-sm` + `mb-2` mantém
   - Excerpt: `text-sm` → `text-xs`, adicionar `line-clamp-3`
   - Marca de tipo (badge): manter `text-xs` mas com `px-1.5 py-0.5`
   - Placeholder "I6 ON MEDIA": `text-3xl md:text-4xl` → `text-xl md:text-2xl`
5. **Gap do grid**: `gap-6` → `gap-4`.
6. **Margens internas**: `mb-3` (header) → `mb-2`; `mt-4` (read_time) → `mt-3`.

Resultado: cards ~40% menores em área, mantendo hierarquia visual e legibilidade. Não altera lógica, dados ou roteamento — apenas presentation/Tailwind no `Insights.tsx`.

Não mexer em `InsightsSection.tsx` (home) pois o pedido é específico da tela `/insights`.