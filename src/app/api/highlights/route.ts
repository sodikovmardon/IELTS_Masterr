import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id;
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  const where: any = { userId };
  if (lessonId) where.lessonId = lessonId;

  const highlights = await prisma.highlight.findMany({ where, orderBy: { startOffset: "asc" } });
  return NextResponse.json({ highlights });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id;

  const { lessonId, selectedText, startOffset, endOffset, color, note } = await req.json();
  if (!lessonId || selectedText == null || startOffset == null || endOffset == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const highlight = await prisma.highlight.create({
    data: { userId, lessonId, selectedText, startOffset, endOffset, color: color || "yellow", note },
  });
  return NextResponse.json({ highlight }, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id;

  const { id, color, note } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const data: any = {};
  if (color !== undefined) data.color = color;
  if (note !== undefined) data.note = note;

  const highlight = await prisma.highlight.updateMany({ where: { id, userId }, data });
  return NextResponse.json({ highlight });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.highlight.deleteMany({ where: { id, userId } });
  return NextResponse.json({ message: "Deleted" });
}
