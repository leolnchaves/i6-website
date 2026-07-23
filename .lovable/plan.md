## Objetivo
Padronizar título/subtítulo das seções de testemunhos (Success Stories + Home) com o novo texto, em PT e EN.

## Novos textos

**PT**
- Título: `Com a palavra: quem já está decidindo antes.`
- Subtítulo: `Líderes compartilham como decisões antecipadas estão gerando impacto real nos negócios.`

**EN** (tradução proposta)
- Título: `In their words: those already deciding first.`
- Subtítulo: `Leaders share how anticipated decisions are driving real business impact.`

## Arquivos a alterar

1. `src/data/staticData/successStoriesData.ts` — blocos `en.testimonials` e `pt.testimonials` (usados por `TestimonialsSection` em /success-stories).
2. `src/data/translations/pt.ts` e `src/data/translations/en.ts` — chaves `successStories.testimonials.title` e `successStories.testimonials.subtitle` (mantém paridade com o dicionário i18n mesmo se não estiverem em uso ativo).
3. `src/components/hometeste/TestemunhosCompact.tsx` — objeto `copy` (linhas 32-38), atualizando PT e EN.

Nenhuma mudança em componentes/layout — apenas dados/textos.

## Confirmação
Ok com a tradução EN sugerida? Se preferir outra frase em inglês, me avise antes de eu implementar.