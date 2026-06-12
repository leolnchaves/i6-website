# Correções JSON-LD pós-auditoria GEO

Quatro ajustes pontuais nos blocos JSON-LD identificados pelo Rich Results Test e pelo validator.schema.org. Nenhuma mudança visual ou de conteúdo — só estrutura de dados estruturados.

---

## 1. TechArticle sem `image` (Anexo 1 — `/our-ai`)

**Arquivos:** `src/pages/OurAI.tsx` e `scripts/prerender-seo-stubs.mjs` (bloco `/our-ai`).

Adicionar campo `image` ao TechArticle apontando para um asset público estável. Usar a OG image padrão do site (`/og-image.png` ou logo coral em fundo navy). Como o projeto não tem OG image dedicada, vamos usar `${BASE_URL}/favicon.png` como fallback imediato e marcar TODO para gerar imagem de hero dedicada depois.

Mesma adição no stub estático para que o crawler enxergue.

---

## 2. SoftwareApplication com `offers` inválido (Anexo 2)

**Arquivo:** `src/pages/OurAI.tsx` (linha 55).

O `offers` atual usa `price: '0'` — isso é semanticamente errado (não são produtos vendidos a R$0) e o Google sinaliza como ausente/quebrado. Os motores são SaaS proprietários sob contrato.

**Ação:** remover o bloco `offers` por completo. Os avisos `offers` e `aggregateRating` são **opcionais não-críticos**, e remover o offers fake é mais correto do que tentar fingir um preço. Adicionar `provider` (Organization infinity6) — campo recomendado para SoftwareApplication empresarial.

---

## 3. FAQPage duplicado nas landings (Anexo 3 — erro crítico)

**Causa raiz:** `src/pages/TransformationLanding.tsx` (linha 263) injeta FAQPage via Helmet **E** `scripts/prerender-seo-stubs.mjs` (linhas 489-504 e 575-587) também injeta no HTML estático. Quando a página hidrata, ficam dois `<script type="application/ld+json">` FAQPage no `<head>`.

**Fix:** remover a injeção do `faqLd` do React (`TransformationLanding.tsx`). O stub estático já cobre os crawlers (que é onde importa para SEO/Rich Results). Mantém `serviceLd` e `breadcrumbLd` no React (esses não estão duplicados — o stub injeta Service mas a duplicação de Service é tolerada por @id; FAQ não).

Alternativa rejeitada: remover do stub e manter no React — ruim porque crawlers sem JS perderiam o FAQ.

---

## 4. Observation com `measuredValue` inválido (Anexo 4)

**Arquivos:** `src/pages/OurAI.tsx` (linhas 79-87) e `scripts/prerender-seo-stubs.mjs` (linhas 320-327).

Schema.org `Observation` **não tem** propriedade `measuredValue`. A propriedade correta é `value` (de `QuantitativeValue` aninhada em `measuredProperty`) ou simplesmente `value` no próprio Observation com `valueReference`. Também `marginOfError` está sendo usado errado (guardando string de setor, não margem de erro numérica).

**Estrutura corrigida:**

```json
{
  "@type": "Observation",
  "name": "custo de CRM",
  "observationAbout": { "@type": "Organization", "name": "infinity6", "url": "https://infinity6.ai/" },
  "measuredProperty": {
    "@type": "PropertyValue",
    "name": "custo de CRM",
    "value": -57,
    "unitText": "percent"
  },
  "description": "Setor: Financeiro"
}
```

Remove `measuredValue` e `marginOfError` (uso incorreto), move o número e unidade para dentro de `measuredProperty` como `PropertyValue` (que **tem** `value` e `unitText` no schema), e move o setor para `description`.

Aplica nos dois locais (React + stub estático).

---

## Detalhes técnicos

- Build: nenhuma dependência nova. `prerender-seo-stubs.mjs` continua rodando no `postbuild`.
- Verificação local: após edits, rodar `npm run build` e inspecionar `dist/pt/our-ai/index.html` e `dist/pt/solutions/demand-supply-efficiency/index.html` confirmando:
  - 1 único `<script>` FAQPage por página de landing
  - Observation com `measuredProperty.value` (não `measuredValue`)
  - TechArticle com `image`
  - SoftwareApplication sem `offers`
- Pós-deploy: rodar Rich Results Test + validator.schema.org de novo nas mesmas URLs e atualizar `.lovable/audit-geo-v10.md`.

Sem mudanças em conteúdo de markdown, componentes visuais, rotas ou backend.
