"use client";

interface ProcessStep {
  label: string;
  description?: string;
}

interface ProcessData {
  title?: string;
  steps: ProcessStep[];
}

export function ProcessDiagram({ data }: { data: ProcessData }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-4">{data.title}</h4>}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {data.steps.map((step, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl px-4 py-3 text-center min-w-[120px]">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-1">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-indigo-800">{step.label}</span>
                {step.description && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>
              {i < data.steps.length - 1 && (
                <div className="flex items-center text-indigo-300">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <path d="M0 12H24M24 12L18 6M24 12L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MapComparison {
  title?: string;
  map1Label: string;
  map2Label: string;
  features: { name: string; x1: number; y1: number; x2: number; y2: number; color: string }[];
}

export function MapComparison({ data }: { data: MapComparison }) {
  const w = 300;
  const h = 220;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-3">{data.title}</h4>}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-xs font-semibold text-gray-600 mb-1 block">{data.map1Label}</span>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full border border-gray-200 rounded-lg bg-gray-50">
            <rect x="10" y="10" width={w - 20} height={h - 20} fill="#e8f5e9" stroke="#81c784" strokeWidth="1.5" rx="8" />
            {data.features.map((f, i) => (
              <rect key={i} x={f.x1} y={f.y1} width={Math.abs(f.x2 - f.x1)} height={Math.abs(f.y2 - f.y1)} fill={f.color} stroke="#333" strokeWidth="1" opacity={0.7} />
            ))}
            <text x={w / 2} y={h - 8} textAnchor="middle" fontSize="9" fill="#999">
              {data.map1Label}
            </text>
          </svg>
        </div>
        <div className="text-center">
          <span className="text-xs font-semibold text-gray-600 mb-1 block">{data.map2Label}</span>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full border border-gray-200 rounded-lg bg-gray-50">
            <rect x="10" y="10" width={w - 20} height={h - 20} fill="#e8f5e9" stroke="#81c784" strokeWidth="1.5" rx="8" />
            {data.features.map((f, i) => (
              <rect key={i} x={f.x2} y={f.y2} width={Math.abs(f.x1 - f.x2)} height={Math.abs(f.y1 - f.y2)} fill={f.color} stroke="#333" strokeWidth="1" opacity={0.9} />
            ))}
            <text x={w / 2} y={h - 8} textAnchor="middle" fontSize="9" fill="#999">
              {data.map2Label}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function TableVisual({ data }: { data: { title?: string; headers: string[]; rows: string[][] } }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      {data.title && <h4 className="text-center text-sm font-semibold text-gray-700 mb-3">{data.title}</h4>}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              {data.headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-semibold text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 text-gray-700 border-t border-gray-100 text-xs">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
