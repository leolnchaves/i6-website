Ajustes no `HeroDecisaoV4` (rota `/pt/home-v4`):

### 1. Imagem mais centralizada, sem sobreposição
- Trocar `h-[85%]` + `object-bottom` por um wrapper centrado verticalmente (`inset-0` + `flex items-center`), com a imagem em `object-contain` e altura controlada (`max-h-[70vh]`) para caber entre header e área de CTA sem colidir com os textos laterais nem com o bloco inferior.
- Reduzir opacidade um pouco (0.32) e manter máscara radial suave só nas bordas, sem cortar o topo/base (para não invadir headline nem CTA).

### 2. Inverter ordem: CTA acima, descrição abaixo
- No bloco inferior, trocar a ordem para: **CTA primeiro**, **descrição depois** (logo abaixo do botão).
- Manter alinhamento central e o mesmo espaçamento vertical do hero.

### 3. Aproximar o rótulo "DECISÃO / É aqui..." do ponto de decisão
- O rótulo faz parte do próprio PNG (não é texto separado), então ajustar via **posicionamento da imagem**: aplicar `object-position` deslocado (ex: `center 58%`) para "puxar" o rótulo visualmente mais perto do nó central do gráfico, sem re-render nem edição do PNG.
- Ajuste fino pode variar entre 55–62% dependendo do resultado visual — vou calibrar direto no componente.

### Escopo
- Apenas `src/components/hometeste/HeroDecisaoV4.tsx`.
- V1, V2, V3 e home atual intocadas.
- Sem release/publish.
