

## Mover copyright para abaixo dos links de politicas

### O que sera feito

Mover o texto de copyright (linha 94-96) para dentro da coluna Brand (col-span-2), logo abaixo dos links de Privacy/Ethics. Remover o bloco separado com `border-t`. Isso fara com que o copyright fique alinhado na mesma coluna da marca, e a altura total do footer ficara determinada pela coluna de Links Rapidos, sem espaco extra embaixo.

### Detalhes tecnicos

**Arquivo: `src/components/hometeste/FooterNovo.tsx`**

1. Dentro da div "Brand" (linha 42-63), adicionar o copyright logo apos os links de politicas (depois da linha 62), com um `mt-3` para leve espacamento:
   ```html
   <p className="text-white/30 text-xs mt-3">{copyright}</p>
   ```

2. Remover o bloco separado do copyright (linhas 93-96) que tem o `border-t`.

3. Reduzir o padding vertical do container de `py-14` para `py-10` para compactar a altura geral e alinhar melhor com a altura da coluna de Links Rapidos.

