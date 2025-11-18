"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/autoplay"
import { Mail } from "lucide-react"
import GradientButton from "../GradientButton"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)

  const photos = [
    // "/images/1.jpeg",
    // "/images/2.jpeg",
    // "/images/3.jpeg",
    // "/images/4.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
    "/images/7.jpeg",
    "/images/8.jpeg",
    "/images/9.jpeg",
    "/images/10.jpeg",
  ]

  return (
    <div className="px-4 md:px-6 py-16 md:py-20 mt-6 md:mt-10">
      <div className="text-center mb-8 md:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          Some Sweet Moments
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Swipe the cards)</p>
      </div>

      <div className="relative flex justify-center mt-4 md:mt-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="h-full w-full rounded-3xl p-2 bg-gradient-to-br from-pink-400/50 via-rose-400/50 to-purple-400/50 backdrop-blur-sm">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    {/* left heart */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute top-2 left-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90"
                      aria-hidden="true"
                    >
                      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>

                    {/* right heart */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute top-2 right-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90"
                      aria-hidden="true"
                    >
                      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>

                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-cover"
                      style={{ filter: "drop-shadow(rgba(244, 114, 182, 0.2) 0px 8px 16px)" }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-pink-100/10 pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-10 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
