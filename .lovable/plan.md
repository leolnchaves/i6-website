# Reorganização da página /our-ai

## 1. Nova ordem de seções (`src/pages/OurAI.tsx`)

Sequência atual:
```
Hero → Thesis(3 pilares + Foundation card) → Engines → RealResults → DualValue → LearnInfluence → Diversity → Explainability → Security → Challenges → Community → Glossary → CTA
```

Sequência alvo (agrupando tudo de "motor" numa macro-área contínua):
```
Hero
ThesisPillars (somente os 3 pilares)
EnginesGrid + Foundation card + Diversity + Explainability  ← mesma macro-área visual
RealResultsStrip
UnifiedImpactSection (DualValue + LearnInfluence fundidos)
Security
Challenges
Community
Glossary
CTA
```

## 2. Mudanças por componente

**`ThesisSection.tsx`** — remover o bloco "Foundation model card" (linhas 33-85). Mantém só o título + os 3 pilares. Reduzir `py-20 md:py-28` → `py-12 md:py-16`.

**`EnginesGrid.tsx`** — após o bloco de diferenciadores, anexar dentro da mesma `<section>`:
- O Foundation model card (movido do ThesisSection, mesmo markup e conteúdo `content.foundation`)
- O conteúdo de `DiversityBalanceSection` (inline no mesmo container, sem nova `<section>`)
- O conteúdo de `ExplainabilitySection` (inline no mesmo container)

Para evitar inchar um único arquivo, criar 3 subcomponentes de apresentação puros dentro de `src/components/our-ai/engines/`:
- `FoundationCard.tsx` (extraído do ThesisSection)
- `DiversityBlock.tsx` (extraído do DiversityBalanceSection, sem o wrapper `<section>` e sem padding vertical próprio)
- `ExplainabilityBlock.tsx` (extraído do ExplainabilitySection, idem)

`EnginesGrid` passa a aceitar também `foundation`, `diversity`, `explainability` por props e renderiza-os com separadores `mt-16 pt-12 border-t border-white/5` em vez de seções separadas.

Remover `<DiversityBalanceSection>` e `<ExplainabilitySection>` do `OurAI.tsx` (componentes ficam, mas não são mais usados — podem ser deletados depois).

**Novo `UnifiedImpactSection.tsx`** — funde `DualValueSection` + `LearnInfluenceFlow` em uma narrativa única, sem repetir "IA aprende / Influência vende" (que já é o ponto das duas colunas).

Estrutura:
```
<section> (py-14 md:py-20, bg #0B1224)
  H2: content.dualValue.title  ("O impacto não vem de prever…")
  Grid 2 cols: as duas colunas 01/02 do DualValue (clareza/números)
  Divider sutil (mt-14 pt-10 border-t border-white/5)
  Subtítulo pequeno (eyebrow laranja): "Do comportamento ao resultado" / "From behavior to outcome"
  Flow horizontal de 3 steps (Fine tuning → Necessidade específica → Resultado) do LearnInfluence
  Chips de atributos (Relevância, Oportunidade, …)
</section>
```
Remove a frase-conclusão redundante "Fine tuning a partir do comportamento isolado…" — substituída pelo subtítulo curto acima.

Adicionar campo opcional `bridge` em `ourAIContent` (pt/en) para o eyebrow ("Do comportamento ao resultado" / "From behavior to outcome").

**`GlossarySection.tsx`** —
- Trocar eyebrow `"GEO · Glossary"` por `"Glossary"` (en) / `"Glossário"` (pt) usando `content.eyebrow` novo (ou hardcode condicional simples já que é a única label).
- Remover o `<h2>{content.title}</h2>` (linha 15).
- Remover o `<p>{content.lead}</p>` (linhas 16-18) — usuário pediu "deixando apenas o texto laranja menor".
- Reduzir `py-20 md:py-24` → `py-12 md:py-16`.

Em `ourAIContent.ts`: trocar `glossary.title` pt → `"Glossário"` e en → `"Glossary"` (mantém o campo só para o JSON-LD `DefinedTermSet.name` que continua usando `content.glossary.title`).

## 3. Redução de espaços verticais

Padronizar padding das seções de `/our-ai` de `py-20 md:py-28` para `py-14 md:py-20` em:
- `ThesisSection`, `EnginesGrid`, `UnifiedImpactSection`, `SecuritySection`, `ChallengesAccordion`, `CommunitySection`, `GlossarySection`, `OurAICTA`.

Reduzir também `mb-14` dos headers de seção para `mb-10`.

## 4. Verificação

Build automático + abrir `/pt/our-ai` e `/en/our-ai` no preview para validar fluxo visual contínuo, ausência de duplicidade e rótulos do glossary.
