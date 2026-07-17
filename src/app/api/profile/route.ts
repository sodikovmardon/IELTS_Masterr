import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      bio: true,
      level: true,
      targetScore: true,
      streakCount: true,
      subscriptionPlan: true,
      subscriptionStatus: true,
      subscriptionExpiresAt: true,
      createdAt: true,
      lessonProgresses: { select: { completed: true } },
      mockExams: {
        orderBy: { completedAt: "desc" },
        take: 3,
        select: {
          id: true,
          overallBand: true,
          completedAt: true,
          listeningBand: true,
          readingBand: true,
          writingBand: true,
          speakingBand: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
  }

  const totalHours = Math.round(
    user.lessonProgresses.filter((p) => p.completed).length * 0.5
  );

  return NextResponse.json({
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    level: user.level,
    targetScore: user.targetScore,
    streakCount: user.streakCount,
    completedLessons: user.lessonProgresses.filter((p) => p.completed).length,
    totalHours,
    createdAt: user.createdAt.toISOString(),
    subscriptionPlan: user.subscriptionPlan,
    subscriptionStatus: user.subscriptionStatus,
    subscriptionExpiresAt: user.subscriptionExpiresAt?.toISOString() || null,
    mockExams: user.mockExams.map((m) => ({
      id: m.id,
      overallBand: m.overallBand,
      completedAt: m.completedAt?.toISOString(),
      listeningBand: m.listeningBand,
      readingBand: m.readingBand,
      writingBand: m.writingBand,
      speakingBand: m.speakingBand,
    })),
  });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, avatarUrl, bio, level, targetScore, currentPassword, newPassword } = body;

    const updateData: Record<string, any> = {};

    if (name !== undefined) updateData.name = name;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (bio !== undefined) updateData.bio = bio;
    if (level !== undefined) updateData.level = level;
    if (targetScore !== undefined) updateData.targetScore = targetScore;

    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json({ error: "Joriy parol noto'g'ri" }, { status: 400 });
      }

      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({ message: "Profil muvaffaqiyatli yangilandi" });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
