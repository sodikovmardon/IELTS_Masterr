"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Lock,
  Loader2,
  ChevronRight,
  PenTool,
  Star,
  Crown,
  CheckCircle2,
  X,
  Zap,
} from "lucide-react";

interface LessonProgress {
  completed: boolean;
  score: number | null;
  maxScore: number | null;
  bookmarked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  isPremium: boolean;
  difficulty: string;
  order: number;
  progresses: LessonProgress[];
}

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-green-100 text-green-700" },
  Medium: { label: "O'rta", class: "bg-yellow-100 text-yellow-700" },
  Hard: { label: "Qiyin", class: "bg-red-100 text-red-700" },
};

type FilterTab = "Barchasi" | "Bepul" | "Premium" | "Bajarilmagan";

export default function WritingCoursesPage() {
  const { data: session } = useSession();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("Barchasi");
  const [premiumModal, setPremiumModal] = useState<string | null>(null);

  const tabs: FilterTab[] = [
    "Barchasi",
    "Bepul",
    "Premium",
    "Bajarilmagan",
  ];

  useEffect(() => {
    const params = new URLSearchParams({ category: "writing" });
    if (session?.user?.id) {
      params.set("userId", session.user.id);
    }
    fetch(`/api/lessons?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lessons) setLessons(res.lessons);
      })
      .finally(() => setLoading(false));
  }, [session]);

  const filteredLessons = useMemo(() => {
    switch (activeTab) {
      case "Bepul":
        return lessons.filter((l) => !l.isPremium);
      case "Premium":
        return lessons.filter((l) => l.isPremium);
      case "Bajarilmagan":
        return lessons.filter(
          (l) =>
            !l.progresses?.[0]?.completed
        );
      default:
        return lessons;
    }
  }, [lessons, activeTab]);

  const getProgressPercent = (lesson: Lesson): number | null => {
    const p = lesson.progresses?.[0];
    if (!p || p.maxScore === null || p.maxScore === 0) return null;
    return Math.round(((p.score || 0) / p.maxScore) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/courses"
        className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Barcha kurslar
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Writing
            </h1>
            <p className="text-gray-500 text-sm">
              IELTS Writing bo'limi bo'yicha to'liq kurs
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary"
            }`}
          >
            {tab === "Bajarilmagan" && (
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5 align-middle" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <PenTool className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">Hech qanday dars topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredLessons.map((lesson, i) => {
              const progressPct = getProgressPercent(lesson);
              const diff = DIFFICULTY_CONFIG[lesson.difficulty] || {
                label: lesson.difficulty,
                class: "bg-gray-100 text-gray-700",
              };

              return (
                <motion.div
                  key={lesson.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {lesson.isPremium ? (
                    <div
                      onClick={() => setPremiumModal(lesson.id)}
                      className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5 hover:shadow-macos transition-all cursor-pointer h-full flex flex-col relative overflow-hidden group"
                    >
                      {lesson.isPremium && (
                        <div className="absolute top-0 right-0 w-20 h-20">
                          <div className="absolute top-3 right-3 rotate-45">
                            <Crown className="w-5 h-5 text-amber-400" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-6">
                          {lesson.title}
                        </h3>
                        <Lock className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {lesson.durationMin} min
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${diff.class}`}
                        >
                          {diff.label}
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Premium
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                          Ochish
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Link href={`/courses/writing/${lesson.id}`}>
                      <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5 hover:shadow-macos hover:border-primary/20 transition-all h-full flex flex-col relative overflow-hidden group">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-6">
                            {lesson.title}
                          </h3>
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.durationMin} min
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${diff.class}`}
                          >
                            {diff.label}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Bepul
                          </span>
                        </div>

                        {progressPct !== null && (
                          <div className="mt-auto">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{progressPct}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPct}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        <div className="mt-3 flex items-center text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Davom etish <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {premiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setPremiumModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative"
            >
              <button
                onClick={() => setPremiumModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-amber-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Premium dars
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Bu dars faqat Premium foydalanuvchilar uchun ochiq. To'liq
                kursdan bahramand bo'lish uchun obuna bo'ling.
              </p>

              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-200">
                Premium'ga o'tish
              </button>

              <button
                onClick={() => setPremiumModal(null)}
                className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Keyinroq
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
