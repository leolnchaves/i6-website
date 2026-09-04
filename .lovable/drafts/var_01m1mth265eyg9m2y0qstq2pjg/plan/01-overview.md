# Faixa vertical no painel direito da seção de Famílias

Adicionar, no painel de detalhes à direita da seção **Famílias de modelagem** (`/i6-builders`), uma faixa vertical idêntica à que já existe nos itens da lista à esquerda. A faixa deve ficar na borda esquerda do painel, do lado oposto ao círculo que marca a chegada da linha horizontal, criando uma simetria visual: faixa vertical → linha horizontal com círculo → faixa vertical no painel.

## Escopo
- Apenas `src/components/i6-builders/BuilderModels.tsx`.
- Sem mudança de texto, rota, SEO, formulário ou envio de leads.
- Preservar animação de entrada do painel, `prefers-reduced-motion` e acessibilidade ARIA.

## Resultado esperado
- Item ativo à esquerda: faixa vertical terracota.
- Linha horizontal: sai da faixa esquerda e termina com um círculo junto à faixa direita.
- Painel à direita: faixa vertical terracota na borda esquerda, recebendo a linha no centro da faixa.
