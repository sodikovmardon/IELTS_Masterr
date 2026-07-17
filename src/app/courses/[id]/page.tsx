"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, CheckCircle, Lock } from "lucide-react";

const courseData: Record<
  string,
  {
    title: string;
    desc: string;
    lessons: {
      title: string;
      duration: string;
      free: boolean;
    }[];
  }
> = {
  reading: {
    title: "Reading",
    desc: "IELTS Reading bo'limi bo'yicha to'liq kurs. Skimming, scanning, detailed reading va boshqa strategiyalar.",
    lessons: [
      { title: "Skimming texnikasi", duration: "20 min", free: true },
      { title: "Scanning texnikasi", duration: "25 min", free: true },
      { title: "Detailed reading", duration: "30 min", free: true },
      { title: "True/False/Not Given savollari", duration: "35 min", free: false },
      { title: "Matching headings", duration: "30 min", free: false },
      { title: "Sentence completion", duration: "25 min", free: false },
      { title: "Multiple choice strategiyasi", duration: "30 min", free: false },
      { title: "Summary completion", duration: "25 min", free: false },
      { title: "Diagram labeling", duration: "20 min", free: false },
      { title: "Matching features", duration: "30 min", free: false },
      { title: "Table completion", duration: "25 min", free: false },
      { title: "Full reading practice test", duration: "60 min", free: false },
    ],
  },
  writing: {
    title: "Writing",
    desc: "IELTS Writing Task 1 va Task 2 bo'yicha strategiyalar va amaliyot.",
    lessons: [
      { title: "Task 1 - Ma'lumot tahlili", duration: "30 min", free: true },
      { title: "Task 1 - Trend va comparison", duration: "35 min", free: true },
      { title: "Task 1 - Process diagram", duration: "30 min", free: false },
      { title: "Task 2 - Essay tuzilishi", duration: "25 min", free: true },
      { title: "Task 2 - Opinion essays", duration: "35 min", free: false },
      { title: "Task 2 - Discussion essays", duration: "35 min", free: false },
      { title: "Task 2 - Problem/Solution essays", duration: "30 min", free: false },
      { title: "Cohesion va Coherence", duration: "25 min", free: false },
      { title: "Lexical Resource", duration: "20 min", free: false },
      { title: "Grammatical Range", duration: "25 min", free: false },
    ],
  },
  listening: {
    title: "Listening",
    desc: "IELTS Listening bo'limi uchun audio materiallar va strategiyalar.",
    lessons: [
      { title: "Section 1 - Social conversation", duration: "20 min", free: true },
      { title: "Section 2 - Monologue", duration: "25 min", free: true },
      { title: "Section 3 - Academic conversation", duration: "30 min", free: false },
      { title: "Section 4 - Academic lecture", duration: "35 min", free: false },
      { title: "Form completion", duration: "20 min", free: false },
      { title: "Note completion", duration: "25 min", free: false },
      { title: "Multiple choice (listening)", duration: "30 min", free: false },
      { title: "Full listening test", duration: "40 min", free: false },
    ],
  },
  speaking: {
    title: "Speaking",
    desc: "IELTS Speaking bo'limi uchun intervyu amaliyoti va strategiyalar.",
    lessons: [
      { title: "Part 1 - Introduction", duration: "20 min", free: true },
      { title: "Part 1 - Common topics", duration: "25 min", free: true },
      { title: "Part 2 - Cue card tahlili", duration: "30 min", free: false },
      { title: "Part 2 - Time management", duration: "25 min", free: false },
      { title: "Part 3 - Discussion", duration: "30 min", free: false },
      { title: "Fluency va Coherence", duration: "25 min", free: false },
      { title: "Pronunciation", duration: "20 min", free: false },
      { title: "Full speaking mock test", duration: "30 min", free: false },
    ],
  },
  grammar: {
    title: "Grammar",
    desc: "IELTS uchun muhim grammatik mavzular va qoidalar.",
    lessons: [
      { title: "Tenses - Present", duration: "25 min", free: true },
      { title: "Tenses - Past", duration: "25 min", free: true },
      { title: "Tenses - Future", duration: "20 min", free: true },
      { title: "Conditionals", duration: "30 min", free: false },
      { title: "Passive voice", duration: "25 min", free: false },
      { title: "Relative clauses", duration: "20 min", free: false },
      { title: "Modal verbs", duration: "25 min", free: false },
      { title: "Articles va prepositions", duration: "30 min", free: false },
      { title: "Conjunctions va linking words", duration: "25 min", free: false },
      { title: "Reported speech", duration: "20 min", free: false },
      { title: "Comparatives va superlatives", duration: "20 min", free: false },
      { title: "Advanced grammar structures", duration: "35 min", free: false },
      { title: "Error correction practice", duration: "30 min", free: false },
      { title: "Grammar review test", duration: "45 min", free: false },
      { title: "Full grammar workshop", duration: "60 min", free: false },
    ],
  },
  vocabulary: {
    title: "Vocabulary",
    desc: "IELTS uchun akademik so'z boyligini oshirish kursi.",
    lessons: [
      { title: "Academic Word List - 1", duration: "25 min", free: true },
      { title: "Academic Word List - 2", duration: "25 min", free: true },
      { title: "Topic: Education", duration: "20 min", free: true },
      { title: "Topic: Environment", duration: "25 min", free: false },
      { title: "Topic: Technology", duration: "25 min", free: false },
      { title: "Topic: Health", duration: "20 min", free: false },
      { title: "Collocations", duration: "30 min", free: false },
      { title: "Phrasal verbs", duration: "25 min", free: false },
      { title: "Synonyms va antonyms", duration: "20 min", free: false },
      { title: "Word formation", duration: "25 min", free: false },
      { title: "Idioms for IELTS", duration: "30 min", free: false },
      { title: "Vocabulary review test", duration: "30 min", free: false },
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const course = courseData[params.id as string];

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Kurs topilmadi
        </h1>
        <Link
          href="/courses"
          className="text-primary font-medium hover:underline"
        >
          Barcha kurslarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/courses"
        className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Barcha kurslar
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600">{course.desc}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessons.length} dars
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {course.lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                {lesson.free ? (
                  <CheckCircle className="w-5 h-5 text-accent-mint" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-300" />
                )}
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {lesson.title}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {lesson.duration}
                    </span>
                    {lesson.free && (
                      <span className="text-xs text-accent-mint font-medium">
                        Bepul
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {lesson.free ? (
                <button className="text-primary text-sm font-medium hover:underline">
                  Boshlash
                </button>
              ) : (
                <span className="text-xs text-gray-400">Premium</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
