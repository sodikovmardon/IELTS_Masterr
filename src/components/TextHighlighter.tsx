"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter, StickyNote, X, Trash2, Palette, MessageSquare } from "lucide-react";

interface Highlight {
  id: string;
  selectedText: string;
  startOffset: number;
  endOffset: number;
  color: string;
  note?: string | null;
}

interface Props {
  lessonId: string;
  text: string;
  onWordClick?: (word: string) => void;
  children?: (renderHighlights: (text: string) => React.ReactNode) => React.ReactNode;
}

const COLORS = [
  { id: "yellow", bg: "#fef08a", label: "Muhim" },
  { id: "green", bg: "#bbf7d0", label: "Tushundim" },
  { id: "red", bg: "#fecaca", label: "Tushunmadim" },
];

export default function TextHighlighter({ lessonId, text, children }: Props) {
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [toolbar, setToolbar] = useState<{ x: number; y: number; start: number; end: number; selected: string } | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || !lessonId) return;
    fetch(`/api/highlights?lessonId=${lessonId}`)
      .then(r => r.json())
      .then(data => { if (data.highlights) setHighlights(data.highlights); })
      .catch(() => {});
  }, [session, lessonId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return;
      if (!el.contains(sel.anchorNode)) return;
      const range = sel.getRangeAt(0);
      const start = getTextOffset(range.startContainer, range.startOffset);
      const end = getTextOffset(range.endContainer, range.endOffset);
      const selected = sel.toString().trim();
      if (!selected || selected.length < 1) return;
      const rect = range.getBoundingClientRect();
      setToolbar({ x: rect.left + rect.width / 2, y: rect.top - 10, start, end, selected });
    };
    el.addEventListener("mouseup", handler);
    el.addEventListener("pointerup", handler);
    return () => {
      el.removeEventListener("mouseup", handler);
      el.removeEventListener("pointerup", handler);
    };
  }, []);

  const getTextOffset = (node: Node, offset: number): number => {
    let charOffset = 0;
    const walk = document.createTreeWalker(containerRef.current!, NodeFilter.SHOW_TEXT, null);
    while (walk.nextNode()) {
      const len = walk.currentNode.nodeValue?.length || 0;
      if (walk.currentNode === node) return charOffset + offset;
      charOffset += len;
    }
    return charOffset;
  };

  const addHighlight = async (color: string) => {
    if (!toolbar || !session?.user?.id) return;
    try {
      const res = await fetch("/api/highlights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          selectedText: toolbar.selected,
          startOffset: toolbar.start,
          endOffset: toolbar.end,
          color,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setHighlights(prev => [...prev, data.highlight]);
      }
    } catch {}
    setToolbar(null);
    window.getSelection()?.removeAllRanges();
  };

  const deleteHighlight = async (id: string) => {
    try {
      await fetch("/api/highlights", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setHighlights(prev => prev.filter(h => h.id !== id));
    } catch {}
  };

  const saveNote = async (id: string) => {
    try {
      await fetch("/api/highlights", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, note: noteText }),
      });
      setHighlights(prev => prev.map(h => h.id === id ? { ...h, note: noteText } : h));
    } catch {}
    setEditingNote(null);
    setNoteText("");
  };

  const renderHighlightedText = () => {
    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    const sorted = [...highlights].sort((a, b) => a.startOffset - b.startOffset);
    const parts: { start: number; end: number; text: string; highlight?: Highlight }[] = [];
    let pos = 0;

    sorted.forEach(h => {
      if (h.startOffset > pos) {
        parts.push({ start: pos, end: h.startOffset, text: text.slice(pos, h.startOffset) });
      }
      parts.push({ start: h.startOffset, end: h.endOffset, text: text.slice(h.startOffset, h.endOffset), highlight: h });
      pos = h.endOffset;
    });
    if (pos < text.length) {
      parts.push({ start: pos, end: text.length, text: text.slice(pos) });
    }

    return parts.map((p, i) => {
      if (p.highlight) {
        const color = COLORS.find(c => c.id === p.highlight!.color);
        return (
          <mark
            key={i}
            data-highlight-id={p.highlight.id}
            className="relative group cursor-pointer rounded px-0.5"
            style={{ backgroundColor: color?.bg || "#fef08a" }}
            onClick={() => deleteHighlight(p.highlight!.id)}
            title={`${p.highlight.selectedText} — ${color?.label || ""} (bosish o'chiradi)`}
          >
            {p.text}
            <span className="absolute -top-3 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-3 h-3 text-red-500" />
            </span>
          </mark>
        );
      }
      if (onWordClick) {
        const words = p.text.split(/(\s+)/);
        return (
          <span key={i}>
            {words.map((w, j) => {
              const cleaned = w.replace(/[^a-zA-Z'-]/g, "");
              if (cleaned.length > 1) {
                return (
                  <span
                    key={j}
                    onClick={() => onWordClick(cleaned.toLowerCase())}
                    className="cursor-pointer hover:text-primary transition-colors"
                    title={cleaned}
                  >
                    {w}
                  </span>
                );
              }
              return <span key={j}>{w}</span>;
            })}
          </span>
        );
      }
      return <span key={i}>{p.text}</span>;
    });
  };

  const colorBg: Record<string, string> = {};
  COLORS.forEach(c => { colorBg[c.id] = c.bg; });

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        {highlights.length > 0 && (
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
          >
            <Highlighter className="w-3.5 h-3.5" />
            {showPanel ? "Yopish" : `Highlightlar (${highlights.length})`}
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="select-text"
      >
        {renderHighlightedText()}
      </div>

      <AnimatePresence>
        {toolbar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="fixed z-50 flex items-center gap-1 bg-white rounded-xl shadow-xl border border-gray-200 px-2.5 py-2"
            style={{
              left: Math.max(10, Math.min(toolbar.x - 80, window.innerWidth - 180)),
              top: Math.max(10, toolbar.y - 50),
            }}
          >
            {COLORS.map(c => (
              <button
                key={c.id}
                onClick={() => addHighlight(c.id)}
                className="w-7 h-7 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: c.bg }}
                title={c.label}
              />
            ))}
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={() => {
                setNoteText("");
                setEditingNote("new");
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Eslatma qo'shish"
            >
              <StickyNote className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => { setToolbar(null); window.getSelection()?.removeAllRanges(); }}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPanel && highlights.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 border border-gray-100 rounded-xl bg-white divide-y divide-gray-50 max-h-60 overflow-y-auto">
              {highlights.map(h => {
                const color = COLORS.find(c => c.id === h.color);
                return (
                  <div key={h.id} className="p-3 flex items-start gap-2 group">
                    <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: color?.bg }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 line-clamp-2">&ldquo;{h.selectedText}&rdquo;</p>
                      {h.note && <p className="text-[10px] text-gray-500 mt-0.5 italic">{h.note}</p>}
                    </div>
                    <button onClick={() => deleteHighlight(h.id)} className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
