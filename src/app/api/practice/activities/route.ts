import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    const activities = await prisma.practiceActivity.findMany({
      orderBy: { estimatedMin: "asc" },
    });

    let highScores: Record<string, { score: number; comboCount: number }> = {};
    let todayAttemptCount = 0;
    let todayStreak = 0;

    if (userId) {
      const attempts = await prisma.practiceAttempt.findMany({
        where: { userId, isHighScore: true },
        select: { activityId: true, score: true, comboCount: true },
      });
      for (const a of attempts) {
        highScores[a.activityId] = { score: a.score, comboCount: a.comboCount };
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      todayAttemptCount = await prisma.practiceAttempt.count({
        where: { userId, attemptedAt: { gte: today, lt: tomorrow } },
      });

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { streakCount: true },
      });
      todayStreak = user?.streakCount || 0;
    }

    const dailyChallenge = await prisma.practiceActivity.findFirst({
      where: { isDaily: true, dailyDate: new Date().toISOString().slice(0, 10) },
    });

    return NextResponse.json({
      activities,
      highScores,
      dailyChallenge,
      todayAttemptCount,
      todayStreak,
    });
  } catch (error) {
    console.error("Practice activities GET error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
  }
  const userId = (session.user as any).id;
  const body = await req.json();
  const {
    activityId,
    score,
    maxScore,
    timeSpentSec,
    comboCount,
    attemptData,
  } = body;

  const activity = await prisma.practiceActivity.findUnique({
    where: { id: activityId },
  });
  if (!activity) {
    return NextResponse.json({ error: "Mashq topilmadi" }, { status: 404 });
  }

  const existingBest = await prisma.practiceAttempt.findFirst({
    where: { userId, activityId, isHighScore: true },
  });

  const isHighScore = !existingBest || score > existingBest.score;

  const attempt = await prisma.practiceAttempt.create({
    data: {
      userId,
      activityId,
      score,
      maxScore,
      timeSpentSec: timeSpentSec || 0,
      comboCount: comboCount || 0,
      isHighScore,
      attemptData: JSON.stringify(attemptData || {}),
    },
  });

  if (isHighScore && existingBest) {
    await prisma.practiceAttempt.update({
      where: { id: existingBest.id },
      data: { isHighScore: false },
    });
  }

  if (score > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttempts = await prisma.practiceAttempt.count({
      where: {
        userId,
        attemptedAt: { gte: today },
      },
    });

    if (todayAttempts >= 3) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { streakCount: true, lastActiveDate: true },
      });
      if (user) {
        const lastDate = user.lastActiveDate;
        const newStreak =
          lastDate && lastDate.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)
            ? (user.streakCount || 0) + 1
            : user.streakCount || 1;
        await prisma.user.update({
          where: { id: userId },
          data: { streakCount: newStreak, lastActiveDate: today },
        });
      }
    }
  }

  return NextResponse.json({
    attemptId: attempt.id,
    isHighScore,
    message: isHighScore ? "✨ Yangi rekord!" : "Natija saqlandi",
  });
}
