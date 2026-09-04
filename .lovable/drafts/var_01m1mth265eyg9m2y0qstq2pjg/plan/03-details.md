## Comportamento

- Clique troca a família ativa. No teclado, ativação manual: as setas apenas movem o foco entre as famílias e Enter/Espaço confirma a troca; Home/End vão para a primeira e a última.
- A família ativa fica marcada com filete terracota e texto em destaque.
- A linha de conexão é desenhada em SVG entre a família ativa e a borda do quadro, com animação curta de traço.
- O conteúdo do quadro entra com fade e leve deslocamento vertical.
- Com `prefers-reduced-motion` ativo, tanto o traço da linha quanto o fade/deslocamento do quadro são suprimidos: a linha aparece já desenhada e o conteúdo troca sem transição.

## Detalhes técnicos

- `src/components/i6-builders/BuilderModels.tsx`: reescrever como grid de duas colunas (`md:grid-cols-[minmax(0,340px)_1fr]`), com `useState` para o índice ativo, `role="tablist"`/`role="tabpanel"`, `aria-selected` e foco gerenciado (`tabIndex` roving) com ativação manual.
- Posição da linha calculada dinamicamente, nunca fixa: `ref` em cada item da lista e no quadro, geometria via `getBoundingClientRect()` relativa ao container da seção, guardada em estado. Recalculada em `resize`, em `ResizeObserver` sobre a lista e o quadro (cobre as alturas diferentes de texto entre PT/EN/ES), na troca de família e na troca de idioma (`language` nas dependências do efeito), com leitura em `requestAnimationFrame` após o layout.
- Overlay SVG absoluto na área da seção, `pointer-events-none`, escondido abaixo de `md`. Tokens do `theme-sand` já existentes (`text-primary`, `border-border`, `sand-card`), sem cores literais.
- `src/data/i6Builders/content.ts`: cada item de `models.cards` ganha `long` (parágrafo), `outputs` (lista de tipos de saída) e `engines` (etiquetas), nos três idiomas. Nada mais na seção muda; `placeholders.ts` intacto.
- Sem mudança de rota, SEO, formulário ou envio de leads.
- Verificação: build, checagem de tipos e capturas em `/pt`, `/en`, `/es` e em largura de celular, com troca de família.

