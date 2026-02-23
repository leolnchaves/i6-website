

## Plano: Redesign da pagina /solutions com a identidade visual da nova Home

### Contexto visual

A nova home usa uma identidade marcante:
- **Fundo escuro** `#0B1224` (navy) como base
- **Accent coral** `#F4845F` para destaques
- **Tipografia branca** com opacidades (white/60, white/80)
- **Cards escuros** com `bg-white/5`, `border-white/10`
- **Header transparente** sobre fundo escuro (HeaderNovo)
- **Footer escuro** integrado (FooterNovo)
- **WaveBackground** como elemento visual do hero
- **Badges** em capsulas (`bg-[#F4845F]/20 text-[#F4845F]`)

A pagina /solutions atual usa:
- Header branco fixo (Layout padrao)
- Footer do Layout padrao
- Hero com imagem de fundo e gradiente azul/roxo
- Secao de metricas em cinza claro
- Cards brancos com fundo claro (`bg-gray-50`)
- CTA em fundo cinza claro com botao laranja
- ProcessFlow com fundo `gray-50 to blue-50`

### O que muda

---

#### 1. Tirar do Layout padrao e usar HeaderNovo + FooterNovo

**Antes:** A pagina /solutions esta dentro do `<Layout>` que usa o Header branco e Footer padrao.

**Depois:** Igual a nova Home - fora do Layout, com `HeaderNovo` e `FooterNovo` proprios, fundo escuro `bg-[#0B1224]`.

**Justificativa:** Manter consistencia visual completa com a Home. O header transparente sobre fundo escuro e parte da identidade.

**Arquivo:** `src/App.tsx` - mover rota `/solutions` para fora do Layout, e `src/pages/Solutions.tsx` - adicionar HeaderNovo/FooterNovo.

---

#### 2. Hero - Redesign completo

**Antes:**
- Imagem de fundo com blur + overlay azul/roxo
- Titulo: "Transform Your Business" + "AI-Powered Solutions" (gradiente laranja-azul)
- Descricao generica

**Depois:**
- Fundo `#0B1224` + `WaveBackground` (mesmo efeito da Home)
- Titulo mais direto e alinhado ao posicionamento: **"Solucoes que antecipam o mercado"** (PT) / **"Solutions that anticipate the market"** (EN)
- Subtitulo coral: **"Da inteligencia de dados a acao."** / **"From data intelligence to action."**
- Sem imagem de fundo - visual limpo e premium como o hero da Home

**Justificativa:** O titulo atual "Transforme seu Negocio / Solucoes de IA Aplicadas" e generico e nao reflete o posicionamento de "movimento" e "antecipacao" que a nova Home estabelece. O novo titulo conecta diretamente com a narrativa.

---

#### 3. Metricas (banner rotativo) - Visual escuro

**Antes:** Fundo cinza claro (`slate-200/80 to gray-300/90`), texto escuro.

**Depois:** Fundo `#0F172A` (navy mais claro), texto branco/coral. Manter o carrossel rotativo mas com o visual escuro.

**Justificativa:** Consistencia com a paleta escura. A versao clara destoa completamente da nova identidade.

---

#### 4. Grid de Solucoes - Cards escuros

**Antes:** Cards brancos (`bg-white/95`) sobre fundo claro (`gray-50/50 to blue-50/30`), gradientes azul-laranja nos detalhes.

**Depois:**
- Fundo da secao: `#0B1224`
- Cards: `bg-white/5` com `border-white/10`, hover com `border-[#F4845F]/50`
- Textos brancos com opacidades
- Badges de engine em coral
- Accent bar em coral ao inves de gradiente azul-laranja

**Justificativa:** E a mudanca mais impactante. Os cards brancos sobre fundo cinza sao o oposto da identidade escura da Home.

---

#### 5. Process Flow (Jornada de Implementacao) - Fundo escuro

**Antes:** Fundo `gray-50 to blue-50`, cards brancos, circulos de step em tons de cinza/verde.

**Depois:**
- Fundo `#0B1224`
- Card principal: `bg-white/5` com `border-white/10`
- Cores dos steps: coral para ativo, verde para completo, `white/30` para pendente
- Task cards com fundo `bg-white/5`
- Timeline em coral/verde sobre fundo escuro

**Justificativa:** Manter a unidade visual. O fundo claro atual quebra a experiencia.

---

#### 6. CTA Final - Estilo da Home

**Antes:** Fundo `gray-50`, titulo preto, botao com gradiente laranja.

**Depois:** Mesmo estilo do CTAFinal da Home - gradiente `from-[#F4845F] via-[#E8764A] to-[#0B1224]`, texto branco, botao branco com texto escuro, destaque na palavra "movimento"/"movement".

**Textos atuais:**
- "Pronto para Transformar Seu Negocio?" / "Ready to Transform Your Business?"
- "Entre em contato com nossos especialistas..."

**Textos novos:**
- PT: "Seus dados ja tem as respostas. So falta **movimento**."
- EN: "Your data already has the answers. All it needs is **movement**."
- CTA: "Pronto para transformar dados em lucro?" / "Ready to turn data into profit?"

**Justificativa:** Reutilizar o componente CTAFinal da Home para consistencia total, evitando duplicacao de codigo e mantendo a mensagem alinhada.

---

#### 7. Sandbox Environment - Visual escuro

**Antes:** Card com gradiente laranja-vermelho sobre fundo claro.

**Depois:** Card com borda coral `border-[#F4845F]/30`, fundo `bg-white/5`, texto branco. Mais sutil e integrado ao fundo escuro.

---

### Resumo visual da transformacao

```text
ANTES                          DEPOIS
+---------------------------+  +---------------------------+
| Header BRANCO fixo        |  | HeaderNovo TRANSPARENTE   |
+---------------------------+  +---------------------------+
| Hero: imagem blur +       |  | Hero: #0B1224 + Waves     |
| gradiente azul/roxo       |  | "Solucoes que antecipam"  |
| "Transforme seu Negocio"  |  | Coral accent              |
+---------------------------+  +---------------------------+
| Metricas: fundo CINZA     |  | Metricas: fundo NAVY      |
| texto escuro              |  | texto branco              |
+---------------------------+  +---------------------------+
| Cards BRANCOS             |  | Cards ESCUROS             |
| fundo claro               |  | bg-white/5, border-white  |
+---------------------------+  +---------------------------+
| ProcessFlow: fundo CLARO  |  | ProcessFlow: fundo NAVY   |
| cards brancos             |  | cards bg-white/5          |
+---------------------------+  +---------------------------+
| CTA: fundo CINZA          |  | CTA: gradiente coral+navy |
| texto preto               |  | "So falta movimento"      |
+---------------------------+  +---------------------------+
| Footer PADRAO             |  | FooterNovo ESCURO         |
+---------------------------+  +---------------------------+
```

### Detalhes tecnicos

**Arquivos a modificar:**
1. `src/App.tsx` - Mover rota `/solutions` para fora do Layout (ao lado da rota `/`)
2. `src/pages/Solutions.tsx` - Envolver com HeaderNovo/FooterNovo, fundo escuro
3. `src/components/solutions/SolutionsHero.tsx` - Redesign completo com WaveBackground
4. `src/components/solutions/SolutionsMetricsSection.tsx` - Paleta escura
5. `src/components/solutions/StaticSolutionsGrid.tsx` - Fundo escuro
6. `src/components/solutions/ModernSolutionCard.tsx` - Card escuro
7. `src/components/solutions/AnimatedProcessFlow.tsx` - Paleta escura completa
8. `src/components/solutions/SandboxEnvironment.tsx` - Card escuro
9. `src/components/solutions/SolutionsCTA.tsx` - Substituir pelo estilo CTAFinal
10. `src/data/staticData/solutionsHeroData.ts` - Novos textos do hero
11. `src/data/staticData/solutionsCTAData.ts` - Novos textos do CTA
12. `src/components/hometeste/FooterNovo.tsx` - Corrigir link Home de `/hometeste` para `/`

**Nenhum arquivo novo** sera criado - tudo e refatoracao dos existentes.

