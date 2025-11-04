import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SorryApology({ onForgive, onNever, onBack }) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleForgive = () => {
    setShowConfetti(true)
    setTimeout(() => {
      onForgive?.()
    }, 1400)
  }

  const handleNever = () => {
    // No confetti, go straight to the ending page as requested
    onNever?.()
  }

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-6">I'm Sorry</h2>

      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-white shadow-2xl">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-yellow-400/60"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [0, -6, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 + (i % 6), delay: i * 0.2 }}
              style={{ left: `${(i * 5) % 100}%`, top: `${(i * 9) % 100}%` }}
            >
              ✨
            </motion.span>
          ))}
        </div>

        <p className="relative z-10 text-lg md:text-xl text-gray-700 leading-relaxed">
          I’m really sorry for hurting you. I never meant to make you feel that way.
          You are my happiness, my peace, and my favorite person.
          I’ll keep trying to make you smile every day.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleForgive}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 animate-pulse"
          >
            Forgive Me ❤️
          </button>
          <button
            onClick={handleNever}
            className="px-6 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-md border border-blue-200 hover:bg-blue-50"
          >
            Never Forgiving
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={onBack}
            className="text-blue-600/80 hover:text-blue-700 underline"
          >
            Back to Home
          </button>
        </div>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0"
            >
              {[...Array(80)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute block"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    width: 6,
                    height: 12,
                    backgroundColor: ['#f472b6', '#60a5fa', '#a78bfa', '#34d399'][i % 4],
                    borderRadius: 2,
                  }}
                  initial={{ y: -20, opacity: 1, rotate: 0 }}
                  animate={{ y: '110%', opacity: 1, rotate: 360 }}
                  transition={{ duration: 1 + Math.random(), ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
