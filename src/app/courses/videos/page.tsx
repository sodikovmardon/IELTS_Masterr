"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Clock, Play, ChevronRight } from "lucide-react";

interface LessonProgress {
  completed: boolean;
  watchedPercent?: number;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  videoUrl: string | null;
  videoDurationSec: number | null;
  videoThumbnailUrl: string | null;
  difficulty: string;
  progresses: LessonProgress[];
}

const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  grammar: { label: "Grammar", icon: "📝", color: "from-emerald-500 to-teal-600" },
  reading: { label: "Reading", icon: "📖", color: "from-blue-500 to-indigo-600" },
  listening: { label: "Listening", icon: "🎧", color: "from-purple-500 to-pink-600" },
  writing: { label: "Writing", icon: "✍️", color: "from-orange-500 to-red-600" },
  speaking: { label: "Speaking", icon: "🎤", color: "from-indigo-500 to-violet-600" },
  vocabulary: { label: "Vocabulary", icon: "📚", color: "from-yellow-500 to-amber-600" },
};

const CATEGORY_ORDER = ["grammar", "reading", "listening", "writing", "speaking", "vocabulary"];

export default function VideosPage() {
  const { data: session } = useSession();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (session?.user?.id) params.set("userId", session.user.id);
    fetch(`/api/videos?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lessons) setLessons(res.lessons);
      })
      .finally(() => setLoading(false));
  }, [session]);

  const grouped = CATEGORY_ORDER
    .map((cat) => {
      const items = lessons.filter((l) => l.category === cat);
      return items.length > 0 ? { category: cat, ...CATEGORY_LABELS[cat], items } : null;
    })
    .filter(Boolean);

  const formatDuration = (sec: number | null) => {
    if (!sec) return "";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/courses"
          className="inline-flex items-center text-sm text-white/50 hover:text-white/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Barcha kurslar
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Video Darslar
          </h1>
          <p className="text-white/40 text-sm">
            IELTSning barcha bo'limlari bo'yicha video darslar to'plami
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">Hozircha video darslar mavjud emas</p>
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map((group, gi) => (
              <motion.div
                key={group!.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group!.color} flex items-center justify-center text-lg`}>
                    {group!.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{group!.label}</h2>
                    <p className="text-xs text-white/40">{group!.items.length} ta video</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group!.items.map((lesson, i) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.1 + i * 0.04 }}
                    >
                      <Link href={`/courses/videos/${lesson.id}`}>
                        <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300">
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-gray-800 overflow-hidden">
                            {lesson.videoThumbnailUrl ? (
                              <img
                                src={lesson.videoThumbnailUrl}
                                alt={lesson.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Play className="w-12 h-12 text-white/20" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                                <Play className="w-7 h-7 text-gray-900 ml-0.5" />
                              </div>
                            </div>
                            {lesson.videoDurationSec && (
                              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                                {formatDuration(lesson.videoDurationSec)}
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1 line-clamp-2">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] text-white/40">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.durationMin} min</span>
                              <span className="text-white/20">·</span>
                              <span>{group!.icon} {group!.label}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
