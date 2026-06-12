## Nova seção: "Pesquisa & Fundamentos" em `/our-ai`

Posição: **logo abaixo de `<CommunitySection />`** e **acima de `<RealResultsStrip />`** em `src/pages/OurAI.tsx`.

### Tom e formato
Sem rosto, sem nomes próprios, sem menção à Unicamp no H2 ou no lead. Apresentação no estilo "página de Publications" de um grupo de pesquisa: **lista vertical densa**, não cards. Duas sub-listas:

1. **Publicações revisadas por pares** (Springer / WEBIST / Academia.edu) — 5 itens
2. **Palestras técnicas** (InfoQ / QCon Brasil) — 9 itens

Cada item ocupa uma linha tipográfica com badge · ano, título, veículo/conferência e link "Acessar ↗".

### Layout
Fundo `#0B1224`, `py-14 md:py-20`, container `max-w-4xl`.

```text
┌─────────────────────────────────────────────────────────────┐
│  EYEBROW: Pesquisa & Fundamentos                            │
│  H2: Base científica dos motores i6                         │
│  Lead curto (sem nomes, sem Unicamp).                       │
│                                                             │
│  ── Publicações revisadas por pares ──                      │
│  [SPRINGER · LNBIP · 2013]                                  │
│  Knowledge Discovery: Data Mining by Self-organizing Maps   │
│  LNBIP vol. 140, pp. 185–200 · Springer            Acessar ↗│
│  ─────────────────────────────────────────────────────────  │
│  [CONFERÊNCIA · WEBIST · 2012]                              │
│  Self-Organizing Maps — An Approach Applied to the          │
│  Electronic Government                                      │
│  Proc. 8th Int. Conf. on WEBIST                    Acessar ↗│
│  ─────────────────────────────────────────────────────────  │
│  [SPRINGER · LNCS · 2010]                                   │
│  Development of a Business Intelligence Environment for     │
│  e-Gov using Open Source Technologies                       │
│  Lecture Notes in Computer Science, Springer       Acessar ↗│
│  ─────────────────────────────────────────────────────────  │
│  [ARTIGO · PT-BR]                                           │
│  Mapas auto-organizáveis aplicados em governo eletrônico    │
│  Academia.edu                                      Acessar ↗│
│  ─────────────────────────────────────────────────────────  │
│  [ARTIGO · Open Access]                                     │
│  Knowledge Discovery: Data Mining by Self-organizing Maps   │
│  Academia.edu                                      Acessar ↗│
│                                                             │
│  ── Palestras técnicas ──                                   │
│  [PALESTRA · InfoQ Brasil]                                  │
│  Ciência de dados para alinhar produto                      │
│  InfoQ / QCon Brasil                               Assistir ↗│
│  ─────────────────────────────────────────────────────────  │
│  ... (8 demais palestras, mesmo formato)                    │
└─────────────────────────────────────────────────────────────┘
```

### Conteúdo canônico

**Publicações (5)**

| # | Badge | Título | Veículo | URL |
|---|-------|--------|---------|-----|
| 1 | SPRINGER · LNBIP · 2013 | Knowledge Discovery: Data Mining by Self-organizing Maps | LNBIP vol. 140, pp. 185–200, Springer | https://link.springer.com/chapter/10.1007/978-3-642-36608-6_12 |
| 2 | CONFERÊNCIA · WEBIST · 2012 | Self-Organizing Maps — An Approach Applied to the Electronic Government | Proc. 8th Int. Conf. on WEBIST | https://www.academia.edu/122408553/SELF_ORGANIZING_MAPS_An_Approach_Applied_to_the_Electronic_Government |
| 3 | SPRINGER · LNCS · 2010 | Development of a Business Intelligence Environment for e-Gov using Open Source Technologies | Lecture Notes in Computer Science, Springer | https://www.academia.edu/24631504/Development_of_a_Business_Intelligence_Environment_for_e_Gov_Using_Open_Source_Technologies |
| 4 | ARTIGO · PT-BR | Mapas auto-organizáveis aplicados em governo eletrônico | Academia.edu | https://www.academia.edu/122408570/Mapas_auto_organiz%C3%A1veis_aplicados_em_governo_eletr%C3%B4nico |
| 5 | ARTIGO · Open Access | Knowledge Discovery: Data Mining by Self-organizing Maps | Academia.edu | https://www.academia.edu/24631415/Knowledge_Discovery_Data_Mining_by_Self_organizing_Maps |

**Palestras (9)** — todas em InfoQ Brasil / QCon Brasil:

| # | Título | URL |
|---|--------|-----|
| 1 | Ciência de dados para alinhar produto | https://www.infoq.com/br/presentations/ciencia-de-dados-alinhar-produto/ |
| 2 | Recomendação de conteúdo na escala do iFood | https://www.infoq.com/br/presentations/recomendacao-de-conteudo-na-escala-do-ifood/ |
| 3 | Machine Learning — do gênesis ao apocalipse | https://www.infoq.com/br/presentations/machine-learning-genesis-ao-apocalipse/ |
| 4 | Classificação de padrões: uma abordagem prática com redes neurais artificiais | https://www.infoq.com/br/presentations/classificacao-de-padroes-uma-abordagem-pratica-com-redes-neurais-artificiais/ |
| 5 | Machine Learning em Java com Apache Mahout | https://www.infoq.com/br/presentations/machine-learning-em-java-com-apache-mahout/ |
| 6 | Classificação de documentos baseada em inteligência artificial | https://www.infoq.com/br/presentations/classificacao-de-documentos-baseada-em-inteligencia-artificial/ |
| 7 | Postgres como Big SQL | https://www.infoq.com/br/presentations/postgres-bigsql/ |
| 8 | Mineração de dados com Weka API | https://www.infoq.com/br/presentations/mineracao-de-dados-weka-api/ |
| 9 | Machine Learning e mineração de dados | https://www.infoq.com/br/presentations/machine-learning-mineracao-dados/ |

Badge para todas as palestras: `PALESTRA · InfoQ Brasil`. Veículo: `InfoQ Brasil · QCon`. Sem resumo (lista densa).

### Copy

**PT — eyebrow:** "Pesquisa & Fundamentos"
**PT — H2:** "Base científica dos motores i6"
**PT — lead:** "Os fundamentos de mapas auto-organizáveis, clustering não-supervisionado e descoberta de padrões sem regras prévias que alimentam i6Previsio, i6RecSys e i6ElasticPrice têm origem em pesquisa acadêmica revisada por pares e em palestras técnicas em conferências de engenharia."

**EN — eyebrow:** "Research & Foundations"
**EN — H2:** "Scientific foundations behind the i6 engines"
**EN — lead:** "The foundations of self-organizing maps, unsupervised clustering and rule-free pattern discovery powering i6Previsio, i6RecSys and i6ElasticPrice come from peer-reviewed academic research and technical talks at engineering conferences."

**Sub-headings PT/EN:**
- "Publicações revisadas por pares" / "Peer-reviewed publications"
- "Palestras técnicas" / "Technical talks"

### Estilo tipográfico (sem cards)
- Cada item: `<article>` com `border-b border-white/10`, `py-5`, sem background, sem rounded.
- Badge: `text-[11px] uppercase tracking-wider text-[#F4845F]` (somente texto, sem caixa).
- Título: `text-base md:text-lg text-white font-semibold leading-snug` (sem ponto final).
- Veículo: `text-sm text-white/65 italic mt-1` (estilo citação).
- Link "Acessar ↗" / "Assistir ↗" (talks) / "Open ↗" (EN): `inline-flex items-center gap-1 text-sm text-white/70 hover:text-[#F4845F]`, alinhado à direita no md+ via `flex justify-between`.
- Sub-headings: `text-xs uppercase tracking-[0.18em] text-white/40 mt-12 mb-4` com divisor `border-t border-white/10 pt-6`.

### Dados
Em `src/data/staticData/ourAIContent.ts`, adicionar bloco `research` para PT e EN:
```ts
research: {
  eyebrow: string;
  title: string;
  lead: string;
  publicationsLabel: string;
  talksLabel: string;
  openLabel: string;   // "Acessar ↗" / "Open ↗"
  watchLabel: string;  // "Assistir ↗" / "Watch ↗"
  publications: Array<{ badge: string; title: string; venue: string; url: string }>;
  talks: Array<{ title: string; venue: string; url: string }>;
}
```

### Componente novo
`src/components/our-ai/ResearchSection.tsx` — recebe `content: OurAIContent['research']`, renderiza eyebrow + H2 + lead + duas sub-listas (Publicações / Palestras). Animação `animate-fade-in` no scroll-in via IntersectionObserver (padrão da página). Sem nomes próprios renderizados.

### Integração
`src/pages/OurAI.tsx`:
```tsx
<CommunitySection content={c.community} />
<ResearchSection content={c.research} />
<RealResultsStrip />
<GlossarySection content={c.glossary} />
```

### SEO
No `jsonLd` de `OurAI.tsx`, adicionar:
- Cada publicação como `ScholarlyArticle` no `@graph` (`name`, `datePublished`, `isPartOf`, `url`).
- Cada palestra como `VideoObject` ou `PresentationDigitalDocument` no `@graph` (`name`, `url`, `publisher: { name: "InfoQ Brasil" }`).
- Sem nó `Person` (a pedido — sem referência ao autor na página).

### Verificação
- Preview PT e EN em `/our-ai`: seção aparece entre Comunidade e Resultados Reais.
- Visual de "página de publicações" (lista densa, divisores finos), zero cards arredondados.
- Sub-listas "Publicações revisadas por pares" (5 itens) e "Palestras técnicas" (9 itens) corretamente populadas.
- Sem nomes próprios nem menção a Unicamp em H2/lead.
- Todos os 14 links abrem em nova aba (`target="_blank" rel="noopener noreferrer"`).
