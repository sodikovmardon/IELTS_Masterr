"use client";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import SwipeableFlashcard from "./SwipeableFlashcard";
import QuizMode from "./QuizMode";
import WritingMode from "./WritingMode";
import SpeedMode from "./SpeedMode";
import SessionResult from "./SessionResult";

interface FlashcardData {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  visualIcon: string;
  category?: string | null;
  masteryStatus?: string;
  nextReviewDate: string;
  repetitionLevel: number;
}

interface Props {
  cards: FlashcardData[];
  mode: "review" | "quiz" | "writing" | "speed";
  onBack: () => void;
  onRefresh: () => void;
}

export default function SessionManager({ cards, mode, onBack, onRefresh }: Props) {
  const { data: session } = useSession();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [phase, setPhase] = useState<"playing" | "result">("playing");
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [score, setScore] = useState(0);
  const [swiped, setSwiped] = useState<Set<string>>(new Set());

  const saveResult = useCallback(async (id: string, correct: boolean) => {
    if (session) {
      try {
        await fetch("/api/flashcards", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, correct }),
        });
      } catch (e) { console.error(e); }
    }
  }, [session]);

  const handleSwipe = useCallback(async (direction: "left" | "right") => {
    const card = cards[reviewIndex];
    if (!card || swiped.has(card.id)) return;
    const correct = direction === "right";
    setSwiped((s) => new Set(s).add(card.id));
    if (correct) setScore((s) => s + 1);
    setFlipped(false);
    await saveResult(card.id, correct);
    if (reviewIndex >= cards.length - 1) {
      setPhase("result");
      setResult({ score: score + (correct ? 1 : 0), total: cards.length });
    } else {
      setReviewIndex((i) => i + 1);
    }
  }, [cards, reviewIndex, swiped, score, saveResult]);

  const handleGameComplete = useCallback(async (finalScore: number, total: number) => {
    setResult({ score: finalScore, total });
    setPhase("result");

    if (session && mode !== "review") {
      for (let i = 0; i < cards.length; i++) {
        await saveResult(cards[i].id, i < finalScore);
      }
    }
  }, [session, cards, mode, saveResult]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Hozircha hech qanday karta yo'q</p>
        <button onClick={onBack} className="mt-4 text-primary hover:underline text-sm">Orqaga</button>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <SessionResult
        score={result.score}
        total={result.total}
        mode={mode}
        onRetry={() => { setPhase("playing"); setResult(null); setReviewIndex(0); setScore(0); setFlipped(false); setSwiped(new Set()); }}
        onHome={onBack}
      />
    );
  }

  if (mode === "review") {
    const card = cards[reviewIndex];

    return (
      <div>
        <SwipeableFlashcard
          card={card}
          key={card.id}
          index={reviewIndex}
          total={cards.length}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onSwipe={handleSwipe}
        />
      </div>
    );
  }

  if (mode === "quiz") {
    return <QuizMode cards={cards} onComplete={handleGameComplete} />;
  }

  if (mode === "writing") {
    return <WritingMode cards={cards} onComplete={handleGameComplete} />;
  }

  if (mode === "speed") {
    return <SpeedMode cards={cards} onComplete={handleGameComplete} />;
  }

  return null;
}
