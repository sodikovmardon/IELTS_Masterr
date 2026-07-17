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
    const { lessonId, bookmarked } = await req.json();

    if (!lessonId || bookmarked === undefined) {
      return NextResponse.json(
        { error: "lessonId va bookmarked talab qilinadi" },
        { status: 400 }
      );
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { bookmarked },
      create: {
        userId,
        lessonId,
        bookmarked,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
