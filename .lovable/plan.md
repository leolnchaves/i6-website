## Ajustar fundo de ondas do Hero — mais fluido, sem mudar cor de fundo

**Arquivo:** `src/components/hometeste/HeroMovimento.tsx`

### Diagnóstico
- O `mix-blend-mode: screen` estava clareando o navy `#0B1224` onde as ondas passam, dando impressão de que o fundo mudou. **Remover o blend mode.**
- Sem blend, a imagem PNG mostra os limites retangulares e as ondas parecem "coladas" sobre o navy. **Aplicar máscara de fade nas bordas** para dissolver os limites e integrar de forma fluida.

### Passos

1. **Remover `mixBlendMode: 'screen'`** do `<img>` das ondas — mantém o fundo navy `#0B1224` intacto.
2. **Manter recoloração via filtro CSS** (`hue-rotate` + `saturate`) para preservar shape/desenho e chegar no coral.
3. **Reduzir opacidade** para `~0.14` (mais discreto, menos "sobreposto").
4. **Adicionar máscara de dissolução** nas bordas superior/inferior/laterais usando `maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)'` (ou linear vertical) — faz as ondas surgirem/dissolverem suavemente no navy em vez de terminarem em linha reta.
5. **Escalar levemente** com `object-cover` + `scale-110` para as pontas das ondas saírem do viewport, reforçando a sensação de fluidez contínua.

### Fora de escopo
- Cor de fundo do hero segue `#0B1224` (não altero).
- Conteúdo (título/sub/desc/CTA) e scroll indicator inalterados.
- Sem AI edit na imagem — todo ajuste é CSS.
