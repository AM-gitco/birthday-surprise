"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// LoaderScreen
// Props:
// - onDone: callback when loader finishes
// - showAudioHint: boolean (default true) — whether to show the play-arrow hint
// - autoplayBlocked: optional boolean — if provided, the hint will be shown only when autoplayBlocked === true
export default function LoaderScreen({ onDone, showAudioHint = true, autoplayBlocked }) {
    const [count, setCount] = useState(10)
    const [hintDismissed, setHintDismissed] = useState(false)

    useEffect(() => {
        const t = setInterval(() => {
            setCount((c) => {
                if (c <= 1) {
                    clearInterval(t)
                    setTimeout(() => onDone?.(), 420)
                    return 0
                }
                return c - 1
            })
        }, 900)
        return () => clearInterval(t)
    }, [onDone])

    // Determine whether to show the hint. If autoplayBlocked is undefined we default to showing the hint.
    const shouldShowHint = showAudioHint && !hintDismissed && (typeof autoplayBlocked === "boolean" ? autoplayBlocked : true)

    // clicking hint triggers a global user-interaction event so audio handlers on the page can react
    const triggerInteraction = () => {
        try {
            // Dispatch a real user-like click event on window to trigger first-interaction handlers (unmute/play)
            const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
            window.dispatchEvent(ev)
        } catch (e) {
            // fallback: just call window.click handler if any
            try { window.click?.() } catch (_) {}
        }
    }

    return (
        <div className="w-full grid place-items-center">
            {/* Play-button pointer (guides user to top-right audio control). Clickable: triggers global interaction event. */}
            {shouldShowHint && (
                <motion.div
                    aria-label="Unmute audio — Tap to play"
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: [0, 1], y: [0, -12, -8, -12], scale: [0.98, 1, 0.98] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    onClick={(e) => { e.stopPropagation(); triggerInteraction(); setHintDismissed(true); }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerInteraction(); setHintDismissed(true); }
                    }}
                    className="fixed z-50 flex flex-col items-center justify-center"
                    style={{ top: '1.6rem', right: '1rem' }}
                >
                    <div className="relative flex items-center justify-center">
                        {/* pulsing halo */}
                        <span className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-500/20 to-rose-500/10 opacity-60 animate-pulse" aria-hidden="true" />

                        <div className="relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-500 shadow-2xl ring-2 ring-white/8 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5" aria-hidden="true">
                                <path d="M5 3v18l15-9z" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-3 text-white/95 text-sm font-medium text-center bg-black/40 backdrop-blur rounded-md px-3 py-1 select-none">Tap here to unmute & play</div>

                    {/* small dismiss 'x' so users can hide hint */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setHintDismissed(true); }}
                        aria-label="Dismiss hint"
                        className="mt-2 text-xs text-white/60 bg-black/20 px-2 py-1 rounded-full"
                    >
                        Dismiss
                    </button>
                </motion.div>
            )}

            {/* Enhanced Spinner + counter */}
            {/* <div className="relative">
            <div className="rounded-full p-[3px] bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 shadow-2xl w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-pink-900/30 via-black to-rose-900/30 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/6 animate-spin-slow" />
                <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-600/10 to-rose-600/8 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-pink-500/20" />
                        <div className="relative">
              <div className="rounded-full p-[3px] bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 shadow-2xl w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-pink-900/30 via-black to-rose-900/30 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-white/6 animate-spin-slow" />
                  <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-600/10 to-rose-600/8 flex items-center justify-center">
                            <span className="sr-only">Seconds remaining: {count}</span>
                        </motion.div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
                    </div> */}



            {/* <div className="relative">
                <div className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-pink-900/30 via-black to-rose-900/30 flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 rounded-full border border-white/6 animate-spin-slow" />
                    <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-600/10 to-rose-600/8 flex items-center justify-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-pink-500/20" />
                                <div className="relative">
                                    <motion.div
                                        key={count}
                                        initial={{ scale: 0.3, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-[110px] md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.25)] p-0.5 pt-7"
                                    >
                                        <span aria-hidden>{count}</span>
                                        <span className="sr-only">Seconds remaining: {count}</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}
            <div className="relative"> <div className="spinner"> <div className="spinner1"></div> </div> <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "> <motion.div key={count} initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[110px] md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.25)] p-0.5 pt-7" > {count} </motion.div> </div> </div>
            <motion.h1
                className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mt-14 text-center py-1.5"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Crafting your special moment...
            </motion.h1>

            {/* Helpful center hint if user still hasn't interacted (non-interfering) */}
            {!hintDismissed && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="bg-black/30 text-white/80 rounded-full px-4 py-2 text-sm backdrop-blur">If you don't hear music, tap the play icon (top-right)</div>
                </div>
            )}

            <style jsx>{`
                .animate-spin-slow { animation: spin 6s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}
