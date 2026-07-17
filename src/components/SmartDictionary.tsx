"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { X, Volume2, BookmarkPlus, Loader2 } from "lucide-react";

interface DictionaryData {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
}

export default function SmartDictionary({
  word,
  onClose,
}: {
  word: string;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [data, setData] = useState<DictionaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [flashback, setFlashback] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    setError("");

    fetch(`/api/dictionary?word=${encodeURIComponent(word)}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
          return;
        }
        const entry = res.data[0];
        setData({
          word: entry.word,
          phonetic: entry.phonetic,
          meanings: entry.meanings.map((m: any) => ({
            partOfSpeech: m.partOfSpeech,
            definitions: m.definitions.slice(0, 2).map((d: any) => ({
              definition: d.definition,
              example: d.example,
            })),
          })),
        });
      })
      .catch(() => setError("So'z topilmadi"))
      .finally(() => setLoading(false));

    fetch(`/api/word-history?word=${encodeURIComponent(word)}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.histories && res.histories.length > 0) {
          const h = res.histories[0];
          const days = Math.round(
            (Date.now() - new Date(h.seenAt).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (days > 0) {
            setFlashback(
              `Siz bu so'zni ${days} kun oldin ko'rgansiz`
            );
          }
        }
      })
      .catch(() => {});
  }, [word]);

  const handleAddToFlashcards = async () => {
    if (!data || !session) return;
    try {
      const meaning = data.meanings
        .map((m) => `${m.partOfSpeech}: ${m.definitions[0]?.definition || ""}`)
        .join("; ");
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: data.word,
          meaning,
          translation: "",
        }),
      });
      if (res.ok) setAdded(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlayAudio = () => {
    if (!data?.word) return;
    const utterance = new SpeechSynthesisUtterance(data.word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">📖</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : data ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-gray-900 capitalize">
                {data.word}
              </h3>
              {data.phonetic && (
                <span className="text-sm text-gray-500">{data.phonetic}</span>
              )}
              <button
                onClick={handlePlayAudio}
                className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {flashback && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-xs text-amber-700">
                {flashback}
              </div>
            )}

            <div className="space-y-4">
              {data.meanings.map((m, i) => (
                <div key={i}>
                  <span className="inline-block text-xs font-medium text-primary bg-indigo-50 px-2 py-0.5 rounded mb-2 capitalize">
                    {m.partOfSpeech}
                  </span>
                  <ul className="space-y-2">
                    {m.definitions.map((d, j) => (
                      <li key={j} className="text-sm text-gray-700">
                        <p>{d.definition}</p>
                        {d.example && (
                          <p className="text-gray-500 italic mt-0.5 text-xs">
                            &ldquo;{d.example}&rdquo;
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {session && (
              <button
                onClick={handleAddToFlashcards}
                disabled={added}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  added
                    ? "bg-accent-mint bg-opacity-20 text-accent-mint"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                {added ? "Flashcardsga qo'shilgan" : "Flashcardsga qo'shish"}
              </button>
            )}
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
