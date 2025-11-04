import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

import MemoriesCarousel from './components/MemoriesCarousel'
import QuestionsQuiz from './components/QuestionsQuiz'
import SorryApology from './components/SorryApology'
import AnniversaryCelebration from './components/AnniversaryCelebration'

function App() {
  const [page, setPage] = useState('home')
  const audioRef = useRef(null)
  const interactedRef = useRef(false)

  const go = (p) => {
    if (!interactedRef.current && audioRef.current) {
      audioRef.current.play().catch(() => {})
      interactedRef.current = true
    }
    setPage(p)
  }

  useEffect(() => {
    const handler = () => {
      if (!interactedRef.current && audioRef.current) {
        audioRef.current.play().catch(() => {})
        interactedRef.current = true
      }
    }
    window.addEventListener('pointerdown', handler)
    return () => window.removeEventListener('pointerdown', handler)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2021/11/01/audio_3b1f4d6c2e.mp3?filename=romantic-ambient-110184.mp3"
        loop
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-rose-300/70"
            style={{ left: `${(i * 6.3) % 100}%`, top: `${(i * 9.7) % 100}%`, fontSize: `${18 + (i % 6) * 6}px` }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur shadow">
                <Heart className="text-pink-500" />
                <span className="text-sm font-medium text-pink-700">For my love</span>
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                Our Love Story
              </h1>
              <p className="mt-2 text-lg md:text-xl text-gray-600 italic">
                Every moment with you is my favorite memory 💖
              </p>
              <p className="mt-1 text-2xl md:text-4xl font-["Cedarville Cursive",cursive] text-pink-600">
                Sarah
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => go('memories')}
                  className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white shadow-lg border border-pink-100 text-pink-700 font-semibold"
                >
                  Our Memories
                </button>
                <button
                  onClick={() => go('questions')}
                  className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white shadow-lg border border-purple-100 text-purple-700 font-semibold"
                >
                  Questions for You
                </button>
                <button
                  onClick={() => go('sorry')}
                  className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white shadow-lg border border-blue-100 text-blue-700 font-semibold"
                >
                  I'm Sorry
                </button>
                <button
                  onClick={() => go('anniversary')}
                  className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white shadow-lg border border-indigo-100 text-indigo-700 font-semibold"
                >
                  5-Month Anniversary
                </button>
              </div>
            </motion.section>
          )}

          {page === 'memories' && (
            <motion.section
              key="memories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MemoriesCarousel onBack={() => setPage('home')} />
            </motion.section>
          )}

          {page === 'questions' && (
            <motion.section
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionsQuiz onBack={() => setPage('home')} />
            </motion.section>
          )}

          {page === 'sorry' && (
            <motion.section
              key="sorry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SorryApology onForgive={() => setPage('anniversary')} onBack={() => setPage('home')} />
            </motion.section>
          )}

          {page === 'anniversary' && (
            <motion.section
              key="anniversary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-900 rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              <AnniversaryCelebration />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
          100% { transform: translateY(0) }
        }
      `}</style>
    </div>
  )
}

export default App
