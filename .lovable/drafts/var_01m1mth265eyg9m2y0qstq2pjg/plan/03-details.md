## Verificação obrigatória

Depois da mudança 3, as duas peças de ruptura de gôndola precisam continuar visíveis na página de research, em PT e EN. Se desaparecerem, significa que os passos 1 ou 2 não foram aplicados corretamente: o trabalho para, é reportado e nada mais é alterado.

Ao final: verificação de tipos, build e relatório. Sem publicação nem deploy nesta rodada. O redesenho visual aprovado vem depois, separado.

## Detalhes técnicos

**1. `scripts/sync-content-from-i6hub.mjs` — `fmResearch`**
Acrescentar uma única linha de frontmatter: `type: ${it.type ?? 'i6 Research'}`. Demais campos gravados permanecem idênticos, na mesma ordem.

**2. Frontmatter dos arquivos reais**
Adicionar `type: i6 Research` em `src/content/intelligence/ruptura-gondola-ia-preditiva-pt.md` e `...-en.md`. Nenhum outro campo é tocado.

**3. `src/hooks/useIntelligence.ts`**
No `.map()` que monta `ALL`, substituir a lógica atual (que aceita item sem `type` e rejeita apenas tipos conhecidos de blog/mídia) por: aceitar somente `type` presente e pertencente a `RESEARCH_TYPES` (`i6 Research`, `i6 eBook`); qualquer outro caso retorna `null`. Antes do `null`, emitir `console.warn` sob `import.meta.env.DEV` citando o slug (derivado do frontmatter ou do nome do arquivo) e o tipo encontrado. O set `BLOG_MEDIA_TYPES` deixa de ser necessário e sai junto com o comentário legado. Nenhuma outra função do hook (`useIntelligencePiece`, `resolveIntelligenceCover`) muda.

Fora de escopo: `Intelligence.tsx`, `useInsights.ts`, leitores de artigo, `HeaderNovo.tsx`, traduções, blog e insights.
