

# Redesign do I6SignalDemo para Fidelidade ao Design Real

## Problema

O componente atual usa um tema totalmente escuro (dark theme) para todas as areas. O design real do i6Signal tem:
- **Header** com gradiente azul/navy escuro
- **Sidebar** com fundo CLARO (branco/cinza claro)
- **Barra de favoritos** (coluna estreita com icones + coracoes laranja)
- **Area de chat** com fundo BRANCO
- **Input** arredondado (rounded-full) com botao Send circular laranja

## Mudancas Visuais Detalhadas

### 1. Header do Intelliboard (NOVO - dentro do demo container)
- Fundo: gradiente diagonal `linear-gradient(135deg, #0F1F36, #1E4A94, #0F1F36)`
- Esquerda: Logo "i6" + "Intelliboard" em branco bold
- Direita: "GRUPO ALPHATEK S.A." em laranja (text-xs uppercase), "Ricardo Mendes" em branco, email em branco/70, avatar circular com anel branco
- Borda inferior sutil `border-white/10`

### 2. Sidebar (tema CLARO)
- Fundo: `bg-white` ou `bg-gray-50` (NAO escuro)
- Topo: Dropdown "ANGULO" com subtitulo "Forecast", borda esquerda laranja
- Menu items em texto escuro (`text-gray-700`):
  - Home, Ingestion Tokens, Recsys Tokens, Data Ingestion, **i6 Signal** (ativo: texto coral, fundo azul/coral claro, borda esquerda coral), Widgets
- Footer: Billing Analytics, Analytics, icone Settings, botao collapse `<`
- Icones Lucide correspondentes

### 3. Barra de Favoritos (coluna estreita ~40px)
- Fundo: `bg-white/95` com `backdrop-blur-sm`, borda direita cinza
- 7 icones wizard no topo (rounded-full, cinza, hover laranja)
- Separador horizontal
- 5 coracoes laranja (`Heart` fill) abaixo do separador
- Apenas visual/estatico

### 4. Area de Chat (tema CLARO)
- Fundo: `bg-white`
- Estado vazio/placeholder: "Qual insight preditivo vamos descobrir hoje?" em `text-gray-400` centralizado
- Mensagem do usuario: alinhada a direita, fundo gradiente laranja/azul muito sutil (6-8% opacidade), `rounded-2xl`, borda `border-gray-200/50`
- Resposta do assistente: sem moldura escura, textos em cinza escuro (`text-gray-800`, `text-gray-600`), titulos em negrito escuro, coral para destaques
- Tabela e grafico adaptados para tema claro (bordas cinza, texto escuro)

### 5. Input (bottom)
- Fundo: `bg-white/95` com `border-t border-gray-200/50`
- Input: `rounded-full h-12`, borda cinza, focus ring laranja
- Botao Send: circular `rounded-full h-12 w-12`, gradiente laranja `from-orange-500 to-orange-600`, shadow
- Botoes adicionais visuais: BookOpen e RotateCcw (ghost, rounded-full)

### 6. Tabs de cenario
- Mover para area de "Suggested Questions" com fundo `bg-gradient-to-br from-orange-50/80 to-amber-50/80`
- Ou manter como tabs mas com estilo claro (botao ativo laranja, inativos cinza claro)

## Detalhes Tecnicos

### Arquivo modificado
| Acao | Arquivo |
|------|---------|
| Reescrever | `src/components/solutions/I6SignalDemo.tsx` |

### Mudancas estruturais no JSX

**Layout atual:**
```text
[Demo Container (escuro)]
  [Sidebar escura] [Chat escuro]
```

**Layout novo:**
```text
[Demo Container]
  [Header gradiente azul (logo + user)]
  [Sidebar clara | Barra favoritos | Chat branco]
  [Input bar]
```

### Sub-componentes afetados

- **SupplyTable**: Adaptar para tema claro (bordas `border-gray-200`, texto `text-gray-800`, cores de prioridade mantidas)
- **ForecastChart**: Adaptar cores de grid e eixos para cinza (nao branco transparente)
- **PricingMetrics**: Cards com `bg-gray-50`, bordas `border-gray-200`
- **ComercialRanking**: Cards claros
- **MixComparison**: Tabela clara

### Responsividade
- Mobile: Sidebar e barra de favoritos ocultas (`hidden md:flex`)
- Header do Intelliboard visivel em todas as telas
- Chat e input ocupam toda a largura no mobile

### O que NAO muda
- Logica de animacao (typing, phases, auto-scroll)
- Conteudo bilingue (todo o objeto `content` permanece identico)
- Tabs de cenario (funcionalidade)
- Estrutura de resposta (titulo, analise, visualizacao, acoes, perguntas)

### Dependencias
- Nenhuma nova dependencia
- Icones adicionais do Lucide: `Heart`, `BookOpen`, `RotateCcw`, `Target`, `BarChart3`, `Upload`, `Settings`, `ChevronDown`, `User`, `LogOut`

