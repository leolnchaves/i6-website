# Auditoria de /our-ai — paridade EN/ES, restos antigos, dados estruturados

Nada foi alterado. Todas as afirmações abaixo vêm de leitura dos arquivos.

## 1) Paridade por seção (PT · EN · ES)

Fonte de toda a copy: `src/data/staticData/ourAIContent.ts` (PT 101-291, EN 293-483, ES 485-675). **Nenhuma chave está ausente e nenhum idioma cai em fallback PT** — as três árvores estão completas para as 6 seções auditadas.

### 04 Base científica (`science`)
| Campo | PT (L266-275) | EN (L458-467) | ES (L650-658) | Status |
|---|---|---|---|---|
| eyebrow | Base científica | Scientific foundations | Base científica | ok |
| título | Pesquisa acadêmica na origem do time | Academic research at the team's origin | Investigación académica en el origen del equipo | ok, sem ponto final |
| subtítulo | Publicações revisadas por pares de Everton Gago, cofundador e COO… | Peer-reviewed publications by Everton Gago, co-founder and COO… | Publicaciones con revisión por pares de Everton Gago, cofundador y COO… | ok |
| CTA | Ver todas as publicações e palestras | See all publications and talks | Ver todas las publicaciones y charlas | ok |
| link do fundador | Veja o perfil acadêmico… | See the academic profile… | Mira el perfil académico… | ok |
| rótulos dos cards | `research.json` kindLabels (L108-112) CAPÍTULO/CONFERÊNCIA · CHAPTER/CONFERENCE · CAPÍTULO/CONFERENCIA | | | ok, ES traduzido |

### 05 Camada de abstração (`builder`)
| Campo | PT (L171-181) | EN (L363-373) | ES (L555-565) | Status |
|---|---|---|---|---|
| eyebrow / título | Camada de abstração · i6 Builder Platform | Abstraction layer · i6 Builder Platform | Capa de abstracción · i6 Builder Platform | ok |
| subtítulo | "…prontos, na i6 Decision Suite, ou de forma programável, na i6 Builder Platform…" | equivalente | "…listos, en la i6 Decision Suite, o de forma programable, en la i6 Builder Platform…" | ok, feminino em PT/ES |
| SDK / API / Toolkits | 3 itens | 3 itens | 3 itens | ok |
| CTA | Construa com a i6 Builder Platform | Build with the i6 Builder Platform | Construye con la i6 Builder Platform | ok |

### 06 Governança (`security`)
| Campo | PT (L246-258) | EN (L438-450) | ES (L630-642) | Status |
|---|---|---|---|---|
| título | Privacidade e segurança por design | Privacy and security by design | Privacidad y seguridad por diseño | ok |
| lead | Privacidade e isolamento são pré-requisitos de arquitetura… | equivalente | equivalente | ok |
| 4 cards | Anonimização na origem · Autenticação centralizada · Ambiente isolado · Escala com o mesmo controle | Anonymization at source · Centralized authentication · Isolated environment · Scales with the same control | Anonimización en el origen · Autenticación centralizada · Entorno aislado · Escala con el mismo control | ok, 4/4 com ponto final nas descrições |
| CTA segurança | Sua área de segurança ou risco precisa de mais detalhes? / Fale com nosso time | Does your security or risk team need more details? / Talk to our team | ¿Tu área de seguridad o riesgo necesita más detalles? / Habla con nuestro equipo | ok |

### Evidência (`results`)
| Campo | PT (L259-265) | EN (L451-457) | ES (L643-649) | Status |
|---|---|---|---|---|
| título | Resultados reais em produção | Real results in production | Resultados reales en producción | ok |
| subtítulo | Números medidos em operação de clientes… | equivalente | equivalente | ok |
| rótulo | Setor · X | Sector · X | Sector · X | ok (`ProductionResults.tsx` L39) |
| 6 cards | `src/data/realResults.json`, 3 idiomas completos | | | ok, "mi/bi" respeitado |
| link | Veja as histórias de sucesso | See the success stories | Mira las historias de éxito | ok |

### Vocabulário (`glossary`)
| Campo | PT (L276-282) | EN (L468-474) | ES (L660-666) | Status |
|---|---|---|---|---|
| título / subtítulo | Os conceitos por trás da inteligência / Definições curtas… | The concepts behind the intelligence / Short definitions… | Los conceptos detrás de la inteligencia / Definiciones breves… | ok |
| 6 termos | `ourAIGlossary.json` pt/en/es, 6 por idioma, slugs localizados | | | ok |
| link | Glossário completo na documentação | Full glossary in the documentation | Glosario completo en la documentación | ok |

### CTA final (`closing`)
| Campo | PT (L283-290) | EN (L475-482) | ES (L667-674) | Status |
|---|---|---|---|---|
| eyebrow / título | Próximo passo / Quer avaliar a inteligência em profundidade? | Next step / Want to assess the intelligence in depth? | Siguiente paso / ¿Quieres evaluar la inteligencia en profundidad? | ok |
| subtítulo | Conversamos com times técnicos… | We talk to technical teams… | Hablamos con equipos técnicos… | ok |
| 3 botões | Conheça a i6 Decision Suite · Construa com a i6 Builder Platform · Falar com o time técnico | Explore the i6 Decision Suite · Build with the i6 Builder Platform · Talk to the technical team | Conoce la i6 Decision Suite · Construye con la i6 Builder Platform · Hablar con el equipo técnico | ok |

### Divergências (c) encontradas fora dessas 6 seções, mas que afetam a coerência
| # | Onde | Problema |
|---|---|---|
| D1 | `ourAIContent.ts` ES L583/L590 (`foundation.statYears`) | Usa "1,45 bi" / "20 bi" (grafia PT) enquanto o hero ES L505 diz "20 mil millones". Unidade inconsistente dentro do ES. |
| D2 | `ourAIContent.ts` PT L186, EN L378, ES L570 (`foundation.description`) | Cita só três elementos ("meta-aprendizado, aprendizado ativo e perda topológica") e omite External Memory, contradizendo `foundation.architecture` (4 itens) e o glossário nos 3 idiomas. |

## 2) Restos da versão antiga

Varredura em `src/`, `public/`, `scripts/`, `index.html`, `src/content/`:

| Cadeia buscada | Ocorrências |
|---|---|
| Pesquisa própria há mais de uma década | 0 |
| Segurança e conformidade por design | 1 — comentário em `src/components/our-ai/SecuritySection.tsx` L11 (título visível já é "Privacidade e segurança por design") |
| Pronto para escalar · 100% em nuvem · sem intermediação comercial · torna o número verificável · 20GB · 5 publicações / cinco artigos · quatro motores | 0 |
| "Acessar" como link de publicação | 0 (`research.json` linkLabels usa "Ler no Springer"/"Ver artigo") |
| Conhecer a i6 Builder Platform · Contratar a Decision Suite · Construir sobre a i6 Builder Platform | 0 em código montado |
| Conversion propensity | 1 — `src/content/docs/glossario-en.md` L32: é o glossário completo (9 termos), não a lista de /our-ai. Não é resto. |
| Contextual adherence | 0 |
| i6 Signal | 0 em /our-ai, 0 no JSON-LD. Só em Kiosk, `solutionsV2/content.ts`, `signalDemo`, `home-v3/product/suiteContent.ts` — fora do escopo. |

## 3) Texto oculto e dados estruturados de /our-ai

Tudo em `scripts/prerender-seo-stubs.mjs` (bloco `route === 'our-ai'`, L344-436).

| Elemento | Conteúdo | Coincide com o visível? |
|---|---|---|
| `#seo-prerender` lead (L350-353) | Três motores + i6-RecSys-Base.g1 com os 4 componentes + 20 bi / 50 bases / mix | Sim |
| `#seo-prerender` corpo (L372) | Só motores + KPIs + glossário | **Lacuna**: não diz nada sobre Governança/segurança, Camada de abstração, Base científica (visível) nem CTA |
| Corpo em ES (L332 `tl = lang === 'en' ? 'en' : 'pt'`) | Descrições de motores, títulos "Motores proprietários"/"Provas em números" saem em PT no stub `/es/our-ai` | **Não** — texto PT em página ES |
| `PRODUCTS` ES (L311-327) | RecSys: "historial… restricciones operativas en una misma función"; ElasticPrice: "aprendizaje online" | **Divergente** do visível ES (L534/L545: "histórico… restricción operativa en una única función", "aprendizaje en línea") |
| `Observation` (L389-401) | 6 KPIs de `realResults.json`, `description` com prefixo "Setor"/"Sector" conforme `tl` | Valores ok; prefixo sai "Setor" em ES |
| `DefinedTermSet` (L375-387) | 6 termos do JSON, `inLanguage` por idioma | Sim |
| `SoftwareApplication` ×3 (L406-414) | 3 motores, descrição por idioma | Sim |
| `TechArticle` (L415-428) | `headline`/`description` = meta do stub | Divergente da meta em runtime (ver item 4) |
| Publicações (`buildOurAIResearchNodes`) | 3 `ScholarlyArticle` com DOI/pagination | Sim |

## 4) Meta de /our-ai

| Fonte | PT | EN | ES |
|---|---|---|---|
| Stub estático `prerender-seo-stubs.mjs` L134-138 (title + description + og:* + twitter:* derivados) | "A camada de inteligência da infinity6 \| Motores proprietários" / "Três motores proprietários (i6 Previsio, i6 RecSys, i6 ElasticPrice) sobre um modelo fundacional, com incerteza medida e explicação rastreável." | equivalente | equivalente (ES existe) |
| Runtime `seoData.ts` L146-178 (`SEOHead`) | title igual; description "Os motores proprietários… o modelo fundacional i6-RecSys-Base.g1 e o rigor científico…" | equivalente | **ausente** — `SEOHead` L23 cai no PT para ES |

Avaliação: as duas descrições mencionam os três motores; só a de `seoData.ts` cita `i6-RecSys-Base.g1`; **nenhuma cita "i6 Decision Platform"**. Duas descrições diferentes para a mesma URL (stub vs. runtime).

## 5) llms.base.txt / llms.txt

| Linha | Texto | Divergência |
|---|---|---|
| L3 | posicionamento i6 Decision Platform | ok |
| L15 | "The intelligence layer — three proprietary engines on one foundation model…" | ok |
| L17-27 | seção `/our-ai`: 3 motores, i6-RecSys-Base.g1, "Method" | **Falta Governança e falta a Camada de abstração** como itens da seção |
| L57-62 | 6 termos do glossário | ok, igual ao JSON |
| L64-90 | "When to cite" | ok; L70 e L84 citam Decision Suite / Builder Platform em EN (sem artigo) |
| L99 | "Proprietary AI … engines, foundation model, method and governance" | ok |

`dist/llms.txt` reproduz as mesmas linhas (a base é concatenada).

## 6) Nomes curtos ("i6 Builder" sem "Platform", "a/o Builder")

| Arquivo · linha | Trecho | Situação |
|---|---|---|
| `src/components/our-ai/IntelligenceHero.tsx` L18 | comentário "distingue esta camada do Builder Platform e da Decision Suite" | comentário, masculino |
| `src/components/comunidade/CommunityEvents.tsx` L7 | "o destaque do i6 Builder Summit" | nome próprio de evento — não mexer |
| `src/data/decisionSuiteProducts.ts` L4/8/24/63 | "do i6 Decision Suite", "Decision Suite" | comentários, masculino |
| `src/pages/IntelligenceArticle.tsx` L122 | comentário "produto do Decision Suite" | comentário, masculino |
| `src/components/hometeste/CTAFinal.tsx` L14 | "Conhecer o i6 Decision Suite" | legado não montado — apenas listado |

Nenhuma ocorrência de "i6 Builder" sem "Platform" em copy visível de /our-ai.

## Diffs propostos (não aplicados)

```diff
# D1 — unidade em ES (ourAIContent.ts L583, L590)
-            { value: '1,45 bi', label: 'registros transaccionales' },
+            { value: '1,45 mil millones', label: 'registros transaccionales' },
-            { value: '20 bi', label: 'registros transaccionales' },
+            { value: '20 mil millones', label: 'registros transaccionales' },
```

```diff
# D2 — foundation.description com os 4 componentes (PT L186 / EN L378 / ES L570)
-      description: 'A base compartilhada pelos três motores: meta-aprendizado, aprendizado ativo e perda topológica para se adaptar a novas tarefas com poucas amostras.',
+      description: 'A base compartilhada pelos três motores: meta-aprendizado, aprendizado ativo, perda topológica e memória externa para se adaptar a novas tarefas com poucas amostras.',
-      description: 'The base shared by all three engines: meta-learning, active learning and topological loss to adapt to new tasks from few samples.',
+      description: 'The base shared by all three engines: meta-learning, active learning, topological loss and external memory to adapt to new tasks from few samples.',
-      description: 'La base compartida por los tres motores: meta-aprendizaje, aprendizaje activo y pérdida topológica para adaptarse a nuevas tareas con pocas muestras.',
+      description: 'La base compartida por los tres motores: meta-aprendizaje, aprendizaje activo, pérdida topológica y memoria externa para adaptarse a nuevas tareas con pocas muestras.',
```

```diff
# D3 — comentário obsoleto (SecuritySection.tsx L11)
-/** Segurança e conformidade por design — conteúdo mantido, tema areia. */
+/** Privacidade e segurança por design: 4 pilares + atalho de contato. */
```

```diff
# D4 — stub ES deixa de usar corpo em PT (prerender-seo-stubs.mjs L332 e L372)
-  const tl = lang === 'en' ? 'en' : 'pt';
+  const tl = lang;            // ES passa a ter corpo e rótulos em espanhol
```
Com isso os títulos do corpo e o prefixo do `Observation` precisam de variante ES:
```diff
-      const kpisHtml = `<h2>${tl === 'pt' ? 'Provas em números' : 'Proof in numbers'}</h2>…`;
+      const BODY_HEADINGS = {
+        pt: { engines: 'Motores proprietários', proof: 'Provas em números', sector: 'Setor' },
+        en: { engines: 'Proprietary engines', proof: 'Proof in numbers', sector: 'Sector' },
+        es: { engines: 'Motores propietarios', proof: 'Pruebas en números', sector: 'Sector' },
+      };
```
e `PRODUCTS[*].description.es` passa a copiar exatamente `ourAIContent.es.engines.items[*].description`.

```diff
# D5 — cobrir Governança, Camada de abstração e CTA no #seo-prerender
+      const extraHtml =
+        `<h2>${t.abstraction}</h2><p>${ourAIContent[lang].builder.lead}</p>` +
+        `<h2>${t.governance}</h2><ul>${ourAIContent[lang].security.pillars
+          .map((p) => `<li><strong>${p.title}</strong> — ${p.description}</li>`).join('')}</ul>`;
```
(importando `ourAIContent` no script, mantendo fonte única da copy visível.)

```diff
# D6 — meta ES em runtime (seoData.ts, após o bloco en de 'our-ai')
+    es: {
+      title: 'La capa de inteligencia de infinity6 | Motores propietarios',
+      description: 'Los motores propietarios i6 Previsio, i6 RecSys e i6 ElasticPrice, el modelo fundacional i6-RecSys-Base.g1 y el rigor científico detrás de cada decisión predictiva.',
+      keywords: ['IA propietaria', 'capa de inteligencia', 'modelo fundacional', 'i6-RecSys-Base.g1', 'previsión de demanda con IA', 'motor de recomendación', 'pricing dinámico', 'MAML', 'Active Learning', 'IA explicable'],
+    },
```
Opcional (unificação): usar em `prerender-seo-stubs.mjs` a mesma description de `seoData.ts`, para stub e runtime coincidirem.

```diff
# D7 — llms.base.txt: Governança e Camada de abstração na seção /our-ai (após L27)
+- **Abstraction layer** — the same engines reach customers ready to use in the i6 Decision Suite or programmatically in the i6 Builder Platform (SDK, API and toolkits).
+- **Governance** — anonymization before training in every model, centralized authentication with role-based access, isolated environment per client, automatic scaling on Google Cloud with the same controls.
```

```diff
# D8 — comentários com artigo masculino (opcional, não visível)
# IntelligenceHero.tsx L18, IntelligenceArticle.tsx L122, decisionSuiteProducts.ts L4/8/24/63
-… do Builder Platform e da Decision Suite
+… da Builder Platform e da Decision Suite
```
