# Banner de cookies — Parte 3 (Estado A reconstruído + ajustes no Estado B)

Escopo: apenas `src/components/cookies/CookieBanner.tsx`. `CookieConsentManager.tsx` intocado. `acceptAdditional`/`continueEssential` deixam de ser usados aqui (permanecem no hook).

## Diff completo de `src/components/cookies/CookieBanner.tsx`

### 1) Destructure do hook (L10-20)

```diff
   const {
     showBanner,
     bannerExpanded,
     setBannerExpanded,
-    acceptAdditional,
-    continueEssential,
     acceptAll,
     rejectAll,
     saveConsent,
     consent,
   } = useCookieConsent();
```

### 2) Textos (L29-96) — título, corpo, novos rótulos

PT:
```diff
-        title: 'Cookies',
-        body: 'Usamos cookies essenciais e de análise anônimos para que o site funcione e medir desempenho. Aceita também cookies adicionais de marketing e preferências?',
+        title: 'Cookies e privacidade',
+        body: 'Usamos dados anônimos da sua visita para entender como o site é usado e melhorar sua experiência.',
         privacy: 'Política de Privacidade',
-        preferences: 'Preferências',
-        continueEssential: 'Rejeitar adicionais',
-        acceptAdditional: 'Aceitar adicionais',
+        customize: 'Personalizar',
+        ok: 'OK',
+        onlyEssential: 'Apenas essenciais',
         prefsTitle: 'Preferências de Cookies',
         prefsSubtitle: 'Escolha quais categorias você permite.',
         essential: 'Essenciais',
-        essentialDesc: 'Funcionamento do site e métricas anônimas de primeira parte (legítimo interesse). Sempre ativos.',
+        essentialDesc: 'Funcionamento do site e métricas anônimas de primeira parte (legítimo interesse).',
+        alwaysActive: 'Sempre ativo',
         analytics: 'Análise (GA4)',
         analyticsDesc: 'Envio anônimo para Google Analytics 4 (terceira parte).',
         marketing: 'Marketing',
         marketingDesc: 'Mensurar campanhas e personalizar conteúdo.',
         prefs: 'Preferências',
         prefsDesc: 'Lembrar idioma, layout e ajustes de interface.',
         save: 'Salvar preferências',
-        acceptAll: 'Aceitar tudo',
-        onlyEssential: 'Apenas essenciais',
+        acceptAll: 'Aceitar todos',
         back: 'Voltar',
```

ES:
```diff
-        title: 'Cookies',
-        body: 'Usamos cookies esenciales y de análisis anónimos para que el sitio funcione y podamos medir el rendimiento. ¿Aceptas también cookies adicionales de marketing y preferencias?',
+        title: 'Cookies y privacidad',
+        body: 'Usamos datos anónimos de tu visita para entender cómo se usa el sitio y mejorar tu experiencia.',
         privacy: 'Política de Privacidad',
-        preferences: 'Preferencias',
-        continueEssential: 'Rechazar adicionales',
-        acceptAdditional: 'Aceptar adicionales',
+        customize: 'Personalizar',
+        ok: 'OK',
+        onlyEssential: 'Solo esenciales',
         prefsTitle: 'Preferencias de Cookies',
         prefsSubtitle: 'Elige qué categorías permites.',
         essential: 'Esenciales',
-        essentialDesc: 'Funcionamiento del sitio y métricas anónimas propias (interés legítimo). Siempre activas.',
+        essentialDesc: 'Funcionamiento del sitio y métricas anónimas propias (interés legítimo).',
+        alwaysActive: 'Siempre activo',
         analytics: 'Análisis (GA4)',
         analyticsDesc: 'Envío anónimo a Google Analytics 4 (tercero).',
         marketing: 'Marketing',
         marketingDesc: 'Medir campañas y personalizar contenido.',
         prefs: 'Preferencias',
         prefsDesc: 'Recordar idioma, layout y ajustes de interfaz.',
         save: 'Guardar preferencias',
         acceptAll: 'Aceptar todas',
-        onlyEssential: 'Solo esenciales',
         back: 'Volver',
```

EN:
```diff
-        title: 'Cookies',
-        body: 'We use essential and anonymous analytics cookies so the site works and we can measure performance. Do you also accept additional marketing and preferences cookies?',
+        title: 'Cookies and privacy',
+        body: 'We use anonymous visit data to understand how the site is used and improve your experience.',
         privacy: 'Privacy Policy',
-        preferences: 'Preferences',
-        continueEssential: 'Reject additional',
-        acceptAdditional: 'Accept additional',
+        customize: 'Customize',
+        ok: 'OK',
+        onlyEssential: 'Essential only',
         prefsTitle: 'Cookie Preferences',
         prefsSubtitle: 'Choose which categories you allow.',
         essential: 'Essential',
-        essentialDesc: 'Site functionality and anonymous first-party metrics (legitimate interest). Always on.',
+        essentialDesc: 'Site functionality and anonymous first-party metrics (legitimate interest).',
+        alwaysActive: 'Always active',
         analytics: 'Analytics (GA4)',
         analyticsDesc: 'Anonymous data sent to Google Analytics 4 (third party).',
         marketing: 'Marketing',
         marketingDesc: 'Measure campaigns and personalize content.',
         prefs: 'Preferences',
         prefsDesc: 'Remember language, layout and UI tweaks.',
         save: 'Save preferences',
         acceptAll: 'Accept all',
-        onlyEssential: 'Essential only',
         back: 'Back',
```

### 3) Estado A (L114-149) — reescrito

```diff
         {!bannerExpanded ? (
           <>
             <h3 className="text-white text-sm font-semibold mb-2">{t.title}</h3>
             <p className="text-white/70 text-xs leading-relaxed mb-3">{t.body}</p>
 
-            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs">
-              <button type="button" onClick={() => openPolicy('privacy')} className="text-[#F4845F] hover:underline">
-                {t.privacy}
-              </button>
-              <button
-                type="button"
-                onClick={() => setBannerExpanded(true)}
-                className="text-white/60 hover:text-white/90 hover:underline"
-              >
-                {t.preferences}
-              </button>
-            </div>
-
-            <div className="flex flex-col sm:flex-row gap-2">
+            <div className="flex flex-col sm:flex-row gap-2 mb-3">
               <Button
-                onClick={continueEssential}
+                onClick={rejectAll}
                 variant="outline"
                 size="sm"
                 className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
               >
-                {t.continueEssential}
+                {t.onlyEssential}
               </Button>
               <Button
-                onClick={acceptAdditional}
+                onClick={acceptAll}
                 size="sm"
                 className="flex-1 bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
               >
-                {t.acceptAdditional}
+                {t.ok}
               </Button>
             </div>
+
+            <div className="flex items-center justify-center gap-4 text-[11px]">
+              <button
+                type="button"
+                onClick={() => setBannerExpanded(true)}
+                className="text-white/60 hover:text-white/90 hover:underline"
+              >
+                {t.customize}
+              </button>
+              <button type="button" onClick={() => openPolicy('privacy')} className="text-[#F4845F] hover:underline">
+                {t.privacy}
+              </button>
+            </div>
           </>
```

### 4) Estado B — badge "Sempre ativo" na linha Essenciais (L166-185)

```diff
               {rows.map((row) => (
                 <div
                   key={row.key}
                   className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
                 >
                   <div className="flex-1 min-w-0">
-                    <div className="text-white text-xs font-semibold mb-0.5">{row.label}</div>
+                    <div className="flex items-center gap-2 text-white text-xs font-semibold mb-0.5">
+                      {row.label}
+                      {row.locked && (
+                        <span className="text-[10px] uppercase tracking-wide text-white/50 border border-white/15 rounded-full px-2 py-0.5">
+                          {t.alwaysActive}
+                        </span>
+                      )}
+                    </div>
                     <div className="text-white/60 text-[11px] leading-relaxed">{row.desc}</div>
                   </div>
```

(A descrição essencial sem "Sempre ativos." já cai pela mudança de texto no item 2. O botão do painel "Aceitar tudo"→"Aceitar todos" idem — `t.acceptAll` já atualizado.)

O restante do Estado B (Salvar preferências, Aceitar todos, Apenas essenciais, Voltar, link da política) não muda.

## Verificação após aprovação
Build; Playwright PT/EN/ES: Estado A com dois botões lado a lado + linha Personalizar/Política; "OK" dispara GA4+beacon; "Apenas essenciais" fecha sem disparo; Estado B mostra badge e "Aceitar todos"; rodapé segue abrindo o Estado B.
