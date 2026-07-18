"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, Undo2 } from "lucide-react";

interface Question {
  scrambled: string[];
  correct: string[];
}

interface Props {
  data: { questions: Question[]; timeLimitSec: number };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function SentenceBuilder({ data, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data.timeLimitSec);
  const [finished, setFinished] = useState(false);
  const [placed, setPlaced] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (timeLeft <= 0 && !finished) {
      const elapsed = Math.round((Date.now() - startTime.current) / 1000);
      setFinished(true);
      onComplete(score, index, elapsed, maxCombo, attempts);
    }
    if (finished) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, finished]);

  const initQuestion = useCallback((i: number) => {
    const q = data.questions[i];
    setPlaced([]);
    setRemaining([...q.scrambled]);
    setFeedback(null);
  }, [data.questions]);

  useEffect(() => {
    initQuestion(0);
  }, []);

  useEffect(() => {
    initQuestion(index);
  }, [index]);

  const handleWordClick = useCallback((word: string, fromPlaced: boolean) => {
    if (finished || feedback) return;
    if (fromPlaced) {
      setPlaced((p) => p.filter((w) => w !== word));
      setRemaining((r) => [...r, word]);
    } else {
      setPlaced((p) => [...p, word]);
      setRemaining((r) => r.filter((w) => w !== word));
    }
  }, [finished, feedback]);

  const checkAnswer = useCallback(() => {
    if (finished || feedback || remaining.length > 0) return;
    const q = data.questions[index];
    const isCorrect = placed.every((w, i) => w === q.correct[i]);
    if (isCorrect) {
      setScore((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
    } else {
      setCombo(0);
    }
    setAttempts((a) => [...a, isCorrect ? 1 : 0]);
    setFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      if (index < data.questions.length - 1) setIndex((i) => i + 1);
      else {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), data.questions.length, elapsed, maxCombo, [...attempts, isCorrect ? 1 : 0]);
      }
    }, 800);
  }, [finished, feedback, remaining, placed, data.questions, index, combo, maxCombo, score, attempts, onComplete]);

  const resetCurrent = () => {
    initQuestion(index);
  };

  if (finished) return null;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-amber-500 font-bold"><Timer className="w-4 h-4" />{timeLeft}s</div>
        <div className="text-sm text-gray-500">{index + 1} / {data.questions.length}</div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold"><Zap className="w-4 h-4" />{combo}x</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6"
        >
          <p className="text-sm text-gray-500 mb-4">So'zlarni to'g'ri tartibda joylashtiring:</p>

          <div className="min-h-[60px] bg-indigo-50 rounded-xl p-4 mb-4 flex flex-wrap gap-2">
            {placed.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-indigo-200 text-gray-800 cursor-pointer hover:bg-indigo-100 transition-colors text-sm font-medium"
                onClick={() => handleWordClick(word, true)}
              >
                {word}
              </motion.span>
            ))}
            {placed.length === 0 && <span className="text-gray-400 text-sm italic">Bu yerga so'zlarni bosib o'tkazing</span>}
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {remaining.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors text-sm font-medium"
                onClick={() => handleWordClick(word, false)}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={resetCurrent} className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors btn-macos text-sm">
              <Undo2 className="w-3 h-3" /> Reset
            </button>
            <button
              onClick={checkAnswer}
              disabled={remaining.length > 0}
              className="flex-1 bg-primary text-white py-2 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 btn-macos text-sm"
            >
              Tekshirish
            </button>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-center p-3 rounded-xl text-sm ${
                feedback === "correct" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {feedback === "correct"
                ? `✅ To'g'ri!`
                : `❌ To'g'ri tartib: ${data.questions[index].correct.join(" ")}`}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
