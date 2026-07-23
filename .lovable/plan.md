## Causa
Em `src/components/hometeste/HeaderNovo.tsx`, o `<header>` fixo usa `backdrop-blur-md`. No Chrome/Safari, `backdrop-filter` cria um **containing block** para descendentes `position: fixed`. O painel do menu mobile (`fixed inset-x-0 top-[80px] bottom-0`) está **dentro** desse header, então em vez de se ancorar na viewport ele se ancora na caixa do header (~80px de altura). Quando a página está scrollada, o painel fica confinado à faixa do header e só o primeiro item aparece, com o conteúdo da página vazando por trás.

## Correção
Editar apenas `src/components/hometeste/HeaderNovo.tsx`:

1. Retornar um **Fragment** (`<>...</>`) contendo o `<header>` e, como **irmão**, o painel do menu mobile — tirando o painel de dentro do header.
2. Manter exatamente as mesmas classes do painel (`md:hidden fixed inset-x-0 top-[80px] bottom-0 bg-[#0B1224] ... overflow-y-auto overscroll-contain`), z-index igual ou superior ao header (`z-50`) para ficar acima do conteúdo.
3. Nada mais muda: estado `menuOpen`, trava de scroll do body, itens do menu, botão toggle e desktop nav ficam intactos.

Com o painel fora do elemento com `backdrop-filter`, o `fixed` volta a se ancorar na viewport e o menu sempre aparece do topo, independentemente do scroll da página.
