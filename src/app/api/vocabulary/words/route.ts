import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    const words = await prisma.vocabularyWord.findMany({
      where: { lessonId },
      orderBy: { word: "asc" },
    });

    return NextResponse.json({ words });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
