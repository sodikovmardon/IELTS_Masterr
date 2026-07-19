"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, Volume2 } from "lucide-react";
import { getWordIcon } from "@/lib/wordIcons";

interface FlashcardData {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  visualIcon: string;
}

interface Props {
  cards: FlashcardData[];
  onComplete: (score: number, total: number) => void;
  timeLimit?: number;
}

export default function SpeedMode({ cards, onComplete, timeLimit = 60 }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [completed, setCompleted] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (timeLeft <= 0 && !completed) {
      setCompleted(true);
      onComplete(score, index);
      return;
    }
    if (completed) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, completed, score, index, onComplete]);

  const handleAnswer = useCallback((correct: boolean) => {
    if (feedback) return;
    if (correct) {
      setScore((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
    } else {
      setCombo(0);
    }
    setFeedback(correct ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      if (index < cards.length - 1) setIndex((i) => i + 1);
      else {
        setCompleted(true);
        onComplete(score + (correct ? 1 : 0), cards.length);
      }
    }, 400);
  }, [feedback, combo, maxCombo, index, cards.length, score, onComplete]);

  if (completed || cards.length === 0) return null;

  const card = cards[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 font-bold">
          <Timer className={`w-5 h-5 ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-amber-500"}`} />
          <span className={timeLeft <= 10 ? "text-red-500" : "text-gray-700"}>{timeLeft}s</span>
        </div>
        <div className="text-sm text-gray-500">{index + 1} / {cards.length}</div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold">
          <Zap className="w-4 h-4" /> {combo}x
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
          <div className="text-5xl mb-3">{card.visualIcon || getWordIcon(card.word)}</div>
          <h3 className="text-2xl font-bold text-gray-900 capitalize mb-1">{card.word}</h3>
          <button
            onClick={() => { const u = new SpeechSynthesisUtterance(card.word); u.lang = "en-US"; speechSynthesis.speak(u); }}
            className="p-1.5 bg-gray-100 rounded-full inline-flex mb-4 hover:bg-gray-200 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-gray-600" />
          </button>

          <p className="text-sm text-gray-400 mb-4">{card.meaning}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center gap-2 px-8 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all btn-macos"
            >
              Esimda yo'q
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center gap-2 px-8 py-3 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-all btn-macos"
            >
              Bilaman
            </button>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-sm ${feedback === "correct" ? "text-green-600" : "text-red-600"}`}
            >
              {feedback === "correct" ? "✅ To'g'ri!" : "❌ Xato!"}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
