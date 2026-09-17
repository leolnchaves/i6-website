# Corrigir o campo empresa nos formulários de conteúdo

## O que está errado hoje

Nos formulários de conteúdo — o de liberação (gate) e o que aparece dentro do artigo — o campo **empresa** é gravado com o **título do artigo/research**. Esses formulários só pedem nome e e-mail, então nunca houve empresa real ali. O comportamento existe desde 6 de agosto de 2026 e não foi introduzido pela padronização de origem/razão desta sessão.

Contato, i6 Builders e Comunidade já gravam a empresa digitada pelo usuário e não mudam.

## Investigação (concluída)

1. UI do gate e do CTA de artigo: apenas nome e e-mail (mais o campo invisível anti-robô). Nunca teve empresa.
2. O valor vem de uma atribuição direta `company: title` no envio — não é fallback, nem sobra de razão.
3. Pré-existente desde a criação dos dois formulários (6/8/2026); a mudança desta sessão tocou só a razão.
4. Contato / i6 Builders / Comunidade estão corretos. O Ebook do Kiosk tem o mesmo padrão, mas fica fora.
5. Provavelmente todos os leads de conteúdo desde 6/8/2026 têm título no campo empresa. Identificáveis na planilha pelas linhas com razão "i6 Blog" ou "i6 Deep Research".

## Mudança

Enviar empresa **vazia** nos dois formulários de conteúdo. O título continua indo no corpo da mensagem (com slug, ID e URL), então nenhuma informação é perdida.

Fora de escopo: aparência dos formulários, validações, razão/origem, dados de UTM e jornada, identificador de conteúdo, e o Ebook do Kiosk.

## Detalhes técnicos

- `src/components/insights/LeadGateForm.tsx` (linha 143): `company: title` → `company: ''`.
- `src/components/insights/ArticleCTAForm.tsx` (linha 119): `company: title` → `company: ''`.
- `title` continua usado na montagem da mensagem e nas dependências do callback — sem variável órfã.
- Não tocar em `src/components/kiosk/EbookCTA.tsx`, `src/lib/leadFormConfig.ts` nem em `src/lib/tracker.ts`.

## Validação

- Build sem erros.
- Envio de teste na prévia em um gate de research e em um CTA de artigo do blog, confirmando na planilha: empresa vazia, razão com o rótulo esperado e origem "i6-website".

## Limpeza dos leads antigos (opcional, fora desta mudança)

A correção não altera as linhas já gravadas. Se quiser, depois eu indico como filtrar e limpar o campo empresa desses leads históricos na planilha.
