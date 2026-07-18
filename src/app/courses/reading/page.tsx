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
  BookOpen,
  BookMarked,
  Star,
  Crown,
  CheckCircle2,
  X,
  Zap,
  Trophy,
  BookA,
  BookText,
  Library,
  ChevronDown,
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
  videoUrl: string | null;
  videoDurationSec: number | null;
  progresses: LessonProgress[];
}

const CHAPTER_LABELS: Record<string, string> = {
  Easy: "1-bob",
  Medium: "2-bob",
  Hard: "3-bob",
};

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-teal-100 text-teal-700" },
  Medium: { label: "O'rta", class: "bg-amber-100 text-amber-700" },
  Hard: { label: "Qiyin", class: "bg-rose-100 text-rose-700" },
};

type FilterTab = "Barchasi" | "Bepul" | "Premium" | "Bajarilmagan";

function BookLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-20 relative perspective-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-700 rounded-r-xl rounded-l-sm shadow-xl" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-800 rounded-l-sm" />
        <div className="absolute right-0 top-1 bottom-1 w-0.5 bg-teal-300/30 rounded-full" />
        <div className="absolute inset-x-1 top-2 bottom-2 bg-teal-600/50 rounded-sm" />
        <div className="absolute left-1/2 top-3 bottom-3 w-px bg-teal-300/20" />
      </motion.div>
      <p className="text-sm text-teal-600 mt-4 font-medium">Sahifalar ochilmoqda...</p>
    </div>
  );
}

export default function ReadingCoursesPage() {
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
    const params = new URLSearchParams({ category: "reading" });
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

  const stats = useMemo(() => [
    { icon: BookText, value: lessons.length, label: "Darslar" },
    { icon: Trophy, value: lessons.reduce((a, l) => a + (l.progresses?.[0]?.completed ? 1 : 0), 0), label: "Tugallangan" },
    { icon: BookMarked, value: "8", label: "O'qish texnikasi" },
  ], [lessons]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F3" }}>
      {/* Decorative watermark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="book-watermark" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <text x="20" y="100" fontSize="120" fill="#0d9488" fontFamily="serif" fontWeight="bold">B</text>
              <text x="120" y="180" fontSize="80" fill="#0d9488" fontFamily="serif" opacity="0.6">o</text>
              <text x="70" y="50" fontSize="60" fill="#0d9488" fontFamily="serif" opacity="0.4">k</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#book-watermark)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Back link */}
        <Link
          href="/courses"
          className="inline-flex items-center text-sm text-teal-700/60 hover:text-teal-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Barcha kurslar
        </Link>

        {/* ─── HERO ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 uppercase tracking-[0.15em] mb-3">
              <Library className="w-3.5 h-3.5" />
              Reading bo'limi
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
              Reading
              <br />
              <span className="text-teal-600">Ustaxonasi</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Har bir matn — yangi dunyo. Tez o'qing, chuqur tushuning, ballingizni oshiring.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── FILTER TABS ─── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-teal-700 text-white shadow-md shadow-teal-200"
                  : "bg-white/80 text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700 backdrop-blur-sm"
              }`}
            >
              {tab === "Bajarilmagan" && (
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5 align-middle" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* ─── LESSONS GRID ─── */}
        {loading ? (
          <BookLoading />
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Hech qanday dars topilmadi</p>
            <p className="text-sm mt-1">Boshqa kategoriyani tanlang</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredLessons.map((lesson, i) => {
                const progressPct = getProgressPercent(lesson);
                const diff = DIFFICULTY_CONFIG[lesson.difficulty] || { label: lesson.difficulty, class: "bg-gray-100 text-gray-700" };
                const chapter = CHAPTER_LABELS[lesson.difficulty] || lesson.difficulty;
                const completed = lesson.progresses?.[0]?.completed;

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
                        className="group relative bg-white rounded-2xl border border-teal-100 p-6 cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04), 4px 0 12px rgba(13,148,136,0.08)" }}
                      >
                        {/* Book spine effect */}
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-teal-400 to-teal-600 rounded-r-full" />

                        <div className="flex items-start justify-between mb-3 pl-2">
                          <div>
                            <span className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">{chapter}</span>
                            <h3 className="font-bold text-gray-900 text-sm leading-snug pr-6 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {lesson.title}
                            </h3>
                          </div>
                          <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 pl-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.durationMin} min
                          </span>
                          {lesson.videoUrl && (
                            <span className="flex items-center gap-1 text-teal-600">
                              ▶️ {lesson.videoDurationSec ? `${Math.floor(lesson.videoDurationSec / 60)}:${(lesson.videoDurationSec % 60).toString().padStart(2, "0")}` : "video"}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between pl-2">
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                          <span className="text-xs text-gray-400 group-hover:text-teal-600 transition-colors flex items-center gap-0.5">
                            Ochish <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <Link href={`/courses/reading/${lesson.id}`}>
                        <div className={`group relative bg-white rounded-2xl border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                          completed ? "border-teal-300 bg-gradient-to-b from-teal-50/50 to-white" : "border-gray-200"
                        }`}
                          style={{ boxShadow: completed ? "0 2px 8px rgba(13,148,136,0.08), 4px 0 12px rgba(13,148,136,0.06)" : "0 2px 8px rgba(0,0,0,0.04)" }}
                        >
                          {/* Book spine effect */}
                          <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${
                            completed ? "bg-teal-500" : "bg-gray-200 group-hover:bg-teal-400"
                          } transition-colors`} />

                          <div className="flex items-start justify-between mb-3 pl-2">
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">{chapter}</span>
                              <h3 className="font-bold text-gray-900 text-sm leading-snug pr-2 mt-0.5 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {lesson.title}
                              </h3>
                            </div>
                            {completed ? (
                              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                                <BookMarked className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 pl-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {lesson.durationMin} min
                            </span>
                            {lesson.videoUrl && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.location.href = `/courses/videos/${lesson.id}`;
                                }}
                                className="flex items-center gap-1 text-teal-600 hover:text-teal-700 cursor-pointer"
                              >
                                ▶️ {lesson.videoDurationSec ? `${Math.floor(lesson.videoDurationSec / 60)}:${(lesson.videoDurationSec % 60).toString().padStart(2, "0")}` : "video"}
                              </span>
                            )}
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${diff.class}`}>
                              {diff.label}
                            </span>
                          </div>

                          {progressPct !== null && (
                            <div className="pl-2 mt-auto mb-3">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{progressPct}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progressPct}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                                />
                              </div>
                            </div>
                          )}

                          <div className={`flex items-center justify-between pl-2 ${progressPct !== null ? "" : "mt-auto"}`}>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                              completed
                                ? "bg-teal-100 text-teal-700"
                                : "bg-green-50 text-green-600"
                            }`}>
                              <Zap className="w-3 h-3" />
                              {completed ? "Yakunlangan" : "Bepul"}
                            </span>
                            <span className={`text-xs font-medium flex items-center gap-0.5 transition-colors ${
                              completed ? "text-teal-600" : "text-gray-400 group-hover:text-teal-600"
                            }`}>
                              {completed ? "Qayta o'qish" : "Boshlash"}
                              <ChevronRight className="w-3 h-3" />
                            </span>
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

        {/* ─── PREMIUM MODAL ─── */}
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

                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Premium dars
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Bu dars faqat Premium foydalanuvchilar uchun ochiq. To'liq
                  kursdan bahramand bo'lish uchun obuna bo'ling.
                </p>

                <Link
                  href="/pricing"
                  className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-200"
                >
                  Premium'ga o'tish
                </Link>

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
    </div>
  );
}
