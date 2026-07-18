"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap } from "lucide-react";
import { useEffect } from "react";

interface Question {
  sentence: string;
  error: string;
  correction: string;
  options: string[];
}

interface Props {
  data: { questions: Question[]; timeLimitSec: number };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function ErrorSpotting({ data, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data.timeLimitSec);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
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
    if (finished || feedback !== null) return;
    setSelected(optIdx);
    const q = data.questions[index];
    const isCorrect = q.options[optIdx] === q.error;
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
      setSelected(null);
      if (index < data.questions.length - 1) setIndex((i) => i + 1);
      else {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), data.questions.length, elapsed, maxCombo, [...answers, optIdx]);
      }
    }, 600);
  }, [finished, feedback, data.questions, index, combo, maxCombo, score, answers, onComplete]);

  if (finished) return null;

  const q = data.questions[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-amber-500 font-bold">
          <Timer className="w-4 h-4" /> <span>{timeLeft}s</span>
        </div>
        <div className="text-sm text-gray-500">{index + 1} / {data.questions.length}</div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold">
          <Zap className="w-4 h-4" /> {combo}x
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 mb-2">Gapdagi xatoni toping:</p>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
          {q.sentence.split(" ").map((word, i) => (
            <span
              key={i}
              className={`inline-block px-1 mx-0.5 rounded cursor-pointer transition-all ${
                selected === i
                  ? feedback === "correct"
                    ? "bg-green-200 line-through"
                    : feedback === "wrong"
                    ? "bg-red-200"
                    : "bg-indigo-100"
                  : "hover:bg-gray-100"
              } ${q.options.includes(word) ? "" : "opacity-50"}`}
              onClick={() => {
                const optIdx = q.options.indexOf(word);
                if (optIdx >= 0) handleAnswer(optIdx);
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-3 rounded-xl ${feedback === "correct" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {feedback === "correct" ? "✅ To'g'ri!" : `❌ Xato! To'g'risi: "${q.correction}"`}
        </motion.div>
      )}
    </div>
  );
}
