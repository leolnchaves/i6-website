# Seção da URL como base do rótulo dos leads de conteúdo

## Relatório da investigação

**1. Rotas e componentes**

- `/{idioma}/i6-blog/:slug` → renderiza direto a página de artigo (`InsightArticle`).
- `/{idioma}/i6-intelligence/:slug` → passa por um seletor (`IntelligenceOrInsightArticle`) que decide:
  - é peça de research → página de research (`IntelligenceArticle`, sempre `kind="research"`);
  - é eBook → **a mesma página de artigo do blog** (`InsightArticle`, sempre `kind="insight"`);
  - é artigo antigo → redireciona para `/i6-blog/<slug>`;
  - nada encontrado → volta para `/i6-intelligence`.

Ou seja: existem duas rotas distintas, mas a página de artigo é compartilhada pelas duas seções — daí a incoerência atual.

**2. Existe sinal confiável da seção no ponto do formulário?**

Sim, mas hoje não é usado. A página de artigo não recebe nenhuma prop de seção; o único sinal disponível é o `pathname` do router. `stripLangPrefix` remove só o prefixo de idioma (`/pt`, `/en`, `/es`) e não normaliza barra final — um caminho como `/pt/i6-blog/slug/` deixa segmento vazio no fim. Qualquer leitura de pathname precisa cortar barras nas duas pontas antes de comparar o primeiro segmento.

**3. Mecanismo proposto**

Opção escolhida: **prop explícita `section` (`'i6-blog' | 'i6-intelligence'`) passada pela camada de rota**, com o seletor de `/i6-intelligence` sempre passando `'i6-intelligence'` e a rota de `/i6-blog` passando `'i6-blog'`.

- Prós: determinístico, testável, sem dependência de formato de URL nem de barra final; ao adicionar uma seção nova, o erro aparece na compilação em vez de silenciosamente cair no valor padrão.
- Contras: exige encadear a prop pela página de artigo até os dois formulários.

Alternativa (ler pathname dentro do formulário): menos código, mas frágil — depende de normalização de barra/idioma, quebra em pré-visualizações com prefixo, e falha silenciosamente numa seção nova (cairia no rótulo padrão).

**4. Pontos que passam a seguir a seção**

Em `LeadGateForm` e `ArticleCTAForm`:

- `reason` → "i6 Deep Research" em /i6-intelligence, "i6 Blog" em /i6-blog.
- Rótulo da mensagem: a etiqueta (`[Lead Research]` / `[Lead Insights]`, e as versões `... CTA`) e o rótulo do ID (`Research:` / `Insight:`).
- Campo de assunto: `research:<slug>` vs `insight:<slug>` (gate) e `research:<slug>` vs `blog:<slug>` (CTA) — mantendo cada string exatamente como hoje, só trocando o critério.
- `basePath` usado para montar a URL do conteúdo na mensagem (`i6-intelligence` / `insights`) — este é o item extra não listado no pedido: hoje ele deriva de `kind`, então um eBook em /i6-intelligence grava uma URL `/insights/...` que não corresponde à página real. Passa a seguir a seção, usando `i6-blog` para a seção de blog (a URL atual `/insights/...` é a rota antiga).
- O campo `Origem:` na mensagem e o parâmetro de origem interna continuam derivados de `kind` (não estão na lista de mudança).

**5. Analytics e chave de desbloqueio**

Confirmado: ambos continuam em `kind`, sem alteração.

- Eventos disparados no envio (research desbloqueado / download de insight concluído; CTA de research / CTA de insight, incluindo as chaves `${kind}_id` e `${kind}_slug`) — intocados, série histórica preservada.
- Chave de "já desbloqueou" (`i6_unlocked_research:` / `i6_unlocked_insight:` + slug + idioma) — intocada, ninguém revê o formulário.

A prop `section` é nova e independente: nenhuma das duas leituras passa a consultá-la.

## Mudanças a implementar

1. `LeadGateForm` e `ArticleCTAForm`: nova prop obrigatória `section: 'i6-blog' | 'i6-intelligence'`; `reason`, etiqueta, rótulo do ID, campo de assunto e `basePath` passam a derivar dela; `kind` permanece para eventos, chave de desbloqueio, `Origem:` e origem interna.
2. Página de research: passa `section="i6-intelligence"` nos dois formulários.
3. Página de artigo (compartilhada): recebe a seção da camada de rota e repassa aos formulários.
4. Rota `/i6-blog/:slug`: passa `i6-blog`. Seletor de `/i6-intelligence/:slug`: passa `i6-intelligence` (o caso de artigo antigo continua redirecionando para /i6-blog, então chega lá como blog).

Sem mudança de aparência, validações, campos de UTM/jornada, `insight_id` ou endpoint.

## Validação

- Compilação sem erros.
- Envio de teste na pré-visualização: eBook sob /i6-intelligence (esperado `reason = "i6 Deep Research"`, etiqueta de research, assunto `research:<slug>`, URL da mensagem em /i6-intelligence) e artigo sob /i6-blog (esperado `reason = "i6 Blog"`).
- Conferir que a chave de desbloqueio gravada e o evento disparado continuam os mesmos de hoje para o mesmo conteúdo.

## Verificação do link (basePath) — resultado

**1. O que /insights/&lt;slug&gt; faz hoje:** a rota existe e resolve. Ela carrega a mesma página de artigo e, pelo tipo da peça, redireciona: artigo de blog → `/i6-blog/<slug>`; eBook → `/i6-intelligence/<slug>`; conteúdo de mídia permanece em `/insights/<slug>`. Ou seja, o link antigo **não dá 404** — chega ao conteúdo certo por redirecionamento. O único efeito colateral conhecido é o redirecionamento não preservar parâmetros de campanha (bug já identificado antes, fora deste escopo).

**2. É histórico?** Sim. O `basePath` derivado do tipo existe desde a criação dos dois formulários (6/8/2026), antes de a seção /i6-blog existir; não foi introduzido nesta sessão. Nenhum código do site lê ou interpreta o texto da mensagem do lead — ele é gravado como texto na planilha. Não há automação no repositório dependente desse formato; se houver algum filtro manual/planilha do lado do HUB, isso está fora do que consigo inspecionar.

**3. Volume afetado:** não é possível contar daqui — não tenho acesso à planilha. Dá para identificar filtrando as linhas cuja mensagem contém "/insights/" (e cruzando com as linhas de gate/CTA de conteúdo).

**Conclusão prática:** o link não está quebrado, só desatualizado. Corrigir o `basePath` junto com a mudança de seção é seguro e de baixo risco; deixá-lo como está também não quebra nada.
