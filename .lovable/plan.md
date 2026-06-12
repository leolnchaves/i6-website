## Traduzir strings EN no PT e reordenar /our-ai

### 1) Traduzir strings que ficaram em inglês no conteúdo PT
Em `src/data/staticData/ourAIContent.ts`, dentro do bloco `pt`:

**Diversity (linha 223):**
- `tasks: ['Recommended for you', 'Frequently bought together', 'Buy it again', 'Similar items', 'On sale']`
- → `['Recomendado para você', 'Comprados juntos com frequência', 'Compre novamente', 'Itens similares', 'Em promoção']`

**Explainability — step 2 cards (linhas 251–254):**
- Increase in demand / prioritize argument of growth opportunity → "Aumento de demanda" / "priorize o argumento de oportunidade de crescimento"
- Repurchase occasion / emphasize need for immediate restocking → "Ocasião de recompra" / "enfatize a necessidade de reposição imediata"
- New product / highlight market trend → "Produto novo" / "destaque a tendência de mercado"
- High-selling product / stress risk of stockout → "Produto de alta venda" / "reforce o risco de ruptura"

**Explainability — step 3 cards (linhas 261–263):**
- High engagement / from similar customer profiles in the last 30 days → "Alto engajamento" / "de perfis de cliente similares nos últimos 30 dias"
- Optimized bundling / based on successful cross-sell patterns → "Bundling otimizado" / "baseado em padrões bem-sucedidos de cross-sell"
- Strong correlation / with the preferred products of high-value customers → "Forte correlação" / "com os produtos preferidos de clientes de alto valor"

Bloco `en` permanece intacto.

### 2) Reordenar /our-ai — RealResults como penúltimo (acima do Glossário)
Em `src/pages/OurAI.tsx`, mover `<RealResultsStrip />` da posição atual (após Explainability) para imediatamente antes de `<GlossarySection>`.

Nova ordem:
Hero → Thesis → UnifiedImpact → EnginesGrid → Diversity → Explainability → Security → Challenges → Community → **RealResultsStrip** → Glossary → CTA.

### Verificação
Preview `/pt/our-ai`: textos dos cards de Explainability e chips de Diversity em português; faixa "Resultados reais em produção" aparece logo acima do Glossário.