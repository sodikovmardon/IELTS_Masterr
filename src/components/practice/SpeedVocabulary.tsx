"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Timer } from "lucide-react";

interface Question {
  word: string;
  options: string[];
  correct: number;
}

interface Props {
  data: { questions: Question[]; timeLimitSec: number; lives: number };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function SpeedVocabulary({ data, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(data.lives);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(data.timeLimitSec);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (timeLeft <= 0 && !finished) {
      setFinished(true);
      const elapsed = Math.round((Date.now() - startTime.current) / 1000);
      onComplete(score, index, elapsed, maxCombo, answers);
      return;
    }
    if (finished) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, finished, score, index, maxCombo, answers, onComplete]);

  const handleAnswer = useCallback((optIdx: number) => {
    if (finished || feedback) return;
    const q = data.questions[index];
    const isCorrect = optIdx === q.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setFeedback("correct");
    } else {
      setCombo(0);
      setLives((l) => l - 1);
      setFeedback("wrong");
      if (lives <= 1) {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score, index + 1, elapsed, maxCombo, [...answers, optIdx]);
        return;
      }
    }
    setAnswers((a) => [...a, optIdx]);
    setTimeout(() => {
      setFeedback(null);
      if (index < data.questions.length - 1) setIndex((i) => i + 1);
      else {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), data.questions.length, elapsed, maxCombo, [...answers, optIdx]);
      }
    }, 500);
  }, [finished, feedback, data.questions, index, combo, maxCombo, score, lives, answers, onComplete]);

  if (finished) return null;

  const q = data.questions[index];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 text-red-500">
          {Array.from({ length: lives }).map((_, i) => (
            <Heart key={i} className="w-5 h-5 fill-red-500" />
          ))}
          {Array.from({ length: Math.max(0, data.lives - lives) }).map((_, i) => (
            <Heart key={`lost-${i}`} className="w-5 h-5 text-gray-300" />
          ))}
        </div>
        <div className="flex items-center gap-2 text-amber-500 font-bold">
          <Timer className="w-4 h-4" />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold">
          <Zap className="w-4 h-4" />
          <span>{combo}x</span>
        </div>
      </div>

      <div className="text-center mb-2 text-sm text-gray-500">
        {index + 1} / {data.questions.length}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((index) / data.questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-8 text-center"
        >
          <div className="text-3xl font-bold text-gray-900 mb-6">{q.word}</div>
          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all btn-macos ${
                  feedback === null
                    ? "bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 text-gray-700"
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
