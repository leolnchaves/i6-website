## Contexto

O tracking do kiosk migra do Supabase para **localStorage no próprio totem**, mantendo o site 100% estático. Nenhum evento sai da máquina; a exportação é manual, sob demanda, via CSV. Isso elimina a tabela `kiosk_events` e resolve o finding `SUPA_rls_policy_always_true` pela raiz.

## Plano

1. **Reescrever `src/lib/kioskTracker.ts`** para gravar em `localStorage` no lugar do Supabase:
   - Chave: `i6_kiosk_events`
   - Cada evento: `{ id, event_key, ts }` (ISO timestamp)
   - Buffer FIFO com teto (5.000 eventos) para não estourar quota
   - `trackKioskEvent(eventKey)` continua com a mesma assinatura — nenhuma call-site precisa mudar (`Kiosk.tsx`, `KioskSignalIntelliboard.tsx`, `EbookCTA.tsx`)
   - Novas helpers: `getKioskEvents()`, `clearKioskEvents()`, `downloadKioskEventsCSV()`
2. **Substituir `src/pages/KioskMetrics.tsx`** para ler do localStorage em vez do Supabase:
   - Mesma URL `/kiosk-metrics` (protegida pelo padrão atual)
   - Mostra contagem por `event_key` e total, igual hoje
   - Botões: "Exportar CSV" e "Limpar eventos deste totem"
   - Aviso claro: "dados locais deste totem, não agregam entre máquinas"
3. **Migration** para remover o backend residual:
   - `DROP TABLE public.kiosk_events` (leva policies + trigger de rate limit)
   - `DROP FUNCTION public.kiosk_events_rate_limit()`
4. **Marcar finding** `SUPA_rls_policy_always_true` como resolvido (tabela removida) e atualizar a memória de segurança: projeto 100% estático, sem tabelas no schema `public`; qualquer tabela futura precisa de RLS restritivo com validação de payload.
5. Não editar `src/integrations/supabase/client.ts` nem `.env` (auto-gerados). Client fica ocioso, sem impacto.
6. Publicar release patch (v1.2.x+1) para disparar o deploy.

## Detalhes técnicos

Formato do CSV exportado: `id,event_key,ts` com cabeçalho, uma linha por evento, download via `Blob` + `<a download>`.

Comportamento offline: 100% suportado — não faz mais nenhuma request para o backend.

Trade-off aceito: cada totem tem seu próprio histórico; agregação entre máquinas exige coletar os CSVs manualmente. Foi a escolha explícita para manter o site estático.
