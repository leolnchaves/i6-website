## Diagnóstico
Os fundos das imagens não são exatamente `#0B1224` do site (tem gradiente/ruído sutil), então precisam de chroma-key. A versão anterior (v3/v4-transparent) funcionava bem — o problema desta rodada foi o feather largo (lo=18, hi=55) que suavizou demais as bordas dos traços laranja e reduziu a percepção de nitidez.

## Solução
Refazer o chroma-key das duas imagens novas com parâmetros mais conservadores, replicando o comportamento das versões anteriores que o usuário aprovou:
- Threshold tight: só pixels **muito próximos** do fundo viram transparentes.
- Feather curto (poucos pixels) para não invadir os traços/glow laranja.
- Sem redimensionar/reamostrar — resolução original preservada (1400×500).

Parâmetros: distância euclidiana ao fundo `#0B1224`, `lo=8`, `hi=22` (antes: 18/55). Isso mantém o glow laranja e o halo intacto e só apaga o fundo neutro.

## Passos
1. Reprocessar `user-uploads://1.png` → `hero-decisao-panorama-en-v5-transparent.png`
2. Reprocessar `user-uploads://2-2.png` → `hero-decisao-panorama-pt-v6-transparent.png`
3. Publicar como assets CDN (`lovable-assets create`).
4. Atualizar os dois imports em `src/components/hometeste/HeroDecisaoV4.tsx`. Manter `clipPath` (protege borda inferior residual), largura `w-[90%]`, container e mobile intactos.
5. Validar visualmente em `/en` e `/pt` desktop.

## Detalhes técnicos
- PIL + numpy, sem reamostragem.
- Mobile permanece inalterado.
- Sem release/tag.
