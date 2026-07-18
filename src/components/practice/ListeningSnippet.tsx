"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, Volume2, Play } from "lucide-react";

interface Question {
  audio: string;
  text: string;
  options: string[];
  correct: number;
  duration: number;
}

interface Props {
  data: { questions: Question[] };
  onComplete: (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => void;
}

export default function ListeningSnippet({ data, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const startTime = useRef(Date.now());

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    utterance.onend = () => setAudioPlayed(true);
  }, []);

  const handlePlay = useCallback(() => {
    setAudioPlayed(false);
    speak(data.questions[index].text);
  }, [index, data.questions, speak]);

  useEffect(() => {
    setAudioPlayed(false);
  }, [index]);

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
          <div className="mb-6">
            <button
              onClick={handlePlay}
              className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto hover:bg-indigo-200 transition-colors btn-macos"
            >
              {audioPlayed ? (
                <Volume2 className="w-8 h-8 text-indigo-600" />
              ) : (
                <Play className="w-8 h-8 text-indigo-600 ml-1" />
              )}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {audioPlayed ? "Audio tinglandi" : "Audioni tinglang va savolga javob bering"}
            </p>
          </div>

          <p className="font-semibold text-gray-900 mb-6">{q.audio}</p>

          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={!audioPlayed}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all btn-macos ${
                  !audioPlayed
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : feedback === null
                    ? "bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-gray-700"
                    : feedback === "correct" && i === q.correct
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : feedback === "wrong" && i === q.correct
                    ? "bg-green-100 border-2 border-green-400 text-green-800"
                    : feedback === "wrong" && i === answers[answers.length - 1]
                    ? "bg-red-100 border-2 border-red-400 text-red-800"
                    : "bg-gray-50 border border-gray-200 text-gray-400"
                }`}
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
