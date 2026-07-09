Objetivo
--------
Reformular a seção "Explicabilidade" da página /our-ai para posicionar explicitamente a infinity6 como XAI for Business: Explainable AI orientada a negócio. A mudança substitui o título + subtítulo atuais, adiciona um eyebrow de destaque logo abaixo do título, insere um parágrafo explicativo adicional e aplica o mesmo conteúdo em português e inglês.

Escopo
------
- Apenas a seção `ExplainabilitySection` e seu conteúdo estático (`ourAIContent`).
- Nenhuma alteração de backend, rotas ou outros componentes.

Mudanças propostas
------------------
1. Estrutura de dados
   - Expandir a interface `OurAIContent.explainability` (`src/data/staticData/ourAIContent.ts`) para incluir:
     - `eyebrow: string` — destaque "XAI for Business" / "XAI orientada a negócio".
     - `description: string` — parágrafo de apoio explicando o conceito de XAI.
   - Manter `title` e `lead` existentes, agora com novos textos.

2. Conteúdo em português
   - `title`: "Explicabilidade que vira argumento de venda"
   - `eyebrow`: "XAI orientada a negócio"
   - `lead`: "Aplicamos XAI — Explainable AI — para transformar outputs preditivos em recomendações claras, rastreáveis e acionáveis."
   - `description`: "Mais do que mostrar um score, explicamos os principais sinais que influenciaram cada decisão: comportamento, propensão, estoque, margem, demanda, elasticidade e similaridade. Assim, a IA deixa de ser uma caixa preta e passa a apoiar decisões comerciais, operacionais e estratégicas com contexto, confiança e argumento de negócio."

3. Conteúdo em inglês
   - `title`: "Explainability that becomes a sales argument"
   - `eyebrow`: "XAI for Business"
   - `lead`: "We apply XAI — Explainable AI — to turn predictive outputs into clear, traceable, actionable recommendations."
   - `description`: "More than showing a score, we explain the key signals behind every decision: behavior, propensity, inventory, margin, demand, elasticity and similarity. This way AI stops being a black box and starts supporting commercial, operational and strategic decisions with context, confidence and business rationale."

4. Componente `ExplainabilitySection` (`src/components/our-ai/ExplainabilitySection.tsx`)
   - Renderizar o `eyebrow` como badge/label coral (`text-[#F4845F]`, fundo sutil, tracking wide, uppercase) posicionado logo abaixo do `title` e antes do `lead`.
   - Renderizar o `description` como novo parágrafo abaixo do `lead`, com cor `text-white/60` e `leading-relaxed`.
   - Manter a hierarquia visual: título → eyebrow → lead → description → grid de 3 cards.
   - Ajustar espaçamentos (`gap-3`/`gap-4`) para que o novo bloco de texto não fique compacto demais.

5. Verificação
   - Executar `bun run build` para garantir que os tipos e o build continuem válidos.
   - Verificar visualmente a seção em /our-ai e /pt/our-ai no preview para confirmar legibilidade, contraste e alinhamento do eyebrow.

Critérios de aceitação
----------------------
- [ ] Título, eyebrow, lead e description aparecem corretamente em PT e EN.
- [ ] O eyebrow "XAI for Business" / "XAI orientada a negócio" é visualmente destacado com a cor coral (#F4845F) e fica posicionado abaixo do título.
- [ ] O novo parágrafo de apoio é renderizado abaixo do lead com boa legibilidade.
- [ ] Build passa sem erros.
- [ ] Nenhum outro componente ou seção é afetado.