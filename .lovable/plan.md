## Mudanças em `/our-ai`

### 1. Reordenar seção

Em `src/pages/OurAI.tsx`, mover `<UnifiedImpactSection>` para logo abaixo de `<ThesisSection>` (que tem o título "IA só precisa saber o que muda o jogo").

Nova ordem:
```
Hero → Thesis → UnifiedImpact → EnginesGrid → Diversity → Explainability → RealResults → Security → Challenges → Community → Glossary → CTA
```

### 2. Remover os traços dos bullets

Em `src/components/our-ai/UnifiedImpactSection.tsx`, dentro do `<ul>` de `dualValue.columns`, remover o `<span>` que renderiza o tracinho laranja (`w-3 h-px bg-current`). Os itens ficam como texto puro, mantendo o `space-y-3` e a cor `text-white/60`. Remover também o `flex gap-3` do `<li>` (não há mais marcador) — fica só o texto.

Nenhuma outra alteração. Sem mudança de conteúdo, copy ou outras seções.