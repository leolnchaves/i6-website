

# Adicionar menu "Comunidade" no HeaderNovo

## Mudancas

### 1. Traducoes (`src/data/translations/pt.ts` e `src/data/translations/en.ts`)
- Adicionar chave `header.community` com valor `"Comunidade"` (PT) e `"Community"` (EN)

### 2. HeaderNovo (`src/components/hometeste/HeaderNovo.tsx`)
- Inserir um novo item no array `links`, entre "Cases de Sucesso" e "Contato":
  - `{ to: 'https://huggingface.co/i6-aiworks', label: t('header.community'), external: true }`
- Atualizar a renderizacao dos links para tratar links externos com `<a href="..." target="_blank" rel="noopener noreferrer">` em vez de `<Link to="...">`

### 3. FooterNovo (`src/components/hometeste/FooterNovo.tsx`)
- Adicionar o mesmo item "Comunidade" no array `navLinks` do footer, tambem como link externo

### Detalhes tecnicos
- O array `links` passara a ter uma propriedade `external?: boolean`
- Na renderizacao, um condicional decide entre `<Link>` (interno) e `<a>` (externo)
- O link externo abre em nova aba (`target="_blank"`)
- URL de destino: `https://huggingface.co/i6-aiworks`

