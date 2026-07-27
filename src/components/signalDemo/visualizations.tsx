import { LineChart, Line, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, ReferenceLine, Cell } from 'recharts';

export const SupplyTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4">
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
  <div className="overflow-x-auto my-4">
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
    <div className="overflow-x-auto">
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
            <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-2.5 px-3 ${ci === 0 ? 'text-gray-900 font-semibold text-left' : 'text-gray-800 text-center'} ${ci === row.length - 1 ? 'font-bold' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
      {detail.map((c, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
          <div className="text-orange-500 font-semibold text-[13px] uppercase tracking-wider mb-1">{c.name}</div>
          <p className="text-gray-700 text-sm leading-relaxed mb-2">{c.description}</p>
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong className="text-gray-900">{lang === 'pt' ? 'Como abordar: ' : 'How to approach: '}</strong>
            {c.approach}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// Metas Comerciais Preditivas
// ============================================================================

const diagnosisTone = (value: string): string => {
  const v = value.toLowerCase();
  if (v.includes('abaixo') || v.includes('below') || v.includes('expansão') || v.includes('expansion') || v.includes('opportunity') || v.includes('oportunidade')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }
  if (v.includes('acima') || v.includes('above')) {
    return 'bg-red-50 text-red-700 border-red-200';
  }
  if (v.includes('compatível') || v.includes('aligned')) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
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
    <div className="overflow-x-auto my-4">
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

type ScatterPoint = { probability: number; delta: number; size: number; label: string; quadrant: 'above' | 'match' | 'below' | 'uncertain' };

export const TargetsRiskScatter = ({ data, lang }: { data: ScatterPoint[]; lang: string }) => {
  const quadrants: ScatterPoint['quadrant'][] = ['above', 'match', 'below', 'uncertain'];
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
  <div className="overflow-x-auto my-4">
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
                    isDiag ? '' : 'text-gray-800'
                  }`}
                >
                  {isDiag ? (
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${diagnosisTone(cell)}`}>{cell}</span>
                  ) : (
                    cell
                  )}
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
  <div className="overflow-x-auto my-4">
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

