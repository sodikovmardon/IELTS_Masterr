import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateStudyPlan } from "@/lib/utils";
import { getWeaknesses } from "@/lib/topic-mastery";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const plans = await prisma.studyPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ plans });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { currentLevel, targetScore, hoursPerWeek, durationWeeks } = await req.json();

    // Fetch user's weak areas for personalized plan
    const weaknesses = await getWeaknesses(userId);
    const weakAreas = weaknesses
      .filter((w) => w.status === "weak")
      .map((w) => ({ subtopic: w.subtopic, skill: w.skill, errorRate: w.errorRate }));

    const planData = generateStudyPlan(currentLevel, targetScore, hoursPerWeek, durationWeeks, weakAreas);

    const plan = await prisma.studyPlan.create({
      data: {
        userId,
        currentLevel,
        targetScore,
        hoursPerWeek,
        durationWeeks,
        planData: JSON.stringify(planData),
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { targetScore, level: currentLevel },
    });

    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}