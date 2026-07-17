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
  Headphones,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Attempt {
  id: string;
  lessonId: string;
  score: number;
  answers: string;
  attemptedAt: string;
  lesson: { title: string };
}

export default function ListeningHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/listening-attempts")
      .then((r) => r.json())
      .then((res) => {
        if (res.attempts) setAttempts(res.attempts);
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
        href="/courses/listening"
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Listening kursiga qaytish
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Listening Tarixi
            </h1>
            <p className="text-gray-500 text-sm">
              Barcha listening urinishlaringiz va natijalaringiz
            </p>
          </div>
        </div>
      </motion.div>

      {attempts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Headphones className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Hali listening bajarilmagan
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Listening darslaridan birini boshlang va ilk urinishingizni qiling.
          </p>
          <Link
            href="/courses/listening"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors btn-macos"
          >
            <BookOpen className="w-4 h-4" />
            Listening darslariga o'tish
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt) => {
            const isExpanded = expandedId === attempt.id;
            let answersParsed: Record<string, string> = {};
            try {
              answersParsed = JSON.parse(attempt.answers);
            } catch {}

            const answerEntries = Object.entries(answersParsed);

            return (
              <motion.div
                key={attempt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : attempt.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Headphones className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {attempt.lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(attempt.attemptedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-gray-500">
                      Ball:{" "}
                      <span className="text-primary font-bold">{attempt.score}</span>
                    </span>
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
                  {isExpanded && answerEntries.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-gray-50">
                        <div className="mt-3 space-y-2">
                          {answerEntries.map(([qId, ans]) => (
                            <div
                              key={qId}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="text-gray-500 text-xs font-mono w-24 truncate">
                                {qId}
                              </span>
                              <span className="text-gray-700 font-medium">
                                {ans}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/courses/listening/${attempt.lessonId}`}
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
