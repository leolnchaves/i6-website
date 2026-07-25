## Zerador do dashboard `/kiosk-metrics/:token`

Adicionar um botão "Zerar métricas" no header do dashboard, ao lado dos filtros de período/bucket.

### Fluxo

1. Botão discreto com borda vermelha suave (`border-red-500/40 text-red-300`) no header do `KioskMetrics.tsx`.
2. Ao clicar, abrir um `AlertDialog` (shadcn) com:
   - Título: "Zerar todas as métricas?"
   - Descrição: "Esta ação apaga TODOS os eventos registrados em `kiosk_events` e não pode ser desfeita. Digite ZERAR para confirmar."
   - Input de texto que precisa ser exatamente `ZERAR` para habilitar o botão de confirmação.
   - Botões: Cancelar / Confirmar zeragem.
3. Ao confirmar:
   - `supabase.from('kiosk_events').delete().neq('id', '00000000-0000-0000-0000-000000000000')` (delete-all seguro).
   - Limpar o estado local `setRows([])`.
   - Toast de sucesso ("Métricas zeradas").
   - Em caso de erro, toast de erro com a mensagem.

### Permissões

A política atual de RLS em `kiosk_events` permite apenas INSERT e SELECT para `anon`/`authenticated` — DELETE está bloqueado. Para o zerador funcionar do frontend sem service_role (que não pode ser exposto), adicionar uma policy de DELETE via migração:

```sql
CREATE POLICY "Anyone can delete kiosk events"
ON public.kiosk_events FOR DELETE
TO anon, authenticated
USING (true);

GRANT DELETE ON public.kiosk_events TO anon, authenticated;
```

Trade-off consciente e igual ao dos INSERT/SELECT: proteção fica no token opaco da URL do dashboard. Sem PII na tabela, é aceitável para o uso temporário do kiosk.

### Arquivos

- **Migração** (nova): adicionar policy + grant de DELETE em `kiosk_events`.
- `src/pages/KioskMetrics.tsx`: botão + AlertDialog + handler de delete + toast.

### Fora de escopo

- Sem log de auditoria de quem zerou (dashboard é anônimo por design).
- Sem "soft delete" — é hard delete mesmo, é isso que o usuário pediu.