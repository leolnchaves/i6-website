# Auditoria GEO v10 — Pós-deploy

Status: **template** — preencher após o próximo deploy estabilizar (≈ 5 min de propagação no GitHub Pages).

Fases auditadas: 1–12 do Plano GEO v10.1.

---

## 1. Rich Results Test (Google)

Rodar em https://search.google.com/test/rich-results para cada URL abaixo. Anotar:
verdes (válido), amarelos (avisos não-bloqueantes), vermelhos (erros).

| URL | Tipos esperados | Status | Notas |
|---|---|---|---|
| https://infinity6.ai/pt | Organization, ItemList | ⬜ | |
| https://infinity6.ai/en | Organization, ItemList | ⬜ | |
| https://infinity6.ai/pt/our-ai | SoftwareApplication (×4), DefinedTermSet, Observation | ⬜ | |
| https://infinity6.ai/en/our-ai | SoftwareApplication (×4), DefinedTermSet, Observation | ⬜ | |
| https://infinity6.ai/pt/solutions/demand-supply-efficiency | Service, BreadcrumbList, FAQPage | ⬜ | |
| https://infinity6.ai/pt/solutions/data-monetization | Service, BreadcrumbList, FAQPage | ⬜ | |
| https://infinity6.ai/pt/solutions/predictive-operations | Service, BreadcrumbList, FAQPage | ⬜ | |
| https://infinity6.ai/pt/solutions/behavior-conversion | Service, BreadcrumbList, FAQPage | ⬜ | |
| https://infinity6.ai/pt/i6-intelligence | (hub) | ⬜ | |
| https://infinity6.ai/pt/i6-intelligence/ruptura-gondola-ia-preditiva | Article, FAQPage | ⬜ | |
| https://infinity6.ai/pt/success-stories | (hub) | ⬜ | |
| https://infinity6.ai/pt/success-stories/<slug> | Article | ⬜ | |

---

## 2. Validação manual JSON-LD

`https://validator.schema.org/` — 1 amostra por tipo, colar o stub estático (`view-source:`).

| Tipo | Amostra | Resultado |
|---|---|---|
| Organization | /pt | ⬜ |
| Service | /pt/solutions/demand-supply-efficiency | ⬜ |
| BreadcrumbList | qualquer landing | ⬜ |
| FAQPage | landing com `## FAQ` | ⬜ |
| Article | /pt/i6-intelligence/ruptura-gondola-ia-preditiva | ⬜ |
| DefinedTermSet | /pt/our-ai (#glossario) | ⬜ |
| Observation | /pt/our-ai (KPIs) | ⬜ |
| SoftwareApplication | /pt/our-ai (×4 engines) | ⬜ |

---

## 3. Google Search Console

- [ ] `sitemap.xml` submetido em `https://infinity6.ai/sitemap.xml`
- [ ] Cobertura das 4 landings (×2 idiomas) sem erros
- [ ] Cobertura do `/our-ai` (×2 idiomas) sem erros
- [ ] Monitorar GSC > Performance por 14 dias após o deploy

---

## 4. Citações em LLMs

Capturar respostas (texto integral + data) em ChatGPT, Gemini, Perplexity e Claude.

| Prompt | ChatGPT | Gemini | Perplexity | Claude |
|---|---|---|---|---|
| "o que é i6 Previsio?" | ⬜ | ⬜ | ⬜ | ⬜ |
| "o que é i6-RecSys-Base.g1?" | ⬜ | ⬜ | ⬜ | ⬜ |
| "como reduzir ruptura de gôndola no varejo farma com IA?" | ⬜ | ⬜ | ⬜ | ⬜ |
| "quem é infinity6?" | ⬜ | ⬜ | ⬜ | ⬜ |
| "empresas brasileiras de IA proprietária para varejo" | ⬜ | ⬜ | ⬜ | ⬜ |
| "como monetizar dados de clientes no varejo" | ⬜ | ⬜ | ⬜ | ⬜ |

Critério de sucesso: ≥ 3 dos 4 LLMs citam infinity6 nominalmente em pelo menos 4 dos 6 prompts.

---

## 5. Lighthouse

Rodar em modo Mobile, perfil "Performance + SEO + Best Practices + Accessibility".

| Página | Performance | SEO | Best Practices | Accessibility |
|---|---|---|---|---|
| /pt | ⬜ | ⬜ (meta ≥ 90) | ⬜ (meta ≥ 90) | ⬜ |
| /pt/our-ai | ⬜ | ⬜ | ⬜ | ⬜ |
| /pt/solutions/demand-supply-efficiency | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 6. Ajustes residuais

Lista após preencher 1–5. Vazia até a primeira passada da auditoria.

- [ ] —
