
Ajustes no script `scripts/generate-i6-editorial-pdf.py` mantendo o layout atual intacto. Regerar `infinity6-editorial-forecast-adaptativo.pdf`.

## 1. Substituir wordmark "infinity6" pelos logos PNG

- Copiar os dois logos enviados para `scripts/assets/`:
  - `infinity6_symbol_white.png` (símbolo ∞, anexo 1) — usado no cabeçalho superior esquerdo das páginas internas.
  - `infinity6_horiz_white.png` (logo horizontal, anexo 2) — usado na última página (CTA).
- No script, trocar o `canvas.drawString(..., "infinity6")` do header pela renderização do símbolo via `drawImage` (altura ~14pt, preservando proporção, mesma posição x/y do texto atual).
- Na última página, trocar o texto grande "infinity6" pelo logo horizontal centralizado, na mesma posição/escala visual atual.
- Atualizar o email de contato dessa página para `talk@infinity6.ai`.

## 2. Corrigir quebras de texto truncadas

Sintoma: na página 2 (e outras), o subtítulo/lead aparece cortado em "...melhorar giro de" sem continuar. Causa: o wrapper de texto está limitando a uma linha ou caindo fora do frame antes de chegar ao fim do parágrafo.

Correções no script:
- No bloco que renderiza o título/subtítulo das páginas (`draw_lead`, `draw_subtitle` e equivalentes), remover qualquer truncamento implícito (`max_lines`, `[:N]`, `break` após primeira linha) e deixar o `simpleSplit`/wrapper rodar até esgotar o texto.
- Aumentar a altura do frame de texto dessas páginas para acomodar o parágrafo completo (sem mexer em posição inicial, fonte, tamanho ou cor — apenas a altura/área disponível para o texto).
- Onde for texto em duas colunas, garantir que o overflow da coluna 1 continue na coluna 2 em vez de ser descartado.
- Revisar todas as páginas: hero, evidence (stats), comparações, listicle, pull-quotes e CTA — em todas, o conteúdo do PDF original deve aparecer na íntegra.

## 3. QA

- Rodar `python scripts/generate-i6-editorial-pdf.py <input.pdf> infinity6-editorial-forecast-adaptativo.pdf`.
- Converter cada página para JPG (`pdftoppm -r 150`) e inspecionar:
  - Logo símbolo aparece no header das páginas internas (sem o texto "infinity6").
  - Logo horizontal aparece na última página, com `talk@infinity6.ai`.
  - Nenhum parágrafo é cortado; comparar com o texto-fonte do PDF original.
- Iterar até passar sem truncamentos nem overlap.

## Fora de escopo
- Nenhuma mudança de layout, paleta, tipografia, gráficos, ondas/animações ou ordem de páginas.
- Sem alterar o site (React) — mudanças apenas no script Python e no PDF gerado.
