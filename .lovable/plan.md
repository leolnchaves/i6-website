## Verificação realizada

Revisei o que já está implementado vs. o que ficou pendente:

| Item | Status |
|---|---|
| `defaultCookieConsent.analytics = true` | OK |
| `COOKIE_CONSENT_VERSION = '2.0'` | OK |
| `acceptAdditional` / `continueEssential` no hook | OK |
| `CookieBanner.tsx` (dark + bilíngue + 2 botões) | OK |
| Privacy Policy PT seção 10 + EN seção 8 | OK |
| `getLeadContextFields()` + uso em LeadGate/Contact | OK |
| `.lovable/plan.md` com header do Sheet + Apps Script | OK |

**Problemas encontrados:**

1. **`/cookie-settings` 404** — o `CookieBanner.tsx` linka para `/cookie-settings` (linha 50) mas **essa rota não existe** em `src/App.tsx`. Clicar em "Preferências / Preferences" leva ao NotFound.
2. **`CookieDetailsModal.tsx` desatualizado** — ainda usa tema claro (`text-gray-600`, `bg-red-50`), copy antigo via `t('cookies.banner.*')` e botão "Rejeitar tudo". Inconsistente com a v2.
3. **`CookieSettingsButton.tsx` desatualizado** — `bg-white/80` claro, fixed bottom-left. Não combina com a identidade dark e nem é usado/montado em lugar nenhum hoje.
4. **Apps Script** — `session_duration` e `pages_viewed_count` chegam como string; sem coerção numérica viram texto no Sheet.
5. **Sem checklist de QA end-to-end documentado.**

## Plano

### 1. Criar página `/cookie-settings` (PT + EN)

Novo arquivo `src/pages/CookieSettings.tsx` com:
- Layout `DarkLayout` (mesmo wrapper de Privacy/Ethics)
- Bilíngue via `useLanguage()`
- 4 toggles (Essential bloqueado, Analytics, Marketing, Preferences) usando `updateConsent` + botão "Salvar preferências" que chama `saveConsent(consent)`
- Atalhos: "Aceitar tudo" (`acceptAll`), "Apenas essenciais" (`rejectAll`)
- SEO: `<Helmet>` com title/description bilíngue, `noindex`
- Sem vertical waves (regra de memória para páginas legais)

Registrar a rota em `src/App.tsx` dentro de `LocalizedRoutes`:
```
<Route path="cookie-settings" element={<CookieSettings />} />
```

### 2. Atualizar `CookieDetailsModal.tsx` para v2

Reescrever com:
- Tema dark (`bg-[#0B1224]`, texto branco/coral)
- Textos inline bilíngues (mesma estratégia do `CookieBanner.tsx`, sem depender de `t('cookies.banner.*')`)
- Dois botões: "Aceitar adicionais" (`acceptAdditional`) e "Continuar sem" (`continueEssential`)
- Link para `/cookie-settings` para ajuste granular

### 3. Atualizar `CookieSettingsButton.tsx`

- Trocar `bg-white/80` por estilo dark consistente (`bg-[#0B1224]/80`, borda `white/10`, hover coral)
- Manter `fixed bottom-4 left-4` mas só renderizar se `!showBanner` (evita sobrepor banner)

### 4. Apps Script — coerção numérica

Atualizar `.lovable/plan.md`: no `doPost`, antes de gravar, converter `session_duration` e `pages_viewed_count` com `Number(...) || 0`. Demais campos ficam como string com `slice()`.

### 5. Checklist de QA (em `.lovable/plan.md`)

Adicionar seção "Testes pós-deploy":
- [ ] Aba anônima → banner aparece
- [ ] "Continuar sem" → banner some, GA4 dispara, marketing/preferences off
- [ ] "Aceitar adicionais" → tudo on
- [ ] `/cookie-settings` carrega em PT e EN, toggles salvam
- [ ] Submeter ContactForm e LeadGateForm → linha no Sheet com colunas H–V preenchidas
- [ ] Linha antiga (pré-deploy) continua legível com H..V vazias
- [ ] Bump v1→v2 reabre banner para usuários antigos

### 6. Nota i6HUB no `.lovable/plan.md`

Adicionar parágrafo curto: quando o i6HUB começar a consumir H–V, tratar `""` como `null` (leads pré-deploy não terão esses campos).

## Detalhes técnicos

- **Sem novas dependências.** Tudo React + Tailwind + tokens semânticos existentes.
- **Sem mudança de backend** — site continua 100% estático. Apps Script já está documentado em `.lovable/plan.md` (a alteração do item 4 é só no `.md`, você cola no Apps Script manualmente).
- **Tokens:** usar `#0B1224` (navy) e `#F4845F` (coral) inline como o resto do projeto faz nos componentes de cookies/privacy.
- **i18n:** seguir padrão inline já usado no `CookieBanner.tsx` (sem adicionar chaves novas ao dicionário de tradução).

## Fora de escopo

- Reverse-IP, session replay, endpoint dedicado de tracking, mudanças no i6HUB.
- Reescrever `useCookieConsent` — já está correto para v2.
