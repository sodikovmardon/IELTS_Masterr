"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mic, ChevronRight } from "lucide-react";

interface CueCard {
  id: string;
  title: string;
  cuePoints: string;
  topicGroup: { name: string; icon: string };
}

export default function TopicCardsPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const [cards, setCards] = useState<CueCard[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/speaking/cue-cards?topicGroupId=${topicId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.cueCards) {
          setCards(res.cueCards);
          if (res.cueCards[0]) {
            setGroupName(res.cueCards[0].topicGroup.name);
            setGroupIcon(res.cueCards[0].topicGroup.icon);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [topicId]);

  const handleStartCard = (cardId: string) => {
    router.push(`/courses/speaking/cue-card/${cardId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0A2E] via-[#1A1040] to-[#0D0824]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/courses/speaking"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/70">SPEAKING</div>
            <div className="text-[10px] text-white/40">Cue Cards</div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-4">{groupIcon}</div>
          <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white mb-2">
            {groupName}
          </h1>
          <p className="text-sm text-white/40">
            {cards.length} ta cue card. Birini tanlang va speaking mashqini boshlang.
          </p>
        </motion.div>
      </div>

      {/* Cue Cards List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">Hozircha cue card yo'q</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card, i) => {
              const points: string[] = (() => {
                try { return JSON.parse(card.cuePoints); } catch { return []; }
              })();
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => handleStartCard(card.id)}
                    className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {points.map((p, pi) => (
                            <span key={pi} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-all shrink-0 mt-1">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
