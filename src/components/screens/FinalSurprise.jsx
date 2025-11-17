"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

const FinalSurprise = ({ onReplay }) => {
  const [showGift, setShowGift] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6 py-10 text-center">
      {/* Step 1: "One last thing..." */}
      {!showGift && !showSurprise && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-10"
          onAnimationComplete={() => setShowGift(true)}
        >
          One last thing...
        </motion.h2>
      )}

      {/* Step 2: Show Gift */}
      {showGift && !showSurprise && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="flex flex-col items-center gap-4 cursor-pointer"
          onClick={() => setShowSurprise(true)}
        >
          <img
            src="/gifs/gift.gif"
            alt="Gift"
            className="w-44 md:w-52 object-cover"
          />
          <p className="text-xl text-pink-300 font-semibold drop-shadow">
            Click gift for a gift
          </p>
        </motion.div>
      )}

      {/* Step 3: Surprise Card */}
      {showSurprise && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-xl rounded-2xl p-6 text-center bg-gradient-to-br from-pink-950 border border-pink-300/80 via-purple-950 to-indigo-950 drop-shadow-2xl"
        >
          <img
            alt="surprise"
            className="mx-auto w-44 md:w-52 object-cover"
            src="/gifs/surprise.gif"
          />
          <p className="text-xl text-pink-300 font-semibold mt-2 drop-shadow-xl">
            Lots of love for you ❤️
          </p>
          <div className="text-pretty text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-purple-200 drop-shadow-xl mt-5">
            Once again, Happy Birthday! Hope you loved your surprise.
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onReplay}
              className="px-10 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 shadow-[0_0_28px_rgba(244,114,182,0.35)] transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70 flex gap-2 items-center justify-center"
            >
              <RotateCw size={20} />
              Replay
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FinalSurprise;
