## Reestruturar grid de motores como "fundação + camada"

Em `src/components/our-ai/EnginesGrid.tsx`, separar os 4 items em dois grupos visuais:

**Camada de cima — i6Signal (full-width):**
- Card único ocupando toda a largura, com o mesmo border-radius/borda dos demais.
- Borda mais marcada (`border-[#F4845F]/40`) e fundo levemente diferenciado (`bg-gradient-to-r from-[#F4845F]/[0.04] via-white/[0.02] to-[#F4845F]/[0.04]`).
- Chip discreto acima do título: `CAMADA CONVERSACIONAL` (laranja, mesma tipografia dos taglines).

**Conector visual:**
- Faixa fina entre as duas camadas: três linhas verticais (uma para cada motor) descendo do card do Signal até o topo dos cards da base, indicando que o Signal lê os 3 motores. Altura ~24px, opacidade baixa (`bg-[#F4845F]/30`), sem texto.

**Base — RecSys, Previsio, ElasticPrice (3 colunas):**
- Grid `md:grid-cols-3` (em mobile fica `grid-cols-1`).
- Eyebrow centralizado acima da base: `MOTORES PREDITIVOS` em uppercase/tracking, cor `text-white/40`.

### Lógica
Filtrar `content.items` em dois arrays:
- `signal = items.find(i => i.id === 'i6signal')`
- `engines = items.filter(i => i.id !== 'i6signal')`

Renderizar Signal primeiro (full-width), conector, depois grid de 3 engines. Manter o resto da seção (Foundation card, Differentiators) intacto. Sem mudança de copy nem em outros arquivos.

### Verificação
Preview `/pt/our-ai` e `/en/our-ai`: Signal no topo destacado, 3 motores em fila abaixo com conector visual sugerindo "camada sobre fundação". Build automático.