"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, RotateCcw, RotateCw, Headphones, BookOpen, Volume2, Loader2,
} from "lucide-react";

type PlayerMode = "real-test" | "practice";
const SPEEDS = [0.75, 1, 1.25, 1.5];

interface AudioPlayerProps {
  audioUrl?: string | null;
  transcriptText?: string | null;
  durationMin: number;
  onComplete?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AudioPlayer({ audioUrl, transcriptText, durationMin, onComplete }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [useTTS, setUseTTS] = useState(!audioUrl);
  const [isReady, setIsReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationMin * 60);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<PlayerMode>("real-test");
  const [completed, setCompleted] = useState(false);
  const [maxPlayedTime, setMaxPlayedTime] = useState(0);
  const [ttsVoices, setTtsVoices] = useState<SpeechSynthesisVoice[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ttsStartTime = useRef(0);

  useEffect(() => {
    if (!useTTS) return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setTtsVoices(voices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    setIsReady(true);
    setDuration(durationMin * 60);
  }, [useTTS, durationMin]);

  useEffect(() => {
    if (useTTS) return;
    const audio = audioRef.current;
    if (!audio) return;
    const onCanPlay = () => setIsReady(true);
    const onTimeUpdate = () => {
      const ct = audio.currentTime;
      setCurrentTime(ct);
      if (mode === "real-test" && ct > maxPlayedTime) setMaxPlayedTime(ct);
    };
    const onLoadedMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false); setCompleted(true); onComplete?.();
    };
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [onComplete, mode, maxPlayedTime, useTTS]);

  useEffect(() => {
    if (useTTS) return;
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, useTTS]);

  const stopTTS = useCallback(() => {
    window.speechSynthesis.cancel();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startTTS = useCallback(() => {
    if (!transcriptText) return;
    stopTTS();
    const utterance = new SpeechSynthesisUtterance(transcriptText);
    const enVoice = ttsVoices.find(v => v.lang.startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    utterance.rate = speed * 0.9;
    utterance.pitch = 1;
    utterance.onend = () => {
      setPlaying(false); setCompleted(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      onComplete?.();
    };
    synthRef.current = utterance;
    ttsStartTime.current = Date.now();
    window.speechSynthesis.speak(utterance);
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - ttsStartTime.current) / 1000;
      setCurrentTime(Math.min(elapsed, duration));
      if (mode === "real-test") setMaxPlayedTime(Math.min(elapsed, duration));
    }, 200);
  }, [transcriptText, ttsVoices, speed, mode, duration, onComplete, stopTTS]);

  const togglePlay = useCallback(() => {
    if (useTTS) {
      if (completed) {
        setCompleted(false); setCurrentTime(0); setMaxPlayedTime(0);
        startTTS(); setPlaying(true);
        return;
      }
      if (playing) { stopTTS(); setPlaying(false); }
      else { startTTS(); setPlaying(true); }
      return;
    }
    const audio = audioRef.current;
    if (!audio || !isReady) return;
    if (completed) {
      audio.currentTime = 0; setCompleted(false); setCurrentTime(0); setMaxPlayedTime(0);
      audio.play(); setPlaying(true);
      return;
    }
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  }, [isReady, playing, completed, useTTS, startTTS, stopTTS]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (useTTS) return;
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const seekTime = pct * duration;
    if (mode === "real-test" && seekTime > maxPlayedTime) return;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  }, [duration, mode, maxPlayedTime, useTTS]);

  const skip = useCallback((seconds: number) => {
    if (useTTS) return;
    if (!audioRef.current || !duration) return;
    let newTime = audioRef.current.currentTime + seconds;
    newTime = Math.max(0, Math.min(newTime, duration));
    if (mode === "real-test" && newTime > maxPlayedTime) return;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration, mode, maxPlayedTime, useTTS]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const maxProgress = duration > 0 ? (maxPlayedTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {!useTTS && <audio ref={audioRef} src={audioUrl!} preload="auto" />}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {useTTS ? <Volume2 className="w-5 h-5 text-primary" /> : <Headphones className="w-5 h-5 text-primary" />}
          <span className="font-semibold text-gray-900 text-sm">
            {useTTS ? "TTS Audio" : "Audio"}
          </span>
          {useTTS && (
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
              Speech
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {mode === "real-test" ? (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Real Test
            </span>
          ) : (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Practice
            </span>
          )}
        </div>
      </div>

      <div className="relative mb-3">
        <div
          className="w-full h-2 bg-gray-100 rounded-full cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          {mode === "real-test" && (
            <div
              className="absolute top-0 left-0 h-full bg-gray-200 rounded-full pointer-events-none"
              style={{ width: `${maxProgress}%` }}
            />
          )}
          <motion.div
            className={`absolute top-0 left-0 h-full rounded-full pointer-events-none ${
              mode === "real-test" ? "bg-primary" : "bg-gradient-to-r from-primary to-indigo-500"
            }`}
            style={{ width: `${mode === "real-test" ? maxProgress : progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm pointer-events-none"
            style={{ left: `${mode === "real-test" ? maxProgress : progress}%`, marginLeft: "-8px" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span className="font-mono">{formatTime(currentTime)}</span>
        <span className="font-mono">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => skip(-10)}
          disabled={!isReady || useTTS}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 disabled:opacity-30"
          title="-10 soniya"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={togglePlay}
          disabled={useTTS ? !transcriptText : !isReady}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {useTTS && !transcriptText ? <Loader2 className="w-5 h-5 animate-spin" /> :
            playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />
          }
        </button>

        <button
          onClick={() => skip(10)}
          disabled={!isReady || useTTS}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 disabled:opacity-30"
          title="+10 soniya"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                speed === s
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setMode((prev) => (prev === "real-test" ? "practice" : "real-test"));
            if (!useTTS && audioRef.current) setMaxPlayedTime(audioRef.current.currentTime);
          }}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            mode === "practice"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {mode === "real-test" ? "Practice Mode" : "Real Test"}
        </button>
      </div>
    </div>
  );
}
