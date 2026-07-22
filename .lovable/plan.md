## Ajuste de posição da imagem no Hero V4

A imagem panorâmica está com o tamanho correto, mas ficou baixa demais — no screenshot, o ponto de "DECISÃO" invade o bloco de descrição + CTA.

### Mudança única em `src/components/hometeste/HeroDecisaoV4.tsx`

- Trocar o posicionamento vertical do wrapper do diagrama de `top-[31vh]` para algo mais alto, aproximando do título e liberando espaço no rodapé:
  - `top-[31vh]` → `top-[22vh]` (subir ~9vh)
- Manter todo o resto: largura `min(112vw,1550px)`, `h-auto`, máscara radial afrouxada, título e bloco descrição+CTA nas posições atuais.

Se após visualizar ainda estiver desalinhado, fazemos micro-ajuste (±2vh) sem mudar arquitetura.
