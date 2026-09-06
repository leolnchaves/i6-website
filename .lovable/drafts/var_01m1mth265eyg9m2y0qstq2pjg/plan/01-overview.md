# /our-ai — a camada de inteligência

Redesenho completo da página na identidade areia / grafite / terracota já usada em `/i6-builders`, `/contact`, `/i6-blog` e `/i6-intelligence`. O navy fixo (#0B1224) e o coral cru (#F4845F) saem; a página passa a viver dentro de `.theme-sand`, com os mesmos tokens do resto do site novo.

## Posicionamento

Três camadas, ditas explicitamente na abertura:

- **a inteligência** (esta página) — os motores, o modelo fundacional, o rigor científico
- **i6 Builder Platform** (`/i6-builders`) — como se constrói sobre ela
- **i6 Decision Suite** (i6decision.ai) — o que ela resolve no negócio

A página é prova de rigor, não peça de venda. Nenhum exemplo de vitrine de varejo, nenhum "Recomendado para você".

## Duas confirmações pedidas

1. **A seção do i6 Signal existe de verdade em `/solutions`**, com conteúdo próprio (sobrelinha, título, tagline, descrição, a demo interativa e a lista de exemplos), renderizada por `SignalLayerBlock.tsx` que por dentro chama `I6SignalDemo.tsx`. **Mas ela não tem `id` nenhum** — hoje `/solutions#i6signal` não rola para lugar algum. Então o plano inclui adicionar `id="i6signal"` a essa seção antes de apontar as landings para lá.
2. **`OurAICTA.tsx` não é importado em nenhum lugar.** `SegmentArgumentCarousel.tsx` **é importado**, em `src/components/our-ai/ExplainabilitySection.tsx` (linhas 3 e 65) — e só ali. Como a seção de explicabilidade é justamente uma das que se fundem nesta rodada, o carrossel fica livre junto com ela; nada fora da pasta depende dos dois.
