"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Mic, Clock } from "lucide-react";

interface TopicGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: string;
  order: number;
  _count: { cueCards: number };
}

export default function SpeakingPage() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState<TopicGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [infoExpanded, setInfoExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/speaking/groups")
      .then((r) => r.json())
      .then((res) => { if (res.groups) setGroups(res.groups); })
      .finally(() => setLoading(false));
  }, []);

  const totalCards = groups.filter(g => g.status === "ready").reduce((a, g) => a + g._count.cueCards, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0A2E] via-[#1A1040] to-[#0D0824]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            IM
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/70">IELTS</div>
            <div className="text-[10px] text-white/40">Speaking Mastery</div>
          </div>
        </div>
        <Link
          href="/courses"
          className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Bosh sahifa
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-12 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-semibold tracking-widest mb-6">
            ✦ CUE CARD HAMROHI ✦
          </div>

          <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Ikki daqiqa davomida{" "}
            <span className="text-indigo-400 italic">istalgan</span>
            <br />
            mavzuda gapiring.
          </h1>

          <p className="text-sm sm:text-base text-white/40 max-w-xl mx-auto leading-relaxed">
            IELTS Speaking Part 2 uchun 48 ta cue card. Har bir mavzu bo'yicha tayyorgarlik,
            recording va AI asosida baho oling.
          </p>
        </motion.div>
      </div>

      {/* Info Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="relative bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shrink-0 shadow-lg">
                🎤
              </div>
              <div>
                <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-white mb-1">
                  Speaking Part 2 haqida
                </h3>
                <p className="text-sm text-white/60 max-w-xl">
                  IELTS Speaking Part 2 — sizga cue card beriladi va 1 daqiqa tayyorgarlikdan so'ng 2 daqiqa davomida gapirishingiz kerak.
                </p>
                <AnimatePresence>
                  {infoExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-2 text-sm text-white/50 border-t border-white/10 pt-4">
                        <p>• Tayyorgarlik vaqti: <strong className="text-white/80">1 daqiqa</strong></p>
                        <p>• Javob vaqti: <strong className="text-white/80">2 daqiqa</strong></p>
                        <p>• Examiner sizni to'xtatganda ham gapirishni davom ettira olasiz</p>
                        <p>• Cue cardda 3-4 ta nuqta bor — ularning barchasiga javob berish shart emas</p>
                        <p>• Baholash mezonlari: Fluency & Coherence, Lexical Resource, <br/>Grammatical Range, Pronunciation</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <button
              onClick={() => setInfoExpanded(!infoExpanded)}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all shrink-0"
            >
              {infoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Topic Groups */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Playfair_Display',serif] text-2xl font-semibold text-white">
            8 ta Mavzu Guruhi
          </h2>
          <span className="text-xs text-white/40">
            {totalCards} CUE CARD
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((group, i) => {
              const isReady = group.status === "ready";
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  {isReady ? (
                    <Link href={`/courses/speaking/topics/${group.id}`}>
                      <div className="relative group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 cursor-pointer h-full">
                        <div className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          TAYYOR
                        </div>
                        <div className="text-3xl mb-3">{group.icon}</div>
                        <h3 className="font-semibold text-white text-sm mb-1">{group.name}</h3>
                        <p className="text-xs text-white/40 mb-3">{group.description}</p>
                        <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-medium">
                          <Mic className="w-3 h-3" />
                          {group._count.cueCards} cue card
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative opacity-40 cursor-not-allowed bg-white/5 border border-white/5 rounded-xl p-5 h-full">
                      <div className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-500 border border-gray-500/20">
                        TEZ ORADA
                      </div>
                      <div className="text-3xl mb-3 opacity-50">{group.icon}</div>
                      <h3 className="font-semibold text-white/50 text-sm mb-1">{group.name}</h3>
                      <p className="text-xs text-white/30 mb-3">{group.description}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
