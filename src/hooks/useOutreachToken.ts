import { useEffect, useState } from 'react';

/**
 * Resolve o token assinado dos links de e-mail (Outreach do i6 HUB).
 *
 * O site é 100% estático (SPA, sem SSR), então a resolução acontece no cliente,
 * no primeiro render da rota /go/:token. A própria chamada já registra o clique
 * no HUB — não é necessário nenhum outro ping.
 */

const TRACK_CLICK_URL =
  'https://nknsoorwqvlyxfptnfzr.supabase.co/functions/v1/track-click';

export interface OutreachLanding {
  title?: string | null;
  subtitle?: string | null;
  subject?: string | null;
  message?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface OutreachTokenResult {
  status: 'loading' | 'redirect' | 'landing' | 'invalid';
  sendId: string | null;
  destinationUrl: string | null;
  landing: OutreachLanding | null;
}

export const useOutreachToken = (token: string | undefined): OutreachTokenResult => {
  const [result, setResult] = useState<OutreachTokenResult>({
    status: 'loading',
    sendId: null,
    destinationUrl: null,
    landing: null,
  });

  useEffect(() => {
    if (!token) {
      setResult({ status: 'invalid', sendId: null, destinationUrl: null, landing: null });
      return;
    }

    let cancelled = false;

    const resolve = async () => {
      try {
        const res = await fetch(TRACK_CLICK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error(`track-click ${res.status}`);

        const data = (await res.json()) as {
          ok?: boolean;
          send_id?: string | null;
          destination_url?: string | null;
          landing?: OutreachLanding | null;
        };

        if (cancelled) return;

        if (data.destination_url) {
          setResult({
            status: 'redirect',
            sendId: data.send_id ?? null,
            destinationUrl: data.destination_url,
            landing: data.landing ?? null,
          });
          return;
        }

        setResult({
          status: 'landing',
          sendId: data.send_id ?? null,
          destinationUrl: null,
          landing: data.landing ?? null,
        });
      } catch {
        if (cancelled) return;
        // Token inválido/expirado ou falha de rede: cai na landing genérica.
        setResult({ status: 'invalid', sendId: null, destinationUrl: null, landing: null });
      }
    };

    resolve();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return result;
};
