
# Layout: Subtitulo a esquerda, botoes a direita

## Problema
O subtitulo e os botoes estao centralizados com `flex-wrap`, ocupando duas linhas em vez de uma.

## Solucao
Mudar o layout para `justify-between` com o texto alinhado a esquerda e os botoes a direita, separados por um indicador vertical discreto. Remover `flex-wrap` para forcar tudo em uma linha no desktop.

## Detalhes tecnicos

**Arquivo:** `src/components/solutions/I6SignalDemo.tsx` (linhas 624-641)

Substituir o bloco atual por:

```tsx
<div className="flex items-center justify-between mb-6 gap-4">
  <p className="text-white/40 text-sm whitespace-nowrap hidden md:block">{t.sectionSubtitle}</p>
  <div className="hidden md:block w-px h-5 bg-white/15 flex-shrink-0"></div>
  <div className="flex flex-wrap justify-center md:justify-end gap-2">
    {(Object.keys(t.scenarios) as Scenario[]).map((sc) => (
      <button ...>
        {t.scenarios[sc].label}
      </button>
    ))}
  </div>
</div>
```

Mudancas principais:
- `justify-between` distribui texto a esquerda e botoes a direita
- `whitespace-nowrap` no texto evita quebra
- `hidden md:block` no texto e separador - em mobile so aparecem os botoes (o texto e longo demais)
- Separador vertical discreto (`w-px h-5 bg-white/15`) entre texto e botoes
- Botoes com `justify-end` no desktop
