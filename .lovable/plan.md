## Hardening `kiosk_events` — sem DELETE + whitelist + rate-limit no banco

Tudo continua 100% estático. As três defesas ficam no Postgres.

### 1) Revogar DELETE do cliente

```sql
DROP POLICY IF EXISTS "Anyone can delete kiosk events" ON public.kiosk_events;
REVOKE DELETE ON public.kiosk_events FROM anon, authenticated;
```

Reset passa a ser feito por você direto no backend do Lovable Cloud.

### 2) Whitelist de `event_key` (CHECK constraint)

```sql
ALTER TABLE public.kiosk_events
  ADD CONSTRAINT kiosk_events_event_key_format
  CHECK (
    length(event_key) BETWEEN 1 AND 80
    AND event_key ~ '^(kiosk:start|q1:[a-z0-9\-]{1,40}|q2:[a-z0-9\-]{1,40}|results:[a-z0-9\-]{1,40}|ebook:(growth|planning|pricing)|signal:[a-z0-9\-]{1,40})$'
  );
```

Bloqueia qualquer chave fora do padrão que hoje já emitimos.

### 3) Rate-limit via trigger BEFORE INSERT

Duas camadas, cada uma calibrada acima do uso legítimo (uma sessão real gera ~8-15 eventos em 1-2 min; múltiplos kiosks em paralelo somam pouco).

**Limite global (anti-flood absoluto):**
- Máx **60 inserts em 10 segundos** na tabela inteira.
- Um bot spamando ~6 rps já é barrado; um kiosk humano nem chega perto.

**Limite por chave (anti-inflação dirigida):**
- Máx **20 inserts do mesmo `event_key` em 10 segundos**.
- Impede alguém inflar artificialmente uma solução/eBook específico batendo repetidamente.

```sql
CREATE OR REPLACE FUNCTION public.kiosk_events_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  global_count int;
  key_count int;
BEGIN
  SELECT count(*) INTO global_count
  FROM public.kiosk_events
  WHERE created_at > now() - interval '10 seconds';

  IF global_count >= 60 THEN
    RAISE EXCEPTION 'kiosk_events: global rate limit exceeded'
      USING ERRCODE = 'check_violation';
  END IF;

  SELECT count(*) INTO key_count
  FROM public.kiosk_events
  WHERE event_key = NEW.event_key
    AND created_at > now() - interval '10 seconds';

  IF key_count >= 20 THEN
    RAISE EXCEPTION 'kiosk_events: per-key rate limit exceeded'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER kiosk_events_rate_limit_trg
BEFORE INSERT ON public.kiosk_events
FOR EACH ROW EXECUTE FUNCTION public.kiosk_events_rate_limit();

CREATE INDEX IF NOT EXISTS idx_kiosk_events_created_at ON public.kiosk_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kiosk_events_key_created ON public.kiosk_events (event_key, created_at DESC);
```

Trade-offs conscientes:
- Não é atômico contra concorrência extrema (dois inserts no mesmo ms podem contar o mesmo total). Isso é aceitável — o objetivo é conter abuso volumétrico, não milissegundos.
- Um atacante muito paciente ainda pode inserir <60 eventos/10s por horas. Sem servidor, esse é o teto — mas com o CHECK anterior tudo que ele conseguir gravar continua sendo chave válida (não afeta integridade nem gera ruído gigante).
- Os índices criados também aceleram o dashboard.

### 4) Frontend — `src/pages/KioskMetrics.tsx`

Remover tudo relacionado ao delete:
- Imports: `AlertDialog*`, `Input`, `toast`.
- States: `resetOpen`, `resetConfirm`, `resetting`.
- Função `handleReset`.
- Botão "Zerar métricas" e o bloco `<AlertDialog>` inteiro.

`kioskTracker.ts` e call-sites não mudam — as chaves já casam com o whitelist e o volume real fica muito abaixo dos limites.

### Arquivos afetados

- **Migração única** com passos 1, 2 e 3.
- `src/pages/KioskMetrics.tsx` — remoção do UI de reset.