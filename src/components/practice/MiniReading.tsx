"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap } from "lucide-react";

interface PassageQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface Passage {
  title: string;
  text: string;
  questions: PassageQuestion[];
}

interface Props {
  data: { questions: Passage[] };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function MiniReading({ data, onComplete }: Props) {
  const [passageIdx, setPassageIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const startTime = useRef(Date.now());

  const allQuestions = data.questions.flatMap((p) => p.questions);
  const maxScore = allQuestions.length;

  const handleAnswer = useCallback((optIdx: number) => {
    if (finished || feedback) return;
    const q = allQuestions[qIdx];
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
      if (qIdx < allQuestions.length - 1) {
        setQIdx((i) => i + 1);
        if (qIdx + 1 >= data.questions[passageIdx].questions.length) {
          setPassageIdx((p) => p + 1);
        }
      } else {
        const elapsed = Math.round((Date.now() - startTime.current) / 1000);
        setFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), maxScore, elapsed, maxCombo, [...answers, optIdx]);
      }
    }, 500);
  }, [finished, feedback, allQuestions, qIdx, combo, maxCombo, score, answers, maxScore, passageIdx, data.questions, onComplete]);

  const currentPassage = data.questions.find((_, i) => {
    let acc = 0;
    for (let j = 0; j < i; j++) acc += data.questions[j].questions.length;
    return qIdx >= acc && qIdx < acc + data.questions[i].questions.length;
  }) || data.questions[0];

  if (finished) return null;

  const localQ = allQuestions[qIdx];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">{qIdx + 1} / {maxScore}</div>
        <div className="flex items-center gap-1 text-indigo-500 font-bold"><Zap className="w-4 h-4" />{combo}x</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{currentPassage.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{currentPassage.text}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <p className="font-semibold text-gray-900 mb-4">{localQ.question}</p>
            <div className="grid gap-3">
              {localQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full p-3 rounded-xl text-left font-medium transition-all btn-macos ${
                    feedback === null
                      ? "bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-gray-700"
                      : feedback === "correct" && i === localQ.correct
                      ? "bg-green-100 border-2 border-green-400 text-green-800"
                      : feedback === "wrong" && i === localQ.correct
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
