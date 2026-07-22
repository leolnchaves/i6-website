## Problema
Na V4, o wrapper do diagrama usa `overflow-hidden` + `object-cover` com altura fixa (`clamp(300px,41vh,410px)`). Isso força a imagem a preencher o box e corta as extremidades verticais (as pontas superiores/inferiores das curvas do diagrama). Além disso, a máscara radial (`98% 94%`) apara ainda mais os cantos.

O usuário quer manter o tamanho e a posição atuais, apenas parar de cortar as laterais superior/inferior do desenho.

## Ajuste em `src/components/hometeste/HeroDecisaoV4.tsx`

1. **Wrapper do diagrama**
   - Remover `overflow-hidden` do wrapper interno.
   - Trocar altura fixa por `h-auto`, mantendo a largura panorâmica (`w-[min(112vw,1550px)]`) para preservar a posição horizontal atual.

2. **Imagem**
   - Trocar `object-cover` + `h-full` por `h-auto w-full`, para que a proporção real seja respeitada e nada seja recortado.
   - Remover o `objectPosition` (não é mais necessário sem cover).
   - Afrouxar a máscara radial para `ellipse 100% 100%` com fade só nos cantos externos (`black 88%, transparent 100%`), garantindo que o corpo do diagrama fique intacto.

3. **Camadas de texto (sem alterações estruturais)**
   - Título e bloco CTA continuam com `z-10` sobre o diagrama; o halo radial de topo permanece para dar contraste ao título.
   - Se depois notarmos leve toque do diagrama no CTA ao usar `h-auto`, ajustaremos apenas o `top-[31vh]` do wrapper — não a imagem.

## Validação
- Abrir `/pt/home-v4` via Playwright headless (1280×1800) e capturar screenshot para confirmar que:
  - As extremidades superiores/inferiores das curvas aparecem completas.
  - Título e CTA continuam nas mesmas posições sem sobreposição visível.
