"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Zap, Flame, Target, Clock, Trophy,
  Sparkles, TrendingUp, BookOpen,
} from "lucide-react";
import PracticeEngine from "@/components/practice/PracticeEngine";

interface PracticeActivity {
  id: string;
  type: string;
  title: string;
  icon: string;
  category: string;
  data: string;
  estimatedMin: number;
  isDaily: boolean;
  dailyDate: string | null;
}

const categoryMeta: Record<string, { label: string; icon: any; color: string }> = {
  quick: { label: "Tezkor mashqlar", icon: Zap, color: "from-amber-400 to-orange-500" },
  daily_challenge: { label: "Kunlik Challenge", icon: Flame, color: "from-red-400 to-rose-500" },
  recommended: { label: "Sizga tavsiya etilgan", icon: Sparkles, color: "from-indigo-400 to-purple-500" },
};

const activityMeta: Record<string, { gradient: string }> = {
  speed_vocab: { gradient: "from-yellow-400 to-orange-500" },
  grammar_sprint: { gradient: "from-emerald-400 to-teal-500" },
  error_spotting: { gradient: "from-red-400 to-pink-500" },
  word_association: { gradient: "from-blue-400 to-indigo-500" },
  sentence_builder: { gradient: "from-purple-400 to-violet-500" },
  mini_reading: { gradient: "from-cyan-400 to-blue-500" },
  pronunciation: { gradient: "from-pink-400 to-rose-500" },
  listening_snippet: { gradient: "from-teal-400 to-cyan-500" },
  mixed_review: { gradient: "from-indigo-400 to-purple-500" },
  daily_challenge: { gradient: "from-red-400 to-rose-500" },
};

export default function PracticePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<PracticeActivity[]>([]);
  const [highScores, setHighScores] = useState<Record<string, { score: number; comboCount: number }>>({});
  const [todayAttemptCount, setTodayAttemptCount] = useState(0);
  const [todayStreak, setTodayStreak] = useState(0);
  const [activeActivity, setActiveActivity] = useState<PracticeActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/practice/activities");
      const data = await res.json();
      setActivities(data.activities || []);
      setHighScores(data.highScores || {});
      setTodayAttemptCount(data.todayAttemptCount || 0);
      setTodayStreak(data.todayStreak || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const dailyGoal = 3;
  const dailyProgress = Math.min(todayAttemptCount / dailyGoal, 1);

  const grouped = activities.reduce((acc, a) => {
    const key = a.isDaily ? "daily_challenge" : a.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {} as Record<string, PracticeActivity[]>);

  if (activeActivity) {
    return <div className="max-w-4xl mx-auto px-4 py-8">
      <PracticeEngine activity={activeActivity} onBack={() => setActiveActivity(null)} />
    </div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Amaliyot</h1>
            <p className="text-gray-500 mt-1">Mashq qiling, o'z ustingizda ishlang va natijalaringizni yaxshilang</p>
          </div>
          {session && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Bugun</div>
                <div className="flex items-center gap-1 text-lg font-bold text-amber-500">
                  <Flame className="w-5 h-5" />
                  {todayStreak} kun
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Goal Progress */}
        {session && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">Bugungi maqsad: {dailyGoal} ta mashq</span>
              </div>
              <span className="text-sm text-gray-500">
                {todayAttemptCount} / {dailyGoal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dailyProgress * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500`}
              />
            </div>
            {dailyProgress >= 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <Trophy className="w-4 h-4" /> Bugungi maqsad bajarildi!
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Activity Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => {
            const meta = categoryMeta[category];
            if (!meta || items.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${meta.color} text-white`}>
                    <meta.icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{meta.label}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((activity, i) => {
                    const am = activityMeta[activity.type];
                    const hs = highScores[activity.id];

                    return (
                      <motion.button
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setActiveActivity(activity)}
                        className="text-left bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all btn-macos group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${am?.gradient || "from-gray-400 to-gray-500"} flex items-center justify-center text-2xl`}>
                            {activity.icon}
                          </div>
                          <div className="flex gap-1">
                            {activity.type === "speed_vocab" && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">🔥 Eng mashhur</span>
                            )}
                            {activity.type === "daily_challenge" && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">⚡ Yangi</span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {activity.estimatedMin} min
                          </span>
                          {hs !== undefined && (
                            <span className="flex items-center gap-1 text-amber-600">
                              <Trophy className="w-3 h-3" /> {hs.score}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
