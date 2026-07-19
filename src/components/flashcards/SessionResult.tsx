"use client";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, RotateCcw, Home, Star } from "lucide-react";

interface Props {
  score: number;
  total: number;
  mode: string;
  onRetry: () => void;
  onHome: () => void;
}

function getGrade(percent: number) {
  if (percent >= 90) return { label: "Ajoyib!", color: "text-yellow-500", emoji: "🏆" };
  if (percent >= 70) return { label: "Yaxshi!", color: "text-green-500", emoji: "🌟" };
  if (percent >= 50) return { label: "Yaxshilash mumkin", color: "text-blue-500", emoji: "💪" };
  return { label: "Ko'proq mashq qiling", color: "text-gray-500", emoji: "📚" };
}

export default function SessionResult({ score, total, mode, onRetry, onHome }: Props) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const grade = getGrade(percent);
  const showConfetti = percent >= 70;

  return (
    <motion.div
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"][i % 4],
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
          {grade.emoji}
        </motion.div>

        <h2 className={`text-2xl font-bold ${grade.color} mb-2`}>{grade.label}</h2>

        <div className="flex items-center justify-center gap-4 my-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-500">To'g'ri</div>
          </div>
          <div className="text-gray-300 text-2xl font-light">/</div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-500">Jami</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            className="h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
          />
        </div>

        <div className="flex items-center justify-center gap-1 text-sm text-amber-600 mb-6">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>
            {total > 0
              ? `${score}/${total} — ${percent}% (${mode === "quiz" ? "Quiz" : mode === "writing" ? "Yozish" : mode === "speed" ? "Tezkor" : "Review"})`
              : "Mashq tugadi"}
          </span>
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
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors btn-macos"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
