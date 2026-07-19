"use client";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Trash2, Layers, Volume2,
  GraduationCap, Zap, Pencil, List,
  BookOpen, Trophy,
} from "lucide-react";
import { getWordIcon, getIconBg } from "@/lib/wordIcons";
import MiniCalendar from "@/components/flashcards/MiniCalendar";
import FlashcardFilter from "@/components/flashcards/FlashcardFilter";
import SessionManager from "@/components/flashcards/SessionManager";

interface Flashcard {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  visualIcon: string;
  category?: string | null;
  masteryStatus: string;
  nextReviewDate: string;
  repetitionLevel: number;
}

const categoryColors: Record<string, string> = {
  Environment: "from-green-400 to-emerald-500",
  Technology: "from-blue-400 to-indigo-500",
  Academic: "from-purple-400 to-violet-500",
  General: "from-amber-400 to-orange-500",
  Vocabulary: "from-pink-400 to-rose-500",
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function FlashcardsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [stats, setStats] = useState({ dueCount: 0, totalCount: 0, masteredCount: 0, learningCount: 0, calendarData: {} as Record<string, number> });
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sessionMode, setSessionMode] = useState<"review" | "quiz" | "writing" | "speed" | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status !== "authenticated") return;
    fetchData();
  }, [status, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards");
      const data = await res.json();
      setFlashcards(data.flashcards || []);
      setStats(data.stats || { dueCount: 0, totalCount: 0, masteredCount: 0, learningCount: 0, calendarData: {} });
      setCategories(data.categories || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const filteredCards = useMemo(() => {
    let cards = [...flashcards];
    if (activeCategory !== "all") cards = cards.filter((c) => c.category === activeCategory);
    if (activeTab === "due") cards = cards.filter((c) => new Date(c.nextReviewDate) <= new Date());
    else if (activeTab === "new") cards = cards.filter((c) => c.masteryStatus === "new");
    else if (activeTab === "learning") cards = cards.filter((c) => c.masteryStatus === "learning");
    else if (activeTab === "mastered") cards = cards.filter((c) => c.masteryStatus === "mastered");
    if (search) cards = cards.filter((c) => c.word.toLowerCase().includes(search.toLowerCase()));
    return cards;
  }, [flashcards, activeCategory, activeTab, search]);

  const tabs = [
    { key: "all", label: "Barchasi", count: stats.totalCount },
    { key: "due", label: "Takrorlash kerak", count: stats.dueCount },
    { key: "new", label: "Yangi", count: stats.totalCount - stats.learningCount - stats.masteredCount },
    { key: "learning", label: "O'rganilmoqda", count: stats.learningCount },
    { key: "mastered", label: "O'zlashtirilgan", count: stats.masteredCount },
  ];

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/flashcards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setFlashcards((prev) => prev.filter((f) => f.id !== id));
      fetchData();
    } catch (e) { console.error(e); }
  };

  const handlePlayAudio = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Session mode
  if (sessionMode) {
    const sessionCards = sessionMode === "review"
      ? flashcards.filter((f) => new Date(f.nextReviewDate) <= new Date())
      : sessionMode === "speed"
      ? flashcards.sort(() => Math.random() - 0.5).slice(0, 20)
      : filteredCards;

    if (sessionCards.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500 mb-4">Hech qanday karta topilmadi</p>
          <button onClick={() => setSessionMode(null)} className="text-primary hover:underline">Orqaga</button>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setSessionMode(null)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
        >
          ← Flashcardlar
        </button>
        <SessionManager
          cards={sessionCards}
          mode={sessionMode}
          onBack={() => { setSessionMode(null); fetchData(); }}
          onRefresh={fetchData}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
            <p className="text-gray-500 mt-1">
              {stats.totalCount} ta so'z · {stats.masteredCount} ta o'zlashtirilgan
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Jami", value: stats.totalCount, icon: Layers, color: "text-indigo-500 bg-indigo-50" },
            { label: "Takrorlash kerak", value: stats.dueCount, icon: RefreshCw, color: "text-red-500 bg-red-50" },
            { label: "O'rganilmoqda", value: stats.learningCount, icon: BookOpen, color: "text-amber-500 bg-amber-50" },
            { label: "O'zlashtirilgan", value: stats.masteredCount, icon: Trophy, color: "text-green-500 bg-green-50" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-macos border border-white/20 p-4"
            >
              <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calendar widget */}
          <div>
            <MiniCalendar calendarData={stats.calendarData} dueCount={stats.dueCount} />

            {/* Mode buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setSessionMode("review")}
                disabled={stats.dueCount === 0}
                className="w-full flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-macos border border-white/20 p-4 hover:shadow-lg transition-all disabled:opacity-50 btn-macos"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 text-sm">Takrorlash</div>
                  <div className="text-xs text-gray-500">{stats.dueCount} ta karta</div>
                </div>
              </button>

              <button
                onClick={() => setSessionMode("quiz")}
                className="w-full flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-macos border border-white/20 p-4 hover:shadow-lg transition-all btn-macos"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 text-sm">Quiz rejimi</div>
                  <div className="text-xs text-gray-500">{filteredCards.length} ta variantli test</div>
                </div>
              </button>

              <button
                onClick={() => setSessionMode("writing")}
                className="w-full flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-macos border border-white/20 p-4 hover:shadow-lg transition-all btn-macos"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                  <Pencil className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 text-sm">Yozish rejimi</div>
                  <div className="text-xs text-gray-500">Spelling mashqi</div>
                </div>
              </button>

              <button
                onClick={() => setSessionMode("speed")}
                className="w-full flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-macos border border-white/20 p-4 hover:shadow-lg transition-all btn-macos"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 text-sm">Tezkor rejim</div>
                  <div className="text-xs text-gray-500">60 soniyada maksimal ball</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Flashcard list */}
          <div className="lg:col-span-2">
            <FlashcardFilter
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              search={search}
              onSearchChange={setSearch}
            />

            <AnimatePresence mode="wait">
              {filteredCards.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20"
                >
                  <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hech narsa topilmadi</h3>
                  <p className="text-gray-600 text-sm">
                    {search ? "Boshqa so'z qidirib ko'ring" : "Hozircha flashcards yo'q"}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  {filteredCards.map((card, i) => {
                    const dueToday = new Date(card.nextReviewDate) <= new Date();
                    const dueTomorrow = !dueToday && new Date(card.nextReviewDate) <= new Date(Date.now() + 86400000);
                    const bgGrad = categoryColors[card.category || "General"] || categoryColors.General;

                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-4 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start gap-3">
                          {/* Category color bar */}
                          <div className={`w-1.5 h-full min-h-[60px] rounded-full bg-gradient-to-b ${bgGrad} shrink-0 mt-1`} />

                          <div className={`w-10 h-10 rounded-xl ${getIconBg(card.visualIcon || getWordIcon(card.word))} flex items-center justify-center text-xl shrink-0`}>
                            {card.visualIcon || getWordIcon(card.word)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 capitalize">{card.word}</h4>
                              <button
                                onClick={() => handlePlayAudio(card.word)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Volume2 className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                            {card.meaning && (
                              <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{card.meaning}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 7 }).map((_, j) => (
                                  <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < card.repetitionLevel ? "bg-accent-mint" : "bg-gray-200"}`} />
                                ))}
                              </div>

                              {/* Review date badge */}
                              {dueToday ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium">
                                  Bugun!
                                </span>
                              ) : dueTomorrow ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-medium">
                                  Ertaga
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-400">
                                  {new Date(card.nextReviewDate).toLocaleDateString("uz")}
                                </span>
                              )}

                              {/* Mastery status badge */}
                              {card.masteryStatus === "mastered" && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-600 font-medium">
                                  ✅ O'zlashtirilgan
                                </span>
                              )}
                              {card.masteryStatus === "learning" && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-medium">
                                  📖 O'rganilmoqda
                                </span>
                              )}

                              {card.category && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                                  {card.category}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDelete(card.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
