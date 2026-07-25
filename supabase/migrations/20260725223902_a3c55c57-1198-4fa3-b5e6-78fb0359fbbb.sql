CREATE OR REPLACE FUNCTION public.kiosk_events_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
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

REVOKE ALL ON FUNCTION public.kiosk_events_rate_limit() FROM PUBLIC, anon, authenticated;