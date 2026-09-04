# Faixa vertical no painel direito da seção de Famílias

Adicionar, no painel de detalhes à direita da seção **Famílias de modelagem** (`/i6-builders`), uma faixa vertical idêntica à que já existe nos itens da lista à esquerda. A faixa deve ficar colada à linha horizontal que conecta o item ativo ao painel, reforçando visualmente a relação entre o item selecionado e o conteúdo exibido.

## Escopo
- Apenas `src/components/i6-builders/BuilderModels.tsx`.
- Sem mudança de texto, rota, SEO, formulário ou envio de leads.
- Preservar animação de entrada do painel, `prefers-reduced-motion` e acessibilidade ARIA.

## Resultado esperado
- Item ativo à esquerda: faixa vertical terracota.
- Linha horizontal: conecta o item ao painel.
- Painel à direita: faixa vertical terracota na borda esquerda, alinhada ao centro da linha, dando continuidade visual.
