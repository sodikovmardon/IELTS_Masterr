"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Play, Trash2, Save, Loader2, AlertCircle } from "lucide-react";

interface VoiceRecorderProps {
  onSave: (audioBlob: Blob, duration: number) => void;
  onTranscription?: (text: string) => void;
  language?: string;
}

export default function VoiceRecorder({ onSave, onTranscription, language = "en-US" }: VoiceRecorderProps) {
  const [state, setState] = useState<"idle" | "recording" | "recorded">("idle");
  const [micError, setMicError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setState("recorded");
        if (timerRef.current) clearInterval(timerRef.current);
        stream.getTracks().forEach((t) => t.stop());
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch {}
        }
      };

      recorder.start();
      setState("recording");
      startTimeRef.current = Date.now();
      setElapsed(0);

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition && onTranscription) {
        const recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              onTranscription(event.results[i][0].transcript);
            }
          }
        };
        recognition.onerror = () => {};
        recognition.start();
      }

      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 200);
    } catch {
      setMicError("Mikrofon topilmadi yoki ruxsat berilmadi. Iltimos, matnli javobdan foydalaning.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const discardRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setElapsed(0);
    setState("idle");
  };

  const saveRecording = () => {
    if (audioUrl) {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onSave(blob, elapsed);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (micError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 mb-1">Mikrofon xatosi</p>
            <p className="text-sm text-red-600">{micError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      {state === "idle" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Ovozli javob yozish</h3>
          <p className="text-sm text-gray-500 mb-4">
            Mikrofoningizga ruxsat berish orqali javobingizni yozib oling
          </p>
          <button
            onClick={startRecording}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 btn-macos"
          >
            <Mic className="w-5 h-5" />
            Boshlash
          </button>
        </div>
      )}

      {state === "recording" && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
            </span>
            <span className="text-2xl font-mono font-bold text-red-500">
              {formatTime(elapsed)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Yozilmoqda...</p>
          <button
            onClick={stopRecording}
            className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
          >
            <Square className="w-5 h-5" />
            To'xtatish
          </button>
        </div>
      )}

      {state === "recorded" && (
        <div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play className="w-5 h-5 text-green-500" />
            <span className="text-lg font-mono font-bold text-gray-700">
              {formatTime(elapsed)}
            </span>
          </div>

          <div className="mb-4">
            <audio ref={audioRef} src={audioUrl!} controls className="w-full h-10" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={discardRecording}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm btn-macos"
            >
              <Trash2 className="w-4 h-4" />
              Qayta yozish
            </button>
            <button
              onClick={saveRecording}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 text-sm"
            >
              <Save className="w-4 h-4" />
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
