## Hierarquia visual

- Faixa clara `theme-sand` na página inteira (como /i6-builders), com o mapa mantido em faixa escura no fim para emendar no rodapé.
- Headline em `font-display` (Sora), tamanho hero, grafite quente; "uma conversa" em terracota. Subtítulo em corpo `muted-foreground`, largura máxima ~48ch.
- Cartão do formulário: superfície `card`, borda sutil, sombra baixa, canto 12–16px. No desktop é `lg:sticky` até o fim do hero; no mobile a coluna colapsa e o formulário vem depois da triagem.
- Triagem: bloco leve (não cartão-pesado), três `Link` com seta `ArrowRight`, hover em terracota. A linha "Se é sobre o i6 Decision Suite…" fica como nota `text-sm text-muted-foreground` abaixo dos três links.
- FAQ: acordeão shadcn (`Accordion` type="single" collapsible), divisores 1px, pergunta em peso médio, resposta em corpo. Sem cartões individuais.

## Estrutura de arquivos

- `src/pages/Contact.tsx` — recompõe a ordem: `ContactHeroSplit` → `FAQSection` (acordeão) → `ContactMap`. Mantém `SEOHead` e o JSON-LD de FAQ, regenerado a partir da lista final de 13 perguntas em `contactCopy`.
- `src/components/contact/ContactHeroSplit.tsx` (novo) — grid 2 colunas: headline/subtítulo/triagem à esquerda; à direita um painel navy arredondado com `<ContactForm />` (variant default, sem props novas) e, abaixo dele, a linha "Prefere e-mail direto? suporte@infinity6.ai" (`mailto:`), só texto no padrão tipográfico da página.
- `src/components/contact/ContactTriage.tsx` (novo) — os três links + linha de fecho, com `useLocalizedPath` para `/i6-builders#fale-com-o-time`, `/community#fale-com-o-time`, `/docs`.
- `src/components/contact/FAQSection.tsx` — reescrito como acordeão shadcn (`type="single" collapsible`) alimentado por `contactCopy`, com as 13 perguntas: respostas 3, 4, 5, 12 e 13 conforme os textos enviados; 1, 2, 6, 7, 8, 9, 10 e 11 reaproveitam as respostas atuais nos 3 idiomas. A busca some (13 itens em acordeão não pedem busca).
- `src/components/contact/ContactMap.tsx` (novo) — substitui `WorldMap` na página: SVG próprio com ondas suaves, anéis concêntricos difusos, ponto terracota pulsante em Campinas (cidade, estado, endereço, e-mail) e arcos tracejados de "próximos destinos". Sem PNG, sem tooltip pesado, animação respeitando `prefers-reduced-motion`. `WorldMap.tsx` permanece no repositório, sem uso em /contact.
- `src/data/contact/content.ts` (novo) — todo o texto (hero, triagem, FAQ, legenda e dados do mapa) em PT/EN/ES, usando `pickLang` como em /i6-builders.
- `src/components/contact/ContactForm.tsx` — apenas `subjectOptions` passa a ser `{ salesSuite, partnerships, press, other }` nos 3 idiomas, com `value` estáveis `sales_suite`, `partnerships`, `press`, `other`. Nenhuma mudança em endpoint, honeypot, `lead_uid`, `normalizeLeadFields` ou tracking.
- `src/components/hometeste/HeaderNovo.tsx` — adiciona `/contact` à lista de rotas de tema claro na checagem já normalizada por `stripLangPrefix`.
- Saem da composição de /contact: `ContactHero`, `DirectContactStrip`, `WorldMap`. Ficam no repositório, sem renderização nesta página.


## Fora de escopo

Pipeline de deploy, i6 HUB, captura de lead, `/i6-builders`, `/community`, `/docs`, release/publicação.

## Verificação

Checagem de tipos, build e conferência no preview em `/pt/contact`, `/en/contact`, `/es/contact`: formulário ao lado da headline no desktop, empilhado no mobile, acordeão abrindo um item por vez, header legível e envio de teste **não** disparado.
