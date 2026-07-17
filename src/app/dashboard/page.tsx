"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Flame,
  Award,
  BookOpen,
  Target,
  Layers,
  Zap,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import Link from "next/link";

interface DashboardData {
  user: {
    name: string | null;
    email: string;
    level: string;
    targetScore: number | null;
    streakCount: number;
    lastActiveDate: string | null;
  };
  stats: {
    totalTests: number;
    totalPractice: number;
    totalFlashcards: number;
    dueReviews: number;
    averageScore: number;
    achievements: number;
  };
  testResults: {
    id: string;
    score: number;
    level: string;
    date: string;
    testType: string;
    maxScore?: number;
  }[];
  practiceAttempts: {
    id: string;
    score: number;
    maxScore: number;
    date: string;
  }[];
  achievements: {
    id: string;
    badgeName: string;
    earnedAt: string;
  }[];
  recentHistory: {
    id: string;
    word: string;
    sourceTitle: string | null;
    seenAt: string;
  }[];
  mastery?: {
    weaknesses: Array<{
      subtopic: string;
      skill: string;
      errorRate: number;
      attemptsCount: number;
      masteryLevel: number;
      status: string;
      recommendedLessons: Array<{ id: string; title: string; difficulty: string }>;
    }>;
    recommendations: Array<{
      subtopic: string;
      skill: string;
      errorRate: number;
      attemptsCount: number;
      message: string;
      recommendedLessons: Array<{ id: string; title: string; difficulty: string }>;
    }>;
    radar: Array<{
      skill: string;
      value: number;
      fullMark: number;
    }>;
  };
}

const badgeIcons: Record<string, string> = {
  "first_test": "🎯",
  "streak_3": "🔥",
  "streak_7": "🔥",
  "flashcards_10": "📚",
  "flashcards_50": "📚",
  "practice_5": "✍️",
  "practice_20": "✍️",
  "perfect_score": "💯",
};

const skillIconMap: Record<string, string> = {
  Listening: "🎧",
  Reading: "📖",
  Writing: "✍️",
  Speaking: "🎤",
  Grammar: "📝",
  Vocabulary: "📚",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!data || !data.user) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500">Ma'lumotlar topilmadi. Iltimos, profilingizni yangilang.</p>
      <Link href="/profile" className="mt-4 inline-block text-primary hover:underline">
        Profilga o'tish
      </Link>
    </div>
  );

  const chartData = data.testResults
    .slice()
    .reverse()
    .map((t) => ({
      date: new Date(t.date).toLocaleDateString("uz-UZ", {
        month: "short",
        day: "numeric",
      }),
      score: t.maxScore ? Math.round((t.score / t.maxScore) * 100) : t.score,
    }));

  const practiceChart = data.practiceAttempts
    .slice()
    .reverse()
    .slice(0, 10)
    .map((p) => ({
      date: new Date(p.date).toLocaleDateString("uz-UZ", {
        month: "short",
        day: "numeric",
      }),
      score: p.maxScore ? Math.round((p.score / p.maxScore) * 100) : p.score,
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Xush kelibsiz, {data.user.name || "Foydalanuvchi"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Sizning IELTS tayyorgarlik dashboardingiz
            </p>
          </div>
          <Link
            href="/study-plan"
            className="bg-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors btn-macos"
          >
            <Target className="w-4 h-4 inline mr-1" />
            Reja tuzish
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-macos">
            <Flame className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{data.user.streakCount}</div>
            <div className="text-sm text-white/80">Kunlik Streak</div>
          </div>
          <div className="glass-card bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-5 text-white shadow-macos">
            <Target className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold capitalize">
              {data.user.level === "beginner"
                ? "Boshlang'ich"
                : data.user.level === "intermediate"
                ? "O'rta"
                : data.user.level === "advanced"
                ? "Yuqori"
                : "Noma'lum"}
            </div>
            <div className="text-sm text-white/80">Daraja</div>
          </div>
          <div className="glass-card bg-gradient-to-br from-accent-mint to-emerald-600 rounded-2xl p-5 text-white shadow-macos">
            <TrendingUp className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">
              {data.stats.averageScore}%
            </div>
            <div className="text-sm text-white/80">O'rtacha natija</div>
          </div>
          <div className="glass-card bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-5 text-white shadow-macos">
            <Award className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{data.stats.achievements}</div>
            <div className="text-sm text-white/80">Yutuqlar</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {chartData.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Test natijalari
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ fill: "#4F46E5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {practiceChart.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Practice natijalari
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={practiceChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#34D399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Radar chart */}
            {data.mastery?.radar && data.mastery.radar.length >= 3 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ko'nikma tahlili</h3>
                <p className="text-xs text-gray-400 mb-2">Har bir skill bo'yicha o'zlashtirish darajasi</p>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={data.mastery.radar}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" fontSize={11} tick={{ fill: "#6b7280" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Mastery" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Mastery indicators */}
            {data.mastery?.weaknesses && data.mastery.weaknesses.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Mavzular bo'yicha natija</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {data.mastery.weaknesses.slice(0, 8).map((w) => (
                    <div key={w.subtopic} className="flex items-center gap-2 text-sm">
                      <span className="shrink-0 text-base">{skillIconMap[w.skill.charAt(0).toUpperCase() + w.skill.slice(1)] || "📌"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 truncate">{w.subtopic}</span>
                          <span className={`text-xs font-semibold ml-2 ${
                            w.status === "strong" ? "text-green-600" :
                            w.status === "average" ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {w.status === "strong" ? "🟢" : w.status === "average" ? "🟡" : "🔴"}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                          <div className={`h-full rounded-full transition-all ${
                            w.masteryLevel >= 0.8 ? "bg-green-500" :
                            w.masteryLevel >= 0.6 ? "bg-yellow-500" : "bg-red-500"
                          }`} style={{ width: `${w.masteryLevel * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {data.mastery?.recommendations && data.mastery.recommendations.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sizga tavsiya etiladi</h3>
                <div className="space-y-3">
                  {data.mastery.recommendations.map((rec) => (
                    <div key={rec.subtopic} className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-900 font-medium">{rec.message}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {rec.recommendedLessons.slice(0, 2).map((l) => (
                          <Link
                            key={l.id}
                            href={`/courses/${rec.skill}/${l.id}`}
                            className="text-xs px-2.5 py-1 bg-white border border-amber-300 rounded-full text-amber-700 hover:bg-amber-50 transition-colors"
                          >
                            {l.title}
                          </Link>
                        ))}
                        <Link
                          href={`/courses/${rec.skill}`}
                          className="text-xs px-2.5 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                        >
                          Hoziroq mashq qilish →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Tez statistika
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Testlar
                  </span>
                  <span className="font-semibold">{data.stats.totalTests}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Practice
                  </span>
                  <span className="font-semibold">
                    {data.stats.totalPractice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Flashcards
                  </span>
                  <span className="font-semibold">
                    {data.stats.totalFlashcards}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    Takrorlash kerak
                  </span>
                  <span className="font-semibold text-amber-600">
                    {data.stats.dueReviews}
                  </span>
                </div>
              </div>
            </div>

            {data.achievements.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Yutuqlar</h3>
                <div className="flex flex-wrap gap-2">
                  {data.achievements.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      <span>{badgeIcons[a.badgeName] || "🏆"}</span>
                      {a.badgeName.replace(/_/g, " ")}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.recentHistory.length > 0 && (
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Oxirgi so'zlar
                </h3>
                <div className="space-y-1">
                  {data.recentHistory.map((h) => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between text-sm py-1"
                    >
                      <span className="text-gray-800 font-medium capitalize">
                        {h.word}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(h.seenAt).toLocaleDateString("uz-UZ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
