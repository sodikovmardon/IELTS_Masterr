import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getWeaknesses, getRecommendations, getRadarData } from "@/lib/topic-mastery";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tmagan" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "all";

    const userId = session.user.id;

    const result: Record<string, unknown> = {};

    if (type === "all" || type === "weaknesses") {
      result.weaknesses = await getWeaknesses(userId);
    }
    if (type === "all" || type === "recommendations") {
      result.recommendations = await getRecommendations(userId);
    }
    if (type === "all" || type === "radar") {
      result.radar = await getRadarData(userId);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
