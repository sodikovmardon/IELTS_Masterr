"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Headphones, BookOpen, PenTool, Mic, Clock, Info } from "lucide-react";

export default function MockExamPage() {
  const router = useRouter();
  const [starting, setStarting] = useState(false);

  const handleStart = async () => {
    setStarting(true);
    try {
      const res = await fetch("/api/mock-exam", { method: "POST" });
      const data = await res.json();
      if (data.exam) router.push(`/mock-exam/exam/${data.exam.id}`);
    } catch { setStarting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="text-3xl font-bold text-gray-900">IELTS Mock Exam</h1>
          <p className="text-gray-500 mt-2">Real IELTS Academic format bo'yicha to'liq simulatsiya</p>
        </div>

        {/* Exam Flow Overview */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Day 1: Listening → Reading → Writing */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold">1-KUN</div>
              <span className="text-sm font-semibold text-gray-700">Asosiy imtihon · 2 soat 30 daqiqa</span>
            </div>
            <div className="space-y-3">
              <SectionInfoCard
                icon={<Headphones className="w-5 h-5" />}
                color="indigo"
                title="Listening"
                time="30 + 2 daq"
                desc="4 section · 40 savol · audio 1 marta"
                details={[
                  "Section 1: Suhbat (form/note completion)",
                  "Section 2: Monolog (multiple choice/map)",
                  "Section 3: Suhbat (matching)",
                  "Section 4: Ma'ruza (summary completion)",
                  "2 daqiqa review vaqti (computer-based)",
                ]}
              />
              <div className="flex items-center gap-3 text-xs text-gray-400 pl-8">
                <div className="h-px flex-1 bg-gray-200" />
                <span>→</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <SectionInfoCard
                icon={<BookOpen className="w-5 h-5" />}
                color="emerald"
                title="Reading"
                time="60 daq"
                desc="3 passage · 40 savol (13/13/14)"
                details={[
                  "Passage 1: Oson (2,150 so'z)",
                  "Passage 2: O'rta (2,400 so'z)",
                  "Passage 3: Qiyin (2,750 so'z)",
                  "True/False/NG · Multiple Choice · Matching",
                  "Sentence/Summary Completion",
                ]}
              />
              <div className="flex items-center gap-3 text-xs text-gray-400 pl-8">
                <div className="h-px flex-1 bg-gray-200" />
                <span>→</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <SectionInfoCard
                icon={<PenTool className="w-5 h-5" />}
                color="purple"
                title="Writing"
                time="60 daq"
                desc="2 topshiriq · 150 + 250 so'z"
                details={[
                  "Task 1 (~20 daq): Grafik/jadval tahlili (≥150 so'z)",
                  "Task 2 (~40 daq): Argumentativ esse (≥250 so'z)",
                  "Task 2 ballga ikki barobar ko'p hissa qo'shadi",
                ]}
              />
            </div>
          </div>

          {/* Speaking — separate day */}
          <div className="p-5 bg-amber-50/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold">ALOHIDA KUN</div>
              <span className="text-sm font-semibold text-gray-700">Speaking (ixtiyoriy)</span>
            </div>
            <SectionInfoCard
              icon={<Mic className="w-5 h-5" />}
              color="amber"
              title="Speaking"
              time="11-14 daq"
              desc="3 qism · alohida rejalashtiriladi"
              details={[
                "Part 1: Kirish va intervyu (4-5 daq)",
                "Part 2: Cue card — 1 daq tayyorgarlik (3-4 daq)",
                "Part 3: Muhokama (4-5 daq)",
              ]}
              compact
            />
          </div>
        </div>

        {/* Band Scoring Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-900 text-sm">Baholash tizimi</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Har bir skill 1-9 gacha, 0.5 aniqlikda baholanadi</p>
            <p>• Overall Band = 4 skill o'rtacha arifmetigi (IELTS yaxlitlash qoidasi bilan)</p>
            <p>• Writing Band = (Task 1 × 1 + Task 2 × 2) / 3</p>
            <p className="text-xs text-gray-400 mt-2">
              * Band konversiyasi taxminiy. Rasmiy IELTS natijalari farq qilishi mumkin.
            </p>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h4 className="font-semibold text-amber-800 mb-2">Muhim qoidalar</h4>
          <ul className="text-sm text-amber-700 space-y-1.5 list-disc list-inside">
            <li>Listening → Reading → Writing tanaffussiz, ketma-ket</li>
            <li>Speaking alohida kunda topshiriladi ("Hozir" yoki "Keyinroq")</li>
            <li>Sektsiya tugagach oldingi bo'limga qaytib bo'lmaydi</li>
            <li>Brauzerni yopmang — taymer davom etadi</li>
            <li>Speaking Section 3 da variant: "Hozir topshirish" yoki "Keyinroq"</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          disabled={starting}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {starting ? "Tayyorlanmoqda..." : "Mock Examni boshlash"}
        </button>
      </div>
    </div>
  );
}

function SectionInfoCard({ icon, color, title, time, desc, details, compact }: {
  icon: React.ReactNode; color: string; title: string; time: string;
  desc: string; details: string[]; compact?: boolean;
}) {
  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className={`flex items-start gap-4 ${compact ? "py-2" : ""}`}>
      <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold text-gray-900 ${compact ? "text-sm" : ""}`}>{title}</h3>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            color === "amber" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
          }`}>
            {time}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-1">{desc}</p>
        <ul className="text-xs text-gray-400 space-y-0.5">
          {details.map((d, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-gray-300">·</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
