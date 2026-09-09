## Detalhes técnicos

Escopo: apenas `src/components/home-v3/BuilderSection.tsx`. Referência visual: protótipo
"Navy com pilares em destaque" aprovado.

- Faixa escura: `bg-[#0B1224]` em container arredondado `rounded-[2.5rem]`, com gradiente
  coral decorativo à direita e brilho difuso (`blur`) coral no canto inferior esquerdo,
  ambos `pointer-events-none`.
- Textos: brancos (`text-white`), apoio em `text-slate-400`/`text-white/60`, destaque
  `#F4845F`. Cantos generosos (`rounded-3xl` nos cartões), como o restante do site.
- Modos: dois cartões empilhados (`border-white/10 bg-white/5`), número em coral, nome,
  três marcadores com bolinha coral — dados de `builderCopy[lang].persona.modes`
  (Embedded/OEM, Novo Produto) já existentes em PT/EN/ES.
- Pilares: grade 2×2 (`grid-cols-2`), cartões `bg-white/[0.03] border-white/5`, quadrado de
  ícone 40×40 `rounded-xl` — o primeiro com preenchimento coral (engines), os demais com
  `bg-white/10` e ícone coral (lucide: Zap, TerminalSquare, Network, ShieldCheck). Título e
  uma linha descritiva por pilar.
- Eyebrow/título/descrição e CTAs mantêm os textos atuais do arquivo, com cores para fundo
  escuro. CTA primário sólido coral com texto navy; secundário com contorno claro. Rotas:
  `localized('/i6-builders')` e `localized('/contact')`.
- Âncora `id="builder-platform"` e `scroll-mt-24` preservados.
- Altura: paddings e tipografia condensados para o conjunto caber em ~800 px de desktop;
  mobile empilha em coluna única.

Verificação ao final: typecheck, build e checagem visual PT/EN/ES a 1280×800, 1440×900 e
390×844, confirmando altura, âncora "Saiba mais" das faixas de solução e ausência de overflow
horizontal. Sem release ou deploy.
