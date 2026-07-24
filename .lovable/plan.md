Reprocessar as 4 imagens da hero (PT/EN desktop + mobile) com o mesmo chroma-key apertado que ficou perfeito da última vez (`bg=#0B1224`, `lo=8`, `hi=22`), preservando resolução original.

Passos:
1. Baixar os PNGs atuais via URL do `.asset.json` de cada uma das 4 imagens.
2. Rodar script Python (PIL/numpy) com distância ao fundo `#0B1224` e limiar `lo=8` / `hi=22` — sem feathering agressivo — gerando novos PNGs transparentes na mesma resolução.
3. Fazer upload via `lovable-assets` com novos nomes versionados (`-v7-transparent` para PT desktop, `-v6-transparent` para EN desktop, `-v5-transparent` mobile PT, `-v4-transparent` mobile EN).
4. Atualizar os 4 imports em `src/components/hometeste/HeroDecisaoV4.tsx`.
5. Não mexer em tamanhos, posicionamento ou clip-path — apenas trocar os assets.