

## Corrigir visibilidade e posicionamento das ondas verticais

### Problemas identificados (pela screenshot)

1. **Opacidade muito baixa** -- as ondas estao quase invisiveis contra o fundo escuro
2. **Nao encostam na borda esquerda** -- as ondas estao deslocadas para dentro, com um gap entre elas e a lateral da pagina

### Mudancas em `src/components/solutions/VerticalWaves.tsx`

**Aumentar opacidade de todos os 8 paths:**

| Layer | Opacidade atual | Nova opacidade |
|-------|----------------|----------------|
| 1 (pequena, rapida) | 0.18 | 0.40 |
| 2 (pequena, media) | 0.14 | 0.35 |
| 3 (media, media) | 0.12 | 0.30 |
| 4 (media, lenta) | 0.10 | 0.28 |
| 5 (grande, lenta) | 0.08 | 0.25 |
| 6 (grande, muito lenta) | 0.06 | 0.22 |
| 7 (compacta, forte) | 0.22 | 0.45 |
| 8 (media, sutil) | 0.09 | 0.28 |

**Encostar na borda esquerda:**

- Mudar o `viewBox` de `"0 0 500 2000"` para `"250 0 500 2000"` -- isso corta a metade esquerda vazia do SVG, fazendo com que o centro dos paths (x=250) fique na borda esquerda da tela
- As ondulacoes vao se expandir para a direita a partir da borda, coladas na lateral

Alternativamente, pode-se mover o container com `left-[-110px]` para deslocar o SVG para a esquerda, mas ajustar o viewBox e mais limpo.

### Resultado

- Ondas visiveis e claras contra o fundo navy
- Coladas na borda esquerda da viewport, como um "sinal vivo" saindo da lateral da pagina

