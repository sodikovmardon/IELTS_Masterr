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

    const body = await req.json();
    const { lessonId, score, answers } = body;

    if (!lessonId || score === undefined) {
      return NextResponse.json({ error: "lessonId va score talab qilinadi" }, { status: 400 });
    }

    const attempt = await prisma.listeningAttempt.create({
      data: {
        userId: session.user.id,
        lessonId,
        score,
        answers: answers || "[]",
      },
    });

    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId },
      },
      update: {
        score,
        completed: true,
        answers: answers || "[]",
        attempts: { increment: 1 },
        lastAttemptAt: new Date(),
      },
      create: {
        userId: session.user.id,
        lessonId,
        score,
        maxScore: 0,
        completed: true,
        answers: answers || "[]",
        attempts: 1,
        lastAttemptAt: new Date(),
      },
    });

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { title: true },
    });

    if (lesson) {
      await updateTopicMastery({
        userId: session.user.id,
        skill: "listening",
        subtopic: detectSubtopicFromTitle(lesson.title),
        correct: score > 0,
      });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
