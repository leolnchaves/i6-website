

# Integrar Google Analytics ao site

## Resumo
Adicionar o Google Analytics 4 (GA4) ao site, integrado com o sistema de cookie consent existente, para que o tracking so seja ativado quando o usuario aceitar cookies de analise.

## O que voce precisa fazer
Informar o seu ID de medicao do Google Analytics (formato G-XXXXXXXXXX) quando solicitado.

## Detalhes tecnicos

### 1. Adicionar o script do GA4 no `index.html`
- Inserir o script do Google Analytics (gtag.js) no `<head>` do HTML
- Inicializar com consent mode, bloqueando analytics ate o usuario aceitar

### 2. Criar um hook `useGoogleAnalytics`
- Novo arquivo `src/hooks/useGoogleAnalytics.ts`
- Monitora o estado de consent de cookies (analytics)
- Atualiza o gtag consent quando o usuario aceita ou rejeita cookies de analise
- Envia pageview em cada mudanca de rota

### 3. Integrar no CookieConsentManager
- Atualizar `src/components/cookies/CookieConsentManager.tsx` para usar o hook `useGoogleAnalytics`
- Passa o estado de consent de analytics para controlar o tracking

### 4. Fluxo de funcionamento

```text
Usuario acessa o site
    |
    v
GA4 carrega com consent NEGADO (modo padrao)
    |
    v
Cookie banner aparece
    |
    +-- Aceita todos --> gtag consent atualizado para GRANTED --> tracking ativo
    |
    +-- Rejeita --> consent permanece DENIED --> sem tracking
    |
    +-- Personaliza --> depende da escolha de "Analise"
```

### Arquivos modificados
- `index.html` -- adicionar script gtag.js com consent mode
- `src/hooks/useGoogleAnalytics.ts` -- novo hook para gerenciar GA
- `src/components/cookies/CookieConsentManager.tsx` -- integrar hook de GA

