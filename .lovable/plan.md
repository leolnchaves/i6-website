

# Corrigir flash do header ao navegar entre paginas

## Problema
Cada pagina (Home, Solutions, SuccessStories, Contact) renderiza sua propria instancia de `HeaderNovo`. Ao navegar, o React desmonta a pagina inteira (incluindo o header) e monta a nova, causando o flash visual onde a logo desaparece e os menus se reposicionam.

## Solucao
Criar um layout compartilhado para as paginas que usam `HeaderNovo`/`FooterNovo`, de forma que o header e footer persistam entre navegacoes sem remontar.

## Mudancas

### 1. Criar `src/components/DarkLayout.tsx`
Novo componente de layout para as paginas dark, contendo:
- `HeaderNovo` (z-[20])
- `FooterNovo` (z-[20])
- `VerticalWaves`
- `CookieConsentManager`
- Slot para conteudo filho (children)
- Background `bg-[#0B1224]`

### 2. Atualizar `src/App.tsx`
Agrupar as rotas `/`, `/solutions`, `/success-stories` e `/contact` dentro do `DarkLayout`, usando um `<Route>` pai com `<Outlet>`:

```text
Routes
  DarkLayout (HeaderNovo + FooterNovo persistem)
    / -> HomeTeste (sem header/footer proprio)
    /solutions -> Solutions (sem header/footer proprio)
    /success-stories -> SuccessStories (sem header/footer proprio)
    /contact -> Contact (sem header/footer proprio)
  Layout (Header antigo)
    /privacy-policy
    /ethics-policy
    ...
```

### 3. Remover HeaderNovo, FooterNovo, VerticalWaves e CookieConsentManager de cada pagina
Arquivos a editar:
- `src/pages/HomeTeste.tsx` -- remover HeaderNovo, FooterNovo, VerticalWaves, CookieConsentManager
- `src/pages/Solutions.tsx` -- remover os mesmos
- `src/pages/SuccessStories.tsx` -- remover os mesmos
- `src/pages/Contact.tsx` -- remover os mesmos

Cada pagina passara a renderizar apenas seu conteudo especifico (hero, secoes, CTA, etc).

## Detalhes tecnicos

### Arquivos criados
1. `src/components/DarkLayout.tsx`

### Arquivos modificados
1. `src/App.tsx` -- reestruturar rotas com Outlet
2. `src/pages/HomeTeste.tsx` -- remover header/footer/waves
3. `src/pages/Solutions.tsx` -- remover header/footer/waves
4. `src/pages/SuccessStories.tsx` -- remover header/footer/waves
5. `src/pages/Contact.tsx` -- remover header/footer/waves

### Estrutura do DarkLayout
```text
<div className="min-h-screen bg-[#0B1224] relative">
  <VerticalWaves />
  <div className="relative">
    <div className="relative z-[20]">
      <HeaderNovo />
    </div>
    <div className="relative z-[10]">
      <Outlet />   <-- conteudo da pagina
    </div>
    <div className="relative z-[20]">
      <FooterNovo />
    </div>
    <CookieConsentManager />
  </div>
</div>
```

Nota: Paginas que precisam de elementos fora do z-[10] (como CTAFinal em SuccessStories ou SolutionsCTA em Solutions) precisarao manter o z-index correto internamente. Sera verificado caso a caso.

