import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");
    if (!lessonId) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    const vp = await prisma.videoProgress.findUnique({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId },
      },
    });

    return NextResponse.json({ videoProgress: vp || { watchedPercent: 0, completed: false } });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const { lessonId, watchedPercent } = await req.json();
    if (!lessonId || watchedPercent === undefined) {
      return NextResponse.json({ error: "lessonId va watchedPercent talab qilinadi" }, { status: 400 });
    }

    const completed = watchedPercent >= 80;

    const vp = await prisma.videoProgress.upsert({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId },
      },
      update: {
        watchedPercent: Math.max(watchedPercent, 0),
        completed,
      },
      create: {
        userId: session.user.id,
        lessonId,
        watchedPercent: Math.max(watchedPercent, 0),
        completed,
      },
    });

    return NextResponse.json({ videoProgress: vp });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
