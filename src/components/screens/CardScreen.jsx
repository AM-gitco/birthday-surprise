"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CardMessage = ({ onNext }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="px-4 md:px-6 py-10 pt-20 text-center">
      <h2
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
      >
        A Special Message
      </h2>

      <div className="mx-auto relative w-full max-w-3xl">
        {/* Card Container with perspective */}
        <div
          className="mx-auto w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] cursor-pointer relative"
          style={{ perspective: 1200 }}
        >
          {/* decorative back layer (like sample - slightly offset) */}
          <div
            aria-hidden="true"
            className="absolute -left-[10px] top-0 w-full h-full rounded-3xl bg-gradient-to-br from-pink-400/30 via-rose-300/20 to-purple-400/20 blur-sm opacity-90 -z-10"
          />

          {/* flip container */}
          <motion.div
            className="w-full h-full mx-auto"
            onClick={() => setOpened((o) => !o)}
            initial={false}
            animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
          >
            {/* FRONT (cover) */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden", transformOrigin: "top center" }}
            >
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-pink-400/50 via-rose-400/40 to-purple-400/50 backdrop-blur-sm p-2">
                <div className="relative h-full w-full rounded-xl overflow-hidden">
                  <img
                    src="/images/cover.webp"
                    alt="Card Cover"
                    className="h-full w-full object-cover rounded-xl"
                  />

                  <p className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 bg-pink-500 text-pink-50 z-10 w-32 md:w-40 rounded-lg py-0.5 text-center pointer-events-none">
                    Tap to Open
                  </p>
                </div>
              </div>
            </div>

            {/* BACK (message content) - rotated so it shows when container rotated */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ transform: "rotateX(180deg)", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
            >
              <div className="w-full h-full bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col">
                <div className="w-full h-[85%] text-[#301733] text-lg overflow-y-auto pr-2">
                  <p>
🎉🎂✨ <strong>Happy Birthday, Noshyy!</strong> ✨🎂🎉<br />
<br />
You deserve <em>all</em> the happiness, love, and sunshine the world can throw your way today and every day. 🌞💖🌈<br />
You’ve got this rare magic — the kind that lights up a room without even trying. Your smile 😄, your kindness 💕, the way you genuinely care 🤗… it all just hits different. 💫🌟<br />
<br />
I hope your day is overflowing with laughter 😂🎶, sweet surprises 🎁🍫, and moments that make your heart do a little happy dance 💃🕺💖.<br />
<br />
You’re truly one of a kind 🌹💎, and I hope you never forget how special you really are. Keep shining ✨🌸, keep spreading joy 🌈🌻, and keep being the amazing soul you’ve always been. 🌟💗<br />
<br />
Wishing you endless happiness 🥰🎉, big wins 🏆🎯, and all the sweetest things life can offer 🍰🍭🍓🎈🎀💖
</p>

                </div>

                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => setOpened(false)}
                    className="px-6 py-2 rounded-full text-sm font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Next Button */}
      {opened && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            className="px-10 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 shadow-[0_0_28px_rgba(244,114,182,0.35)] transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70 flex gap-2 items-center justify-center"
          >
            Next
            <ArrowRight size={20} className="mt-0.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardMessage;
