CREATE POLICY "Anyone can delete kiosk events" ON public.kiosk_events FOR DELETE TO anon, authenticated USING (true);
GRANT DELETE ON public.kiosk_events TO anon, authenticated;