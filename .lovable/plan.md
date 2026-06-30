## Objetivo

Fazer o **sub-hero** (`hero_sub`) das páginas de Landing (`/solutions/<slug>`) renderizar formatação Markdown — negrito, itálico, listas, links — exatamente como o corpo (Pain / Problem / Solution / Application) já faz hoje via `MarkdownBody`.

## Onde está hoje

Em `src/pages/TransformationLanding.tsx`, dentro de `HeroSection`, o `hero_sub` é renderizado como texto puro:

```tsx
{piece.hero_sub && (
  <p className="text-base md:text-lg text-white/65 leading-relaxed mb-10">
    {piece.hero_sub}
  </p>
)}
```

Resultado: `**negrito**` aparece literal, listas não renderizam.

## Mudança

Trocar esse `<p>` por um bloco `ReactMarkdown` + `remark-gfm` (mesmas libs já importadas no arquivo), envolvido em uma `div` com as mesmas classes tipográficas do sub-hero atual + tokens `prose` para suportar negrito, itálico, listas e links com o tom de cor branco/coral do tema.

Pseudocódigo da substituição:

```tsx
{piece.hero_sub && (
  <div className="prose prose-invert max-w-3xl text-base md:text-lg text-white/65 leading-relaxed mb-10
                  prose-p:text-white/65 prose-strong:text-white prose-li:text-white/65
                  prose-a:text-[#F4845F] hover:prose-a:underline">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{piece.hero_sub}</ReactMarkdown>
  </div>
)}
```

Nenhuma mudança em:
- Parser de frontmatter (`useLandings.ts`) — já entrega a string crua, `**...**` sobrevive.
- Conteúdo dos `.md` de landings — o autor passa a poder usar `**negrito**`, listas, etc. no `hero_sub` quando quiser.
- Body das seções — já usa `MarkdownBody`, permanece igual.
- SEO/JSON-LD — `description` continua a vir do campo `description` (plain), não do `hero_sub`.

## Detalhes técnicos

- Arquivo único alterado: `src/pages/TransformationLanding.tsx` (lines 55–59, dentro de `HeroSection`).
- `ReactMarkdown` e `remarkGfm` já estão importados no topo do arquivo — sem novas dependências.
- O wrapper `prose` herda tipografia do sub-hero (tamanho + cor), apenas habilitando os elementos inline/bloco do MD.
- Caso o `hero_sub` seja uma única linha sem markdown (caso atual de todos os 8 arquivos `.md`), o resultado visual é idêntico ao atual.