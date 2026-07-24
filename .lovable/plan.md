# Teste: Vídeo na Hero (EN)

Substituir a imagem panorâmica da hero pelo vídeo anexo, **apenas no idioma inglês**. PT continua com as imagens atuais (desktop e mobile) sem alterações.

## Passos

1. **Upload do vídeo como asset CDN**
   - Executar `lovable-assets create --file /mnt/user-uploads/Infographic_video_business_drive_202607241155.mp4 --filename hero-decisao-en.mp4` e salvar o pointer em `src/assets/hero-decisao-en.mp4.asset.json`.

2. **Editar `src/components/hometeste/HeroDecisaoV4.tsx`**
   - Importar o novo `.asset.json`.
   - No bloco da hero, quando `isPt === false`, renderizar um `<video>` no lugar do `<picture>`:
     - `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"`, sem controles.
     - Mesmas classes/dimensões atuais (`w-[72%]`, `max-h-[45vh] md:max-h-[43vh]`, `object-contain`, `select-none`).
     - Manter o mesmo `clip-path: inset(0 0.5% 2.5% 0.5%)` para consistência.
   - Quando `isPt === true`, manter o `<picture>` atual (PT desktop + PT mobile) inalterado.
   - EN mobile: usar o mesmo `<video>` (o vídeo é responsivo via `object-contain`); não usa mais a imagem EN mobile.

3. **Mesclar com o fundo (`#0B1224`)**
   - O vídeo original tem fundo dark navy que já casa visualmente com a página, mas para eliminar qualquer borda perceptível:
     - Container recebe `bg-transparent` (herda o `#0B1224` da section).
     - Adicionar máscara CSS de fade suave nas 4 bordas do vídeo:
       `style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 70%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 70%, transparent 100%)' }}`.
     - Isso funde o vídeo com o fundo escuro sem depender de chroma-key no arquivo.

4. **Fallback**
   - Adicionar `poster` usando a imagem EN atual (`hero-decisao-panorama-en-v7-transparent`) para exibição instantânea enquanto o vídeo carrega.

## Fora de escopo
- Nenhuma alteração em PT, nas seções abaixo da hero, no header/footer ou nos outros idiomas/rotas.
- Nenhum reprocessamento de imagens.

Depois de aprovar, implemento e você valida no preview EN antes de decidir se estende para PT/mobile.