# Personalização & Descoberta — cenários em abas no topo

## Objetivo
Eliminar o passo intermediário (picker 2×2 do anexo 1) e permitir trocar de cenário com 1 clique diretamente na tela do demo (anexo 2), sem voltar.

## Mudanças (apenas `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`)

1. **Remover a fase `pick`**
   - Inicializar `userMode='logged'` e `vertical='products'` como cenário default (o primeiro).
   - `phase` inicial passa a ser `'list'`.
   - Excluir o bloco de render `if (phase === 'pick' ...)` (o card 2×2 grande).
   - Remover o botão "Trocar cenário" do header (fica redundante).

2. **Nova barra de cenários no topo do demo**
   - Logo abaixo do header (título "Personalização & Descoberta · i6RecSys" + subtítulo), inserir uma linha com 4 chips/abas: `Logado · Produtos`, `Logado · Moda`, `Anônimo · Produtos`, `Anônimo · Moda`.
   - Cada chip: ícone (User/UserX) + rótulo em 2 linhas (usuário e vertical), com estado ativo (borda/preenchimento coral) refletindo o cenário atual.
   - Clique troca o cenário imediatamente: chama uma função equivalente a `startScenario(u, v)` que reseta `selectedId`, `progress` e força `phase='list'`.
   - Layout responsivo: `flex flex-wrap gap-[1vmin]` (desktop/tablet) — no totem, os 4 cabem em uma linha; em telas menores quebra em 2×2.

3. **Ajustes menores**
   - As "pills" contextuais que hoje aparecem abaixo do header (Usuário / Vertical / Objetivo) permanecem — passam a funcionar como indicadores do cenário ativo.
   - Trocar o botão "Trocar cenário" atual por nada (as abas cumprem o papel). Manter apenas o botão "Voltar ao catálogo" quando estiver em `training`/`pdp`.

## Fora do escopo
- Dados dos cenários, catálogos, pipeline, argumentação, conector SVG e imagens permanecem inalterados.
- Nenhum outro demo do kiosk é alterado.
- Sem mudanças em i18n (uso dos labels já existentes em `uiLabels`).
