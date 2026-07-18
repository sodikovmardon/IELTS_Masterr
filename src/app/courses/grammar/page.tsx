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
  Star,
  Crown,
  CheckCircle2,
  X,
  Zap,
  Trophy,
  Type,
  Ruler,
  Compass,
  Layers,
  Hexagon,
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
  Easy: { label: "Oson", class: "bg-cyan-900/40 text-cyan-200 border border-cyan-700/30" },
  Medium: { label: "O'rta", class: "bg-amber-900/30 text-amber-200 border border-amber-700/30" },
  Hard: { label: "Qiyin", class: "bg-rose-900/30 text-rose-200 border border-rose-700/30" },
};

type FilterTab = "Barchasi" | "Bepul" | "Premium" | "Bajarilmagan";

const MODULE_COLORS = [
  "from-cyan-400 to-blue-500",
  "from-blue-400 to-indigo-500",
  "from-indigo-400 to-violet-500",
  "from-violet-400 to-purple-500",
  "from-purple-400 to-pink-500",
  "from-pink-400 to-rose-500",
  "from-rose-400 to-orange-500",
  "from-orange-400 to-amber-500",
  "from-amber-400 to-yellow-500",
  "from-yellow-400 to-lime-500",
  "from-lime-400 to-emerald-500",
  "from-emerald-400 to-teal-500",
  "from-teal-400 to-cyan-500",
  "from-cyan-400 to-sky-500",
  "from-sky-400 to-blue-500",
];

function BlueprintLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="relative w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#155e75" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="32" y1="4" x2="32" y2="60" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1="4" y1="32" x2="60" y2="32" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="32" cy="32" r="8" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="32" y="36" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace">Φ</text>
        </svg>
      </motion.div>
      <p className="text-sm text-cyan-400/70 mt-4 font-mono">Chizma yuklanmoqda...</p>
    </div>
  );
}

export default function GrammarCoursesPage() {
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
    const params = new URLSearchParams({ category: "grammar" });
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
        return lessons.filter((l) => !l.progresses?.[0]?.completed);
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
    { icon: Layers, value: lessons.length, label: "Modul" },
    { icon: Trophy, value: lessons.reduce((a, l) => a + (l.progresses?.[0]?.completed ? 1 : 0), 0), label: "Yakunlangan" },
    { icon: Ruler, value: "12", label: "Qonuniyat" },
  ], [lessons]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      {/* Blueprint grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Decorative geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="200" height="120" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
          <rect x="50" y="50" width="200" height="120" fill="none" stroke="#22d3ee" strokeWidth="0.5" transform="rotate(-3 150 110)" />
          <circle cx="500" cy="200" r="80" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="200" y1="400" x2="600" y2="400" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="8 4" />
          <line x1="400" y1="200" x2="400" y2="600" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="8 4" />
          <polygon points="650,500 720,550 650,600 580,550" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
          <text x="55" y="45" fontSize="6" fill="#22d3ee" fontFamily="monospace" opacity="0.3">REV 3.0</text>
          <text x="250" y="190" fontSize="6" fill="#22d3ee" fontFamily="monospace" opacity="0.3">SECTION A-A</text>
          <text x="620" y="480" fontSize="6" fill="#22d3ee" fontFamily="monospace" opacity="0.3">DETAIL B</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Back link */}
        <Link
          href="/courses"
          className="inline-flex items-center text-sm text-cyan-400/50 hover:text-cyan-400 mb-6 transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Barcha kurslar
        </Link>

        {/* ─── HERO ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-3 border border-cyan-800/30 px-3 py-1 rounded-full bg-cyan-950/30">
              <Hexagon className="w-3 h-3" />
              STRUCTURAL ANALYSIS
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Courier New', monospace", lineHeight: 1.15 }}>
              <span className="text-white">Til</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Qurilishi</span>
            </h1>
            <p className="text-base sm:text-lg text-cyan-200/60 leading-relaxed max-w-2xl font-mono">
              Har bir qoida — mustahkam bino uchun g'isht. To'g'ri quring.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white font-mono">{s.value}</p>
                  <p className="text-xs text-cyan-400/50 font-mono">{s.label}</p>
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
              className={`px-4 py-2 rounded-xl text-sm font-mono whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/30"
                  : "bg-cyan-950/30 text-cyan-400/60 border border-cyan-800/30 hover:border-cyan-600/50 hover:text-cyan-300"
              }`}
            >
              {tab === "Bajarilmagan" && (
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5 align-middle" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* ─── MODULE LIST ─── */}
        {loading ? (
          <BlueprintLoading />
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-20 text-cyan-400/30">
            <Type className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-mono">Hech qanday modul topilmadi</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[25px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent hidden lg:block" />

            <div className="space-y-5">
              <AnimatePresence mode="popLayout">
                {filteredLessons.map((lesson, i) => {
                  const progressPct = getProgressPercent(lesson);
                  const diff = DIFFICULTY_CONFIG[lesson.difficulty] || { label: lesson.difficulty, class: "bg-gray-100 text-gray-700" };
                  const completed = lesson.progresses?.[0]?.completed;
                  const modNum = String(i + 1).padStart(2, "0");
                  const grad = MODULE_COLORS[i % MODULE_COLORS.length];

                  return (
                    <motion.div
                      key={lesson.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.03 }}
                      className="relative"
                    >
                      {/* Connector dot */}
                      <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-[17px] h-[17px] rounded-full border-2 border-cyan-500/40 bg-[#0A1628] z-10 hidden lg:flex items-center justify-center">
                        <div className={`w-[7px] h-[7px] rounded-full ${completed ? "bg-cyan-400" : "bg-cyan-800"}`} />
                      </div>

                      {lesson.isPremium ? (
                        <div
                          onClick={() => setPremiumModal(lesson.id)}
                          className="group relative bg-gradient-to-r from-cyan-950/60 to-blue-950/40 rounded-2xl border border-cyan-800/30 p-5 pl-8 lg:pl-14 cursor-pointer h-full transition-all duration-300 hover:border-cyan-600/50 hover:shadow-lg hover:shadow-cyan-900/20"
                        >
                          <div className="flex items-center gap-4">
                            {/* Module number badge */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 shadow-lg`}>
                              <span className="text-lg font-bold text-white font-mono">{modNum}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white text-base leading-snug font-mono">
                                  {lesson.title}
                                </h3>
                                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                              </div>
                              <div className="flex items-center gap-3 text-xs text-cyan-400/50 font-mono">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {lesson.durationMin} min
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${diff.class}`}>
                                  {diff.label}
                                </span>
                              </div>
                            </div>
                            <Lock className="w-4 h-4 text-cyan-700/50 shrink-0" />
                          </div>
                        </div>
                      ) : (
                        <Link href={`/courses/grammar/${lesson.id}`}>
                          <div className={`group relative bg-gradient-to-r from-cyan-950/60 to-blue-950/40 rounded-2xl border p-5 pl-8 lg:pl-14 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 ${
                            completed ? "border-cyan-600/40" : "border-cyan-800/30 hover:border-cyan-600/50"
                          }`}>
                            <div className="flex items-start gap-4">
                              {/* Module number badge */}
                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 shadow-lg`}>
                                <span className="text-lg font-bold text-white font-mono">{modNum}</span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-white text-base leading-snug font-mono">
                                    {lesson.title}
                                  </h3>
                                  {completed && (
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                  )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-cyan-400/50 font-mono mb-3 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {lesson.durationMin} min
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${diff.class}`}>
                                    {diff.label}
                                  </span>
                                  <span className="flex items-center gap-1 text-cyan-500/40">
                                    <Zap className="w-3 h-3" />
                                    {completed ? "Yakunlangan" : "Bepul"}
                                  </span>
                                </div>

                                {progressPct !== null && (
                                  <div className="max-w-xs">
                                    <div className="flex items-center justify-between text-[10px] text-cyan-400/40 font-mono mb-1">
                                      <span>PROGRESS</span>
                                      <span>{progressPct}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-cyan-950/80 rounded-full overflow-hidden border border-cyan-900/30">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPct}%` }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center text-cyan-500/50 group-hover:text-cyan-400 transition-colors shrink-0 mt-1">
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ─── PREMIUM MODAL ─── */}
        <AnimatePresence>
          {premiumModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setPremiumModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F1F3A] rounded-2xl border border-cyan-800/30 shadow-2xl w-full max-w-sm p-6 text-center relative"
              >
                <button
                  onClick={() => setPremiumModal(null)}
                  className="absolute top-4 right-4 text-cyan-600/50 hover:text-cyan-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 rounded-full bg-amber-900/30 border border-amber-700/30 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-amber-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-mono">Premium modul</h3>
                <p className="text-cyan-300/50 text-sm mb-6 font-mono leading-relaxed">
                  Bu modul faqat Premium foydalanuvchilar uchun ochiq. To'liq kursdan bahramand bo'lish uchun obuna bo'ling.
                </p>

                <Link
                  href="/pricing"
                  className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold font-mono hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-900/30"
                >
                  Premium'ga o'tish
                </Link>

                <button
                  onClick={() => setPremiumModal(null)}
                  className="mt-3 text-sm text-cyan-600/50 hover:text-cyan-400 transition-colors font-mono"
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
