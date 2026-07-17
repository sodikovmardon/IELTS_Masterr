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
    const achievements = await prisma.achievement.findMany({
      where: { userId },
      orderBy: { earnedAt: "desc" },
    });

    return NextResponse.json({ achievements });
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
    const { badgeName } = await req.json();

    const existing = await prisma.achievement.findFirst({
      where: { userId, badgeName },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Bu yutuqni allaqachon olgansiz" },
        { status: 400 }
      );
    }

    const achievement = await prisma.achievement.create({
      data: { userId, badgeName },
    });

    return NextResponse.json({ achievement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
