## Objetivo
Eliminar o erro "PropertyValue não é um tipo válido para measuredProperty" no JSON-LD de `/our-ai`.

## Causa
`Observation.measuredProperty` espera `Property`, não `PropertyValue`. O padrão correto do schema.org para registrar a variável observada com nome/unidade é `variableMeasured` (aceita PropertyValue), e o valor numérico vai em `measuredValue` no próprio Observation.

## Alterações

### 1. `src/pages/OurAI.tsx` (linhas 76–90)
Substituir o map de `statistics`:

```ts
const statistics = realResults
  .filter((r) => typeof r.numericValue === 'number')
  .map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Observation',
    name: r.label[language],
    observationAbout: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
    variableMeasured: {
      '@type': 'PropertyValue',
      name: r.label[language],
      ...(r.unitText ? { unitText: r.unitText } : {}),
    },
    measuredValue: r.numericValue,
    ...(r.unitText ? { unitText: r.unitText } : {}),
    description: `${language === 'pt' ? 'Setor' : 'Sector'}: ${r.source[language]}`,
  }));
```

### 2. `scripts/prerender-seo-stubs.mjs` (linhas ~321–330)
Aplicar a mesma estrutura no stub estático para que crawlers sem JS vejam o JSON-LD corrigido.

## Validação
- Rodar build e abrir `/our-ai`; conferir `<script type="application/ld+json">` no DOM.
- Validar no Schema Markup Validator: nó `Observation` sem erros.

## Fora de escopo
Sem mudanças visuais, de conteúdo, rotas, sitemap ou outros JSON-LD da página.
