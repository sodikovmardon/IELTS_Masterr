"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronDown, Target } from "lucide-react";

interface Props {
  passageText: string;
  correctAnswer: string;
  questionText: string;
  open: boolean;
  onClose: () => void;
}

export default function SourceViewer({ passageText, correctAnswer, questionText, open, onClose }: Props) {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && highlightRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [open]);

  if (!open) return null;

  const answerText = typeof correctAnswer === "number" ? String(correctAnswer) : correctAnswer;
  const parts = passageText.split(new RegExp(`(${answerText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 max-h-[70vh] flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-gray-900 text-sm">Javob manbai</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100">
            <p className="text-xs text-gray-500 mb-1">Savol:</p>
            <p className="text-sm text-gray-800 font-medium">{questionText}</p>
            <p className="text-xs text-green-600 mt-1">
              To'g'ri javob: <span className="font-semibold">{answerText}</span>
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500">MATN</span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed select-text space-y-2">
              {parts.length > 1 ? (
                parts.map((part, i) => {
                  if (part.toLowerCase() === answerText.toLowerCase()) {
                    return (
                      <span
                        key={i}
                        ref={highlightRef}
                        className="bg-yellow-200 px-1 rounded font-medium"
                      >
                        {part}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })
              ) : (
                <p>{passageText}</p>
              )}
            </div>
          </div>

          <div className="px-5 py-3 border-t border-gray-100 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Yopish
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
