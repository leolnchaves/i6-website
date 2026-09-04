## Detalhes técnicos

- Logo: enviar `user-uploads://3-2.png` via `lovable-assets create` e gravar o ponteiro em `src/assets/i6-decision-symbol.png.asset.json`. O símbolo já é escuro/colorido, então será usado como está sobre a pílula clara (sem filtros de cor).
- `src/components/hometeste/HeaderNovo.tsx`:
  - remover o `<li>` do `decisionPlatform` da lista desktop;
  - inserir, antes de `<LanguageMenu />`, um `<a href="https://www.i6decision.ai" target="_blank" rel="noopener noreferrer">` em formato de pílula (borda coral suave, fundo translúcido, hover realçado), com o símbolo à esquerda e o texto à direita, `whitespace-nowrap`;
  - no bloco mobile, trocar o item de lista atual pelo mesmo botão em largura total.
- Traduções: nova chave `header.suiteCta` em `src/data/translations/pt.ts`, `en.ts` e `es.ts` com os três textos.
- `decisionPlatform` continua definindo o destino; apenas o rótulo do menu deixa de ser usado no desktop.
- Validação: typecheck, build e captura em `/pt`, `/en` e `/es` (desktop e mobile) para confirmar que o cabeçalho não quebra em duas linhas.
