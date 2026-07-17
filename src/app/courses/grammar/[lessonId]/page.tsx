"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, CheckCircle2, XCircle, Trophy,
  Bookmark, BookMarked, ChevronRight, Loader2, Sparkles,
  Award, ChevronLeft, GraduationCap, AlertCircle, Lightbulb,
  RefreshCw, BarChart3, Type,
} from "lucide-react";
import { SmartContent, InfoBox, ContentCard, SectionHeading } from "@/components/lesson";
import VideoPlayer from "@/components/VideoPlayer";

interface LessonProgress {
  completed: boolean; score: number | null; maxScore: number | null;
  bookmarked: boolean; answers: string; attempts: number;
}

interface GrammarQuestion {
  id: number; type: "fill-blank" | "multiple-choice" | "error-correction" | "transformation";
  question: string; options: string[]; correctAnswer: number; explanation: string;
}

interface Lesson {
  id: string; title: string; category: string; durationMin: number;
  isPremium: boolean; difficulty: string; order: number;
  prerequisiteLessonId: string | null;
  theoryContent: string; tipsAndTricks: string | null;
  commonMistakes: string | null; questions: string;
  videoUrl: string | null; videoDurationSec: number | null;
  videoThumbnailUrl: string | null; transcriptText: string | null;
  progresses: LessonProgress[];
}

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-green-100 text-green-700" },
  Medium: { label: "O'rta", class: "bg-yellow-100 text-yellow-700" },
  Hard: { label: "Qiyin", class: "bg-red-100 text-red-700" },
};

const TYPE_LABELS: Record<string, string> = {
  "fill-blank": "Bo'sh joy to'ldirish",
  "multiple-choice": "Tanlov",
  "error-correction": "Xatoni tuzatish",
  "transformation": "Gapni o'zgartirish",
};

export default function GrammarLessonPage() {
  const params = useParams();
  const { data: session } = useSession();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<"theory" | "practice" | "feedback">("theory");
  const [submitting, setSubmitting] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [retryOnlyMistakes, setRetryOnlyMistakes] = useState(false);
  const [mistakeIds, setMistakeIds] = useState<number[]>([]);

  const allQuestions: GrammarQuestion[] = useMemo(() => {
    if (!lesson?.questions) return [];
    try {
      const parsed = JSON.parse(lesson.questions);
      return Array.isArray(parsed)
        ? parsed.flat().filter((q: any) => q && q.type)
        : [];
    } catch {
      return [];
    }
  }, [lesson]);

  const questions = useMemo(() => {
    if (!retryOnlyMistakes || mistakeIds.length === 0) return allQuestions;
    return allQuestions.filter(q => mistakeIds.includes(q.id));
  }, [allQuestions, retryOnlyMistakes, mistakeIds]);

  useEffect(() => {
    const params = new URLSearchParams({ category: "grammar" });
    if (session?.user?.id) params.set("userId", session.user.id);
    fetch(`/api/lessons?${params}`)
      .then(r => r.json())
      .then(res => {
        if (res.lessons) {
          setAllLessons(res.lessons);
          const found = res.lessons.find((l: Lesson) => l.id === lessonId);
          if (found) { setLesson(found); setBookmarked(found.progresses?.[0]?.bookmarked || false); }
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId, session]);

  const selectAnswer = useCallback((qId: number, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: false }));
    setCheckedQuestions(prev => ({ ...prev, [qId]: false }));
  }, []);

  const checkAnswer = useCallback((q: GrammarQuestion) => {
    const selected = answers[q.id];
    if (selected === undefined) return;
    const correct = selected === q.correctAnswer;
    setCheckedQuestions(prev => ({ ...prev, [q.id]: true }));
    setQuestionResults(prev => ({ ...prev, [q.id]: correct }));
    setShowExplanation(prev => ({ ...prev, [q.id]: true }));
  }, [answers]);

  const allChecked = useMemo(() =>
    questions.length > 0 && questions.every(q => checkedQuestions[q.id]),
    [questions, checkedQuestions]
  );

  const score = useMemo(() => {
    if (!allChecked) return 0;
    return questions.filter(q => questionResults[q.id]).length;
  }, [allChecked, questions, questionResults]);

  const mistakesByType = useMemo((): Record<string, number> => {
    const result: Record<string, number> = {};
    questions.forEach(q => {
      if (!questionResults[q.id]) {
        result[q.type] = (result[q.type] || 0) + 1;
      }
    });
    return result;
  }, [questions, questionResults]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setBlock("feedback");
    if (retryOnlyMistakes) {
      setSubmitting(false);
      return;
    }
    const wrongIds = questions.filter(q => !questionResults[q.id]).map(q => q.id);
    setMistakeIds(wrongIds);

    if (session?.user?.id) {
      try {
        await fetch("/api/lessons", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId, score, maxScore: questions.length,
            completed: true,
            answers: JSON.stringify({ answers, results: questionResults, mistakesByType }),
            attempts: (lesson!.progresses?.[0]?.attempts || 0) + 1,
          }),
        });
        await fetch("/api/grammar/attempt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId, score, mistakesByType: JSON.stringify(mistakesByType),
          }),
        });
      } catch {}
    }
    setSubmitting(false);
  };

  const retryMistakes = () => {
    const wrongIds = questions.filter(q => !questionResults[q.id]).map(q => q.id);
    setMistakeIds(wrongIds);
    setRetryOnlyMistakes(true);
    setAnswers({});
    setCheckedQuestions({});
    setQuestionResults({});
    setShowExplanation({});
    setBlock("practice");
  };

  const nextLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return null;
    const currentIdx = allLessons.findIndex(l => l.id === lessonId);
    if (currentIdx === -1 || currentIdx >= allLessons.length - 1) return null;
    return allLessons[currentIdx + 1];
  }, [lesson, allLessons, lessonId]);

  const isLastLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return false;
    const grammarLessons = allLessons.filter(l => l.category === "grammar");
    return lesson.id === grammarLessons[grammarLessons.length - 1]?.id;
  }, [lesson, allLessons]);

  const allCompleted = useMemo(() => {
    return allLessons
      .filter(l => l.category === "grammar")
      .every(l => l.progresses?.[0]?.completed);
  }, [allLessons]);

  const toggleBookmark = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch("/api/lessons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, bookmarked: !bookmarked }),
      });
      if (res.ok) setBookmarked(!bookmarked);
    } catch {}
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
        <Link href="/courses/grammar" className="text-primary hover:underline">Grammar kursiga qaytish</Link>
      </div>
    );
  }

  const diff = DIFFICULTY_CONFIG[lesson.difficulty] || { label: lesson.difficulty, class: "bg-gray-100 text-gray-700" };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/courses/grammar" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Grammar kursi
        </Link>
        <button onClick={toggleBookmark} className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
          {bookmarked ? <BookMarked className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5 text-gray-400" />}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          <Type className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" /> {lesson.durationMin} min
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${diff.class}`}>{diff.label}</span>
            {lesson.isPremium && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Premium</span>}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {(["theory", "practice", "feedback"] as const).map((b, i) => (
          <button
            key={b}
            onClick={() => {
              if (b === "practice" && block === "theory") setBlock("practice");
              if (b === "feedback" && block === "practice" && allChecked) handleSubmit();
            }}
            disabled={
              (b === "practice" && block !== "theory") ||
              (b === "feedback" && (!allChecked || block !== "practice"))
            }
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              block === b
                ? "bg-primary text-white shadow-md"
                : "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {i === 0 && <Lightbulb className="w-4 h-4" />}
              {i === 1 && <BarChart3 className="w-4 h-4" />}
              {i === 2 && <Award className="w-4 h-4" />}
              {b === "theory" ? "Nazariya" : b === "practice" ? "Amaliyot" : "Natija"}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {block === "theory" && (
          <motion.div key="theory" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
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

            {lesson.tipsAndTricks && (
              <div className="mb-6">
                <InfoBox type="tip" title="Maslahatlar">
                  <SmartContent text={lesson.tipsAndTricks} compact />
                </InfoBox>
              </div>
            )}

            {lesson.commonMistakes && (
              <div className="mb-6">
                <InfoBox type="mistake" title="Keng tarqalgan xatolar">
                  <SmartContent text={lesson.commonMistakes} compact />
                </InfoBox>
              </div>
            )}

            <button onClick={() => setBlock("practice")} className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 btn-macos">
              Amaliyotga o'tish <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {block === "practice" && (
          <motion.div key="practice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {retryOnlyMistakes && (
              <div className="glass-card bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-2xl shadow-macos p-4 mb-6 flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800">Faqat xato qilingan savollar ({mistakeIds.length} ta)</p>
              </div>
            )}

            <div className="space-y-6 mb-8">
              {questions.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5 transition-all ${
                    checkedQuestions[q.id]
                      ? questionResults[q.id] ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"
                      : "border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-400 uppercase">{TYPE_LABELS[q.type] || q.type}</span>
                        {checkedQuestions[q.id] && (
                          <span className={`inline-flex items-center gap-1 text-xs font-medium ${questionResults[q.id] ? "text-green-600" : "text-red-600"}`}>
                            {questionResults[q.id] ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {questionResults[q.id] ? "To'g'ri" : "Xato"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">{q.question}</p>
                    </div>
                  </div>

                  <div className="space-y-2 ml-10">
                    {q.options.map((opt, oi) => {
                      let optClass = "border-gray-200 hover:border-primary/30 hover:bg-gray-50 cursor-pointer";
                      if (!checkedQuestions[q.id]) {
                        if (answers[q.id] === oi) optClass = "border-primary bg-primary/5";
                      } else {
                        if (oi === q.correctAnswer) optClass = "border-green-300 bg-green-50 text-green-800";
                        else if (answers[q.id] === oi && oi !== q.correctAnswer) optClass = "border-red-300 bg-red-50 text-red-800";
                        else optClass = "border-gray-100 opacity-60";
                      }
                      return (
                        <button
                          key={oi}
                          onClick={() => !checkedQuestions[q.id] && selectAnswer(q.id, oi)}
                          disabled={!!checkedQuestions[q.id]}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${optClass}`}
                        >
                          <span className="font-mono text-xs text-gray-400 mr-2">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!checkedQuestions[q.id] && answers[q.id] !== undefined && (
                    <div className="ml-10 mt-3">
                      <button onClick={() => checkAnswer(q)} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors btn-macos">
                        Tekshirish
                      </button>
                    </div>
                  )}

                  {showExplanation[q.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`ml-10 mt-3 p-3 rounded-lg text-sm leading-relaxed ${
                        questionResults[q.id] ? "bg-green-50 text-green-800 border border-green-100" : "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}
                    >
                      <span className="font-medium">{questionResults[q.id] ? "✅ " : "⚠ "}Eslatma:</span> {q.explanation}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {allChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 mb-6 flex items-center justify-between shadow-macos"
              >
                <div>
                  <p className="font-semibold text-gray-900">Natija</p>
                  <p className="text-sm text-gray-600">{score} / {questions.length} ta to'g'ri javob</p>
                </div>
                <button onClick={() => { setBlock("feedback"); if (!retryOnlyMistakes) handleSubmit(); else setSubmitting(false); }} disabled={submitting} className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 btn-macos">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                  Natijani ko'rish
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {block === "feedback" && (
          <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Natijalar</h2>
              <div className="text-5xl font-extrabold text-primary mb-1">{Math.round((score / Math.max(questions.length, 1)) * 100)}%</div>
              <p className="text-gray-500 text-sm">{score} / {questions.length} ta to'g'ri javob</p>
              <div className="w-full max-w-xs mx-auto mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / Math.max(questions.length, 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Xatolar taqsimoti
                </h3>
                {Object.keys(mistakesByType).length === 0 ? (
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Barcha savollarga to'g'ri javob berdingiz!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(mistakesByType).map(([type, count]) => {
                      const totalOfType = questions.filter(q => q.type === type).length;
                      const pct = totalOfType > 0 ? Math.round((count / totalOfType) * 100) : 0;
                      return (
                        <div key={type}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-700">{TYPE_LABELS[type] || type}</span>
                            <span className="font-medium text-gray-900">{count} ta ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6 }}
                              className="h-full bg-red-400 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="glass-card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-macos p-5">
                <h3 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Tavsiyalar
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  {Object.keys(mistakesByType).length === 0 ? (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      Ajoyib natija! Keyingi darsga o'tishingiz mumkin.
                    </li>
                  ) : (
                    Object.keys(mistakesByType).map((type) => (
                      <li key={type} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        "{TYPE_LABELS[type] || type}" turida {mistakesByType[type]} ta xato qildingiz. Qoidani qayta ko'rib chiqing.
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {mistakeIds.length > 0 && (
              <div className="mb-6">
                <button onClick={retryMistakes} className="w-full bg-amber-500 text-white py-3.5 rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-200">
                  <RefreshCw className="w-5 h-5" />
                  Faqat xatolarni qayta mashq qilish ({mistakeIds.length} ta)
                </button>
              </div>
            )}

            {!retryOnlyMistakes && lesson.tipsAndTricks && (
              <div className="mb-6">
                <InfoBox type="tip" title="Maslahat va qoidalar">
                  <SmartContent text={lesson.tipsAndTricks} compact />
                </InfoBox>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setBlock("practice"); setRetryOnlyMistakes(false); }} className="flex-1 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 btn-macos">
                <ChevronLeft className="w-4 h-4" /> Qayta ishlash
              </button>

              {nextLesson && (
                <Link href={`/courses/grammar/${nextLesson.id}`} className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 btn-macos">
                  Keyingi dars <ChevronRight className="w-4 h-4" />
                </Link>
              )}

              {isLastLesson && allCompleted && (
                <Link href="/certificate" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-200">
                  <GraduationCap className="w-5 h-5" /> Sertifikat olish
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
