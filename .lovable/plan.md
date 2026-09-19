# Dados estruturados: fundadores, publicações e palestras

## Passo 0 — como o HTML é gerado hoje (verificado)

- O site é uma SPA Vite. `npm run build` gera **um único `dist/index.html`**.
- Depois do build, o workflow roda `node scripts/prerender-seo-stubs.mjs`, que lê `dist/index.html` e grava **um arquivo HTML por rota**, com `<title>`, descrição, canonical, hreflang, og:* e, quando aplicável, `<script type="application/ld+json">` já no `<head>` estático. Ou seja: a infraestrutura pedida **já existe**; falta estender.
- Limite atual: o gerador cobre **apenas `pt` e `en`**. Não existe `/es/...`. Será incluído.
- Onde estão os três blocos hoje:
  1. **Global (Organization + WebSite)** — `index.html`, estático em todas as rotas. OK para robôs.
  2. **`/our-ai` no cliente** — `src/pages/OurAI.tsx` monta TechArticle + SoftwareApplication + glossário + Observations e entrega via `SEOHead` (react-helmet). **Não é visto por robôs sem JavaScript.**
  3. **`/our-ai` no build** — `scripts/prerender-seo-stubs.mjs` grava uma versão estática equivalente (produtos + glossário + observações) para `pt`/`en`. É essa que os robôs leem.
- Correção factual sobre o Bloco B: as **9 palestras não estão em `/our-ai`**, e sim na página de documentação `/{idioma}/docs/pesquisa` (`src/content/docs/pesquisa-{pt,en,es}.md`), onde todas mostram "InfoQ Brasil · QCon". Em `/our-ai` a seção Base científica lista **3 itens** (1 palestra + 2 artigos), já com rótulos corretos. O Bloco B será aplicado nos três arquivos de `docs/pesquisa`.

## Regras de trabalho aceitas

- Diff completo mostrado antes de aplicar; nada aplicado automaticamente.
- Nenhuma copy visível muda, exceto o Bloco B.
- Campos nulos/pendentes são **omitidos** do JSON — nunca string vazia nem "[...]".
- Serialização por `JSON.stringify`, com `<` escapado como `\u003c`.

## O que será feito

### 1. Fonte única de dados
- `src/data/research.ts` — dados neutros de idioma: 4 artigos e 9 palestras (slug, título, ano/data, evento, veículo, links, DOI, `inLanguage`), com `// PLACEHOLDER` nos campos pendentes.
- `src/data/founders.ts` — Leonardo Chaves e Everton Gago, com campos por idioma no padrão PT/EN/ES e fallback PT.
- A lista visível de `/docs/pesquisa` e os geradores de JSON-LD passam a ler de `research.ts`, para página e JSON nunca divergirem.

### 2. Bloco global (`index.html`)
- `Organization` ganha `@id` `https://infinity6.ai/#organization`; `WebSite` ganha `@id` `#website`, `publisher` por referência e `inLanguage` `["pt-BR","en","es"]`.
- Os dois objetos inline de Leonardo e Everton em `founder` são **excluídos** e substituídos por referências `{"@id": "…#leonardo-chaves"}` e `{"@id": "…#everton-gago"}`.
- Henrique dos Reis Meirelles permanece inline, intocado (`// PLACEHOLDER: decisão pendente`).
- Os dois nós `Person` completos são **criados** no mesmo grafo global, para as referências resolverem em qualquer página.
- Cargos: Leonardo "Founder & CEO" (igual nos 3 idiomas); Everton "Cofundador e COO" / "Co-founder and COO" / "Cofundador y COO".
- Imagem só é emitida se o arquivo existir em `public/` no build — hoje **não existe `public/team/`**, então `image` fica omitido nos dois.

### 3. Bloco novo de produção científica (só `/our-ai`, nos 3 idiomas)
- Um `<script type="application/ld+json">` próprio com 4 `ScholarlyArticle` e 9 `CreativeWork` (palestras, `publisher` InfoQ Brasil, `isPartOf` o evento, `genre` traduzido), `author` referenciando `#everton-gago` (e Robson Tesini na palestra de 2017).
- O item "Open Access" do site é o mesmo artigo do LNBIP: entra apenas como `sameAs`, sem nó separado.
- No `TechArticle`, `author` passa a array: Organization + `#everton-gago` + `#leonardo-chaves`.
- Títulos, eventos e links não são traduzidos; cada artigo mantém o `inLanguage` do próprio trabalho.

### 4. Espanhol
`/es` passa a ser gerado pelo script de build para home e `/our-ai` (hoje só `pt`/`en`), para os blocos valerem nos três idiomas.

### 5. Bloco B — rótulo visível das palestras
Em `src/content/docs/pesquisa-{pt,en,es}.md`, "InfoQ Brasil · QCon" passa a "InfoQ Brasil · <evento>" (QCon São Paulo 2018, DevCamp 2014, PGDay Campinas 2015 etc.). Títulos, links e o resto do texto não mudam. Observação: esses arquivos são `site_managed` e existe um sincronizador de docs do i6 Hub — ele **não** roda no workflow de deploy, então a edição é segura, mas um sync manual de `--type=docs` sobrescreveria.

### 6. Validação no build
Script novo que roda depois do prerender e **falha o build** se: algum bloco JSON-LD não estiver no HTML estático ou for JSON inválido; houver `@id` duplicado ou referência que não resolve na mesma página; houver placeholder `[`/valor vazio; título ou ano do JSON divergir da lista visível correspondente; `image` emitida sem arquivo existente. Cobertura: home e `/our-ai` em pt, en, es.

### Entregas junto do diff
Lista do que foi criado, alterado e excluído, e a lista de `// PLACEHOLDER` abertos (Scholar e ORCID do Everton, prêmios, volume/páginas do artigo de 2010, fotos do time, decisão sobre Henrique, consolidação de produtos).

## Reporte pedido: blocos de produtos (sem alterar agora)

- (a) Divergência de grafia: o bloco do build usa "i6Signal", "i6Previsio", "i6RecSys", "i6ElasticPrice"; o do cliente usa os nomes da página ("i6 Previsio" etc.). São nós distintos para os robôs, sem `@id`, então o mesmo produto aparece duplicado.
- (b) `i6Signal` aparece nos dois blocos, mas a seção Motores da página tem **3 motores** (Previsio, RecSys, ElasticPrice) — o Signal não está lá, e a âncora `#i6signal` que o JSON cita não existe na página.
- (c) Consolidação proposta: um único nó por produto, com `@id` `https://infinity6.ai/#i6previsio` (etc.), grafia idêntica à da página, âncora existente, criado uma única vez e referenciado por `@id` nos demais blocos — eliminando duplicidade e link quebrado.
