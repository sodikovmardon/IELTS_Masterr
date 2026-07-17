import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topicGroupId = searchParams.get("topicGroupId");
    const where = topicGroupId ? { topicGroupId } : {};
    const cards = await prisma.cueCard.findMany({
      where,
      include: { topicGroup: { select: { name: true, icon: true } } },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ cueCards: cards });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
