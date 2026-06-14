## Objetivo

Adicionar uma versão compacta da seção de depoimentos do `/success-stories` na Home, logo após `RealResultsStrip` (a faixa "Provas em Números"), com CTA para a página de Success Stories.

## Implementação

### 1. Novo componente `src/components/hometeste/TestemunhosCompact.tsx`

- Reusa o hook `useTestimonialsMarkdown` (mesma fonte do `TestimonialsSection`).
- Layout compacto:
  - Título curto (h2): PT "O que dizem nossos clientes" / EN "What our clients say".
  - Carrossel `embla` com autoplay (7s), igual ao da página, mas com cards menores: `min-h-[200px]`, padding reduzido, citação truncada a ~3 linhas via `line-clamp-3`.
  - Cada card mostra: ícone de aspas, quote, nome, cargo + empresa, link LinkedIn (se houver).
  - Mantém o visual coerente: navy bg, accent coral `#F4845F`, borda `border-white/10`, hover sutil.
  - Sem indicadores em "dot" grandes — usar dots simples menores.
- CTA abaixo do carrossel, centralizado, usando o design system Outline Glow já em uso no projeto:
  - PT: "Veja os resultados que esses clientes têm recuperado"
  - EN: "See the results these clients have been recovering"
  - Link para `/{language}/success-stories` via `useLanguage()` e `Link` do react-router-dom.
- Padding vertical menor que a versão da página (`py-16` em vez de `py-24`).
- Estados loading/erro/vazio: retornar `null` (não renderizar nada) para não criar buraco na Home.

### 2. Injeção na Home `src/pages/HomeTeste.tsx`

Inserir `<TestemunhosCompact />` entre `<RealResultsStrip compact />` e `<ClientesSection />`.

## Arquivos afetados

- Criado: `src/components/hometeste/TestemunhosCompact.tsx`
- Editado: `src/pages/HomeTeste.tsx`

Sem mudanças em backend, hooks ou conteúdo — reaproveita 100% do conteúdo já alimentado por Markdown.
