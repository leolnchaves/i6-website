import { LineChart, Line, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, ReferenceLine, ReferenceArea, ReferenceDot, Cell } from 'recharts';

export const SupplyTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          {data.headers.map((h, i) => (
            <th key={i} className="text-left py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            {row.map((cell, ci) => (
              <td key={ci} className={`py-2.5 px-3 ${ci === 0 ? 'text-gray-600 font-mono text-xs' : ci === 2 ? 'text-gray-800 font-bold' : 'text-gray-800'}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ForecastChart = ({ data, note, lang }: { data: { month: string; seasonality: number; trend: number; projected?: number }[]; note: string; lang: string }) => (
  <div className="my-4">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="month" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Line type="monotone" dataKey="seasonality" name={lang === 'pt' ? 'Sazonalidade' : 'Seasonality'} stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} />
          <Line type="monotone" dataKey="trend" name={lang === 'pt' ? 'Tendência' : 'Trend'} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
          <Line type="monotone" dataKey="projected" name={lang === 'pt' ? 'Vendas projetadas' : 'Projected sales'} stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#10b981' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">{note}</p>
  </div>
);

export const ComercialChart = ({ data, lang }: { data: { territory: string; gap: number; potential: number; score: number }[]; lang: string }) => (
  <div className="my-4">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="territory" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis yAxisId="left" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `${v}k`} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="rgba(0,0,0,0.2)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
            formatter={(value: number, name: string) => {
              if (name === 'Score') return [value, name];
              return [`${value}k`, name];
            }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Bar yAxisId="left" dataKey="gap" name="Gap" fill="#f97316" radius={[4, 4, 0, 0]} barSize={28} />
          <Bar yAxisId="left" dataKey="potential" name={lang === 'pt' ? 'Potencial' : 'Potential'} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
          <Line yAxisId="right" type="monotone" dataKey="score" name="Score" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const MixComparison = ({ comparison }: { comparison: { category: string; current: string; recommended: string; direction: 'up' | 'down' | 'stable' }[] }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-2 px-3 text-gray-900 font-medium text-xs uppercase tracking-wider">Categoria</th>
          <th className="text-center py-2 px-3 text-gray-900 font-medium text-xs uppercase tracking-wider">Atual</th>
          <th className="text-center py-2 px-3 text-gray-900 font-medium text-xs uppercase tracking-wider">Recomendado</th>
          <th className="text-center py-2 px-3 text-gray-900 font-medium text-xs uppercase tracking-wider">Tendência</th>
        </tr>
      </thead>
      <tbody>
        {comparison.map((c, i) => (
          <tr key={i} className="border-b border-gray-100">
            <td className="py-2.5 px-3 text-gray-900">{c.category}</td>
            <td className="py-2.5 px-3 text-center text-gray-900">{c.current}</td>
            <td className="py-2.5 px-3 text-center text-gray-900 font-medium">{c.recommended}</td>
            <td className="py-2.5 px-3 text-center text-gray-900 font-bold">
              {c.direction === 'up' && '+'}
              {c.direction === 'down' && '−'}
              {c.direction === 'stable' && '='}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const PdvBarChart = ({ data, note, lang }: { data: { month: string; compra: number; recompra: number }[]; note: string; lang: string }) => (
  <div className="my-4">
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="month" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Bar dataKey="compra" name={lang === 'pt' ? 'Compra' : 'Purchase'} fill="#f97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recompra" name={lang === 'pt' ? 'Recompra' : 'Repurchase'} fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">{note}</p>
  </div>
);

export const PropensityByProductChart = ({
  data,
  note,
  lang,
}: {
  data: { product: string; customers: number; propensity: number }[];
  note: string;
  lang: string;
}) => (
  <div className="my-4">
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis
            dataKey="product"
            stroke="rgba(0,0,0,0.4)"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis
            yAxisId="left"
            stroke="rgba(0,0,0,0.4)"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            stroke="rgba(0,0,0,0.2)"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
            formatter={(value: number, name: string) => {
              if (name === (lang === 'pt' ? 'Propensão média' : 'Avg. propensity')) return [`${value}%`, name];
              return [value.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'), name];
            }}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '12px' }} />
          <Bar
            yAxisId="left"
            dataKey="customers"
            name={lang === 'pt' ? 'Clientes propensos' : 'Propense customers'}
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            barSize={28}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="propensity"
            name={lang === 'pt' ? 'Propensão média' : 'Avg. propensity'}
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#3b82f6' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">{note}</p>
  </div>
);

export const BehaviorClustersTable = ({
  table,
  detail,
  lang,
}: {
  table: { headers: string[]; rows: string[][] };
  detail: { name: string; description: string; approach: string }[];
  lang: string;
}) => (
  <div className="my-4">
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {table.headers.map((h, i) => (
              <th
                key={i}
                className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-2.5 px-3 ${ci === 0 ? 'text-gray-900 font-semibold text-left' : 'text-gray-800 text-center'} ${ci === row.length - 1 ? 'font-bold text-orange-600' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-5 overflow-x-auto w-full min-w-0">
      <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
        {lang === 'pt' ? 'Comportamento e abordagem por cluster' : 'Behavior and approach per cluster'}
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {lang === 'pt' ? 'Cluster' : 'Cluster'}
            </th>
            <th className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {lang === 'pt' ? 'Comportamento' : 'Behavior'}
            </th>
            <th className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {lang === 'pt' ? 'Como abordar' : 'How to approach'}
            </th>
          </tr>
        </thead>
        <tbody>
          {detail.map((c, i) => (
            <tr key={i} className="border-b border-gray-100 align-top">
              <td className="py-2.5 px-3 text-orange-600 font-semibold whitespace-nowrap">{c.name}</td>
              <td className="py-2.5 px-3 text-gray-700 leading-relaxed">{c.description}</td>
              <td className="py-2.5 px-3 text-gray-700 leading-relaxed">{c.approach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================================
// Metas Comerciais Preditivas
// ============================================================================

const diagnosisTone = (value: string): string => {
  const v = value.toLowerCase();
  if (v.includes('abaixo') || v.includes('below') || v.includes('expansão') || v.includes('expansion') || v.includes('opportunity') || v.includes('oportunidade')) {
    return 'text-emerald-700 font-semibold';
  }
  if (v.includes('acima') || v.includes('above')) {
    return 'text-red-600 font-semibold';
  }
  if (v.includes('compatível') || v.includes('aligned')) {
    return 'text-blue-700 font-semibold';
  }
  return 'text-gray-700 font-semibold';
};

export const TargetsPotentialTable = ({
  data,
  lang,
}: {
  data: { headers: string[]; rows: string[][] };
  lang: string;
}) => {
  // Group by region (first column) with merged visual
  const rows = data.rows;
  return (
    <div className="overflow-x-auto my-4 w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th
                key={i}
                className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i >= 4 ? 'text-right' : 'text-left'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const sameAsPrev = ri > 0 && rows[ri - 1][0] === row[0];
            return (
              <tr key={ri} className={`border-b border-gray-100 ${sameAsPrev ? '' : 'border-t-2 border-t-gray-200'}`}>
                {row.map((cell, ci) => {
                  const isRegion = ci === 0;
                  const isSuggested = ci === 5;
                  const isPotential = ci === 6;
                  return (
                    <td
                      key={ci}
                      className={`py-2.5 px-3 ${ci >= 4 ? 'text-right tabular-nums' : 'text-left'} ${
                        isRegion
                          ? sameAsPrev
                            ? 'text-transparent'
                            : 'text-gray-900 font-semibold'
                          : isSuggested
                          ? 'text-orange-600 font-semibold'
                          : isPotential
                          ? 'text-emerald-700 font-bold'
                          : 'text-gray-800'
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Heatmap hierárquico de potencial por região, vendedor, cliente e SKU. A coluna Potencial representa o volume máximo previsto; a Meta sugerida preserva uma faixa de segurança.'
          : 'Hierarchical potential heatmap by region, rep, client and SKU. The Potential column represents predicted maximum volume; Suggested target keeps a safety band.'}
      </p>
    </div>
  );
};

const QUADRANT_COLORS: Record<string, string> = {
  above: '#ef4444',       // red
  match: '#3b82f6',       // blue
  below: '#10b981',       // green
  uncertain: '#f59e0b',   // amber
};

const QUADRANT_LABELS: Record<string, { pt: string; en: string }> = {
  above: { pt: 'Meta acima do potencial', en: 'Target above potential' },
  match: { pt: 'Meta compatível', en: 'Target aligned' },
  below: { pt: 'Meta abaixo do potencial', en: 'Target below potential' },
  uncertain: { pt: 'Alta incerteza', en: 'High uncertainty' },
};

type ScatterPoint = { probability: number; delta: number; size: number; label: string; quadrant: string };

export const TargetsRiskScatter = ({ data, lang }: { data: ScatterPoint[]; lang: string }) => {
  const quadrants: string[] = ['above', 'match', 'below', 'uncertain'];
  return (
    <div className="my-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              type="number"
              dataKey="probability"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}%`}
              label={{ value: lang === 'pt' ? 'Probabilidade de atingimento' : 'Attainment probability', position: 'insideBottom', offset: -4, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="delta"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              label={{ value: lang === 'pt' ? 'Δ Meta − Projeção' : 'Δ Target − Projected', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[120, 900]} />
            <ReferenceLine x={60} stroke="#9ca3af" strokeDasharray="4 4" />
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 4" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string, payload: { payload?: ScatterPoint }) => {
                if (name === 'probability') return [`${value}%`, lang === 'pt' ? 'Probabilidade' : 'Probability'];
                if (name === 'delta') return [`${value > 0 ? '+' : ''}${value.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}`, lang === 'pt' ? 'Δ Meta−Projeção' : 'Δ Target−Projected'];
                if (name === 'size') return [value.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'), lang === 'pt' ? 'Volume potencial' : 'Potential volume'];
                return [value, name];
              }}
              labelFormatter={(_, payload) => (payload?.[0]?.payload as ScatterPoint | undefined)?.label ?? ''}
            />
            {quadrants.map((q) => (
              <Scatter key={q} name={QUADRANT_LABELS[q][lang === 'pt' ? 'pt' : 'en']} data={data.filter((d) => d.quadrant === q)} fill={QUADRANT_COLORS[q]}>
                {data.filter((d) => d.quadrant === q).map((_, i) => (
                  <Cell key={i} fill={QUADRANT_COLORS[q]} fillOpacity={0.75} stroke={QUADRANT_COLORS[q]} />
                ))}
              </Scatter>
            ))}
            <Legend wrapperStyle={{ color: '#6b7280', fontSize: '11px', paddingTop: '8px' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Eixo X: probabilidade de atingimento. Eixo Y: diferença entre meta e volume projetado. Tamanho da bolha: volume potencial do cliente.'
          : 'X axis: attainment probability. Y axis: gap between target and projected volume. Bubble size: client potential volume.'}
      </p>
    </div>
  );
};

export const TargetsRiskTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i >= 3 && i <= 5 ? 'text-right' : 'text-left'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              const isDiag = ci === row.length - 1;
              return (
                <td
                  key={ci}
                  className={`py-2.5 px-3 ${ci >= 3 && ci <= 5 ? 'text-right tabular-nums' : 'text-left'} ${
                    isDiag ? diagnosisTone(cell) : 'text-gray-800'
                  }`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const TargetsSignalsTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Sinais que sustentam a previsão' : 'Signals supporting the prediction'}
    </p>
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              const positive = /^(\+|Alto|High)/.test(cell) || /^\d/.test(cell) && parseInt(cell) >= 70;
              const negative = /^(−|-|Baixo|Low)/.test(cell) || (/^\d/.test(cell) && parseInt(cell) < 50);
              return (
                <td
                  key={ci}
                  className={`py-2.5 px-3 ${ci === 0 ? 'text-left text-gray-800 font-medium' : 'text-center font-semibold'} ${
                    ci === 1 ? (positive ? 'text-emerald-700' : 'text-gray-800') : ''
                  } ${ci === 2 ? (negative ? 'text-red-600' : 'text-gray-800') : ''}`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================================
// Mix, Sortimento e Pedido Ideal
// ============================================================================

type MixScatterPoint = { adherence: number; productivity: number; size: number; label: string; quadrant: string };

// Replaced bubble chart with a stacked horizontal bar ranking each PDV by
// adherence to the ideal mix (aderente vs gap). The `data` shape is the same
// as before (from content.ts) so no upstream changes are needed.
export const MixBehaviorScatter = ({ data, lang }: { data: MixScatterPoint[]; lang: string }) => {
  const rows = [...data]
    .map((d) => ({
      pdv: d.label.split('•')[0].trim(),
      adherent: d.adherence,
      gap: Math.max(0, 100 - d.adherence),
    }))
    .sort((a, b) => b.adherent - a.adherent);

  return (
    <div className="my-4">
      <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
        {lang === 'pt' ? 'Aderência ao mix ideal por PDV' : 'Ideal-mix adherence per store'}
      </p>
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ top: 10, right: 24, left: 24, bottom: 10 }} barCategoryGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="pdv"
              tick={{ fontSize: 12, fill: '#374151' }}
              width={95}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Legend wrapperStyle={{ color: '#6b7280', fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="adherent" name={lang === 'pt' ? 'Aderente' : 'Adherent'} stackId="mix" fill="#10b981" radius={[4, 0, 0, 4]} barSize={22} />
            <Bar dataKey="gap" name={lang === 'pt' ? 'Gap' : 'Gap'} stackId="mix" fill="#F4845F" radius={[0, 4, 4, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Cada barra representa um PDV, dividida entre aderência ao mix ideal e gap.'
          : 'Each bar represents a store, split between adherence to the ideal mix and gap.'}
      </p>
    </div>
  );
};

const adherenceTone = (raw: string): string => {
  const n = parseInt(raw);
  if (!isNaN(n)) {
    if (n >= 85) return 'text-emerald-700 font-semibold';
    if (n >= 65) return 'text-blue-700 font-semibold';
    if (n >= 50) return 'text-amber-700 font-semibold';
    return 'text-red-600 font-semibold';
  }
  return 'text-gray-700 font-semibold';
};

const potentialTone = (raw: string): string => {
  if (raw.startsWith('+')) return 'text-emerald-700 font-semibold';
  if (raw.startsWith('−') || raw.startsWith('-')) return 'text-red-600 font-semibold';
  return 'text-gray-800';
};

export const MixBehaviorTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 2 || i === 4 ? 'text-right' : 'text-left'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
              if (ci === 2) return (
                <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${adherenceTone(cell)}`}>{cell}</td>
              );
              if (ci === 4) return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${potentialTone(cell)}`}>{cell}</td>;
              return <td key={ci} className="py-2.5 px-3 text-left text-gray-800">{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const MixBehaviorReading = ({ paragraphs, lang }: { paragraphs: string[]; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Leitura comportamental' : 'Behavioral reading'}
    </p>
    <div className="space-y-2">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-gray-700 text-sm leading-relaxed">{p}</p>
      ))}
    </div>
  </div>
);

type MixHeatmap = { regions: string[]; skus: string[]; matrix: number[][] };

export const MixGapsHeatmap = ({ data, lang }: { data: MixHeatmap; lang: string }) => {
  const max = Math.max(...data.matrix.flat(), 1);
  return (
    <div className="my-4 overflow-x-auto w-full min-w-0">
      <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
        {lang === 'pt' ? 'Oportunidade por região × SKU' : 'Opportunity by region × SKU'}
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {lang === 'pt' ? 'Região' : 'Region'}
            </th>
            {data.skus.map((s, i) => (
              <th key={i} className="py-2 px-2 text-center text-gray-700 font-medium text-xs uppercase tracking-wider">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.regions.map((region, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              <td className="py-2 px-3 text-left font-medium text-gray-900 whitespace-nowrap">{region}</td>
              {data.matrix[ri].map((value, ci) => {
                const intensity = value / max;
                const alpha = 0.08 + intensity * 0.85;
                const textStrong = intensity > 0.6;
                return (
                  <td
                    key={ci}
                    className="py-2 px-2 text-center align-middle"
                    title={`${region} • ${data.skus[ci]} — ${lang === 'pt' ? 'oportunidade' : 'opportunity'} ${value}`}
                  >
                    <div
                      className="mx-auto flex items-center justify-center rounded-md tabular-nums"
                      style={{
                        backgroundColor: `rgba(244, 132, 95, ${alpha.toFixed(2)})`,
                        color: textStrong ? '#7c2d12' : '#78350f',
                        width: '100%',
                        minWidth: '48px',
                        height: '36px',
                        fontWeight: textStrong ? 700 : 500,
                        fontSize: '13px',
                      }}
                    >
                      {value}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Intensidade coral indica maior oportunidade de aumento de ticket via inclusão do SKU na região.'
          : 'Coral intensity indicates larger basket-lift opportunity when adding the SKU to the region.'}
      </p>
    </div>
  );
};

export const MixGapsTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i >= 2 ? 'text-right' : 'text-left'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              const isGap = ci === 4;
              const isPot = ci === 5;
              return (
                <td
                  key={ci}
                  className={`py-2.5 px-3 ${ci >= 2 ? 'text-right tabular-nums' : 'text-left'} ${
                    ci === 0 ? 'text-gray-900 font-semibold' :
                    ci === 1 ? 'text-gray-800 font-medium' :
                    isGap ? 'text-orange-600 font-bold' :
                    isPot ? 'text-emerald-700 font-bold' :
                    'text-gray-800'
                  }`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const MixGapsDetailList = ({ items, lang }: { items: string[]; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Detalhamento comportamental' : 'Behavioral detail'}
    </p>
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="text-gray-700 text-sm leading-relaxed flex gap-2">
          <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ============================================================================
// Preço Orientado à Margem
// ============================================================================

const MARGIN_QUADRANT_COLORS: Record<string, string> = {
  priority:   '#10b981', // verde — prioridade de aumento
  controlled: '#3b82f6', // azul — ajuste controlado
  hold:       '#6b7280', // cinza — manter
  volume:     '#f59e0b', // âmbar — reduzir p/ ganho de volume
  risk:       '#ef4444', // vermelho — risco
};

const MARGIN_QUADRANT_LABELS: Record<string, { pt: string; en: string }> = {
  priority:   { pt: 'Prioridade de margem', en: 'Margin priority' },
  controlled: { pt: 'Ajuste controlado',    en: 'Controlled adjust' },
  hold:       { pt: 'Manter preço',         en: 'Hold price' },
  volume:     { pt: 'Reduzir p/ volume',    en: 'Reduce for volume' },
  risk:       { pt: 'Risco',                en: 'Risk' },
};

type MarginScatterPoint = { sensitivity: number; incrementalMargin: number; size: number; label: string; quadrant: string };

export const MarginOpportunitiesScatter = ({ data, lang }: { data: MarginScatterPoint[]; lang: string }) => {
  const quadrants: string[] = ['priority', 'controlled', 'hold', 'volume', 'risk'];
  return (
    <div className="my-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              type="number"
              dataKey="sensitivity"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}`}
              label={{ value: lang === 'pt' ? 'Sensibilidade prevista ao preço' : 'Predicted price sensitivity', position: 'insideBottom', offset: -4, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="incrementalMargin"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}k`}
              label={{ value: lang === 'pt' ? 'Margem incremental (R$ mil)' : 'Incremental margin ($ k)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[120, 900]} />
            <ReferenceLine x={50} stroke="#9ca3af" strokeDasharray="4 4" />
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 4" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => {
                if (name === 'sensitivity') return [`${value}`, lang === 'pt' ? 'Sensibilidade' : 'Sensitivity'];
                if (name === 'incrementalMargin') return [`${value >= 0 ? '+' : ''}${value}k`, lang === 'pt' ? 'Margem incremental' : 'Incremental margin'];
                if (name === 'size') return [value.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'), lang === 'pt' ? 'Receita relativa' : 'Relative revenue'];
                return [value, name];
              }}
              labelFormatter={(_, payload) => (payload?.[0]?.payload as MarginScatterPoint | undefined)?.label ?? ''}
            />
            {quadrants.map((q) => (
              <Scatter key={q} name={MARGIN_QUADRANT_LABELS[q][lang === 'pt' ? 'pt' : 'en']} data={data.filter((d) => d.quadrant === q)} fill={MARGIN_QUADRANT_COLORS[q]}>
                {data.filter((d) => d.quadrant === q).map((_, i) => (
                  <Cell key={i} fill={MARGIN_QUADRANT_COLORS[q]} fillOpacity={0.75} stroke={MARGIN_QUADRANT_COLORS[q]} />
                ))}
              </Scatter>
            ))}
            <Legend wrapperStyle={{ color: '#6b7280', fontSize: '11px', paddingTop: '8px' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Eixo X: sensibilidade prevista ao preço. Eixo Y: margem incremental potencial. Tamanho da bolha: receita relativa do SKU.'
          : 'X axis: predicted price sensitivity. Y axis: potential incremental margin. Bubble size: SKU relative revenue.'}
      </p>
    </div>
  );
};

const volumeReactionTone = (raw: string): string => {
  if (raw.startsWith('+')) return 'text-amber-600 font-semibold';
  if (raw.startsWith('−') || raw.startsWith('-')) {
    const n = Math.abs(parseFloat(raw.replace(/[^\d.,-]/g, '').replace(',', '.')));
    if (!isNaN(n) && n >= 5) return 'text-red-600 font-semibold';
    return 'text-emerald-700 font-semibold';
  }
  return 'text-gray-800';
};

const incrementalMarginTone = (raw: string): string => {
  if (raw.toLowerCase().includes('sem') || raw.toLowerCase().includes('no ')) return 'text-gray-500 italic';
  if (raw.startsWith('+')) return 'text-emerald-700 font-bold';
  return 'text-gray-800';
};

export const MarginOpportunitiesTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-right'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
              if (ci === 3) return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${volumeReactionTone(cell)}`}>{cell}</td>;
              if (ci === 4) return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${incrementalMarginTone(cell)}`}>{cell}</td>;
              if (ci === 5) return <td key={ci} className="py-2.5 px-3 text-right tabular-nums text-orange-600 font-semibold">{cell}</td>;
              return <td key={ci} className="py-2.5 px-3 text-right tabular-nums text-gray-800">{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const MarginBehaviorReading = ({ paragraphs, lang }: { paragraphs: string[]; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Leitura comportamental' : 'Behavioral reading'}
    </p>
    <div className="space-y-2">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-gray-700 text-sm leading-relaxed">{p}</p>
      ))}
    </div>
  </div>
);

type MarginSignalRow = {
  sku: string;
  demand: number;
  sensitivity: number;
  competition: number;
  stock: number;
  currentMargin: number;
  category: number;
};

const MARGIN_SIGNAL_KEYS: { key: keyof Omit<MarginSignalRow, 'sku'>; pt: string; en: string; color: string }[] = [
  { key: 'demand',        pt: 'Demanda prevista',       en: 'Predicted demand',    color: '#F4845F' },
  { key: 'sensitivity',   pt: 'Sensibilidade ao preço', en: 'Price sensitivity',   color: '#3b82f6' },
  { key: 'competition',   pt: 'Posição competitiva',    en: 'Competitive position', color: '#10b981' },
  { key: 'stock',         pt: 'Estoque disponível',     en: 'Available stock',     color: '#f59e0b' },
  { key: 'currentMargin', pt: 'Margem atual',           en: 'Current margin',      color: '#8b5cf6' },
  { key: 'category',      pt: 'Comportamento da categoria', en: 'Category behavior', color: '#06b6d4' },
];

export const MarginSignalsChart = ({ data, lang }: { data: MarginSignalRow[]; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Contribuição dos sinais por SKU' : 'Signal contribution by SKU'}
    </p>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} stackOffset="sign">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="sku" stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis stroke="rgba(0,0,0,0.4)" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#6b7280' }}
            formatter={(value: number, name: string) => [`${value > 0 ? '+' : ''}${value}`, name]}
          />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: '11px' }} />
          <ReferenceLine y={0} stroke="#9ca3af" />
          {MARGIN_SIGNAL_KEYS.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={lang === 'pt' ? s.pt : s.en}
              stackId="signals"
              fill={s.color}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">
      {lang === 'pt'
        ? 'Barras positivas indicam sinais que abrem espaço para captura de margem. Barras negativas indicam restrições que limitam o aumento de preço.'
        : 'Positive bars indicate signals that open room for margin capture. Negative bars indicate constraints that limit price increases.'}
    </p>
  </div>
);

const marginRoomTone = (raw: string): string => {
  const v = raw.toLowerCase();
  if (v.startsWith('alto') || v.startsWith('high')) return 'text-emerald-700 font-semibold';
  if (v.startsWith('médio') || v.startsWith('medio') || v.startsWith('medium')) return 'text-blue-700 font-semibold';
  if (v.startsWith('baixo') || v.startsWith('low')) return 'text-amber-700 font-semibold';
  if (v.startsWith('negativo') || v.startsWith('negative')) return 'text-red-600 font-semibold';
  return 'text-gray-700 font-semibold';
};

const directionTone = (raw: string): string => {
  const v = raw.toLowerCase();
  if (v.startsWith('aumentar') || v.startsWith('increase')) return 'text-emerald-700 font-semibold';
  if (v.startsWith('ajuste') || v.startsWith('controlled')) return 'text-blue-700 font-semibold';
  if (v.startsWith('manter') || v.startsWith('hold')) return 'text-gray-700 font-semibold';
  if (v.startsWith('reduzir') || v.startsWith('reduce')) return 'text-amber-700 font-semibold';
  return 'text-gray-800';
};

export const MarginSignalsTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4 w-full min-w-0">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/60">
          {data.headers.map((h, i) => (
            <th key={i} className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => {
              if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
              if (ci === 1) return (
                <td key={ci} className={`py-2.5 px-3 text-left ${marginRoomTone(cell)}`}>{cell}</td>
              );
              if (ci === 4) return <td key={ci} className={`py-2.5 px-3 text-left ${directionTone(cell)}`}>{cell}</td>;
              return <td key={ci} className="py-2.5 px-3 text-left text-gray-800">{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


// ============================================================
// TURNOVER — Price-to-Turnover scenarios
// ============================================================

const riskTone = (raw: string): string => {
  const v = raw.toLowerCase();
  if (v.startsWith('alto') || v.startsWith('high')) return 'text-red-600 font-semibold';
  if (v.startsWith('médio') || v.startsWith('medio') || v.startsWith('medium')) return 'text-amber-700 font-semibold';
  if (v.startsWith('baixo') || v.startsWith('low')) return 'text-emerald-700 font-semibold';
  return 'text-gray-700 font-semibold';
};

const sellThroughTone = (raw: string): string => {
  const m = raw.match(/(\d+)/);
  if (!m) return 'text-gray-800';
  const n = parseInt(m[1], 10);
  if (n >= 70) return 'text-emerald-700 font-semibold';
  if (n >= 55) return 'text-blue-700 font-semibold';
  return 'text-amber-700 font-semibold';
};

export const TurnoverRiskTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Risco de envelhecimento por região' : 'Aging risk by region'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-right'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
                if (ci === 3) return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${sellThroughTone(cell)}`}>{cell}</td>;
                if (ci === row.length - 1) return (
                  <td key={ci} className={`py-2.5 px-3 text-right ${riskTone(cell)}`}>{cell}</td>
                );
                return <td key={ci} className="py-2.5 px-3 text-right tabular-nums text-gray-800">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const compareValueTone = (raw: string): string => {
  const v = raw.toLowerCase().trim();
  if (v.startsWith('+')) return 'text-emerald-700 font-semibold';
  if (v.startsWith('−') || v.startsWith('-')) return 'text-red-700 font-semibold';
  if (v.startsWith('alta') || v.startsWith('high')) return 'text-red-700 font-semibold';
  if (v.startsWith('baixa') || v.startsWith('low')) return 'text-emerald-700 font-semibold';
  if (v.startsWith('moderada') || v.startsWith('moderate') || v.startsWith('média') || v.startsWith('media') || v.startsWith('medium')) return 'text-amber-700 font-semibold';
  if (v.startsWith('estável') || v.startsWith('estavel') || v.startsWith('stable')) return 'text-blue-700 font-semibold';
  return 'text-gray-800';
};

export const TurnoverSignalsCompareTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Sinais comportamentais comparados' : 'Behavioral signals compared'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-medium text-gray-900">{cell}</td>;
                return <td key={ci} className={`py-2.5 px-3 text-center ${compareValueTone(cell)}`}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const markdownCellTone = (raw: string): string => {
  const v = raw.toLowerCase().trim();
  if (v.startsWith('manter') || v.startsWith('hold')) return 'text-gray-500';
  if (v.startsWith('reavaliar') || v.startsWith('reassess')) return 'text-amber-700 font-semibold';
  const m = v.match(/(\d+)/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 18) return 'text-red-600 font-semibold';
    if (n >= 10) return 'text-orange-600 font-semibold';
    return 'text-orange-500 font-semibold';
  }
  return 'text-gray-700';
};

export const TurnoverMarkdownRuler = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Régua temporal de markdown' : 'Markdown timing ladder'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
                return (
                  <td key={ci} className={`py-2.5 px-3 text-center tabular-nums ${markdownCellTone(cell)}`}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-gray-400 text-xs mt-3 leading-relaxed">
      {lang === 'pt'
        ? 'Cada célula representa a recomendação preditiva para o SKU A naquele cluster e janela temporal.'
        : 'Each cell represents the predictive recommendation for SKU A in that cluster and time window.'}
    </p>
  </div>
);

export const TurnoverMarkdownTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Detalhamento por SKU' : 'Detail by SKU'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i <= 1 ? 'text-left' : 'text-right'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
                if (ci === 1) return <td key={ci} className="py-2.5 px-3 text-left text-gray-700">{cell}</td>;
                if (ci === 3) {
                  const hold = /manter|hold/i.test(cell);
                  return (
                    <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${hold ? 'text-gray-500' : 'text-orange-600 font-semibold'}`}>
                      {cell}
                    </td>
                  );
                }
                if (ci === 4) return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${sellThroughTone(cell)}`}>{cell}</td>;
                if (ci === 5) {
                  const nodisc = /sem desconto|no discount/i.test(cell);
                  return <td key={ci} className={`py-2.5 px-3 text-right tabular-nums ${nodisc ? 'text-gray-500' : 'text-emerald-700 font-semibold'}`}>{cell}</td>;
                }
                return <td key={ci} className="py-2.5 px-3 text-right tabular-nums text-gray-800">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================================
// Personalização Preditiva + Descoberta Inteligente
// ============================================================================

const OBJECTIVE_TONE: Record<string, string> = {
  'cross-sell':           'text-orange-600 font-semibold',
  'discovery':            'text-blue-700 font-semibold',
  'look recommendation':  'text-purple-700 font-semibold',
  'conversão':            'text-emerald-700 font-semibold',
  'conversion':           'text-emerald-700 font-semibold',
};

const personalizationAdherenceTone = (raw: string): string => {
  const n = parseInt(raw.replace('%', ''), 10);
  if (!isNaN(n)) {
    if (n >= 88) return 'text-emerald-700 font-semibold';
    if (n >= 80) return 'text-orange-600 font-semibold';
    return 'text-amber-700 font-semibold';
  }
  return 'text-gray-700 font-semibold';
};

const effectTone = (raw: string): string => {
  const v = raw.toLowerCase().trim();
  if (v.startsWith('alto') || v.startsWith('high')) return 'text-emerald-700 font-semibold';
  if (v.startsWith('médio') || v.startsWith('medio') || v.startsWith('medium')) return 'text-amber-700 font-semibold';
  if (v.startsWith('baixo') || v.startsWith('low')) return 'text-gray-500 font-semibold';
  return 'text-gray-700 font-semibold';
};

export const PersonalizationBehaviorMatrix = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Matriz de comportamento por recomendação' : 'Behavior-to-recommendation matrix'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i >= 3 ? 'text-center' : 'text-left'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
                if (ci === 1 || ci === 2) return <td key={ci} className="py-2.5 px-3 text-left text-gray-700">{cell}</td>;
                if (ci === 3) return (
                  <td key={ci} className={`py-2.5 px-3 text-center tabular-nums ${personalizationAdherenceTone(cell)}`}>{cell}</td>
                );
                if (ci === 4) return (
                  <td key={ci} className={`py-2.5 px-3 text-center ${OBJECTIVE_TONE[cell.toLowerCase()] ?? 'text-gray-700 font-semibold'}`}>{cell}</td>
                );
                return <td key={ci} className="py-2.5 px-3 text-gray-800">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const PersonalizationSignalsTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Sinais que sustentam a recomendação' : 'Signals supporting the recommendation'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-medium text-gray-900">{cell}</td>;
                return (
                  <td key={ci} className={`py-2.5 px-3 text-center ${effectTone(cell)}`}>{cell}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

type CurvePoint = { day: number; probability: number };

export const RepurchaseCurveChart = ({
  data, window, peak, legend, lang,
}: {
  data: CurvePoint[];
  window: { start: number; end: number };
  peak: { day: number; probability: number };
  legend: string[];
  lang: string;
}) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Curva temporal de recompra' : 'Repurchase time curve'}
    </p>
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 24, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis
            type="number"
            dataKey="day"
            domain={[0, 50]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${v}`}
            label={{ value: lang === 'pt' ? 'Dias desde a última compra' : 'Days since last purchase', position: 'insideBottom', offset: -6, fill: '#6b7280', fontSize: 11 }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(v) => `${v}%`}
            label={{ value: lang === 'pt' ? 'Probabilidade prevista' : 'Predicted probability', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            formatter={(value: number) => [`${value}%`, lang === 'pt' ? 'Propensão' : 'Propensity']}
            labelFormatter={(l) => `${lang === 'pt' ? 'Dia' : 'Day'} ${l}`}
          />
          <ReferenceArea x1={window.start} x2={window.end} y1={0} y2={100} fill="#F4845F" fillOpacity={0.12} stroke="#F4845F" strokeOpacity={0.35} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="probability" stroke="#F4845F" strokeWidth={2.5} dot={{ r: 3, fill: '#F4845F' }} />
          <ReferenceDot x={peak.day} y={peak.probability} r={6} fill="#10b981" stroke="#065f46" strokeWidth={2} label={{ value: lang === 'pt' ? 'Pico' : 'Peak', position: 'top', fill: '#065f46', fontSize: 11, fontWeight: 600 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
      {legend.map((l, i) => (
        <li key={i} className="text-gray-500 text-xs leading-relaxed flex gap-2">
          <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
          <span>{l}</span>
        </li>
      ))}
    </ul>
  </div>
);

const propensityTone = (raw: string): string => {
  const n = parseInt(raw.replace('%', ''), 10);
  if (!isNaN(n)) {
    if (n >= 80) return 'text-emerald-700 font-semibold';
    if (n >= 70) return 'text-orange-600 font-semibold';
    return 'text-amber-700 font-semibold';
  }
  return 'text-gray-700 font-semibold';
};

export const RepurchaseBehaviorTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Comportamentos previstos de recompra' : 'Predicted repurchase behaviors'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 1 || i === 3 ? 'text-center' : 'text-left'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-semibold text-gray-900">{cell}</td>;
                if (ci === 1) return <td key={ci} className="py-2.5 px-3 text-center tabular-nums text-gray-800 font-medium">{cell}</td>;
                if (ci === 2) return <td key={ci} className="py-2.5 px-3 text-left text-gray-700">{cell}</td>;
                if (ci === 3) return (
                  <td key={ci} className={`py-2.5 px-3 text-center tabular-nums ${propensityTone(cell)}`}>{cell}</td>
                );
                return <td key={ci} className="py-2.5 px-3 text-left text-gray-700">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const RepurchaseCorrelationsTable = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Correlações comportamentais' : 'Behavioral correlations'}
    </p>
    <div className="overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            {data.headers.map((h, i) => (
              <th key={i} className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              <td className="py-2.5 px-3 text-left font-medium text-gray-900">{row[0]}</td>
              <td className="py-2.5 px-3 text-left text-gray-700">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================================
// Preço Orientado à Conversão
// ============================================================================

// Heatmap of price friction (product × context)
export const PriceConversionFrictionHeatmap = ({
  data,
  lang,
}: {
  data: { contexts: string[]; products: string[]; matrix: number[][] };
  lang: string;
}) => {
  const frictionTextColor = (v: number): string => {
    if (v >= 70) return 'text-red-600 font-bold';
    if (v >= 55) return 'text-orange-600 font-semibold';
    if (v >= 40) return 'text-amber-700 font-semibold';
    if (v >= 25) return 'text-emerald-700 font-semibold';
    return 'text-emerald-600 font-semibold';
  };
  return (
    <div className="my-4">
      <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
        {lang === 'pt' ? 'Fricção prevista de preço por produto e contexto' : 'Predicted price friction by product and context'}
      </p>
      <div className="overflow-x-auto w-full min-w-0">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-2 text-left text-gray-700 font-medium text-[11px] uppercase tracking-wider">
                {lang === 'pt' ? 'Produto' : 'Product'}
              </th>
              {data.contexts.map((c, i) => (
                <th key={i} className="py-2 px-2 text-center text-gray-700 font-medium text-[11px] uppercase tracking-wider">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.products.map((p, ri) => (
              <tr key={ri} className="border-b border-gray-100">
                <td className="py-2 px-2 text-gray-900 font-semibold text-left whitespace-nowrap">{p}</td>
                {data.matrix[ri].map((v, ci) => (
                  <td key={ci} className={`py-2 px-2 text-center tabular-nums ${frictionTextColor(v)}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-400 text-[11px] mt-2 leading-relaxed">
        {lang === 'pt'
          ? 'Escala 0–100 · verde = baixa fricção · laranja/vermelho = fricção alta de preço.'
          : 'Scale 0–100 · green = low friction · orange/red = high price friction.'}
      </p>
    </div>
  );
};

// Context table with tone on friction and recommended direction
export const PriceConversionContextTable = ({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}) => {
  const frictionTextTone = (v: string): string => {
    const s = v.toLowerCase();
    if (s.startsWith('alto') || s.startsWith('high')) return 'text-red-600 font-semibold';
    if (s.startsWith('médio') || s.startsWith('medio') || s.startsWith('medium')) return 'text-amber-700 font-semibold';
    if (s.startsWith('baixo') || s.startsWith('low')) return 'text-emerald-700 font-semibold';
    return 'text-gray-700 font-semibold';
  };
  const directionTone = (v: string): string => {
    const s = v.toLowerCase();
    if (s.includes('imediata') || s.includes('immediate')) return 'text-red-600 font-semibold';
    if (s.includes('manter') || s.includes('hold')) return 'text-gray-500 font-semibold';
    if (s.includes('não incent') || s.includes('do not')) return 'text-gray-500 font-semibold';
    if (s.includes('contextual') || s.includes('moderad')) return 'text-orange-600 font-semibold';
    return 'text-gray-700 font-semibold';
  };
  return (
    <div className="my-4 overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-center'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-medium text-gray-900">{cell}</td>;
                if (ci === 2) return <td key={ci} className={`py-2.5 px-3 text-center ${frictionTextTone(cell)}`}>{cell}</td>;
                if (ci === 3) return <td key={ci} className="py-2.5 px-3 text-center text-orange-600 font-semibold tabular-nums">{cell}</td>;
                if (ci === row.length - 1) return <td key={ci} className={`py-2.5 px-3 text-center ${directionTone(cell)}`}>{cell}</td>;
                return <td key={ci} className="py-2.5 px-3 text-center text-gray-800">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Generic 2-column signals table (used by conversion friction)
export const PriceConversionSignalsTable = ({
  data,
  lang,
}: {
  data: { headers: string[]; rows: string[][] };
  lang: string;
}) => (
  <div className="my-4 overflow-x-auto w-full min-w-0">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Sinais comportamentais' : 'Behavioral signals'}
    </p>
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-200">
          {data.headers.map((h, i) => (
            <th key={i} className="py-2 px-3 text-left text-gray-700 font-medium text-xs uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100">
            {row.map((cell, ci) => (
              <td key={ci} className={`py-2.5 px-3 text-left ${ci === 0 ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Distribution bars (57 / 28 / 15 %) for incentive-need
export const PriceConversionIncentiveDistribution = ({
  data,
  lang,
}: {
  data: { group: string; percentage: number }[];
  lang: string;
}) => {
  const palette = ['#10b981', '#F4845F', '#94a3b8'];
  return (
    <div className="my-4">
      <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
        {lang === 'pt' ? 'Distribuição preditiva da audiência' : 'Predictive audience distribution'}
      </p>
      <div className="flex w-full h-8 rounded-md overflow-hidden">
        {data.map((d, i) => (
          <div
            key={i}
            style={{ width: `${d.percentage}%`, backgroundColor: palette[i % palette.length] }}
            className="flex items-center justify-center text-white text-xs font-semibold"
            title={`${d.group} · ${d.percentage}%`}
          >
            {d.percentage}%
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-700">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: palette[i % palette.length] }} />
            <span>{d.group}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Incentive table with tone on recommended action
export const PriceConversionIncentiveTable = ({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}) => {
  const actionTone = (v: string): string => {
    const s = v.toLowerCase();
    if (s.includes('manter') || s.includes('hold')) return 'text-gray-500 font-semibold';
    if (s.includes('não') || s.includes('do not')) return 'text-gray-500 font-semibold';
    if (s.includes('controlado') || s.includes('controlled') || s.includes('moderado')) return 'text-orange-600 font-semibold';
    if (s.includes('direcionado') || s.includes('targeted')) return 'text-amber-700 font-semibold';
    return 'text-gray-700 font-semibold';
  };
  return (
    <div className="my-4 overflow-x-auto w-full min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {data.headers.map((h, i) => (
              <th key={i} className={`py-2 px-3 text-gray-700 font-medium text-xs uppercase tracking-wider ${i === 0 || i === data.headers.length - 1 ? 'text-left' : 'text-center'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100">
              {row.map((cell, ci) => {
                if (ci === 0) return <td key={ci} className="py-2.5 px-3 text-left font-medium text-gray-900">{cell}</td>;
                if (ci === 1) return <td key={ci} className="py-2.5 px-3 text-center tabular-nums text-gray-800">{cell}</td>;
                if (ci === 2) return <td key={ci} className="py-2.5 px-3 text-center tabular-nums text-orange-600 font-semibold">{cell}</td>;
                if (ci === 3) return <td key={ci} className={`py-2.5 px-3 text-center ${actionTone(cell)}`}>{cell}</td>;
                return <td key={ci} className="py-2.5 px-3 text-left text-gray-700">{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Simple bullet list for "what the model observes" style detail
export const PriceConversionDetailList = ({
  items,
  lang,
}: {
  items: string[];
  lang: string;
}) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'O que o modelo observa em cada sessão' : 'What the model observes in each session'}
    </p>
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="text-gray-700 text-sm flex gap-2 leading-relaxed">
          <span className="text-orange-500 flex-shrink-0">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);
