## Objetivo
Padronizar o cabeçalho de `/i6-blog` para ficar idêntico em espaçamento, fonte e estilo aos de `/i6-intelligence` e `/insights`. Nenhuma outra parte da página é alterada.

## Padrão de referência
- Wrapper: `<section className="container mx-auto px-6 pt-32 pb-20">`
- Header: `<header className="max-w-3xl mb-10">`
- Eyebrow laranja (peso normal, sem bold): `text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-3`
- Texto do eyebrow: `infinity6 · Blog` (idêntico em PT e EN, seguindo o padrão de Intelligence e Insights)
- H1 oculto: `sr-only`
- Subtítulo: `text-lg text-white/70` (sem `mt-3`)

## Mudanças

### 1. `src/pages/Blog.tsx`
Ajustar apenas o wrapper `<section>` e o `<header>` inicial:

```tsx
<section className="container mx-auto px-6 pt-32 pb-20">
  <header className="max-w-3xl mb-10">
    <p className="text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-3">
      infinity6 · Blog
    </p>
    <h1 className="sr-only">{t('blog.pageTitle')}</h1>
    <p className="text-lg text-white/70">{t('blog.pageSubtitle')}</p>
  </header>
  {/* restante da página inalterado */}
</section>
```

O eyebrow deixa de usar `t('blog.badge')` e passa a ser a string fixa `infinity6 · Blog`, igual ao padrão das outras páginas (`infinity6 · Executive Research`, `infinity6 · Na Mídia`/`In the Media`).

### O que NÃO muda
- Hero em destaque, coluna de "Insights recentes", filtros e rails por tema permanecem exatamente como estão.
- Traduções `blog.badge` continuam existindo (ainda são usadas em `BlogHero.tsx` para o chip laranja sobre a imagem).