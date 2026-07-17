import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTopicMastery, detectSubtopicFromTitle } from "@/lib/topic-mastery";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const { lessonId, score, mistakesByType } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    const attempt = await prisma.grammarAttempt.create({
      data: {
        userId: session.user.id,
        lessonId,
        score: score ?? 0,
        mistakesByType: mistakesByType ?? "{}",
      },
    });

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { title: true, questions: true },
    });

    if (lesson) {
      const questions = JSON.parse(lesson.questions || "[]");
      const total = questions.length || 1;
      const correct = Math.min(score ?? 0, total);

      await updateTopicMastery({
        userId: session.user.id,
        skill: "grammar",
        subtopic: detectSubtopicFromTitle(lesson.title),
        correct: correct >= total / 2,
      });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
