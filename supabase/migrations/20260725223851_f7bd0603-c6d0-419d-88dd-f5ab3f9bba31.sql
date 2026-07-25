-- 1) Revogar DELETE do cliente
DROP POLICY IF EXISTS "Anyone can delete kiosk events" ON public.kiosk_events;
REVOKE DELETE ON public.kiosk_events FROM anon, authenticated;

-- 2) Whitelist de event_key
ALTER TABLE public.kiosk_events
  ADD CONSTRAINT kiosk_events_event_key_format
  CHECK (
    length(event_key) BETWEEN 1 AND 80
    AND event_key ~ '^(kiosk:start|q1:[a-z0-9\-]{1,40}|q2:[a-z0-9\-]{1,40}|results:[a-z0-9\-]{1,40}|ebook:(growth|planning|pricing)|signal:[a-z0-9\-]{1,40})$'
  );

-- 3) Rate-limit via trigger BEFORE INSERT
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

DROP TRIGGER IF EXISTS kiosk_events_rate_limit_trg ON public.kiosk_events;
CREATE TRIGGER kiosk_events_rate_limit_trg
BEFORE INSERT ON public.kiosk_events
FOR EACH ROW EXECUTE FUNCTION public.kiosk_events_rate_limit();

CREATE INDEX IF NOT EXISTS idx_kiosk_events_created_at ON public.kiosk_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kiosk_events_key_created ON public.kiosk_events (event_key, created_at DESC);