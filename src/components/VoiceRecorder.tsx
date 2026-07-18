"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Play, Loader2, AlertCircle, CheckCircle2, Send } from "lucide-react";

interface VoiceRecorderProps {
  lessonId: string;
  questions: string;
  title?: string;
  onComplete: (evaluation: any) => void;
  onError?: (error: string) => void;
}

type RecorderState = "idle" | "requesting" | "recording" | "recorded" | "submitting" | "error";
type MicErrorType = "not-allowed" | "not-found" | "other";

export default function VoiceRecorder({ lessonId, questions, title, onComplete, onError }: VoiceRecorderProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [errorType, setErrorType] = useState<MicErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const startRecording = async () => {
    try {
      setState("requesting");
      setErrorType(null);
      setErrorMessage("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((s, v) => s + v, 0) / dataArray.length;
        setAudioLevel(Math.min(1, avg / 128));
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      animFrameRef.current = requestAnimationFrame(updateLevel);

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
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setAudioLevel(0);
        stream.getTracks().forEach((t) => t.stop());
        audioContext.close();
      };

      recorder.start();
      setState("recording");
      startTimeRef.current = Date.now();
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 200);
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        setErrorType("not-allowed");
        setErrorMessage("Mikrofonga ruxsat berilmadi. Brauzer sozlamalaridan mikrofonga ruxsat bering va sahifani yangilang.");
      } else if (err.name === "NotFoundError") {
        setErrorType("not-found");
        setErrorMessage("Mikrofon topilmadi. Qurilmangizda mikrofon borligini tekshiring.");
      } else {
        setErrorType("other");
        setErrorMessage(`Mikrofonga ulanishda xatolik: ${err.message || "noma'lum xato"}`);
      }
      setState("error");
      onError?.(err.message || "Mikrofon xatosi");
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

  const submitRecording = async () => {
    if (!chunksRef.current.length) return;
    setState("submitting");
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("lessonId", lessonId);
      formData.append("questions", questions);
      if (title) formData.append("text", `SPEAKING: ${title}`);

      const res = await fetch("/api/speaking/evaluate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Baholashda xatolik");
      onComplete(data);
    } catch (err: any) {
      setErrorMessage(err.message || "Yuborishda xatolik");
      setErrorType("other");
      setState("error");
      onError?.(err.message);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const errorMessages: Record<MicErrorType, { title: string; suggestion: string }> = {
    "not-allowed": {
      title: "Ruxsat berilmadi",
      suggestion: "Brauzer sozlamalari → Mikrofon → Ruxsat berish → Sahifani yangilang",
    },
    "not-found": {
      title: "Mikrofon topilmadi",
      suggestion: "Mikrofon ulanganligini va ish holatida ekanligini tekshiring",
    },
    "other": {
      title: "Xatolik yuz berdi",
      suggestion: "",
    },
  };

  if (state === "error") {
    const info = errorType ? errorMessages[errorType] : errorMessages.other;
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800 mb-1">{info.title}</p>
            <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
            {info.suggestion && (
              <p className="text-xs text-red-500 bg-red-100/50 rounded-lg px-3 py-2">{info.suggestion}</p>
            )}
            <button
              onClick={() => { setState("idle"); setErrorType(null); setErrorMessage(""); }}
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      {(state === "idle" || state === "requesting") && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Ovozli javob yozish</h3>
          <p className="text-sm text-gray-500 mb-4">
            Javobingizni mikrofon orqali yozib oling va baholashga yuboring
          </p>
          <button
            onClick={startRecording}
            disabled={state === "requesting"}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 btn-macos disabled:opacity-50"
          >
            {state === "requesting" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
            {state === "requesting" ? "Ruxsat so'ralmoqda..." : "Yozishni boshlash"}
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

          <div className="flex items-center justify-center gap-1 h-12 mb-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const center = 20;
              const dist = Math.abs(i - center);
              const maxDist = 20;
              const baseHeight = 4;
              const maxHeight = 40;
              const proximityFactor = 1 - dist / maxDist;
              const levelHeight = baseHeight + (maxHeight - baseHeight) * audioLevel * proximityFactor;
              return (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-indigo-500 transition-all duration-75"
                  style={{
                    height: `${Math.max(baseHeight, levelHeight)}px`,
                    opacity: 0.4 + 0.6 * proximityFactor * audioLevel,
                  }}
                />
              );
            })}
          </div>

          <p className="text-sm text-gray-500 mb-4">Yozilmoqda...</p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={discardRecording}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors btn-macos"
            >
              Bekor qilish
            </button>
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
            >
              <Square className="w-4 h-4" />
              To'xtatish
            </button>
          </div>
        </div>
      )}

      {state === "recorded" && audioUrl && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-lg font-semibold text-gray-800">
              Yozib olindi
            </span>
            <span className="text-sm font-mono font-bold text-gray-500 ml-1">
              ({formatTime(elapsed)})
            </span>
          </div>

          <div className="mb-4">
            <audio ref={audioRef} src={audioUrl} controls className="w-full h-10" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={discardRecording}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm btn-macos"
            >
              <Play className="w-4 h-4" />
              Qayta yozish
            </button>
            <button
              onClick={submitRecording}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 text-sm"
            >
              <Send className="w-4 h-4" />
              Yuborish
            </button>
          </div>
        </div>
      )}

      {state === "submitting" && (
        <div className="text-center py-6">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-gray-500">Audio yuborilmoqda va baholanmoqda...</p>
        </div>
      )}
    </div>
  );
}
