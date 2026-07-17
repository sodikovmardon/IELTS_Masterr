import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getWeaknesses, getRecommendations, getRadarData } from "@/lib/topic-mastery";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        level: true,
        targetScore: true,
        streakCount: true,
        lastActiveDate: true,
      },
    });

    const testResults = await prisma.testResult.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    const practiceAttempts = await prisma.practiceAttempt.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    const flashcards = await prisma.flashcard.findMany({
      where: { userId },
    });

    const achievements = await prisma.achievement.findMany({
      where: { userId },
    });

    const recentHistory = await prisma.wordHistory.findMany({
      where: { userId },
      orderBy: { seenAt: "desc" },
      take: 10,
    });

    const dueReviews = flashcards.filter(
      (f) => new Date(f.nextReviewDate) <= new Date()
    ).length;

    const totalPracticeScore = practiceAttempts.reduce(
      (sum, a) => sum + a.score,
      0
    );
    const totalPracticeMax = practiceAttempts.reduce(
      (sum, a) => sum + a.maxScore,
      0
    );

    const [weaknesses, recommendations, radar] = await Promise.all([
      getWeaknesses(userId),
      getRecommendations(userId),
      getRadarData(userId),
    ]);

    return NextResponse.json({
      user,
      stats: {
        totalTests: testResults.length,
        totalPractice: practiceAttempts.length,
        totalFlashcards: flashcards.length,
        dueReviews,
        averageScore:
          totalPracticeMax > 0
            ? Math.round((totalPracticeScore / totalPracticeMax) * 100)
            : 0,
        achievements: achievements.length,
      },
      testResults,
      practiceAttempts,
      achievements,
      recentHistory,
      mastery: {
        weaknesses,
        recommendations,
        radar,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
