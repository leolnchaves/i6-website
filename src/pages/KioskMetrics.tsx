import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { kioskContent, type RouteId } from '@/data/kiosk/config';
import { solutionsContent } from '@/data/solutionsV2/content';

const DASHBOARD_TOKEN = 'i6k-x3f8n2vqp7wm4jt-metrics';

type Row = { id: string; event_key: string; created_at: string };

type Period = 'all' | 'hour' | 'today' | '24h' | '7d' | '30d';
type Bucket = 'hour' | 'day' | 'week';

const periodLabels: Record<Period, string> = {
  all: 'Desde o início',
  hour: 'Última hora',
  today: 'Hoje',
  '24h': 'Últimas 24h',
  '7d': 'Últimos 7 dias',
  '30d': 'Últimos 30 dias',
};

const bucketLabels: Record<Bucket, string> = {
  hour: 'Por hora',
  day: 'Por dia',
  week: 'Por semana',
};

function periodStart(p: Period): Date | null {
  const now = new Date();
  switch (p) {
    case 'all':
      return null;
    case 'hour':
      return new Date(now.getTime() - 60 * 60 * 1000);
    case 'today': {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      return d;
    }
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
}

function bucketKey(iso: string, b: Bucket): string {
  const d = new Date(iso);
  if (b === 'hour') {
    d.setMinutes(0, 0, 0);
    return d.toISOString();
  }
  if (b === 'day') {
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }
  // week (ISO monday)
  const day = (d.getDay() + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d.toISOString();
}

function formatBucket(iso: string, b: Bucket): string {
  const d = new Date(iso);
  if (b === 'hour') return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit' });
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

const KioskMetrics = () => {
  const { token } = useParams();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('all');
  const [bucket, setBucket] = useState<Bucket>('day');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState('');
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    const { error } = await supabase
      .from('kiosk_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    setResetting(false);
    if (error) {
      toast.error('Erro ao zerar métricas', { description: error.message });
      return;
    }
    setRows([]);
    setResetOpen(false);
    setResetConfirm('');
    toast.success('Métricas zeradas');
  };

  useEffect(() => {
    if (token !== DASHBOARD_TOKEN) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const all: Row[] = [];
      const pageSize = 1000;
      let from = 0;
      // paginate
      for (let i = 0; i < 20; i++) {
        const { data, error } = await supabase
          .from('kiosk_events')
          .select('id, event_key, created_at')
          .order('created_at', { ascending: false })
          .range(from, from + pageSize - 1);
        if (error || !data || data.length === 0) break;
        all.push(...(data as Row[]));
        if (data.length < pageSize) break;
        from += pageSize;
      }
      if (!cancelled) {
        setRows(all);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Realtime subscription
  useEffect(() => {
    if (token !== DASHBOARD_TOKEN) return;
    const channel = supabase
      .channel('kiosk_events_dash')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'kiosk_events' },
        (payload) => {
          const r = payload.new as Row;
          setRows((prev) => [r, ...prev]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [token]);

  const filtered = useMemo(() => {
    const start = periodStart(period);
    if (!start) return rows;
    const t0 = start.getTime();
    return rows.filter((r) => new Date(r.created_at).getTime() >= t0);
  }, [rows, period]);

  const countBy = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => m.set(r.event_key, (m.get(r.event_key) ?? 0) + 1));
    return m;
  }, [filtered]);

  const totalStarts = countBy.get('kiosk:start') ?? 0;
  const totalQ2 = [...countBy.entries()]
    .filter(([k]) => k.startsWith('q2:'))
    .reduce((a, [, v]) => a + v, 0);
  const totalResults = [...countBy.entries()]
    .filter(([k]) => k.startsWith('results:'))
    .reduce((a, [, v]) => a + v, 0);
  const totalEbooks = [...countBy.entries()]
    .filter(([k]) => k.startsWith('ebook:'))
    .reduce((a, [, v]) => a + v, 0);
  const convRate = totalStarts ? ((totalEbooks / totalStarts) * 100).toFixed(1) + '%' : '—';

  // Lookups
  const kc = kioskContent.pt;
  const sc = solutionsContent.pt;

  const q1Data = kc.routing.options.map((o) => ({
    name: o.label,
    count: countBy.get(`q1:${o.id}`) ?? 0,
  }));

  const q2Blocks: { route: RouteId; title: string; data: { name: string; count: number }[] }[] = (
    ['growth', 'planning', 'pricing'] as RouteId[]
  ).map((r) => ({
    route: r,
    title: kc.branches[r].text,
    data: kc.branches[r].options.map((o) => ({
      name: o.label,
      count: countBy.get(`q2:${o.id}`) ?? 0,
    })),
  }));

  const solutionData = sc.solutions
    .map((s) => ({ name: s.title, count: countBy.get(`results:${s.id}`) ?? 0 }))
    .sort((a, b) => b.count - a.count);

  const ebookData: { name: string; count: number }[] = (['growth', 'planning', 'pricing'] as RouteId[]).map(
    (r) => ({
      name: r === 'growth' ? 'Growth & Customer' : r === 'planning' ? 'Demand & Supply' : 'Pricing & Margin',
      count: countBy.get(`ebook:${r}`) ?? 0,
    }),
  );

  const signalScenarios = ['supply', 'forecast', 'pricing', 'comercial', 'mix', 'pdv'] as const;
  const signalData = signalScenarios.map((s) => ({ name: s, count: countBy.get(`signal:${s}`) ?? 0 }));

  const timeline = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => {
      const k = bucketKey(r.created_at, bucket);
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return [...m.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({ name: formatBucket(k, bucket), count: v }));
  }, [filtered, bucket]);

  if (token !== DASHBOARD_TOKEN) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#0B1224] text-white">
      <Helmet>
        <title>Kiosk Metrics · infinity6</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#F4845F] font-semibold mb-1">
              infinity6 · kiosk metrics
            </p>
            <h1 className="text-3xl font-bold">Dashboard de eventos</h1>
            <p className="text-white/60 text-sm mt-1">
              {loading ? 'Carregando…' : `${filtered.length} eventos no recorte · ${rows.length} totais · atualização em tempo real`}
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              {(Object.keys(periodLabels) as Period[]).map((p) => (
                <option key={p} value={p} className="bg-[#0B1224]">
                  {periodLabels[p]}
                </option>
              ))}
            </select>
            <select
              value={bucket}
              onChange={(e) => setBucket(e.target.value as Bucket)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              {(Object.keys(bucketLabels) as Bucket[]).map((b) => (
                <option key={b} value={b} className="bg-[#0B1224]">
                  {bucketLabels[b]}
                </option>
              ))}
            </select>
            <button
              onClick={() => setResetOpen(true)}
              className="border border-red-500/40 text-red-300 hover:bg-red-500/10 rounded-lg px-3 py-2 text-sm transition-colors"
            >
              Zerar métricas
            </button>
          </div>
        </header>

        <AlertDialog open={resetOpen} onOpenChange={(o) => { setResetOpen(o); if (!o) setResetConfirm(''); }}>
          <AlertDialogContent className="bg-[#0B1224] border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Zerar todas as métricas?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                Esta ação apaga <strong>todos</strong> os eventos registrados e não pode ser desfeita.
                Digite <strong>ZERAR</strong> abaixo para confirmar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={resetConfirm}
              onChange={(e) => setResetConfirm(e.target.value)}
              placeholder="ZERAR"
              className="bg-white/5 border-white/10 text-white"
              autoFocus
            />
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/5">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={resetConfirm !== 'ZERAR' || resetting}
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-40"
              >
                {resetting ? 'Zerando…' : 'Confirmar zeragem'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard label="Sessões iniciadas" value={totalStarts} />
          <StatCard label="Quizzes completos" value={totalQ2} />
          <StatCard label="Soluções vistas" value={totalResults} />
          <StatCard label="eBooks enviados" value={totalEbooks} />
          <StatCard label="Conversão sessão → eBook" value={convRate} />
        </div>

        <Section title="Timeline">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={timeline}>
                <CartesianGrid stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0B1224', border: '1px solid #ffffff20' }} />
                <Line type="monotone" dataKey="count" stroke="#F4845F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Q1 · Roteamento por resultado prioritário">
          <ChartBars data={q1Data} />
        </Section>

        {q2Blocks.map((b) => (
          <Section key={b.route} title={`Q2 · ${b.route.toUpperCase()} — ${b.title}`}>
            <ChartBars data={b.data} />
          </Section>
        ))}

        <Section title="Soluções selecionadas (ranking)">
          <ChartBars data={solutionData} />
        </Section>

        <Section title="eBooks solicitados">
          <ChartBars data={ebookData} />
        </Section>

        <Section title="i6 Signal · perguntas clicadas">
          <ChartBars data={signalData} />
        </Section>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number | string }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">{label}</p>
    <p className="text-3xl font-bold text-[#F4845F]">{value}</p>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-lg font-semibold text-white/90 mb-3">{title}</h2>
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">{children}</div>
  </section>
);

const ChartBars = ({ data }: { data: { name: string; count: number }[] }) => (
  <div className="h-72">
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid stroke="#ffffff10" />
        <XAxis type="number" stroke="#ffffff60" fontSize={11} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#ffffff80"
          fontSize={11}
          width={220}
          tick={{ fill: '#ffffffcc' }}
        />
        <Tooltip contentStyle={{ background: '#0B1224', border: '1px solid #ffffff20' }} />
        <Bar dataKey="count" fill="#F4845F" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default KioskMetrics;
