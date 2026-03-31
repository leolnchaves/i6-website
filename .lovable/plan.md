

# Análise: Desconectar o banco de dados do site

## Resultado da investigação

O código do site **não utiliza nenhuma tabela do banco de dados**. Confirmações:

1. **Nenhum import do cliente Supabase** em nenhum componente ou página (apenas o arquivo auto-gerado `client.ts` existe)
2. **Nenhuma referência a tabelas `cms_*`** em todo o código
3. **Todo o conteúdo vem de arquivos `.md`** em `/public/content/`
4. Existem 25 migrations que criaram tabelas CMS (cms_pages, cms_users, cms_testimonials, etc.) que estão completamente sem uso

## Sobre desconectar o banco

Infelizmente, **não é possível desconectar o Lovable Cloud** uma vez que foi habilitado no projeto. Isso é uma limitação da plataforma — restaurar para uma versão anterior também não resolve.

O que **podemos fazer**:

1. **Dropar todas as tabelas CMS** via migration — eliminando os riscos de segurança apontados no scan (RLS desabilitado, senhas expostas, etc.)
2. **Desabilitar Cloud para projetos futuros** em Settings → Connectors → Lovable Cloud → Disable Cloud

## Plano de ação

### Migration SQL para limpar o banco
Criar uma migration que dropa todas as tabelas e tipos não utilizados:

```sql
DROP TABLE IF EXISTS cms_page_content CASCADE;
DROP TABLE IF EXISTS cms_results_cards CASCADE;
DROP TABLE IF EXISTS cms_testimonials CASCADE;
DROP TABLE IF EXISTS cms_faq_cards CASCADE;
DROP TABLE IF EXISTS cms_seo CASCADE;
DROP TABLE IF EXISTS cms_success_stories_cards CASCADE;
DROP TABLE IF EXISTS cms_solutions_cards CASCADE;
DROP TABLE IF EXISTS cms_pages CASCADE;
DROP TABLE IF EXISTS cms_users CASCADE;
-- Drop any custom types/functions created by migrations
```

Isso resolve todos os 4 alertas de segurança identificados no scan (RLS desabilitado, senhas expostas, etc.) pois as tabelas simplesmente deixarão de existir.

