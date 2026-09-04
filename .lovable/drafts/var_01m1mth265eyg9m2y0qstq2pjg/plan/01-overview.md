# Faixa vertical à direita da lista de famílias

Na seção **Famílias de modelagem** (`/i6-builders`), adicionar uma segunda faixa vertical terracota, igual à que existe hoje à esquerda do item ativo, mas posicionada do lado direito da lista — fechando a lista como um contêiner.

A linha horizontal passa a nascer nessa nova faixa (lado oposto ao círculo) e termina com o círculo junto ao quadro de detalhe, à direita.

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
 faixa do item ativo      faixa nova (fecha a lista)
```
