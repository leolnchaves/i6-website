

# Corrigir Tag do Google Analytics

## Problema
O `index.html` usa `GA_MEASUREMENT_ID_PLACEHOLDER` no lugar do ID real. O Google verifica o HTML estatico da pagina para detectar a tag -- ele nao executa JavaScript do React. Por isso a tag nao e detectada.

Alem disso, o hook `useGoogleAnalytics.ts` tenta substituir o placeholder via manipulacao do DOM em runtime, o que e fragil e nao resolve a verificacao do Google.

## Solucao

### 1. Colocar o ID real diretamente no `index.html`
Substituir todas as ocorrencias de `GA_MEASUREMENT_ID_PLACEHOLDER` pelo ID real `G-781CHFGQ38` no HTML. Isso segue exatamente o formato que o Google recomenda.

O bloco ficara assim:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-781CHFGQ38"></script>
<script>
  gtag('js', new Date());
  gtag('config', 'G-781CHFGQ38', { send_page_view: false });
</script>
```

Nota: mantemos `send_page_view: false` porque o pageview e enviado pelo hook do React nas mudancas de rota (SPA).

### 2. Simplificar o hook `useGoogleAnalytics.ts`
Remover toda a logica de substituicao de placeholder (o `useEffect` que faz `script.src.replace`), pois nao sera mais necessaria. O hook mantera apenas:
- Atualizacao de consent (`gtag('consent', 'update', ...)`)
- Envio de pageview nas mudancas de rota

### Arquivos modificados
- `index.html` -- substituir placeholder pelo ID real `G-781CHFGQ38`
- `src/hooks/useGoogleAnalytics.ts` -- remover logica de substituicao de placeholder

