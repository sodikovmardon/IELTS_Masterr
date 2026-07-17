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
    const histories = await prisma.wordHistory.findMany({
      where: { userId },
      orderBy: { seenAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ histories });
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
    const { word, contextText, sourceTitle } = await req.json();

    const history = await prisma.wordHistory.create({
      data: {
        userId,
        word: word.toLowerCase(),
        contextText,
        sourceTitle,
      },
    });

    return NextResponse.json({ history }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
