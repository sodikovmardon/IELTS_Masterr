import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateTopicMastery, detectSubtopicFromTitle } from "@/lib/topic-mastery";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const { skill, subtopic, lessonTitle, correct } = await req.json();
    if (!skill) {
      return NextResponse.json({ error: "skill talab qilinadi" }, { status: 400 });
    }

    const detectedSubtopic = subtopic || (lessonTitle ? detectSubtopicFromTitle(lessonTitle) : "General");

    await updateTopicMastery({
      userId: session.user.id,
      skill,
      subtopic: detectedSubtopic,
      correct,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
