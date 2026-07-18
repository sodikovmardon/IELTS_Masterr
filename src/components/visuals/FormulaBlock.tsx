"use client";

interface FormulaBlockProps {
  formula: string;
  label?: string;
}

export function FormulaBlock({ formula, label }: FormulaBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-cyan-800/30 my-4">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-cyan-900/40 border-b border-cyan-800/30">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        {label && (
          <span className="text-[10px] text-cyan-300/60 font-mono ml-2">{label}</span>
        )}
      </div>
      <div className="bg-[#0B2B4A] px-5 py-4 overflow-x-auto">
        <code className="text-sm font-mono text-cyan-100 whitespace-pre-wrap leading-relaxed">
          {formula}
        </code>
      </div>
    </div>
  );
}

export function ErrorCorrection({ text, errors }: { text: string; errors: { from: number; to: number }[] }) {
  const parts: { text: string; isError: boolean }[] = [];
  let lastIndex = 0;

  const sorted = [...errors].sort((a, b) => a.from - b.from);
  for (const err of sorted) {
    if (err.from > lastIndex) {
      parts.push({ text: text.slice(lastIndex, err.from), isError: false });
    }
    parts.push({ text: text.slice(err.from, err.to), isError: true });
    lastIndex = err.to;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isError: false });
  }

  return (
    <div className="bg-[#0B2B4A] rounded-xl border border-cyan-800/30 p-5 my-4 font-mono text-sm leading-relaxed">
      {parts.map((part, i) =>
        part.isError ? (
          <span key={i} className="relative text-red-300">
            {part.text}
            <svg className="absolute -bottom-0.5 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0 8 Q 12 0, 25 8 T 50 8 T 75 8 T 100 8" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" />
            </svg>
          </span>
        ) : (
          <span key={i} className="text-cyan-100">{part.text}</span>
        )
      )}
    </div>
  );
}
