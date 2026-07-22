## Diagnóstico

Os diagramas parecem "apagados" porque a extração de transparência usada até agora deriva o alpha da **luminância** (pixel escuro = transparente). Isso funciona para remover o fundo, mas **também reduz a opacidade das próprias linhas coral e brancas** — os traços viram semi-transparentes e se misturam com o `#0B1224` do hero, perdendo saturação e nitidez. Além disso, a EN atual foi padded/reescalada, o que degradou o pixel.

## Ajuste

**1. Nova imagem EN (upload atual)**
- Anexo tem 1920×640 (ratio 3.0, mais panorâmica que PT 3832×1642 / ratio 2.33).
- Processar sem esticar: upscale Lanczos ~2x para nitidez retina.

**2. Reprocessar ambas as imagens com extração de alpha por "background subtraction"** em vez de luminância:
   - Detectar cor de fundo (navy ~#0B1224).
   - Alpha = distância cromática ao fundo (com curva suave nas bordas para antialiasing).
   - **Unpremultiplicar** o RGB pelo alpha para restaurar a cor original das linhas — resultado: traços coral com saturação total e brancos com brilho pleno, sem halo escuro.
   - Aplicar leve boost de contraste (~1.1) para compensar qualquer suavização residual.

**3. Manter dimensões harmônicas entre PT e EN**
   - PT permanece 3832×1642 (já em alta res).
   - EN escalada para largura equivalente ao conteúdo visual da PT — tratamento que preserve a densidade de pixels percebida, sem alterar `HeroDecisaoV4.tsx`.

**4. Substituir os pointers**:
   - `hero-decisao-transparent-hd.png.asset.json` (PT reprocessada)
   - `hero-decisao-transparent-hd-en.png.asset.json` (EN nova)
   - Deletar assets antigos via `lovable-assets delete`.

Nenhuma alteração em `HeroDecisaoV4.tsx`.

### Observação sobre proporção

A EN nova (3.0) é mais larga que a PT (2.33). Como o hero centraliza verticalmente com `w-full h-auto`, a EN vai renderizar **mais baixa** que a PT no mesmo largura — ficando visualmente harmônica (mesma largura, menos altura). Se preferir altura idêntica à PT, posso adicionar padding transparente vertical na EN para chegar a 2.33; me diga se quer essa variação.
