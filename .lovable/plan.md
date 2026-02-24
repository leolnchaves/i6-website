
# Migrar Privacy Policy e Ethics Policy para o Dark Layout

## Objetivo
Mover as paginas `/privacy-policy` e `/ethics-policy` do Layout antigo (fundo branco, Header/Footer antigos) para o DarkLayout (fundo escuro `#0B1224`, HeaderNovo/FooterNovo), mantendo consistencia visual com o resto do site. As ondas verticais laterais serao desativadas nessas paginas pois sao conteudo informativo de leitura.

## Mudancas

### 1. App.tsx - Mover rotas para o DarkLayout
- Remover `/privacy-policy` e `/ethics-policy` do bloco de rotas do Layout antigo
- Adicionar ambas como rotas dentro do `<Route element={<DarkLayout />}>` junto com Home, Solutions, etc.

### 2. DarkLayout.tsx - Excluir ondas verticais nas paginas de politicas
- Atualizar a logica de exibicao das `VerticalWaves` para tambem excluir `/privacy-policy` e `/ethics-policy` (alem de `/` que ja e excluido)

### 3. PrivacyPolicy.tsx - Redesign para tema escuro
- Remover hero com imagem de fundo (`heroBg`) e overlay colorido
- Criar hero simples no padrao dark, similar ao `SolutionsHero`: fundo `bg-[#0B1224]`, titulo branco, subtitulo em `text-white/60`, com `pt-28` para compensar o header fixo
- Trocar o corpo do conteudo de fundo branco (`bg-white`, textos `text-gray-700/900`) para fundo escuro com textos claros (`text-white/80` para paragrafos, `text-white` para titulos, `text-white/60` para subtitulos)
- Cards de contato: trocar `bg-gray-50` para `bg-white/5` com borda `border-white/10`
- Remover import do `heroBg`

### 4. EthicsPolicy.tsx - Mesmo redesign para tema escuro
- Mesmas mudancas aplicadas ao PrivacyPolicy: hero dark, corpo dark, cards dark
- Remover import do `heroBg`

## Detalhes tecnicos

### Paleta do tema escuro (consistente com o site)
- Fundo principal: `bg-[#0B1224]` (ja vem do DarkLayout)
- Titulos h1: `text-white`, font-bold
- Subtitulos/descricoes: `text-white/60`
- Titulos h2 de secao: `text-white`, font-bold
- Titulos h3 de subsecao: `text-white/80`, font-semibold
- Paragrafos: `text-white/70`
- Itens de lista: `text-white/70`
- Bullets das listas: cor coral via `marker:text-[#F4845F]`
- Cards informativos: `bg-white/5 border border-white/10 rounded-lg p-6`
- Separadores entre secoes: `border-white/10`

### Estrutura do hero (padrao SolutionsHero)
```text
+------------------------------------------+
|  pt-28 pb-8                              |
|                                          |
|      Titulo (text-white, bold, grande)   |
|      Subtitulo (text-white/60)           |
|      Data atualizacao (text-white/40)    |
|                                          |
+------------------------------------------+
```

### Arquivos modificados
- `src/App.tsx`
- `src/components/DarkLayout.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/EthicsPolicy.tsx`
