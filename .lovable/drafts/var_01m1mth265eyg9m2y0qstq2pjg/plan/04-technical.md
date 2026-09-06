## Detalhes técnicos

**Arquivos**
- `src/pages/OurAI.tsx` — reescrito; envolve tudo em `<div className="theme-sand">` e reordena as seções.
- Novos em `src/components/our-ai/`: `IntelligenceHero`, `EnginesTrio`, `BuilderBridge`, `FoundationModel`, `ReasoningSection`, `ProductionResults`, `ScienceHighlights`, `GlossaryCondensed`, `OurAIClosing`.
- Deletados: `OurAIHero`, `EnginesGrid`, `ThesisSection`, `DiversityBalanceSection`, `ExplainabilitySection`, `ChallengesAccordion`, `CommunitySection`, `OurAICTA`, `SegmentArgumentCarousel`. Confirmado: `OurAICTA` não tem import algum no repositório, e `SegmentArgumentCarousel` só é importado por `ExplainabilitySection` (linhas 3 e 65), que também sai.
- `SecuritySection.tsx` — mantido, apenas reestilizado.
- `RealResultsStrip.tsx` e `CTAFinal.tsx` — intocados; a página passa a ter `ProductionResults` e `OurAIClosing` próprios. `ProductionResults` importa `realResults.ts` sem alterá-lo.

**Trilinguismo**
`ContentLang` (`pt | en`) é usado por hooks de Markdown, `seoData`, `realResults` e landings; mudá-lo globalmente exigiria versão `es` de todo conteúdo vindo do i6 HUB. Então `ourAIContent.ts` passa a ser tipado por `Language` (`pt | en | es`), com o bloco `es` escrito por completo, e `OurAI.tsx` consome `language` direto. Os rótulos de `realResults` seguem `pt | en`, com `es` caindo em `pt`, como já ocorre no resto do site.

**Header, SEO e âncoras**
- `/our-ai` entra na lista de rotas de tema claro em `HeaderNovo.tsx`.
- `seoData.ts` (`our-ai`, pt/en/es): título e descrição reescritos para a camada de inteligência, sem menção a i6 Signal.
- JSON-LD: `TechArticle` + três `SoftwareApplication` + `DefinedTermSet` condensado + `Observation` dos resultados. Nenhum `#glossario-i6signal`.

**i6 Signal — nada órfão**
As quatro landings apontam hoje para `/our-ai#i6signal` (`TransformationLanding.tsx:107`). A seção equivalente em `/solutions` existe com conteúdo real, mas **sem `id`**. Duas mudanças mínimas: adicionar `id="i6signal"` à `<section>` de `SignalLayerBlock.tsx` (só o atributo, nenhum estilo ou texto) e trocar o destino do cartão nas landings para `/solutions#i6signal`, mantendo nome, ícone e texto. Fora disso, nada de i6 Signal é tocado: `SinaisSection`, `ComoFuncionamosSection`, `HowItWorks`, `I6SignalDemo`, Kiosk e o FAQ do contato ficam como estão.

**Verificação antes de entregar**
Build e checagem de tipos; em pt/en/es e em 390 e 1440 px, ausência de rolagem horizontal; busca por `i6signal` em `src/pages/OurAI.tsx`, em `src/components/our-ai/` e no JSON-LD retornando vazio; e `/pt/solutions#i6signal` rolando de fato até a seção do i6 Signal. Sem release nem deploy.
