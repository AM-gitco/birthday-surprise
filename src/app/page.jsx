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

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const audioRef = useRef(null);

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <BalloonPop key="balloon" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <CardScreen key="card" onNext={() => setCurrentScreen(6)} />,
    <FinalSurprise key="final" onReplay={() => setCurrentScreen(1)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(7)} />,
  ];

  // Floating hearts positions
  const hearts = [
    { top: "35.7193%", left: "54.137%", w: 21.25, h: 21.25, anim: "34.6725s ease-in-out 1.905s infinite normal none running drift", color: "text-rose-400" },
    { top: "55.7512%", left: "48.9331%", w: 27.44, h: 27.44, anim: "34.7646s ease-in-out 1.88684s infinite normal none running drift", color: "text-rose-400" },
    // ... other hearts
  ];

  // Play audio automatically on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // optional: set volume
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.warn("Autoplay failed, trying after user interaction");
          const handleClick = () => {
            audioRef.current.play().catch(() => {});
            window.removeEventListener("click", handleClick);
          };
          window.addEventListener("click", handleClick);
        }
      };
      playAudio();
    }
  }, []);

  return (
    <>
      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h, i) => (
          <div
            key={i}
            className={`heart-drift ${h.color}`}
            style={{
              position: "absolute",
              top: h.top,
              left: h.left,
              width: `${h.w}px`,
              height: `${h.h}px`,
              animation: h.anim,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={h.w}
              height={h.h}
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart opacity-20"
              aria-hidden="true"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </div>
        ))}
      </div>

      <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 0.8 }}
              className={`w-full ${
                currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"
              }`}
            >
              {screens[currentScreen]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Background music */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/audio/setlove.mp3" type="audio/mpeg" />
        </audio>

        {/* Watermark */}
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
