## Detalhes técnicos

### Arquivo
`src/components/home-v3/HeroSuite.tsx`

### Alterações
Atualizar o campo `builderDescription` nos três blocos de idioma:

```js
pt: {
  // ...
  builderDescription: 'Capacidade de modelagens proprietárias para criar experiências únicas e ampliar o valor do seu produto',
}

en: {
  // ...
  builderDescription: 'Proprietary modeling capabilities to create unique experiences and expand your product value',
}

es: {
  // ...
  builderDescription: 'Capacidad de modelados propietarios para crear experiencias únicas y ampliar el valor de tu producto',
}
```

### Validação
1. Abrir `/pt`, `/en` e `/es` no preview.
2. Verificar se o card do Builder exibe a nova descrição e se o layout não quebrou (cards, painel de decisões, CTAs).
3. Rodar `bunx tsgo --noEmit` e `bun run build` para garantir que não há regressão de tipo/build.

### Riscos
- Baixo risco: alteração puramente textual em uma string estática, sem impacto em lógica, hooks ou dados dinâmicos.
