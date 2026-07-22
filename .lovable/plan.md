## Refazer seção "Como Funciona" — fundo claro + conectores fluidos

Reescrever `src/components/hometeste/ComoFuncionamosSection.tsx` inspirado no anexo 2: fundo claro, chips de logos flutuando nas laterais e **conectores curvos SVG** saindo de cada logo até o card 01 (esquerda) e até o card 04 (direita). Zero linhas retas, zero "chip preso à borda".

### Fundo claro

Toda a seção passa a ter fundo claro para dar alívio visual entre a hero escura e o restante do site escuro:
- Fundo base: `bg-[#F5F6FA]` (off-white levemente frio, harmônico com o coral).
- Faixa superior e inferior com um `bg-gradient-to-b from-[#0B1224] via-[#0B1224] to-[#F5F6FA]` de ~40px como transição suave (evita corte duro entre hero navy e seção clara).
- Todos os textos passam a usar tons escuros: título `text-slate-900`, subtítulo `text-slate-500`, descrições dos cards `text-slate-600`.
- Coral `#F4845F` continua sendo o accent principal (destaque no título, número dos steps, conectores).

### 4 cards centrais (sem alterar estrutura)

- Mantém 4 cards numerados em row.
- Novo estilo card claro: `bg-white border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_40px_rgba(244,132,95,0.15)] hover:border-[#F4845F]/40`.
- Números `01/02/03/04` em coral (mantém).
- Título `text-slate-900`, descrição `text-slate-600`.
- **Modelos proprietários** em bold coral na descrição do card 02.

### Chips laterais flutuantes

- Chips em fundo branco: `bg-white border border-slate-200 shadow-sm rounded-full`, texto `text-slate-700`.
- Logos via `simpleicons.org` com cor original (não cinza) para dar mais vida sobre o fundo claro.
- Posicionamento: **coluna esquerda** com chips espalhados verticalmente (sem alinhamento rígido, cada um com pequeno offset horizontal para dar leveza); **coluna direita** idem.
- Rótulos das colunas em `text-slate-400 uppercase tracking-widest text-[10px]`.

### Conectores fluidos SVG (o coração da mudança)

- Um `<svg>` absoluto cobrindo toda a área central da seção.
- Para cada chip da esquerda, desenha um `<path>` do centro-direito do chip → borda esquerda do card 01, usando curva de Bézier cúbica (control points empurrando horizontalmente para criar a curva suave do anexo 2).
- Idem para a direita: cada chip → borda direita do card 04.
- Estilo path: `stroke="#F4845F" stroke-width="1" fill="none" stroke-opacity="0.35"`.
- Nas extremidades, pequenos círculos coral com glow (`filter: drop-shadow`).
- Coordenadas calculadas via `useLayoutEffect` medindo `getBoundingClientRect()` dos chips e dos cards (com `ResizeObserver` para responsividade).

### Mobile

- Esconde o SVG e as colunas laterais.
- Renderiza chips das origens em `flex-wrap` acima dos cards, chips de ativação abaixo dos cards.
- Sem conectores.

### Arquivo afetado

- **Editar apenas:** `src/components/hometeste/ComoFuncionamosSection.tsx`

### Notas de implementação

- Refs em cada chip + em cada card via `useRef` array.
- Cálculo dos paths em `useLayoutEffect` + `ResizeObserver` no wrapper para recalcular ao redimensionar.
- SVG com `viewBox` dinâmico usando `preserveAspectRatio="none"` ou coordenadas absolutas em px baseadas no wrapper.
