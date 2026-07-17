import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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
      subscriptionPlan: true,
      subscriptionStatus: true,
      subscriptionExpiresAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
  }

  try {
    const { plan } = await req.json();

    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return NextResponse.json({ error: "Noto'g'ri reja" }, { status: 400 });
    }

    const now = new Date();
    let expiresAt: Date;

    if (plan === "monthly") {
      expiresAt = new Date(now.setMonth(now.getMonth() + 1));
    } else {
      expiresAt = new Date(now.setFullYear(now.getFullYear() + 1));
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        subscriptionPlan: plan,
        subscriptionStatus: "active",
        subscriptionExpiresAt: expiresAt,
      },
    });

    await prisma.payment.create({
      data: {
        userId: session.user.id,
        plan,
        amount: plan === "monthly" ? 99000 : 799000,
        currency: "UZS",
        status: "pending",
        provider: null,
      },
    });

    return NextResponse.json({ message: "Obuna muvaffaqiyatli faollashtirildi" });
  } catch {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        subscriptionStatus: "cancelled",
      },
    });

    return NextResponse.json({ message: "Obuna bekor qilindi" });
  } catch {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
