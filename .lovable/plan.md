# Plano GEO v9.2 — FAQ Opção 1 + Restante da Fase

## Decisão tomada
**Opção 1**: manter dois FAQs separados, expandir cada um com sua função semântica.
- `/contact` → comercial/operacional (implementação, ROI, dados, integração, compliance)
- `/solutions` → JTBD por produto (i6Signal, i6RecSys, i6Previsio, i6ElasticPrice)

## Etapa 0 — Auditoria de nomes (bloqueia todo o resto)

Varrer e corrigir referências a produtos que NÃO existem:

- **"Compass Suite"** — confirmado em `src/data/translations/pt.ts:277` e `en.ts:277` (resposta `contact.faq.a6`). Reescrever a resposta usando os produtos reais (i6Signal + i6RecSys + i6Previsio + i6ElasticPrice). Sugestão:
  > "Sim. Nossa plataforma é API-first e baseada em nuvem. Os motores i6RecSys, i6Previsio e i6ElasticPrice expõem APIs REST que conectam a ERPs, CRMs, plataformas de e-commerce e fontes de dados internas, com o i6Signal como camada conversacional sobre eles."

- Varredura adicional com `rg`: `i6Margin|i6Mix|i6Propensity|Compass|i6Intelligence(?! hub)` em `src/`, `public/`, `scripts/`. Substituir produto inexistente pelo motor real correspondente, ou reescrever como **valor entregue**.

## Etapa 2.4 — FAQ /contact (revisar) + FAQ /solutions (expandir)

### 2.4.A — `/contact` FAQ (revisar, manter UI atual)
- Corrigir a6 (Compass Suite → produtos reais)
- Revisar as outras 7 perguntas para garantir que nenhuma cite produto inexistente
- Manter UI atual (`FAQSection.tsx` com busca + accordion)
- Manter schema `FAQPage` em `Contact.tsx`

### 2.4.B — `/solutions` FAQ (criar UI visível + expandir)
Hoje só existe JSON-LD invisível com 4 Qs em `Solutions.tsx`. Vamos:

1. **Expandir de 4 → 10 perguntas JTBD** distribuídas pelos 4 produtos:
   - **i6Signal** (2 Qs): camada conversacional sobre os motores; como times de negócio usam sem data science
   - **i6Previsio** (3 Qs): ruptura/stockout, overstock, sensoriamento de demanda
   - **i6RecSys** (3 Qs): mix por PDV, conversão, propensão de compra de anônimo
   - **i6ElasticPrice** (2 Qs): proteção de margem, elasticidade dinâmica

2. **Criar `src/components/solutions/SolutionsFAQ.tsx`** — UI visível com mesmo padrão do `FAQSection.tsx` (accordion, busca opcional, sem duplicar lógica desnecessária — pode ser versão mais enxuta).

3. **Renderizar abaixo de `<I6SignalDemo />`** em `Solutions.tsx`.

4. **Manter JSON-LD `FAQPage`** já existente, alimentado pelas mesmas 10 Qs (uma única fonte de verdade dentro do componente ou em arquivo de dados).

## Restante das etapas (sem mudança vs v9.1)

| Etapa | O que entrega | Status |
|---|---|---|
| **2.1** | `page-solutions-[pt/en].md` com intro JTBD + 4 produtos reais | 🔵 nesta fase |
| **2.2** | Cards Solutions com microdata `Product`, âncoras `#i6signal` etc., cross-link p/ hub filtrado | 🔵 nesta fase |
| **4.3** | Cross-links Hub ↔ Solutions ↔ Stories | 🔵 nesta fase |
| **1.5** | `Organization` schema completo, founders, sameAs, stats | 🔵 nesta fase |
| **3** | `/nossa-ia` (`/our-ai`) — página pilar + `TechArticle` + `SoftwareApplication` | 🔵 nesta fase |
| **5** | 4 landings setoriais (farma/indústria/financeiro/varejo) + `Service` schema | 🔵 nesta fase |
| **2.5** | Glossário MD | 🔵 nesta fase |
| **4.2** | 11 peças Intelligence | 🟡 i6HUB produz depois |

## Ordem de execução sugerida
1. **Etapa 0** (auditoria — bloqueia tudo)
2. **2.1 + 2.2 + 2.4.A + 2.4.B** (Solutions completa em uma rodada)
3. **4.3** (cross-links)
4. **1.5** (autoridade)
5. **3** (`/nossa-ia`)
6. **5** (landings setoriais)
7. **2.5** (glossário)

## Decisões para destravar antes da implementação

1. **FAQ /solutions UI**: incluir campo de busca (igual /contact) ou só accordion limpo? Sugestão: só accordion (são 10 Qs, busca é over-engineering).
2. **Fonte de dados das FAQs**: manter dentro do componente (como hoje) ou já migrar para `public/content/faq/*.md`? Sugestão: manter inline agora; migração p/ MD vira tarefa futura quando o i6HUB precisar editar texto sem PR.
3. **Resposta nova para `contact.faq.a6`**: a sugestão acima funciona, ou prefere outro texto?
4. **Mapeamento produto → valor** (confirmar):
   - i6Signal → camada conversacional sobre os 3 motores
   - i6Previsio → demanda, ruptura, estoque
   - i6RecSys → recomendação, mix, conversão, propensão
   - i6ElasticPrice → preço, margem, elasticidade