import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const userId = searchParams.get("userId");

    const where: any = {};
    if (category) where.category = category;

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: { order: "asc" },
      include:
        userId
          ? {
              progresses: {
                where: { userId },
              },
            }
          : undefined,
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, score, maxScore, completed, bookmarked, answers, attempts } = body;

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    const data: any = {};
    if (score !== undefined) data.score = score;
    if (maxScore !== undefined) data.maxScore = maxScore;
    if (completed !== undefined) data.completed = completed;
    if (bookmarked !== undefined) data.bookmarked = bookmarked;
    if (answers !== undefined) data.answers = answers;
    if (attempts !== undefined) data.attempts = attempts;
    data.lastAttemptAt = new Date();

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId },
      },
      update: data,
      create: {
        userId: session.user.id,
        lessonId,
        score: score ?? null,
        maxScore: maxScore ?? null,
        completed: completed ?? false,
        bookmarked: bookmarked ?? false,
        answers: answers ?? "[]",
        attempts: attempts ?? 1,
        lastAttemptAt: new Date(),
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
