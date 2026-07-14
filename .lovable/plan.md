## Problema

No `lg` breakpoint, o grid do topo do blog usa `items-stretch` + `lg:max-h-[62vh]` (máximo, não altura fixa). O `BlogHero` usa `lg:h-full`, então depende da altura da linha do grid, que é definida pelo item mais alto. Com apenas 1 card recente (~100px), a linha inteira colapsa para ~100px e o destaque some/achata junto.

## Correção

Inverter a lógica: o destaque define a altura, e a coluna dos recentes se ajusta.

**Arquivo único:** `src/pages/Blog.tsx`

- Trocar `lg:max-h-[62vh]` por uma altura fixa no grid em `lg`: `lg:h-[62vh]` (ou similar). Assim a linha sempre tem a altura do destaque, independente de quantos recentes existam.
- `BlogHero` continua com `lg:h-full` (já preenche).
- `RecentStrip` (layout `side`) já é `flex-col h-full`; ele apenas passa a existir dentro de uma coluna mais alta que os cards — os cards mantêm suas alturas fixas atuais (92–100px) e o restante fica como espaço vazio no fim da coluna, o que é aceitável e mantém alinhamento ao topo.

Nenhuma mudança em componentes, hooks, conteúdo, header ou estilos dos cards.

## Validação

Abrir `/pt/i6-blog` com 1 recente e confirmar que o destaque renderiza na altura padrão e a coluna direita alinha ao topo do destaque.