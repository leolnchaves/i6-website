# Nova imagem do hero (PT) com integração fluida

## Objetivo
Trocar a imagem do hero da home em PT pela imagem anexa (mapa neon "Decisão Antecipada vs Decisão Reativa"), em resolução máxima, integrada ao fundo navy `#0B1224` sem parecer "imagem colada".

## O que muda
1. Subir o arquivo anexo para o CDN de assets e criar o pointer `src/assets/hero-decisao-neon-pt-v1.png.asset.json`.
2. Em `src/components/hometeste/HeroDecisaoV4.tsx`, usar esse asset como imagem PT (desktop e mobile) — o inglês continua com os assets atuais.
3. Integração visual (só apresentação):
   - Máscara radial/linear suave nas quatro bordas (`mask-image`), fazendo a arte dissolver no navy em vez de terminar em retângulo.
   - Leve `mix-blend-mode: screen` opcional para o preto de fundo somar com o navy; se causar alteração de cor, mantém apenas a máscara.
   - Glow coral difuso atrás do núcleo central (radial-gradient de baixa opacidade) para amarrar a arte à paleta da marca.
   - Escala/enquadramento: largura maior no desktop (arte é panorâmica) com `object-contain`, sem esticar; em mobile, crop suave centrado no núcleo para o texto não ficar ilegível.
   - Fade-in sutil na entrada, alinhado ao restante do hero.

## Técnico
- Upload via `lovable-assets create --file /mnt/user-uploads/FUNDO-HERO-I6.png` (PNG original, sem recompressão, mantendo resolução).
- Nada de mudança em rotas, i18n ou lógica; apenas o componente do hero e o novo pointer de asset.
- Sem deploy/release nesta etapa — só preview para avaliação.
