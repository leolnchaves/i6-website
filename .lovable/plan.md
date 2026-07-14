# Ajustes na página /i6-blog

Três mudanças independentes na apresentação dos cards.

## 1. Recent strip cabendo no viewport do hero

**Problema:** cada card horizontal em `RecentStrip` (layout `side`) cresce para preencher 1/3 da altura do hero. Com hero em aspect-ratio grande, os cards ficam altos demais.

**Ajuste em `src/components/blog/RecentStrip.tsx` (layout `side`):**
- Trocar `flex-1 grid` com `gridTemplateRows` por uma pilha `flex flex-col gap-3` com **altura fixa por card** (`h-[110px] md:h-[120px]`), sem esticar.
- Envolver em container com `max-h-full overflow-hidden` para nunca ultrapassar a coluna do hero.

**Ajuste em `src/components/blog/BlogCard.tsx` (variant `horizontal`):**
- Reduzir padding interno (`p-3 md:p-4`), imagem em `w-1/3` em vez de `w-2/5`.
- `line-clamp-2` no título, tamanho `text-sm`.
- Esconder a linha de theme quando espaço apertado (manter apenas badge i6 BLOG + data).

**Ajuste em `src/pages/Blog.tsx`:**
- Nada estrutural — o grid `items-stretch` continua, mas com cards de altura fixa a coluna direita simplesmente empilha e para; se sobrar espaço vazio abaixo do 3º card, tudo bem (hero define altura).

Resultado: hero + 3 recentes cabem na dobra sem scroll.

## 2. Título "INSIGHTS RECENTES" mais suave

Em `RecentStrip.tsx`:
- `text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-3`
- Remover `text-xl md:text-2xl font-bold text-white`.

Aplicado só ao layout `side` (o `row` mobile pode seguir o mesmo padrão para consistência).

## 3. Redesign dos rails de temas

**Problema atual:** `ThemeRail` alterna tamanhos `sm/md/lg` (larguras 280/340/420px, alturas de imagem diferentes) → cards desalinhados, aspecto amador.

**Novo design — "Editorial Row":**

```text
┌──────────────────────────────────────────────────────────────┐
│ TEMA                                          ‹ ›            │
├──────────────────────────────────────────────────────────────┤
│  ╭────────╮  Título grande do artigo em destaque             │
│  │ cover  │  Excerpt em 2 linhas, cinza suave                │
│  │ 16:10  │  ─────                                           │
│  ╰────────╯  BADGE · data · X min                            │
│                                                              │
│  ── divisor sutil ──                                         │
│                                                              │
│  ╭────────╮  Próximo título                                  │
│  │ cover  │  Excerpt…                                        │
│  ╰────────╯                                                  │
└──────────────────────────────────────────────────────────────┘
```

- Rail vira uma **lista horizontal de "painéis"** onde cada painel contém 2-3 artigos empilhados no formato horizontal (imagem quadrada à esquerda, texto à direita), separados por um divisor sutil `border-white/5`.
- Cada painel: `w-[85vw] sm:w-[520px]`, altura fixa uniforme.
- Todos os cards do mesmo tamanho → alinhamento visual limpo.
- Hover: glow radial coral discreto no painel inteiro + título coral no item apontado.
- Imagem em `rounded-xl`, aspect quadrado `w-24 h-24 md:w-28 md:h-28`, ao invés de banner em cima.
- Setas ‹ › continuam navegando painéis.

**Implementação:**
- Reescrever `src/components/blog/ThemeRail.tsx`: agrupar `articles` em chunks de 3 e renderizar um `ThemePanel` por chunk.
- Criar componente inline `ThemePanel` (mesmo arquivo) que renderiza 3 `BlogCard variant="horizontal"` compactos separados por `<div className="h-px bg-white/5" />`.
- Reusar o `BlogCard` horizontal com uma variante `compact` (imagem menor, sem theme chip, `line-clamp-2` no título) — ou passar prop `dense`.

**Título do tema:** manter `text-2xl md:text-3xl font-bold`, mas adicionar um sublinhado curto coral (`h-0.5 w-10 bg-[#F4845F] mt-2`) para dar assinatura visual moderna sem pesar.

## Notas técnicas

- Nenhuma mudança em hooks, sync ou rota — só apresentação.
- `BlogCard` ganha prop opcional `dense?: boolean` para o modo compacto usado nos painéis de tema.
- Verificar visualmente com viewport 1280×1800 após aplicar.
