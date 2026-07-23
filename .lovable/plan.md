## Objetivo
Dar mais respiro aos textos nos 4 cards da i6 Platform sem alterar o tamanho externo do box.

## Mudanças (apenas `src/components/hometeste/ComoFuncionamosSection.tsx`, grid desktop)

1. **Box i6 Platform** (linha 299): reduzir padding lateral interno
   - `px-4` → `px-2`
2. **Grid dos cards** (linha 303): aproximar cards
   - `gap-4` → `gap-2`
3. **Card individual** (linha 310): reduzir padding interno lateral para ganhar largura útil de texto
   - `p-5` → `px-4 py-5`

Resultado: cada card ganha ~16–20px de largura útil interna; box externo mantém as mesmas dimensões e posição da badge "i6 PLATFORM". Nada muda no mobile nem nas colunas laterais (chips CAPTURAMOS/ATIVAMOS).
