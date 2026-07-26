## Ajuste: dividir Prioridade alta entre canais

Somado à correção do bug anterior (tiers refletirem canais escolhidos), a **Prioridade alta** passa a poder ser distribuída em mais de um canal.

**`src/data/kiosk/demos/propensityCampaign.ts`**
- Manter a lista ordenada `priority` (bestChannel primeiro se selecionado, depois demais na ordem em que o usuário marcou).
- Novo tipo:
  ```ts
  interface AudienceTierSplit {
    channel: ChannelId;
    clients: number;
  }
  interface AudienceTier {
    tier: 'Prioridade alta' | 'Prioridade média' | 'Oportunidade futura';
    clients: number;             // total do tier
    propensityPct: number;
    channels: AudienceTierSplit[]; // 1..N canais
  }
  ```
- Regra de split da Prioridade alta:
  - Usa até 2 canais do topo de `priority` (limita a 2 para não pulverizar demais mesmo com 4–5 selecionados).
  - Se só 1 canal disponível → um único split com 100%.
  - Se 2+ canais → divide 60/40 (ordem = `priority`).
- Prioridade média e Oportunidade futura continuam com 1 canal cada (`priority[1]` e `priority[2]`, com fallback cíclico).
- `primaryChannel` no resultado = `priority[0]` (canal prioritário do card KPI).
- `drill.channel` = `priority[0]`.

**`src/components/kiosk/demos/PropensityCampaignDemo.tsx`**
- Renderizar a tabela de audiência priorizada aceitando 1..N linhas por tier:
  - Primeira linha do tier mostra o rótulo (Prioridade alta) e o dot colorido.
  - Linhas adicionais do mesmo tier ficam recuadas, sem repetir o rótulo, mostrando canal + split de clientes; propensão exibida só na primeira linha (ou repetida — decidir na implementação para manter a leitura limpa).
  - Colunas mantidas: Faixa · Clientes · Propensão · Canal recomendado.
- Nada muda nos cards de KPI, insight, drill, latência ou pipeline.

**Fora de escopo**
- Não mexer em outros demos, tracking, quiz ou textos globais.
