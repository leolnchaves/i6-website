
# Corrigir titulo e descricao do Google (index.html)

## Problema
O Google indexa o HTML estatico do `index.html`, nao o conteudo injetado dinamicamente pelo React. As tags de titulo e descricao no `index.html` ainda contem textos genericos antigos ("AI Solutions - Advanced AI & Machine Learning Solutions"), que nao correspondem ao posicionamento atual da infinity6.

## Solucao
Atualizar as meta tags estaticas no `index.html` para refletir o mesmo conteudo definido no `seoData.ts` para a Home (em ingles, pois o `lang` do HTML e "en"). Assim, o Google exibira o conteudo correto nos resultados de busca.

## O que muda

### Arquivo: `index.html`

As seguintes tags serao atualizadas:

| Tag | Valor atual | Novo valor |
|-----|------------|------------|
| `<title>` | infinity6 AI Solutions - Advanced AI & Machine Learning Solutions | infinity6 - Predictive Intelligence for Business |
| `<meta description>` | infinity6 delivers cutting-edge AI and machine learning solutions for businesses... | We turn data into decisions that anticipate the market. Predictive AI to grow revenue, protect margins and accelerate growth. |
| `<meta keywords>` | AI solutions, machine learning, artificial intelligence... | artificial intelligence for business, applied AI, predictive intelligence, predictable growth, growth intelligence, AI for pricing, machine learning for retail |
| `<meta og:title>` | infinity6 AI Solutions - Advanced AI & Machine Learning Solutions | infinity6 - Predictive Intelligence for Business |
| `<meta og:description>` | Transform your business with infinity6's advanced AI... | We turn data into decisions that anticipate the market. Predictive AI to grow revenue, protect margins and accelerate growth. |
| `<meta twitter:title>` | infinity6 AI Solutions - Advanced AI & Machine Learning Solutions | infinity6 - Predictive Intelligence for Business |
| `<meta twitter:description>` | Transform your business with infinity6's advanced AI... | We turn data into decisions that anticipate the market. Predictive AI to grow revenue, protect margins and accelerate growth. |

## Observacao importante
Apos publicar, o Google pode levar alguns dias para reindexar a pagina. Para acelerar, pode-se solicitar reindexacao no Google Search Console.

## Detalhes tecnicos

### Arquivo modificado
- `index.html` -- atualizar 7 meta tags (title, description, keywords, og:title, og:description, twitter:title, twitter:description)

Nenhum outro arquivo precisa ser alterado. O `SEOHead` continuara funcionando normalmente para usuarios com JavaScript (SPA), e o HTML estatico servira como fallback para crawlers.
