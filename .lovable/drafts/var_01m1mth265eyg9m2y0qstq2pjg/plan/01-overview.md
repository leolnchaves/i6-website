# Faixa vertical espelhada à direita da lista de famílias

Na seção **Famílias de modelagem** (`/i6-builders`), adicionar uma segunda faixa vertical terracota do lado direito da lista, espelhando exatamente a faixa que já marca o item ativo à esquerda: mesma altura e mesmo alinhamento vertical.

A linha horizontal nasce nessa nova faixa e termina com o círculo junto ao quadro de detalhe, à direita.

## Escopo
- Apenas `src/components/i6-builders/BuilderModels.tsx`.
- Sem mudança de texto, rota, SEO, formulário ou envio de leads.
- Preservar animação da linha, do quadro, `prefers-reduced-motion` e ARIA.

## Resultado esperado
```text
 |  03                    |
 |  Pricing & Elasticity  |———o   [ quadro de detalhe ]
 |  Modeling              |
 ^                        ^
 faixa do item ativo      faixa nova: mesma altura, mesmo topo/base
```
