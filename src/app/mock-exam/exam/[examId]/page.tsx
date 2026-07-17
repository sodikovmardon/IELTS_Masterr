"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  listeningScoreToBand, readingScoreToBand, roundIELTSBand, estimateWritingBand,
} from "@/lib/ielts";
import { getMockExamData } from "@/data/mock-exam-data";
import {
  ArrowLeft, Clock, Headphones, BookOpen, PenTool, Mic,
  ChevronRight, ChevronLeft, FileText,
} from "lucide-react";

type ExamPhase = "listening" | "reading" | "writing" | "done";
type ListeningPhase = "preview" | "answering" | "review" | "transition";
type ReadingPhase = "answering" | "transition";
type WritingPhase = "answering" | "transition";

const examData = getMockExamData();
const TOTAL_LISTENING_SEC = examData.listening.totalTimeMin * 60; // 1800
const REVIEW_SEC = examData.listening.reviewTimeMin * 60; // 120
const TOTAL_READING_SEC = examData.reading.totalTimeMin * 60; // 3600
const TOTAL_WRITING_SEC = examData.writing.totalTimeMin * 60; // 3600

export default function ExamFlowPage() {
  const { examId } = useParams<{ examId: string }>();
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() { router.push("/login"); },
  });

  // Core phase
  const [phase, setPhase] = useState<ExamPhase>("listening");
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(TOTAL_LISTENING_SEC + REVIEW_SEC);
  const [submitting, setSubmitting] = useState(false);

  // Listening state
  const [listeningPhase, setListeningPhase] = useState<ListeningPhase>("preview");
  const [listenSectionIdx, setListenSectionIdx] = useState(0);
  const [previewCountdown, setPreviewCountdown] = useState(30);
  const [transitionMsg, setTransitionMsg] = useState("");
  const [transitionVisible, setTransitionVisible] = useState(false);

  // Answers
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, number>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, number>>({});
  const [writingTexts, setWritingTexts] = useState(["", ""]);

  // Reading state
  const [readingSectionIdx, setReadingSectionIdx] = useState(0);

  // Refs for timers
  const phaseTimerRef = useRef<any>(null);
  const previewTimerRef = useRef<any>(null);

  const sections = examData.listening.sections;
  const currentListenSection = sections[listenSectionIdx] || sections[0];
  const passages = examData.reading.passages;
  const currentPassage = passages[readingSectionIdx] || passages[0];

  // ─── PHASE TIMER ───
  useEffect(() => {
    if (phase === "done") return;
    phaseTimerRef.current = setInterval(() => {
      setPhaseTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(phaseTimerRef.current);
          handlePhaseEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(phaseTimerRef.current);
  }, [phase]);

  // ─── LISTENING PREVIEW COUNTDOWN ───
  useEffect(() => {
    if (phase !== "listening" || listeningPhase !== "preview") {
      clearInterval(previewTimerRef.current);
      return;
    }
    previewTimerRef.current = setInterval(() => {
      setPreviewCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(previewTimerRef.current);
          setListeningPhase("answering");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(previewTimerRef.current);
  }, [phase, listeningPhase]);

  // ─── HANDLE PHASE END (timeout) ───
  const handlePhaseEnd = useCallback(() => {
    if (phase === "listening") {
      setPhase("reading");
      setPhaseTimeLeft(TOTAL_READING_SEC);
      setListeningPhase("answering");
      setTransitionMsg("Reading section boshlanmoqda...");
      setTransitionVisible(true);
      setTimeout(() => setTransitionVisible(false), 3000);
    } else if (phase === "reading") {
      setPhase("writing");
      setPhaseTimeLeft(TOTAL_WRITING_SEC);
      setTransitionMsg("Writing section boshlanmoqda...");
      setTransitionVisible(true);
      setTimeout(() => setTransitionVisible(false), 3000);
    } else if (phase === "writing") {
      handleFinishExam();
    }
  }, [phase]);

  // ─── LISTENING SECTION TRANSITION ───
  const advanceListeningSection = useCallback(() => {
    if (listenSectionIdx < sections.length - 1) {
      setTransitionMsg(`${sections[listenSectionIdx + 1].title} — boshlanmoqda`);
      setTransitionVisible(true);
      setListenSectionIdx((i) => i + 1);
      setTimeout(() => {
        setTransitionVisible(false);
        setListeningPhase("preview");
        setPreviewCountdown(sections[listenSectionIdx + 1]?.previewSeconds || 30);
      }, 4000);
    } else {
      // All sections done → review phase
      setListeningPhase("review");
      setTransitionMsg("Section 4 yakunlandi. Javoblaringizni tekshirish uchun 2 daqiqa.");
      setTransitionVisible(true);
      setTimeout(() => setTransitionVisible(false), 3000);
    }
  }, [listenSectionIdx]);

  // When answering phase is done (simulated by user clicking "Next Section")
  const handleListeningSectionDone = () => {
    advanceListeningSection();
  };

  // ─── READING ───
  const readingTotalQuestions = passages.reduce((a, p) => a + p.questions.length, 0);
  const readingAnswered = Object.keys(readingAnswers).length;

  // ─── WRITING ───
  const wr1Words = useMemo(() => writingTexts[0].split(/\s+/).filter(Boolean).length, [writingTexts[0]]);
  const wr2Words = useMemo(() => writingTexts[1].split(/\s+/).filter(Boolean).length, [writingTexts[1]]);

  // ─── FINISH ───
  const handleFinishExam = async () => {
    if (submitting) return;
    setSubmitting(true);

    // Calculate listening band
    let listenCorrect = 0;
    for (const sec of sections) {
      for (const q of sec.questions) {
        if (listeningAnswers[q.id] === q.correctAnswer) listenCorrect++;
      }
    }
    const lsBand = listeningScoreToBand(listenCorrect);

    // Calculate reading band
    let readCorrect = 0;
    for (const p of passages) {
      for (const q of p.questions) {
        if (readingAnswers[q.id] === q.correctAnswer) readCorrect++;
      }
    }
    const rdBand = readingScoreToBand(readCorrect);

    // Estimate writing band from word count
    // In full version, use AI evaluation; here use heuristic
    const wrBand = estimateWritingBand(wr1Words, wr2Words);

    const bands = [lsBand, rdBand, wrBand];
    const overall = roundIELTSBand(bands.reduce((a, b) => a + b, 0) / bands.length);

    const payload = {
      status: "completed",
      listeningScore: listenCorrect,
      listeningBand: lsBand,
      readingScore: readCorrect,
      readingBand: rdBand,
      writingBand: wrBand,
      writingTask1: writingTexts[0],
      writingTask2: writingTexts[1],
      overallBand: overall,
    };

    try {
      await fetch(`/api/mock-exam/${examId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}

    setPhase("done");
    router.push(`/mock-exam/results/${examId}`);
  };

  // ─── RENDER HELPERS ───
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (!session) return null;

  const phaseLabel = {
    listening: "Listening",
    reading: "Reading",
    writing: "Writing",
    done: "Done",
  };

  const phaseIcon = {
    listening: <Headphones className="w-4 h-4" />,
    reading: <BookOpen className="w-4 h-4" />,
    writing: <PenTool className="w-4 h-4" />,
    done: null,
  };

  const phaseColor = {
    listening: "bg-indigo-500",
    reading: "bg-emerald-500",
    writing: "bg-purple-500",
    done: "bg-gray-500",
  };

  const timeLow = phaseTimeLeft < 300;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── TOP BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${phaseColor[phase]}`}>
              {phaseIcon[phase]} {phaseLabel[phase]}
            </span>
            {phase === "listening" && listeningPhase !== "review" && (
              <span className="text-xs text-gray-500">
                Section {listenSectionIdx + 1}/{sections.length}
              </span>
            )}
            {phase === "reading" && (
              <span className="text-xs text-gray-500">
                Passage {readingSectionIdx + 1}/{passages.length} · {readingAnswered}/{readingTotalQuestions} answered
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-xl font-bold tabular-nums ${timeLow ? "text-red-500 animate-pulse" : "text-gray-900"}`}>
              {phase === "listening" && listeningPhase === "review"
                ? `${formatTime(phaseTimeLeft)}`
                : formatTime(phaseTimeLeft)
              }
            </div>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            className={`h-full transition-all duration-1000 ${timeLow ? "bg-red-500" : phaseColor[phase]}`}
            style={{
              width: phase === "listening"
                ? `${(phaseTimeLeft / (TOTAL_LISTENING_SEC + REVIEW_SEC)) * 100}%`
                : phase === "reading"
                  ? `${(phaseTimeLeft / TOTAL_READING_SEC) * 100}%`
                  : `${(phaseTimeLeft / TOTAL_WRITING_SEC) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="pt-20 pb-8">
        {/* ─── TRANSITION OVERLAY ─── */}
        {transitionVisible && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm mx-4">
              <div className="text-5xl mb-4">
                {phase === "listening" ? "🎧" : phase === "reading" ? "📖" : "✍️"}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{transitionMsg}</h2>
              <p className="text-sm text-gray-500">Iltimos, kuting...</p>
            </div>
          </div>
        )}

        {/* ─── SPEAKING CTA (shown after test is submitted) ─── */}
        {phase === "done" && (
          <div className="max-w-lg mx-auto px-4 text-center py-20">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mock Exam yakunlandi!</h2>
            <p className="text-gray-500 mb-6">Natijalaringiz hisoblanmoqda...</p>
          </div>
        )}

        {/* ═══════════════ LISTENING ═══════════════ */}
        {phase === "listening" && (
          <div className="max-w-4xl mx-auto px-4">
            {/* Preview phase */}
            {listeningPhase === "preview" && (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🔊</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentListenSection.title}
                </h2>
                <p className="text-gray-500 mb-2 text-sm">{currentListenSection.type}</p>
                <p className="text-gray-400 text-sm mb-6">{currentListenSection.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700 font-semibold text-lg">{previewCountdown}s</span>
                  <span className="text-amber-600 text-sm">savollarni ko'rib chiqish vaqti</span>
                </div>
                <div className="mt-6 space-y-3 text-left max-w-xl mx-auto">
                  {currentListenSection.questions.slice(0, 3).map((q) => (
                    <div key={q.id} className="bg-white rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
                      <span className="font-bold text-indigo-600 mr-2">{q.id}.</span>
                      {q.question}
                    </div>
                  ))}
                  {currentListenSection.questions.length > 3 && (
                    <p className="text-xs text-gray-400 text-center">
                      + {currentListenSection.questions.length - 3} ta savol
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Answering phase */}
            {listeningPhase === "answering" && (
              <div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-center gap-2">
                  <span className="text-lg">🔊</span>
                  <p className="text-sm text-amber-700">
                    Audio 1 marta eshittiriladi. (Simulyatsiya: savollarga javob bering)
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Section {currentListenSection.number}: {currentListenSection.title}
                  </h2>
                  <button
                    onClick={handleListeningSectionDone}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                  >
                    {listenSectionIdx < sections.length - 1 ? "Keyingi section →" : "Barcha savollarni yakunlash"}
                  </button>
                </div>

                <div className="space-y-3">
                  {currentListenSection.questions.map((q) => {
                    const selected = listeningAnswers[q.id];
                    return (
                      <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold shrink-0">
                            {q.id}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 mb-2">{q.question}</p>
                            <div className="grid gap-1.5">
                              {q.options.map((opt, oi) => (
                                <button
                                  key={oi}
                                  onClick={() => setListeningAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                                    selected === oi
                                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                                      : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50"
                                  }`}
                                >
                                  <span className="mr-2 text-xs text-gray-400 uppercase">{String.fromCharCode(65 + oi)}.</span>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Review phase */}
            {listeningPhase === "review" && (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">⏰</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Javoblarni tekshirish</h2>
                <p className="text-gray-500 mb-2">
                  Listening bo'limi yakunlandi. Javoblaringizni tekshirish uchun {examData.listening.reviewTimeMin} daqiqa vaqtingiz bor.
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  Vaqt tugagach, Reading bo'limi avtomatik boshlanadi.
                </p>

                <div className="max-w-2xl mx-auto space-y-2">
                  {sections.flatMap((sec) => sec.questions).map((q) => {
                    const selected = listeningAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;
                    return (
                      <div key={q.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm ${
                        selected !== undefined
                          ? isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                          : "bg-white border-gray-200"
                      }`}>
                        <span className="font-bold text-gray-500 w-6 shrink-0">{q.id}</span>
                        <span className={`w-3 h-3 rounded-full shrink-0 ${
                          selected === undefined ? "bg-gray-300"
                          : isCorrect ? "bg-green-500" : "bg-red-500"
                        }`} />
                        <span className="text-gray-700 truncate">{q.question}</span>
                        <span className="ml-auto text-xs text-gray-400 shrink-0">
                          {selected !== undefined ? String.fromCharCode(65 + selected) : "—"}
                          {selected !== undefined && !isCorrect && (
                            <span className="text-green-600 ml-1">({String.fromCharCode(65 + q.correctAnswer)})</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ READING ═══════════════ */}
        {phase === "reading" && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Passage navigation tabs */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto">
              {passages.map((p, i) => (
                <button
                  key={p.number}
                  onClick={() => setReadingSectionIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    readingSectionIdx === i
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
                  }`}
                >
                  Passage {p.number} ({p.difficulty})
                </button>
              ))}
              <div className="text-xs text-gray-400 ml-auto">
                {readingAnswered}/{readingTotalQuestions} answered
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Passage text */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-[calc(100vh-12rem)] overflow-y-auto sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Passage {currentPassage.number}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {currentPassage.difficulty} · ~{currentPassage.wordCount} so'z
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{currentPassage.title}</h4>
                <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                  {currentPassage.text.split("\n\n").filter(Boolean).map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </div>

              {/* Right: Questions */}
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">Questions</span>
                  <span className="text-xs text-gray-400">
                    ({currentPassage.questionTypes.join(" · ")})
                  </span>
                </div>

                <div className="space-y-3">
                  {currentPassage.questions.map((q) => {
                    const selected = readingAnswers[q.id];
                    return (
                      <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shrink-0">
                            {q.id}
                          </span>
                          <div className="flex-1">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{q.type}</span>
                            <p className="text-sm font-medium text-gray-900 mt-1 mb-2">{q.question}</p>
                            <div className="grid gap-1.5">
                              {q.options.map((opt, oi) => (
                                <button
                                  key={oi}
                                  onClick={() => setReadingAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                                    selected === oi
                                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium"
                                      : "border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ WRITING ═══════════════ */}
        {phase === "writing" && (
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-purple-700">
                <Clock className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Vaqtni o'zingiz taqsimlang. Task 1: ~20 daqiqa (kamida 150 so'z), Task 2: ~40 daqiqa (kamida 250 so'z).
                  Task 2 ballga ikki barobar ko'p hissa qo'shadi.
                </p>
              </div>
            </div>

            {/* Task 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Writing Task 1</h3>
                <div className="flex items-center gap-2">
                  {wr1Words < 150 && (
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Kamida 150 so'z
                    </span>
                  )}
                  <span className={`text-xs font-semibold ${wr1Words >= 150 ? "text-green-600" : "text-gray-400"}`}>
                    {wr1Words} so'z
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{examData.writing.tasks[0].prompt}</p>
              <textarea
                value={writingTexts[0]}
                onChange={(e) => setWritingTexts([e.target.value, writingTexts[1]])}
                placeholder="Task 1 javobingizni yozing..."
                className="w-full h-48 p-4 border border-gray-200 rounded-lg text-sm resize-y focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>

            {/* Task 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Writing Task 2</h3>
                <div className="flex items-center gap-2">
                  {wr2Words < 250 && (
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Kamida 250 so'z
                    </span>
                  )}
                  <span className={`text-xs font-semibold ${wr2Words >= 250 ? "text-green-600" : "text-gray-400"}`}>
                    {wr2Words} so'z
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{examData.writing.tasks[1].prompt}</p>
              <textarea
                value={writingTexts[1]}
                onChange={(e) => setWritingTexts([writingTexts[0], e.target.value])}
                placeholder="Task 2 javobingizni yozing..."
                className="w-full h-64 p-4 border border-gray-200 rounded-lg text-sm resize-y focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleFinishExam}
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50"
              >
                {submitting ? "Hisoblanmoqda..." : "Mock Examni yakunlash"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
