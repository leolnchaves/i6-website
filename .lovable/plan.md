

# Redesign do seletor de cenarios: barra continua com blur

## Problema
Os botoes individuais com gap entre eles ocupam muito espaco vertical e nao ficam harmonicos. O usuario quer voltar ao layout texto em cima / botoes embaixo, mas com os botoes compactados numa barra continua estilo segmented control.

## Solucao
Substituir os botoes individuais por uma barra unica com backdrop-blur escuro, onde cada opcao e um segmento. A opcao selecionada recebe um highlight com blur laranja. Isso reduz o espaco vertical e cria um visual mais coeso.

## Detalhes tecnicos

### Arquivo: `src/components/solutions/I6SignalDemo.tsx` (linhas 618-636)

Substituir o bloco do subtitle + scenario selector por:

```tsx
{/* Subtitle */}
<p className="text-white/40 text-sm max-w-md mb-4 leading-relaxed">{t.sectionSubtitle}</p>

{/* Scenario selector - continuous bar */}
<div className="flex justify-center mb-6">
  <div className="inline-flex rounded-full p-1 backdrop-blur-md bg-white/5 border border-white/10">
    {(Object.keys(t.scenarios) as Scenario[]).map((sc) => (
      <button
        key={sc}
        onClick={() => handleScenarioClick(sc)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
          activeScenario === sc
            ? 'bg-orange-500/80 backdrop-blur-sm text-white shadow-lg shadow-orange-500/30'
            : 'text-white/60 hover:text-white/90'
        }`}
      >
        {t.scenarios[sc].label}
      </button>
    ))}
  </div>
</div>
```

Mudancas principais:
- Layout volta a texto em cima, botoes embaixo (sem flex-row)
- Subtitulo visivel sempre (remove `hidden md:block`), com `max-w-md` e `mb-4` compacto
- Barra unica com `inline-flex rounded-full` e `backdrop-blur-md bg-white/5 border border-white/10` (blur escuro)
- Padding interno `p-1` para que os segmentos fiquem "dentro" da barra
- Botao ativo: `bg-orange-500/80 backdrop-blur-sm` (blur laranja)
- Botao inativo: sem background, apenas texto `text-white/60`
- `py-1.5` em vez de `py-2` para compactar a altura
- Remove gap entre botoes (sao contiguos dentro da barra)
- Reduz espaco total: menos mb, menos padding vertical

