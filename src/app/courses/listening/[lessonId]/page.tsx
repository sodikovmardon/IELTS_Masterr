"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Headphones,
  CheckCircle2,
  XCircle,
  Trophy,
  Bookmark,
  BookMarked,
  ChevronRight,
  Loader2,
  Play,
  CheckCheck,
  Sparkles,
  AlertCircle,
  Award,
  ChevronLeft,
  GraduationCap,
  Flag,
  FileText,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import SmartDictionary from "@/components/SmartDictionary";
import SourceViewer from "@/components/SourceViewer";
import VideoPlayer from "@/components/VideoPlayer";
import { SmartContent, InfoBox, ContentCard, SectionHeading } from "@/components/lesson";

interface Question {
  id: string;
  type: "form-completion" | "note-completion" | "multiple-choice" | "matching";
  question: string;
  options?: string[];
  items?: { label: string; correctAnswer: string }[];
  correctAnswer: string;
  explanation: string;
  textQuote: string;
}

interface LessonProgress {
  completed: boolean;
  score: number | null;
  maxScore: number | null;
  bookmarked: boolean;
  answers: string;
  attempts: number;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  isPremium: boolean;
  difficulty: string;
  order: number;
  prerequisiteLessonId: string | null;
  theoryContent: string;
  passageText: string | null;
  audioUrl: string | null;
  transcriptText: string | null;
  videoUrl: string | null;
  videoDurationSec: number | null;
  videoThumbnailUrl: string | null;
  tipsAndTricks: string | null;
  commonMistakes: string | null;
  questions: string;
  progresses: LessonProgress[];
}

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-green-100 text-green-700" },
  Medium: { label: "O'rta", class: "bg-yellow-100 text-yellow-700" },
  Hard: { label: "Qiyin", class: "bg-red-100 text-red-700" },
};

function useTimer(initialMinutes: number, running: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft > 0 && secondsLeft <= initialMinutes * 60 * 0.2;

  return {
    minutes,
    seconds,
    secondsLeft,
    isLow,
    formatted: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
  };
}


function getCorrectAnswerText(q: Question): string {
  if (q.correctAnswer === undefined || q.correctAnswer === null) return "";
  if (typeof q.correctAnswer === "number") {
    if (q.options && q.options[q.correctAnswer]) {
      return q.options[q.correctAnswer];
    }
    return String(q.correctAnswer);
  }
  if (typeof q.correctAnswer === "string" && q.options) {
    const letterIndex = q.correctAnswer.toUpperCase().charCodeAt(0) - 65;
    if (letterIndex >= 0 && letterIndex < q.options.length) {
      return q.options[letterIndex];
    }
  }
  return q.correctAnswer;
}

export default function ListeningLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<"theory" | "practice" | "result">("theory");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [sourceView, setSourceView] = useState<{ open: boolean; answer: string; question: string }>({ open: false, answer: "", question: "" });

  const practiceStarted = useRef(false);
  const [practiceActive, setPracticeActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ category: "listening" });
    if (session?.user?.id) params.set("userId", session.user.id);
    fetch(`/api/lessons?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lessons) {
          setAllLessons(res.lessons);
          const found = res.lessons.find(
            (l: Lesson) => l.id === lessonId
          );
          if (found) {
            setLesson(found);
            setBookmarked(found.progresses?.[0]?.bookmarked || false);
            const savedAnswers = found.progresses?.[0]?.answers;
            if (savedAnswers) {
              try {
                const parsed = JSON.parse(savedAnswers);
                setUserAnswers(parsed);
              } catch {}
            }
          }
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId, session]);

  const questions: Question[] = useMemo(() => {
    if (!lesson?.questions) return [];
    try {
      return JSON.parse(lesson.questions);
    } catch {
      return [];
    }
  }, [lesson]);

  const timer = useTimer(
    lesson?.durationMin || 0,
    practiceActive && block === "practice" && !submitted
  );

  const nextLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return null;
    if (lesson.prerequisiteLessonId) {
      return allLessons.find((l) => l.id === lesson.prerequisiteLessonId) || null;
    }
    return allLessons.find((l) => l.order === lesson.order + 1) || null;
  }, [lesson, allLessons]);

  const isLastLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return false;
    return lesson.order === Math.max(...allLessons.map((l) => l.order));
  }, [lesson, allLessons]);

  const allCompleted = useMemo(() => {
    if (allLessons.length === 0) return false;
    return allLessons.every((l) => l.progresses?.[0]?.completed);
  }, [allLessons]);

  const handleBookmark = async () => {
    if (!session?.user?.id || !lesson) return;
    try {
      const res = await fetch("/api/lessons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          userId: session.user.id,
          bookmarked: !bookmarked,
        }),
      });
      if (res.ok) setBookmarked(!bookmarked);
    } catch {}
  };

  const handleWordClick = useCallback((word: string) => {
    const cleaned = word.replace(/[^a-zA-Z'-]/g, "");
    if (cleaned.length > 1) setSelectedWord(cleaned.toLowerCase());
  }, []);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const isAnswerCorrect = (q: Question): boolean => {
    if (q.type === "matching" && q.items) {
      return q.items.every(
        (item) => userAnswers[`${q.id}_${item.label}`] === item.correctAnswer
      );
    }
    const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;
    return userAnswers[q.id]?.toLowerCase().trim() === String(correctText).toLowerCase().trim();
  };

  const getTranscriptWithHighlights = () => {
    if (!lesson?.transcriptText) return null;
    const wrongAnswerQuotes = questions
      .filter((q) => !isAnswerCorrect(q))
      .map((q) => q.textQuote)
      .filter(Boolean);

    if (wrongAnswerQuotes.length === 0) {
      return lesson.transcriptText.split(/(\s+)/).map((word, i) => {
        if (/^\s+$/.test(word)) return <span key={i}>{word}</span>;
        return (
          <span
            key={i}
            onClick={() => handleWordClick(word)}
            className="cursor-pointer hover:text-primary hover:bg-indigo-50 rounded px-0.5 transition-colors"
          >
            {word}
          </span>
        );
      });
    }

    const parts = lesson.transcriptText.split(new RegExp(`(${wrongAnswerQuotes.map((q) => q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi"));
    return parts.map((part, i) => {
      if (wrongAnswerQuotes.some((q) => q.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="bg-yellow-200 rounded px-0.5">
            {part.split(/(\s+)/).map((word, j) => {
              if (/^\s+$/.test(word)) return <span key={`${i}_${j}`}>{word}</span>;
              return (
                <span
                  key={`${i}_${j}`}
                  onClick={() => handleWordClick(word)}
                  className="cursor-pointer hover:text-primary hover:bg-yellow-300 rounded px-0.5 transition-colors"
                >
                  {word}
                </span>
              );
            })}
          </span>
        );
      }
      return part.split(/(\s+)/).map((word, j) => {
        if (/^\s+$/.test(word)) return <span key={`${i}_${j}`}>{word}</span>;
        return (
          <span
            key={`${i}_${j}`}
            onClick={() => handleWordClick(word)}
            className="cursor-pointer hover:text-primary hover:bg-indigo-50 rounded px-0.5 transition-colors"
          >
            {word}
          </span>
        );
      });
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    let correct = 0;
    const total = questions.length;

    questions.forEach((q) => {
      if (q.type === "matching" && q.items) {
        const allCorrect = q.items.every(
          (item) => userAnswers[`${q.id}_${item.label}`] === item.correctAnswer
        );
        if (allCorrect) correct++;
      } else {
        const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;
        if (
          userAnswers[q.id]?.toLowerCase().trim() ===
          String(correctText).toLowerCase().trim()
        ) {
          correct++;
        }
      }
    });

    setScore(correct);
    setTotalQuestions(total);
    setSubmitted(true);
    setPracticeActive(false);
    setBlock("result");

    if (session?.user?.id) {
      try {
        await fetch("/api/lessons", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: lesson!.id,
            userId: session.user.id,
            score: correct,
            maxScore: total,
            completed: true,
            answers: JSON.stringify(userAnswers),
            attempts: (lesson!.progresses?.[0]?.attempts || 0) + 1,
          }),
        });

        await fetch("/api/listening/attempt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: lesson!.id,
            score: correct,
            answers: JSON.stringify(userAnswers),
          }),
        });
      } catch {}
    }
    setSubmitting(false);
  };

  const renderQuestions = () => {
    return questions.map((q) => {
      if (q.type === "multiple-choice") {
        return (
          <div key={q.id} className="mb-6 p-4 glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20">
            <p className="font-medium text-gray-900 mb-3 text-sm">{q.question}</p>
            <div className="space-y-2">
              {q.options?.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrectNum = typeof q.correctAnswer === "number" ? i === q.correctAnswer : letter === q.correctAnswer;
                const isCorrect = submitted && isCorrectNum;
                const isWrong = submitted && userAnswers[q.id] === letter && !isCorrectNum;
                return (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors text-sm ${
                      submitted
                        ? isCorrect
                          ? "border-green-300 bg-green-50"
                          : isWrong
                            ? "border-red-300 bg-red-50"
                            : "border-gray-100 opacity-60"
                        : userAnswers[q.id] === letter
                          ? "border-primary bg-indigo-50"
                          : "border-gray-100 hover:border-primary/30 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={letter}
                      checked={userAnswers[q.id] === letter}
                      onChange={() => handleAnswerChange(q.id, letter)}
                      disabled={submitted}
                      className="accent-primary"
                    />
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto shrink-0" />}
                    {submitted && isWrong && <XCircle className="w-4 h-4 text-red-500 ml-auto shrink-0" />}
                  </label>
                );
              })}
            </div>
          </div>
        );
      }

      if (q.type === "form-completion") {
        const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;
        const isCorrect = submitted && userAnswers[q.id]?.toLowerCase().trim() === String(correctText).toLowerCase().trim();
        const isWrong = submitted && userAnswers[q.id] && !isCorrect;
        return (
          <div key={q.id} className="mb-6 p-4 glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20">
            <p className="font-medium text-gray-900 mb-3 text-sm">{q.question}</p>
            <input
              type="text"
              value={userAnswers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              disabled={submitted}
              placeholder="Javobingizni yozing..."
              className={`w-full px-4 py-3 rounded-lg border text-sm ${
                submitted
                  ? isCorrect
                    ? "border-green-300 bg-green-50"
                    : isWrong
                      ? "border-red-300 bg-red-50"
                      : "border-gray-100 opacity-60"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {submitted && (
              <div className="mt-2 flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> To'g'ri
                  </span>
                ) : (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Noto'g'ri. To'g'ri javob:{" "}
                    <strong>{correctText}</strong>
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }

      if (q.type === "note-completion") {
        const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;
        const isCorrect = submitted && userAnswers[q.id]?.toLowerCase().trim() === String(correctText).toLowerCase().trim();
        const isWrong = submitted && userAnswers[q.id] && !isCorrect;
        const labelParts = q.question.split("___");
        return (
          <div key={q.id} className="mb-6 p-4 glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20">
            <p className="font-medium text-gray-900 mb-3 text-sm">
              {labelParts[0]}
              <input
                type="text"
                value={userAnswers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={submitted}
                placeholder="..."
                className={`inline-block mx-1 px-3 py-1 rounded-lg border text-sm ${
                  submitted
                    ? isCorrect
                      ? "border-green-300 bg-green-50"
                      : isWrong
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 opacity-60"
                    : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
                style={{ width: "160px" }}
              />
              {labelParts[1]}
            </p>
            {submitted && (
              <div className="mt-2 flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> To'g'ri
                  </span>
                ) : (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Noto'g'ri. To'g'ri javob:{" "}
                    <strong>{correctText}</strong>
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }

      if (q.type === "matching") {
        return (
          <div key={q.id} className="mb-6 p-4 glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20">
            <p className="font-medium text-gray-900 mb-3 text-sm">{q.question}</p>
            <div className="space-y-3">
              {q.items?.map((item) => {
                const answerKey = `${q.id}_${item.label}`;
                const isCorrect = submitted && userAnswers[answerKey] === item.correctAnswer;
                const isWrong = submitted && userAnswers[answerKey] && userAnswers[answerKey] !== item.correctAnswer;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-32 shrink-0">{item.label}</span>
                    <select
                      value={userAnswers[answerKey] || ""}
                      onChange={(e) => handleAnswerChange(answerKey, e.target.value)}
                      disabled={submitted}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm bg-white ${
                        submitted
                          ? isCorrect
                            ? "border-green-300 bg-green-50"
                            : isWrong
                              ? "border-red-300 bg-red-50"
                              : "border-gray-100 opacity-60"
                          : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    >
                      <option value="">Tanlang...</option>
                      {q.options?.map((opt, oi) => (
                        <option key={oi} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                    {submitted && isWrong && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      return null;
    });
  };

  const handleStartPractice = () => {
    practiceStarted.current = true;
    setPracticeActive(true);
    setBlock("practice");
  };

  const handleAudioComplete = () => {
    if (!submitted && timer.secondsLeft > 0) {
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dars topilmadi</h1>
        <p className="text-gray-500 mb-4">Bu dars mavjud emas yoki o'chirilgan.</p>
        <Link
          href="/courses/listening"
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Listening kursiga qaytish
        </Link>
      </div>
    );
  }

  const diff = DIFFICULTY_CONFIG[lesson.difficulty] || {
    label: lesson.difficulty,
    class: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/courses/listening"
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Listening
        </Link>
        {session && (
          <button
            onClick={handleBookmark}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 transition-colors"
          >
            {bookmarked ? (
              <BookMarked className="w-4 h-4 text-amber-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            {bookmarked ? "Saqlangan" : "Saqlash"}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {block === "theory" && (
          <motion.div
            key="theory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  {lesson.durationMin} min
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${diff.class}`}>
                  {diff.label}
                </span>
                {lesson.isPremium ? (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                    Bepul
                  </span>
                )}
              </div>
            </div>

            {lesson.theoryContent && (
              <ContentCard>
                <SectionHeading>Nazariya</SectionHeading>
                {lesson.videoUrl && (
                  <VideoPlayer
                    videoUrl={lesson.videoUrl}
                    lessonId={lesson.id}
                    transcriptText={lesson.transcriptText}
                    title={lesson.title}
                  />
                )}
                <SmartContent text={lesson.theoryContent} />
              </ContentCard>
            )}

            {lesson.tipsAndTricks && (
              <div className="mb-6">
                <InfoBox type="tip" title="Tips & Tricks">
                  <SmartContent text={lesson.tipsAndTricks} compact />
                </InfoBox>
              </div>
            )}

            {lesson.commonMistakes && (
              <div className="mb-8">
                <InfoBox type="mistake" title="Keng tarqalgan xatolar">
                  <SmartContent text={lesson.commonMistakes} compact />
                </InfoBox>
              </div>
            )}

            <button
              onClick={handleStartPractice}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 btn-macos"
            >
              <Play className="w-5 h-5" /> Amaliyotni boshlash
            </button>
          </motion.div>
        )}

        {block === "practice" && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Amaliyot</h2>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
                  timer.isLow
                    ? "bg-red-50 text-red-600 animate-pulse"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <Clock className="w-4 h-4" />
                {timer.formatted}
              </div>
            </div>

            {lesson.passageText && (
              <div className="glass-card mb-6 p-4 bg-indigo-50/90 backdrop-blur-sm border border-indigo-100 rounded-2xl shadow-macos text-sm text-gray-700 leading-relaxed">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-indigo-800 text-xs">Tavsif</span>
                </div>
                <p>{lesson.passageText}</p>
              </div>
            )}

            {(lesson.audioUrl || lesson.transcriptText) && (
              <div className="mb-6">
                <AudioPlayer
                  audioUrl={lesson.audioUrl}
                  transcriptText={lesson.transcriptText}
                  durationMin={lesson.durationMin}
                  onComplete={handleAudioComplete}
                />
              </div>
            )}

            {questions.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Flag className="w-4 h-4" /> Savollar
                </h3>
                {renderQuestions()}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || Object.keys(userAnswers).length === 0}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCheck className="w-5 h-5" />
              )}
              Natijalarni tekshirish
            </button>
          </motion.div>
        )}

        {block === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Natijalar
              </h2>
              <div className="text-5xl font-extrabold text-primary mb-2">
                {score}/{totalQuestions}
              </div>
              <p className="text-gray-500">
                {totalQuestions > 0
                  ? `${Math.round((score / totalQuestions) * 100)}% to'g'ri javob`
                  : ""}
              </p>
              {totalQuestions > 0 && (
                <div className="w-full max-w-xs mx-auto mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(score / totalQuestions) * 100}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((q) => {
                const userAns = q.type === "matching"
                  ? q.items
                      ?.map(
                        (item) =>
                          `${item.label}: ${userAnswers[`${q.id}_${item.label}`] || "-"}`
                      )
                      .join(", ")
                  : userAnswers[q.id] || "-";

                let isCorrectOverall = false;
                if (q.type === "matching" && q.items) {
                  isCorrectOverall = q.items.every(
                    (item) => userAnswers[`${q.id}_${item.label}`] === item.correctAnswer
                  );
                } else {
                  const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;
                  isCorrectOverall =
                    userAnswers[q.id]?.toLowerCase().trim() ===
                    String(correctText).toLowerCase().trim();
                }

                const correctText = typeof q.correctAnswer === "number" && q.options ? q.options[q.correctAnswer] : q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      isCorrectOverall
                        ? "border-green-200 bg-green-50/50"
                        : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrectOverall ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm mb-1">
                          {q.question}
                        </p>
                        <div className="text-xs space-y-1">
                          <p>
                            <span className="text-gray-500">Sizning javobingiz:</span>{" "}
                            <span
                              className={
                                isCorrectOverall
                                  ? "text-green-600 font-medium"
                                  : "text-red-600 font-medium"
                              }
                            >
                              {userAns}
                            </span>
                          </p>
                          {!isCorrectOverall && (
                            <p>
                              <span className="text-gray-500">To'g'ri javob:</span>{" "}
                              <span className="text-green-600 font-medium">
                                {correctText}
                              </span>
                            </p>
                          )}
                          {q.explanation && (
                            <p className="text-gray-500 italic mt-1">
                              {q.explanation}
                            </p>
                          )}
                          {q.textQuote && (
                            <p className="text-gray-400 italic border-l-2 border-gray-200 pl-3 mt-1 text-xs">
                              &ldquo;{q.textQuote}&rdquo;
                            </p>
                          )}
                          {(lesson.transcriptText || lesson.passageText) && (
                            <button
                              onClick={() => setSourceView({ open: true, answer: correctText, question: q.question })}
                              className="mt-2 flex items-center gap-1 text-[11px] text-primary hover:text-primary-dark transition-colors font-medium"
                            >
                              <BookOpen className="w-3 h-3" /> Manbani ko'rish
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {lesson.transcriptText && (
              <div className="mb-6">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full flex items-center justify-between px-5 py-3 glass-card bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-macos hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Transkriptni ko'rish
                  </span>
                  {showTranscript ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="glass-card bg-white/90 backdrop-blur-sm border border-t-0 border-white/20 rounded-b-2xl p-5 mt-px shadow-macos">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Headphones className="w-4 h-4" /> Transcript
                        </h3>
                        <div className="text-sm text-gray-700 leading-relaxed select-none">
                          {getTranscriptWithHighlights()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {lesson.commonMistakes && (
              <div className="mb-8">
                <InfoBox type="mistake" title="Common Mistakes eslatma">
                  <SmartContent text={lesson.commonMistakes} compact />
                </InfoBox>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setBlock("practice");
                  setPracticeActive(true);
                }}
                className="flex-1 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 btn-macos"
              >
                <ChevronLeft className="w-4 h-4" /> Qayta urinish
              </button>

              {nextLesson && (
                <Link
                  href={`/courses/listening/${nextLesson.id}`}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 btn-macos"
                >
                  Keyingi dars <ChevronRight className="w-4 h-4" />
                </Link>
              )}

              {isLastLesson && allCompleted && (
                <Link
                  href="/certificate"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
                >
                  <GraduationCap className="w-5 h-5" /> Sertifikat olish
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWord && (
          <SmartDictionary
            word={selectedWord}
            onClose={() => setSelectedWord(null)}
          />
        )}
      </AnimatePresence>

      <SourceViewer
        passageText={lesson?.transcriptText || lesson?.passageText || ""}
        correctAnswer={sourceView.answer}
        questionText={sourceView.question}
        open={sourceView.open}
        onClose={() => setSourceView({ open: false, answer: "", question: "" })}
      />
    </div>
  );
}
