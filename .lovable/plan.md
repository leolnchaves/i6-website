## Dois ajustes

### 1) Seção "COMO FUNCIONA" — labels e chips estourando

Depois do `max-w-6xl`, as duas colunas laterais ficaram estreitas (170–210px) e os labels `CAPTURAMOS DE QUALQUER ECOSSISTEMA` / `ATIVAMOS EM QUALQUER ECOSSISTEMA` (tracking 0.22em) vazam para fora. Em `src/components/hometeste/ComoFuncionamosSection.tsx`:

- **Labels (linhas 277 e 335):** reduzir tracking de `0.22em` para `0.15em` para caberem em duas linhas dentro da coluna sem transbordar.
- **Grid (linha 274):** ajustar `grid-cols-[minmax(170px,210px)_1fr_minmax(170px,210px)] gap-10` para `grid-cols-[minmax(180px,200px)_1fr_minmax(180px,200px)] gap-6`, dando mais respiro ao centro sem apertar os chips.

Nada mais muda — cards, box "i6 Platform", conectores e animações permanecem.

### 2) Hero — descer o título

Em `src/components/hometeste/HeroDecisaoV4.tsx` (linha 26), aumentar o padding-top do bloco do título:

```tsx
<div className="relative z-10 flex-shrink-0 pt-[10vh] md:pt-[14vh] px-6">
```

Descrição e CTA continuam ancorados ao fundo (`flex-shrink-0` + `pb-[2vh]/[3vh]`), então só o título desce; a imagem no meio simplesmente absorve a diferença via `object-contain`.
