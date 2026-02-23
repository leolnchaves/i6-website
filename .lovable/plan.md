

# Tornar o indicador de scroll mais visivel no i6Signal

## O que muda

Substituir o pequeno icone de scroll (bolinha + texto "scroll") por um box mais aparente com texto descritivo, posicionado no canto superior direito da area de chat.

## Mudanca no arquivo `src/components/solutions/I6SignalDemo.tsx`

### Substituir o indicador atual (linhas 648-658)

Trocar o indicador minimalista por um box com fundo, borda, icone de seta e texto bilíngue:

```tsx
{showScrollHint && (
  <div 
    className="absolute top-3 right-4 z-20 cursor-pointer animate-fade-in"
    onClick={() => chatRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <div className="flex items-center gap-2 bg-orange-50 border border-orange-300 rounded-lg px-3 py-2 shadow-md">
      <ChevronUp className="w-4 h-4 text-orange-500 animate-bounce" />
      <span className="text-orange-600 text-xs font-medium">
        {lang === 'pt' ? 'Navegue pelo conteúdo' : 'Scroll through content'}
      </span>
    </div>
  </div>
)}
```

O box tera:
- Fundo laranja claro (`bg-orange-50`) com borda laranja (`border-orange-300`)
- Icone `ChevronUp` animado com bounce
- Texto descritivo em portugues ou ingles conforme o idioma ativo
- Sombra para destaque visual
- Clique leva ao topo da resposta

### Verificar import do ChevronUp
Confirmar que `ChevronUp` ja esta importado do `lucide-react`. Se nao estiver, adicionar ao import existente.

## Resultado
O usuario vera um box claro e legivel no canto superior direito com o texto "Navegue pelo conteúdo" (ou "Scroll through content" em ingles), tornando evidente que pode rolar para cima.

