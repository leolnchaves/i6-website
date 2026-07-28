## Objetivo

No /kiosk hoje existem 3 estilos diferentes de botão de ação: sólido coral (`bg-[#F4845F]`), "outline fantasma" coral (`border-[#F4845F]/60 bg-[#F4845F]/[0.08]`) e "outline neutro" branco (`border-white/25 bg-white/[0.04]`). Isso faz o botão "Conversar com a camada preditiva de comportamento" (rodapé do modal de simulação) e os botões de voltar/refazer após o cálculo parecerem apagados frente aos demais.

A proposta é ter **um único estilo primário laranja sólido** para todos os botões de ação do kiosk.

## Novo padrão

Criar um helper de classes em `src/components/kiosk/ui/kioskButtonClass.ts` com duas variantes:

- `primary` — `bg-[#F4845F] text-white font-bold hover:bg-[#F4845F]/90 active:scale-[0.99] shadow-[0_0_30px_rgba(244,132,95,0.35)]`, cantos arredondados (pill/2xl conforme o slot) e alvo de toque mínimo.
- `disabled` — `bg-white/10 text-white/40` (mantém o comportamento atual do botão "Continuar" do quiz).

Tamanho (altura, padding, fonte) continua sendo passado por cada chamada, já que as demos usam escala menor (`vmin`) que as telas cheias — só a **cor/fundo/peso** é unificada.

## Botões que passam a usar o padrão laranja sólido

| Arquivo | Botão |
|---|---|
| `SimulationLauncher.tsx` | "Conversar com a camada preditiva de comportamento" (fecha o modal) |
| `PropensityCampaignDemo.tsx` | reset após o cálculo, "ver detalhamento" (drill), fechar drill |
| `DemandForecastDemo.tsx` | reset após o cálculo |
| `PriceMarginDemo.tsx` | reset após o cálculo |
| `PriceTurnoverDemo.tsx` | reset após o cálculo |
| `PriceToMarginDemo.tsx` | resets (topo e final) |
| `CommercialTargetsDemo.tsx` | reset após o cálculo |
| `MixAssortmentOrderDemo.tsx` | reset após o cálculo |
| `PredictivePersonalizationDemo.tsx` | reset/voltar após o cálculo |

Botões já sólidos (Simular no launcher, Continuar do quiz, Enviar do EbookCTA, CTAs "rodar simulação" nas demos) apenas passam a consumir o mesmo helper, sem mudança visual perceptível.

## O que **não** muda

- Cards de seleção/opção (quiz, matriz 2x2, chips de canal, linhas de tabela, TouchSelect): continuam com o tratamento de "selecionado" translúcido — são controles de entrada, não botões de ação; deixá-los laranja sólido tiraria a leitura de qual item está selecionado.
- Botão "X" de fechar drill no canto (ícone circular pequeno) permanece neutro para não competir com o CTA principal.
- Nenhuma lógica de negócio, dados ou tracking é alterada.

## Verificação

Abrir `/kiosk` no preview, percorrer quiz → resultado → modal de simulação → cálculo, e conferir por screenshot que o rodapé do modal e os botões de voltar aparecem com o mesmo laranja dos CTAs principais.
