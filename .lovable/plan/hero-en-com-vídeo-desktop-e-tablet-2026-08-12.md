# Hero EN com vídeo (desktop e tablet)

## Objetivo
A home em inglês passa a usar o vídeo anexo como fundo do hero em desktop e tablet, com exatamente a mesma estrutura, enquadramento, gradientes e glow já usados no hero PT. Mobile continua com a imagem estática do mapa (EN).

## O que muda
- O vídeo anexo (`home-eng-i6.mp4`) vira asset de CDN e é usado no hero quando o idioma é EN.
- A camada de vídeo do hero deixa de ser exclusiva de PT: passa a renderizar em PT e EN, escolhendo o arquivo por idioma (PT: `hero-video-pt-v8`, EN: novo asset).
- A imagem panorâmica atual do EN no espaço central (`hero-decisao-panorama-en-v7`) sai de desktop/tablet, já que o fundo agora é o vídeo — evita arte duplicada.
- Mobile (<768px): sem alteração, segue a imagem `hero-mapa-mobile-en-v9` com máscara nas bordas.
- Mesmas classes de enquadramento (`object-contain` em tablet, `object-cover` + `object-[center_58%]` + `translate-y-[4vh]` em desktop), mesmos gradientes vertical/lateral, mesmo glow coral, mesmo respeito a `prefers-reduced-motion` (poster estático).

## Técnico
- Novo pointer: `src/assets/hero-video-en-v1.mp4.asset.json` (via `lovable-assets create` a partir do upload, sem recompressão).
- Poster: reutilizar o poster atual se servir visualmente; caso contraste destoe, extrair um frame do vídeo EN e subir como `hero-video-en-v1-poster.jpg`.
- Arquivo alterado: `src/components/hometeste/HeroDecisaoV4.tsx` — condição `isPt &&` da camada de vídeo removida, `src` do `<source>` e do poster escolhidos por idioma; bloco `!isPt` da picture panorâmica removido.
- Sem mudança de copy, CTA, rotas, i18n ou lógica.
- Verificação em 393px, 820px e 1440px, em `/pt` e `/en`, antes de qualquer publicação.

## Publicação
Só preview nesta etapa. Publico release depois da sua aprovação visual.
