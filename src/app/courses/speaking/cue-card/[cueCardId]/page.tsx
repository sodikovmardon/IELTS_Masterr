"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Mic,
  Timer,
  Volume2,
  Loader2,
  Award,
  BarChart3,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import VoiceRecorder from "@/components/VoiceRecorder";

interface CueCardData {
  id: string;
  title: string;
  cuePoints: string;
  topicGroup: { name: string; icon: string };
}

interface EvaluationResult {
  fluencyCoherence: { score: number; feedback: string };
  lexicalResource: { score: number; feedback: string };
  grammaticalRange: { score: number; feedback: string };
  pronunciation: { score: number; feedback: string };
  overallBand: number;
  generalFeedback: string;
  wordCount: number;
}

const CRITERIA_LABELS: Record<string, string> = {
  fluencyCoherence: "Fluency & Coherence",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range",
  pronunciation: "Pronunciation",
};

function useTimer(initialSeconds: number, running: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  useEffect(() => { setSecondsLeft(initialSeconds); }, [initialSeconds]);
  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);
  const totalSeconds = initialSeconds;
  return {
    minutes: Math.floor(secondsLeft / 60),
    seconds: secondsLeft % 60,
    secondsLeft,
    isLow: secondsLeft > 0 && secondsLeft <= totalSeconds * 0.2,
    formatted: `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`,
    progress: totalSeconds > 0 ? secondsLeft / totalSeconds : 0,
  };
}

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const levels = [2, 4, 6, 8, 9];
  const criteria = Object.keys(scores);
  const angleStep = (2 * Math.PI) / criteria.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 9) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const gridPolygons = levels.map((level) => ({
    level,
    points: criteria.map((_, i) => getPoint(i, level)).map((p) => `${p.x},${p.y}`).join(" "),
  }));

  const dataPoints = criteria.map((_, i) => getPoint(i, scores[criteria[i]]));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labelPositions = criteria.map((_, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = radius + 22;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), label: CRITERIA_LABELS[criteria[i]] || criteria[i], score: scores[criteria[i]] };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size + 10}`} className="w-full max-w-[220px] mx-auto">
      {gridPolygons.map(({ level, points }) => (
        <polygon key={level} points={points} fill="none" stroke={level === 9 ? "#818cf8" : "#e5e7eb"} strokeWidth={1} opacity={level === 9 ? 0.3 : 1} />
      ))}
      <polygon points={dataPolygon} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth={2} />
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#6366f1" />)}
      {labelPositions.map(({ x, y, label, score }) => (
        <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] fill-gray-500 font-medium">{label}</text>
      ))}
    </svg>
  );
}

export default function CueCardPracticePage() {
  const { cueCardId } = useParams<{ cueCardId: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [card, setCard] = useState<CueCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<"prep" | "speak" | "done" | "feedback">("prep");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const prepTimer = useTimer(60, stage === "prep");
  const speakTimer = useTimer(120, stage === "speak");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(`/api/speaking/cue-cards`)
      .then((r) => r.json())
      .then((res) => {
        if (res.cueCards) {
          const found = res.cueCards.find((c: CueCardData) => c.id === cueCardId);
          if (found) setCard(found);
        }
      })
      .finally(() => setLoading(false));
  }, [cueCardId]);

  useEffect(() => {
    if (stage === "prep" && prepTimer.secondsLeft === 0 && prepTimer.secondsLeft !== undefined) {
      setStage("speak");
    }
  }, [stage, prepTimer.secondsLeft]);

  useEffect(() => {
    if (stage === "speak" && speakTimer.secondsLeft === 0 && speakTimer.secondsLeft !== undefined) {
      setStage("done");
    }
  }, [stage, speakTimer.secondsLeft]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    window.speechSynthesis?.cancel();
    setAudioPlaying(false);
  }, []);

  const speakText = useCallback((text: string) => {
    if (!text) return;
    stopAudio();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.onend = () => setAudioPlaying(false);
      utterance.onerror = () => setAudioPlaying(false);
      setAudioPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  }, [stopAudio]);

  const cuePoints: string[] = useMemo(() => {
    if (!card?.cuePoints) return [];
    try { return JSON.parse(card.cuePoints); } catch { return []; }
  }, [card]);

  const handleEvaluationComplete = useCallback((data: EvaluationResult) => {
    setEvaluation(data);
    setStage("feedback");
  }, []);

  const criteriaScores = useMemo((): Record<string, number> => {
    if (!evaluation) return { fluencyCoherence: 0, lexicalResource: 0, grammaticalRange: 0, pronunciation: 0 };
    return {
      fluencyCoherence: evaluation.fluencyCoherence.score,
      lexicalResource: evaluation.lexicalResource.score,
      grammaticalRange: evaluation.grammaticalRange.score,
      pronunciation: evaluation.pronunciation.score,
    };
  }, [evaluation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0A2E] via-[#1A1040] to-[#0D0824] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0A2E] via-[#1A1040] to-[#0D0824] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-500 mb-3" />
          <h1 className="text-xl font-bold text-white mb-2">Cue Card topilmadi</h1>
          <Link href="/courses/speaking" className="text-indigo-400 text-sm hover:underline">Speaking sahifasiga qaytish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0A2E] via-[#1A1040] to-[#0D0824]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/70">
              {card.topicGroup?.icon} {card.topicGroup?.name || "Speaking"}
            </div>
            <div className="text-[10px] text-white/40">Cue Card Practice</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait">
          {stage === "prep" && (
            <motion.div key="prep" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center pt-6 pb-8">
                <div className="text-5xl mb-3">📝</div>
                <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white mb-2">
                  {card.title}
                </h1>
                <p className="text-sm text-white/40">Tayyorgarlik vaqti</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white/80 text-sm">Cue Card nuqtalari</h3>
                  <button
                    onClick={() => { if (audioPlaying) stopAudio(); else speakText(cuePoints.join(". ")); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-medium hover:bg-indigo-500/30 transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    {audioPlaying ? "To'xtatish" : "Tinglash"}
                  </button>
                </div>
                {cuePoints.length > 0 && (
                  <ul className="space-y-2">
                    {cuePoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-indigo-400 font-bold shrink-0">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="text-center mb-6">
                <div className={`text-6xl font-bold font-mono mb-2 ${prepTimer.secondsLeft <= 10 ? "text-amber-400 animate-pulse" : "text-white"}`}>
                  {prepTimer.formatted}
                </div>
                <p className="text-xs text-white/40">Tayyorgarlik uchun 1 daqiqa</p>
              </div>

              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(prepTimer.secondsLeft / 60) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <button
                onClick={() => setStage("speak")}
                className="w-full sm:w-auto mx-auto block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg"
              >
                Gapirishni boshlash
              </button>
            </motion.div>
          )}

          {stage === "speak" && (
            <motion.div key="speak" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center pt-6 pb-8">
                <div className="text-5xl mb-3">🎤</div>
                <h1 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white mb-1">
                  Gapirish vaqti
                </h1>
                <p className="text-xs text-white/40">Berilgan mavzuda 2 daqiqa davomida gapiring</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-white/40 font-medium">{card.title}</span>
                  <button
                    onClick={() => { if (audioPlaying) stopAudio(); else speakText(cuePoints.join(". ")); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-medium hover:bg-indigo-500/30 transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    {audioPlaying ? "To'xtatish" : "Eslatma"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cuePoints.map((p, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{p}</span>
                  ))}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className={`text-6xl font-bold font-mono mb-2 ${speakTimer.isLow ? "text-red-400 animate-pulse" : "text-white"}`}>
                  {speakTimer.formatted}
                </div>
                <p className="text-xs text-white/40">Gapirish uchun 2 daqiqa</p>
              </div>

              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-8">
                <motion.div
                  className={`h-full rounded-full ${speakTimer.isLow ? "bg-red-500" : "bg-green-500"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(speakTimer.secondsLeft / 120) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mb-6">
                <VoiceRecorder
                  lessonId={`cue-card-${cueCardId}`}
                  questions={JSON.stringify(cuePoints.map((p) => ({ question: p, explanation: "" })))}
                  title={card?.title}
                  onComplete={handleEvaluationComplete}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStage("prep")}
                  className="px-6 py-3 border border-white/20 text-white/60 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm"
                >
                  Orqaga
                </button>
                <button
                  onClick={() => setStage("done")}
                  className="px-6 py-3 border border-white/20 text-white/60 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm"
                >
                  Tayyor
                </button>
              </div>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center pt-10 pb-8">
                <div className="text-5xl mb-3">⏰</div>
                <h2 className="font-['Playfair_Display',serif] text-2xl font-bold text-white mb-2">Vaqt tugadi!</h2>
                <p className="text-sm text-white/40 mb-6">Vaqt tugadi. Yozib ulgurgan bo'lsangiz, natijani ko'rishingiz mumkin.</p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setStage("speak")}
                    className="px-6 py-3 border border-white/20 text-white/60 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm"
                  >
                    Ovoz yozishga qaytish
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "feedback" && evaluation && (
            <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-8 pt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-1">Natijalar</h2>
                <div className="text-5xl font-extrabold text-indigo-400 mb-1">{evaluation.overallBand.toFixed(1)}</div>
                <p className="text-white/40 text-sm">Umumiy ball · {evaluation.wordCount} so'z</p>
                <div className="w-full max-w-xs mx-auto mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(evaluation.overallBand / 9) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-semibold text-white/80 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> IELTS Criteria
                  </h3>
                  <RadarChart scores={criteriaScores} />
                </div>
                <div className="space-y-3">
                  {[
                    { key: "fluencyCoherence", label: "Fluency & Coherence", data: evaluation.fluencyCoherence },
                    { key: "lexicalResource", label: "Lexical Resource", data: evaluation.lexicalResource },
                    { key: "grammaticalRange", label: "Grammatical Range", data: evaluation.grammaticalRange },
                    { key: "pronunciation", label: "Pronunciation", data: evaluation.pronunciation },
                  ].map(({ key, label, data }) => (
                    <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white/70">{label}</span>
                        <span className="text-lg font-bold text-indigo-400">{data.score.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed">{data.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold text-white/80">Umumiy fikr</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{evaluation.generalFeedback}</p>
              </div>

              {cuePoints.length > 0 && (
                <div className="mb-8">
                  <button
                    onClick={() => setShowModelAnswer(!showModelAnswer)}
                    className="w-full flex items-center justify-between px-5 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors"
                  >
                    <span className="font-medium text-white/80 flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4" />
                      Cue Card nuqtalarini ko'rish
                    </span>
                    {showModelAnswer ? <EyeOff className="w-4 h-4 text-white/40" /> : <Eye className="w-4 h-4 text-white/40" />}
                  </button>
                  <AnimatePresence>
                    {showModelAnswer && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-b-xl p-5 mt-px">
                          <h3 className="font-semibold text-indigo-400 text-sm mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> {card.title}
                          </h3>
                          <ul className="space-y-1.5">
                            {cuePoints.map((p, i) => (
                              <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                <span className="text-indigo-400 shrink-0">•</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setStage("prep"); setEvaluation(null); setShowModelAnswer(false); }}
                  className="flex-1 border border-white/20 text-white/60 px-6 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Qayta urinish
                </button>
                <button
                  onClick={() => router.back()}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-600 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Cue Cardlarga qaytish <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
