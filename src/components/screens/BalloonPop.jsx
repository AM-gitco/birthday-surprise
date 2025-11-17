"use client";

import { useState } from "react";
import GradientButton from "@/components/GradientButton"; // adjust path
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

  return (
    <>
      <div className="relative h-[68vh] md:h-[60vh] w-full overflow-visible rounded-3xl backdrop-blur-xl bg-gradient-to-b from-pink-950/35 via-fuchsia-950/30 to-purple-950/35 p-4">
        {/* Instruction */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-pink-50/90 text-xl md:text-2xl">
          Pop all 4 balloons
        </div>

        {/* Display words */}
        {words.map((word, i) => (
          <div
            key={i}
            className="absolute text-xl md:text-2xl font-semibold pointer-events-none transition-opacity duration-500"
            style={{
              left: `${20 + i * 20}%`,
              top: `${i % 2 === 0 ? 32 : 38}%`,
              transform: "translateX(-50%)",
              opacity: popped[i] ? 1 : 0,
            }}
          >
            <span className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 drop-shadow">
              {word}
            </span>
          </div>
        ))}

        {/* Balloons */}
        {[
          { left: 20, top: 18, color: "rgb(251, 113, 133)" },
          { left: 40, top: 24, color: "rgb(245, 158, 11)" },
          { left: 60, top: 24, color: "rgb(34, 197, 94)" },
          { left: 80, top: 18, color: "rgb(56, 189, 248)" },
        ].map((balloon, i) => (
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
                className="h-24 w-20 md:h-28 md:w-22 rounded-[50%_50%_45%_45%/55%_55%_45%_45%]"
                style={{
                  background: `radial-gradient(60% 60% at 35% 35%, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 26%, transparent 27%), linear-gradient(145deg, ${balloon.color}, rgba(255,255,255,0.3))`,
                  boxShadow:
                    "rgba(0, 0, 0, 0.18) -6px -10px 16px inset, rgba(0, 0, 0, 0.22) 0px 10px 22px",
                }}
              ></div>
              <div
                className="mx-auto -mt-1 h-3 w-3 rotate-45 relative z-10"
                style={{ background: balloon.color }}
              ></div>
            </div>
          </button>
        ))}

        {/* Balloon strings */}
        <svg className="pointer-events-none absolute inset-0 -z-10" width="848" height="506">
          <path d="M 169.6 205.15 C 162.65 285.15, 420.52 354.2, 424 506" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" />
          <path d="M 339.2 235.52 C 337.01 315.52, 422.91 354.2, 424 506" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" />
          <path d="M 508.8 235.52 C 513.39 315.52, 426.29 354.2, 424 506" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" />
          <path d="M 678.4 205.15 C 685.55 285.15, 427.57 354.2, 424 506" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" />
          <circle cx="424" cy="506" r="5" fill="rgba(255,255,255,0.75)" />
        </svg>
      </div>

      {/* Next button outside balloon box */}
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
