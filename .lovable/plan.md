## Animação na barra 9 + carrossel vertical por segmento

### 1) Diversity — destaque animado na barra "9"
Em `src/components/our-ai/DiversityBalanceSection.tsx`:
- Envolver a barra 9 (Recharts `<Cell>` já distinta) com um efeito visual sutil:
  - Pulso/glow contínuo de baixa opacidade ao redor da coluna 9, via uma `<Customized>` overlay no SVG do gráfico (um `<rect>` com `filter` blur laranja `#F4845F`, `opacity: 0.35`, animação CSS `pulse-soft` de 2.4s ease-in-out infinite).
  - Linha fina vertical pontilhada saindo do topo da barra até uma anotação flutuante.
- Anotação ("callout") posicionada acima/à esquerda da barra 9, dentro do card do gráfico:
  - Pequeno badge com borda `#F4845F/40`, fundo `#0B1224`, padding compacto.
  - **PT:** "9 recomendações com o mesmo nível de relevância — inclusive para usuários anônimos"
  - **EN:** "9 recommendations at the same relevance level — even for anonymous users"
- Entrada do callout: `IntersectionObserver` → `animate-fade-in` (já existe no tailwind config) quando a seção entra na viewport. Não roda em loop, só na primeira aparição.
- Adicionar copy `chartHighlight: { pt, en }` em `ourAIContent.ts` (campo novo em `diversity`).
- Adicionar keyframe `pulse-soft` em `tailwind.config.ts` (opacity 0.2 ↔ 0.5, scale 1 ↔ 1.04 no rect overlay).

### 2) Explainability step 03 — carrossel vertical por segmento
Substituir os 3 cards estáticos do step 03 ("Gera argumento dinâmico") por um carrossel vertical animado.

**Estrutura de dados** (em `ourAIContent.ts`, dentro de `explainability.steps[2]`):
Substituir `cards` por `segments: Array<{ label, items: Array<{ title, subtitle }> }>` com 4 segmentos × 3 argumentos cada:

- **Indústria** — Padrão de consumo / Sazonalidade prevista / Reposição inteligente
- **Varejo** — Alto engajamento / Bundling otimizado / Forte correlação
- **Financeiro** — Propensão a contratar / Perfil de risco alinhado / Cross-sell de produto
- **Farma** — Aderência ao tratamento / Recompra prevista / Recomendação por perfil clínico

(copy inicial — usuário pode refinar depois)

**Componente novo:** `src/components/our-ai/SegmentArgumentCarousel.tsx`
- Lista vertical com altura fixa mostrando 3 cards visíveis simultaneamente.
- Loop interno: a cada 2.6s o card do topo recebe `translateY(-100%)` + `opacity 0` (sai por cima), os demais sobem uma posição, e um novo card entra por baixo com `translateY(100%) → 0` + fade-in.
- Quando os 3 argumentos do segmento atual terminam, troca para o próximo segmento sem corte (continuidade).
- Label do segmento atual aparece acima da lista em uppercase tracking, com `key`-based fade quando troca: `INDÚSTRIA` → `VAREJO` → `FINANCEIRO` → `FARMA`.
- Respeita `prefers-reduced-motion`: se reduzido, mostra os 3 cards iniciais estáticos sem rotação.
- Pausa quando a aba do navegador está oculta (`document.visibilityState`) para evitar custo de animação.

**Integração:** `ExplainabilitySection.tsx` renderiza `<SegmentArgumentCarousel segments={step.segments} />` quando `step.segments` existe (mantendo fallback para `step.cards` legado e `step.sample` intacto). Step 02 permanece com cards estáticos.

### Verificação
Preview PT e EN em `/our-ai`:
- Barra 9 com pulso suave laranja + callout textual aparecendo uma vez ao scroll.
- Card "Gera argumento dinâmico" mostra label do segmento alternando e cards subindo continuamente, sem flicker.