## Substituir accordion de Desafios por tabela em `/our-ai`

Os dados já existem no formato certo em `ourAIContent.ts`:
- `challenges.headers = { challenge, learning, resolution }`
- `challenges.rows = ChallengeRow[]` (9 linhas) com os 3 campos.

### Mudança
Reescrever `src/components/our-ai/ChallengesAccordion.tsx` para renderizar uma **tabela de 3 colunas** em vez do accordion Radix, mantendo título, lead e numeração (01–09).

### Layout
```text
┌────────────────────────────────────────────────────────────────────┐
│  H2 + lead (inalterados)                                           │
│                                                                    │
│  ┌──┬──────────────────────────┬──────────────┬─────────────────┐ │
│  │# │ Desafio                  │ Aprendizado  │ Como resolvemos │ │
│  ├──┼──────────────────────────┼──────────────┼─────────────────┤ │
│  │01│ Jornadas não digitais... │ ...          │ ...             │ │
│  │02│ Dados transacionais...   │ ...          │ ...             │ │
│  │..│                          │              │                 │ │
│  └──┴──────────────────────────┴──────────────┴─────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Estilo (mantém identidade do site)
- `<table className="w-full border-collapse">` dentro de um wrapper com `overflow-x-auto` para mobile.
- `<thead>`: fundo `bg-white/5`, `text-[11px] uppercase tracking-[0.18em] text-white/50`, `py-3 px-4`, `border-b border-white/10`.
- Coluna `#`: `w-12 text-[#F4845F] font-mono text-sm` (preserva os badges 01–09 do accordion).
- Coluna **Desafio**: `text-white font-semibold` (corresponde ao título do accordion).
- Colunas **Aprendizado** e **Como resolvemos**: `text-white/70 text-sm leading-relaxed`.
- Linhas: `border-b border-white/10`, `py-4 px-4`, `hover:bg-white/[0.03] transition-colors`.
- Alinhamento vertical: `align-top` para evitar centralização vertical quando os textos têm comprimentos diferentes.

### Header da tabela (i18n)
Reutiliza `c.challenges.headers.challenge / learning / resolution` (já em PT e EN). Adiciona internamente a coluna `#` (não precisa de i18n — é um símbolo).

### Responsivo
Em telas `< md`:
- Tabela com `overflow-x-auto` (scroll horizontal preserva a estrutura tabular).
- Padding reduzido (`px-3 py-3`).
- Fonte do corpo ligeiramente menor (`text-[13px]`).

### Arquivo
Reescrever `src/components/our-ai/ChallengesAccordion.tsx` (mantém o nome do arquivo e do export para não tocar em `OurAI.tsx`). Remove imports do `@/components/ui/accordion`.

### Verificação
- Preview PT e EN em `/our-ai`: seção de desafios agora exibe tabela 3 colunas + numeração, sem accordion.
- 9 linhas visíveis simultaneamente, sem cliques para expandir.
- Scroll horizontal funcional em mobile.
