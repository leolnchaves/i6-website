## Redesenho do vídeo: de "slides" para peça de motion

Mantemos texto, ordem das cenas e identidade (navy #0B1224 + coral #F4845F, Rubik/Inter). O que muda é a **linguagem de movimento**: hoje cada cena é um bloco estático que entra com `Reveal` e sai numa transição de biblioteca — é isso que dá cara de apresentação. A ideia é substituir por um sistema contínuo de câmera, moldura e ruído.

Não substitua o video antigo, crie um novo arquivo. 

### 1. Sistema de câmera contínua (`components/Camera.tsx` — novo)

Wrapper que aplica a cada cena um movimento lento e permanente derivado de `useCurrentFrame()`:

- drift/parallax sutil (translate 0–30px), micro-zoom (scale 1.00 → 1.05) e rotação < 0.4°;
- direção alternada por cena (uma puxa da esquerda, a próxima empurra pra cima) para que nunca haja dois movimentos iguais seguidos;
- camadas com velocidades diferentes: fundo mais lento que o conteúdo (parallax real).

Resultado: nenhum frame parado, mesmo durante o tempo de leitura.

### 2. Transições que "cortam", não que "passam"

Trocar `fade`/`slide` genéricos do `@remotion/transitions` por transições autorais em `MainVideo.tsx`:

- **Wipe de moldura**: uma barra coral fina varre a tela e revela a cena seguinte atrás dela;
- **Whip-pan**: pan rápido (6–8 frames) com motion blur por `filter: blur()` no eixo do movimento;
- **Corte seco com glitch** nos momentos de mais energia (entrada de Engines, entrada de Results);
- **Match cut** de elemento: o rule coral da cena A vira a borda do card da cena B.

Regra: no máximo 3 tipos, repetidos com ritmo — variedade demais volta a parecer slideshow.

### 3. Efeitos de vídeo (moldura, glitch, grão)

Novos componentes em `remotion/src/components/fx/`:

- `Frame.tsx` — moldura viva: cantos em L coral que desenham/apagam por `strokeDashoffset`, marcas de "viewfinder", régua fina com timecode discreto. Aparece e recolhe conforme a cena.
- `Glitch.tsx` — deslocamento RGB (3 camadas com `mix-blend-mode: screen` em offsets de 1–4px), slices horizontais e queda de scanline. Usado em rajadas de 3–6 frames, no máximo 5 vezes no vídeo inteiro.
- `Grain.tsx` — grão/ruído animado por SVG `feTurbulence` com seed dependente do frame + vinheta suave. Camada global, opacidade ~4%.
- `Scanlines.tsx` — linhas horizontais bem discretas só nas cenas de produto (Signal, Engines), reforçando o tom "tela/telemetria".

### 4. Coreografia dentro das cenas

Substituir o `Reveal` único por um vocabulário mais rico em `components/Type.tsx`:

- **Kinetic type**: título revelado por máscara `clip-path` linha a linha, com char-stagger no destaque coral;
- **Contadores**: os números de `Results.tsx` sobem de 0 ao valor com easing (e o card recebe um flash coral ao travar);
- **Stagger irregular**: delays não-lineares (5, 9, 16, 26 frames) em vez de intervalos iguais;
- **Saída ativa**: elementos saem com blur + deslocamento antes do corte, em vez de esperarem o crossfade.

### 5. Motivos gráficos recorrentes

- Grade de pontos/linhas que se desenha e apaga entre blocos;
- "Sinal" coral (linha que atravessa a tela) usado como fio condutor — sai de uma cena e entra na próxima;
- Barras de progresso finas no topo, marcando o avanço da narrativa sem virar rodapé.

### 6. Ritmo

Recalibrar durações para variação real: beats curtos de 60–90 frames intercalados com respiros de 300+ (Signal continua a cena longa). Hoje as cenas ficam entre 210 e 700 frames com pouca variação percebida porque o movimento interno é constante — o ritmo vem tanto do corte quanto da densidade de eventos por segundo.

### Técnico

- Tudo frame-based (`useCurrentFrame`/`interpolate`/`spring`), sem CSS animation.
- Sem `backdropFilter` (crash no render do sandbox); glitch e grão via `filter`, `mix-blend-mode` e SVG.
- Verificação por stills (`bunx remotion still`) nos frames de transição e nas rajadas de glitch antes do render completo.
- Render final para `/mnt/documents/infinity6-institucional.mp4` via `node scripts/render-remotion.mjs`, recalculando `TOTAL_FRAMES` em `MainVideo.tsx`.

### Fora de escopo

Reescrita de copy, mudança de paleta/fontes e áudio (o render continua mudo).