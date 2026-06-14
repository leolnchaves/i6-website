## Objetivo

Replicar, nas páginas dedicadas de Success Story (`/success-stories/:slug`), o mesmo tratamento de hero usado em i6 Research: imagem horizontal full-bleed com escurecimento + tints, e título/subtítulo ancorados no canto inferior esquerdo sobre a imagem.

Escopo restrito: **somente** imagem do topo + título (`story.title`) + subtítulo (`story.client` e/ou `story.description`). Demais blocos (Resultados, Desafio, Solução, Soluções Aplicadas, Quote, Outras Histórias, CTA) ficam intactos.

## Mudanças

Arquivo único: `src/pages/SuccessStoryArticle.tsx`

1. Remover o `<header>` atual (segment chip + h1 + client + description) e o `<img>` separado abaixo.
2. Inserir, no mesmo lugar, o bloco hero full-bleed espelhado do `IntelligenceArticle.tsx` (linhas 132–164):
   - `relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden mb-12`
   - container interno `h-[420px] md:h-[560px]`
   - `<img>` com `filter brightness-[0.7] saturate-[0.85] contrast-[1.05]` (mesmo tratamento já aprovado)
   - 3 camadas: navy tint `bg-[#0B1224]/35`, fade vertical bottom, fade lateral
   - Texto bottom-left dentro de `container mx-auto max-w-4xl px-6 flex flex-col justify-end pb-8 md:pb-12` (max-w-4xl para casar com o `<article>` da página)
   - Pré-título pequeno com segmento: `infinity6 · {story.segment}` em `text-[#F4845F]` uppercase tracking-wide
   - `<h1>` com `story.title`
   - Subtítulo: `story.client` em destaque + `story.description` em linha menor (mantém os dois campos visíveis, só muda o layout)
3. Manter o link "Back to Stories" acima do hero (igual ao Research que mantém o "Voltar").
4. Se `story.image` estiver vazio, renderizar o hero apenas com o fundo navy + texto (sem `<img>`), preservando a estrutura.

Nada mais é alterado: SEO/Helmet, métricas, challenge/solution, quote, related, CTAFinal permanecem como estão.

## Resultado visual

```text
[← Back to Stories]
┌──────────────────────────────────── full-bleed ─────────────────────────┐
│   (imagem escurecida + navy tint + fades)                               │
│                                                                         │
│                                                                         │
│   infinity6 · Indústria                                                 │
│   Marketplace Excellence in Pharmacy                                    │
│   EMS Farma                                                             │
│   Resumo curto da empresa…                                              │
└─────────────────────────────────────────────────────────────────────────┘
[Resultados / Desafio / Solução / ... permanecem inalterados]
```
