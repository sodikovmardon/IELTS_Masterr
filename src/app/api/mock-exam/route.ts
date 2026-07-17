import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const exam = await prisma.mockExam.create({
    data: {
      userId: session.user.id,
      status: "in_progress",
    },
  });

  return NextResponse.json({ exam });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const exams = await prisma.mockExam.findMany({
    where: { userId: session.user.id, ...(status ? { status } : {}) },
    include: { sections: true },
    orderBy: { startedAt: "desc" },
  });

  return NextResponse.json({ exams });
}
