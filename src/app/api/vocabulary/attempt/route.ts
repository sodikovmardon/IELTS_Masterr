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

    const { lessonId, score, missedWords } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    const attempt = await prisma.vocabularyAttempt.create({
      data: {
        userId: session.user.id,
        lessonId,
        score: score ?? 0,
        missedWords: JSON.stringify(missedWords ?? []),
      },
    });

    if (missedWords && missedWords.length > 0) {
      const words = await prisma.vocabularyWord.findMany({
        where: { lessonId, word: { in: missedWords } },
      });

      for (const w of words) {
        const existing = await prisma.flashcard.findFirst({
          where: { userId: session.user.id, word: w.word.toLowerCase() },
        });
        if (!existing) {
          await prisma.flashcard.create({
            data: {
              userId: session.user.id,
              word: w.word.toLowerCase(),
              meaning: w.meaning,
              translation: w.translation,
              nextReviewDate: new Date(),
              repetitionLevel: 0,
            },
          });
        }
      }
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { title: true },
    });

    if (lesson) {
      await updateTopicMastery({
        userId: session.user.id,
        skill: "vocabulary",
        subtopic: detectSubtopicFromTitle(lesson.title),
        correct: missedWords ? missedWords.length === 0 : (score ?? 0) > 0,
      });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
