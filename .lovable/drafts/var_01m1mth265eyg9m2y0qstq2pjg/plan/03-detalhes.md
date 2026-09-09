## Detalhes técnicos

Escopo: apenas `src/components/home-v3/BuilderSection.tsx`. Nada mais muda — nem a Decision
Suite, nem a hero, nem a página `/i6-builders`.

- Fundo: `bg-[#0B1224]` na seção inteira (mesmo padrão de `BuilderPersona.tsx`), com textos em
  `text-white`, apoio em `text-white/60`, divisórias `border-white/10` e destaque `#F4845F`.
- Pilares: de `grid lg:grid-cols-4` com cartões para uma faixa de 4 colunas sem cartão —
  título + uma linha, separadas por `border-t border-white/10`, tipografia menor.
- Modos: novo bloco `md:grid-cols-2` com número em mono, nome, frase e três marcadores com
  ícone `Check`. Os textos reaproveitam `builderCopy[lang].persona.modes` de
  `src/data/i6Builders/content.ts` (Embedded/OEM e Novo Produto), já disponível em PT/EN/ES —
  sem duplicar conteúdo.
- Eyebrow/título/descrição e os dois CTAs mantêm os textos atuais do próprio arquivo, apenas
  com variantes de cor para fundo escuro. Rotas: `localized('/i6-builders')` e
  `localized('/contact')`.
- Âncora `id="builder-platform"` e `scroll-mt-24` preservados (usados pelo CTA "Saiba mais" das
  faixas de solução).
- Altura: padding vertical reduzido (`py-14 md:py-16`) e tipografia condensada para o conjunto
  ficar abaixo de ~800 px no desktop; no mobile empilha normalmente com rolagem da página.

Verificação ao final: typecheck, build e checagem visual em PT/EN/ES a 1280×800, 1440×900 e
390×844, confirmando altura da seção, âncora e ausência de overflow horizontal. Sem release ou
deploy.
