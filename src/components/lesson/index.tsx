"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, AlertTriangle, BookOpen, Sparkles } from "lucide-react";

/* ─── Smart content renderer — "3 second test" ─── */

interface SmartContentOptions {
  /** Max lines before truncating with "Ko'proq o'qish" */
  maxLines?: number;
  /** Show as compact list (bullet points) */
  compact?: boolean;
}

export function SmartContent({ text, options, compact }: { text: string; options?: SmartContentOptions; compact?: boolean }) {
  if (!text) return null;
  const hasHtml = /<[a-z][\s\S]*>/i.test(text);
  if (hasHtml) return <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: text }} />;

  const maxLines = options?.maxLines ?? (compact ? 3 : 999);
  const lines = text.split("\n").filter(l => l.trim());
  const truncated = lines.length > maxLines;

  if (truncated) {
    return <ExpandableSection preview={<SmartLines lines={lines.slice(0, maxLines)} />}>
      <SmartLines lines={lines} />
    </ExpandableSection>;
  }

  return <SmartLines lines={lines} />;
}

function SmartLines({ lines }: { lines: string[] }) {
  const elements: React.ReactNode[] = [];
  let inList: { items: string[]; ordered: boolean } | null = null;

  const flushList = (key: number) => {
    if (inList) {
      const Tag = inList.ordered ? "ol" : "ul";
      const cls = inList.ordered ? "list-decimal" : "list-disc";
      elements.push(
        <Tag key={key} className={`${cls} pl-5 space-y-1.5 mb-3 text-gray-700 text-sm`}>
          {inList.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              <BoldText text={item} />
            </li>
          ))}
        </Tag>
      );
      inList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) { flushList(i); continue; }

    const orderedMatch = line.match(/^(\d+)[\)\.]\s+(.*)/);
    const unorderedMatch = line.match(/^[-*•]\s+(.*)/);

    if (orderedMatch || unorderedMatch) {
      const content = orderedMatch ? orderedMatch[2] : unorderedMatch![1];
      if (!inList) inList = { items: [], ordered: !!orderedMatch };
      inList.items.push(content);
    } else if (/^[A-Z][a-z]+:/.test(line) || line.length < 50) {
      flushList(i);
      elements.push(
        <p key={i} className="mb-2 text-gray-700 text-sm leading-relaxed">
          <BoldText text={line} />
        </p>
      );
    } else {
      flushList(i);
      elements.push(
        <p key={i} className="mb-2.5 text-gray-700 text-sm leading-relaxed">
          <BoldText text={line} />
        </p>
      );
    }
  }
  flushList(lines.length + 1);

  return <div>{elements}</div>;
}

function BoldText({ text }: { text: string }) {
  if (!text.includes("**")) return <>{text}</>;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-indigo-700">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

/* ─── Expandable / Accordion ─── */

export function ExpandableSection({
  preview,
  children,
  label = "Batafsil ko'rish",
}: {
  preview?: React.ReactNode;
  children: React.ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {preview && !open && <div className="mb-2">{preview}</div>}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        {open ? "Yopish" : label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── InfoBox — for Tips / Common Mistakes ─── */

const INFOBOX_STYLES = {
  tip: {
    bg: "bg-amber-50/90 border-amber-200",
    icon: Lightbulb,
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
    title: "💡 Maslahat",
  },
  mistake: {
    bg: "bg-red-50/90 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    title: "⚠️ Keng tarqalgan xato",
  },
  info: {
    bg: "bg-blue-50/90 border-blue-200",
    icon: BookOpen,
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    title: "ℹ️ Ma'lumot",
  },
  premium: {
    bg: "bg-amber-50/90 border-amber-200",
    icon: Sparkles,
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
    title: "⭐ Premium",
  },
};

type InfoBoxType = keyof typeof INFOBOX_STYLES;

export function InfoBox({
  type = "tip",
  title,
  children,
  compact,
}: {
  type?: InfoBoxType;
  title?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  const style = INFOBOX_STYLES[type];
  const Icon = style.icon;

  return (
    <div className={`rounded-xl border ${style.bg} ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-start gap-2.5">
        <Icon className={`w-5 h-5 ${style.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${style.titleColor} text-sm mb-1`}>
            {title || style.title}
          </h4>
          <div className="text-gray-700 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Content Card ─── */

export function ContentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-macos border border-white/20 p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Section Heading ─── */

export function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-lg sm:text-xl font-bold text-indigo-900">{children}</h2>
      <div className="w-10 h-1 bg-amber-400 rounded-full mt-2" />
    </div>
  );
}

/* ─── Language Bank Card Grid ─── */

export interface LangItem {
  word: string;
  translation?: string;
  example?: string;
}

export function LanguageGrid({ items, columns = 2 }: { items: LangItem[]; columns?: number }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(columns, 3)} gap-3`}>
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100 hover:shadow-sm transition-shadow">
          <div className="font-semibold text-indigo-700 text-sm">{item.word}</div>
          {item.translation && <div className="text-gray-500 text-xs mt-0.5">{item.translation}</div>}
          {item.example && (
            <div className="mt-2 text-xs text-gray-400 italic border-t border-gray-100 pt-1.5">
              "{item.example}"
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Grammar Formula ─── */

export function GrammarFormula({
  formula,
  examples,
}: {
  formula: string;
  examples: string[];
}) {
  return (
    <div className="bg-indigo-50/60 rounded-xl p-4 border border-indigo-100">
      <div className="font-mono font-semibold text-indigo-800 text-sm mb-2">
        {formula}
      </div>
      <ExpandableSection label={`Misollarni ko'rish (${examples.length} ta)`}>
        <ul className="space-y-1.5 mt-2">
          {examples.map((ex, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span>{ex}</span>
            </li>
          ))}
        </ul>
      </ExpandableSection>
    </div>
  );
}

/* ─── Tips List (compact inline) ─── */

export function TipsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
          <span><BoldText text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Mistakes List ─── */

export function MistakesList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <span className="text-red-500 shrink-0 mt-0.5">⚠️</span>
          <span><BoldText text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Quick Stats Badge ─── */

export function StatBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg">
      <Icon className="w-3.5 h-3.5" />
      {value} {label}
    </span>
  );
}

/* ─── Topic Box ─── */

export function TopicBox({ title, text }: { title?: string; text: string }) {
  return (
    <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-indigo-600" />
        <h3 className="font-semibold text-indigo-800 text-sm">{title || "Writing Topic"}</h3>
      </div>
      <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{text}</div>
    </div>
  );
}
