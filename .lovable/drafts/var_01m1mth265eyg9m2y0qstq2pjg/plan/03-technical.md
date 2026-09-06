## Detalhes técnicos

- `src/pages/OurAI.tsx`: reordenar as seções para hero → engines → foundation → reasoning → security → builder → results → science → glossary → closing.
- Ritmo de fundos: `ReasoningSection` e `BuilderBridge` permanecem grafite; `ProductionResults` é convertido para tema areia (cartões `sand-card` / grade com `border-border`, valores em `text-foreground`, rótulo de setor em `text-primary`), evitando duas faixas escuras adjacentes. Nenhuma alteração em `RealResultsStrip.tsx`.
- `IntelligenceHero.tsx`: layers em duas linhas — `md:grid-cols-2` para as duas primeiras e a terceira com `md:col-span-2`, mantendo a moldura única (`gap-px` sobre `bg-border`) para o efeito de conexão; camada atual segue com fundo `bg-accent`.
- `FoundationModel.tsx`: remover o bloco `content.references`; usar `lg:items-stretch` com a lista da esquerda em `flex flex-col` e `justify-between` (ou `h-full` na `<dl>`) para alinhar o rodapé das duas colunas.
- `ourAIContent.ts`: acrescentar o 4º item em `foundation.architecture` (PT/EN/ES) sobre memória externa; remover o campo `references` da interface `OurAIContent['foundation']` e dos três blocos de idioma; adicionar `closing.tertiary` (rótulo) nos três idiomas.
- `OurAIClosing.tsx`: terceiro CTA como `<a href="https://i6decision.ai" target="_blank" rel="noopener noreferrer">` no mesmo padrão de link com seta.
- Verificação final: build, checagem de tipos e ausência de rolagem horizontal em pt/en/es a 390 e 1440px. Sem release nem deploy.
