import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTopicMastery } from "@/lib/topic-mastery";

const readingPassages = [
  {
    id: "reading-1",
    title: "The History of the Internet",
    content: `The Internet has revolutionized the way we communicate, work, and live. 
It began as a military project called ARPANET in the 1960s, developed by the United States Department of Defense. 
The first successful message was sent on October 29, 1969, between UCLA and Stanford Research Institute.
In the 1980s, the development of TCP/IP protocols allowed different networks to connect with each other, creating a "network of networks."
Tim Berners-Lee invented the World Wide Web in 1989, making the Internet accessible to the general public through web browsers.
By the 2000s, the Internet had become an essential part of daily life for billions of people worldwide.
Today, technologies like fiber optics and 5G continue to push the boundaries of what is possible online.`,
    questions: [
      {
        question: "What was the original name of the Internet project?",
        options: ["World Wide Web", "ARPANET", "TCP/IP", "Stanford Net"],
        correctAnswer: 1,
      },
      {
        question: "When was the first message sent on this network?",
        options: ["1989", "1975", "1969", "1990"],
        correctAnswer: 2,
      },
      {
        question: "Who invented the World Wide Web?",
        options: ["Tim Berners-Lee", "Vint Cerf", "Bob Kahn", "Bill Gates"],
        correctAnswer: 0,
      },
    ],
    vocabulary: [
      { word: "revolutionized", meaning: "tamomila o'zgartirdi" },
      { word: "accessible", meaning: "foydalanish mumkin" },
      { word: "essential", meaning: "muhim, zaruriy" },
    ],
  },
  {
    id: "reading-2",
    title: "Climate Change and Its Effects",
    content: `Climate change is one of the most pressing challenges facing humanity today. 
Scientists have observed that global temperatures have risen by approximately 1.1°C since the pre-industrial era.
This warming is primarily caused by the increase of greenhouse gases such as carbon dioxide and methane in the atmosphere.
The consequences are already visible: melting polar ice caps, rising sea levels, and more frequent extreme weather events.
Many countries have pledged to reduce their carbon emissions under international agreements like the Paris Accord.
Transitioning to renewable energy sources, such as solar and wind power, is essential for mitigating these effects.
Individual actions, including reducing waste and conserving energy, also play a crucial role.`,
    questions: [
      {
        question: "How much have global temperatures increased since pre-industrial times?",
        options: ["0.5°C", "1.1°C", "2.0°C", "3.5°C"],
        correctAnswer: 1,
      },
      {
        question: "What is the main cause of global warming mentioned?",
        options: [
          "Solar activity",
          "Greenhouse gases",
          "Volcanic eruptions",
          "Deforestation",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does the Paris Accord primarily deal with?",
        options: [
          "Trade agreements",
          "Carbon emission reduction",
          "Military alliances",
          "Space exploration",
        ],
        correctAnswer: 1,
      },
    ],
    vocabulary: [
      { word: "pressing", meaning: "dolzarb, kechiktirib bo'lmaydigan" },
      { word: "mitigating", meaning: "yumshatish, kamaytirish" },
      { word: "transitioning", meaning: "o'tish, almashish" },
    ],
  },
];

export async function GET() {
  return NextResponse.json({ passages: readingPassages });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { practiceId, answers, passageId } = await req.json();

    const passage = readingPassages.find((p) => p.id === passageId);
    if (!passage) {
      return NextResponse.json({ error: "Matn topilmadi" }, { status: 404 });
    }

    let score = 0;
    passage.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    const attempt = await prisma.practiceAttempt.create({
      data: {
        userId,
        practiceId: practiceId || passageId,
        score,
        maxScore: passage.questions.length,
      },
    });

    await updateTopicMastery({
      userId,
      skill: "reading",
      subtopic: passage.title,
      correct: score >= passage.questions.length / 2,
    });

    return NextResponse.json({
      score,
      total: passage.questions.length,
      attemptId: attempt.id,
    });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
