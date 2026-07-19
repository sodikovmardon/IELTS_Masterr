"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { getWordIcon } from "@/lib/wordIcons";

interface FlashcardData {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  visualIcon: string;
  category?: string | null;
}

interface Props {
  cards: FlashcardData[];
  onComplete: (score: number, total: number) => void;
}

export default function WritingMode({ cards, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const checkAnswer = useCallback(() => {
    if (feedback) return;
    const card = cards[index];
    const isCorrect = input.trim().toLowerCase() === card.word.toLowerCase();
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      setInput("");
      if (index < cards.length - 1) setIndex((i) => i + 1);
      else { setCompleted(true); onComplete(score + (isCorrect ? 1 : 0), cards.length); }
    }, 1200);
  }, [feedback, cards, index, input, score, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") checkAnswer();
  };

  if (completed || cards.length === 0) return null;

  const card = cards[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">Yozish (Spelling)</span>
        <div className="text-xs text-gray-400 mt-1">{index + 1} / {cards.length}</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(index / cards.length) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-8 text-center"
        >
          <div className="text-5xl mb-4">{card.visualIcon || getWordIcon(card.word)}</div>
          <p className="text-lg text-gray-600 mb-2">{card.meaning}</p>
          {card.translation && <p className="text-sm text-gray-400 mb-6">{card.translation}</p>}

          <button
            onClick={() => { const u = new SpeechSynthesisUtterance(card.word); u.lang = "en-US"; u.rate = 0.7; speechSynthesis.speak(u); }}
            className="p-2 bg-gray-100 rounded-full inline-flex mb-6 hover:bg-gray-200 transition-colors"
          >
            <Volume2 className="w-5 h-5 text-gray-600" />
          </button>

          <p className="text-sm text-gray-500 mb-3">So'zni yozing:</p>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={feedback !== null}
              placeholder="..."
              className={`w-full text-center text-xl font-medium p-4 rounded-xl border-2 transition-all outline-none ${
                feedback === null
                  ? "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  : feedback === "correct"
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            onClick={checkAnswer}
            disabled={!input.trim() || feedback !== null}
            className="mt-4 bg-primary text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 btn-macos"
          >
            Tekshirish
          </button>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-xl flex items-center justify-center gap-2 ${
                feedback === "correct" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {feedback === "correct" ? (
                <><CheckCircle className="w-5 h-5" /> To'g'ri!</>
              ) : (
                <><XCircle className="w-5 h-5" /> To'g'ri javob: <strong>{card.word}</strong></>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
