## Detalhes técnicos

Escopo: dois arquivos, sem mudança de layout.

`src/pages/Intelligence.tsx`
- `fromIntelligence`: trocar `kind: 'i6 Research'` fixo por `kind: p.type as FeedKind` (o hook já garante que só passa `i6 Research` ou `i6 eBook`).
- `feed`: após concatenar `pieces` e `intelInsights`, remover duplicatas por chave `slug + language`, dando precedência à peça da pasta de research (é a que tem corpo de artigo). Ordenação por `date` desc mantida, com desempate estável por `slug` para eliminar a instabilidade em datas iguais.

`src/hooks/useInsights.ts`
- Remover o bloco de inferência que atribui `i6 eBook`/`i6 Article` a arquivos de `/content/intelligence/` sem `type`. Passa a valer só a regra estrita: `type` ausente ou inválido → item descartado. Em DEV, `console.warn` com o slug descartado, no mesmo formato já usado em `useIntelligence.ts`.

Sem alteração em `useIntelligence.ts`, `Insights.tsx`, `Blog.tsx`, componentes de blog, `scripts/sync-content-from-i6hub.mjs` ou qualquer `.md` de conteúdo.

## Verificação

- Checagem de tipos e build.
- `/pt/i6-intelligence` e `/en/i6-intelligence`: mesma contagem de peças de hoje (14 research), um único cartão em largura dupla, filtros Tipo e Tema funcionando.
- Teste do caso de duplicação: com um eBook temporário na pasta de research, confirmar cartão único e rótulo `i6 eBook`.
- `/pt/i6-blog` e `/pt/insights` sem mudança de contagem nem de ordem.

Sem release nem deploy.
