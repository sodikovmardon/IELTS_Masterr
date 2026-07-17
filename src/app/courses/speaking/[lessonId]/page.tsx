"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Mic,
  CheckCircle2,
  Trophy,
  Bookmark,
  BookMarked,
  ChevronRight,
  Loader2,
  Play,
  Sparkles,
  AlertCircle,
  Award,
  ChevronLeft,
  GraduationCap,
  History,
  Eye,
  EyeOff,
  Send,
  MessageSquare,
  Timer,
  BarChart3,
  Volume2,
  FileText,
} from "lucide-react";
import VoiceRecorder from "@/components/VoiceRecorder";
import VideoPlayer from "@/components/VideoPlayer";
import { SmartContent, InfoBox, ContentCard, SectionHeading } from "@/components/lesson";

interface LessonProgress {
  completed: boolean;
  score: number | null;
  maxScore: number | null;
  bookmarked: boolean;
  answers: string;
  attempts: number;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  isPremium: boolean;
  difficulty: string;
  order: number;
  prerequisiteLessonId: string | null;
  theoryContent: string;
  passageText: string | null;
  tipsAndTricks: string | null;
  commonMistakes: string | null;
  questions: string;
  videoUrl: string | null;
  videoDurationSec: number | null;
  videoThumbnailUrl: string | null;
  transcriptText: string | null;
  progresses: LessonProgress[];
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

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-green-100 text-green-700" },
  Medium: { label: "O'rta", class: "bg-yellow-100 text-yellow-700" },
  Hard: { label: "Qiyin", class: "bg-red-100 text-red-700" },
};

const CRITERIA_LABELS: Record<string, string> = {
  fluencyCoherence: "Fluency & Coherence",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range",
  pronunciation: "Pronunciation",
};

function useTimer(initialSeconds: number, running: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const totalSeconds = initialSeconds;
  const isLow = secondsLeft > 0 && secondsLeft <= totalSeconds * 0.2;

  return {
    minutes,
    seconds,
    secondsLeft,
    isLow,
    formatted: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
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

  const getPoint = (index: number, value: number, offset = 0) => {
    const angle = angleStep * index - Math.PI / 2 + offset;
    const r = (value / 9) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridPolygons = levels.map((level) => {
    const points = criteria
      .map((_, i) => getPoint(i, level))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
    return { level, points };
  });

  const dataPoints = criteria.map((_, i) => getPoint(i, scores[criteria[i]]));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labelPositions = criteria.map((_, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = radius + 22;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: CRITERIA_LABELS[criteria[i]] || criteria[i],
      score: scores[criteria[i]],
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size + 10}`} className="w-full max-w-[220px] mx-auto">
      {gridPolygons.map(({ level, points }) => (
        <polygon
          key={level}
          points={points}
          fill="none"
          stroke={level === 9 ? "#818cf8" : "#e5e7eb"}
          strokeWidth={level === 9 ? 1 : 1}
          opacity={level === 9 ? 0.3 : 1}
        />
      ))}
      <polygon
        points={dataPolygon}
        fill="rgba(99, 102, 241, 0.2)"
        stroke="#6366f1"
        strokeWidth={2}
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#6366f1" />
      ))}
      {labelPositions.map(({ x, y, label, score }) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[9px] fill-gray-500 font-medium"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function SpeakingLessonPage() {
  const params = useParams();
  const { data: session } = useSession();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<"theory" | "practice" | "feedback">("theory");
  const [responseText, setResponseText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showHistoryHint, setShowHistoryHint] = useState(false);

  const [prepCountdown, setPrepCountdown] = useState(false);
  const [speakCountdown, setSpeakCountdown] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasMic, setHasMic] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const prepTimer = useTimer(60, prepCountdown);
  const speakTimer = useTimer(120, speakCountdown);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
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
      utterance.pitch = 1.0;
      utterance.onend = () => setAudioPlaying(false);
      utterance.onerror = () => setAudioPlaying(false);
      setAudioPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  }, [stopAudio]);

  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const audioInputs = devices.filter((d) => d.kind === "audioinput");
        setHasMic(audioInputs.length > 0);
      }).catch(() => setHasMic(false));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams({ category: "speaking" });
    if (session?.user?.id) params.set("userId", session.user.id);
    fetch(`/api/lessons?${params}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lessons) {
          setAllLessons(res.lessons);
          const found = res.lessons.find(
            (l: Lesson) => l.id === lessonId
          );
          if (found) {
            setLesson(found);
            setBookmarked(found.progresses?.[0]?.bookmarked || false);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId, session]);

  useEffect(() => {
    if (block === "theory") {
      setResponseText("");
      setEvaluation(null);
      setShowModelAnswer(false);
      setCurrentQuestionIndex(0);
      setPrepCountdown(false);
      setSpeakCountdown(false);
    }
  }, [block]);

  const questions: { question: string; explanation: string }[] = useMemo(() => {
    if (!lesson?.questions) return [];
    try {
      return JSON.parse(lesson.questions);
    } catch {
      return [];
    }
  }, [lesson]);

  const speakingQuestions: string[] = useMemo(() => {
    const text = lesson?.passageText || "";
    const qMatch = text.match(/(?:Questions|Discussion questions):\s*(\[[\s\S]*?\])/i);
    if (!qMatch) return questions.map(q => q.question).filter(Boolean);
    try {
      return JSON.parse(qMatch[1]);
    } catch {
      return questions.map(q => q.question).filter(Boolean);
    }
  }, [lesson, questions]);

  const isPart2 = lesson?.title?.toLowerCase().includes("part 2") || lesson?.title?.toLowerCase().includes("cue card");
  const cueCard = isPart2 ? lesson?.passageText : "";

  const nextLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return null;
    if (lesson.prerequisiteLessonId) {
      return allLessons.find((l) => l.id === lesson.prerequisiteLessonId) || null;
    }
    return allLessons.find((l) => l.order === lesson.order + 1) || null;
  }, [lesson, allLessons]);

  const isLastLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return false;
    return lesson.order === Math.max(...allLessons.map((l) => l.order));
  }, [lesson, allLessons]);

  const allCompleted = useMemo(() => {
    if (allLessons.length === 0) return false;
    return allLessons.every((l) => l.progresses?.[0]?.completed);
  }, [allLessons]);

  const wordCount = useMemo(() => {
    return responseText.split(/\s+/).filter(Boolean).length;
  }, [responseText]);

  const handleBookmark = async () => {
    if (!session?.user?.id || !lesson) return;
    try {
      const res = await fetch("/api/lessons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          userId: session.user.id,
          bookmarked: !bookmarked,
        }),
      });
      if (res.ok) setBookmarked(!bookmarked);
    } catch {}
  };

  const handleStartPractice = () => {
    setBlock("practice");
  };

  useEffect(() => {
    if (block !== "practice" || speakingQuestions.length === 0) return;
    const q = speakingQuestions[currentQuestionIndex];
    if (!q) return;
    const t = setTimeout(() => speakText(q), 400);
    return () => clearTimeout(t);
  }, [currentQuestionIndex, block, speakingQuestions, speakText]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleAudioSave = useCallback((_audioBlob: Blob, _duration: number) => {
  }, []);

  const handleTranscription = useCallback((text: string) => {
    setResponseText((prev) => prev + text + " ");
  }, []);

  const handleSubmit = async () => {
    if (!responseText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/speaking/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: responseText,
          lessonId,
          questions: JSON.stringify(questions),
        }),
      });
      const data = await res.json();
      setEvaluation(data);
      setBlock("feedback");

      if (session?.user?.id) {
        try {
          await fetch("/api/lessons", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId: lesson!.id,
              userId: session.user.id,
              score: Math.round(data.overallBand * 2),
              maxScore: 18,
              completed: true,
              answers: JSON.stringify({ text: responseText, evaluation: data }),
              attempts: (lesson!.progresses?.[0]?.attempts || 0) + 1,
            }),
          });
        } catch {}
      }
    } catch {
      setEvaluation(null);
    }
    setSubmitting(false);
  };

  const criteriaScores = useMemo((): Record<string, number> => {
    if (!evaluation) return { fluencyCoherence: 0, lexicalResource: 0, grammaticalRange: 0, pronunciation: 0 };
    return {
      fluencyCoherence: evaluation.fluencyCoherence.score,
      lexicalResource: evaluation.lexicalResource.score,
      grammaticalRange: evaluation.grammaticalRange.score,
      pronunciation: evaluation.pronunciation.score,
    };
  }, [evaluation]);

  const modelAnswer = questions[currentQuestionIndex]?.explanation || questions[0]?.explanation || "";

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dars topilmadi</h1>
        <p className="text-gray-500 mb-4">Bu dars mavjud emas yoki o'chirilgan.</p>
        <Link
          href="/courses/speaking"
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Speaking kursiga qaytish
        </Link>
      </div>
    );
  }

  const diff = DIFFICULTY_CONFIG[lesson.difficulty] || {
    label: lesson.difficulty,
    class: "bg-gray-100 text-gray-700",
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/courses/speaking"
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Speaking
        </Link>
        <div className="flex items-center gap-3">
          {block === "feedback" && (
            <Link
              href="/courses/speaking-history"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
              onMouseEnter={() => setShowHistoryHint(true)}
              onMouseLeave={() => setShowHistoryHint(false)}
            >
              <History className="w-4 h-4" />
              Tarix
            </Link>
          )}
          {session && (
            <button
              onClick={handleBookmark}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 transition-colors"
            >
              {bookmarked ? (
                <BookMarked className="w-4 h-4 text-amber-500" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              {bookmarked ? "Saqlangan" : "Saqlash"}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {block === "theory" && (
          <motion.div
            key="theory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  {lesson.durationMin} min
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${diff.class}`}>
                  {diff.label}
                </span>
                {lesson.isPremium ? (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                    Bepul
                  </span>
                )}
              </div>
            </div>

            {lesson.theoryContent && (
              <ContentCard>
                <SectionHeading>Nazariya</SectionHeading>
                {lesson.videoUrl && (
                  <VideoPlayer
                    videoUrl={lesson.videoUrl}
                    lessonId={lesson.id}
                    transcriptText={lesson.transcriptText}
                    title={lesson.title}
                  />
                )}
                <SmartContent text={lesson.theoryContent} />
              </ContentCard>
            )}

            {cueCard && (
              <div className="glass-card bg-indigo-50/90 backdrop-blur-sm border border-indigo-200 rounded-2xl shadow-macos p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-800">
                    {isPart2 ? "Cue Card / Speaking Task" : "Speaking savol"}
                  </h3>
                  <button
                    onClick={() => {
                      if (audioPlaying) {
                        stopAudio();
                      } else {
                        speakText(cueCard);
                      }
                    }}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-600/20 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {audioPlaying ? "To'xtatish" : "Tinglash"}
                  </button>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {cueCard}
                </div>
              </div>
            )}

            {lesson.tipsAndTricks && (
              <div className="mb-6">
                <InfoBox type="tip" title="Tips & Tricks">
                  <SmartContent text={lesson.tipsAndTricks} compact />
                </InfoBox>
              </div>
            )}

            {lesson.commonMistakes && (
              <div className="mb-8">
                <InfoBox type="mistake" title="Keng tarqalgan xatolar">
                  <SmartContent text={lesson.commonMistakes} compact />
                </InfoBox>
              </div>
            )}

            <button
              onClick={handleStartPractice}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 btn-macos"
            >
              <Play className="w-5 h-5" /> Amaliyotni boshlash
            </button>
          </motion.div>
        )}

        {block === "practice" && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Amaliyot</h2>
              <div className="flex items-center gap-3">
                {(prepCountdown || speakCountdown) && (
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
                      speakTimer.isLow
                        ? "bg-red-50 text-red-600 animate-pulse"
                        : prepCountdown
                          ? "bg-amber-50 text-amber-600"
                          : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Timer className="w-4 h-4" />
                    {prepCountdown ? prepTimer.formatted : speakTimer.formatted}
                  </div>
                )}
              </div>
            </div>

            {isPart2 && (
              <div className="glass-card bg-indigo-50/90 backdrop-blur-sm border border-indigo-200 rounded-2xl shadow-macos p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-800">Cue Card</h3>
                    <button
                      onClick={() => {
                        if (audioPlaying) {
                          stopAudio();
                        } else {
                          speakText(cueCard);
                        }
                      }}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-600/20 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {audioPlaying ? "To'xtatish" : "Tinglash"}
                    </button>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {cueCard}
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setPrepCountdown(true);
                      setSpeakCountdown(false);
                    }}
                    disabled={prepCountdown}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-amber-600 transition-colors text-sm disabled:opacity-50"
                  >
                    <Timer className="w-4 h-4" />
                    Tayyorgarlik (1 daqiqa)
                  </button>
                  <button
                    onClick={() => {
                      setPrepCountdown(false);
                      setSpeakCountdown(true);
                    }}
                    disabled={speakCountdown}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors text-sm disabled:opacity-50"
                  >
                    <Volume2 className="w-4 h-4" />
                    Gapirish (2 daqiqa)
                  </button>
                </div>
              </div>
            )}

            {!isPart2 && speakingQuestions.length > 0 && (
              <div className="mb-6">
                <div className="glass-card bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-macos p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 font-medium">
                      Savol {currentQuestionIndex + 1} / {speakingQuestions.length}
                    </span>
                    <button
                      onClick={() => {
                        if (audioPlaying) {
                          stopAudio();
                        } else {
                          speakText(speakingQuestions[currentQuestionIndex]);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {audioPlaying ? "To'xtatish" : "Tinglash"}
                    </button>
                  </div>
                  <p className="text-gray-900 font-medium leading-relaxed">
                    {speakingQuestions[currentQuestionIndex] || ""}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 btn-macos"
                    >
                      Oldingi
                    </button>
                    <button
                      onClick={() => setCurrentQuestionIndex((i) => Math.min(speakingQuestions.length - 1, i + 1))}
                      disabled={currentQuestionIndex === speakingQuestions.length - 1}
                      className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-30 btn-macos"
                    >
                      Keyingi savol
                    </button>
                  </div>
                </div>
              </div>
            )}

            {hasMic ? (
              <div className="mb-6">
                <VoiceRecorder onSave={handleAudioSave} onTranscription={handleTranscription} language="en-US" />
              </div>
            ) : (
              <div className="glass-card bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-2xl shadow-macos p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 mb-1">Mikrofon topilmadi</p>
                    <p className="text-sm text-amber-700">Iltimos, javobingizni matn shaklida yozing.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Javobingizni yozing..."
                className="w-full h-48 p-5 bg-white rounded-xl input-macos border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-y text-gray-800 leading-relaxed text-sm"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">So'zlar:</span>
                <span className="font-bold text-gray-700">{wordCount}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirm("Amaliyotni to'xtatishni xohlaysizmi?")) {
                    setBlock("theory");
                  }
                }}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm btn-macos"
              >
                Orqaga
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !responseText.trim()}
                className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Yuborish
              </button>
            </div>
          </motion.div>
        )}

        {block === "feedback" && evaluation && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Natijalar
              </h2>
              <div className="text-5xl font-extrabold text-primary mb-1">
                {evaluation.overallBand.toFixed(1)}
              </div>
              <p className="text-gray-500 text-sm">
                Umumiy ball &middot; {evaluation.wordCount} so'z
              </p>
              <div className="w-full max-w-xs mx-auto mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(evaluation.overallBand / 9) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
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
                  <div key={key} className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <span className="text-lg font-bold text-primary">{data.score.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{data.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-macos p-5 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-indigo-800">Umumiy fikr</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {evaluation.generalFeedback}
              </p>
            </div>

            {modelAnswer && (
              <div className="mb-8">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="w-full flex items-center justify-between px-5 py-3 glass-card bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-macos hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Model javobni ko'rish
                  </span>
                  {showModelAnswer ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {showModelAnswer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-green-50 border border-green-200 rounded-b-xl p-5 mt-px">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <h3 className="font-semibold text-green-800 text-sm">Model Answer</h3>
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                          {modelAnswer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setBlock("practice");
                  setEvaluation(null);
                  setShowModelAnswer(false);
                }}
                className="flex-1 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 btn-macos"
              >
                <ChevronLeft className="w-4 h-4" /> Qayta yozish
              </button>

              {nextLesson && (
                <Link
                  href={`/courses/speaking/${nextLesson.id}`}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 btn-macos"
                >
                  Keyingi dars <ChevronRight className="w-4 h-4" />
                </Link>
              )}

              {isLastLesson && allCompleted && (
                <Link
                  href="/certificate"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
                >
                  <GraduationCap className="w-5 h-5" /> Sertifikat olish
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
