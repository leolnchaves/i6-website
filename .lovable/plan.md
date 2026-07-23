## Ondas coral na attract screen do /kiosk

Encaixar a imagem `abstract-orange-smooth-wave-lines.jpg` como decoração na parte inferior da tela do totem, ancorada exatamente ao final da viewport (sem espaço abaixo), com opacidade reduzida. Subir levemente a logo + tagline para dar respiro em relação às ondas.

### Passos

1. **Upload do asset** via `lovable-assets` a partir de `/mnt/user-uploads/abstract-orange-smooth-wave-lines.jpg`, salvando o pointer em `src/assets/kiosk-waves-coral.jpg.asset.json`.

2. **Editar `src/components/kiosk/AttractScreen.tsx`:**
   - Adicionar uma camada absoluta ao final do `<button>` (o container já é `relative`):
     ```tsx
     <img
       src={waves.url}
       aria-hidden
       className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-auto opacity-30 select-none"
     />
     ```
   - Como o fundo do totem é escuro (navy) e a imagem tem fundo branco, aplicar `mix-blend-mode: screen` (via `style`) para eliminar o branco e deixar apenas as ondas coral visíveis, mantendo `opacity` baixa (~0.35).
   - Garantir que o botão tenha `overflow-hidden` para as ondas não vazarem em telas maiores.
   - Subir o bloco inferior (símbolo + tagline) reduzindo o padding vertical do container de `py-[10vmin]` para `py-[8vmin]` e/ou adicionando `mb-[6vmin]` no bloco BOTTOM, de forma que a logo + "The Platform for Decision Advantage" fique acima da faixa de ondas.

### Notas técnicas

- Z-index: as ondas ficam atrás (`z-0`), os blocos de conteúdo já usam `z-10`.
- Nada muda no `AttractScreen` além de layout e uma imagem decorativa; sem lógica nova.
- Apenas presentational — não afeta o fluxo do quiz nem outros componentes.
