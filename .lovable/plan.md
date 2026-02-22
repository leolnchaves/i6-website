

# Nova Home Page - /hometeste
## Pagina 100% nova com Header, Footer e Clientes recriados na nova identidade

---

## Principio

Tudo novo. Header, Footer, Clientes - tudo recriado do zero para a nova identidade "Inteligencia de Movimento". Paleta coral/navy, ondas animadas, tom provocativo e direto. Nenhum componente existente sera alterado. A rota `/hometeste` sera adicionada **fora** do Layout wrapper atual, completamente independente.

---

## Estrutura da Pagina

```text
+------------------------------------------+
|  HEADER NOVO (dark, transparente)        |
|  Logo + Menu + Idiomas (nova paleta)     |
+------------------------------------------+
|  1. HERO                                 |
|  "Inteligencia de Movimento"             |
|  "Data moves. You Grow."                 |
|  CTA coral + ondas SVG animadas          |
+------------------------------------------+
|  2. A TESE (Ponte emocional)             |
|  Provocacao + 31% / 11% / 11%            |
+------------------------------------------+
|  3. SINAIS + COMO FUNCIONA               |
|  6 cards preditivos + credibilidade      |
+------------------------------------------+
|  4. CLIENTES (logos recriados)           |
|  Marquee horizontal na nova paleta       |
+------------------------------------------+
|  5. RESULTADOS                           |
|  KPIs reais por segmento                 |
+------------------------------------------+
|  6. CTA FINAL                            |
|  "Movimente seus dados."                 |
+------------------------------------------+
|  FOOTER NOVO (navy, coral accents)       |
|  Links + social + contato                |
+------------------------------------------+
```

---

## Detalhes por Bloco

### Header Novo
- Fundo transparente sobre o hero dark, com transicao para semi-opaco ao scroll (backdrop-blur)
- Logo (reutiliza o asset `logo-header.png` existente, que ja e branco/claro)
- Menu: Home, Solutions, Success Stories, Contact (mesmos links, mesmo `useLanguage`)
- Seletor de idioma recriado com visual adaptado (borda coral, fundo dark)
- Mobile: hamburger menu com fundo navy
- Cores: texto branco, hover coral (#F4845F), sem borda inferior

### 1. Hero
- Fundo navy (#0B1224) com ondas SVG coral animadas + particulas flutuantes
- "Inteligencia de Movimento" / "Intelligence of Movement" (Rubik bold, grande)
- "Data moves. You Grow." (subtitulo)
- Frase de apoio curta sobre transformar dados em antecipacao
- CTA coral: "Fale com um especialista" -> /contact
- Altura: 100vh

### 2. A Tese
- Fundo branco
- Pergunta provocativa ao leitor
- 31%, 11%, 11% com contagem animada (requestAnimationFrame + Intersection Observer)
- Texto de transicao empatico
- Espacamento generoso, tipografia forte

### 3. Sinais + Como Funciona
- Fundo dark (#0F172A)
- 6 cards com sinais preditivos escritos como beneficio de negocio
- Cards: fundo slate sutil, borda coral no hover, glow suave
- Linha de credibilidade tecnica abaixo: "Motores proprietarios | Fine-tuning | APIs | i6Signal"

### 4. Clientes
- Usa `usePartnersContent` para carregar logos do markdown existente
- Marquee CSS infinito (duplica a lista para loop seamless)
- Fundo transicao dark-para-claro ou vice-versa
- Logos com filtro brightness para harmonizar com a paleta

### 5. Resultados
- Fundo claro
- 4 cards por segmento (Farma, Varejo, Financeiro, Fashion)
- Numeros coral em destaque, segmento como tag
- KPIs reais do briefing

### 6. CTA Final
- Gradient coral-to-navy
- "Seus dados ja tem as respostas. So falta movimento."
- Botao branco: "Movimente seus dados" -> /contact

### Footer Novo
- Fundo navy (#0B1224)
- Logo (reutiliza `logo-footer.png`)
- Mesmos links de navegacao (Home, Solutions, Success Stories, Contact)
- Mesmos links de politicas (Privacy, Ethics)
- Mesmo email e redes sociais (LinkedIn, YouTube)
- Accents coral nos hovers em vez de orange-400
- Copyright atualizado

---

## Arquivos a Criar

1. **`src/pages/HomeTeste.tsx`** - Pagina principal, orquestra todos os blocos
2. **`src/components/hometeste/HeaderNovo.tsx`** - Header dark com scroll transition
3. **`src/components/hometeste/HeroMovimento.tsx`** - Hero com ondas e CTA
4. **`src/components/hometeste/TeseSection.tsx`** - Provocacao + contadores animados
5. **`src/components/hometeste/SinaisSection.tsx`** - Cards preditivos + credibilidade
6. **`src/components/hometeste/ClientesSection.tsx`** - Logos marquee na nova paleta
7. **`src/components/hometeste/ResultadosSection.tsx`** - KPIs por segmento
8. **`src/components/hometeste/CTAFinal.tsx`** - CTA de fechamento
9. **`src/components/hometeste/FooterNovo.tsx`** - Footer na nova identidade
10. **`src/components/hometeste/WaveBackground.tsx`** - Ondas SVG animadas
11. **`src/components/hometeste/FlowingParticles.tsx`** - Particulas CSS

## Arquivo a Alterar

- **`src/App.tsx`** - Adicionar rota `/hometeste` **fora** do Layout wrapper (linha 60), como rota independente que renderiza `HomeTeste` diretamente (sem o Header/Footer antigos)

---

## Tecnico

- Paleta: Coral #F4845F / #E8764A, Navy #0B1224 / #0F172A, Branco, Slate #94A3B8, Peach #FDE8D8
- Fonte: Rubik (ja configurada no Tailwind)
- Ondas: SVG com CSS animation (translateX loop)
- Particulas: CSS keyframes puros
- Scroll reveal: Intersection Observer com threshold
- Contadores: requestAnimationFrame
- Header scroll: useState + useEffect com scroll listener
- Textos bilingues: useLanguage inline em cada componente
- prefers-reduced-motion respeitado em todas as animacoes
- Responsivo mobile-first
- Nenhuma pagina ou componente existente sera modificado (apenas App.tsx para a rota)

