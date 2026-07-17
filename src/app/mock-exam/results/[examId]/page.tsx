"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getBandDescription, getStrengthWeakness, roundIELTSBand,
} from "@/lib/ielts";
import { getMockExamData } from "@/data/mock-exam-data";

interface ExamResult {
  id: string;
  listeningScore: number | null;
  listeningBand: number | null;
  readingScore: number | null;
  readingBand: number | null;
  writingBand: number | null;
  writingTask1?: string;
  writingTask2?: string;
  speakingBand: number | null;
  overallBand: number | null;
  startedAt: string;
  completedAt: string | null;
  status: string;
  sections: Array<{
    sectionType: string;
    timeSpentSec: number;
  }>;
}

const examData = getMockExamData();

export default function ResultsPage() {
  const { examId } = useParams<{ examId: string }>();
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() { router.push("/login"); },
  });
  const [exam, setExam] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/mock-exam/${examId}`)
      .then((r) => r.json())
      .then((d) => { setExam(d.exam); setLoading(false); })
      .catch(() => setLoading(false));
  }, [examId]);

  if (!session) return null;
  if (loading) return <LoadingSkeleton />;
  if (!exam) return <NotFound />;

  const sect = {
    listening: exam.listeningBand,
    reading: exam.readingBand,
    writing: exam.writingBand,
    speaking: exam.speakingBand,
  };
  const { strongest, weakest, strongLabel, weakLabel } = getStrengthWeakness(sect);

  const allBands = [exam.listeningBand, exam.readingBand, exam.writingBand].filter((b): b is number => b !== null);
  const overallWithSpeaking = exam.speakingBand
    ? roundIELTSBand([...allBands, exam.speakingBand].reduce((a, b) => a + b, 0) / [...allBands, exam.speakingBand].length)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-900">IELTS Mock Exam Results</h1>
          <p className="text-gray-500 mt-1">
            {new Date(exam.completedAt || exam.startedAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            * These are estimated band scores based on approximate conversion tables.
            Official IELTS results may differ.
          </p>
        </div>

        {/* Overall Band */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Overall Band Score</p>
          <div className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {exam.overallBand?.toFixed(1) || "—"}
          </div>
          <p className="text-lg text-gray-600 mt-2">{getBandDescription(exam.overallBand || 0)}</p>
          {overallWithSpeaking && exam.speakingBand && (
            <p className="text-sm text-gray-400 mt-1">
              With Speaking: {overallWithSpeaking.toFixed(1)}
            </p>
          )}
        </div>

        {/* Band Score Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Band Score Breakdown</h2>
          <div className="space-y-3">
            <BandRow label="Listening" band={exam.listeningBand} score={exam.listeningScore} max={40} color="bg-indigo-500" />
            <BandRow label="Reading" band={exam.readingBand} score={exam.readingScore} max={40} color="bg-emerald-500" />
            <BandRow label="Writing" band={exam.writingBand} color="bg-purple-500"
              note={`Estimated (Task 1: word count, Task 2: word count)`} />
            <BandRow label="Speaking" band={exam.speakingBand} color="bg-amber-500"
              notTaken={!exam.speakingBand && exam.status === "completed"} />
          </div>
        </div>

        {/* Writing Formula Info */}
        {exam.writingBand !== null && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-semibold text-purple-800 text-sm mb-1">Writing Band Calculation</h3>
            <p className="text-sm text-purple-700">
              IELTS rasmiy qoidasiga ko'ra, Writing umumiy balli Task 1 va Task 2 dan quyidagicha hisoblanadi:
            </p>
            <p className="text-sm font-bold text-purple-800 mt-1 mb-1">
              Writing Band = (Task 1 Band × 1 + Task 2 Band × 2) / 3
            </p>
            <p className="text-sm text-purple-700">
              Task 2 umumiy bahoga ikki barobar ko'p hissa qo'shadi.
              Hozirda ball so'z soni asosida taxminiy hisoblanmoqda.
            </p>
          </div>
        )}

        {/* Listening/Reading Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 text-sm mb-1">⚠️ Eslatma</h3>
          <p className="text-sm text-amber-700">
            Listening va Reading uchun band konversiyasi umumiy qabul qilingan taxminiy jadval asosida hisoblanadi.
            Rasmiy IELTS natijalari farq qilishi mumkin. Bu kafolatlangan natija emas.
          </p>
        </div>

        {/* Strengths & Weaknesses */}
        {strongest && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💪</span>
                <h3 className="font-semibold text-green-800">Strongest</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">{strongLabel}</p>
              <p className="text-sm text-green-600">Band {sect[strongest.toLowerCase() as keyof typeof sect]?.toFixed(1)}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <h3 className="font-semibold text-amber-800">Needs improvement</h3>
              </div>
              <p className="text-2xl font-bold text-amber-700">{weakLabel}</p>
              <p className="text-sm text-amber-600">Band {sect[weakest.toLowerCase() as keyof typeof sect]?.toFixed(1)}</p>
            </div>
          </div>
        )}

        {/* Speaking CTA — separate day concept */}
        {!exam.speakingBand && exam.status === "completed" && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl shrink-0">🎤</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Speaking — Alohida kun</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Real IELTS'da Speaking qismi Listening, Reading va Writing bilan bir kunda emas,
                  balki alohida kunda o'tkaziladi. Siz hozir Speaking ni topshirishingiz yoki
                  keyinroq rejalashtirishingiz mumkin.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/mock-exam/exam/${exam.id}?speaking=true`)}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-md text-sm"
                  >
                    Hozir topshirish
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Keyinroq (Dashboard)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversion Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Band Conversion Reference</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Listening</p>
              <div className="space-y-1">
                {BAND_TABLE.map((row) => (
                  <div key={row.correct} className="flex items-center justify-between text-xs py-1 px-2 even:bg-gray-50 rounded">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-bold text-gray-900">{row.band}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Reading (Academic)</p>
              <div className="space-y-1">
                {BAND_TABLE.map((row) => (
                  <div key={row.correct} className="flex items-center justify-between text-xs py-1 px-2 even:bg-gray-50 rounded">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-bold text-gray-900">{row.band}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                General Training Reading uchun boshqa (qattiqroq) jadval qo'llaniladi.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center pb-10">
          <button
            onClick={() => router.push("/mock-exam")}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Yangi Mock Exam
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const BAND_TABLE = [
  { correct: "39-40", label: "39-40 (98-100%)", band: "9.0" },
  { correct: "37-38", label: "37-38 (93-95%)", band: "8.5" },
  { correct: "35-36", label: "35-36 (88-90%)", band: "8.0" },
  { correct: "33-34", label: "33-34 (83-85%)", band: "7.5" },
  { correct: "30-32", label: "30-32 (75-80%)", band: "7.0" },
  { correct: "27-29", label: "27-29 (68-73%)", band: "6.5" },
  { correct: "23-26", label: "23-26 (58-65%)", band: "6.0" },
  { correct: "19-22", label: "19-22 (48-55%)", band: "5.5" },
  { correct: "15-18", label: "15-18 (38-45%)", band: "5.0" },
  { correct: "13-14", label: "13-14 (33-35%)", band: "4.5" },
];

function BandRow({ label, band, score, max, color, notTaken, note }: {
  label: string; band: number | null; score?: number | null; max?: number;
  color: string; notTaken?: boolean; note?: string;
}) {
  if (notTaken) {
    return (
      <div className="flex items-center gap-4 py-2 border-b border-dashed border-gray-200 last:border-0 opacity-50">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm font-medium text-gray-700 w-24">{label}</span>
        <span className="text-sm text-gray-400">Not taken</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-sm font-medium text-gray-700 w-24">{label}</span>
      <span className="text-lg font-bold text-gray-900">{band?.toFixed(1) || "—"}</span>
      {score !== undefined && max !== undefined && score !== null && (
        <span className="text-xs text-gray-400 ml-2">{score}/{max} correct</span>
      )}
      {note && <span className="text-[10px] text-gray-400 ml-2">{note}</span>}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-900">Exam not found</h2>
        <p className="text-gray-500 mt-2">This exam may have been deleted or you don't have access.</p>
      </div>
    </div>
  );
}
