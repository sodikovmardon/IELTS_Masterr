import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const groups = await prisma.speakingTopicGroup.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { cueCards: true } } },
    });
    return NextResponse.json({ groups });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
