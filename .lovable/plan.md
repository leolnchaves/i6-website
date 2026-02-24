

# Estrategia de SEO de Alta Performance para infinity6

## Resumo
Implementar SEO em 3 camadas (estrategica, problema de negocio, solucao tecnica) com meta tags dinamicas por pagina, dados estruturados Schema.org (Organization + FAQ), keywords estrategicas por rota, e melhorias tecnicas no sitemap e robots.txt.

## O que sera feito

### 1. Instalar react-helmet-async
Dependencia necessaria para gerenciar `<head>` dinamicamente no React SPA.

### 2. Criar componente `SEOHead` reutilizavel
Novo arquivo `src/components/common/SEOHead.tsx` que recebe titulo, descricao, keywords e canonical URL, e injeta dinamicamente no `<head>`:
- `<title>` unico por pagina (55-60 caracteres)
- `<meta description>` unica (140-160 caracteres)
- `<meta keywords>` com palavras-chave das 3 camadas
- `<link rel="canonical">`
- Open Graph tags dinamicas
- Twitter Card tags dinamicas
- Meta tag `content-language` baseada no idioma ativo (pt/en)

### 3. Adicionar SEOHead em cada pagina com keywords estrategicas

**Home (`HomeTeste.tsx`)**
- PT: "infinity6 - Inteligencia Preditiva para Empresas | IA Aplicada a Negocios"
- Keywords: inteligencia artificial para empresas, IA aplicada a negocios, inteligencia preditiva, crescimento previsivel, growth intelligence
- Description: "Transformamos dados em decisoes que antecipam o mercado. IA preditiva para aumentar receita, proteger margem e acelerar crescimento."

**Solutions (`Solutions.tsx`)**
- PT: "Solucoes de IA Preditiva | Precificacao Dinamica, Previsao de Demanda, Recomendacao"
- Keywords: motor de recomendacao B2B, dynamic pricing varejo, forecast preditivo, precificacao inteligente, otimizacao de sortimento, elasticidade de preco, IA para supply chain
- Description: "Recomendacao em tempo real, preco dinamico, forecasting adaptativo. Solucoes de IA que aumentam ticket medio, reduzem churn e otimizam margem."

**Success Stories (`SuccessStories.tsx`)**
- PT: "Cases de Sucesso com IA | Resultados Reais em Receita, Margem e Conversao"
- Keywords: como aumentar ticket medio, como reduzir churn, como prever demanda, como melhorar margem de lucro, ROI de campanhas, personalização preditiva
- Description: "Veja como empresas aumentaram receita, protegeram margem e reduziram rupturas com inteligencia preditiva da infinity6."

**Contact (`Contact.tsx`)**
- PT: "Fale Conosco | infinity6 - Inteligencia Preditiva em Producao em 4-12 Semanas"
- Keywords: IA para industria, inteligencia comercial B2B, recomendacao para PDV
- Description: "Agende uma conversa estrategica. Colocamos IA preditiva em producao em 4-12 semanas com impacto financeiro mensuravel."

**PrivacyPolicy e EthicsPolicy** -- meta tags basicas (titulo + description).

### 4. Dados estruturados JSON-LD no `index.html`

**Organization Schema:**
```json
{
  "@type": "Organization",
  "name": "infinity6",
  "url": "https://www.infinity6.ai",
  "logo": "https://www.infinity6.ai/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png",
  "description": "IA preditiva para empresas...",
  "sameAs": []
}
```

**FAQPage Schema** na pagina de Contact (usando os FAQs existentes do `FAQSection`):
- Isso habilita rich snippets de FAQ no Google, aumentando visibilidade

### 5. Atualizar `public/robots.txt`
Adicionar referencia ao sitemap:
```
Sitemap: https://www.infinity6.ai/sitemap.xml
```

### 6. Atualizar `public/sitemap.xml`
- Corrigir datas `lastmod` para 2026-02-24

### 7. Envolver o App com `HelmetProvider`
Atualizar `src/App.tsx` para adicionar o provider do react-helmet-async.

## Detalhes tecnicos

### Arquivos novos
- `src/components/common/SEOHead.tsx` -- componente reutilizavel
- `src/data/staticData/seoData.ts` -- dados de SEO por pagina e idioma (titulos, descriptions, keywords organizados por camada)

### Arquivos modificados
- `src/App.tsx` -- envolver com `HelmetProvider`
- `src/pages/HomeTeste.tsx` -- adicionar `<SEOHead>`
- `src/pages/Solutions.tsx` -- adicionar `<SEOHead>`
- `src/pages/SuccessStories.tsx` -- adicionar `<SEOHead>`
- `src/pages/Contact.tsx` -- adicionar `<SEOHead>` + JSON-LD de FAQPage
- `src/pages/PrivacyPolicy.tsx` -- adicionar `<SEOHead>`
- `src/pages/EthicsPolicy.tsx` -- adicionar `<SEOHead>`
- `index.html` -- adicionar JSON-LD Organization + WebSite
- `public/robots.txt` -- adicionar Sitemap
- `public/sitemap.xml` -- atualizar datas

### Mapeamento de keywords por camada

| Camada | Pagina | Keywords |
|--------|--------|----------|
| Estrategica | Home | inteligencia artificial para empresas, IA aplicada a negocios, inteligencia preditiva |
| Problema | Success Stories | como aumentar ticket medio, como reduzir churn, como prever demanda |
| Solucao tecnica | Solutions | motor de recomendacao B2B, dynamic pricing, forecast preditivo, elasticidade de preco |
| Conversao | Contact | IA para industria, inteligencia comercial B2B |

### O que NAO faremos (conforme alertas do estudo)
- Nao focar apenas em "IA" generica -- cada pagina tera keywords conectadas a problema de negocio
- Conteudo conecta SEO com impacto financeiro (receita, margem, ROI)
- Keywords B2B industriais incluidas (PDV, supply chain, sortimento)
- Cases reais referenciados nos meta descriptions de Success Stories

