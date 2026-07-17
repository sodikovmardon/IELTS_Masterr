import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const submissions = await prisma.writingSubmission.findMany({
      where: { userId: session.user.id },
      orderBy: { submittedAt: "desc" },
      include: {
        lesson: { select: { title: true } },
      },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const body = await req.json();
    const {
      lessonId,
      essayText,
      wordCount,
      taskAchievement,
      coherenceCohesion,
      lexicalResource,
      grammaticalRange,
      overallBand,
      feedback,
    } = body;

    if (!lessonId || !essayText) {
      return NextResponse.json({ error: "lessonId va essayText talab qilinadi" }, { status: 400 });
    }

    const submission = await prisma.writingSubmission.create({
      data: {
        userId: session.user.id,
        lessonId,
        essayText,
        wordCount: wordCount || 0,
        taskAchievement: taskAchievement || null,
        coherenceCohesion: coherenceCohesion || null,
        lexicalResource: lexicalResource || null,
        grammaticalRange: grammaticalRange || null,
        overallBand: overallBand || null,
        feedback: feedback || null,
      },
    });

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
