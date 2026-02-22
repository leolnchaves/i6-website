

# Reduzir distancias entre secoes

## Objetivo
Diminuir o padding vertical de todas as secoes (exceto a Hero que mantem `min-h-screen`).

## Mudancas

### 1. TeseSection (`src/components/hometeste/TeseSection.tsx`)
- De `py-24 md:py-32` para `py-14 md:py-20`

### 2. SinaisSection (`src/components/hometeste/SinaisSection.tsx`)
- De `py-24 md:py-32` para `py-14 md:py-20`

### 3. ResultadosSection (`src/components/hometeste/ResultadosSection.tsx`)
- De `py-24 md:py-32` para `py-14 md:py-20`

### 4. ClientesSection (`src/components/hometeste/ClientesSection.tsx`)
- De `py-16 md:py-20` para `py-10 md:py-14`

### 5. CTAFinal (`src/components/hometeste/CTAFinal.tsx`)
- De `py-24 md:py-32` para `py-14 md:py-20`

### 6. HeroMovimento (sem alteracao)
- Mantem `min-h-screen` para ocupar 100% da tela

## Resultado
Secoes mais proximas, layout mais compacto e fluido, com a Hero mantendo a ocupacao total da viewport.

