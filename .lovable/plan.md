## Objetivo

Trazer de volta o bloco removido (anexo 1: Step 01 / Step 02 / Step 03 + chips de atributos) e inseri-lo dentro da mesma seção de "IA só precisa saber o que muda o jogo" (anexo 2), com o eyebrow laranja **"DO COMPORTAMENTO AO RESULTADO"** posicionado **acima** do título da seção.

Estrutura final da seção (uma única seção unificada em `/our-ai`):

```text
    DO COMPORTAMENTO AO RESULTADO     ← eyebrow laranja (novo, acima)
   IA só precisa saber o que muda o jogo    ← título existente

[Clareza do problema]  [Isolar o comportamento]  [Aderência contextual]   ← 3 pilares atuais

[STEP 01 Fine tuning] → [STEP 02 Necessidade específica] → [STEP 03 Resultado de negócio]
                          interesse → pesquisa → compra

  (Relevância)(Oportunidade)(Timing)(Necessidade)(Substituição)(Elasticidade)(Similaridade)(Explicabilidade)
```

O bloco de duas colunas "Clareza ao caos / Números se movem" (removido junto) **não volta** — apenas os steps + chips.

## Escopo

### 1. `src/data/staticData/ourAIContent.ts`
Estender a interface `thesis` e o conteúdo PT/EN:

- Adicionar `eyebrow: string` em `thesis`
  - PT: `'Do comportamento ao resultado'`
  - EN: `'From behavior to outcome'`
- Adicionar `stages: { label; detail }[]`, `journey: string[]` e `attributes: string[]` em `thesis` (valores recuperados do commit anterior):
  - PT stages: Fine tuning / Necessidade específica / Resultado de negócio
  - PT journey: interesse → pesquisa → compra
  - PT attributes: Relevância, Oportunidade, Timing, Necessidade, Substituição, Elasticidade, Similaridade, Explicabilidade
  - EN equivalentes recuperados do histórico

### 2. `src/components/our-ai/ThesisSection.tsx`
- Renderizar o `eyebrow` (uppercase, `tracking-[0.3em]`, `text-[#F4845F]`) **acima** do `<h2>`.
- Após o grid de 3 pilares, renderizar o bloco de steps + journey embutida no Step 02 + chips de atributos, reutilizando o markup do `UnifiedImpactSection` original (apenas a parte "Bridge / Horizontal flow / Attributes chips").
- Não recriar as duas colunas "Clareza ao caos / Números se movem".

### 3. `src/pages/OurAI.tsx`
- Nenhuma mudança necessária (já renderiza `ThesisSection`).
- Não reintroduzir `UnifiedImpactSection` nem os campos `dualValue` / `learnInfluence`.

## Notas técnicas
- Ordem visual dentro da seção: eyebrow → título → 3 pilares → steps → chips. Mantém `bg-[#0B1224]` e `max-w-6xl`.
- Sem mudanças de rota, SEO, ou i18n além dos textos citados acima.
- Sem publicação de tag; o usuário pedirá o patch depois.
