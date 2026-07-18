"use client";
import { motion } from "framer-motion";
import { Share2, RotateCcw, Home, Trophy, Zap, Clock } from "lucide-react";

interface ResultScreenProps {
  score: number;
  maxScore: number;
  timeSpentSec: number;
  comboCount: number;
  isHighScore: boolean;
  onRetry: () => void;
  onHome: () => void;
}

function getGrade(percent: number) {
  if (percent >= 90) return { label: "Ajoyib! ✨", color: "text-yellow-500", emoji: "🏆" };
  if (percent >= 70) return { label: "Yaxshi! 👍", color: "text-green-500", emoji: "🌟" };
  if (percent >= 50) return { label: "Yaxshilash mumkin", color: "text-blue-500", emoji: "💪" };
  return { label: "Ko'proq mashq qiling", color: "text-gray-500", emoji: "📚" };
}

export default function ResultScreen({
  score, maxScore, timeSpentSec, comboCount, isHighScore, onRetry, onHome,
}: ResultScreenProps) {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const grade = getGrade(percent);
  const showConfetti = percent >= 70;

  const handleShare = async () => {
    const text = `IELTS Practice: ${score}/${maxScore} (${percent}%)\nKetma-ket: ${comboCount} ta to'g'ri! ⏱️ ${timeSpentSec}s\nIELTS Mastery bilan ingliz tilini o'rgan!`;
    try {
      await navigator.share({ title: "IELTS Practice", text });
    } catch {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][i % 6],
                left: `${Math.random() * 100}%`,
                top: "-10px",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 0.5 }}
            />
          ))}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {isHighScore ? "🏆" : grade.emoji}
        </motion.div>

        <h2 className={`text-2xl font-bold ${grade.color} mb-2`}>{grade.label}</h2>

        {isHighScore && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-yellow-600 bg-yellow-50 rounded-full px-3 py-1 inline-block mb-4"
          >
            ✨ Yangi rekord!
          </motion.div>
        )}

        <div className="relative w-32 h-32 mx-auto my-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none" stroke="#4F46E5" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - percent / 100) }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">{score}</div>
              <div className="text-xs text-gray-500">/{maxScore}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 rounded-xl p-3">
            <Clock className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{timeSpentSec}s</div>
            <div className="text-xs text-gray-500">Vaqt</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3">
            <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{comboCount}x</div>
            <div className="text-xs text-gray-500">Ketma-ket</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors btn-macos"
          >
            <RotateCcw className="w-4 h-4" /> Qayta urinish
          </button>
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors btn-macos"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors btn-macos"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
