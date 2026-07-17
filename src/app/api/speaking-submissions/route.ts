import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const submissions = await prisma.speakingSubmission.findMany({
      where: { userId: session.user.id },
      orderBy: { submittedAt: "desc" },
      include: {
        lesson: { select: { title: true } },
      },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
