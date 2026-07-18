"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, Volume2 } from "lucide-react";

interface Question {
  word: string;
  options: string[];
  correct: number;
}

interface Props {
  data: { questions: Question[]; timeLimitSec: number };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function PronunciationChallenge({ data, onComplete }: Props) {
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

  const speak = useCallback((text: string, rate: number = 0.8) => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

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
    }, 600);
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

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-8 text-center"
        >
          <div className="text-sm text-gray-500 mb-4">To'g'ri talaffuzni toping:</div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">{q.word}</span>
            <button
              onClick={() => speak(q.word, 0.7)}
              className="p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors btn-macos"
            >
              <Volume2 className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => { speak(opt, 0.8); handleAnswer(i); }}
                className={`w-full p-4 rounded-xl font-mono text-sm transition-all btn-macos ${
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
