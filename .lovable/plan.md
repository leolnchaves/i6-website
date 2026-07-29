## Nova cena: "Líderes que transformam antecipação em vantagem"

Sim, dá para adicionar. Entra como uma nova cena de prova social, com as mesmas 11 logos de clientes que o site exibe hoje (`public/content/partners-logos.md`): EMS, Multi, Biolab, Banco BMG, Unicred, Germed, Legrand, Alpargatas, Camil, MDS Group e Skyfit.

O arquivo final sai com **nome novo** — `/mnt/documents/infinity6-institucional-v2.mp4` — sem tocar no vídeo atual.

Observação: o vídeo está todo em português, então o título da cena entra como **"Líderes que transformam antecipação em vantagem"** (mantendo o eyebrow coral no padrão das outras cenas). Se preferir manter em inglês, é só dizer.

### Onde entra

Logo **antes de "Resultados"**: territórios/produto → quem confia → números → fechamento. Duração ~230 frames (~7,7 s), na faixa dos beats médios já usados.

### Assets

- Copiar os 11 PNGs de `public/content/logos/` para `remotion/public/images/clients/`, referenciados via `staticFile()`.
- Logos coloridas sobre fundo navy costumam brigar com a paleta: aplicar tratamento monocromático (`filter: grayscale(1) brightness(1.9)`) com opacidade ~0.85, mantendo a peça coesa. Verifico por still se alguma logo escura sumir e ajusto individualmente.

### Cena (`remotion/src/scenes/Clients.tsx` — novo)

- Eyebrow coral `PROVA` + `Title` cinético com o texto, alinhado à esquerda (layout assimétrico, sem centralizar).
- Grade de 6 + 5 logos em duas fileiras, cada uma num "slot" com borda fina `LINE` e cantos arredondados.
- Entrada com stagger irregular (5, 9, 14, 20, 27, 35…), spring `damping: 16`, subindo com blur→nítido.
- Micro-vida contínua: cada slot com deriva senoidal defasada (±3 px) para nenhum frame ficar parado.
- Uma varredura coral suave (gradiente em `mix-blend-mode: overlay`) percorre a grade uma vez, "lendo" as logos.
- Saída ativa via `Reveal`/`useExit`, como nas demais cenas.

### Integração (`MainVideo.tsx`)

- Adicionar `clients: 230` ao mapa `D` e a sequência com `<Scene i={6} …>` (renumerando Results/Closing para 7 e 8, o que também muda as variantes de câmera e mantém a alternância de movimento).
- Transição de entrada: `frameWipe({ direction: 'right' })`; saída para Resultados: `glitchCut()` — reaproveitando o vocabulário existente, sem criar tipo novo.
- `TOTAL_FRAMES` recalculado automaticamente pelas somas já existentes (`SCENES_TOTAL - TRANS_TOTAL`), ajustando `TRANS_TOTAL` para a transição extra.

### Render e verificação

- Stills nos frames de entrada da cena, no meio da grade e na transição para Resultados, para conferir legibilidade das logos e alinhamento.
- Render em blocos (o render completo estoura o limite de 600 s do sandbox) e concatenação com `ffmpeg`.
- Saída em `/mnt/documents/infinity6-institucional-v2.mp4` (arquivo novo, o antigo permanece intacto).
- Conferência final com `ffprobe` (duração ≈ 113 s) e checagem da data do arquivo.

### Fora de escopo

Mudar copy das outras cenas, paleta, fontes ou adicionar áudio.