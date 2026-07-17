"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play, Pause, Maximize2, Minimize2, Volume2, VolumeX,
  Subtitles, ChevronUp,
} from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface VideoPlayerProps {
  videoUrl: string | null | undefined;
  lessonId: string;
  transcriptText?: string | null;
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
  title?: string;
}

export default function VideoPlayer({
  videoUrl,
  lessonId,
  transcriptText,
  onProgress,
  onComplete,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watchedPercent, setWatchedPercent] = useState(0);
  const [apiReady, setApiReady] = useState(false);

  const extractYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = videoUrl ? extractYoutubeId(videoUrl) : null;

  // Mount on client only
  useEffect(() => { setMounted(true); }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId || !mounted) return;
    if (window.YT) { setApiReady(true); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);
    (window as any).onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { delete (window as any).onYouTubeIframeAPIReady; };
  }, [videoId, mounted]);

  // Create player
  useEffect(() => {
    if (!apiReady || !mounted || !videoId || !containerRef.current) return;
    const newPlayer = new (window as any).YT.Player(containerRef.current, {
      videoId,
      height: "100%",
      width: "100%",
      playerVars: {
        controls: 0,
        disablekb: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          playerRef.current = newPlayer;
          setDuration(newPlayer.getDuration());
          setReady(true);
        },
        onStateChange: (e: any) => {
          setPlaying(e.data === (window as any).YT.PlayerState.PLAYING);
          if (e.data === (window as any).YT.PlayerState.PLAYING) {
            startProgressTracking();
          } else {
            stopProgressTracking();
          }
          if (e.data === (window as any).YT.PlayerState.ENDED) {
            handleVideoEnd();
          }
        },
      },
    });
    return () => {
      stopProgressTracking();
      newPlayer?.destroy();
      playerRef.current = null;
    };
  }, [apiReady, mounted, videoId]);

  const saveProgress = useCallback(async (percent: number) => {
    try {
      await fetch("/api/video-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, watchedPercent: percent }),
      });
    } catch {}
  }, [lessonId]);

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const ct = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(ct);
        if (dur > 0) {
          const pct = (ct / dur) * 100;
          setProgress(pct);
          if (pct > watchedPercent) {
            setWatchedPercent(pct);
            onProgress?.(pct);
            if (Math.floor(pct / 10) > Math.floor((pct - 1) / 10)) {
              saveProgress(pct);
            }
          }
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleVideoEnd = () => {
    stopProgressTracking();
    setProgress(100);
    setWatchedPercent(100);
    saveProgress(100);
    onComplete?.();
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    playerRef.current.seekTo(ratio * duration);
  };

  const changeSpeed = (s: number) => {
    if (playerRef.current?.setPlaybackRate) {
      playerRef.current.setPlaybackRate(s);
    }
    setSpeed(s);
    setSpeedOpen(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current?.parentElement) return;
    const el = containerRef.current.parentElement;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (!mounted || !videoId) return null;

  return (
    <div className="relative bg-black rounded-xl overflow-hidden mb-4 group">
      {/* Loading state */}
      {!ready && (
        <div className="w-full aspect-video flex items-center justify-center bg-gray-900">
          <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Player container */}
      <div
        ref={containerRef}
        className="w-full aspect-video"
        style={{ display: ready ? "block" : "none" }}
      />

      {/* Overlay play button */}
      {!playing && ready && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ top: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-8 h-8 text-gray-900 ml-1" />
          </div>
        </button>
      )}

      {/* Controls */}
      {ready && (
        <div className="bg-gray-900 px-3 py-2 flex flex-col gap-1.5">
          <div
            className="relative h-1.5 bg-gray-700 rounded-full cursor-pointer group/progress"
            onClick={seekTo}
          >
            <div
              className="absolute h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute h-3 w-3 bg-indigo-400 rounded-full -top-[3px] opacity-0 group-hover/progress:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={toggleMute} className="hover:text-indigo-400 transition-colors">
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-gray-400 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setSpeedOpen(!speedOpen)}
                  className="hover:text-indigo-400 transition-colors text-xs font-mono"
                >
                  {speed}x
                </button>
                {speedOpen && (
                  <div className="absolute bottom-6 right-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
                    {[0.75, 1, 1.25, 1.5].map((s) => (
                      <button
                        key={s}
                        onClick={() => changeSpeed(s)}
                        className={`block w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 transition-colors ${
                          speed === s ? "text-indigo-400 font-semibold" : "text-white"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {transcriptText && (
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`hover:text-indigo-400 transition-colors ${showTranscript ? "text-indigo-400" : ""}`}
                  title="Subtitles"
                >
                  <Subtitles className="w-4 h-4" />
                </button>
              )}

              <button onClick={toggleFullscreen} className="hover:text-indigo-400 transition-colors">
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTranscript && transcriptText && (
        <div className="bg-gray-800 border-t border-gray-700 p-4 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-300 uppercase">Transcript</span>
            <button onClick={() => setShowTranscript(false)} className="text-gray-400 hover:text-white">
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {transcriptText}
          </p>
        </div>
      )}
    </div>
  );
}
