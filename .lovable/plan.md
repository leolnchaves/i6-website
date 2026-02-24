
# Aumentar visibilidade do fundo laranja no hero das Politicas

## Problema
O gradiente laranja esta aplicado corretamente no codigo, mas com apenas 15% de opacidade (`from-[#F4845F]/15`) sobre o fundo escuro `#0B1224`, o efeito e praticamente invisivel.

## Solucao
Aumentar a opacidade do gradiente de 15% para 30% e estender um pouco mais o alcance do gradiente adicionando uma cor intermediaria (`via`), para que o efeito laranja suave fique visivel sem ser agressivo.

## Mudancas

### 1. `src/pages/PrivacyPolicy.tsx` (linha 166)

Antes:
```
bg-gradient-to-b from-[#F4845F]/15 to-[#0B1224]
```

Depois:
```
bg-gradient-to-b from-[#F4845F]/30 via-[#F4845F]/10 to-[#0B1224]
```

### 2. `src/pages/EthicsPolicy.tsx` (linha 259)

Mesma alteracao:

Antes:
```
bg-gradient-to-b from-[#F4845F]/15 to-[#0B1224]
```

Depois:
```
bg-gradient-to-b from-[#F4845F]/30 via-[#F4845F]/10 to-[#0B1224]
```

## Resultado
O laranja no topo do hero tera 30% de opacidade (o dobro do atual), com uma transicao suave passando por 10% antes de chegar ao fundo escuro. Isso cria um destaque visivel mas ainda elegante.
