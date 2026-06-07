Reduzir altura da imagem nos cards de insights em `/insights` para deixá-los mais compactos.

## Mudança

Em `src/pages/Insights.tsx`, no componente `InsightCard`:
- Trocar `aspect-video` (16:9, alto) por `h-40` (~160px de altura fixa) no wrapper da imagem de capa.

Isso deixa a imagem bem mais baixa, mantendo o `object-cover` para não distorcer, e torna o card geral mais compacto. Nenhuma outra mudança visual ou de conteúdo.
