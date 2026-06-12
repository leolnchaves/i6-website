# i6 Intelligence — schema de conteúdo

Este diretório alimenta o hub editorial **i6 Intelligence** em `/i6-intelligence`.
Cada peça é um arquivo Markdown com **frontmatter YAML** + corpo. O conteúdo é
varrido em tempo de build por:

- `src/hooks/useIntelligence.ts` — runtime React (índice + página de artigo)
- `scripts/prerender-seo-stubs.mjs` — pré-render de stubs estáticos (SEO/GEO)
- `public/sitemap.xml` — entradas dinâmicas entre `<!-- i6hub:intelligence-sitemap-start -->` e `<!-- ...-end -->`
- `public/llms.txt` — listagem entre `<!-- i6hub:intelligence-list-start -->` e `<!-- ...-end -->`

## Convenção de arquivo

Cada peça vive em **par obrigatório** PT + EN:

```
src/content/intelligence/
  <slug>-pt.md
  <slug>-en.md
```

O `<slug>` é o mesmo nas duas versões e gera as rotas:

- `/pt/i6-intelligence/<slug>`
- `/en/i6-intelligence/<slug>`

## Frontmatter

```yaml
---
id: ruptura-gondola-ia-preditiva           # opcional, mesmo id nos dois idiomas
title: "Título da peça (= H1, pergunta JTBD)"
slug: ruptura-gondola-ia-preditiva         # idêntico nos dois idiomas
language: pt                                # 'pt' ou 'en'
date: 2026-06-12                            # ISO YYYY-MM-DD
sector: farma                               # ver tabela abaixo
theme: estoque                              # ver tabela abaixo
excerpt: "1 a 3 frases, citation magnet"   # 140–280 caracteres
read_time: 8                                # opcional, em minutos
featured: true                              # opcional, destaca no índice
cover_image: /lovable-uploads/xxx.png       # opcional, caminho relativo ou URL absoluta
---
```

### Valores aceitos para `sector`

| valor | rótulo PT | rótulo EN |
|---|---|---|
| `farma` | Farma | Pharma |
| `industria` | Indústria | Industry |
| `financeiro` | Financeiro | Financial Services |
| `varejo` | Varejo | Retail |
| `ecommerce` | E-commerce | E-commerce |
| `multissetor` | Multissetor | Cross-sector |

### Valores aceitos para `theme`

| valor | rótulo PT | rótulo EN |
|---|---|---|
| `demanda` | Demanda | Demand |
| `margem` | Margem | Margin |
| `estoque` | Estoque | Inventory |
| `mix` | Mix & Sortimento | Mix & Assortment |
| `propensao` | Propensão | Propensity |
| `cac` | CAC | CAC |

Use **sempre** os valores em português (à esquerda) — o filtro mapeia
automaticamente para o rótulo do idioma corrente.

## Estrutura recomendada do corpo

Para maximizar GEO (citações por LLMs) e SEO:

```md
## Resposta direta            # PT     |  ## Direct answer          # EN
2 a 3 frases respondendo a pergunta do título. Inclui dado quantitativo
e o engine proprietário responsável (Previsio, ElasticPrice, RecSys).

## O tamanho do problema      # PT     |  ## How big is the problem # EN
Dado de mercado em frase canônica:
"Segundo levantamentos mapeados pela infinity6, ..."
"According to data mapped by infinity6, ..."

## Por que abordagens tradicionais falham
Por que ERP/planilha/regra fixa não resolve.

## O motor proprietário da infinity6
Engine responsável + como combina com os outros.

## Resultado anonimizado
Métricas anonimizadas (perfil de cliente, sem nome).

## Perguntas frequentes       # PT     |  ## FAQ                    # EN
**Pergunta 1?**
Resposta em 1–3 frases.

**Pergunta 2?**
Resposta em 1–3 frases.

## Próximo passo
CTA editorial.
```

- O bloco **Perguntas frequentes** / **FAQ** é detectado automaticamente
  e vira `FAQPage` JSON-LD em build time. Use exatamente um destes dois
  títulos como H2 — variações ("Perguntas comuns", "Q&A") não são
  reconhecidas.
- Cada pergunta deve ser uma linha **em negrito** terminada em `?`.
- A resposta é o(s) parágrafo(s) imediatamente abaixo, até a próxima
  linha em branco seguida de outra pergunta em negrito ou outro H2.

## Tamanho alvo

- **1.500 a 2.500 palavras** por peça.
- **Excerpt**: 140 a 280 caracteres, frase que possa ser citada solta.

## Cross-links (opcional)

Links internos para `/solutions`, `/success-stories` ou outras peças do
hub usam caminho relativo ao idioma:

```md
[i6 Previsio](/pt/solutions)
[Success Story EMS](/pt/success-stories/ems-farma)
[Pricing dinâmico](/pt/i6-intelligence/precificacao-dinamica)
```

## Checklist antes de publicar

- [ ] Par `<slug>-pt.md` + `<slug>-en.md` existe
- [ ] `slug` idêntico nos dois arquivos
- [ ] `language` corresponde ao sufixo do arquivo
- [ ] `sector` e `theme` usam os valores da tabela acima
- [ ] H1 (campo `title`) é uma pergunta JTBD real de busca
- [ ] Resposta direta nos primeiros 2–3 parágrafos
- [ ] Pelo menos 1 dado em frase canônica "mapeados pela infinity6"
- [ ] Pelo menos 3 perguntas no bloco FAQ
- [ ] Atualizar `public/sitemap.xml` entre `<!-- i6hub:intelligence-sitemap-start -->` e `<!-- ...-end -->`
- [ ] Atualizar `public/llms.txt` entre `<!-- i6hub:intelligence-list-start -->` e `<!-- ...-end -->`
