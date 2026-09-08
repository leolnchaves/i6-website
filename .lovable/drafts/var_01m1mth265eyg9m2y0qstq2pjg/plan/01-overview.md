# Ajuste fino de espaçamento na primeira dobra da home

Ajustar o posicionamento vertical do bloco hero e das faixas de solução para deixar a primeira tela mais harmônica, com espaços equilibrados entre header, hero, faixas de solução e prova social.

## Objetivos

1. Descer um pouco o bloco do hero (título, subtítulo, proof points e painel animado).
2. Subir um pouco o bloco das faixas de solução, aproximando-o do hero.
3. Manter espaços visualmente similares entre: header → hero, hero → faixas, faixas → prova social.
4. Preservar a regra de que a faixa de logos continua visível sem scroll em desktop.

## Escopo

- `src/components/home-v3/HeroSuite.tsx`
- `src/components/home-v3/SolutionBands.tsx`
- `src/pages/HomeTeste.tsx`
- `src/components/home-v3/ClientProof.tsx` (apenas se necessário para ajustar o espaço final)

Sem alteração de texto, cores, animações, painel de decisões, seção de logos ou rotas. Sem deploy/release.
