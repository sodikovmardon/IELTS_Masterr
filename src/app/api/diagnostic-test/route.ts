import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateLevel } from "@/lib/utils";

const questions = [
  {
    question: "What is the main idea of the passage?",
    options: [
      "Climate change effects",
      "Economic development",
      "Technological innovation",
      "Social inequality",
    ],
    correctAnswer: 0,
  },
  {
    question: "Choose the correct form: She ___ to the store yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: 2,
  },
  {
    question: "The word 'ubiquitous' most nearly means:",
    options: ["rare", "everywhere", "dangerous", "beautiful"],
    correctAnswer: 1,
  },
  {
    question: "Identify the error: 'He don't like coffee.'",
    options: ["He", "don't", "like", "coffee"],
    correctAnswer: 1,
  },
  {
    question: "Which sentence is correctly punctuated?",
    options: [
      "Its a beautiful day",
      "It's a beautiful day",
      "Its' a beautiful day",
      "It is a beautiful day",
    ],
    correctAnswer: 1,
  },
  {
    question: "The opposite of 'abundant' is:",
    options: ["plentiful", "scarce", "ample", "sufficient"],
    correctAnswer: 1,
  },
  {
    question: "Complete: 'If I ___ rich, I would travel the world.'",
    options: ["am", "was", "were", "be"],
    correctAnswer: 2,
  },
  {
    question: "What does the idiom 'break the ice' mean?",
    options: [
      "To freeze water",
      "To start a conversation",
      "To destroy something",
      "To cool down",
    ],
    correctAnswer: 1,
  },
  {
    question: "Choose the correct preposition: 'She is interested ___ learning languages.'",
    options: ["on", "at", "in", "for"],
    correctAnswer: 2,
  },
  {
    question: "The word 'ephemeral' means:",
    options: ["permanent", "short-lived", "colorful", "heavy"],
    correctAnswer: 1,
  },
  {
    question: "Which tense is used: 'They have been waiting for an hour.'",
    options: [
      "Present simple",
      "Present perfect continuous",
      "Past simple",
      "Future continuous",
    ],
    correctAnswer: 1,
  },
  {
    question: "The main purpose of an IELTS Task 1 essay is to:",
    options: [
      "Persuade the reader",
      "Describe data or a process",
      "Tell a story",
      "Argue a point",
    ],
    correctAnswer: 1,
  },
];

export async function GET() {
  return NextResponse.json({ questions });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
    }

    const { answers } = await req.json();
    const userId = (session.user as any).id;

    let score = 0;
    answers.forEach((answer: number, index: number) => {
      if (answer === questions[index].correctAnswer) score++;
    });

    const level = calculateLevel(score, questions.length);
    const maxScore = questions.length;

    await prisma.testResult.create({
      data: {
        userId,
        score,
        maxScore,
        level,
        testType: "diagnostic",
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { level },
    });

    return NextResponse.json({ score, total: questions.length, level });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}