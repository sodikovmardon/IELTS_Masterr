"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Loader2,
  History,
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  BarChart3,
  PenTool,
  CalendarDays,
  BookOpen,
} from "lucide-react";

interface Submission {
  id: string;
  lessonId: string;
  essayText: string;
  wordCount: number;
  taskAchievement: number | null;
  coherenceCohesion: number | null;
  lexicalResource: number | null;
  grammaticalRange: number | null;
  overallBand: number | null;
  feedback: string | null;
  submittedAt: string;
  lesson: { title: string };
}

export default function WritingHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/writing-history")
      .then((r) => r.json())
      .then((res) => {
        if (res.submissions) setSubmissions(res.submissions);
      })
      .finally(() => setLoading(false));
  }, [status, router]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBandColor = (band: number | null) => {
    if (!band) return "text-gray-400";
    if (band >= 7) return "text-green-600";
    if (band >= 5) return "text-amber-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/courses/writing"
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Writing kursiga qaytish
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Writing Tarixi
            </h1>
            <p className="text-gray-500 text-sm">
              Barcha writing yozmalaringiz va baholanishlari
            </p>
          </div>
        </div>
      </motion.div>

      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Hali writing yozmadingiz
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Writing darslaridan birini boshlang va ilk writingingizni yozing.
          </p>
          <Link
            href="/courses/writing"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
          >
            <BookOpen className="w-4 h-4" />
            Writing darslariga o'tish
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const feedbackData = sub.feedback ? (() => {
              try { return JSON.parse(sub.feedback); } catch { return null; }
            })() : null;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {sub.lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(sub.submittedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <PenTool className="w-3.5 h-3.5" />
                        {sub.wordCount} so'z
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`text-xl font-bold ${getBandColor(sub.overallBand)}`}>
                      {sub.overallBand?.toFixed(1) || "—"}
                    </div>
                    <div className="text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-gray-50">
                        {sub.overallBand && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                            {[
                              { label: "Task Achievement", value: sub.taskAchievement },
                              { label: "Coherence & Cohesion", value: sub.coherenceCohesion },
                              { label: "Lexical Resource", value: sub.lexicalResource },
                              { label: "Grammatical Range", value: sub.grammaticalRange },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="bg-gray-50 rounded-lg p-3 text-center"
                              >
                                <div className={`text-lg font-bold ${getBandColor(item.value)}`}>
                                  {item.value?.toFixed(1) || "—"}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Essayingiz
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {sub.essayText}
                          </div>
                        </div>

                        {feedbackData && (
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Batafsil baholanish
                            </h4>
                            <div className="space-y-2">
                              {[
                                { key: "taskAchievement", label: "Task Achievement" },
                                { key: "coherenceCohesion", label: "Coherence & Cohesion" },
                                { key: "lexicalResource", label: "Lexical Resource" },
                                { key: "grammaticalRange", label: "Grammatical Range" },
                              ].map(({ key, label }) => {
                                const item = feedbackData[key];
                                if (!item) return null;
                                return (
                                  <div key={key} className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-gray-700">{label}</span>
                                      <span className="text-sm font-bold text-primary">{item.score?.toFixed(1)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.feedback}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {feedbackData?.generalFeedback && (
                          <div className="bg-indigo-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm font-medium text-indigo-800">Umumiy fikr</span>
                            </div>
                            <p className="text-xs text-gray-700">{feedbackData.generalFeedback}</p>
                          </div>
                        )}

                        <Link
                          href={`/courses/writing/${sub.lessonId}`}
                          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Darsga qaytish
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
