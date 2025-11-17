"use client";

import { useState } from "react";
import GradientButton from "@/components/GradientButton"; 
import { Gift } from "lucide-react";

const BalloonPop = ({ onNext }) => {
  const words = ["You", "are", "a", "Cutiee"];
  const [popped, setPopped] = useState([false, false, false, false]);

  const handlePop = (index) => {
    setPopped((prev) => {
      const newPopped = [...prev];
      newPopped[index] = true;
      return newPopped;
    });
  };

  const allPopped = popped.every(Boolean);

  const balloons = [
    { left: 20, top: 18, color: "rgb(251, 113, 133)", height: 16 }, // height in % of container
    { left: 40, top: 24, color: "rgb(245, 158, 11)", height: 16 },
    { left: 60, top: 24, color: "rgb(34, 197, 94)", height: 16 },
    { left: 80, top: 18, color: "rgb(56, 189, 248)", height: 16 },
  ];

  return (
    <>
      <div className="relative h-[70vh] sm:h-[65vh] md:h-[60vh] w-full overflow-visible rounded-3xl backdrop-blur-xl bg-gradient-to-b from-pink-950/35 via-fuchsia-950/30 to-purple-950/35 p-4">
        {/* Instruction */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-lg sm:text-xl md:text-2xl text-pink-50/90">
          Pop all 4 balloons
        </div>

        {/* Words */}
        {words.map((word, i) => (
          <div
            key={i}
            className="absolute font-semibold pointer-events-none transition-opacity duration-500"
            style={{
              left: `${balloons[i].left}%`,
              top: `${balloons[i].top + 12}%`,
              transform: "translateX(-50%)",
              opacity: popped[i] ? 1 : 0,
            }}
          >
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 drop-shadow">
              {word}
            </span>
          </div>
        ))}

        {/* Balloons */}
        {balloons.map((balloon, i) => (
          <button
            key={i}
            aria-label={`Balloon ${i + 1}`}
            onClick={() => handlePop(i)}
            className="absolute -translate-x-1/2"
            style={{
              left: `${balloon.left}%`,
              top: `${balloon.top}%`,
              opacity: popped[i] ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <div className="relative">
              <div
                className="h-16 w-14 sm:h-20 sm:w-16 md:h-24 md:w-20 rounded-[50%_50%_45%_45%/55%_55%_45%_45%]"
                style={{
                  background: `radial-gradient(60% 60% at 35% 35%, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 26%, transparent 27%), linear-gradient(145deg, ${balloon.color}, rgba(255,255,255,0.3))`,
                  boxShadow:
                    "rgba(0, 0, 0, 0.18) -6px -10px 16px inset, rgba(0, 0, 0, 0.22) 0px 10px 22px",
                }}
              ></div>
              <div
                className="mx-auto -mt-1 h-2 w-2 sm:h-3 sm:w-3 md:h-3 md:w-3 rotate-45 relative z-10"
                style={{ background: balloon.color }}
              ></div>
            </div>
          </button>
        ))}

        {/* Balloon strings */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {balloons.map((balloon, i) => {
            // Start string at bottom of balloon (top + balloon height)
            const startY = balloon.top + (balloon.height * 1.5); // adjust 1.5 factor for visual alignment
            return (
              <path
                key={i}
                d={`M${balloon.left},${startY} C${balloon.left - 2},${startY + 10} 50,100 50,100`}
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="0.5"
                fill="none"
              />
            );
          })}
          <circle cx="50" cy="100" r="1.5" fill="rgba(255,255,255,0.75)" />
        </svg>
      </div>

      {/* Next button */}
      {allPopped && (
        <div className="mt-6 flex justify-center">
          <GradientButton onClick={onNext}>
            <Gift size={20} />
            Start the surprise
          </GradientButton>
        </div>
      )}
    </>
  );
};

export default BalloonPop;
