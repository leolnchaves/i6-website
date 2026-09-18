# Ativar o formulário de contato no fim de um artigo do i6 Blog

Objetivo: deixar um artigo de exemplo do i6 Blog com o convite de contato (nome + email) no final, para você testar o envio de um lead real.

## O que muda

Artigo escolhido: "O que dados prontos para IA quer dizer na prática" (`/pt/i6-blog/demo-dados-prontos-para-ia`), nas versões português e inglês, para você testar nos dois idiomas.

No final do artigo passa a aparecer o bloco de convite com um texto curto e os campos Nome e Email, igual ao usado nos outros conteúdos.

Texto do convite (PT): "Quer ver isso aplicado aos **seus dados**? Deixe seu contato e nosso time responde com um diagnóstico inicial."

Texto do convite (EN): "Want to see this applied to **your data**? Leave your contact and our team replies with an initial assessment."

Nada mais do artigo muda: capa, texto, tags e o restante da página seguem iguais. Nenhum outro conteúdo do blog recebe o convite.

## Detalhes técnicos

- Em `src/content/insights/demo-dados-prontos-para-ia-pt.md` e `-en.md`, adicionar ao front matter: `cta_form: true` e `cta_form_text: "..."`.
- `useInsights.ts` já lê esses campos e `InsightArticle.tsx` já renderiza `ArticleCTAForm` quando ambos estão presentes; nenhuma mudança de código é necessária.
- O envio usará `section="i6-blog"`, portanto: `source: i6-website`, `reason: i6 Blog`, `subscription: blog:demo-dados-prontos-para-ia`, `company` vazio, além dos campos de UTM/jornada.

## Validação

- Build limpo.
- Teste na prévia: abrir o artigo em PT, enviar o formulário e conferir os campos enviados (source, reason, subscription, empresa vazia).
