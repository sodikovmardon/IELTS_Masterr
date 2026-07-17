"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell, Sector,
} from "recharts";

export interface ChartSeries {
  name: string;
  values: number[];
}

export interface ChartData {
  labels: string[];
  series: ChartSeries[];
  title?: string;
  yLabel?: string;
}

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export function BarChartVisual({ data }: { data: ChartData }) {
  const chartData = data.labels.map((label, i) => ({
    name: label,
    ...Object.fromEntries(data.series.map((s) => [s.name, s.values[i]])),
  }));

  return (
    <div className="w-full">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-3">{data.title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} label={data.yLabel ? { value: data.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "#999" } } : undefined} />
          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          {data.series.map((s, i) => (
            <Bar key={s.name} dataKey={s.name} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={50} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChartVisual({ data }: { data: ChartData }) {
  const chartData = data.labels.map((label, i) => ({
    name: label,
    ...Object.fromEntries(data.series.map((s) => [s.name, s.values[i]])),
  }));

  return (
    <div className="w-full">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-3">{data.title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} label={data.yLabel ? { value: data.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "#999" } } : undefined} />
          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          {data.series.map((s, i) => (
            <Line key={s.name} type="monotone" dataKey={s.name} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r: 3, fill: COLORS[i % COLORS.length] }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartVisual({ data }: { data: ChartData }) {
  const pieData = data.labels.map((label, i) => ({
    name: label,
    value: data.series[0]?.values[i] || 0,
  }));

  return (
    <div className="w-full">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-3">{data.title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
