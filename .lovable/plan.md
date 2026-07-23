## Ajuste do hero da Home

O header usa `container mx-auto px-6`, então a logo (esquerda) e o seletor de idiomas (direita) ficam limitados a essa largura. Já a imagem panorâmica do hero em `HeroDecisaoV4.tsx` está em um `<div>` `w-full` sem container, o que a deixa esticar até o edge da tela e parecer grande demais.

### Alteração

Em `src/components/hometeste/HeroDecisaoV4.tsx`, na zona 2 (guardrail da imagem), envolver o `<picture>` num wrapper `container mx-auto px-6` para casar exatamente com o padding do header:

```tsx
<div className="relative flex-1 min-h-0 w-full overflow-hidden flex items-center justify-center -my-[2vh] md:-my-[3vh]">
  <div className="container mx-auto px-6 h-full flex items-center justify-center">
    <picture className="w-full h-full flex items-center justify-center">
      <source media="(min-width: 768px)" srcSet={isPt ? heroPanoramaPt.url : heroPanoramaEn.url} />
      <img
        src={isPt ? heroMobilePt.url : heroMobileEn.url}
        alt=""
        aria-hidden
        className="max-w-full max-h-full w-auto h-auto object-contain select-none"
      />
    </picture>
  </div>
</div>
```

Nada mais muda — título, descrição e CTA continuam iguais. Como `object-contain` respeita a caixa disponível, a imagem simplesmente encolhe proporcionalmente e passa a ter bordas laterais alinhadas com a logo e o seletor de idiomas.
