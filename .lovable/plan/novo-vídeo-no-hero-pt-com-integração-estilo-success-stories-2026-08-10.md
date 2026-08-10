# Novo vídeo no hero PT com integração estilo success stories

## Problema atual
O vídeo é tratado como uma "figura" flutuante: faixa central com `object-contain`, `mix-blend-mode: lighten` e máscara radial. Como o vídeo tem fundo quase preto e proporção diferente da faixa, sobra um retângulo perceptível.

## Nova abordagem (a mesma da tela de detalhe de success stories)
Na página de história de sucesso a imagem funciona porque ela cobre toda a largura da seção (`object-cover`, `inset-0`) e é integrada apenas por camadas de navy em gradiente — sem blend, sem máscara radial:

```text
img object-cover inset-0 + brightness/saturate/contrast
+ navy plano leve
+ gradiente vertical (transparente -> navy)
+ gradiente horizontal (navy -> transparente -> navy)
```

Aplicar o mesmo padrão ao vídeo do hero:

1. Publicar o novo `hero-i6-2.mp4` como asset (WebM VP9 + MP4 H.264 + poster JPG, sem áudio, 1268x724 / 30 fps).
2. O vídeo passa a ser fundo real do hero: `absolute inset-0`, `w-full h-full`, `object-cover` — sem faixa de altura, sem `object-contain`, sem máscara radial, sem `mix-blend-mode`.
3. Integração por camadas navy (`#0B1224`), como nos success stories:
   - filtro no vídeo: `brightness(0.7) saturate(0.85) contrast(1.05)`;
   - navy plano leve por cima;
   - gradiente vertical do transparente ao navy sólido em cima e embaixo;
   - gradiente horizontal navy nas laterais.
   Assim as quatro bordas terminam em navy puro e nenhum retângulo aparece.
4. Manter o glow coral sutil no núcleo e o conteúdo do hero em `z-10`.
5. Manter o comportamento atual de performance/acessibilidade: `autoplay muted loop playsinline preload="metadata"`, poster imediato, apenas poster em mobile e `prefers-reduced-motion`.

Como o `object-cover` corta as bordas do vídeo, o núcleo "Decisão Antecipada" fica centralizado e continua legível; o ajuste fino do `object-position` será validado por screenshot no preview PT.

## Técnico
- Conversão com `ffmpeg` (`libvpx-vp9` CRF ~34, `libx264` CRF ~26, `-an`, `+faststart`) e novos pointers `hero-video-pt-v3.*` em `src/assets/`.
- Único arquivo alterado: `src/components/hometeste/HeroDecisaoV4.tsx` (imports, camada de fundo e overlays). EN inalterado.
- Sem release/deploy nesta etapa; verificação por screenshot no preview.
