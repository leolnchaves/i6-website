# Ajuste do hero em vídeo (home PT)

Dois pontos: o vídeo está lavado/desfocado pelo excesso de camadas escuras, e o hero não se adapta bem a telas menores.

## 1. Reduzir a sensação de "desfoque"

Hoje há três camadas sobre o vídeo somadas ao filtro do próprio vídeo:
- véu navy fixo de 35%
- gradiente vertical que já escurece o meio (via 40%)
- gradiente horizontal 50% nas laterais
- filtro `brightness(0.7) saturate(0.85)`

Mudanças:
- Remover o véu navy fixo de 35% e substituir por um véu bem leve (~10%) apenas para garantir contraste do texto.
- Gradiente vertical: manter transparente no centro e escurecer só topo/base (últimos ~20%).
- Gradiente horizontal: recuar para as bordas (transparente até ~15% de cada lado).
- Filtro do vídeo: `brightness(0.95) saturate(1.0) contrast(1.02)` — mantém as cores originais sem estourar.
- Manter o glow coral central como está.

## 2. Responsividade em telas menores

- Trocar `min-h-screen` por altura fluida com `min-h-[100svh]` e permitir crescimento do conteúdo (sem cortes) em telas baixas.
- Vídeo: manter `object-cover` com `object-position` responsivo (centro no desktop, um pouco mais alto no mobile) para não perder o núcleo da arte.
- Título: reordenar escala tipográfica (o `text-5xl` do mobile está maior que o `sm:text-4xl`) para uma progressão correta: `text-3xl sm:text-4xl md:text-6xl lg:text-7xl`.
- Paddings verticais e o espaçador central passam a usar valores menores no mobile, evitando que descrição e CTA fiquem colados ou cortados.
- Reduzir a intensidade dos gradientes laterais no mobile (onde a área útil é estreita).

## Arquivo afetado

- `src/components/hometeste/HeroDecisaoV4.tsx` (apenas camadas visuais e classes de layout; nenhum conteúdo ou lógica alterada)
