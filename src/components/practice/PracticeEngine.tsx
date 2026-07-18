"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SpeedVocabulary from "./SpeedVocabulary";
import GrammarSprint from "./GrammarSprint";
import ErrorSpotting from "./ErrorSpotting";
import WordAssociation from "./WordAssociation";
import SentenceBuilder from "./SentenceBuilder";
import MiniReading from "./MiniReading";
import PronunciationChallenge from "./PronunciationChallenge";
import ListeningSnippet from "./ListeningSnippet";
import MixedReview from "./MixedReview";
import ResultScreen from "./ResultScreen";

interface PracticeActivity {
  id: string;
  type: string;
  title: string;
  icon: string;
  category: string;
  data: string;
  estimatedMin: number;
}

interface Props {
  activity: PracticeActivity;
  onBack: () => void;
}

export default function PracticeEngine({ activity, onBack }: Props) {
  const { data: session } = useSession();
  const [phase, setPhase] = useState<"playing" | "result">("playing");
  const [result, setResult] = useState<{
    score: number;
    maxScore: number;
    timeSpent: number;
    comboCount: number;
    isHighScore: boolean;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const parsed = JSON.parse(activity.data);

  const handleComplete = useCallback(
    async (score: number, maxScore: number, timeSpent: number, comboCount: number, answers: number[]) => {
      setPhase("result");

      let isHighScore = false;

      if (session?.user) {
        setSaving(true);
        try {
          const res = await fetch("/api/practice/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              activityId: activity.id,
              score,
              maxScore,
              timeSpentSec: timeSpent,
              comboCount,
              attemptData: { answers },
            }),
          });
          const data = await res.json();
          isHighScore = data.isHighScore;
        } catch (e) {
          console.error(e);
        } finally {
          setSaving(false);
        }
      }

      setResult({ score, maxScore, timeSpent, comboCount, isHighScore });
    },
    [activity.id, session]
  );

  const renderGame = () => {
    const props = { data: parsed, onComplete: handleComplete };

    switch (activity.type) {
      case "speed_vocab":
        return <SpeedVocabulary {...props as any} />;
      case "grammar_sprint":
        return <GrammarSprint {...props as any} />;
      case "error_spotting":
        return <ErrorSpotting {...props as any} />;
      case "word_association":
        return <WordAssociation {...props as any} />;
      case "sentence_builder":
        return <SentenceBuilder {...props as any} />;
      case "mini_reading":
        return <MiniReading {...props as any} />;
      case "pronunciation":
        return <PronunciationChallenge {...props as any} />;
      case "listening_snippet":
        return <ListeningSnippet {...props as any} />;
      case "mixed_review":
      case "daily_challenge":
        return <MixedReview {...props as any} />;
      default:
        return <div>Unknown exercise type: {activity.type}</div>;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Mashqlar
        </button>
        <span className="text-gray-300">/</span>
        <div className="flex items-center gap-2">
          <span className="text-lg">{activity.icon}</span>
          <h1 className="text-lg font-bold text-gray-900">{activity.title}</h1>
        </div>
      </div>

      <motion.div key={phase}>
        {phase === "playing" ? (
          renderGame()
        ) : result ? (
          <ResultScreen
            score={result.score}
            maxScore={result.maxScore}
            timeSpentSec={result.timeSpent}
            comboCount={result.comboCount}
            isHighScore={result.isHighScore}
            onRetry={() => {
              setPhase("playing");
              setResult(null);
            }}
            onHome={onBack}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">{saving ? "Natija saqlanmoqda..." : "Yuklanmoqda..."}</div>
        )}
      </motion.div>
    </div>
  );
}
