# i6Hub CMS — Setup do site infinity6

Arquitetura: o **i6Hub** vira o painel admin dos artigos do site
`infinity6.ai`. Quando um artigo muda no i6Hub, um webhook dispara um
`repository_dispatch` no GitHub deste repo, o GitHub Actions roda
`scripts/sync-insights.mjs`, regenera os `.md` e publica no GitHub Pages.

```
i6Hub (admin)  ─►  webhook  ─►  GitHub Actions  ─►  sync + build  ─►  GH Pages
```

---

## Checklist de execução (na ordem)

### ✅ Parte A — Site (já implementado neste repo)

- `scripts/sync-insights.mjs`
- `scripts/seed-insights-to-i6hub.mjs`
- `.github/workflows/deploy-gh-pages.yml` (com trigger `repository_dispatch: [insights-updated]`)
- `src/content/insights/README.md` atualizado

### 🔲 Parte B — Você cria 1 GitHub Personal Access Token (PAT)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
2. **Token name:** `i6hub-dispatch-i6-website`
3. **Expiration:** 1 ano (ou o que preferir)
4. **Repository access:** Only select repositories → escolha o repo deste site
5. **Repository permissions:**
   - `Contents`: Read and write
   - `Metadata`: Read-only (auto)
   - `Actions`: Read and write
6. **Generate token** → copia o token (`github_pat_...`).
7. Me avisa **"tenho o token"** que eu te ajudo a colar no i6Hub.

### 🔲 Parte C — No projeto i6Hub: cole o prompt abaixo

Abra o projeto **i6hub** no Lovable e cole o prompt da seção
[**“Prompt para colar no i6Hub”**](#prompt-para-colar-no-i6hub) abaixo.

A IA de lá vai:
1. Criar a tabela `public_insights` com RLS isolada (sem FK para leads/CRM)
2. Criar a aba **Site Content** dentro de Marketing & CRM → Content Radar
3. Criar a edge function `notify-site-rebuild` + trigger Postgres
4. Pedir o secret `GITHUB_DISPATCH_TOKEN` (você cola o PAT do passo B)

### 🔲 Parte D — Você cria 2 GitHub Secrets neste repo

No i6Hub você vai pegar a URL do Supabase e o `service_role` key. Então:

1. GitHub → repo deste site → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. Crie `I6HUB_SUPABASE_URL` (valor: `https://<ref>.supabase.co` do i6Hub)
3. Crie `I6HUB_SUPABASE_SERVICE_KEY` (valor: service_role key do i6Hub)

> ⚠️ A service_role key bypassa RLS. Está OK aqui porque a tabela
> `public_insights` é **isolada** e não toca leads/CRM. Mesmo assim, só
> existe em GitHub Secrets — nunca no código.

### 🔲 Parte E — Seed dos 4 artigos existentes (one-shot, local)

```bash
export I6HUB_SUPABASE_URL="https://<ref>.supabase.co"
export I6HUB_SUPABASE_SERVICE_KEY="<service-role-key>"
node scripts/seed-insights-to-i6hub.mjs
```

### 🔲 Parte F — Teste end-to-end

1. No i6Hub, crie um insight com `published = false` → confirme que **não** aparece em `https://infinity6.ai/pt/insights`.
2. Toggle `published = true` → webhook dispara → deploy roda em ~1–2 min → aparece.
3. Toggle `featured = true` → aparece na home.
4. Toggle `published = false` de novo → some no próximo deploy.

---

## Prompt para colar no i6Hub

Copie tudo entre as linhas `=====` e cole no chat do projeto **i6hub** no Lovable.

```
=====
Vou te dar uma tarefa grande. Execute na ordem.

CONTEXTO
========
O site público infinity6.ai (projeto Lovable separado, repo no GitHub) vai
passar a consumir os "Insights" (artigos / menções na mídia) deste i6Hub
como CMS. Arquitetura:

  i6Hub (admin) → webhook GitHub repository_dispatch → GitHub Actions
                  → sync script regera .md → vite build → GH Pages

O site continua 100% estático. Você (i6Hub) vira o painel admin.

REGRA DE SEGURANÇA CRÍTICA
==========================
A tabela `public_insights` é COMPLETAMENTE ISOLADA. Sem FK para nada
sensível (leads, CRM, deals, etc). A service_role key será usada pelo
GitHub Actions do site público — então qualquer dado em public_insights é
potencialmente público. NUNCA referencie auth.users, leads, deals,
contacts, etc nessa tabela.

PASSO 1 — Migration `public_insights`
=====================================
Crie via supabase--migration:

create table public.public_insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  language text not null check (language in ('pt','en')),
  title text not null,
  type text not null default 'article',
  date date not null default current_date,
  cluster text,
  excerpt text,
  content text,
  cover_image text,
  external_url text,
  read_time int,
  featured boolean not null default false,
  published boolean not null default false,
  gated boolean not null default false,
  asset_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, language)
);

grant select on public.public_insights to anon;
grant select, insert, update, delete on public.public_insights to authenticated;
grant all on public.public_insights to service_role;

alter table public.public_insights enable row level security;

create policy "public read of published insights"
  on public.public_insights for select
  to anon using (published = true);

create policy "authenticated read all"
  on public.public_insights for select
  to authenticated using (true);

create policy "authenticated write all"
  on public.public_insights for all
  to authenticated using (true) with check (true);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_public_insights_updated_at
before update on public.public_insights
for each row execute function public.set_updated_at();

PASSO 2 — Aba "Site Content" no Content Radar
=============================================
Edite src/components/CrmSidebar.tsx:

Em `contentAgentItems` (~linha 237), ADICIONE como último item:
  { id: "site-content", label: t('sidebar.siteContent'), icon: "file-text", route: "/site-content" },

Adicione a chave i18n `sidebar.siteContent` em src/i18n/locales/pt.ts e en.ts:
  pt → "Site Content"
  en → "Site Content"

Crie src/pages/SiteContent.tsx — uma página CRUD para public_insights:
- Lista filtrável: por idioma (pt/en/todos), status (publicado/rascunho/todos),
  tipo. Busca por título/slug.
- Botão "Novo insight" abre dialog com form (todos os campos do schema).
- Editor markdown: textarea grande + preview ao lado (use react-markdown se
  já estiver instalado; senão só textarea).
- Toggles destacados: **Publicado** (badge verde/cinza) e **Destacar na home** (estrela).
- Ação por linha: Editar / Despublicar (set published=false) / Excluir definitivamente (confirma 2x).
- Use o mesmo visual das outras páginas do i6Hub (Radar, Campaigns) — Card,
  Table, Dialog, Button, Switch, Input do shadcn.
- Use o supabase client já existente em @/integrations/supabase/client.

Registre a rota em src/App.tsx (junto das outras do Content Radar, ~linha 237):
  const SiteContentPage = lazy(() => import("./pages/SiteContent"));
  <Route path="/site-content" element={<SiteContentPage />} />

Auth já é herdado do AuthenticatedApp wrapper — nada a fazer.

PASSO 3 — Edge function `notify-site-rebuild` + trigger
=======================================================
1. Use add_secret para pedir ao usuário o secret:
   - GITHUB_DISPATCH_TOKEN  (PAT fine-grained do repo i6-website com Contents+Actions R/W)
   Diga: "Cole aqui o PAT do GitHub criado para acionar rebuild do site público."

2. Crie supabase/functions/notify-site-rebuild/index.ts:

import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const token = Deno.env.get('GITHUB_DISPATCH_TOKEN');
  if (!token) return new Response('missing token', { status: 500, headers: corsHeaders });

  // === EDIT ===
  const owner = 'leogoinfra';       // <- ajuste para o owner do repo i6-website
  const repo  = 'i6-website';       // <- ajuste para o nome do repo
  // ============

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event_type: 'insights-updated' }),
  });
  const ok = res.status === 204;
  return new Response(JSON.stringify({ ok, status: res.status }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: ok ? 200 : 502,
  });
});

PERGUNTE ao usuário o `owner` e `repo` corretos antes de finalizar.

3. Crie via supabase--migration o trigger Postgres que chama essa edge
   function via pg_net (HTTP). Use o padrão:

create extension if not exists pg_net;

create or replace function public.public_insights_notify_rebuild()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  fn_url text := '<SUBSTITUA pela URL da função>';
begin
  perform net.http_post(
    url := fn_url,
    headers := jsonb_build_object('Content-Type','application/json'),
    body := jsonb_build_object('table','public_insights')
  );
  return null;
end; $$;

create trigger trg_public_insights_rebuild
after insert or update or delete on public.public_insights
for each statement execute function public.public_insights_notify_rebuild();

A URL da função fica algo como:
  https://<ref>.functions.supabase.co/notify-site-rebuild
Pegue do supabase--project_info e substitua no SQL.

PASSO 4 — Reporte para o usuário
================================
Quando terminar, mostre ao usuário:
  - SUPABASE_URL (https://<ref>.supabase.co)
  - SERVICE_ROLE_KEY (do projeto i6Hub)
e diga que ele precisa criar 2 GitHub Secrets no repo do site público
(i6-website): `I6HUB_SUPABASE_URL` e `I6HUB_SUPABASE_SERVICE_KEY`.

Diga também: "Após isso, rode local no projeto do site:
  node scripts/seed-insights-to-i6hub.mjs
para popular os 4 artigos existentes."

VALIDAÇÃO
=========
1. Rode supabase--read_query: select count(*) from public.public_insights;
2. Mostre o sidebar com a nova aba.
3. Rode security--run_security_scan e me reporte só achados ligados a
   public_insights ou notify-site-rebuild.

Pode começar pelo Passo 1.
=====
```

---

## Referência: secrets e configs

| Onde | Nome | Origem | Quem cria |
|------|------|--------|-----------|
| GitHub repo i6-website | `I6HUB_SUPABASE_URL` | i6Hub Supabase URL | você (Parte D) |
| GitHub repo i6-website | `I6HUB_SUPABASE_SERVICE_KEY` | i6Hub service_role key | você (Parte D) |
| i6Hub (Lovable secrets) | `GITHUB_DISPATCH_TOKEN` | PAT do GitHub | IA do i6Hub via `add_secret` (Parte C) |
