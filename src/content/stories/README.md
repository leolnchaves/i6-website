# Success Stories — schema de conteúdo

Alimenta a página **Success Stories** em `/{lang}/success-stories` e os destaques
na home. Cada case é um arquivo Markdown com **frontmatter YAML**, mesmo padrão
de `src/content/intelligence/` e `src/content/landings/`.

## Convenção de arquivo

Par obrigatório PT + EN:

```
src/content/stories/
  <slug>-pt.md
  <slug>-en.md
```

O `<slug>` é o mesmo nas duas versões e gera a rota
`/{lang}/success-stories/<slug>`.

## Frontmatter

```yaml
---
slug: marketplace-excellence-pharmacy
language: pt                              # pt | en
title: "Excelência em Marketplace..."     # antigo H2
segment: "Indústria"                      # Varejo | Indústria | Finanças | ...
client: "EMS Farma"
client_anon: false                        # true = ocultar nome real do cliente
description: "Resumo curto da empresa."
challenge: "Texto da dor real (1–3 frases)."     # exibido como "A DOR REAL"
what_to_anticipate: "O que precisava ser antecipado." # opcional
prediction: "A predição gerada pela i6."          # opcional
solution: "Texto da solução aplicada."            # exibido como "A SOLUÇÃO"
metric1: "+23% de ticket médio por PDV"   # string única (valor + label)
metric2: "+36% de conversão de novos SKUs"
metric3: ""                                # vazio = não exibe
solutions: ["Inteligência de Recomendação Industrial"]
quote: "Antecipação Comercial Aplicada..."
customer_name: "Paulo Lima"               # "" se anônimo
customer_title: "New Channel Manager"     # "" se anônimo
cover_image: "/content/success-stories/case-ems-farmacia.jpg"
logo: "/content/logos/EMS-COR.png"
show_home: true                            # destaca na home
published: true                            # false = não aparece
sort_order: 1                              # ordem na grid
---
```

Corpo do MD: opcional. Hoje toda a exibição vem do frontmatter.

## Loaders

- `src/hooks/useSuccessStoriesMarkdown.ts` — varre `import.meta.glob`, filtra
  por `language` e ordena por `sort_order`.
- `src/hooks/useHomeSuccessStories.ts` — reusa o anterior e filtra `show_home`.

## i6Hub (CMS — em construção)

Estes arquivos serão gerados automaticamente pelo i6Hub, mirror do fluxo de
Insights. Ver `docs/I6HUB_CMS_ROADMAP.md`. Enquanto o feed
`public-stories-feed` não existir, esses arquivos são editados manualmente.
