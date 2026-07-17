import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { lessonId, score, maxScore, completed, answers, bookmarked } =
      await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: "lessonId talab qilinadi" },
        { status: 400 }
      );
    }

    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        score: score ?? existing?.score,
        maxScore: maxScore ?? existing?.maxScore,
        completed: completed ?? existing?.completed,
        bookmarked: bookmarked ?? existing?.bookmarked,
        answers: answers ?? existing?.answers,
        lastAttemptAt: new Date(),
        attempts: completed
          ? (existing?.attempts ?? 0) + 1
          : existing?.attempts ?? 0,
      },
      create: {
        userId,
        lessonId,
        score: score ?? 0,
        maxScore: maxScore ?? 0,
        completed: completed ?? false,
        bookmarked: bookmarked ?? false,
        answers: answers ?? "[]",
        attempts: completed ? 1 : 0,
        lastAttemptAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
