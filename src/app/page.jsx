// Improved HomePage with enhanced floating hearts + grid + robust client-only hearts generation
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderScreen from "@/components/screens/LoaderScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import CakeScreen from "@/components/screens/CakeScreen";
import BalloonPop from "@/components/screens/BalloonPop";
import PhotosScreen from "@/components/screens/PhotosScreen";
import CardScreen from "@/components/screens/CardScreen";
import FinalSurprise from "@/components/screens/FinalSurprise";
import MessageScreen from "@/components/screens/MessageScreen";

/* Small presentational Heart component */
const Heart = ({ className = "", ariaHidden = true }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-full h-full ${className}`}
    aria-hidden={ariaHidden}
  >
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  </svg>
);

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const audioRef = useRef(null);

  // NEW: global decorated state (lifted up so decoration persists across screens)
  const [decorated, setDecorated] = useState(false);

  // audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayTried, setAutoplayTried] = useState(false);

  // Pass onDecorate to CakeScreen so it can enable the global decoration
  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    /* pass onDecorate here */
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} onDecorate={() => setDecorated(true)} />,
    <BalloonPop key="balloon" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <CardScreen key="card" onNext={() => setCurrentScreen(6)} />,
    <FinalSurprise key="final" onReplay={() => setCurrentScreen(1)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(7)} />,
  ];

  // Hearts are generated client-side to avoid SSR/CSR hydration mismatch
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const palette = ["text-rose-400", "text-pink-300", "text-red-400", "text-rose-300"];
    const clientHearts = Array.from({ length: 40 }).map(() => ({
      top: `${(10 + Math.random() * 80).toFixed(4)}%`,
      left: `${(2 + Math.random() * 96).toFixed(4)}%`,
      w: +(12 + Math.random() * 36).toFixed(2),
      h: +(12 + Math.random() * 36).toFixed(2),
      duration: +(18 + Math.random() * 22).toFixed(2),
      delay: +(Math.random() * 6).toFixed(2),
      opacity: +(0.12 + Math.random() * 0.28).toFixed(2),
      blur: +(Math.random() * 1.6).toFixed(2),
      color: palette[Math.floor(Math.random() * palette.length)],
      rotate: `${(-15 + Math.random() * 30).toFixed(2)}deg`,
    }));
    setHearts(clientHearts);
  }, []);

  // Setup audio: do NOT force audible autoplay. Start muted and wait for user gesture to unmute/play.
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.loop = true;
    audioEl.preload = "auto";
    audioEl.muted = true;
    audioEl.volume = 0.5;

    const updatePlayingState = () => {
      const paused = audioEl.paused;
      setIsPlaying(!paused);
    };

    // mark we tried to configure autoplay (no forced play)
    setAutoplayTried(true);

    const firstInteractionHandler = () => {
      const el = audioRef.current;
      if (!el) return;
      try {
        el.muted = false;
        el.play().catch(() => {});
        setIsMuted(false);
        setIsPlaying(!el.paused);
      } catch (e) {
        console.warn("Failed to unmute on first interaction", e);
      }
      window.removeEventListener("click", firstInteractionHandler);
      window.removeEventListener("touchstart", firstInteractionHandler);
      window.removeEventListener("keydown", firstInteractionHandler);
    };

    window.addEventListener("click", firstInteractionHandler, { passive: true });
    window.addEventListener("touchstart", firstInteractionHandler, { passive: true });
    window.addEventListener("keydown", firstInteractionHandler, { passive: true });

    const onPlay = () => updatePlayingState();
    const onPause = () => updatePlayingState();
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("pause", onPause);

    return () => {
      window.removeEventListener("click", firstInteractionHandler);
      window.removeEventListener("touchstart", firstInteractionHandler);
      window.removeEventListener("keydown", firstInteractionHandler);
      if (audioEl) {
        audioEl.removeEventListener("play", onPlay);
        audioEl.removeEventListener("pause", onPause);
      }
    };
  }, []);

  // Play / Pause controls
  const togglePlay = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) {
      console.warn('togglePlay: audio element not available');
      setIsPlaying(false);
      return;
    }

    try {
      if (audioEl.paused) {
        await audioEl.play().catch((err) => {
          console.warn('Play attempt failed in togglePlay', err);
        });
      } else {
        audioEl.pause();
      }
    } catch (e) {
      console.warn('togglePlay caught error', e);
    }

    const el = audioRef.current;
    setIsPlaying(!!el && !el.paused);
  };

  // Unmute explicitly (user click)
  const handleUnmute = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) {
      console.warn('handleUnmute: audio element not available');
      return;
    }

    try {
      audioEl.muted = false;
      await audioEl.play().catch((err) => {
        console.warn('Play after unmute failed', err);
      });
      setIsMuted(false);
      setIsPlaying(!audioEl.paused);
    } catch (e) {
      console.warn('Unmute/play failed', e);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes drift {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-18px) translateX(8px) rotate(6deg); }
          50% { transform: translateY(-36px) translateX(-6px) rotate(-4deg); }
          75% { transform: translateY(-18px) translateX(6px) rotate(6deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }

        .heart-drift {
          position: absolute;
          will-change: transform, opacity;
          animation-name: drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform-origin: center;
        }

        .bg-grid-fallback {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .will-change-transform { will-change: transform; }

        .audio-control { backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
      `}</style>

      <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">
        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 60%, rgba(255, 99, 165, 0.5), transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.5), transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div
          className="fixed inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div
          className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] bg-grid-fallback"
          aria-hidden="true"
        />

        {/* Floating hearts layer (render only on client after hearts are generated) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
          {hearts.length > 0 && hearts.map((h, i) => (
            <div
              key={i}
              className={`heart-drift ${h.color} will-change-transform`}
              style={{
                top: h.top,
                left: h.left,
                width: `${h.w}px`,
                height: `${h.h}px`,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                opacity: h.opacity,
                filter: `blur(${h.blur}px)`,
                transform: `rotate(${h.rotate})`,
              }}
              aria-hidden="true"
            >
              <Heart />
            </div>
          ))}
        </div>

        {/* NEW: Global top decoration (shows on ALL screens when `decorated` is true) */}
        <AnimatePresence>
          {decorated && (
            <motion.div
              key="global-top-decoration"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center"
              aria-hidden="true"
            >
              <TopDecoration />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-40 flex min-h-screen items-center justify-center p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className={`w-full ${
                currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"
              }`}
            >
              {screens[currentScreen]}
            </motion.div>
          </AnimatePresence>
        </div>

        <audio
          ref={audioRef}
          loop
          preload="auto"
          muted={isMuted}
          playsInline
          aria-hidden="true"
        >
          <source src="/audio/setlove.mp3" type="audio/mpeg" />
        </audio>

        <div className="fixed top-4 right-4 z-50">
          <div className="audio-control rounded-full p-2 shadow-lg bg-white/6 text-white/90 flex gap-2 items-center">
            <button
              onClick={togglePlay}
              className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
              title={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-play"><path d="M5 3v18l15-9z" /></svg>
              )}
            </button>

            {isMuted ? (
              <button
                onClick={handleUnmute}
                className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
                title="Unmute"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-volume-2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19 12c0-1.77-.77-3.37-2-4.47"/><path d="M23 12c0-3.31-1.95-6.16-4.78-7.19"/></svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  const audioEl = audioRef.current;
                  if (!audioEl) return;
                  audioEl.muted = true;
                  setIsMuted(true);
                }}
                className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
                title="Mute"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-volume-x"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              </button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light"
        >
          @mannam
        </motion.div>
      </main>
    </>
  );
}

/* ---------- TopDecoration component (extracted from your HTML) ---------- */
function TopDecoration() {
  return (
    <div className="pointer-events-none absolute -top-2 inset-x-0 mx-auto max-w-2xl" style={{ opacity: 1 }}>
      <div className="pointer-events-none fixed inset-0 z-40">
        <div className="relative h-28 md:h-32 lg:h-48 w-full">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 160" preserveAspectRatio="none">
            <path d="M 0 50 Q 250 140 500 0" className="fill-none stroke-rose-300/90" strokeWidth="3" strokeLinecap="round"></path>
            <path d="M 1000 50 Q 750 140 500 0" className="fill-none stroke-violet-300/90" strokeWidth="3" strokeLinecap="round"></path>
            <polygon points="33.36,61.77 91.64,76.05 53.46,105.81" className="fill-rose-400 opacity-95 drop-shadow"></polygon>
            <polygon points="95.25,76.76 154.75,84.49 120.10,118.31" className="fill-sky-400 opacity-95 drop-shadow"></polygon>
            <polygon points="157.50,84.71 217.50,85.61 186.93,123.15" className="fill-amber-400 opacity-95 drop-shadow"></polygon>
            <polygon points="220.15,85.49 279.85,79.51 253.78,120.31" className="fill-emerald-400 opacity-95 drop-shadow"></polygon>
            <polygon points="283.17,78.96 341.83,66.35 320.49,109.81" className="fill-fuchsia-400 opacity-95 drop-shadow"></polygon>
            <polygon points="346.51,65.03 403.49,46.22 386.91,91.71" className="fill-rose-400 opacity-95 drop-shadow"></polygon>
            <polygon points="410.09,43.60 464.91,19.21 452.95,66.12" className="fill-sky-400 opacity-95 drop-shadow"></polygon>
            <polygon points="966.64,61.77 908.36,76.05 946.54,105.81" className="fill-sky-400 opacity-95 drop-shadow"></polygon>
            <polygon points="904.75,76.76 845.25,84.49 879.90,118.31" className="fill-amber-400 opacity-95 drop-shadow"></polygon>
            <polygon points="842.50,84.71 782.50,85.61 813.07,123.15" className="fill-emerald-400 opacity-95 drop-shadow"></polygon>
            <polygon points="779.85,85.49 720.15,79.51 746.22,120.31" className="fill-fuchsia-400 opacity-95 drop-shadow"></polygon>
            <polygon points="716.83,78.96 658.17,66.35 679.51,109.81" className="fill-rose-400 opacity-95 drop-shadow"></polygon>
            <polygon points="653.49,65.03 596.51,46.22 613.09,91.71" className="fill-sky-400 opacity-95 drop-shadow"></polygon>
            <polygon points="589.91,43.60 535.09,19.21 547.05,66.12" className="fill-amber-400 opacity-95 drop-shadow"></polygon>
          </svg>
        </div>

        <svg className="absolute left-2 top-0 h-40 w-16 md:h-48 md:w-18 -z-1" viewBox="0 0 64 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="leftRibbon" x1="0" x2="1">
              <stop offset="0%" stopColor="#f472b6"></stop>
              <stop offset="100%" stopColor="#60a5fa"></stop>
            </linearGradient>
          </defs>
          <path d="M16 0 C 6 28, 32 56, 12 84 C -4 112, 28 128, 10 156" stroke="url(#leftRibbon)" strokeWidth="5" fill="none" strokeLinecap="round" className="drop-shadow"></path>
        </svg>

        <svg className="absolute right-2 top-0 h-40 w-16 md:h-48 md:w-18 -z-1" viewBox="0 0 64 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rightRibbon" x1="0" x2="1">
              <stop offset="0%" stopColor="#a78bfa"></stop>
              <stop offset="100%" stopColor="#34d399"></stop>
            </linearGradient>
          </defs>
          <path d="M48 0 C 58 28, 32 56, 52 84 C 68 112, 36 128, 54 156" stroke="url(#rightRibbon)" strokeWidth="5" fill="none" strokeLinecap="round" className="drop-shadow"></path>
        </svg>
      </div>
    </div>
  );
}
