"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, PenTool, CheckCircle2, AlertTriangle, Trophy,
  Bookmark, BookMarked, ChevronRight, Loader2, Play, Sparkles,
  Lightbulb, AlertCircle, Award, ChevronLeft, GraduationCap, History,
  Eye, EyeOff, Send, FileText, BarChart3, Target, PenLine,
  BookOpen, Layout, Languages, MessageSquare, Quote,
  CheckSquare, Edit3, ArrowRight, Star, X, Crown, Zap,
  List, Type, AlignLeft, ScrollText, SquarePen, BrainCircuit,
  Speech, Grip, BookCheck, WholeWord, PencilRuler, Flame
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import TaskVisual from "@/components/visuals/TaskVisual";

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
  chartUrl: string | null;
  transcriptText: string | null;
  taskVisualType: string | null;
  taskChartData: any;
  taskImageUrl: string | null;
  progresses: LessonProgress[];
}

interface EvaluationResult {
  taskAchievement: { score: number; feedback: string; strengths: string[]; improvements: string[] };
  coherenceCohesion: { score: number; feedback: string; strengths: string[]; improvements: string[] };
  lexicalResource: { score: number; feedback: string; strengths: string[]; improvements: string[] };
  grammaticalRange: { score: number; feedback: string; strengths: string[]; improvements: string[] };
  overallBand: number;
  generalFeedback: string;
  wordCount: number;
  estimatedBand: string;
}

interface TabDef {
  id: string;
  label: string;
  icon: React.ElementType;
}

const TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: Target },
  { id: "introductions", label: "Introductions", icon: PenLine },
  { id: "overview-paragraphs", label: "Overview Paragraphs", icon: Eye },
  { id: "language-bank", label: "Language Bank", icon: BookOpen },
  { id: "organising", label: "Organising Info", icon: Layout },
  { id: "grammar", label: "Grammar", icon: Type },
  { id: "practice", label: "Practice", icon: SquarePen },
  { id: "samples", label: "Sample Answers", icon: ScrollText },
  { id: "sentences", label: "Sentence Practice", icon: MessageSquare },
];

const DIFFICULTY_CONFIG: Record<string, { label: string; class: string }> = {
  Easy: { label: "Oson", class: "bg-green-100 text-green-700" },
  Medium: { label: "O'rta", class: "bg-yellow-100 text-yellow-700" },
  Hard: { label: "Qiyin", class: "bg-red-100 text-red-700" },
};

const CRITERIA_LABELS: Record<string, string> = {
  taskAchievement: "Task Achievement",
  coherenceCohesion: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range",
};

function useTimer(initialMinutes: number, running: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  useEffect(() => { setSecondsLeft(initialMinutes * 60); }, [initialMinutes]);
  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => { setSecondsLeft((p) => p <= 1 ? 0 : p - 1); }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const totalSeconds = initialMinutes * 60;
  const isLow = secondsLeft > 0 && secondsLeft <= totalSeconds * 0.2;
  return {
    minutes, seconds, secondsLeft, isLow,
    formatted: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    progress: totalSeconds > 0 ? secondsLeft / totalSeconds : 0,
  };
}

function renderContent(text: string) {
  if (!text) return null;
  const hasHtml = /<[a-z][\s\S]*>/i.test(text);
  if (hasHtml) return <div dangerouslySetInnerHTML={{ __html: text }} />;
  return text.split("\n").map((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return <div key={i} className="h-3" />;
    const bolded = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-indigo-700">$1</strong>');
    if (bolded.includes("<strong")) {
      return <p key={i} className="mb-3 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bolded }} />;
    }
    return <p key={i} className="mb-3 text-gray-700 leading-relaxed">{trimmed}</p>;
  });
}

function renderListItems(text: string) {
  if (!text) return null;
  const lines = text.split("\n").filter(l => l.trim());
  return (
    <ul className="space-y-2">
      {lines.map((line, i) => {
        const clean = line.replace(/^[\d\-*•.]+\)?\s*/, "");
        const bolded = clean.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-indigo-700">$1</strong>');
        return (
          <li key={i} className="flex items-start gap-2 text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: bolded }} />
          </li>
        );
      })}
    </ul>
  );
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
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };
  const gridPolygons = levels.map((level) => {
    const points = criteria.map((_, i) => getPoint(i, level)).map(p => `${p.x},${p.y}`).join(" ");
    return { level, points };
  });
  const dataPoints = criteria.map((_, i) => getPoint(i, scores[criteria[i]]));
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(" ");
  const labelPositions = criteria.map((_, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = radius + 22;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), label: CRITERIA_LABELS[criteria[i]] || criteria[i], score: scores[criteria[i]] };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size + 10}`} className="w-full max-w-[220px] mx-auto">
      {gridPolygons.map(({ level, points }) => (
        <polygon key={level} points={points} fill="none" stroke={level === 9 ? "#818cf8" : "#e5e7eb"} strokeWidth={level === 9 ? 1 : 1} opacity={level === 9 ? 0.3 : 1} />
      ))}
      <polygon points={dataPolygon} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth={2} />
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#6366f1" />)}
      {labelPositions.map(({ x, y, label, score }) => (
        <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] fill-gray-500 font-medium">{label}</text>
      ))}
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-indigo-900">{children}</h2>
      <div className="w-12 h-1 bg-amber-400 rounded-full mt-2" />
    </div>
  );
}

function ContentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-macos border border-white/20 p-6 ${className}`}>
      {children}
    </div>
  );
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-indigo-700 text-white">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-700 border-t border-gray-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function extractSections(text: string) {
  if (!text) return { intro: "", structure: "", details: "" };
  const sections: Record<string, string> = { intro: "", structure: "", details: "" };
  const lines = text.split("\n");
  let currentSection = "intro";
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes("tuzilishi") || lower.includes("strukturasi")) { currentSection = "structure"; continue; }
    if (lower.includes("muhim") || lower.includes("samarali") || lower.includes("qoidalar") || currentSection === "details") { currentSection = "details"; }
    if (line.trim()) {
      if (currentSection === "structure") sections.structure += line + "\n";
      else if (currentSection === "details") sections.details += line + "\n";
      else sections.intro += line + "\n";
    }
  }
  if (!sections.structure) { sections.structure = sections.intro; sections.intro = ""; }
  return sections;
}

function extractLanguageItems(text: string) {
  if (!text) return { trends: [], comparisons: [], structure: [] };
  const trends: string[] = [];
  const comparisons: string[] = [];
  const structure: string[] = [];
  const lines = text.split("\n");
  let section = "";
  for (const line of lines) {
    const l = line.toLowerCase();
    if (l.includes("trend") || l.includes("o'sish") || l.includes("pasayish")) section = "trends";
    else if (l.includes("compar") || l.includes("taqqos")) section = "comparisons";
    else if (l.includes("tuzilish") || l.includes("struktur")) section = "structure";
    const clean = line.replace(/^[\d\-*•.]+\)?\s*/, "").trim();
    if (clean && clean.length > 3 && !clean.startsWith("Tuzilish") && !clean.startsWith("Trend") && !clean.startsWith("Compar") && !clean.startsWith("Muhim")) {
      if (section === "trends" && clean.includes("-")) trends.push(clean);
      else if (section === "comparisons" && clean.includes("-")) comparisons.push(clean);
      else if (section === "structure" && clean.includes("-")) structure.push(clean);
    }
  }
  return { trends, comparisons, structure };
}

function getLessonType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("task 1") || t.includes("task1")) {
    if (t.includes("process")) return "process";
    if (t.includes("trend") || t.includes("compar")) return "trend-comparison";
    return "data-analysis";
  }
  if (t.includes("task 2") || t.includes("task2")) {
    if (t.includes("opinion")) return "opinion";
    if (t.includes("discussion")) return "discussion";
    if (t.includes("problem") || t.includes("solution")) return "problem-solution";
    return "essay";
  }
  if (t.includes("cohesion") || t.includes("coherence")) return "cohesion";
  if (t.includes("lexical")) return "lexical";
  if (t.includes("grammatical") || t.includes("grammar")) return "grammar-range";
  return "general";
}

function getBadgeLabel(title: string): string {
  const type = getLessonType(title);
  const map: Record<string, string> = {
    "data-analysis": "IELTS · WRITING TASK 1",
    "trend-comparison": "IELTS · WRITING TASK 1",
    "process": "IELTS · WRITING TASK 1",
    "opinion": "IELTS · WRITING TASK 2",
    "discussion": "IELTS · WRITING TASK 2",
    "problem-solution": "IELTS · WRITING TASK 2",
    "cohesion": "IELTS · WRITING SKILLS",
    "lexical": "IELTS · WRITING SKILLS",
    "grammar-range": "IELTS · WRITING SKILLS",
    "essay": "IELTS · WRITING TASK 2",
  };
  return map[type] || "IELTS · WRITING";
}

export default function WritingLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [essayText, setEssayText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "">("");
  const [showHistoryHint, setShowHistoryHint] = useState(false);

  const editorActive = useRef(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const STORAGE_KEY = `writing_essay_${lessonId}`;

  const questions: { question: string; explanation: string }[] = useMemo(() => {
    if (!lesson?.questions) return [];
    try { return JSON.parse(lesson.questions); } catch { return []; }
  }, [lesson]);

  const writingTopic = lesson?.passageText || questions[0]?.question || "";

  const timerMinutes = useMemo(() => {
    if (!lesson) return 20;
    const title = lesson.title.toLowerCase();
    if (title.includes("task 2") || title.includes("task2")) return 40;
    if (title.includes("task 1") || title.includes("task1")) return 20;
    return lesson.durationMin;
  }, [lesson]);

  const timer = useTimer(timerMinutes, activeTab === "practice");
  const wordCount = useMemo(() => essayText.split(/\s+/).filter(Boolean).length, [essayText]);
  const minWords = timerMinutes >= 40 ? 250 : 150;
  const lessonType = lesson ? getLessonType(lesson.title) : "general";

  const modelAnswer = questions[0]?.explanation || "";

  const taskVisualProps = useMemo(() => {
    if (!lesson || !lesson.taskVisualType) return null;
    let chartData = null;
    if (lesson.taskChartData) {
      try {
        chartData = typeof lesson.taskChartData === 'string' ? JSON.parse(lesson.taskChartData) : lesson.taskChartData;
      } catch {}
    }
    const processData = lesson.taskVisualType === 'process_diagram' ? {
      title: 'Cement ishlab chiqarish jarayoni',
      steps: [
        { label: 'Xom ashyo yig\'ish', description: 'Ohaktosh va gil' },
        { label: 'Maydalash', description: 'Krusherda' },
        { label: 'Aralashtirish', description: 'Proportsiya bo\'yicha' },
        { label: 'Qizdirish', description: '1800°C da aylanma pech' },
        { label: 'Sovutish va maydalash', description: 'Klinker' },
        { label: 'Qadoqlash', description: '50kg sumkalarda' },
      ],
    } : undefined;
    return {
      visualType: lesson.taskVisualType,
      chartData,
      imageUrl: lesson.taskImageUrl,
      processData,
      caption: 'Yuqoridagi ma\'lumotlarni umumlashtiring va solishtiring. Kamida 150 so\'z yozing.',
    };
  }, [lesson]);

  useEffect(() => {
    const p = new URLSearchParams({ category: "writing" });
    if (session?.user?.id) p.set("userId", session.user.id);
    fetch(`/api/lessons?${p}`)
      .then(r => r.json())
      .then(res => {
        if (res.lessons) {
          setAllLessons(res.lessons);
          const found = res.lessons.find((l: Lesson) => l.id === lessonId);
          if (found) { setLesson(found); setBookmarked(found.progresses?.[0]?.bookmarked || false); }
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId, session]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { const parsed = JSON.parse(saved); if (parsed.essayText) setEssayText(parsed.essayText); } catch {} }
  }, [STORAGE_KEY]);

  const autoSave = useCallback(() => {
    if (!essayText) return;
    setSaveStatus("saving");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ essayText, savedAt: Date.now() }));
    setTimeout(() => setSaveStatus("saved"), 300);
  }, [essayText, STORAGE_KEY]);

  useEffect(() => {
    if (activeTab !== "practice") return;
    if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    saveTimerRef.current = setInterval(autoSave, 5000);
    return () => { if (saveTimerRef.current) clearInterval(saveTimerRef.current); };
  }, [activeTab, autoSave]);

  const nextLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return null;
    if (lesson.prerequisiteLessonId) return allLessons.find(l => l.id === lesson.prerequisiteLessonId) || null;
    return allLessons.find(l => l.order === lesson.order + 1) || null;
  }, [lesson, allLessons]);

  const isLastLesson = useMemo(() => {
    if (!lesson || allLessons.length === 0) return false;
    return lesson.order === Math.max(...allLessons.map(l => l.order));
  }, [lesson, allLessons]);

  const allCompleted = useMemo(() => {
    if (allLessons.length === 0) return false;
    return allLessons.every(l => l.progresses?.[0]?.completed);
  }, [allLessons]);

  const handleBookmark = async () => {
    if (!session?.user?.id || !lesson) return;
    try {
      const res = await fetch("/api/lessons", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, userId: session.user.id, bookmarked: !bookmarked }),
      });
      if (res.ok) setBookmarked(!bookmarked);
    } catch {}
  };

  const handleSubmit = async () => {
    if (!writingTopic) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/writing/evaluate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essayText, lessonId, topic: writingTopic }),
      });
      const data = await res.json();
      setEvaluation(data);
      setActiveTab("feedback");
      if (session?.user?.id) {
        try {
          await fetch("/api/lessons", {
            method: "PATCH", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId: lesson!.id, userId: session.user.id,
              score: Math.round(data.overallBand * 2), maxScore: 18, completed: true,
              answers: JSON.stringify({ essay: essayText, evaluation: data }),
              attempts: (lesson!.progresses?.[0]?.attempts || 0) + 1,
            }),
          });
          await fetch("/api/writing-history", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId: lesson!.id,
              essayText,
              wordCount: data.wordCount,
              taskAchievement: data.taskAchievement.score,
              coherenceCohesion: data.coherenceCohesion.score,
              lexicalResource: data.lexicalResource.score,
              grammaticalRange: data.grammaticalRange.score,
              overallBand: data.overallBand,
              feedback: JSON.stringify({
                taskAchievement: data.taskAchievement,
                coherenceCohesion: data.coherenceCohesion,
                lexicalResource: data.lexicalResource,
                grammaticalRange: data.grammaticalRange,
                generalFeedback: data.generalFeedback,
                estimatedBand: data.estimatedBand,
              }),
            }),
          });
        } catch {}
      }
      localStorage.removeItem(STORAGE_KEY);
    } catch { setEvaluation(null); }
    setSubmitting(false);
  };

  const criteriaScores = useMemo((): Record<string, number> => {
    if (!evaluation) return { taskAchievement: 0, coherenceCohesion: 0, lexicalResource: 0, grammaticalRange: 0 };
    return {
      taskAchievement: evaluation.taskAchievement.score,
      coherenceCohesion: evaluation.coherenceCohesion.score,
      lexicalResource: evaluation.lexicalResource.score,
      grammaticalRange: evaluation.grammaticalRange.score,
    };
  }, [evaluation]);

  const sections = lesson ? extractSections(lesson.theoryContent) : { intro: "", structure: "", details: "" };
  const languageItems = lesson ? extractLanguageItems(lesson.theoryContent) : { trends: [], comparisons: [], structure: [] };

  const structureRows: string[][] = lessonType.includes("task-2") || lessonType === "opinion" || lessonType === "discussion" || lessonType === "problem-solution" || lessonType === "essay"
    ? [
        ["Introduction", "2-3 jumla", "Mavzuni parafraze qiling + thesis statement"],
        ["Body 1", "4-6 jumla", "Birinchi asosiy fikr + tushuntirish + misol"],
        ["Body 2", "4-6 jumla", "Ikkinchi asosiy fikr + tushuntirish + misol"],
        ["Conclusion", "2-3 jumla", "Asosiy fikrlarni takrorlang, xulosa chiqaring"],
      ]
    : [
        ["Introduction", "1-2 jumla", "Diagrammani parafraze qiling"],
        ["Overview", "1-2 jumla", "Eng umumiy trend yoki xususiyat"],
        ["Body 1", "3-4 jumla", "Birinchi guruh ma'lumotlari"],
        ["Body 2", "3-4 jumla", "Ikkinchi guruh ma'lumotlari"],
      ];

  const introductionTips: Record<string, string[]> = {
    "data-analysis": [
      "The bar chart illustrates/shows/compares...",
      "The graph provides information about...",
      "The diagram presents data on...",
      "Parafraze: 'shows' → 'illustrates', 'chart' → 'diagram', 'graph'",
    ],
    "process": [
      "The diagram illustrates the process of...",
      "The flowchart shows how... is produced/created.",
      "The diagram outlines the stages involved in...",
      "Passive voice bilan boshlang: 'First, the material is collected...'",
    ],
    "opinion": [
      "Parafraze the statement: 'Some people believe that...'",
      "Clear position: 'I completely agree that...' / 'I disagree with this view'",
      "Thesis statement: 'While I acknowledge..., I firmly believe that...'",
      "Never start with 'This essay will...' — be direct",
    ],
    "discussion": [
      "Parafraze both views: 'On the one hand... On the other hand...'",
      "State your intention: 'This essay will discuss both perspectives'",
      "End with: '...before presenting my own view'",
      "Keep introduction to 2-3 sentences maximum",
    ],
  };

  const overviewParagraphTips: Record<string, string[]> = {
    "data-analysis": [
      "Overview eng muhim qism: umumiy trendni 1-2 jumlada bering",
      "Raqam bermang, faqat umumiy xususiyatlarni ayting",
      "Masalan: 'Overall, all three cities experienced significant growth...'",
      "Eng katta farq yoki eng muhim trendni ajratib ko'rsating",
    ],
    "process": [
      "Overviewda bosqichlar sonini va jarayonni ayting",
      "Masalan: 'Overall, the process consists of five main stages, beginning with... and ending with...'",
      "Input va outputni ko'rsating",
      "Hech qanday tafsilot bermang, faqat umumiy ko'rinish",
    ],
    "opinion": [
      "Overview Task 2 da alohida paragraf emas",
      "Thesis statement introduction tarkibida keladi",
      "Pozitsiyangizni aniq va qat'iy ifoda eting",
    ],
  };

  const grammarContent: Record<string, { tips: string[]; mistakes: string[] }> = {
    "data-analysis": {
      tips: [
        "Present Simple: 'The chart shows...' (rasmga ishora)",
        "Past Simple: 'In 2020, the figure rose to...' (o'tgan ma'lumot)",
        "Comparatives: 'higher than', 'lower than', 'as much as'",
        "Superlatives: 'the highest', 'the lowest', 'the most significant'",
        "Approximation: 'approximately', 'roughly', 'just over', 'nearly'",
      ],
      mistakes: [
        "Sabablarni tushuntirmang — 'because' ishlatmang",
        "Faqat ma'lumotni tasvirlang, izoh bermang",
        "Aniq raqamlarni to'g'ri keltiring",
      ],
    },
    "process": {
      tips: [
        "Passive voice: 'the water is heated', 'the mixture is poured'",
        "Sequencing: 'first', 'next', 'then', 'after that', 'subsequently', 'finally'",
        "Present Simple passive: 'is pumped', 'are collected'",
        "Articles: 'the' specific equipment uchun, 'a' umumiy uchun",
      ],
      mistakes: [
        "Active voice ishlatmaslik kerak",
        "Bosqichlar sonini noto'g'ri sanash",
        "Overviewda faqat birinchi bosqichni aytish",
      ],
    },
    "default": {
      tips: [
        "Complex sentences: 'Although..., ...'",
        "Conditionals: 'If the government invests, literacy rates will improve'",
        "Passive voice: 'It could be argued that...'",
        "Relative clauses: 'Students who study regularly tend to achieve higher scores'",
      ],
      mistakes: [
        "Bir turdagi grammatik tuzilmani haddan tashqari ko'p ishlatish",
        "Noto'g'ri zamon ishlatish",
        "Complex sentence yozishda grammatik xato",
      ],
    },
  };

  const langBankContent: Record<string, { category: string; items: string[] }[]> = {
    "data-analysis": [
      { category: "O'sish", items: ["rose", "increased", "grew", "climbed", "surged", "peaked at", "went up"] },
      { category: "Pasayish", items: ["fell", "dropped", "declined", "decreased", "plunged", "bottomed out at", "went down"] },
      { category: "Barqarorlik", items: ["remained stable", "stayed constant", "levelled off", "fluctuated", "remained unchanged"] },
      { category: "Taqqoslash", items: ["in comparison to", "compared with", "by contrast", "similarly", "likewise", "while", "whereas"] },
      { category: "Daraja", items: ["significantly", "moderately", "slightly", "dramatically", "substantially", "gradually"] },
    ],
    "process": [
      { category: "Boshlash", items: ["first", "initially", "to begin with", "the process starts when", "firstly"] },
      { category: "Davom", items: ["next", "then", "after that", "subsequently", "following this", "once this is complete"] },
      { category: "Tugallash", items: ["finally", "eventually", "in the final stage", "the process concludes with"] },
      { category: "Passive verbs", items: ["is pumped", "is heated", "is collected", "is converted", "is released", "is transported"] },
    ],
    "opinion": [
      { category: "Shaxsiy fikr", items: ["I believe", "In my opinion", "From my perspective", "It seems to me that", "I am convinced that"] },
      { category: "Qo'shilish", items: ["I strongly agree", "I fully support", "I am in favour of", "I endorse the view that"] },
      { category: "Qarshi chiqish", items: ["I disagree with", "I oppose the idea", "I am not convinced that", "I take issue with"] },
      { category: "Bog'lovchilar", items: ["furthermore", "moreover", "in addition", "however", "on the other hand", "therefore"] },
    ],
    "discussion": [
      { category: "Birinchi fikr", items: ["on the one hand", "some people argue that", "it is often claimed that", "proponents of this view believe"] },
      { category: "Ikkinchi fikr", items: ["on the other hand", "others contend that", "opponents argue that", "critics point out that"] },
      { category: "Xulosa", items: ["in conclusion", "to sum up", "overall", "in my view", "all things considered"] },
    ],
  };

  const sentencePracticeContent: Record<string, { prompt: string; hint: string }[]> = {
    "data-analysis": [
      { prompt: "The bar chart ______ (show) the average monthly rainfall in three cities.", hint: "shows / illustrates / compares" },
      { prompt: "Overall, the figures for London ______ (remain) stable throughout the year.", hint: "remained" },
      { prompt: "Sydney experienced a ______ (significant/significantly) drop in rainfall in July.", hint: "significant" },
      { prompt: "The highest rainfall in Dubai was around 18mm, ______ (while/whereas) London reached 58mm.", hint: "while / whereas" },
    ],
    "process": [
      { prompt: "First, the cold water ______ (pump) into the geothermal zone.", hint: "is pumped" },
      { prompt: "After ______ (heat), the water rises to the surface as steam.", hint: "being heated / heating" },
      { prompt: "The steam then ______ (channel) into a turbine.", hint: "is channelled / travels" },
      { prompt: "______ (final), the electricity is transmitted to the power grid.", hint: "Finally" },
    ],
    "opinion": [
      { prompt: "______ my opinion, governments should invest more in education.", hint: "In" },
      { prompt: "I strongly ______ (agree) that alternative energy sources are essential.", hint: "agree / believe" },
      { prompt: "______ (while/despite) technology offers many benefits, it also presents challenges.", hint: "While" },
    ],
  };

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
        <Link href="/courses/writing" className="inline-flex items-center text-primary font-medium hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Writing kursiga qaytish
        </Link>
      </div>
    );
  }

  const diff = DIFFICULTY_CONFIG[lesson.difficulty] || { label: lesson.difficulty, class: "bg-gray-100 text-gray-700" };
  const badge = getBadgeLabel(lesson.title);
  const breadcrumbItems = ["Nazariya", "Namunalar", "So'z boyligi", "Tuzilish", "Grammatika"];

  const currentGrammar = grammarContent[lessonType] || grammarContent.default;
  const currentLangBank = langBankContent[lessonType] || langBankContent["data-analysis"];
  const currentIntroTips = introductionTips[lessonType] || introductionTips["data-analysis"];
  const currentOverviewTips = overviewParagraphTips[lessonType] || overviewParagraphTips["data-analysis"];
  const currentSentencePractice = sentencePracticeContent[lessonType] || sentencePracticeContent["data-analysis"];

  const renderTabContent = () => {
    if (activeTab === "overview") {
      return (
        <ContentCard>
          <SectionHeading>Dars haqida umumiy ma'lumot</SectionHeading>
          {lesson.videoUrl && (
            <VideoPlayer
              videoUrl={lesson.videoUrl}
              lessonId={lesson.id}
              transcriptText={lesson.transcriptText}
              title={lesson.title}
            />
          )}
          {renderContent(lesson.theoryContent)}
          {taskVisualProps && (
            <div className="mt-6">
              <TaskVisual data={taskVisualProps} />
            </div>
          )}
          {writingTopic && (
            <div className="mt-6 bg-indigo-50/80 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-indigo-800 text-sm">Writing Topic</h3>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {writingTopic}
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" />
              {lesson.durationMin} daqiqa
            </span>
            <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${diff.class}`}>{diff.label}</span>
            {lesson.isPremium ? (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Star className="w-3 h-3" /> Premium
              </span>
            ) : (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Zap className="w-3 h-3" /> Bepul
              </span>
            )}
          </div>
        </ContentCard>
      );
    }

    if (activeTab === "introductions") {
      return (
        <ContentCard>
          <SectionHeading>Introduction yozish</SectionHeading>
          <p className="text-gray-700 mb-4">
            Introduction — bu sizning inshoyingizning birinchi paragrafi bo'lib, u o'quvchiga mavzu haqida umumiy tushuncha beradi va keyingi fikrlaringizga tayyorlaydi.
          </p>
          <div className="space-y-3 mb-6">
            {currentIntroTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-indigo-50/60 rounded-xl">
                <CheckSquare className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
          {lessonType.includes("data-analysis") && (
            <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h4 className="font-semibold text-amber-800 text-sm">Misol Introduction</h4>
              </div>
              <p className="text-gray-700 text-sm italic">
                "The bar chart compares the average monthly rainfall in London, Sydney, and Dubai over a 12-month period in 2023. Units are measured in millimetres."
              </p>
            </div>
          )}
          {lessonType === "process" && (
            <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h4 className="font-semibold text-amber-800 text-sm">Misol Introduction</h4>
              </div>
              <p className="text-gray-700 text-sm italic">
                "The diagram illustrates the process of generating electricity from geothermal energy in a geothermal power plant."
              </p>
            </div>
          )}
        </ContentCard>
      );
    }

    if (activeTab === "overview-paragraphs") {
      return (
        <ContentCard>
          <SectionHeading>Overview Paragraph</SectionHeading>
          <p className="text-gray-700 mb-4">
            Overview — bu Task 1 Writingning eng muhim qismi. Unda siz diagrammaning eng umumiy xususiyatlarini 1-2 jumlada ta'riflaysiz. Overview alohida paragraf bo'lishi shart va u hech qachon aniq raqamlarni o'z ichiga olmaydi.
          </p>
          <div className="space-y-3 mb-6">
            {currentOverviewTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-amber-50/60 rounded-xl">
                <Eye className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
          {modelAnswer && (
            <div className="bg-green-50/80 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <h4 className="font-semibold text-green-800 text-sm">Namunaviy Overview</h4>
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed">
                {modelAnswer.split("\n\n")[1] || modelAnswer.split(".").slice(0, 2).join(".") + "."}
              </p>
            </div>
          )}
        </ContentCard>
      );
    }

    if (activeTab === "language-bank") {
      return (
        <ContentCard>
          <SectionHeading>So'z boyligi va iboralar</SectionHeading>
          <p className="text-gray-700 mb-6">
            Quyidagi so'z va iboralarni o'z inshoyingizda ishlatib, Lexical Resource ballingizni oshiring.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLangBank.map((category, ci) => (
              <div key={ci} className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-indigo-700 text-sm mb-3">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, ii) => (
                    <span key={ii} className="inline-flex items-center px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-gray-700 border border-gray-200 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {lesson.tipsAndTricks && (
            <div className="mt-6 bg-amber-50/80 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h3 className="font-semibold text-amber-800 text-sm">Tips & Tricks</h3>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {renderContent(lesson.tipsAndTricks)}
              </div>
            </div>
          )}
        </ContentCard>
      );
    }

    if (activeTab === "organising") {
      return (
        <ContentCard>
          <SectionHeading>Ma'lumotlarni tashkillashtirish</SectionHeading>
          <p className="text-gray-700 mb-4">
            Writing inshosi to'g'ri tuzilishda bo'lishi ballingizga katta ta'sir ko'rsatadi. Quyidagi jadvalda har bir paragrafning vazifasi va hajmi ko'rsatilgan.
          </p>
          <TableBlock
            headers={["Paragraf", "Hajmi", "Vazifasi"]}
            rows={structureRows}
          />
          <div className="mt-6 bg-indigo-50/80 rounded-xl p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <List className="w-4 h-4 text-indigo-600" />
              <h4 className="font-semibold text-indigo-800 text-sm">Muhim qoidalar</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                Har bir paragraf bitta asosiy g'oyani o'z ichiga olishi kerak
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                Paragraflar mantiqiy ketma-ketlikda joylashgan bo'lishi kerak
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                Overview (Task 1) yoki Thesis (Task 2) alohida paragraf bo'lishi shart
              </li>
            </ul>
          </div>
        </ContentCard>
      );
    }

    if (activeTab === "grammar") {
      return (
        <ContentCard>
          <SectionHeading>Grammatika va keng tarqalgan xatolar</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Grammatik maslahatlar
              </h3>
              <ul className="space-y-2">
                {currentGrammar.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Keng tarqalgan xatolar
              </h3>
              <ul className="space-y-2">
                {currentGrammar.mistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {lesson.commonMistakes && (
            <div className="mt-6 bg-red-50/80 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-red-800 text-sm">Darsga oid xatolar</h3>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {renderContent(lesson.commonMistakes)}
              </div>
            </div>
          )}
        </ContentCard>
      );
    }

    if (activeTab === "practice") {
      return (
        <>
          <ContentCard className="mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Writing Practice</h2>
              <div className="flex items-center gap-3">
                {saveStatus && (
                  <span className={`text-xs ${saveStatus === "saved" ? "text-green-500" : "text-gray-400"}`}>
                    {saveStatus === "saved" ? "Saqlangan" : "Saqlanmoqda..."}
                  </span>
                )}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${timer.isLow ? "bg-red-50 text-red-600 animate-pulse" : "bg-gray-50 text-gray-700"}`}>
                  <Clock className="w-4 h-4" />
                  {timer.formatted}
                </div>
              </div>
            </div>

            {writingTopic && (
              <div className="bg-indigo-50/80 backdrop-blur-sm border border-indigo-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-800 text-sm">Writing Topic</h3>
                </div>
                {taskVisualProps && (
                  <div className="mb-4">
                    <TaskVisual data={taskVisualProps} />
                  </div>
                )}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{writingTopic}</p>
              </div>
            )}

            <div className="mb-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">So'zlar:</span>
                <span className={`font-bold ${wordCount < minWords ? "text-red-500" : "text-green-600"}`}>{wordCount}</span>
                <span className="text-gray-400">/ {minWords}</span>
              </div>
              {wordCount < minWords && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Minimal {minWords} so'z
                </span>
              )}
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Essayingizni bu yerga yozing..."
                className="w-full h-96 p-5 bg-white rounded-xl input-macos border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-y text-gray-800 leading-relaxed text-sm"
              />
              {timer.secondsLeft <= 0 && (
                <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Clock className="w-10 h-10 text-red-400 mx-auto mb-2" />
                    <p className="text-red-600 font-semibold">Vaqt tugadi!</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => { autoSave(); setActiveTab("overview"); }}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Orqaga
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || wordCount < minWords || timer.secondsLeft <= 0 || !essayText.trim()}
                className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Yuborish
              </button>
            </div>
          </ContentCard>
        </>
      );
    }

    if (activeTab === "samples") {
      if (!modelAnswer) {
        return (
          <ContentCard>
            <SectionHeading>Namunaviy javob</SectionHeading>
            <p className="text-gray-500">Bu dars uchun namunaviy javob hali mavjud emas.</p>
          </ContentCard>
        );
      }
      return (
        <ContentCard>
          <SectionHeading>Namunaviy javob (Model Answer)</SectionHeading>
          <p className="text-gray-700 mb-4">
            Quyidagi namunaviy javob yuqori ball (Band 9) talablariga javob beradi. Undagi tuzilish, so'z boyligi va grammatik tuzilmalarni tahlil qiling.
          </p>
          <div className="bg-green-50/80 rounded-xl p-5 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800 text-sm">Band 9 Model Answer</h3>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {modelAnswer}
            </div>
          </div>
          <div className="mt-6 bg-amber-50/80 rounded-xl p-5 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-800 text-sm">Nimaga e'tibor berish kerak</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                Tuzilish: Introduction → Overview → Body 1 → Body 2
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                So'z boyligi: xilma-xil sinonimlar va akademik so'zlar
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                Grammatik tuzilmalar: complex va compound sentences
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                Linking words: tabiiy va me'yorida ishlatilgan
              </li>
            </ul>
          </div>
        </ContentCard>
      );
    }

    if (activeTab === "sentences") {
      return (
        <ContentCard>
          <SectionHeading>Gap tuzish mashqlari</SectionHeading>
          <p className="text-gray-700 mb-6">
            Quyidagi mashqlarni bajarib, ushbu darsda o'rganilgan grammatik tuzilma va so'zlarni mustahkamlang.
          </p>
          <div className="space-y-4">
            {currentSentencePractice.map((item, i) => (
              <div key={i} className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-2">{item.prompt}</p>
                    <details className="group">
                      <summary className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium">
                        Javobni ko'rsatish
                      </summary>
                      <p className="mt-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                        <span className="font-medium">Javob:</span> {item.hint}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-indigo-50/80 rounded-xl p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
              <h4 className="font-semibold text-indigo-800 text-sm">Mustaqil mashq</h4>
            </div>
            <p className="text-gray-700 text-sm">
              Berilgan Writing Topic asosida o'zingizning Introduction va Overview paragraflaringizni yozib ko'ring. Keyin ularni namunaviy javob bilan solishtiring.
            </p>
          </div>
        </ContentCard>
      );
    }

    if (activeTab === "feedback" && evaluation) {
      return (
        <>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Natijalar</h2>
            <div className="text-5xl font-extrabold text-primary mb-1">
              {evaluation.overallBand.toFixed(1)}
            </div>
            <p className="text-sm text-gray-500 mb-1">{evaluation.estimatedBand}</p>
            <p className="text-gray-500 text-sm">&middot; {evaluation.wordCount} so'z &middot;</p>
            <div className="w-full max-w-xs mx-auto mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(evaluation.overallBand / 9) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
              />
            </div>
          </div>

          <ContentCard className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> IELTS Criteria
                </h3>
                <RadarChart scores={criteriaScores} />
              </div>
              <div className="space-y-3">
                {[
                  { key: "taskAchievement", label: "Task Achievement", data: evaluation.taskAchievement },
                  { key: "coherenceCohesion", label: "Coherence & Cohesion", data: evaluation.coherenceCohesion },
                  { key: "lexicalResource", label: "Lexical Resource", data: evaluation.lexicalResource },
                  { key: "grammaticalRange", label: "Grammatical Range", data: evaluation.grammaticalRange },
                ].map(({ key, label, data }) => (
                  <div key={key} className="bg-white rounded-2xl shadow-macos border border-white/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <span className="text-lg font-bold text-primary">{data.score.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{data.feedback}</p>
                    {data.strengths.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[10px] font-semibold text-green-600 uppercase mb-1">✅ Kuchli tomonlar</p>
                        <ul className="space-y-0.5">
                          {data.strengths.map((s, i) => (
                            <li key={i} className="text-[10px] text-green-700 flex items-start gap-1">
                              <span>•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {data.improvements.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[10px] font-semibold text-amber-600 uppercase mb-1">⚡ Yaxshilanish kerak</p>
                        <ul className="space-y-0.5">
                          {data.improvements.map((s, i) => (
                            <li key={i} className="text-[10px] text-amber-700 flex items-start gap-1">
                              <span>•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ContentCard>

          <ContentCard className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-indigo-800">Umumiy fikr</h3>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{evaluation.generalFeedback}</div>
          </ContentCard>

          {modelAnswer && (
            <ContentCard className="mb-6">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Model javobni ko'rish
                </span>
                {showModelAnswer ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
              <AnimatePresence>
                {showModelAnswer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-b-xl p-5 mt-3">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <h3 className="font-semibold text-green-800 text-sm">Model Answer</h3>
                      </div>
                      <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{modelAnswer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ContentCard>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { setEvaluation(null); setActiveTab("practice"); setShowModelAnswer(false); }}
              className="flex-1 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 btn-macos"
            >
              <ChevronLeft className="w-4 h-4" /> Qayta yozish
            </button>
            {nextLesson && (
              <Link
                href={`/courses/writing/${nextLesson.id}`}
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
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.2),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/courses/writing"
            className="inline-flex items-center text-sm text-indigo-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Writing kursiga qaytish
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                {lesson.title}
              </h1>

              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                {breadcrumbItems.map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-indigo-400">·</span>}
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="flex items-center gap-1.5 text-indigo-200 text-sm">
                  <Clock className="w-4 h-4" />
                  {lesson.durationMin} daqiqa
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${diff.class}`}>{diff.label}</span>
                {lesson.isPremium ? (
                  <span className="text-xs font-medium text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded flex items-center gap-1 border border-amber-400/20">
                    <Star className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-300 bg-green-400/10 px-2.5 py-0.5 rounded flex items-center gap-1 border border-green-400/20">
                    <Zap className="w-3 h-3" /> Bepul
                  </span>
                )}
                {session && (
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded transition-colors ${
                      bookmarked ? "text-amber-300 bg-amber-400/10 border border-amber-400/20" : "text-indigo-200 hover:text-white"
                    }`}
                  >
                    {bookmarked ? <BookMarked className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                    {bookmarked ? "Saqlangan" : "Saqlash"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Tab Navigation ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={tabsRef}
            className="flex gap-1 overflow-x-auto py-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isFeedbackTab = tab.id === "feedback";
              if (isFeedbackTab && !evaluation) return null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-indigo-700 text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            {evaluation && (
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeTab === "feedback"
                    ? "bg-indigo-700 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Award className="w-4 h-4" />
                Natijalar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
