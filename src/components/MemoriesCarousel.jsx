import { useState } from 'react'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    src:
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop',
    caption: 'Our first coffee together ☕',
  },
  {
    src:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    caption: 'That movie night 🎬',
  },
  {
    src:
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1600&auto=format&fit=crop',
    caption: 'Your smile that made my day 💫',
  },
]

export default function MemoriesCarousel({ onBack }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-pink-600 mb-6">
        Our Memories
      </h2>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index].src}
            alt={slides[index].caption}
            className="w-full h-72 md:h-96 object-cover"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-600 rounded-full p-2 shadow"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-600 rounded-full p-2 shadow"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 my-4">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-pink-500' : 'bg-pink-300/70'}`}
          />
        ))}
      </div>

      <p className="text-lg md:text-xl text-gray-700 bg-white/70 rounded-xl inline-flex items-center gap-2 px-4 py-2 shadow">
        <Heart className="text-pink-500" size={18} /> {slides[index].caption}
      </p>

      <div className="mt-10">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
