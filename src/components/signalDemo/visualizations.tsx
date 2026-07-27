import { LineChart, Line, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, ReferenceLine, ReferenceArea, ReferenceDot, Cell } from 'recharts';

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

// ============================================================================
// Mix, Sortimento e Pedido Ideal
// ============================================================================

const MIX_QUADRANT_COLORS: Record<string, string> = {
  positive: '#10b981',   // outlier positivo — verde
  negative: '#ef4444',   // outlier negativo — vermelho
  aligned:  '#3b82f6',   // padrão regional — azul
  emerging: '#f59e0b',   // demanda emergente — âmbar
};

const MIX_QUADRANT_LABELS: Record<string, { pt: string; en: string }> = {
  positive: { pt: 'Outlier positivo', en: 'Positive outlier' },
  negative: { pt: 'Outlier negativo', en: 'Negative outlier' },
  aligned:  { pt: 'Padrão regional', en: 'Regional baseline' },
  emerging: { pt: 'Demanda emergente', en: 'Emerging demand' },
};

type MixScatterPoint = { adherence: number; productivity: number; size: number; label: string; quadrant: string };

export const MixBehaviorScatter = ({ data, lang }: { data: MixScatterPoint[]; lang: string }) => {
  const quadrants: string[] = ['positive', 'aligned', 'emerging', 'negative'];
  return (
    <div className="my-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              type="number"
              dataKey="adherence"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}%`}
              label={{ value: lang === 'pt' ? 'Aderência ao mix ideal' : 'Ideal-mix adherence', position: 'insideBottom', offset: -4, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="productivity"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}`}
              label={{ value: lang === 'pt' ? 'Produtividade por SKU' : 'Productivity per SKU', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[120, 900]} />
            <ReferenceLine x={75} stroke="#9ca3af" strokeDasharray="4 4" />
            <ReferenceLine y={60} stroke="#9ca3af" strokeDasharray="4 4" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => {
                if (name === 'adherence') return [`${value}%`, lang === 'pt' ? 'Aderência' : 'Adherence'];
                if (name === 'productivity') return [`${value}`, lang === 'pt' ? 'Produtividade' : 'Productivity'];
                if (name === 'size') return [value.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'), lang === 'pt' ? 'Potencial de ticket' : 'Basket potential'];
                return [value, name];
              }}
              labelFormatter={(_, payload) => (payload?.[0]?.payload as MixScatterPoint | undefined)?.label ?? ''}
            />
            {quadrants.map((q) => (
              <Scatter key={q} name={MIX_QUADRANT_LABELS[q][lang === 'pt' ? 'pt' : 'en']} data={data.filter((d) => d.quadrant === q)} fill={MIX_QUADRANT_COLORS[q]}>
                {data.filter((d) => d.quadrant === q).map((_, i) => (
                  <Cell key={i} fill={MIX_QUADRANT_COLORS[q]} fillOpacity={0.75} stroke={MIX_QUADRANT_COLORS[q]} />
                ))}
              </Scatter>
            ))}
            <Legend wrapperStyle={{ color: '#6b7280', fontSize: '11px', paddingTop: '8px' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-400 text-xs mt-3 leading-relaxed">
        {lang === 'pt'
          ? 'Eixo X: aderência ao mix ideal. Eixo Y: produtividade por SKU. Tamanho da bolha: potencial de ticket.'
          : 'X axis: adherence to ideal assortment. Y axis: productivity per SKU. Bubble size: basket potential.'}
      </p>
    </div>
  );
};

const adherenceTone = (raw: string): string => {
  const n = parseInt(raw);
  if (!isNaN(n)) {
    if (n >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (n >= 65) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (n >= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

const potentialTone = (raw: string): string => {
  if (raw.startsWith('+')) return 'text-emerald-700 font-semibold';
  if (raw.startsWith('−') || raw.startsWith('-')) return 'text-red-600 font-semibold';
  return 'text-gray-800';
};

export const MixBehaviorTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  <div className="overflow-x-auto my-4">
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
                <td key={ci} className="py-2.5 px-3 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border tabular-nums ${adherenceTone(cell)}`}>{cell}</span>
                </td>
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
    <div className="my-4 overflow-x-auto">
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
  <div className="overflow-x-auto my-4">
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
  <div className="overflow-x-auto my-4">
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
  if (v.startsWith('alto') || v.startsWith('high')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (v.startsWith('médio') || v.startsWith('medio') || v.startsWith('medium')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (v.startsWith('baixo') || v.startsWith('low')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (v.startsWith('negativo') || v.startsWith('negative')) return 'bg-red-50 text-red-700 border-red-200';
  return 'bg-gray-50 text-gray-700 border-gray-200';
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
  <div className="overflow-x-auto my-4">
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
                <td key={ci} className="py-2.5 px-3 text-left">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${marginRoomTone(cell)}`}>{cell}</span>
                </td>
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
  if (v.startsWith('alto') || v.startsWith('high')) return 'bg-red-50 text-red-700 border-red-200';
  if (v.startsWith('médio') || v.startsWith('medio') || v.startsWith('medium')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (v.startsWith('baixo') || v.startsWith('low')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return 'bg-gray-50 text-gray-700 border-gray-200';
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
    <div className="overflow-x-auto">
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
                  <td key={ci} className="py-2.5 px-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${riskTone(cell)}`}>{cell}</span>
                  </td>
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
    <div className="overflow-x-auto">
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
  if (v.startsWith('manter') || v.startsWith('hold')) return 'bg-gray-100 text-gray-700 border-gray-200';
  if (v.startsWith('reavaliar') || v.startsWith('reassess')) return 'bg-amber-50 text-amber-700 border-amber-200';
  // discounts
  const m = v.match(/(\d+)/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 18) return 'bg-red-50 text-red-700 border-red-200';
    if (n >= 10) return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-orange-50/70 text-orange-600 border-orange-100';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

export const TurnoverMarkdownRuler = ({ data, lang }: { data: { headers: string[]; rows: string[][] }; lang: string }) => (
  <div className="my-4">
    <p className="text-orange-500 font-semibold text-xs uppercase tracking-wider mb-2">
      {lang === 'pt' ? 'Régua temporal de markdown' : 'Markdown timing ladder'}
    </p>
    <div className="overflow-x-auto">
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
                  <td key={ci} className="py-2 px-2 text-center">
                    <span className={`inline-block min-w-[70px] px-3 py-1 rounded-md text-xs font-semibold border ${markdownCellTone(cell)}`}>
                      {cell}
                    </span>
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
    <div className="overflow-x-auto">
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
                    <td key={ci} className="py-2.5 px-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${hold ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                        {cell}
                      </span>
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
