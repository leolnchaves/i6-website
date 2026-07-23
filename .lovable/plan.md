## Reprocessar a imagem de ondas preservando a gradação fina

O problema atual: a v2 recolore todos os pixels não‑brancos para `#F4845F` chapado, destruindo as linhas translúcidas do original e criando um efeito "montanhas sólidas".

### Solução

Reprocessar `/mnt/user-uploads/fundo_kiosk-2.png` (mesma arte do anexo 2), preservando o RGB original e removendo apenas o fundo branco:

```python
# alpha = distância do branco (min(r,g,b) alto = branco → transparente)
lum = min(r, g, b)
alpha_new = (255 - lum)          # branco puro → 0, coral saturado → ~255
alpha_new[lum > 240] = 0         # limpa ruído esbranquiçado
# manter RGB do original (não recolorir)
```

Isso mantém a translucidez natural das linhas — pixels claros ficam suavemente visíveis, pixels saturados de coral ficam mais opacos, exatamente como no anexo 2.

### Passos

1. Rodar o script acima gerando `/tmp/kiosk-waves-v3.png`.
2. Upload via `lovable-assets create` → `src/assets/kiosk-waves-coral-v3.png.asset.json`.
3. Atualizar import em `src/components/kiosk/AttractScreen.tsx` para v3.
4. Manter `opacity: 0.75` sem `mix-blend-mode` (o próprio alpha já mescla naturalmente com o navy).
5. Remover o pointer `kiosk-waves-coral-v2.png.asset.json` e deletar o asset antigo do CDN via `lovable-assets delete`.

### Fallback (caso a v3 ainda não fique boa)

Se a translucidez não convencer, gerar programaticamente uma versão em SVG com múltiplas curvas Bézier coral em stroke fino com blur (`feGaussianBlur`) e `stroke-opacity` decrescente — 100% escalável, sem depender do PNG. Estimo ~40 linhas de SVG. Só executamos esse fallback se a v3 falhar visualmente.

Sem mexer em nenhum outro componente — mudança isolada ao AttractScreen do totem.
