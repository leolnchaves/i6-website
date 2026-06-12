# Alinhar rótulos das landings entre menu (header/footer) e título no topo da página

## Problema

1. No menu em PT, os 4 itens de landing aparecem em inglês (`Demand & Supply Efficiency`, `Data Monetization & Strategy`, `Predictive Operations`, `Behavior & Conversion`) — ambos `pt.ts` e `en.ts` têm os mesmos valores em inglês.
2. O kicker da página (ex.: `Eficiência · Demanda & Oferta`) usa rótulo diferente do menu, criando inconsistência.

## Mudanças

### 1) Traduções do menu — `src/data/translations/pt.ts` e `src/data/translations/en.ts`


| chave                                 | EN (en.ts)                   | PT (pt.ts)                           |
| ------------------------------------- | ---------------------------- | ------------------------------------ |
| `header.solutions.demandSupply`       | `Demand & Supply`            | `Demanda & Supply`                   |
| `header.solutions.dataMonetization`   | `Data Monetization Strategy` | `Estratégia de Monetização de Dados` |
| `header.solutions.predictiveOps`      | `Predictive Operations`      | `Operações Preditivas`               |
| `header.solutions.behaviorConversion` | `Behavior & Conversion`      | `Comportamento & Conversão`          |


Header e Footer já consomem essas chaves, então atualizam automaticamente.

### 2) Hero kicker dos 8 MDs — alinhar o termo depois de `Eficiência ·` / `Efficiency ·` ao menu


| Arquivo                                               | hero_kicker novo                                     |
| ----------------------------------------------------- | ---------------------------------------------------- |
| `src/content/landings/demand-supply-efficiency-pt.md` | `Eficiência · Demanda & Supply`                      |
| `src/content/landings/demand-supply-efficiency-en.md` | `Efficiency · Demand & Supply`                       |
| `src/content/landings/data-monetization-pt.md`        | `Lucratividade · Estratégia de Monetização de Dados` |
| `src/content/landings/data-monetization-en.md`        | `Profitability · Data Monetization Strategy`         |
| `src/content/landings/predictive-operations-pt.md`    | `Eficiência · Operações Preditivas`                  |
| `src/content/landings/predictive-operations-en.md`    | `Efficiency · Predictive Operations`                 |
| `src/content/landings/behavior-conversion-pt.md`      | `Crescimento · Comportamento & Conversão`            |
| `src/content/landings/behavior-conversion-en.md`      | `Growth · Behavior & Conversion`                     |


## Não alterado

- `hero_headline` (frase de marketing exibida como H1 — não foi pedido)
- `title` no front-matter (usado em SEO/JSON-LD)
- Rotas, slugs, nomes de arquivos