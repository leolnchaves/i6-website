## Plano

1. Corrigir por que a imagem não desce
   - O `<img>` usa `animate-fade-in`, cuja keyframe final aplica `transform: translateY(0)`.
   - Isso sobrescreve o `transform: translateY(30vh)` inline após a animação terminar — por isso as últimas tentativas não moveram nada.
   - Solução: tirar `animate-fade-in` do `<img>` e aplicar o fade em um wrapper `<div>`, deixando o `transform` da imagem intocado.

2. Reposicionar a imagem entre o título e o CTA
   - Trocar o `absolute inset-0 flex items-center` + `translateY` por um wrapper `absolute` ancorado numa faixa central-inferior do hero (ex.: `top-[38%] bottom-[22vh]`), com `flex items-center`.
   - Assim a posição fica previsível em qualquer altura de tela, sem depender de `translateY`.

3. Esticar mais na horizontal, com responsividade
   - Substituir `w-full max-h-[54vh]` por largura maior que o container em desktop (ex.: `w-[112vw] max-w-none`) mantendo `object-contain`.
   - Definir alturas responsivas: menor em mobile, maior em desktop, para evitar corte do diagrama.
   - Garantir `left-1/2 -translate-x-1/2` no wrapper para o overflow horizontal ficar simétrico.

4. Eliminar o retângulo escuro ao redor do diagrama
   - O PNG tem um fundo levemente mais escuro que o navy do hero — é isso que aparece como "moldura".
   - Duas alternativas, aplicar a que melhor preservar o traço:
     a) Aplicar `mix-blend-mode: screen` (ou `lighten`) no `<img>`, fazendo o fundo escuro somar com o navy e desaparecer, mantendo os traços coral/branco visíveis.
     b) Se o blend clarear demais o traço, gerar uma versão do PNG com fundo transparente (via `imagegen--edit_image` com `transparent_background: true`) e usar essa nova versão.
   - Ajustar/relaxar a máscara radial atual, que hoje escurece as bordas e reforça a moldura.

5. Validar
   - Conferir `/pt/home-v4` em desktop e mobile:
     - imagem deslocada para baixo, sem sobrepor o título;
     - largura ocupando bem o hero, sem deformar;
     - sem retângulo escuro ao redor do diagrama;
     - CTA e descrição continuam legíveis no rodapé.

### Detalhes técnicos
- Arquivo: `src/components/hometeste/HeroDecisaoV4.tsx`.
- Nenhuma mudança em rotas, i18n ou outros componentes.
- Se a opção (4a) blend não render bem, criar `src/assets/hero-decisao-hd-transparent.png.asset.json` a partir do PNG atual e trocar o import.