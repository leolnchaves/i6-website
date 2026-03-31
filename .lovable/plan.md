

# Compactar TeseSection para caber sem scroll + atualizar texto

## Problema
A secao esta muito alta e nao cabe em uma unica viewport (1021x743). Os espacamentos verticais sao excessivos: `py-14 md:py-20`, `mt-16` entre titulo e grid, `space-y-6` entre cards, `mt-16` antes do bridge.

## Mudancas em `src/components/hometeste/TeseSection.tsx`

### 1. Reduzir espacamentos verticais
- Secao: `py-14 md:py-20` → `py-10 md:py-14`
- Titulo ao grid: `mt-16` → `mt-8`
- Entre indicator cards: `space-y-6` → `space-y-3`
- Padding dos cards: `p-4` → `p-3`
- Entre bullets: `space-y-3` → `space-y-2`
- Padding dos bullets: `py-3 pr-4` → `py-2 pr-3`
- Narrative `mb-6` → `mb-4`
- Bridge: `mt-16` → `mt-8`

### 2. Reduzir fontes
- Titulo: `text-2xl sm:text-3xl md:text-4xl` → `text-xl sm:text-2xl md:text-3xl`
- Counter: `text-3xl sm:text-4xl` → `text-2xl sm:text-3xl`
- Bridge: `text-lg md:text-xl` → `text-base md:text-lg`

### 3. Atualizar texto narrativo
- PT: **"Seus dados parados são o lucro da concorrência."** (em negrito) + resto: "A incapacidade de antecipar movimentos transforma informação em custo e gera ineficiências que drenam sua margem."
- EN: **"Your idle data is your competitor's profit."** (em negrito) + resto mantido

### 4. Implementacao do negrito
Separar a primeira frase em um `<strong>` e o resto em `<span>`:
```tsx
<p className="text-sm md:text-base text-[#0F172A]/70 mb-4">
  <strong className="text-[#0B1224]">{copy.narrativeBold}</strong>{' '}
  {copy.narrativeRest}
</p>
```

