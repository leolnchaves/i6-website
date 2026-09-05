# Detalhes técnicos

## 1. ContactForm.tsx

- Adicionar novas chaves de conteúdo dentro do objeto `content` (PT/EN/ES):
  - `messageDescriptionCommunity`
  - `messageDescriptionBuilders`
  - `messageDescriptionDefault` (texto curto, opcional)
- Substituir o uso de `placeholder={messagePlaceholder}` no `<Textarea id="message" ...>` por:
  - Um parágrafo descritivo fixo renderizado entre o `<Label>` e o `<Textarea>`.
  - O placeholder do textarea passa a ser vazio ou um texto curto genérico (`messagePlaceholder`).
- O parágrafo descritivo deve usar estilo já existente do projeto: texto em `text-white/60`, tamanho `text-xs` ou `text-sm`, margem inferior `mb-2` (compact) ou `mb-3` (padrão).
- Manter a nota `(mínimo 10 caracteres)` ao lado do label, como está hoje.

## 2. ContactFormFields.tsx (legado)

- Adicionar novas chaves de tradução em `src/data/translations/{pt,en,es}.ts`:
  - `contact.form.messageDescription`
  - `contact.form.nameDescription`
  - `contact.form.emailDescription`
  - `contact.form.companyDescription`
  - `contact.form.phoneDescription`
- Inicialmente preencher apenas `messageDescription` com o mesmo texto das variantes community/builders; os demais podem ficar vazios para não poluir o formulário.
- Renderizar cada descrição como `<p className="...">` abaixo do `<label>` quando a chave não estiver vazia.
- Reduzir os placeholders para textos curtos genéricos (ex.: "Seu nome", "seu@email.com").

## 3. Traduções

- PT: descrição da comunidade e do builders já existem no objeto `content` do `ContactForm.tsx`; serão reaproveitadas.
- EN/ES: textos correspondentes já existem; serão reaproveitados.
- Adicionar chaves vazias/curtas no arquivo de traduções para o componente legado, mantendo consistência.

## 4. Validação e acessibilidade

- O `id="message"` e o `htmlFor="message"` permanecem intactos.
- A descrição fixa pode ser associada ao campo via `aria-describedby="message-description"` para leitores de tela.
- Nenhuma alteração nas regras de validação (`minLength: 10`, campos obrigatórios, etc.).

## 5. Verificação

- Rodar checagem de tipos (`npx tsgo --noEmit`).
- Rodar build (`bun run build`).
- Verificar visualmente no preview os três contextos: `/contact`, `/community` e `/i6-builders`.
