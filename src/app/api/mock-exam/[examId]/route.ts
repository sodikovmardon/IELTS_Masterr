import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { listeningScoreToBand, readingScoreToBand, avgBandToOverall } from "@/lib/ielts";

export async function GET(req: Request, { params }: { params: Promise<{ examId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { examId } = await params;
  const exam = await prisma.mockExam.findUnique({
    where: { id: examId, userId: session.user.id },
    include: { sections: true },
  });
  if (!exam) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ exam });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ examId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { examId } = await params;
  const body = await req.json();
  const { status, answers, sectionType, timeSpentSec, score } = body;

  const updateData: any = {};

  if (status) updateData.status = status;
  if (status === "completed") updateData.completedAt = new Date();

  if (sectionType) {
    const section = await prisma.mockExamSection.upsert({
      where: { id: `${examId}_${sectionType}` },
      update: {
        answers: answers ? JSON.stringify(answers) : undefined,
        score: score ?? undefined,
        timeSpentSec: timeSpentSec ?? undefined,
      },
      create: {
        id: `${examId}_${sectionType}`,
        mockExamId: examId,
        sectionType,
        answers: answers ? JSON.stringify(answers) : "{}",
        score: score ?? 0,
        timeSpentSec: timeSpentSec ?? 0,
      },
    });

    // Calculate band
    let band: number | null = null;
    if (sectionType === "listening" && score !== undefined) {
      band = listeningScoreToBand(score);
      updateData.listeningScore = score;
      updateData.listeningBand = band;
    } else if (sectionType === "reading" && score !== undefined) {
      band = readingScoreToBand(score);
      updateData.readingScore = score;
      updateData.readingBand = band;
    }

    // Update overall band
    const exam = await prisma.mockExam.findUnique({ where: { id: examId } });
    if (exam) {
      const bands = [exam.listeningBand, exam.readingBand, exam.writingBand, exam.speakingBand].filter((b): b is number => b !== null);
      if (sectionType === "listening" && band !== null) bands.push(band);
      if (sectionType === "reading" && band !== null) bands.push(band);
      if (bands.length > 0) updateData.overallBand = avgBandToOverall(bands);
    }
  }

  const exam = await prisma.mockExam.update({
    where: { id: examId },
    data: updateData,
  });

  return NextResponse.json({ exam });
}
