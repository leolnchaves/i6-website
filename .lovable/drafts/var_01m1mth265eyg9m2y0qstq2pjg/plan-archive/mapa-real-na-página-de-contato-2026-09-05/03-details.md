## Detalhes técnicos

Arquivo alterado: `src/components/contact/ContactMap.tsx` (só a coluna visual; a coluna de texto e os dados de `src/data/contact/content.ts` ficam como estão).

- Fonte do mapa: `src/assets/images/world-map.png` (1280x640, silhueta com fundo transparente) já presente no repositório. É a mesma base do antigo `WorldMap`, que continua sem uso.
- Recoloração via token: aplicada como `mask-image` (`WebkitMaskImage`/`maskImage`, `maskSize: contain`, `maskRepeat: no-repeat`) sobre um `div` com `bg-muted`/`bg-foreground/10`. Assim a cor vem do tema areia e nada de azul aparece; nenhuma classe de cor literal.
- Realce do Brasil: segunda camada com a mesma máscara, recortada por `clipPath`/`inset` na região sul-americana e pintada em `bg-primary/12`, sobreposta à camada base.
- Marcador de Campinas: posicionado em porcentagem sobre o contêiner do mapa (`left ≈ 36.9%` a partir de `lon -47.06`; `top` calibrado visualmente contra a projeção da imagem, ~74%). Composto de `span` com `bg-primary`, dois anéis `ring-primary/30` e `animate-pulse` suave, com rótulo `Campinas / Brasil` ao lado.
- `prefers-reduced-motion`: pulso desativado.
- Acessibilidade: contêiner do mapa com `role="img"` e `aria-label` vindo de `copy.title`; imagem decorativa via máscara não precisa de `alt`. O endereço textual continua sendo a informação primária.
- Legenda "Em expansão" reaproveita a chave já existente na cópia PT/EN/ES.
- Sem novas dependências, sem serviço de mapas, sem chave de API, sem alteração em captura de lead, formulário, FAQ ou pipeline de deploy.

Fora de escopo: publicar release/deploy, mexer no formulário, FAQ, triagem ou nas demais páginas.
