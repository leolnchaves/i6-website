## Reestruturação do Header: novo menu "i6 Research"

### Mudanças no menu (desktop + mobile) — `src/components/hometeste/HeaderNovo.tsx`

Estrutura final da barra superior:

```text
Home | Soluções | Proprietary AI | Success Stories | i6 Research ▾ | Contato
```

- **Soluções**: vira link simples apontando para `/solutions` (sem dropdown).
- **Proprietary AI**: novo item no topo, aponta para `/our-ai`.
- **i6 Research**: novo dropdown (substitui o antigo dropdown de Soluções e absorve o antigo link de Insights + i6 Intelligence + as 4 landings).

Conteúdo do dropdown **i6 Research**:

| Rótulo | Destino | Observação |
|---|---|---|
| i6 Research | `/i6-intelligence` | mesma rota atual |
| i6 na Mídia | `/insights` | só renomeia o rótulo |
| i6 Blog | `#` | placeholder "Em breve" (badge/desabilitado, sem navegar) |
| Demanda & Supply | `/solutions/demand-supply-efficiency` | movida de Soluções |
| Monetização de Dados | `/solutions/data-monetization` | movida de Soluções |
| Operações Preditivas | `/solutions/predictive-operations` | movida de Soluções |
| Comportamento & Conversão | `/solutions/behavior-conversion` | movida de Soluções |

> Pricing Dynamics já não estava no menu antigo — mantenho fora, coerente com o estado atual. Se quiser incluir depois, é só me avisar.

### Traduções — `src/data/translations/pt.ts` e `en.ts`

- Adicionar chaves novas:
  - `header.research` → "i6 Research"
  - `header.research.hub` → "i6 Research" / "i6 Research"
  - `header.research.media` → "i6 na Mídia" / "i6 in the Media"
  - `header.research.blog` → "i6 Blog" / "i6 Blog"
  - `header.research.comingSoon` → "Em breve" / "Coming soon"
  - `header.proprietaryAi` → "Proprietary AI" (both)
- Manter (agora usadas dentro do novo dropdown): `header.solutions.demandSupply`, `dataMonetization`, `predictiveOps`, `behaviorConversion`.
- Chaves obsoletas: `header.solutions.aiSolutions` e `header.solutions.proprietaryAi` continuam definidas (não removo para não quebrar caches); ficam sem uso.
- `header.insights` permanece existindo, mas o item deixa de ser renderizado como link solto no header (a página `/insights` e demais usos continuam).

### Comportamento do dropdown

- Reutiliza a mesma lógica do dropdown atual (state `researchOpen`, click-outside, fecha em troca de rota, `w-max` + `whitespace-nowrap`).
- Item "i6 Blog" renderizado como `<span>` (não `Link`) com opacidade reduzida + micro-badge "Em breve" à direita; não é clicável, não fecha o menu ao clicar.
- Versão mobile: mesma reestruturação — seção "i6 Research" com sub-lista, item Blog desabilitado com o mesmo badge.

### Fora de escopo (confirmado nas respostas)

- Sem renomear rotas — só rótulos.
- Sem criar página nova para o Blog.
- Sem tocar em conteúdo/SEO das landings, Insights ou Intelligence.
- Sem mexer no Footer nesta rodada (posso fazer em seguida se quiser espelhar a nova taxonomia).

### Validação

- Abrir preview em `/pt` e `/en`, expandir o novo dropdown, checar que:
  - todos os itens ativos navegam para o destino correto,
  - "i6 Blog" mostra "Em breve" e não navega,
  - dropdown fecha ao clicar fora e ao trocar de rota,
  - versão mobile abre/fecha e todos os links funcionam.
