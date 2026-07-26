## Contexto

Os únicos "combos" (dropdowns) no /kiosk são os do demo **Mix, Sortimento e Pedido Ideal** (`src/components/kiosk/demos/MixAssortmentOrderDemo.tsx`):

- **Setup (2 combos):** Loja/PDV e Região — hoje via `SelectField`
- **Resultado (2 combos):** Loja/PDV e Região no cabeçalho do carrinho — hoje via `CompactSelect`

Ambos usam `<select>` nativo. Em telas touch, o `<select>` nativo abre um seletor do sistema operacional (roda/lista pequena), com alvos de toque desconfortáveis e visual fora do design do kiosk. Nenhum outro demo do /kiosk usa combos (os switchers de dimensão em Metas Comerciais e as abas de cenário em Personalização já são chips grandes).

## O que muda

Trocar os dois helpers internos (`SelectField` e `CompactSelect`) por um **`TouchSelect`** único — um botão-gatilho com popover controlado por React, dimensionado para dedo.

### Especificação do `TouchSelect`

Gatilho (botão):
- Altura mínima ≥ 6vmin (setup) / ≥ 5vmin (resultado) — confortável para o dedo
- Label acima em uppercase (mantém identidade atual)
- Valor atual em destaque + chevron
- Borda coral no estado aberto

Popover de opções (abre no clique):
- Renderizado em portal ancorado ao gatilho, largura ≥ largura do gatilho (mínimo ~28vmin)
- Cada opção: linha inteira clicável, altura ≥ 6vmin, padding generoso, texto ~1.6vmin
- Hover/press coral, opção selecionada com marcador coral à esquerda
- Fecha ao selecionar, ao clicar fora ou no Esc
- Backdrop translúcido leve para foco visual

### Onde aplicar

- **Setup** (linhas ~99 e ~105 de `MixAssortmentOrderDemo.tsx`): variante "grande" do `TouchSelect`
- **Cabeçalho do carrinho no resultado** (linhas ~142 e ~148): mesma variante "grande" — o usuário pediu explicitamente mais espaço, então unificamos com o setup em vez de manter uma versão compacta

### Escopo

- Apenas frontend/presentation em `MixAssortmentOrderDemo.tsx` (mais eventual novo arquivo `TouchSelect.tsx` colocado em `src/components/kiosk/ui/`)
- API preservada: `label`, `value`, `onChange`, `options[{value,label}]` — nenhuma alteração em datasets, tradução ou lógica de filtro
- Fora do escopo: `KioskMetrics.tsx` (dashboard interno, não é tela touch)

## Detalhes técnicos

- Novo componente `src/components/kiosk/ui/TouchSelect.tsx` (React puro + Tailwind, sem dependências novas)
- Fechamento por: seleção, clique fora (`useEffect` + `mousedown` listener no `document`), tecla `Escape`
- Posicionamento: `absolute` sob o gatilho com `ref` — sem libs de portal; contêiner do demo já tem `overflow` seguro
- Cores via classes utilitárias já usadas no arquivo (`#F4845F`, `#0B1224`, `white/`)
- Remoção de `SelectField` e `CompactSelect` após a migração para evitar código morto

```text
┌─ LOJA/PDV ───────────────┐        ┌─ Todas as lojas ▾ ─┐
│  Todas as lojas       ▾  │  →     │ ● Todas as lojas    │
└──────────────────────────┘        │   PDV 001 — Centro  │
                                    │   PDV 002 — Sul     │
                                    │   PDV 003 — Norte   │
                                    └─────────────────────┘
```
