## Problema

A imagem PT tem 3832×1642 (ratio 2.33) e a EN tem 1774×887 (ratio 2.0). Como o `<img>` no hero usa `w-full` (largura fixa), a EN, sendo relativamente mais alta, renderiza mais alta e "sobe" mais no layout — daí a diferença visível.

## Ajuste

Reprocessar o asset EN transparente para ter exatamente as mesmas dimensões da PT (3832×1642), preenchendo as bordas laterais com pixels transparentes para preservar o conteúdo do diagrama e o mesmo enquadramento visual da versão PT.

### Passos

1. Baixar a EN atual (`hero-decisao-transparent-hd-en.png`).
2. Redimensionar mantendo aspect ratio até altura 1642, depois padding transparente centralizado até 3832 de largura (canvas final 3832×1642, igual à PT).
3. Fazer upload via `lovable-assets create` e sobrescrever `src/assets/hero-decisao-transparent-hd-en.png.asset.json`.
4. Deletar o asset antigo com `lovable-assets delete` no pointer anterior (antes de sobrescrever, salvar cópia do pointer antigo).

Nenhuma alteração em `HeroDecisaoV4.tsx` — o mesmo layout/tamanho/posição da PT passa a valer para a EN automaticamente.