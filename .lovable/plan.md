
## Trocar as rotas: Nova home vira padrão, antiga vai para /oldhome_teste

### Resumo
A nova home (`HomeTeste`) passa a ser a rota `/` (padrão do site), e a home atual (`Home`) vai para `/oldhome_teste` como referência.

### Alteracoes

**1. `src/App.tsx` - Reorganizar rotas**
- Remover a rota independente `/hometeste`
- A rota `/` dentro do bloco `/*` passa a renderizar `HomeTeste` (fora do Layout, pois ela tem seu proprio header/footer)
- Adicionar rota `/oldhome_teste` renderizando `Home` (dentro do Layout, como antes)
- A nova home (`HomeTeste`) precisa ficar fora do Layout (ja tem HeaderNovo e FooterNovo proprios)

Estrutura final de rotas:
```
/                  -> HomeTeste (sem Layout)
/oldhome_teste     -> Home (com Layout)
/solutions         -> Solutions (com Layout)
/success-stories   -> SuccessStories (com Layout)
/contact           -> Contact (com Layout)
...
```

**2. `src/components/hometeste/HeaderNovo.tsx` - Atualizar links**
- Mudar o link "Home" de `/hometeste` para `/`
- Mudar o link do logo de `/hometeste` para `/`

### Detalhes tecnicos

**`src/App.tsx`:**
- Rota `/` fora do bloco Layout -> `<HomeTeste />`
- Dentro do bloco Layout, trocar `<Route path="/" element={<Home />} />` por `<Route path="/oldhome_teste" element={<Home />} />`
- Remover a rota `/hometeste`

**`src/components/hometeste/HeaderNovo.tsx`:**
- Linha 19: `{ to: '/', label: t('header.home') }`
- Linha 35: `<Link to="/" className="shrink-0">`
