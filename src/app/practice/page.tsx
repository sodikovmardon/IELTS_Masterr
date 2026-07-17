"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Volume2, Loader2 } from "lucide-react";
import SmartDictionary from "@/components/SmartDictionary";

interface Passage {
  id: string;
  title: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  vocabulary: { word: string; meaning: string }[];
}

export default function PracticePage() {
  const { data: session } = useSession();
  const [passages, setPassages] = useState<Passage[]>([]);
  const [activePassage, setActivePassage] = useState<Passage | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [dictWord, setDictWord] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    fetch("/api/practice")
      .then((r) => r.json())
      .then((data) => setPassages(data.passages));
  }, []);

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z-]/g, "").toLowerCase();
    if (cleanWord && cleanWord.length > 1) {
      setDictWord(cleanWord);
      setSelectedText(cleanWord);
    }
  };

  const handleStartPassage = (passage: Passage) => {
    setActivePassage(passage);
    setAnswers([]);
    setSubmitted(false);
    setResult(null);
  };

  const handleAnswer = (qIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!activePassage) return;
    setSubmitted(true);

    let score = 0;
    activePassage.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });
    setResult({ score, total: activePassage.questions.length });

    if (session) {
      setSaving(true);
      try {
        await fetch("/api/practice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            practiceId: activePassage.id,
            passageId: activePassage.id,
            answers,
          }),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setSaving(false);
      }
    }

    for (const word of activePassage.vocabulary) {
      handleWordClick(word.word);
    }
  };

  if (activePassage && !submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setActivePassage(null)}
          className="text-sm text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          ← Matnlar ro'yxatiga qaytish
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {activePassage.title}
          </h2>
          <div
            className="text-gray-700 leading-relaxed space-y-2 cursor-default"
            onClick={(e) => {
              const sel = window.getSelection();
              if (sel) {
                const text = sel.toString().trim().split(" ")[0];
                if (text) handleWordClick(text);
              }
            }}
          >
            {activePassage.content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activePassage.vocabulary.map((v) => (
              <button
                key={v.word}
                onClick={() => handleWordClick(v.word)}
                className="text-xs px-2 py-1 bg-accent-yellow bg-opacity-40 text-yellow-800 rounded-full hover:bg-opacity-60 transition-colors"
              >
                {v.word}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4 mb-6">
          {activePassage.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5"
            >
              <p className="font-medium text-gray-900 mb-3">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                      answers[qIndex] === oIndex
                        ? "border-primary bg-indigo-50 text-primary"
                        : "border-gray-200 hover:border-primary/50 text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + oIndex)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={answers.length < activePassage.questions.length}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 btn-macos"
        >
          {saving ? "Saqlanmoqda..." : "Javoblarni tekshirish"}
        </button>

        {dictWord && (
          <SmartDictionary
            word={dictWord}
            onClose={() => setDictWord(null)}
          />
        )}
      </div>
    );
  }

  if (activePassage && submitted && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos p-8 text-center border border-white/20"
        >
          <div className="text-4xl font-bold text-primary mb-2">
            {result.score}/{result.total}
          </div>
          <p className="text-gray-600 mb-2">To'g'ri javoblar</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-accent-mint h-3 rounded-full transition-all"
              style={{
                width: `${(result.score / result.total) * 100}%`,
              }}
            />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleStartPassage(activePassage)}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors btn-macos"
            >
              Qayta urinish
            </button>
            <button
              onClick={() => setActivePassage(null)}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
            >
              Boshqa matn
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactive Practice
          </h1>
          <p className="text-gray-600">
            Matnlarni o'qing, savollarga javob bering va so'zlarning ma'nosini
            toping
          </p>
        </div>

        <div className="grid gap-6">
          {passages.map((passage, i) => (
            <motion.div
              key={passage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 hover:shadow-macos transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-900">
                      {passage.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {passage.content.slice(0, 150)}...
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{passage.questions.length} ta savol</span>
                    <span>{passage.vocabulary.length} ta so'z</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartPassage(passage)}
                  className="flex items-center gap-1 text-primary text-sm font-medium hover:underline whitespace-nowrap"
                >
                  Boshlash <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {dictWord && (
        <SmartDictionary word={dictWord} onClose={() => setDictWord(null)} />
      )}
    </div>
  );
}
