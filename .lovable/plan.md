## Problema

Em `TransformationLanding.tsx`, o componente `SolutionEngines` renderiza todos os itens de `related_engines` (incluindo `i6signal`) sob o eyebrow "Motores aplicados / Applied engines" com o CTA "Ver o motor → / See the engine →". Isso classifica incorretamente o i6Signal como motor — quando ele é a **camada conversacional preditiva** que ativa a saída dos motores (i6 Previsio / i6 RecSys / i6 ElasticPrice). O texto Markdown das landings (PT/EN) também usa "três motores" / "three engines" em frases que já incluem o i6Signal.

## Mudanças

### 1. `src/pages/TransformationLanding.tsx` — componente `SolutionEngines`

- Separar i6signal dos demais ids ao montar a lista.
- Renderizar os motores (i6previsio, i6recsys, i6elasticprice) como hoje, sob "Motores aplicados".
- Renderizar o i6signal em um card distinto (abaixo do grid de motores), com:
  - Rótulo de categoria: "Interface preditiva conversacional" (PT) / "Conversational predictive interface" (EN)
  - CTA: "Conhecer o i6 Signal →" (PT) / "Discover i6 Signal →" (EN)
  - Visual ligeiramente diferenciado (borda/acento) para reforçar que é camada de ativação, não motor.
- Atualizar `ApplicationFlow` está OK (já trata "Ativação i6 Signal" como etapa final separada — não é classificado como motor lá).

Nenhuma mudança em `ENGINE_META` além de manter `i6signal` (continua usado para ícone + nome + anchor).

### 2. Conteúdo Markdown das 4 landings (PT + EN = 8 arquivos)

Pequenos ajustes textuais onde o i6Signal aparece descrito como motor:

- `demand-supply-efficiency-pt.md` linha 34: `"A infinity6 conecta três motores em um único ciclo prescritivo:"` → `"A infinity6 conecta dois motores preditivos e a camada conversacional do i6 Signal em um único ciclo prescritivo:"`
- `demand-supply-efficiency-en.md` linha equivalente: `"infinity6 connects three engines in a single prescriptive cycle:"` → `"infinity6 connects two predictive engines and the i6 Signal conversational layer in a single prescriptive cycle:"`
- Demais landings (`behavior-conversion`, `data-monetization`, `predictive-operations`): a frase introdutória da seção Solução não chama o i6Signal de motor explicitamente, mas vou revisar e ajustar qualquer linha que use "motor"/"engine" referindo-se ao i6Signal (ex.: `data-monetization-pt.md` linha 59 "o engine trabalha com identificadores hash" — esse se refere genericamente aos motores que processam dados, OK manter; conferir contexto antes de editar).

A lista bullet `- **i6 Signal** — entrega ...` permanece igual em todas (descreve a função, sem chamar de motor).

### 3. Sem mudanças

- `related_engines` no frontmatter: mantém `i6signal` (é usado para gerar os cards + agora o card destacado).
- `ENGINE_META` em `TransformationLanding.tsx`: mantém entrada `i6signal`.
- `ApplicationFlow`: já trata "Ativação i6 Signal" como passo final separado dos motores preditivos.
- `/our-ai`: fora do escopo deste pedido (só landings). Posso ajustar em uma segunda rodada se desejado.

## Detalhe técnico — refactor de `SolutionEngines`

```text
const engineIds = csv(piece.related_engines);
const predictiveIds = engineIds.filter(id => id !== 'i6signal');
const hasSignal = engineIds.includes('i6signal');

// 1) Grid dos motores preditivos (como hoje, sem i6signal)
// 2) Se hasSignal: card destacado com label "Interface preditiva conversacional"
//    + CTA "Conhecer o i6 Signal →" apontando para /our-ai#i6signal
```

Resultado: nas 4 landings, o i6Signal aparece visualmente como camada de ativação separada dos motores, alinhando com o posicionamento de "interface preditiva conversacional".
