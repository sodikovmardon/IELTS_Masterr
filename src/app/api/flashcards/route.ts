import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    const where: any = { userId };
    if (category && category !== "all") where.category = category;
    if (status && status !== "all") where.masteryStatus = status;
    if (search) where.word = { contains: search };

    const flashcards = await prisma.flashcard.findMany({
      where,
      orderBy: { nextReviewDate: "asc" },
    });

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const dueCount = await prisma.flashcard.count({
      where: { userId, nextReviewDate: { lte: todayEnd } },
    });

    const categories = await prisma.flashcard.groupBy({
      by: ["category"],
      where: { userId, category: { not: null } },
      _count: { category: true },
    });

    const calendarData: Record<string, number> = {};
    const flashcardsAll = await prisma.flashcard.findMany({
      where: { userId },
      select: { nextReviewDate: true },
    });
    for (const f of flashcardsAll) {
      const key = f.nextReviewDate.toISOString().slice(0, 10);
      calendarData[key] = (calendarData[key] || 0) + 1;
    }

    const totalCount = await prisma.flashcard.count({ where: { userId } });
    const masteredCount = await prisma.flashcard.count({
      where: { userId, masteryStatus: "mastered" },
    });
    const learningCount = await prisma.flashcard.count({
      where: { userId, masteryStatus: "learning" },
    });

    return NextResponse.json({
      flashcards,
      stats: { dueCount, totalCount, masteredCount, learningCount, calendarData },
      categories: categories.map((c) => ({ name: c.category, count: c._count.category })),
    });
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
    const { word, meaning, translation, visualIcon, category } = await req.json();

    const existing = await prisma.flashcard.findFirst({
      where: { userId, word: word.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu so'z allaqachon flashcardsda mavjud" },
        { status: 400 }
      );
    }

    const flashcard = await prisma.flashcard.create({
      data: {
        userId,
        word: word.toLowerCase(),
        meaning,
        translation,
        visualIcon: visualIcon || "📝",
        category: category || "General",
      },
    });
    return NextResponse.json({ flashcard }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const { id, correct } = await req.json();

    const flashcard = await prisma.flashcard.findFirst({
      where: { id, userId },
    });
    if (!flashcard) {
      return NextResponse.json({ error: "Flashcard topilmadi" }, { status: 404 });
    }

    const newLevel = correct
      ? Math.min(flashcard.repetitionLevel + 1, 7)
      : Math.max(flashcard.repetitionLevel - 1, 0);

    const intervals = [0, 1, 3, 7, 14, 30, 60, 120];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervals[newLevel]);

    let masteryStatus = flashcard.masteryStatus;
    if (newLevel >= 5) masteryStatus = "mastered";
    else if (newLevel >= 2) masteryStatus = "learning";

    const updated = await prisma.flashcard.update({
      where: { id },
      data: { repetitionLevel: newLevel, nextReviewDate: nextDate, masteryStatus },
    });

    return NextResponse.json({ flashcard: updated });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const { id } = await req.json();

    await prisma.flashcard.deleteMany({ where: { id, userId } });
    return NextResponse.json({ message: "Flashcard o'chirildi" });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
