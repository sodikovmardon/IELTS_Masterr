"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Trash2,
  Layers,
  Volume2,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Flashcard {
  id: string;
  word: string;
  meaning: string | null;
  translation: string | null;
  nextReviewDate: string;
  repetitionLevel: number;
}

export default function FlashcardsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [mode, setMode] = useState<"list" | "review">("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status !== "authenticated") return;

    fetch("/api/flashcards")
      .then((r) => r.json())
      .then((data) => {
        setFlashcards(data.flashcards);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status, router]);

  const handleReview = async (correct: boolean) => {
    const flashcard = flashcards[currentIndex];
    try {
      await fetch("/api/flashcards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: flashcard.id, correct }),
      });

      const updated = await fetch("/api/flashcards").then((r) => r.json());
      setFlashcards(updated.flashcards);
    } catch (e) {
      console.error(e);
    }
    setShowMeaning(false);

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMode("list");
      setCurrentIndex(0);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/flashcards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setFlashcards(flashcards.filter((f) => f.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlayAudio = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const dueFlashcards = flashcards.filter(
    (f) => new Date(f.nextReviewDate) <= new Date()
  );

  if (mode === "review" && flashcards.length > 0) {
    const current = flashcards[currentIndex];

    if (!current) {
      setMode("list");
      return null;
    }

    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <Layers className="w-10 h-10 text-primary mx-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-900">
            Flashcard Review
          </h2>
          <p className="text-sm text-gray-500">
            {currentIndex + 1} / {flashcards.length}
          </p>
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          className="glass-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-8 text-center min-h-[250px] flex flex-col items-center justify-center"
        >
          <button
            onClick={() => handlePlayAudio(current.word)}
            className="p-2 bg-gray-100 rounded-full mb-4 hover:bg-gray-200 transition-colors"
          >
            <Volume2 className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
            {current.word}
          </h3>

          {!showMeaning ? (
            <button
              onClick={() => setShowMeaning(true)}
              className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Ma'nosini ko'rish
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <p className="text-gray-700 mb-2">{current.meaning}</p>
              {current.translation && (
                <p className="text-gray-500 text-sm mb-4">
                  {current.translation}
                </p>
              )}
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={() => handleReview(false)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Esimda yo'q
                </button>
                <button
                  onClick={() => handleReview(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-50 text-accent-mint rounded-lg font-medium hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Bilaman
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Flashcards
            </h1>
            <p className="text-gray-600">
              {flashcards.length} ta so'z | {dueFlashcards.length} ta takrorlash
              kerak
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setShowMeaning(false);
              setMode("review");
            }}
            disabled={flashcards.length === 0}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 btn-macos"
          >
            <RefreshCw className="w-4 h-4" />
            Takrorlash
          </button>
        </div>

        {flashcards.length === 0 ? (
          <div className="text-center py-16 glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Hali flashcards yo'q
            </h3>
            <p className="text-gray-600">
              Practice paytida so'zlarni bosib flashcardsga qo'shing
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {flashcards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-4 hover:shadow-macos transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 capitalize">
                        {card.word}
                      </h4>
                      <button
                        onClick={() => handlePlayAudio(card.word)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Volume2 className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                    {card.meaning && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                        {card.meaning}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-2 rounded-full ${
                              j < card.repetitionLevel
                                ? "bg-accent-mint"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        Lv.{card.repetitionLevel}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
