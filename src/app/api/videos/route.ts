import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const lessons = await prisma.lesson.findMany({
      where: { videoUrl: { not: null } },
      orderBy: [{ category: "asc" }, { order: "asc" }],
      include: userId
        ? { progresses: { where: { userId }, take: 1 } }
        : undefined,
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
