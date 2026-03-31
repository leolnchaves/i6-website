

# Reconstruir TeseSection: indicadores à esquerda, consequências à direita

## Conceito visual
Layout side-by-side no desktop com uma seta/conector visual simulando "causa → consequência":

```text
┌─────────────────────────────────────────────────────────────┐
│  Titulo centralizado (mantido)                              │
│  "Seus dados geram vantagem competitiva..."                 │
├────────────────────────┬──┬─────────────────────────────────┤
│  INDICADORES (esq)     │→ │  CONSEQUÊNCIAS (dir)            │
│                        │  │                                 │
│  ┌──────────────┐      │  │  Texto intro:                   │
│  │  11%         │      │  │  "O custo da reação..."         │
│  │  receita...  │      │  │                                 │
│  ├──────────────┤      │  │  • Ruptura e Miopia de Mix      │
│  │  31%         │      │  │  • Inacurácia de Demanda        │
│  │  empresas... │      │  │  • Margem sob Pressão           │
│  ├──────────────┤      │  │  • Ineficiência Comercial       │
│  │  11%         │      │  │                                 │
│  │  marcas...   │      │  │                                 │
│  └──────────────┘      │  │                                 │
├────────────────────────┴──┴─────────────────────────────────┤
│  Texto bridge (mantido)                                     │
│  "Dados, sozinhos, não criam vantagem competitiva..."       │
└─────────────────────────────────────────────────────────────┘
```

O conector visual entre esquerda e direita será uma seta SVG animada com gradiente laranja, criando a sensação de "esses números levam a esses problemas".

## Mudanças

### 1. `tsconfig.app.json`
Adicionar `"types": ["node"]` ao `compilerOptions` para corrigir os erros de build com `process` e `NodeJS`.

### 2. `src/components/hometeste/TeseSection.tsx`
Reconstruir o layout central:

- **Titulo e bridge**: mantidos intactos (posição e estilo)
- **Bloco central**: trocar o grid 3-colunas centralizado por um layout `grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]`
  - **Coluna esquerda**: os 3 indicadores empilhados verticalmente (cards com fundo `bg-gray-50` sutil, borda leve)
  - **Coluna central**: SVG com seta curva animada (gradiente `#F4845F`) apontando da esquerda para a direita, com animação de "draw-line"
  - **Coluna direita**: texto introdutório "O custo da reação..." seguido dos 4 bullets com dot laranja e titulo em negrito
- **Mobile**: empilha verticalmente (indicadores → seta apontando para baixo → bullets)
- Conteudo bilíngue (PT e EN) inline no componente, mesmo padrão atual

### Detalhes do conector visual
- SVG de ~40px de largura no desktop, com path curvo tipo "→"
- Animação CSS `draw-line` já existente no `index.css`
- No mobile, rotaciona 90° para apontar para baixo

### Estilo dos bullets
- Cada bullet: dot laranja `w-2 h-2 rounded-full bg-[#F4845F]` + titulo em `font-semibold text-[#0B1224]` + descrição em `text-[#0F172A]/70`
- Espaçamento `space-y-4`

