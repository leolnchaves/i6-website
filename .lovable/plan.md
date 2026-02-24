
# Remover Ondas Verticais da Home

## Problema
O componente `DarkLayout` aplica `VerticalWaves` globalmente para todas as paginas (Home, Solutions, Success Stories, Contact). A Home ja possui seus proprios efeitos visuais (particulas, gradientes no HeroSection) e as ondas verticais nao deveriam aparecer nela.

## Solucao
Modificar o `DarkLayout.tsx` para renderizar `VerticalWaves` condicionalmente, exibindo apenas nas rotas que nao sao a Home (`/`).

## Detalhes tecnicos

### Arquivo modificado: `src/components/DarkLayout.tsx`
- Importar `useLocation` do `react-router-dom`
- Verificar se a rota atual e `/` (Home)
- Renderizar `VerticalWaves` apenas quando NAO estiver na Home

A logica sera:
```
const location = useLocation();
const isHome = location.pathname === '/';
```

E no JSX, trocar `<VerticalWaves />` por `{!isHome && <VerticalWaves />}`.

Nenhum outro arquivo precisa ser alterado. As ondas continuarao visíveis em Solutions, Success Stories e Contact.
