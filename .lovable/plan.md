## Nova seção "Como Funciona" acima do i6Signal

Criar `src/components/hometeste/ComoFuncionamosSection.tsx` e inseri-lo em `HomeTeste.tsx` logo acima de `SinaisSection`.

**Diretriz principal:** manter o design system atual do site (padrões de `SinaisSection`, `InsightsSection`, etc.) — mesma tipografia, mesmos tokens coral `#F4845F`, mesma linguagem de cards `rounded-2xl bg-white/5 border border-white/10`, mesmos badges e espaçamentos. O anexo é apenas referência conceitual da estrutura (eyebrow, título, 4 passos numerados, faixa lateral) — **não copiar o visual do anexo literalmente**.

### Diferenciação de fundo

Único desvio deliberado do padrão: fundo levemente mais claro que o `#0B1224` da home para criar alívio visual entre `HeroDecisaoV4` e `SinaisSection`. Usar `#111a30` (ou gradiente sutil), mantendo coerência com a paleta.

### Estrutura da seção (top → bottom)

1. **Header** (padrão do site)
   - Badge coral estilo `SinaisSection`: `COMO FUNCIONA` / `HOW IT WORKS`
   - Título h2 com destaque coral em trecho final: "Como transformamos sinais em **decisões acionáveis**"
   - Subtítulo curto white/50.

2. **Faixa de ORIGENS de dados** (nova — antes do passo 01)
   - Rótulo pequeno à esquerda: "Capturamos de qualquer ecossistema" / "We capture from any ecosystem"
   - Chips minimalistas em linha (wrap): Oracle, SAP, Snowflake, Databricks, BigQuery, PostgreSQL, S3, Salesforce, MongoDB, Redshift, Kafka
   - Estilo dos chips: mesmo padrão dos differentiators de `EnginesGrid` (`rounded-full border border-white/10 bg-white/[0.02]`), com ícone `lucide-react` monocromático (`Database`, `Cloud`, `Server`).
   - Linha vertical fina coral conectando à seção dos passos (mesmo estilo do connector já usado em `SinaisSection` e `EnginesGrid`).

3. **4 passos numerados** (sem ícones — apenas numeração)
   - Grid `grid-cols-1 md:grid-cols-4 gap-6`.
   - Cada card: mesmo padrão `p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50` de `SinaisSection`.
   - Conteúdo do card: número grande em coral (ex: `01` em ~48px, font-bold, opacidade/tratamento discreto) + título white + descrição white/70.
   - Textos:
     - 01 — Captura de sinais → Demanda, preço, estoque, comportamento e contexto de mercado.
     - 02 — Predição → **Modelos proprietários** identificam risco, intenção, elasticidade e propensão.
     - 03 — Recomendação priorizada → A melhor ação por objetivo, canal, cliente, SKU ou praça.
     - 04 — Ativação → A decisão chega à operação no ecossistema do cliente.
   - **Sem** a faixa "Entrega em → CRM | Pricing | Supply | Sales" do anexo.

4. **Faixa de ATIVAÇÃO / ECOSSISTEMA** (nova — depois do passo 04)
   - Rótulo: "Ativamos em qualquer ecossistema do cliente" / "We activate in any client ecosystem"
   - Mesmo padrão visual dos chips da faixa de origens (consistência), mas com ferramentas de ativação: CRM, ERP, Salesforce, HubSpot, SAP, Shopify, App, WhatsApp, E-mail, Push, POS.
   - Cada chip com ícone `lucide-react` apropriado (`Users`, `Boxes`, `Smartphone`, `MessageSquare`, `Mail`, `Bell`, `ShoppingBag`).
   - Layout: chips em rede com linhas finas coral conectando alguns entre si (SVG discreto de fundo), transmitindo a ideia de "conectado em qualquer ecossistema" sem quebrar o padrão minimalista do site.

### Internacionalização

Todos os textos via `useLanguage()` no padrão dos demais componentes de `hometeste/`. Nomes de ferramentas permanecem iguais em ambos idiomas.

### Arquivos afetados

- **Criar:** `src/components/hometeste/ComoFuncionamosSection.tsx`
- **Editar:** `src/pages/HomeTeste.tsx` — inserir `<ComoFuncionamosSection />` acima de `<SinaisSection />`

Nenhuma outra alteração no site.
