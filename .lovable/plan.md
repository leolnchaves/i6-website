# Hero do Research — imagem full-bleed com fade no bottom

Substituir o bloco arredondado por uma **imagem full-bleed (de borda a borda da viewport)** que se dissolve no navy do site na base. Título e subtítulo ficam menores, ancorados no canto inferior esquerdo da imagem. Back-link + kicker continuam acima, e o conteúdo do artigo continua como hoje (`max-w-3xl`, sem sobrepor a imagem).

## Estrutura

```text
container max-w-3xl (back-link + kicker)
 ← Back to i6 Research
 INFINITY6 · RESEARCH

────── FULL-BLEED (100vw) ──────
│ [imagem cover, object-cover, ~520px]      │
│                                            │
│ gradiente vertical na base:                │
│   transparente → #0B1224 (fade longo,      │
│   ~40% da altura, sem corte visível)       │
│                                            │
│ container max-w-3xl (alinhado ao corpo):   │
│   Título (text-2xl md:text-4xl, bold)     │
│   Subtítulo (text-sm md:text-base, /85)   │
│   data · read time   (text-xs, /60)       │
│   ↑ ancorados em justify-end + left        │
─────────────────────────────────────────────

container max-w-3xl (corpo markdown, como hoje)
```

## Detalhes

### Quebra do container (full-bleed)

A imagem precisa sair do `max-w-3xl` da `<article>`. Técnica padrão:

```tsx
<div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
  ...
</div>
```

Aplicado a um wrapper que contém a imagem + gradiente + texto. Largura = 100vw, sem scroll horizontal (já há `overflow-x-hidden` no body do site; vou validar).

### Imagem + fade

- `<img>` `absolute inset-0 w-full h-full object-cover` dentro de um container `relative h-[420px] md:h-[560px]`.
- Camada de fade: `absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1224]/30 to-[#0B1224]` — fade longo, começa ~60% da altura, termina 100% opaco na base, sem linha visível.
- Camada lateral sutil opcional: `bg-gradient-to-r from-[#0B1224]/40 via-transparent to-[#0B1224]/40` para integração lateral (opacidade baixa).

### Texto

- Wrapper interno: `relative h-full container mx-auto max-w-3xl px-6 flex flex-col justify-end pb-10 md:pb-14`.
- Título: `text-2xl md:text-4xl font-bold leading-[1.1] tracking-tight text-white mb-3`.
- Subtítulo: `text-sm md:text-base text-white/85 leading-relaxed mb-4 max-w-2xl`.
- Meta (data · read time): `text-xs text-white/60`.
- Tudo ancorado **bottom-left** dentro do container do corpo, então o texto fica visualmente alinhado com o markdown abaixo.

### Fallback sem cover

Quando `piece.cover_image` for nulo (caso atual do `ruptura-gondola-ia-preditiva`), o full-bleed mantém apenas o gradiente navy + título/subtítulo/meta. Nada de borda nem placeholder visível.

### Corpo do artigo

Permanece como está hoje: `max-w-3xl`, sem sobrepor a imagem, com `pt-12` para respiro depois do fade.

## Validação

- Conferir no preview que não aparece scroll horizontal (especialmente em mobile com scrollbar custom).
- Conferir contraste do subtítulo sobre regiões claras da imagem (o gradiente cobre principalmente a metade inferior — se a imagem tiver céu claro na base, o subtítulo continua legível pelo fade `/0B1224` opaco).

## Fora de escopo

- `InsightArticle.tsx`.
- Listagem `/i6-intelligence`.
- Conteúdo do markdown.

Confirma que sigo?
