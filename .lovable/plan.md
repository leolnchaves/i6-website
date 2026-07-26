
## Problema

No demo `Personalização + Descoberta` do `/kiosk`, o painel "POR QUE ESTES ITENS" usa **um único template por cenário** (`scenarios[mode-vertical].argument`) com apenas `{name}` substituído. Resultado: no anônimo (e nos demais), o texto é praticamente idêntico independente do produto clicado — não passa a sensação de raciocínio contextual do modelo.

Arquivo: `src/data/kiosk/demos/predictivePersonalization.ts` (linhas 241, 275, 304, 333).

## Objetivo

Fazer o argumento variar de forma perceptível conforme:
- **Produto clicado** (categoria e traços do SKU)
- **Categorias das recomendações** geradas
- **Cenário** (logado × anônimo / produtos × fashion) — mantendo o vocabulário técnico de cada um (histórico/afinidade vs. cold start/embeddings).

## Abordagem: argumento composto por partes

Em vez de trocar um template único por N templates por SKU (verboso), o argumento passa a ser montado por 3 blocos concatenados, todos com PT/EN:

```text
[intro do cenário]  +  [leitura do produto âncora]  +  [justificativa das recs]
```

Exemplo — `anon-products`, clicando em Fone Bluetooth Pro:
> Sem histórico, o modelo lê sinais desta sessão (device, hora, canal) e ancora em **Áudio**. Clusters similares nesta hora convertem em Acessórios + Áudio complementar — daí Case, Cabo, Earbuds e Speaker no topo do ranking (i6RecSys · k=32).

Exemplo — mesmo cenário, clicando em Monitor UltraWide:
> Sem histórico, o modelo lê sinais desta sessão e ancora em **Vídeo**. Sessões parecidas nesta hora migram para Periféricos + Acessórios de alto ticket — por isso Teclado, Mouse, Cabo e Speaker (i6RecSys · k=32).

### Peças de conteúdo a criar

1. **`scenarioIntro`** — 1 frase por cenário (4 no total), independe do SKU. Cita a mecânica do modelo:
   - `logged-products`: 30d de histórico + afinidade categórica
   - `logged-fashion`: 30d de histórico + estilo urban-minimal
   - `anon-products`: cold start + embeddings de sessão
   - `anon-fashion`: cold start + estilo inferido + clima/geo

2. **`categoryReading`** — leitura curta por **categoria** do produto clicado (não por SKU, o que reduz o volume de copy e cobre todos os SKUs). Uma frase que descreve o que essa categoria significa para o cenário:
   - Products: `Áudio`, `Periféricos`, `Vídeo`, `Acessórios` × logado/anônimo
   - Fashion: `Tops`, `Bottoms`, `Outerwear`, `Calçados`, `Acessórios` × logado/anônimo

3. **`recsRationale`** — frase de fechamento que **cita as categorias efetivamente recomendadas** para o produto clicado (derivado de `sku.recIds` → `category`). Ex.: "topo do ranking traz Acessórios + Áudio complementar". Isso muda com o SKU mesmo dentro da mesma categoria, porque os `recIds` diferem.

4. **Métricas dinâmicas por SKU** (leves) — pequenas variações determinísticas por `sku.id` (ex.: `k=32 → k=28/36`, `3.2× → 2.8×/3.5×`) para que a impressão numérica também mude. Sem aleatoriedade em runtime — seed pelo id.

### Contrato de tipos (esboço)

```ts
type CategoryKey = 'audio' | 'peripherals' | 'video' | 'accessories'
                 | 'tops' | 'bottoms' | 'outerwear' | 'footwear' | 'fashion-accessories';

interface ScenarioContent {
  objective: { pt; en };
  features: Feature[];
  scenarioIntro: { pt; en };
  categoryReading: Partial<Record<CategoryKey, { pt; en }>>;
  recsRationale: { pt; en }; // template com {cats} e {name}
}

// Cada Sku ganha:
interface Sku { /* ... */ categoryKey: CategoryKey; }
```

E o componente monta o argumento assim (sem mudar layout):
```ts
const argument = [intro, catReading, recsRationale({name, cats})].join(' ');
```

## Mudanças necessárias

1. `src/data/kiosk/demos/predictivePersonalization.ts`
   - Adicionar `categoryKey` em cada SKU (products + fashion).
   - Substituir `argument` único por `scenarioIntro`, `categoryReading` (por categoria), `recsRationale` (template) — em cada um dos 4 cenários, PT e EN.
   - Exportar helper `buildArgument(scenario, sku, recs, lang)` que faz a composição e substitui `{name}` e `{cats}`, aplicando também as variações de métrica derivadas do id.

2. `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`
   - Trocar o uso de `scenario.argument.[lang].replace('{name}', ...)` (linha ~490 aprox.) por `buildArgument(...)`.
   - Nenhuma alteração de layout, animação ou linha conectora.

3. Nada muda em: fluxo de fases (pick → list → training → pdp), latências, look fashion, i18n de labels, tracking.

## Fora do escopo

- Não altero visuais, cores, fontes ou o SVG conector.
- Não adiciono LLM em runtime — copy é estática/derivada.
- Não crio argumento por-SKU individual (categoria já cobre com bom custo/benefício).

## Validação

Após a implementação, com o site em PT e EN, testar as 4 combinações (logado/anon × products/fashion) clicando em pelo menos 2 SKUs de categorias diferentes cada. Cada clique deve produzir um insight visivelmente distinto no bloco "POR QUE ESTES ITENS".
