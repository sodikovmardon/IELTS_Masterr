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
  Mic,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BookOpen,
  Award,
  BarChart3,
  Play,
} from "lucide-react";

interface SpeakingSubmission {
  id: string;
  lessonId: string;
  audioUrl: string;
  transcriptText: string | null;
  fluencyCoherence: number | null;
  lexicalResource: number | null;
  grammaticalRange: number | null;
  pronunciation: number | null;
  overallBand: number | null;
  feedback: string | null;
  submittedAt: string;
  lesson: { title: string };
}

export default function SpeakingHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<SpeakingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/speaking-submissions")
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
        href="/courses/speaking"
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Speaking kursiga qaytish
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Speaking Tarixi
            </h1>
            <p className="text-gray-500 text-sm">
              Barcha speaking urinishlaringiz va natijalaringiz
            </p>
          </div>
        </div>
      </motion.div>

      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Hali speaking bajarilmagan
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Speaking darslaridan birini boshlang va ilk urinishingizni qiling.
          </p>
          <Link
            href="/courses/speaking"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
          >
            <BookOpen className="w-4 h-4" />
            Speaking darslariga o'tish
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => {
            const isExpanded = expandedId === submission.id;
            let feedbackParsed: Record<string, { score: number; feedback: string }> = {};
            try {
              if (submission.feedback) feedbackParsed = JSON.parse(submission.feedback);
            } catch {}

            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Mic className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {submission.lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {submission.overallBand && (
                      <span className="text-sm font-medium text-gray-500">
                        Band:{" "}
                        <span className="text-primary font-bold">{submission.overallBand.toFixed(1)}</span>
                      </span>
                    )}
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
                        {submission.overallBand && (
                          <div className="mt-3 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-primary" />
                              <span className="text-sm text-gray-700">
                                Umumiy: <strong className="text-primary">{submission.overallBand.toFixed(1)}</strong>
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {[
                            { label: "Fluency & Coherence", value: submission.fluencyCoherence },
                            { label: "Lexical Resource", value: submission.lexicalResource },
                            { label: "Grammatical Range", value: submission.grammaticalRange },
                            { label: "Pronunciation", value: submission.pronunciation },
                          ].map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 rounded-lg p-2.5">
                              <div className="text-xs text-gray-500">{label}</div>
                              <div className="text-sm font-bold text-primary">{value?.toFixed(1) || "-"}</div>
                            </div>
                          ))}
                        </div>

                        {submission.transcriptText && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Javob matni:</p>
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
                              {submission.transcriptText.length > 300
                                ? submission.transcriptText.slice(0, 300) + "..."
                                : submission.transcriptText}
                            </p>
                          </div>
                        )}

                        {Object.keys(feedbackParsed).length > 0 && (
                          <div className="mt-3 space-y-2">
                            {Object.entries(feedbackParsed).map(([key, val]) => {
                              if (key === "overallBand" || key === "wordCount" || key === "generalFeedback") return null;
                              return (
                                <div key={key} className="text-sm">
                                  <span className="text-gray-500 text-xs">{key}: </span>
                                  <span className="text-gray-700 text-xs">{val.feedback}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <Link
                          href={`/courses/speaking/${submission.lessonId}`}
                          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline mt-3"
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
