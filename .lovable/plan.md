# Padronização do artigo: feminino para i6 Decision Suite e i6 Builder Platform

Auditoria das citações na Home (HomeTeste, ativa) e em /our-ai, com a lista de correções para padronizar tudo no feminino ("a i6 Decision Suite", "a i6 Builder Platform"). Inglês não muda (artigo "the" é neutro) — só PT e ES.

## Auditoria — o que existe hoje

### /our-ai (`src/data/staticData/ourAIContent.ts`)
- L97 PT — "Sob **o** i6 Decision Suite e **o** i6 Builder Platform" → masculino (ERRADO)
- L489 ES — "Bajo **el** i6 Decision Suite y **la** i6 Builder Platform" → misto (ERRADO no Suite)
- L166/L558 PT/ES — "prontos, **na** i6 Decision Suite … **na** i6 Builder Platform" → feminino (OK)
- L172 PT — CTA "Construa com **a** i6 Builder Platform" → feminino (OK); ES L564 "con **la** i6 Builder Platform" (OK)
- L284–285 PT — "Construir sobre **a** i6 Builder Platform" / "Contratar **a** Decision Suite" → feminino (OK); ES L676–677 "sobre **la**" / "**la** Decision Suite" (OK)
- EN (L293, L362, L368, L480–481) — neutro, sem alteração

### Home — seção de produto (`src/components/home-v3/product/DecisionSuiteSection.tsx` + `suiteContent.ts`)
- DecisionSuiteSection L10 PT — "Conhecer **a** i6 Decision Suite" → feminino (OK); ES L12 "Conocer **la** i6 Decision Suite" (OK)
- suiteContent.ts L47 PT — "Cada produto **do** i6 Decision Suite" → masculino (ERRADO)
- suiteContent.ts L68 PT — CTA "Conheça **o** i6 Decision Suite" → masculino (ERRADO)
- suiteContent.ts L289 ES — "Cada producto **del** i6 Decision Suite" → masculino (ERRADO)
- suiteContent.ts L310 ES — CTA "Conoce **el** i6 Decision Suite" → masculino (ERRADO)

### Home — CTA final (`src/components/home-v3/FinalCTA.tsx`)
- L10–11 PT — "Teste **o** i6 Decision Suite grátis…" / "Construa com **o** i6 Builder" → masculino (ERRADO)
- L22–23 ES — "Prueba **el** i6 Decision Suite…" / "Construye con **el** i6 Builder" → masculino (ERRADO)
- EN L16–17 — neutro, sem alteração

### Home — faixas e rodapé (sem artigo, OK)
- SolutionBands: só "i6 Decision Suite" / "i6 Builder Platform" como rótulos, sem artigo (OK nos 3 idiomas)
- FooterNovo L71: rótulo "i6 Decision Suite" sem artigo (OK)

### Header global (aparece na Home e em /our-ai)
- `src/data/translations/pt.ts` L17 — "Acesse **o** i6 Decision Suite" → masculino (ERRADO)
- `src/data/translations/es.ts` L21 — "Accede **al** i6 Decision Suite" → masculino (ERRADO)

## Correções (aplicar)

1. `ourAIContent.ts` PT L97: "Sob **a** i6 Decision Suite e **a** i6 Builder Platform…"
2. `ourAIContent.ts` ES L489: "Bajo **la** i6 Decision Suite y **la** i6 Builder Platform…"
3. `suiteContent.ts` PT: "Cada produto **da** i6 Decision Suite…" e CTA "Conheça **a** i6 Decision Suite"
4. `suiteContent.ts` ES: "Cada producto **de la** i6 Decision Suite…" e CTA "Conoce **la** i6 Decision Suite"
5. `FinalCTA.tsx` PT: "Teste **a** i6 Decision Suite grátis por 30 dias" / "Construa com **a** i6 Builder"
6. `FinalCTA.tsx` ES: "Prueba **la** i6 Decision Suite gratis por 30 días" / "Construye con **la** i6 Builder"
7. `translations/pt.ts`: "Acesse **a** i6 Decision Suite"; `translations/es.ts`: "Accede **a la** i6 Decision Suite"

## Verificação
- `rg` pós-edição para confirmar que não resta "o i6 Decision Suite", "do i6 Decision Suite", "el i6 Decision Suite", "del i6 Decision Suite", "o i6 Builder" em PT/ES nessas páginas.
- Build + validate (sitemap/llms/JSON-LD não são afetados, mas o pipeline deve passar limpo).

## Observações
- Componentes legados `src/components/hometeste/CTAFinal.tsx` ("Conhecer **o** i6 Decision Suite") e `HomeTeste` antigo não são renderizados pela Home ativa; não serão alterados (fora do escopo).
- EN não requer nenhuma mudança (artigo neutro).
