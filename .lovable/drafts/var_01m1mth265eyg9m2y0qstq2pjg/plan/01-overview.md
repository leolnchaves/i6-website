# Ajuste de CTA no DecisionSuiteSection

## Objetivo
Alterar o texto do CTA externo da i6 Decision Suite na home para **"Conhecer a i6 Decision Suite"** (PT), mantendo a seta de link externo (`ArrowUpRight`). Atualizar também as versões EN e ES para manter coerência trilíngue.

## Arquivo
- `src/components/home-v3/product/DecisionSuiteSection.tsx` — objeto `ctaCopyByLang` (linhas ~9–13).

## Mudanças
- `pt.suiteCta`: `Contratar a i6 Decision Suite` → `Conhecer a i6 Decision Suite`
- `en.suiteCta`: `Get the i6 Decision Suite` → `Discover the i6 Decision Suite`
- `es.suiteCta`: `Contratar la i6 Decision Suite` → `Conocer la i6 Decision Suite`

Nenhuma mudança no template, no link externo, no ícone de seta, no layout ou em outros componentes.

## Validação
- `bunx tsgo --noEmit` (typecheck)
- `bun run build`
- Visual check do CTA em PT/EN/ES na home.

## Sem deploy/release
Esta alteração é um micro-ajuste de texto e não dispara release/deploy.
