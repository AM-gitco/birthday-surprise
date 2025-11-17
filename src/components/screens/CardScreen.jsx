"use client";

import { useState } from "react";
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
        {/* Card Container */}
        <div className="mx-auto w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] cursor-pointer relative">
          {!opened && (
            <div
              className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg transition-transform duration-500"
              onClick={() => setOpened(true)}
            >
              <img
                src="/images/cover.webp"
                alt="Card Cover"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 bg-pink-500 text-pink-50 z-10 w-32 md:w-40 rounded-lg py-1 text-center">
                Tap to Open
              </p>
            </div>
          )}

          {opened && (
            <div className="absolute w-full h-full rounded-xl p-4 md:p-6 bg-white shadow-lg overflow-y-auto text-[#301733] text-lg transition-opacity duration-500">
              <p className="overflow-y-auto h-full pr-2">
                Happy Birthday, Cutiepie! You deserve all the happiness, love, and
                smiles in the world today and always. You have this special way of
                making everything around you brighter, your smile, your kindness,
                and the way you make people feel truly cared for. I hope your day
                is filled with laughter, surprises, and moments that make your
                heart happy. You’re truly one of a kind, and I just want you to
                know how special you are. Keep being the amazing person you are,
                spreading joy wherever you go. Wishing you endless happiness,
                success, and all the sweet things life has to offer. 💗
              </p>
            </div>
          )}
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
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardMessage;
