"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, BookOpen, CheckCircle2, XCircle, Trophy,
  Volume2, Plus, Loader2, ChevronRight, Layers, Sparkles,
  Shuffle, Zap, CheckCheck, Star,
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

interface VocabWord {
  id: string; lessonId: string; word: string; meaning: string;
  translation: string; exampleSentence: string; audioUrl: string | null;
}

interface Lesson {
  id: string; title: string; category: string; durationMin: number;
  isPremium: boolean; difficulty: string;
  theoryContent: string; tipsAndTricks: string | null;
  videoUrl: string | null; videoDurationSec: number | null;
  videoThumbnailUrl: string | null; transcriptText: string | null;
}

interface Flashcard { id: string; word: string; }

function asciiTableToHtml(lines: string[]): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith("+-") && lines[i].endsWith("-+")) {
      const tableLines: string[] = [];
      i++;
      let headerRow: string | null = null;
      let bodyRows: string[] = [];
      let inHeader = true;
      while (i < lines.length) {
        if (lines[i].startsWith("+-")) break;
        if (lines[i].startsWith("|")) {
          if (inHeader && headerRow === null) {
            headerRow = lines[i];
          } else if (inHeader) {
            inHeader = false;
          } else {
            bodyRows.push(lines[i]);
          }
        }
        i++;
      }
      if (headerRow) {
        const headerCells = headerRow.split("|").filter(c => c.trim());
        let html = `<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">\n<thead>\n<tr class="bg-gray-100">\n`;
        for (const cell of headerCells) {
          html += `<th class="border border-gray-300 px-4 py-2 text-left font-semibold">${cell.trim()}</th>\n`;
        }
        html += `</tr>\n</thead>\n<tbody>\n`;
        for (const row of bodyRows) {
          const cells = row.split("|").filter(c => c.trim());
          html += `<tr>`;
          for (const cell of cells) {
            html += `<td class="border border-gray-300 px-4 py-2 font-mono">${cell.trim()}</td>`;
          }
          html += `</tr>\n`;
        }
        html += `</tbody>\n</table>`;
        result.push(html);
      }
    } else {
      if (lines[i].trim()) result.push(lines[i]);
    }
    i++;
  }
  return result;
}

function renderContent(html: string) {
  if (!html) return null;
  const hasHtml = /<[a-z][\s\S]*>/i.test(html);
  if (hasHtml) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  const lines = html.split("\n");
  const processed = asciiTableToHtml(lines);
  return (
    <div>
      {processed.map((p, i) => {
        if (p.startsWith("<table")) {
          return <div key={i} dangerouslySetInnerHTML={{ __html: p }} />;
        }
        return <p key={i} className="mb-3 text-gray-700 leading-relaxed">{p}</p>;
      })}
    </div>
  );
}

type Phase = "words" | "exercises" | "result";
type ExerciseType = "matching" | "fill-blank";

interface Exercise {
  id: number; type: ExerciseType;
  question: string; options: string[]; correctIndex: number;
  word?: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function VocabularyLessonPage() {
  const { lessonId } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [words, setWords] = useState<VocabWord[]>([]);
  const [flashcardIds, setFlashcardIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("words");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const [addingFlashcards, setAddingFlashcards] = useState<Set<string>>(new Set());
  const [addingAll, setAddingAll] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [lessonRes, wordsRes] = await Promise.all([
          fetch(`/api/lessons/${lessonId}`),
          fetch(`/api/vocabulary/words?lessonId=${lessonId}`),
        ]);
        const lessonData = await lessonRes.json();
        const wordsData = await wordsRes.json();
        setLesson(lessonData.lesson || lessonData);
        setWords(wordsData.words || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (lessonId) load();
  }, [lessonId]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/flashcards").then(r => r.json()).then(data => {
      if (data.flashcards) {
        setFlashcardIds(new Set(data.flashcards.map((f: Flashcard) => f.word.toLowerCase())));
      }
    }).catch(() => {});
  }, [status]);

  const generateExercises = useCallback(() => {
    if (words.length < 4) return;
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const result: Exercise[] = [];
    const count = Math.min(10, words.length);
    const selectedWords = shuffled.slice(0, count);

    selectedWords.forEach((w, i) => {
      if (i % 2 === 0) {
        const wrongOptions = words
          .filter(x => x.id !== w.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(x => x.translation);
        const opts = [w.translation, ...wrongOptions].sort(() => Math.random() - 0.5);
        result.push({
          id: i * 2 + 1, type: "matching",
          question: w.word,
          options: opts,
          correctIndex: opts.indexOf(w.translation),
          word: w.word,
        });
      } else {
        const sentence = w.exampleSentence.replace(
          new RegExp(w.word, "i"), "______"
        );
        const wrongWords = words
          .filter(x => x.id !== w.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(x => x.word);
        const opts = [w.word, ...wrongWords].sort(() => Math.random() - 0.5);
        result.push({
          id: i * 2 + 1, type: "fill-blank",
          question: sentence,
          options: opts,
          correctIndex: opts.indexOf(w.word),
          word: w.word,
        });
      }
    });
    setExercises(result.sort(() => Math.random() - 0.5));
    setAnswers({});
    setSubmitted(false);
    setPhase("exercises");
  }, [words]);

  const handleAddToFlashcards = async (word: VocabWord) => {
    if (!session) {
      router.push("/login");
      return;
    }
    setAddingFlashcards(prev => new Set(prev).add(word.word.toLowerCase()));
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: word.word, meaning: word.meaning, translation: word.translation }),
      });
      if (res.ok) {
        setFlashcardIds(prev => new Set(prev).add(word.word.toLowerCase()));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAddingFlashcards(prev => {
        const next = new Set(prev);
        next.delete(word.word.toLowerCase());
        return next;
      });
    }
  };

  const handlePlayAudio = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = async () => {
    let correct = 0;
    const missedWords: string[] = [];
    exercises.forEach(ex => {
      if (answers[ex.id] === ex.correctIndex) {
        correct++;
      } else if (ex.word) {
        missedWords.push(ex.word);
      }
    });
    setScore(correct);
    setMissed(missedWords);
    setSubmitted(true);
    const total = exercises.length;

    if (session && lessonId) {
      try {
        await fetch("/api/lessons", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId, score: correct, maxScore: total, completed: true,
          }),
        });
      } catch (e) { console.error(e); }

      if (missedWords.length > 0) {
        try {
          await fetch("/api/vocabulary/attempt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId, score: correct, missedWords }),
          });
        } catch (e) { console.error(e); }
      }
    }
    setPhase("result");
  };

  const progressPct = words.length > 0
    ? Math.round((flashcardIds.size / words.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Dars topilmadi</h2>
        <Link href="/courses/vocabulary" className="text-primary hover:underline text-sm">
          Vocabulary bo'limiga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/courses/vocabulary" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Vocabulary
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{lesson.durationMin} min</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_COLORS[lesson.difficulty] || "bg-gray-100 text-gray-700"}`}>
                {lesson.difficulty === "Easy" ? "Oson" : lesson.difficulty === "Medium" ? "O'rta" : "Qiyin"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === "words" && (
          <motion.div key="words" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="glass-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-6 mb-8">
              {lesson.videoUrl && (
                <VideoPlayer
                  videoUrl={lesson.videoUrl}
                  lessonId={lesson.id}
                  transcriptText={lesson.transcriptText}
                  title={lesson.title}
                />
              )}
              {renderContent(lesson.theoryContent)}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                So'zlar ro'yxati ({words.length} ta)
              </h2>
              <button
                onClick={generateExercises}
                disabled={words.length < 4}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm btn-macos"
              >
                <Shuffle className="w-4 h-4" /> Mashqni boshlash
              </button>
            </div>

            {progressPct > 0 && (
              <div className="mb-4 flex items-center gap-3 text-sm">
                <span className="text-gray-500">Flashcards:</span>
                <div className="flex-1 max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                </div>
                <span className="text-gray-600 font-medium">{flashcardIds.size}/{words.length}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((w, i) => {
                const isInFlashcards = flashcardIds.has(w.word.toLowerCase());
                const isAdding = addingFlashcards.has(w.word.toLowerCase());
                return (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-4 hover:shadow-macos transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handlePlayAudio(w.word)} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <Volume2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <h3 className="text-lg font-bold text-gray-900 capitalize">{w.word}</h3>
                      </div>
                      {isInFlashcards ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCheck className="w-3 h-3" /> Qo'shilgan
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddToFlashcards(w)}
                          disabled={isAdding || !session}
                          className="flex items-center gap-1 text-xs text-primary bg-primary/5 px-2 py-1 rounded-full hover:bg-primary/10 transition-colors disabled:opacity-40"
                        >
                          {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                          Flashcards
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">{w.meaning}</p>
                    <p className="text-sm text-gray-500 mb-2">{w.translation}</p>
                    <p className="text-xs text-gray-400 italic leading-relaxed">&ldquo;{w.exampleSentence}&rdquo;</p>
                  </motion.div>
                );
              })}
            </div>

            {session && (
              <div className="mt-6 text-center">
                <button
                  onClick={generateExercises}
                  disabled={words.length < 4}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 mx-auto shadow-lg shadow-primary/20 btn-macos"
                >
                  <Zap className="w-5 h-5" /> Interaktiv mashqni boshlash
                </button>
              </div>
            )}
          </motion.div>
        )}

        {phase === "exercises" && (
          <motion.div key="exercises" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Interaktiv mashq</h2>
              <span className="text-sm text-gray-500">
                {Object.keys(answers).length} / {exercises.length} ta javob
              </span>
            </div>

            <div className="space-y-4">
              {exercises.map((ex, i) => {
                const selected = answers[ex.id];
                const isWrong = submitted && selected !== ex.correctIndex;
                const isCorrect = submitted && selected === ex.correctIndex;
                return (
                  <motion.div
                    key={ex.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5 transition-colors ${
                      isWrong ? "border-red-200 bg-red-50" :
                      isCorrect ? "border-emerald-200 bg-emerald-50" :
                      "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {ex.type === "matching" ? "So'z - ma'no" : "Bo'sh joyni to'ldiring"}
                      </span>
                      {isWrong && <XCircle className="w-4 h-4 text-red-500" />}
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-gray-900 font-medium mb-3">
                      {ex.type === "matching" ? (
                        <span className="text-xl font-bold capitalize">{ex.question}</span>
                      ) : (
                        <span>{ex.question}</span>
                      )}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {ex.options.map((opt, j) => {
                        const isSelected = selected === j;
                        const showCorrect = submitted && j === ex.correctIndex;
                        return (
                          <button
                            key={j}
                            onClick={() => {
                              if (submitted) return;
                              setAnswers(prev => ({ ...prev, [ex.id]: j }));
                            }}
                            disabled={submitted}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                              showCorrect ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400" :
                              isSelected && isWrong ? "bg-red-100 text-red-700 ring-2 ring-red-300" :
                              isSelected ? "bg-primary/10 text-primary ring-2 ring-primary/30" :
                              "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {!submitted ? (
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length < exercises.length}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 mx-auto shadow-lg shadow-primary/20 btn-macos"
                >
                  <Trophy className="w-5 h-5" /> Natijalarni ko'rish
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  {exercises.length - Object.keys(answers).length > 0
                    ? `${exercises.length - Object.keys(answers).length} ta savolga javob bermagansiz`
                    : "Barcha savollarga javob berdingiz!"}
                </p>
              </div>
            ) : (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setPhase("result");
                  }}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors mx-auto shadow-lg shadow-primary/20"
                >
                  <Sparkles className="w-5 h-5" /> Natijani ko'rish
                </button>
              </div>
            )}
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="glass-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-8 text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mashq yakunlandi!</h2>
              <div className="text-5xl font-bold text-primary mb-2">{score}/{exercises.length}</div>
              <p className="text-gray-500">
                {score === exercises.length ? "Mukammal! Barcha so'zlarni bilasiz!" :
                 score >= exercises.length * 0.7 ? "Yaxshi natija! Bir oz takrorlash kerak." :
                 "Yaxshilanish kerak. Yana mashq qiling!"}
              </p>

              <div className="w-full bg-gray-100 h-3 rounded-full mt-6 overflow-hidden max-w-md mx-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / exercises.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    score === exercises.length ? "bg-emerald-400" :
                    score >= exercises.length * 0.7 ? "bg-amber-400" : "bg-red-400"
                  }`}
                />
              </div>
            </div>

            {missed.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  Eslab qolinmagan so'zlar ({missed.length})
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Bu so'zlar avtomatik ravishda flashcardsga qo'shildi. Spaced repetition orqali takrorlang.
                </p>
                <div className="flex flex-wrap gap-2">
                  {missed.map(w => (
                    <span key={w} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium capitalize">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/flashcards"
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 btn-macos"
              >
                <Layers className="w-5 h-5" /> Flashcards'da ko'rish
              </Link>
              <button
                onClick={generateExercises}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors btn-macos"
              >
                <Shuffle className="w-5 h-5" /> Qayta mashq qilish
              </button>
              <Link
                href="/courses/vocabulary"
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors btn-macos"
              >
                <ArrowLeft className="w-5 h-5" /> Ro'yxatga qaytish
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
