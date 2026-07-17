"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function DiagnosticTestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    level: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/diagnostic-test")
      .then((r) => r.json())
      .then((data) => setQuestions(data.questions));
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, finished]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQ] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handlePrev = () => {
    setSelectedAnswer(answers[currentQ - 1] ?? null);
    setCurrentQ(currentQ - 1);
  };

  const handleFinish = async () => {
    setFinished(true);
    if (!session) {
      const total = questions.length;
      const score = answers.filter((a, i) => a === questions[i]?.correctAnswer).length;
      const level =
        score / total < 0.4
          ? "beginner"
          : score / total < 0.7
          ? "intermediate"
          : "advanced";
      setResult({ score, total, level });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/diagnostic-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!started) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-center"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Diagnostic Test
          </h1>
          <p className="text-gray-600 mb-6">
            Bu test sizning hozirgi IELTS darajangizni aniqlaydi. 12 ta savoldan
            iborat bo'lib, 10 daqiqa vaqt beriladi.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800 text-left">
            <p className="font-medium mb-1">Qoidalar:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Har bir savol faqat bitta to'g'ri javobga ega</li>
              <li>Vaqt tugagach test avtomatik yakunlanadi</li>
              <li>Agar tizimga kirmagan bo'lsangiz, natija saqlanmaydi</li>
            </ul>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors btn-macos"
          >
            Testni boshlash
          </button>
        </motion.div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos p-8 text-center border border-white/20"
        >
          <div className="w-16 h-16 bg-accent-mint bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-accent-mint" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Test yakunlandi!
          </h2>
          <p className="text-gray-600 mb-6">
            Siz {result.score}/{result.total} to'pladingiz
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600">Sizning darajangiz</div>
            <div className="text-2xl font-bold text-primary capitalize">
              {result.level === "beginner"
                ? "Boshlang'ich"
                : result.level === "intermediate"
                ? "O'rta"
                : "Yuqori"}
            </div>
            <div className="text-xs text-gray-500">({result.level})</div>
          </div>
          <div className="flex flex-col gap-3">
            {session ? (
              <>
                <button
                  onClick={() => router.push("/study-plan")}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
                >
                  Dars rejasini tuzish
                </button>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-primary font-medium hover:underline"
                >
                  Dashboardga o'tish
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
                >
                  Ro'yxatdan o'tish va natijani saqlash
                </button>
                <button
                  onClick={() => router.push("/practice")}
                  className="text-primary font-medium hover:underline"
                >
                  Amaliyotni boshlash
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQ];
  if (!question) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-gray-600">
          Savol {currentQ + 1} / {questions.length}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span className={timeLeft < 120 ? "text-red-500" : "text-gray-600"}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{
            width: `${((currentQ + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos p-6 border border-white/20"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                answers[currentQ] === i
                  ? "border-primary bg-indigo-50 text-primary"
                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors btn-macos"
          >
            Orqaga
          </button>
          {currentQ < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
            >
              Keyingi
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={saving}
              className="px-6 py-2.5 bg-accent-mint text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda..." : "Yakunlash"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
