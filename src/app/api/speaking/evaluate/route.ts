import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let audio: Blob | null = null;
    let text = "";
    let lessonId = "";
    let questions = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const audioFile = formData.get("audio");
      if (audioFile instanceof Blob) audio = audioFile;
      text = (formData.get("text") as string) || "";
      lessonId = (formData.get("lessonId") as string) || "";
      questions = (formData.get("questions") as string) || "[]";
    } else {
      const body = await req.json();
      text = body.text || "";
      lessonId = body.lessonId || "";
      questions = body.questions || "[]";
    }

    if (!lessonId && !text.match(/CUE_CARD_PRACTICE/)) {
      return NextResponse.json({ error: "lessonId talab qilinadi" }, { status: 400 });
    }

    if (!text && !audio) {
      return NextResponse.json({ error: "text yoki audio talab qilinadi" }, { status: 400 });
    }

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    const hasLinking = /however|therefore|moreover|furthermore|in addition|on the other hand|nevertheless|consequently/i.test(text);
    const hasComplexVocab = /significant|substantial|consequently|inevitable|ultimately|predominantly|phenomenon|comprehensive|nevertheless/i.test(text);
    const hasFluencyIndicators = /actually|basically|generally|specifically|in my opinion|i believe|from my perspective|the main point/i.test(text);
    const hasHesitation = /um|uh|er|like|you know|i mean|sort of|kind of/i.test(text);
    const hasGrammaticalRange = /which|that|although|because|despite|while|whereas|having|being|would have|could have|should have/i.test(text);

    const fluencyCoherence = Math.min(9, Math.max(1, Math.round((
      4
      + (wordCount > 50 ? 0.5 : 0)
      + (wordCount > 100 ? 0.5 : 0)
      + (hasFluencyIndicators ? 1 : 0)
      + (hasLinking ? 1 : 0)
      + (avgWordsPerSentence > 10 ? 0.5 : 0)
      + (hasHesitation ? -0.5 : 0)
    ) * 2) / 2));

    const lexicalResource = Math.min(9, Math.max(1, Math.round((
      4
      + (hasComplexVocab ? 1.5 : 0)
      + (hasLinking ? 1 : 0)
      + (wordCount > 80 ? 0.5 : 0)
      + (wordCount > 120 ? 0.5 : 0)
    ) * 2) / 2));

    const grammaticalRange = Math.min(9, Math.max(1, Math.round((
      4
      + (hasGrammaticalRange ? 1.5 : 0)
      + (sentenceCount > 4 ? 0.5 : 0)
      + (sentenceCount > 8 ? 0.5 : 0)
      + (avgWordsPerSentence > 12 ? 0.5 : 0)
    ) * 2) / 2));

    const pronunciation = Math.min(9, Math.max(1, Math.round((
      5
      + (wordCount > 50 ? 0.5 : 0)
      + (!hasHesitation ? 0.5 : 0)
      + (audio ? 0.5 : 0)
    ) * 2) / 2));

    const overallBand = Math.round(((fluencyCoherence + lexicalResource + grammaticalRange + pronunciation) / 4) * 2) / 2;

    const needImprovement = "Yaxshilanishga joy bor. Ko'proq amaliyot qiling va quyidagi tavsiyalarga e'tibor bering.";
    const goodWork = "Yaxshi natija! Speaking ko'nikmalaringiz yaxshi darajada.";

    const evaluation = {
      fluencyCoherence: {
        score: fluencyCoherence,
        feedback: fluencyCoherence >= 7
          ? "Nutqingiz ravon va mantiqiy bog'langan. Fikrlarni izchil ifodalay olasiz."
          : "Nutq ravonligini oshirish va fikrlarni mantiqiy bog'lash ustida ishlang. Ko'proq bog'lovchi vositalardan foydalaning.",
      },
      lexicalResource: {
        score: lexicalResource,
        feedback: lexicalResource >= 7
          ? "So'z boyligingiz yaxshi, mavzuga oid turli leksikani qo'llay olasiz."
          : "So'z boyligingizni kengaytiring va sinonimlardan faolroq foydalaning.",
      },
      grammaticalRange: {
        score: grammaticalRange,
        feedback: grammaticalRange >= 7
          ? "Grammatik tuzilmalarni xilma-xil qo'llay olasiz, murakkab gaplar mavjud."
          : "Murakkab gap tuzilmalarini (that, which, although, despite) ko'proq qo'llashga harakat qiling.",
      },
      pronunciation: {
        score: pronunciation,
        feedback: pronunciation >= 7
          ? "Talaffuzingiz tushunarli va tabiiy."
          : "Talaffuz ustida ishlash tavsiya etiladi. So'zlarni aniq talaffuz qilishga e'tibor bering.",
      },
      overallBand,
      generalFeedback: overallBand >= 7 ? goodWork : needImprovement,
      wordCount,
    };

    const session = await getServerSession(authOptions);
    if (session?.user?.id && lessonId) {
      try {
        await prisma.speakingSubmission.create({
          data: {
            userId: session.user.id,
            lessonId,
            audioUrl: "",
            transcriptText: text,
            fluencyCoherence,
            lexicalResource,
            grammaticalRange,
            pronunciation,
            overallBand,
            feedback: JSON.stringify(evaluation),
          },
        });
      } catch {}
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json({ error: "Baholashda xatolik yuz berdi" }, { status: 500 });
  }
}
