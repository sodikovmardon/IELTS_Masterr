"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mic,
  PenTool,
  Headphones,
  ChevronRight,
  Play,
} from "lucide-react";

const courses = [
  {
    id: "reading",
    title: "Reading",
    desc: "IELTS Reading passage'larini tahlil qilish, skimming va scanning usullari",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
    lessons: 12,
    level: "Barcha darajalar",
  },
  {
    id: "writing",
    title: "Writing",
    desc: "Task 1 (ma'lumot tahlili) va Task 2 (essey) yozish strategiyalari",
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
    lessons: 10,
    level: "O'rta+",
  },
  {
    id: "listening",
    title: "Listening",
    desc: "Audio materiallar asosida tinglab tushunish ko'nikmalarini rivojlantirish",
    icon: <Headphones className="w-6 h-6" />,
    color: "bg-amber-100 text-amber-600",
    lessons: 8,
    level: "Barcha darajalar",
  },
  {
    id: "speaking",
    title: "Speaking",
    desc: "Part 1, 2 va 3 uchun intervyu uslubidagi amaliy mashg'ulotlar",
    icon: <Mic className="w-6 h-6" />,
    color: "bg-rose-100 text-rose-600",
    lessons: 8,
    level: "O'rta+",
  },
  {
    id: "grammar",
    title: "Grammar",
    desc: "IELTS uchun zarur bo'lgan grammatik qoidalar va ularni qo'llash",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-emerald-100 text-emerald-600",
    lessons: 15,
    level: "Barcha darajalar",
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    desc: "Akademik so'z boyligini oshirish va ularni kontekstda ishlatish",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-cyan-100 text-cyan-600",
    lessons: 12,
    level: "Barcha darajalar",
  },
];

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kurslar</h1>
        <p className="text-gray-600">
          IELTSning barcha bo'limlari bo'yicha to'liq kurslar
        </p>
      </motion.div>

      {/* Video Darslar card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/courses/videos">
          <div className="glass-card bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl shadow-macos p-5 hover:shadow-macos hover:border-indigo-500/40 transition-all flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
              <Play className="w-6 h-6 text-white ml-0.5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Video Darslar
              </h3>
              <p className="text-gray-500 text-sm">
                IELTSning barcha bo'limlari bo'yicha video darsliklar to'plami
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/courses/${course.id}`}>
              <div className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 hover:shadow-macos hover:border-primary/20 transition-all h-full flex flex-col">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${course.color}`}
                >
                  {course.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 mb-4">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{course.lessons} dars</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {course.level}
                  </span>
                </div>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  Batafsil <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
