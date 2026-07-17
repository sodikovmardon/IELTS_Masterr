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
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
    });

    return NextResponse.json({ certificates });
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
    const { category } = await req.json();

    if (!category) {
      return NextResponse.json(
        { error: "category talab qilinadi" },
        { status: 400 }
      );
    }

    const certificate = await prisma.certificate.create({
      data: {
        userId,
        category,
      },
    });

    return NextResponse.json({ certificate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
