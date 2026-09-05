## Hierarquia visual

- Faixa clara `theme-sand` na página inteira (como /i6-builders), com o mapa mantido em faixa escura no fim para emendar no rodapé.
- Headline em `font-display` (Sora), tamanho hero, grafite quente; "uma conversa" em terracota. Subtítulo em corpo `muted-foreground`, largura máxima ~48ch.
- Cartão do formulário: superfície `card`, borda sutil, sombra baixa, canto 12–16px. No desktop é `lg:sticky` até o fim do hero; no mobile a coluna colapsa e o formulário vem depois da triagem.
- Triagem: bloco leve (não cartão-pesado), três `Link` com seta `ArrowRight`, hover em terracota. A linha "Se é sobre o i6 Decision Suite…" fica como nota `text-sm text-muted-foreground` abaixo dos três links.
- FAQ: acordeão shadcn (`Accordion` type="single" collapsible), divisores 1px, pergunta em peso médio, resposta em corpo. Sem cartões individuais.

## Estrutura de arquivos

- `src/pages/Contact.tsx` — recompõe a ordem: `ContactHeroSplit` → `ContactFAQ` (acordeão) → seção de mapa. Mantém `SEOHead` e o JSON-LD de FAQ, regenerado a partir da nova lista de 13 perguntas.
- `src/components/contact/ContactHeroSplit.tsx` (novo) — grid 2 colunas, headline/subtítulo/triagem + `<ContactForm />` (variant default, sem props novas).
- `src/components/contact/ContactTriage.tsx` (novo) — os três links + linha de fecho, com `useLocalizedPath` para `/i6-builders#fale-com-o-time`, `/community#fale-com-o-time`, `/docs`.
- `src/components/contact/FAQSection.tsx` — reescrito para acordeão e para a nova lista de 13 itens (respostas 3, 4, 5, 12 e 13 aguardam os textos que você vai enviar; até lá ficam com a resposta atual como rascunho marcado).
- `src/components/contact/WorldMap.tsx` — só troca `title`/`description` nos 3 idiomas; mapa, marcadores e interação intactos.
- `src/data/contact/content.ts` (novo) — todo o texto novo (hero, triagem, FAQ, legenda do mapa) em PT/EN/ES, no mesmo padrão `content[language] ?? content.pt` usado no resto da pasta.
- `src/components/contact/ContactForm.tsx` — apenas `subjectOptions` passa a ser `{ salesSuite, partnerships, press, other }` nos 3 idiomas; os `value` enviados continuam chaves estáveis não traduzidas. Nenhuma mudança em endpoint, honeypot, `lead_uid`, `normalizeLeadFields` ou tracking.
- `src/components/hometeste/HeaderNovo.tsx` — adiciona `/contact` à lista de rotas de tema claro na checagem já normalizada por `stripLangPrefix`.
- Componentes hoje na página e que saem da composição: `ContactHero`, `DirectContactStrip`. Ficam no repositório (usados/potenciais em outros pontos) mas deixam de ser renderizados em /contact — confirme se prefere que a faixa de contato direto (e-mail/telefone) continue em algum lugar da página.

## Fora de escopo

Pipeline de deploy, i6 HUB, captura de lead, `/i6-builders`, `/community`, `/docs`, release/publicação.

## Verificação

Checagem de tipos, build e conferência no preview em `/pt/contact`, `/en/contact`, `/es/contact`: formulário ao lado da headline no desktop, empilhado no mobile, acordeão abrindo um item por vez, header legível e envio de teste **não** disparado.
