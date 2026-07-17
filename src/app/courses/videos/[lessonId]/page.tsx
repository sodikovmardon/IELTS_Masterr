"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Clock, ChevronRight } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { SmartContent } from "@/components/lesson";

interface LessonProgress {
  completed: boolean;
  score: number | null;
  maxScore: number | null;
  bookmarked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  difficulty: string;
  order: number;
  theoryContent: string;
  tipsAndTricks: string | null;
  commonMistakes: string | null;
  transcriptText: string | null;
  videoUrl: string | null;
  videoDurationSec: number | null;
  videoThumbnailUrl: string | null;
  progresses: LessonProgress[];
}

const CATEGORY_NAMES: Record<string, string> = {
  grammar: "Grammar", reading: "Reading", listening: "Listening",
  writing: "Writing", speaking: "Speaking", vocabulary: "Vocabulary",
};

export default function VideoLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    fetch(`/api/lessons/${lessonId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.lesson) setLesson(res.lesson);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-2">Video topilmadi</p>
          <Link href="/courses/videos" className="text-indigo-400 text-sm hover:underline">Video darslarga qaytish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/courses/videos"
            className="inline-flex items-center text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Video darslar
          </Link>
          <Link
            href={`/courses/${lesson.category}/${lesson.id}`}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            To'liq darsga o'tish <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4">
            <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              {CATEGORY_NAMES[lesson.category] || lesson.category} · Video dars
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Clock className="w-3.5 h-3.5" />
              <span>{lesson.durationMin} min</span>
              {lesson.videoDurationSec && (
                <>
                  <span className="text-white/20">·</span>
                  <span>{Math.floor(lesson.videoDurationSec / 60)}:{String(lesson.videoDurationSec % 60).padStart(2, "0")}</span>
                </>
              )}
            </div>
          </div>

          {lesson.videoUrl && (
            <div className="mb-8">
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                lessonId={lesson.id}
                transcriptText={lesson.transcriptText}
                title={lesson.title}
              />
            </div>
          )}

          {lesson.theoryContent && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-white/80 text-sm mb-3">Dars haqida</h3>
              <div className="text-white/60 text-sm leading-relaxed">
                <SmartContent text={lesson.theoryContent} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Link
              href={`/courses/${lesson.category}/${lesson.id}`}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-600 transition-all text-sm text-center"
            >
              To'liq darsni ochish → Amaliyot
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
