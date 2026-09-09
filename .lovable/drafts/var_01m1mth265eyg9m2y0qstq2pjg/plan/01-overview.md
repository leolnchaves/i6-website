## Padronizar CTAs da seção Decision Suite

Ajustar os dois botões de CTA ao final da seção **Decision Suite** (`#decision-suite`) para terem o mesmo tamanho, shape e peso visual dos CTAs usados na seção **Builder Platform** (botão "Construir com o i6 Builder").

### Escopo
- Apenas `src/components/home-v3/product/DecisionSuiteSection.tsx`, bloco dos CTAs da seção.
- Preservar cores atuais (primário `bg-primary`, secundário com borda `border-foreground`).
- Preservar comportamentos existentes: link externo para `SUITE_URL` com `ArrowUpRight`, link interno `/contact` sem ícone.
- Não alterar texto, rota, idiomas ou outras seções.

### Referência visual
Os CTAs da Builder Section usam:
- `rounded-2xl`
- `px-7 py-3.5`
- primário `font-bold` + `ArrowRight size={16}`
- secundário `font-semibold` com borda

### Resultado esperado
Botões da Decision Suite com a mesma altura, largura de padding e cantos arredondados dos botões da Builder Section, mantendo sua identidade de cor.
