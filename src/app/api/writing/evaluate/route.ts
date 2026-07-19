import { NextResponse } from "next/server";
import { evaluateWriting } from "@/lib/writingEvaluator";

export async function POST(req: Request) {
  try {
    const { essayText, lessonId, topic } = await req.json();

    if (!essayText || essayText.trim().length < 20) {
      return NextResponse.json(
        { error: "Matn juda qisqa. Kamida 20 belgidan iborat essay yozing." },
        { status: 400 }
      );
    }

    const result = await evaluateWriting(essayText, topic || "Writing Task");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Writing evaluation error:", error);
    return NextResponse.json(
      { error: "Baholashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
