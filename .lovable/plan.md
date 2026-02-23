

# Colocar subtitulo e botoes na mesma linha

## Objetivo
Economizar espaco vertical colocando o subtitulo descritivo e os botoes de cenario lado a lado, dando mais espaco para o demo do i6signal.

## Mudancas

### Arquivo: `src/components/solutions/I6SignalDemo.tsx`

**Linhas 619-641** - Reorganizar o layout:

1. Remover o `div` separado do subtitulo e o `div` separado dos botoes
2. Criar um unico container flex com `items-center justify-center gap-4 flex-wrap`
3. O subtitulo fica como texto inline seguido dos botoes na mesma linha
4. Em mobile, o `flex-wrap` permite que quebre naturalmente

**De:**
```
<div class="text-center mb-6">
  <h2>...</h2>
  <p>subtitle</p>
</div>
<div class="text-center mb-8">
  <div class="flex ...">buttons</div>
</div>
```

**Para:**
```
<div class="text-center mb-4">
  <h2>...</h2>
</div>
<div class="flex items-center justify-center gap-3 flex-wrap mb-6">
  <p class="text-white/50 text-sm">subtitle</p>
  <div class="hidden sm:block w-px h-6 bg-white/20"></div>
  <div class="flex flex-wrap justify-center gap-2">
    buttons...
  </div>
</div>
```

O separador vertical (`w-px h-6 bg-white/20`) cria uma divisao visual elegante entre o texto e os botoes, visivel apenas em telas maiores. Em mobile, tudo se empilha naturalmente via `flex-wrap`.

