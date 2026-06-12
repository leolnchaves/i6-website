## 1. Remover lead da hero

Em `src/components/our-ai/OurAIHero.tsx`, remover o parágrafo que renderiza `content.lead` (linhas 42-44). Hero passa a exibir apenas eyebrow + título + subtítulo ("IA aplicada é um organismo que se constrói, se alimenta e se adapta").

## 2. Reordenar seções em `src/pages/OurAI.tsx`

Nova ordem:

```
OurAIHero
EnginesGrid                  — "Quatro motores. Uma camada conversacional."
DiversityBalanceSection      — Balanceamento de diversidade
ExplainabilitySection        — Explicabilidade que vira argumento de venda
ThesisSection                — IA só precisa saber o que muda o jogo
UnifiedImpactSection         — O impacto não vem só de prever... (+ learnInfluence)
SecuritySection              — Segurança e conformidade por design
ChallengesAccordion          — Por que a IA falha e como resolvemos
CommunitySection             — Comunidade infinity6
ResearchSection              — Base científica dos motores i6
RealResultsStrip             — Resultados reais em produção
GlossarySection              — Glossário
OurAICTA                     — CTA final
```

`UnifiedImpactSection` mantém `learnInfluence` ("IA aprende. Influência vende.") junto com `dualValue`, já que a lista do usuário não pediu para removê-lo.