## Detalhes técnicos

Arquivo único: `src/components/home-v3/HeroSuite.tsx`. Design, cores, tipografia, espaçamentos e estrutura do card ficam exatamente como estão.

- `decisions` em PT e EN cresce de 3 para 12 itens; os três primeiros ficam byte-idênticos e são o estado inicial visível.
- Carrossel de um card por vez: índice em `useState`, `setInterval` de ~4s incrementando `(i + 1) % items.length`. A janela visível é `[i, i+1, i+2]` com módulo, então o loop é contínuo e sem "salto de página".
- Fluidez: os três cards visíveis são renderizados com `key` do id da decisão dentro de um wrapper com `min-h` fixo. O card que sai recebe fade + leve translate para cima; o que entra faz fade + translate de baixo. Transição por classe utilitária CSS (`transition-all duration-500`) ou keyframe local no `index.css` do tema areia, sem novas dependências.
- Sem clique, sem setas, sem indicadores — o quadro continua idêntico ao atual. Pausa no `mouseenter` para leitura.
- Intervalo limpo no unmount; respeita a leitura em telas pequenas mantendo os mesmos três slots.
- Ícones adicionais vindos de `lucide-react` (já instalado), no mesmo tamanho e cor `text-primary` dos atuais.
- Nada muda em `suiteContent.ts`, header, footer ou outras seções.
