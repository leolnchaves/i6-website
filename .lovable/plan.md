Ajustes exclusivos para mobile. Desktop permanece intacto.

## 1) CTA final cortando no mobile (anexo 2)
Arquivo: `src/components/hometeste/CTAFinal.tsx`

- O `<span className="whitespace-nowrap">` na linha 32 força a segunda frase ("Sua próxima decisão também não deveria.") em uma única linha. No mobile isso estoura a largura da viewport, cortando o texto e provavelmente causando também o problema 1 (overflow horizontal da página).
- Alterar para `md:whitespace-nowrap` — mantém a linha única no desktop e permite quebra natural no mobile.

## 2) Tela /solutions cortando no meio (anexo 1)
Diagnóstico: o corte com faixa branca à direita é sintoma clássico de overflow horizontal na página inteira. A causa mais provável é o próprio CTAFinal (item 1) — o `whitespace-nowrap` empurra a largura do documento além dos 393px do iPhone.

- Após corrigir o item 1, validar via Playwright em 393x852 que `/pt/solutions` não tem mais overflow horizontal.
- Se persistir, adicionar `overflow-x-hidden` como segurança no `<main>` de `src/components/DarkLayout.tsx` (somente afeta layout se houver overflow — não muda desktop).

## 3) Menu mobile não rola (scroll vaza para o body)
Arquivo: `src/components/hometeste/HeaderNovo.tsx`

Problema: o painel `md:hidden` aberto renderiza inline no fluxo do header. Quando o conteúdo do menu passa da viewport (ex.: no i6 Blog / Insights onde há dropdown com 7 itens + demais links), o scroll acontece na página (subindo o footer) em vez de rolar dentro do menu.

Alterações no bloco de menu mobile (linhas ~158-221):
- Transformar o container aberto em painel de altura limitada e scrollável:
  - `fixed inset-x-0 top-[header-height] bottom-0 overflow-y-auto overscroll-contain` (em vez de posicionamento estático).
- Ao abrir o menu (`menuOpen === true`):
  - Aplicar `document.body.style.overflow = 'hidden'` via `useEffect` para travar o scroll do body enquanto o menu está aberto; restaurar ao fechar/desmontar.
- Isso resolve o comportamento em qualquer página, incluindo `/i6-blog` e `/insights`, sem tocar em desktop (`md:hidden`).

## Verificação
Rodar Playwright headless em 393x852:
1. `/pt/solutions` — screenshot da hero, checar ausência de scroll horizontal (`document.documentElement.scrollWidth === innerWidth`).
2. `/pt` até o CTA final — screenshot mostrando a frase completa dentro da viewport.
3. `/pt/i6-blog` — abrir menu, tentar rolar dentro do painel, confirmar que o footer não sobe e que todos os itens do menu ficam acessíveis.
