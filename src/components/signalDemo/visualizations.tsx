import { LineChart, Line, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
