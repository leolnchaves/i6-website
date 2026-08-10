# Vídeo como fundo do hero (PT)

Substituir a imagem neon atual do hero em PT por um vídeo em loop, leve e sem perda visual perceptível.

## Fonte

O arquivo enviado tem 1280x720, 24 fps, 8,04 s, ~1,95 Mbps, sem áudio (1,9 MB).

## O que fazer

1. **Preparar duas versões otimizadas (sem áudio, loop suave)**
   - `WebM/VP9` — melhor compressão, servido primeiro para navegadores compatíveis (alvo ~0,7–1,1 MB).
   - `MP4/H.264 (High, yuv420p, faststart)` — fallback Safari/iOS (alvo ~1,0–1,4 MB).
   - Mantém 1280x720 e 24 fps (não faz sentido subir resolução: o upscale não adiciona qualidade e só pesaria). O vídeo entra como camada de fundo desfocada/mascarada, então 720p é suficiente na tela cheia.
   - Extrair um **poster JPG** do primeiro frame representativo, usado como imagem inicial e como fundo em conexões lentas.

2. **Publicar os três arquivos como assets de CDN** (`.asset.json` em `src/assets/`), no mesmo padrão dos assets atuais do hero. O script de deploy estático já materializa qualquer `.asset.json` em `dist/`, então funciona no GitHub Pages sem mudança.

3. **Trocar a camada de fundo PT em `HeroDecisaoV4.tsx`**
   - `<video autoplay muted loop playsinline preload="metadata" poster=...>` com `<source>` WebM + MP4, em `absolute inset-0`, `object-cover`, `z-0`.
   - Mantém o tratamento visual já aprovado: máscara radial nas bordas, vinheta navy nas quatro laterais e glow coral no núcleo, para o vídeo dissolver no `#0B1224` sem retângulo visível.
   - Conteúdo do hero segue em `z-10`.
   - Remover o uso da imagem `hero-decisao-neon-pt-v1` nesse componente (o pointer do asset permanece no repo, sem custo).

4. **Camada neutra por cima do vídeo (suavizar as cores)**
   - Overlay navy translúcido (`#0B1224` a ~35–45% de opacidade) cobrindo todo o vídeo, para reduzir a saturação e o brilho.
   - `backdrop-filter: blur(...)` leve (≈6–10 px) nessa mesma camada, deixando o vídeo com aparência difusa/ambiente em vez de nítido e vibrante.
   - Leve dessaturação e redução de contraste no próprio vídeo (`filter: saturate(0.75) brightness(0.85) contrast(0.95)`), para o resultado ficar neutro mesmo onde o blur não é suportado.
   - Ajuste fino dos valores validado por screenshot, garantindo contraste do título branco e do CTA coral.



5. **Performance e acessibilidade**
   - `preload="metadata"` (não baixa o vídeo inteiro antes do primeiro paint) e o poster aparece imediatamente.
   - Em `prefers-reduced-motion: reduce`, exibe apenas o poster — sem vídeo.
   - No mobile (`< 768px`), exibe apenas o poster por padrão, evitando tráfego e consumo de bateria; o vídeo roda no desktop.
   - `aria-hidden`, `pointer-events-none`, sem áudio.

6. **Verificação**
   - Screenshot do preview PT (desktop) confirmando ausência de bordas retas e legibilidade do título/CTA.
   - EN permanece com os assets atuais. Sem release/deploy nesta etapa.

## Técnico
- Codificação com `ffmpeg` no sandbox (`libvpx-vp9` CRF ~34 + `libx264` CRF ~26, `-an`, `-movflags +faststart`).
- Arquivos alterados: `src/components/hometeste/HeroDecisaoV4.tsx` + novos pointers `hero-video-pt-v1.webm.asset.json`, `hero-video-pt-v1.mp4.asset.json`, `hero-video-pt-v1-poster.jpg.asset.json`.
