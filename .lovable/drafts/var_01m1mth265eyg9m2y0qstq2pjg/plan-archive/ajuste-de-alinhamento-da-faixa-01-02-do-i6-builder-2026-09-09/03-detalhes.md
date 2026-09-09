## Detalhes técnicos

Arquivo alterado: `src/components/home-v3/BuilderSection.tsx`.

### Mudança principal

A faixa dividida 01/02 deixa de ser um filho direto da `<section>` com `w-full`. Passa a viver dentro do container `max-w-7xl mx-auto`, alinhada aos demais blocos de conteúdo.

### Estrutura pretendida

```text
<section className="bg-[#0B1224] text-white">
  <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:pt-16">
    <!-- rótulo, título, descrição, pilares -->
  </div>

  <div className="mx-auto max-w-7xl px-6">
    <div className="grid overflow-hidden border-y border-white/10 lg:grid-cols-2">
      <!-- 01 Embedded (OEM) -->
      <!-- 02 Novo Produto -->
    </div>
  </div>

  <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 md:pb-16">
    <!-- CTAs -->
  </div>
</section>
```

### Decisões de estilo

- A grade interna da faixa perde `w-full` direto e ganha `overflow-hidden` para que os cantos fiquem limpos caso se adicione algum arredondamento posterior.
- Mantêm-se as bordas `border-y border-white/10` entre as duas metades.
- Mantêm-se os paddings internos `px-6 py-10 md:px-10 lg:px-12`, agora medidos a partir da borda do container.
- As metades continuam com `lg:grid-cols-2`, empilhando no mobile e dividindo no desktop.

### Mobile

No mobile a faixa continua empilhada, ocupando a largura interna do container (descontados os paddings horizontais `px-6`). Não há mudança de comportamento, apenas o alinhamento lateral com o restante do conteúdo.

### Não muda

- Fundo escuro da seção em `bg-[#0B1224]`.
- Texto, rótulo coral, título, descrição e os quatro pilares.
- Conteúdo de `builderCopy[lang].persona.modes` (títulos, descrições e bullets).
- CTAs, rotas, âncora `#builder-platform` e identidade visual.

### Validação

- Prévia em 1280×800 e 1440×900: faixa 01/02 alinhada às bordas do container.
- Prévia mobile (390×844): empilhamento preservado sem scroll horizontal.
- Typecheck e build.
