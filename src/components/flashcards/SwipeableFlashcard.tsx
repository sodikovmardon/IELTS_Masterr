"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { getIconBg } from "@/lib/wordIcons";

interface FlashcardData {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  visualIcon: string;
  category?: string | null;
  masteryStatus?: string;
  nextReviewDate: string;
  repetitionLevel: number;
}

interface Props {
  card: FlashcardData;
  onSwipe: (direction: "left" | "right") => void;
  onFlip: () => void;
  flipped: boolean;
  index: number;
  total: number;
}

const categoryColors: Record<string, string> = {
  Environment: "from-green-400 to-emerald-600",
  Technology: "from-blue-400 to-indigo-600",
  Academic: "from-purple-400 to-violet-600",
  General: "from-amber-400 to-orange-500",
  Vocabulary: "from-pink-400 to-rose-500",
};

export default function SwipeableFlashcard({ card, onSwipe, onFlip, flipped, index, total }: Props) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.3, 0.8, 1, 0.8, 0.3]);

  const bgGradient = categoryColors[card.category || "General"] || categoryColors.General;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(300);
      setTimeout(() => onSwipe("right"), 200);
    } else if (info.offset.x < -100) {
      setExitX(-300);
      setTimeout(() => onSwipe("left"), 200);
    }
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(card.word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-4">
        {index + 1} / {total}
      </div>

      <motion.div
        className="relative w-full max-w-sm cursor-grab active:cursor-grabbing"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="relative w-full aspect-[3/4] cursor-pointer perspective-[1000px]"
          onClick={onFlip}
        >
          <motion.div
            className="relative w-full h-full preserve-3d transition-all duration-500"
            animate={{ rotateY: flipped ? 180 : 0 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${bgGradient} p-8 flex flex-col items-center justify-center text-white shadow-xl backface-hidden`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div
                className={`w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 text-6xl shadow-lg`}
              >
                {card.visualIcon}
              </div>
              <h3 className="text-3xl font-bold capitalize mb-2 text-center">{card.word}</h3>
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(); }}
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <p className="text-xs text-white/60 mt-4">Kartani bosing</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-3xl bg-white p-8 flex flex-col items-center justify-center shadow-xl backface-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div
                className={`w-20 h-20 rounded-2xl ${getIconBg(card.visualIcon)} flex items-center justify-center mb-4 text-4xl shadow-sm`}
              >
                {card.visualIcon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 capitalize mb-3">{card.word}</h3>
              {card.meaning && (
                <p className="text-gray-700 text-center text-lg mb-2">{card.meaning}</p>
              )}
              {card.translation && (
                <p className="text-gray-500 text-sm text-center mb-4">{card.translation}</p>
              )}
              {card.category && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {card.category}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Swipe Hint */}
      <div className="flex items-center justify-between w-full max-w-sm mt-6 px-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <XCircle className="w-5 h-5 text-red-400" />
          Chapga surish
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          O'ngga surish
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>
      </div>
    </div>
  );
}
