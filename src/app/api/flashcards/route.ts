import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const flashcards = await prisma.flashcard.findMany({
      where: { userId },
      orderBy: { nextReviewDate: "asc" },
    });

    return NextResponse.json({ flashcards });
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
    const { word, meaning, translation, visualIcon } = await req.json();

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

    const updated = await prisma.flashcard.update({
      where: { id },
      data: {
        repetitionLevel: newLevel,
        nextReviewDate: nextDate,
      },
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

    await prisma.flashcard.deleteMany({
      where: { id, userId },
    });

    return NextResponse.json({ message: "Flashcard o'chirildi" });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
