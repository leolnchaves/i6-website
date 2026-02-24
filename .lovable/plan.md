
# Redesign da pagina /contact para o novo layout

## Resumo
Migrar a pagina `/contact` do layout antigo (Layout wrapper com Header/Footer padrao, fundo branco) para o novo layout dark com ondas verticais, HeaderNovo, FooterNovo -- o mesmo padrao visual das paginas `/solutions` e `/success-stories`. Sem CTA final. Os textos existentes serao mantidos, apenas adaptados ao novo estilo visual.

## Mudancas

### 1. `src/App.tsx` -- Mover rota para fora do Layout wrapper
- Remover `/contact` de dentro do `<Layout>` wrapper
- Adicionar como rota standalone (como `/solutions` e `/success-stories`)

### 2. `src/pages/Contact.tsx` -- Reescrever estrutura da pagina
- Fundo dark `bg-[#0B1224]`
- Adicionar `VerticalWaves` (mesma posicao das outras paginas)
- Adicionar `HeaderNovo` em `z-[20]`
- Adicionar `FooterNovo` em `z-[20]`
- Adicionar `CookieConsentManager`
- Conteudo principal em `z-[10]`
- Sem CTA final
- Estrutura: ContactHero > FAQSection > ContactForm + Calendly > WorldMap > FooterNovo

### 3. `src/components/contact/ContactHero.tsx` -- Adaptar ao estilo dark
- Remover background image com blur e overlays
- Usar fundo transparente (herda o `bg-[#0B1224]` da pagina)
- Titulo em branco com destaque coral (`#F4845F`) no subtitulo, com textShadow glow (igual SolutionsHero)
- Descricao em `text-white/60`
- Padding: `pt-28 pb-0` (mesma proporcao do SolutionsHero)
- Remover hero-bg.jpg import

### 4. `src/components/contact/FAQSection.tsx` -- Adaptar cores para tema dark
- Background: transparente (sem `bg-gradient-to-b from-background`)
- Titulo e textos em branco/white
- Cards: `bg-white/5` com `border-white/10` (padrao dark das outras paginas)
- Textos de perguntas em branco, respostas em `text-white/60`
- Search input com estilo dark
- Numeros em coral `text-[#F4845F]`

### 5. `src/components/contact/ContactForm.tsx` -- Adaptar para dark
- Card com `bg-white/5 border-white/10` em vez de branco
- Titulo em branco
- Labels em `text-white/70`
- Inputs com `bg-white/10 border-white/10 text-white`
- Botao mantendo gradiente coral/azul
- Success message adaptada ao dark

### 6. `src/components/contact/CalendlySection.tsx` -- Adaptar para dark
- Card com `bg-white/5 border-white/10` (remover gradiente azul-laranja)
- Titulo e descricao em branco
- Iframe container mantido em branco (necessario para o Calendly funcionar)

### 7. `src/components/contact/WorldMap.tsx` -- Adaptar para dark
- Card com `bg-white/5 border-white/10`
- Titulo e textos em branco
- Fundo do mapa em `bg-white/5` ao inves de `bg-gray-50`

## Detalhes tecnicos

### Arquivos modificados
1. `src/App.tsx` -- mover rota
2. `src/pages/Contact.tsx` -- nova estrutura
3. `src/components/contact/ContactHero.tsx` -- estilo dark
4. `src/components/contact/FAQSection.tsx` -- estilo dark
5. `src/components/contact/ContactForm.tsx` -- estilo dark
6. `src/components/contact/CalendlySection.tsx` -- estilo dark
7. `src/components/contact/WorldMap.tsx` -- estilo dark

### Nenhum arquivo novo criado
Todos os componentes existentes serao reutilizados e adaptados.

### Padroes seguidos
- Mesmo z-index hierarchy: waves z-[15], content z-[10], header/footer z-[20]
- Mesma paleta: Navy `#0B1224`, Coral `#F4845F`, `bg-white/5`, `border-white/10`
- Mesmo hero spacing: `pt-28 pb-0` ou `pt-32 pb-16`
- Mesmo glow effect no destaque coral: `textShadow: '0 0 30px rgba(244,132,95,0.3)'`
