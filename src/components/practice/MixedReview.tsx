"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap } from "lucide-react";

interface Question {
  type: string;
  question: string;
  options: string[];
  correct: number;
}

interface Props {
  data: { questions: Question[]; timeLimitSec: number };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

const typeLabels: Record<string, string> = {
  vocab: "📖 Vocabulary",
  grammar: "📝 Grammar",
  error: "🔍 Error Spotting",
  association: "🔗 Association",
  reading: "📚 Reading",
};

export default function MixedReview({ data, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data.timeLimitSec);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (timeLeft <= 0 && !finished) {
      const elapsed = Math.round((Date.now() - startTime.current) / 1000);
      setFinished(true);
      onComplete(score, index, elapsed, maxCombo, answers);
    }
    if (finished) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, finished]);

  const handleAnswer = useCallback((optIdx: number) => {
    if (finished || feedback) return;
    const q = data.questions[index];
    const isCorrect = optIdx === q.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
    } else {
      setCombo(0);
    }
    setAnswers((a) => [...a, optIdx]);
    setFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      if (index < data.questions.length - 1) setIndex((i) => i + 1);
      else {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), data.questions.length, elapsed, maxCombo, [...answers, optIdx]);
      }
    }, 500);
  }, [finished, feedback, data.questions, index, combo, maxCombo, score, answers, onComplete]);

  if (finished) return null;

  const q = data.questions[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-amber-500 font-bold"><Timer className="w-4 h-4" />{timeLeft}s</div>
        <div className="text-sm text-gray-500">{index + 1} / {data.questions.length}</div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold"><Zap className="w-4 h-4" />{combo}x</div>
      </div>

      <div className="text-xs text-gray-400 text-center mb-2">{typeLabels[q.type] || q.type}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-8"
        >
          <p className="text-lg font-semibold text-gray-900 mb-6">{q.question}</p>
          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all btn-macos ${
                  feedback === null
                    ? "bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-gray-700"
                    : feedback === "correct" && i === q.correct
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : feedback === "wrong" && i === q.correct
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : feedback === "wrong" && i === answers[answers.length - 1]
                    ? "bg-red-100 border-2 border-red-400 text-red-800"
                    : "bg-gray-50 border border-gray-200 text-gray-400"
                }`}
                disabled={feedback !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
