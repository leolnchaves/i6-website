## Ajustes nos rails de temas do /i6-blog

Alvo: `src/components/blog/ThemeRail.tsx`.

### Mudanças

1. **Layout em grade de 3 colunas**
   - Substituir o carrossel horizontal (`overflow-x-auto` + painéis de 520px) por um grid responsivo: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0`.
   - Remover botões de navegação (setas) e a lógica de `scrollBy` — não são mais necessários.
   - Cada card ocupa uma célula; as linhas se preenchem automaticamente da esquerda para a direita.

2. **Remover moldura, manter separadores sutis**
   - Remover o wrapper `ThemePanel` (borda `border-white/10`, `bg-[#0B1224]/80`, padding, glow do painel).
   - Renderizar `EditorialRow` diretamente dentro do grid.
   - Manter o divisor horizontal apenas entre linhas (não entre colunas): usar `border-b border-white/5` em cada card exceto os da última linha visível, com padding vertical (`py-4`) para dar respiro. Como o número de linhas é dinâmico, aplicar `border-b` em todos e deixar visualmente natural (a última linha fica com uma borda também, discreta — aceitável dado que `white/5` é bem sutil).

3. **Corrigir escopo do hover**
   - Hoje o `group` está no painel inteiro, então mover o mouse sobre qualquer card destaca todos.
   - Colocar `group` em cada `EditorialRow` (Link) individualmente.
   - Título usa `group-hover:text-[#F4845F]` — já está por card, mas passa a responder só ao próprio card.
   - Imagem: aumentar o zoom no hover do próprio card de `group-hover:scale-105` para `group-hover:scale-110` para dar mais destaque.

### Fora de escopo
- Nenhuma mudança em `BlogCard`, `RecentStrip`, `BlogHero` ou `Blog.tsx`.
- Sem alterações de conteúdo, cores globais ou i18n.
