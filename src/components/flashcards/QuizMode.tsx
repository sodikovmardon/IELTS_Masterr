"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Volume2 } from "lucide-react";
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

export default function QuizMode({ cards, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [completed, setCompleted] = useState(false);
  const startTime = useRef(Date.now());

  const generateOptions = useCallback((correct: FlashcardData): string[] => {
    const wrong = cards
      .filter((c) => c.id !== correct.id && c.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.meaning!);
    const opts = [correct.meaning!, ...wrong].sort(() => Math.random() - 0.5);
    return opts;
  }, [cards]);

  const [options, setOptions] = useState<string[]>([]);
  const correctAnswer = cards[index]?.meaning || "";

  useEffect(() => {
    if (cards.length > 0) setOptions(generateOptions(cards[index]));
  }, [index, cards, generateOptions]);

  const handleAnswer = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const isCorrect = options[optIdx] === correctAnswer;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (index < cards.length - 1) setIndex((i) => i + 1);
      else { setCompleted(true); onComplete(score + (isCorrect ? 1 : 0), cards.length); }
    }, 800);
  };

  if (completed || cards.length === 0) return null;

  const card = cards[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">Quiz</span>
        <div className="text-xs text-gray-400 mt-1">{index + 1} / {cards.length}</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(index / cards.length) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-8 text-center"
        >
          <div className="text-6xl mb-4">{card.visualIcon || getWordIcon(card.word)}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1 capitalize">{card.word}</h3>
          <button
            onClick={() => { const u = new SpeechSynthesisUtterance(card.word); u.lang = "en-US"; speechSynthesis.speak(u); }}
            className="p-2 bg-gray-100 rounded-full inline-flex mb-6 hover:bg-gray-200 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-gray-600" />
          </button>

          <p className="text-sm text-gray-500 mb-4">To'g'ri ma'noni tanlang:</p>

          <div className="grid gap-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all btn-macos ${
                  selected === null
                    ? "bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-gray-700"
                    : feedback === "correct" && options[i] === correctAnswer
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : feedback === "wrong" && options[i] === correctAnswer
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : selected === i
                    ? "bg-red-100 border-2 border-red-400 text-red-800"
                    : "bg-gray-50 border border-gray-200 text-gray-400"
                }`}
                disabled={selected !== null}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {selected !== null && options[i] === correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {selected === i && feedback === "wrong" && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
