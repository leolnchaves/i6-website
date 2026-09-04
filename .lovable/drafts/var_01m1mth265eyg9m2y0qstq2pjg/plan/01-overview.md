# Destaque tipográfico do "i6" no i6 Builder Summit

O título do evento de destaque na seção `/community` — "i6 Builder Summit" — será quebrado em duas partes: o prefixo "i6" ganha peso tipográfico extra (fonte mais grossa e levemente maior), enquanto "Builder Summit" mantém o estilo atual (cor terracota, glow sutil e peso extrabold).

A mudança afeta apenas o item destacado da lista de eventos, em todos os idiomas (PT/EN/ES). Os demais eventos permanecem inalterados.

## O que será alterado

1. **Dados**: adicionar um campo opcional `brandPrefix` ao item de destaque em `src/data/comunidade/content.ts`, com o valor `"i6"` para PT, EN e ES.
2. **Componente**: em `src/components/comunidade/CommunityEvents.tsx`, quando `brandPrefix` existir, renderizar o prefixo dentro de um `<span>` com `font-black` e escala ligeiramente maior (`text-[1.08em]`), mantendo o restante do título no estilo atual.
3. **Verificação**: typecheck, build e conferência visual em PT, EN e ES.

## Escopo

- Apenas a seção de eventos da página `/community`.
- Nenhuma alteração de layout, cor, glow ou posicionamento dos demais elementos.
