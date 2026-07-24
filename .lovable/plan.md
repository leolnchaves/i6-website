## Objetivo

Harmonizar o bloco **ALAVANCAS DE VALOR** na página de detalhe de success story para que fique equilibrado independentemente da quantidade de alavancas selecionadas no i6 HUB, e adicionar um subtítulo indicando que os chips são clicáveis.

## Diagnóstico

Em `src/pages/SuccessStoryArticle.tsx` (linhas 215–240) o container hoje é apenas `flex flex-wrap gap-2`. Isso gera linhas desiguais (ex.: 3 chips na primeira linha + 1 chip solto na segunda, como no screenshot enviado) e passa sensação de layout quebrado. Também não há indicação visual de que os chips são links.

## Mudanças

### 1. Subtítulo abaixo do título

- PT: "Clique para conhecer as soluções aplicadas"
- EN: "Click to explore the applied solutions"

Adicionar chave `appliedSolutionsHint` no objeto `t` (por volta da linha 74) e renderizar um `<p className="text-sm text-white/60 mb-4">` logo após o `<h2>` do título.

### 2. Container visual da seção

Envolver os chips num card com a mesma linguagem visual das outras seções:
`rounded-xl border border-white/10 bg-white/5 p-6`.

Título e subtítulo ficam dentro do card.

### 3. Grid responsivo por quantidade

Trocar `flex flex-wrap gap-2` por um **grid** cuja quantidade de colunas se adapta ao total de alavancas, garantindo linhas balanceadas.

Regra desktop (≥ md):

| Nº de alavancas | Colunas | Comportamento |
|---|---|---|
| 1 | 1 | chip único centralizado com `max-w-sm mx-auto` |
| 2 | 2 | dois chips lado a lado, mesma largura |
| 3 | 3 | três colunas iguais |
| 4 | 2 | grade 2×2 equilibrada (evita 3+1) |
| 5 | 3 | 3 em cima, 2 embaixo centralizadas |
| 6 | 3 | 3×2 perfeito |
| 7+ | 3 (ou 4 se ≥ 8) | grid uniforme |

Mobile: 1 coluna. Tablet (sm–md): 2 colunas.

Implementado via função utilitária local `gridColsFor(count)` que devolve as classes Tailwind do grid.

### 4. Padronização dos chips

- `w-full text-center justify-center min-h-[44px] flex items-center`
- Mantém cores/hover atuais (`#F4845F` translúcido, borda coral)
- Comportamento de link e whitelist inalterados

## Arquivos afetados

- `src/pages/SuccessStoryArticle.tsx` — apenas o bloco entre as linhas 215–240 e o objeto `t`.

## Fora do escopo

- Não altera parser, MD, hooks, contrato `Rótulo|slug` do HUB, nem outras páginas.
- Não muda cores globais nem tipografia da seção.

## Verificação

Conferir visualmente com 1, 2, 3, 4, 5 e 6 alavancas (o caso atual com 4 chips deve virar grade 2×2). Testar mobile e desktop em PT e EN.
