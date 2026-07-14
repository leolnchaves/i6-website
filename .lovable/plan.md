Alinhar o container de `/i6-blog` ao mesmo padrão das outras páginas (Intelligence, Insights).

**Mudança em `src/pages/Blog.tsx`:**

Trocar:
```
<div className="pt-32 pb-20 px-6">
  <div className="container mx-auto max-w-7xl">
```
por:
```
<section className="container mx-auto px-6 pt-32 pb-20">
```
(remover o wrapper `max-w-7xl` que estava empurrando o conteúdo para dentro).

Nenhuma outra alteração — hero, filtros, rails permanecem iguais.