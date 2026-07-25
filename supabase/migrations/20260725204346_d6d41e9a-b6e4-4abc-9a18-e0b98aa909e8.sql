
CREATE TABLE public.kiosk_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX kiosk_events_event_key_created_at_idx ON public.kiosk_events (event_key, created_at DESC);
CREATE INDEX kiosk_events_created_at_idx ON public.kiosk_events (created_at DESC);

GRANT SELECT, INSERT ON public.kiosk_events TO anon;
GRANT SELECT, INSERT ON public.kiosk_events TO authenticated;
GRANT ALL ON public.kiosk_events TO service_role;

ALTER TABLE public.kiosk_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert kiosk events"
  ON public.kiosk_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read kiosk events"
  ON public.kiosk_events FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.kiosk_events;
