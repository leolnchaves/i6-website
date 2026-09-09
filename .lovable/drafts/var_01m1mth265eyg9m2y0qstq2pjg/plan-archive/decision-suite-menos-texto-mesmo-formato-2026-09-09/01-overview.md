# Decision Suite: menos texto, mesmo formato

## Diagnóstico

A seção atual cabe em uma única tela, mas está visualmente saturada: três pilares com descrições longas, seis itens de produto com claims, painel com headline + corpo + dor + 6 capabilities + fluxo + 2 CTAs. O olho não encontra descanso e os elementos competem entre si.

## Direção

Manter a arquitetura aprovada — logo, título, descrição, pilares em faixa, explorador split, painel com fluxo e CTAs — mas reduzir a carga textual e os espaçamentos internos. A ideia é que cada bloco tenha uma única mensagem dominante e mais respiro visual.

## O que muda

1. **Título e descrição**: mantidos, sem destaque colorido, mas com margem menor abaixo.
2. **Pilares**: mantidos em 3 cartões arredondados, porém cada um vira **título + uma única linha de descrição** (máximo 90 caracteres), sem corpo de parágrafo.
3. **Produtos**: mantidos os 6 itens, mas o **claim vira uma linha curta** (máximo ~50 caracteres) e o nome do produto pode ficar em destaque sutil.
4. **Painel ativo**:
   - Remove o **corpo explicativo longo** e o bloco de **dor/pain**.
   - Mantém apenas: eyebrow do produto, **headline** em uma linha, **até 4 capabilities** (em vez de 6) em 2 colunas.
   - Fluxo Entrada → Decisão → Valor mantido, mas com rótulos menores e valores em uma linha.
5. **CTAs**: mantidos os dois botões, mas com padding reduzido.
6. **Espaçamento geral**: paddings e gaps reduzidos em ~20-25%, mantendo cantos arredondados e o tema sand.

## O que não muda

- Âncora `#decision-suite`.
- Trilinguismo PT/EN/ES.
- Animação de troca de produto (`key={active.id}` e `motion-safe:animate-sand-rise`).
- Destino dos CTAs: i6 Decision Suite externo e contato localizado.
- Cores, fontes, sombras e identidade visual.
- Apenas `DecisionSuiteSection.tsx` é alterado; nenhum hook, sync ou conteúdo externo muda.

## Resultado esperado

A seção continua sendo uma única unidade visual, mas com mais ar ao redor de cada bloco e hierarquia mais nítida: título → 3 pilares resumidos → escolha do produto → benefício em destaque → fluxo → ação.
