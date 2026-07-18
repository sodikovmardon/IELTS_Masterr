"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Lock,
  Loader2,
  Headphones,
  Crown,
  X,
  Play,
  Sparkles,
  Star,
  Music,
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

const SECTION_COLORS: Record<number, string> = {
  1: "#06b6d4",
  2: "#10b981",
  3: "#f59e0b",
  4: "#ef4444",
};

type FilterTab = "Barchasi" | "Bepul" | "Premium" | "Bajarilmagan";

function EqualizerBars() {
  return (
    <div className="flex items-end gap-[3px] h-16">
      {[12, 20, 8, 28, 16, 32, 10, 24, 14, 30, 18, 8, 22, 26, 12].map((h, i) => (
        <div
          key={i}
          className="w-[5px] rounded-full"
          style={{
            height: `${h}px`,
            backgroundColor: i % 3 === 0 ? "#eab308" : i % 3 === 1 ? "#22d3ee" : "#a855f7",
            animation: `eqBounce 0.${(i % 4) + 4}s ease-in-out infinite`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes eqBounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.5); }
        }
      `}</style>
    </div>
  );
}

function SoundwaveDecoration() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-24 opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1440 120">
      <path d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z" fill="currentColor" className="text-yellow-400">
        <animate attributeName="d" dur="6s" repeatCount="indefinite"
          values="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z;
                  M0,40 C120,80 240,20 360,70 C480,30 600,90 720,50 C840,80 960,30 1080,65 C1200,45 1320,85 1440,40 L1440,120 L0,120 Z;
                  M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z" />
      </path>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function PlaylistRow({ lesson, index }: { lesson: Lesson; index: number }) {
  const sectionMatch = lesson.title.match(/Section\s*(\d)/i);
  const sectionNum = sectionMatch ? parseInt(sectionMatch[1]) : null;
  const sectionColor = sectionNum ? SECTION_COLORS[sectionNum] : undefined;
  const progressPct = (() => {
    const p = lesson.progresses?.[0];
    if (!p || p.maxScore === null || p.maxScore === 0) return null;
    return Math.round(((p.score || 0) / p.maxScore) * 100);
  })();

  return (
    <div className="group relative">
      {lesson.isPremium ? (
        <div
          onClick={() => {}}
          className="relative flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
          style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/10 group-hover:border-yellow-400/50 transition-all duration-300">
              <Lock className="w-4 h-4 text-white/40" />
            </div>
          </div>

          {sectionColor && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full transition-all group-hover:h-10" style={{ backgroundColor: sectionColor }} />
          )}

          <div className="flex-1 min-w-0 pl-2">
            <div className="flex items-center gap-2 mb-0.5">
              <Music className="w-3 h-3 text-white/30" />
              <span className="text-xs font-medium text-white/40">Treks {String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="text-sm font-medium text-white/70 truncate group-hover:text-white transition-colors">
              {lesson.title}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs text-white/30">
              <Clock className="w-3 h-3" />
              {lesson.durationMin}:00
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">
              <Crown className="w-2.5 h-2.5" />
              Premium
            </span>
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
              <Lock className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/courses/listening/${lesson.id}`}>
          <div className="relative flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/[0.06]">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center border border-white/10 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 transition-all duration-300">
                <Play className="w-4 h-4 text-white/60 group-hover:text-yellow-400 ml-0.5 transition-colors" fill="currentColor" />
              </div>
            </div>

            {sectionColor && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full transition-all group-hover:h-10" style={{ backgroundColor: sectionColor }} />
            )}

            <div className="flex-1 min-w-0 pl-2">
              <div className="flex items-center gap-2 mb-0.5">
                <Music className="w-3 h-3 text-white/30" />
                <span className="text-xs font-medium text-white/40">Treks {String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-sm font-medium text-white/70 truncate group-hover:text-white transition-colors">
                {lesson.title}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {progressPct !== null && (
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{progressPct}%</span>
                </div>
              )}
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Clock className="w-3 h-3" />
                {lesson.durationMin}:00
              </span>
              <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                Bepul
              </span>
              <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default function ListeningCoursesPage() {
  const { data: session } = useSession();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("Barchasi");
  const [premiumModal, setPremiumModal] = useState<string | null>(null);

  const tabs: FilterTab[] = ["Barchasi", "Bepul", "Premium", "Bajarilmagan"];

  useEffect(() => {
    const params = new URLSearchParams({ category: "listening" });
    if (session?.user?.id) params.set("userId", session.user.id);
    fetch(`/api/lessons?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lessons) setLessons(res.lessons);
      })
      .finally(() => setLoading(false));
  }, [session]);

  const trending = useMemo(() => {
    return [...lessons].sort((a, b) => (b.progresses?.[0]?.score || 0) - (a.progresses?.[0]?.score || 0)).slice(0, 3);
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    switch (activeTab) {
      case "Bepul": return lessons.filter((l) => !l.isPremium);
      case "Premium": return lessons.filter((l) => l.isPremium);
      case "Bajarilmagan": return lessons.filter((l) => !l.progresses?.[0]?.completed);
      default: return lessons;
    }
  }, [lessons, activeTab]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1321" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-space { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>

      {/* Soundwave bottom decoration */}
      <SoundwaveDecoration />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Link
          href="/courses"
          className="inline-flex items-center text-xs text-white/30 hover:text-yellow-400 mb-8 transition-colors tracking-wider uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Barcha kurslar
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-yellow-400/60 bg-yellow-400/5 px-3 py-1 rounded-full border border-yellow-400/10">
              IELTS Listening
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 font-space text-white tracking-tight">
            Tinglash <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400">Studiyasi</span>
          </h1>

          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto mb-8 font-space">
            Har bir ovoz — imtihon kalitidir. Diqqatingizni charxlang.
          </p>

          <div className="flex justify-center mb-8">
            <EqualizerBars />
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-white/20">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTION_COLORS[1] }} />
              Section 1
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTION_COLORS[2] }} />
              Section 2
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTION_COLORS[3] }} />
              Section 3
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTION_COLORS[4] }} />
              Section 4
            </span>
          </div>
        </motion.div>

        {/* Trending */}
        {trending.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/50 font-space">Eng ko&apos;p mashq qilingan</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {trending.map((lesson) => {
                const diff = DIFFICULTY_CONFIG[lesson.difficulty] || { label: lesson.difficulty, class: "" };
                return (
                  <Link key={lesson.id} href={lesson.isPremium ? "#" : `/courses/listening/${lesson.id}`}>
                    <div className="shrink-0 w-48 bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.08] hover:border-yellow-400/20 transition-all group cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                          <Star className="w-3.5 h-3.5 text-yellow-400" />
                        </div>
                        {lesson.isPremium && <Crown className="w-3.5 h-3.5 text-yellow-400/60" />}
                      </div>
                      <p className="text-sm font-medium text-white/70 truncate group-hover:text-white transition-colors">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${diff.class}`}>{diff.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all tracking-wider ${
                activeTab === tab
                  ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20"
                  : "text-white/40 border border-white/10 hover:border-yellow-400/30 hover:text-yellow-400/80 bg-white/[0.02]"
              }`}
            >
              {tab === "Bajarilmagan" && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5 align-middle" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Lesson Playlist */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-20 text-white/20">
            <Headphones className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-space">Hech qanday dars topilmadi</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-4 text-[10px] text-white/20 uppercase tracking-widest">
              <span className="w-10" />
              <span className="flex-1">Nomi</span>
              <span className="w-24 text-right hidden sm:block">Progress</span>
              <span className="w-16 text-right">Vaqt</span>
              <span className="w-16 text-right">Status</span>
              <span className="w-8" />
            </div>
            <AnimatePresence mode="popLayout">
              {filteredLessons.map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <PlaylistRow lesson={lesson} index={i} />
                  {i < filteredLessons.length - 1 && (
                    <div className="mx-4 border-b border-white/[0.04]" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {premiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setPremiumModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative border border-yellow-400/20"
              style={{ backgroundColor: "#0D1321" }}
            >
              <button
                onClick={() => setPremiumModal(null)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 border border-yellow-400/20">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-space">Premium dars</h3>
              <p className="text-white/50 text-sm mb-6">
                Bu dars faqat Premium foydalanuvchilar uchun ochiq. To&apos;liq kursdan bahramand bo&apos;lish uchun obuna bo&apos;ling.
              </p>

              <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all shadow-lg shadow-yellow-400/20">
                Premium&apos;ga o&apos;tish
              </button>

              <button
                onClick={() => setPremiumModal(null)}
                className="mt-3 text-sm text-white/30 hover:text-white/60 transition-colors"
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
