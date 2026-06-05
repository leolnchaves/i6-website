## Plano

1. **Trocar iframe por POST real (fetch) no formulário de Insights**
   - O iframe está mascarando a falha. Vou enviar via `fetch` com `FormData` para o Apps Script (mesma URL e mesmo token do Contato).
   - Usar `mode: 'no-cors'`: o navegador faz o POST de verdade e o Apps Script grava, mesmo sem CORS de resposta.
   - Só marcar "enviado" depois que o `fetch` retorna sem erro de rede; em falha, manter o formulário aberto e exibir toast.

2. **Identificar claramente qual insight/PDF gerou o lead**
   - `subscription` recebe um valor padronizado e fácil de filtrar na planilha/CRM:
     `insight:<slug>` (ex.: `insight:rag-corporativo`).
   - `company` recebe o título do insight (curto, legível em lista).
   - `message` recebe um bloco estruturado, sempre no mesmo formato, fácil de parsear no app que trata o lead:

     ```text
     [Lead Insights]
     Insight: <título do insight>
     Slug: <slug>
     URL: https://infinity6.ai/<lang>/insights/<slug>
     Idioma: <pt|en>
     PDF: <url do PDF se houver, senão "-">
     Origem: lead-gate-insights
     ```

3. **Passar a URL do PDF para o componente**
   - `InsightArticle` já conhece `pdfUrl`; vou repassar como prop opcional para `LeadGateForm` e incluí-la no bloco acima.

4. **Manter honeypot e token**
   - `website_url` continua só como validação local (não vai no POST).
   - `token` continua sendo enviado para o Apps Script aceitar.

5. **Sem mudanças no Apps Script**
   - Os campos enviados (`name`, `email`, `company`, `message`, `subscription`, `token`) já são os que o `doPost` grava nas colunas existentes.

## Detalhes técnicos

- Edição apenas em:
  - `src/components/insights/LeadGateForm.tsx` (troca iframe → fetch, monta o bloco de mensagem padronizado).
  - `src/pages/InsightArticle.tsx` (passa `pdfUrl` para o `LeadGateForm`).
- `ContactForm` não é alterado.