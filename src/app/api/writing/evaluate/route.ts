import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { essayText, lessonId, topic } = await req.json();
    
    // For now, use a rule-based evaluation since we don't have an AI API key
    // Generate scores based on essay characteristics
    const wordCount = essayText.split(/\s+/).filter(Boolean).length;
    
    // Simple heuristic scoring based on word count, structure indicators, etc.
    const hasIntro = /introduction|firstly|to begin|in my opinion/i.test(essayText);
    const hasConclusion = /conclusion|to conclude|in summary|overall|finally/i.test(essayText);
    const hasExamples = /for example|for instance|such as|specifically/i.test(essayText);
    const hasLinking = /however|therefore|moreover|furthermore|in addition|on the other hand/i.test(essayText);
    const complexVocab = /significant|substantial|consequently|inevitable|ultimately|predominantly/i.test(essayText);
    
    const taskAchievement = Math.min(9, Math.max(1, 
      4 + (wordCount > 150 ? 1 : 0) + (wordCount > 250 ? 1 : 0) + (hasExamples ? 1 : 0) + (hasIntro ? 0.5 : 0) + (hasConclusion ? 0.5 : 0)
    ));
    
    const coherenceCohesion = Math.min(9, Math.max(1,
      4 + (hasIntro ? 1 : 0) + (hasConclusion ? 1 : 0) + (hasLinking ? 1.5 : 0) + (essayText.split('\n').length > 3 ? 0.5 : 0)
    ));
    
    const lexicalResource = Math.min(9, Math.max(1,
      4 + (complexVocab ? 1.5 : 0) + (wordCount > 200 ? 1 : 0) + (wordCount > 300 ? 0.5 : 0)
    ));
    
    const grammaticalRange = Math.min(9, Math.max(1,
      4 + (essayText.split('.').length > 5 ? 0.5 : 0) + (essayText.split(',').length > 5 ? 0.5 : 0) + (hasLinking ? 1 : 0) + (wordCount > 200 ? 0.5 : 0)
    ));
    
    const overallBand = Math.round(((taskAchievement + coherenceCohesion + lexicalResource + grammaticalRange) / 4) * 2) / 2;
    
    return NextResponse.json({
      taskAchievement: { 
        score: taskAchievement, 
        feedback: taskAchievement >= 7 
          ? "Vazifani to'liq bajargan, asosiy fikrlarni yaxshi ifodalagan." 
          : "Vazifa bajarilgan, ammo ba'zi jihatlarni chuqurroq yoritish kerak." 
      },
      coherenceCohesion: { 
        score: coherenceCohesion, 
        feedback: coherenceCohesion >= 7 
          ? "Matn tuzilishi yaxshi, paragraflar mantiqiy bog'langan." 
          : "Paragraflar o'rtasida bog'liqlikni kuchaytirish kerak." 
      },
      lexicalResource: { 
        score: lexicalResource, 
        feedback: lexicalResource >= 7 
          ? "So'z boyligi yaxshi, mavzuga oid terminlarni qo'llay olgan." 
          : "So'z boyligini oshirish va sinonimlardan ko'proq foydalanish tavsiya etiladi." 
      },
      grammaticalRange: { 
        score: grammaticalRange, 
        feedback: grammaticalRange >= 7 
          ? "Grammatik tuzilmalar xilma-xil va xatolar kam." 
          : "Murakkab gap tuzilmalarini ko'proq qo'llash kerak." 
      },
      overallBand,
      generalFeedback: overallBand >= 7 
        ? "Yaxshi natija! Writing ko'nikmalaringiz yuqori darajada." 
        : "Yaxshilanishga joy bor. Har bir mezon bo'yicha tavsiyalarni o'qib chiqing.",
      wordCount
    });
  } catch (error) {
    return NextResponse.json({ error: "Baholashda xatolik yuz berdi" }, { status: 500 });
  }
}
