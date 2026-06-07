## Problema

Hoje, em `src/pages/Insights.tsx`, o bloco da imagem (`h-40`) só é renderizado quando existe `cover`. Resultado: cards sem imagem ficam com um vazio enorme do lado dos com imagem, quebrando o ritmo do grid (como na captura).

## Solução

Garantir que **todo card tenha a mesma estrutura visual de topo**, independente de ter ou não imagem de capa. Duas opções de tratamento, aplicadas juntas:

1. **Reservar sempre o slot de capa** (mesma altura `h-40`) em `InsightCard`.
2. **Quando não houver `cover`**, preencher esse slot com um **fallback visual** coerente com a marca infinity6:
   - Fundo com gradiente sutil em navy + leve glow coral (`from-white/5 via-[#F4845F]/5 to-white/[0.02]`).
   - Marca d'água central com a label do tipo (ex.: "I6 ON MEDIA") em tipografia grande, baixa opacidade, tracking largo — vira identidade visual ao invés de buraco.
   - Mantém `overflow-hidden` e `rounded` do card.

Isso resolve o desalinhamento sem inventar imagens falsas e mantém a hierarquia: cards com imagem continuam visualmente mais ricos, mas todos compartilham a mesma "moldura".

## Mudança técnica

Arquivo único: `src/pages/Insights.tsx`, componente `InsightCard`.

```text
<article>
  <div class="h-40 ...">           ← sempre presente
    {cover
      ? <img />                    ← caso atual
      : <FallbackCover type=... /> ← novo
    }
  </div>
  <div class="p-6 flex-1 ...">     ← inalterado
    ...
  </div>
</article>
```

`FallbackCover` é um pequeno componente local (sem novo arquivo) que renderiza o gradiente + marca d'água com a label de tipo já calculada (`labels[insight.type]`).

## Fora de escopo

- Não mexer no `InsightArticle.tsx` (página de detalhe).
- Não alterar lógica de fetch, hooks, ou o script de sync.
- Não trocar o grid nem o número de colunas.
- Sem mudanças no design system / tokens globais.
