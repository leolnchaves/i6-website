# Decision Suite em uma tela, sem scroll

Direção aprovada: "Executive decision suite" — a seção inteira cabe em ~900px de altura sem rolagem, com hierarquia limpa: título sozinho na abertura, pilares subordinados, produtos com descrição e painel enxuto.

## O que muda

1. **Abertura limpa e larga**: logo, título "Uma plataforma de decisão, não um conjunto de dashboards" e descrição ocupam o topo sozinhos — nada disputa espaço com o título.
2. **Os três pilares viram uma faixa fina subordinada** entre a abertura e o explorador: linha divisória acima e abaixo, três itens numerados (01/02/03) com marcador terracota, texto curto em caixa alta discreta.
3. **Cada produto da lista ganha uma linha de descrição** abaixo do nome (uma linha só, truncada se necessário), tornando Discovery, Forecasting etc. autoexplicativos.
4. **Painel mais compacto**: headline e corpo à esquerda com a dor em cartão lateral à direita; capacidades como lista de marcadores; fluxo Entrada → Decisão → Valor em linha única com setas, na base do painel.
5. **CTAs centralizados na base da seção** ("Conhecer a i6 Decision Suite" externo com seta + "Falar com especialista"), fechando a tela.

## O que não muda

- Nenhum texto removido; os seis produtos, o fluxo e os dois CTAs com seus destinos (`SUITE_URL` externo, `/contact`) permanecem.
- Âncora `#decision-suite`, trilinguismo, animação de troca de produto e tokens de tema (sem cores fixas).
- Somente `DecisionSuiteSection.tsx` é alterado; `suiteContent.ts` e `HomeTeste.tsx` intactos.
