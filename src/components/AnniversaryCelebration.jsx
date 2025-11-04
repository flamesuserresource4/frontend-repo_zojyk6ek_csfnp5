import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const slides = [
  {
    src:
      'https://images.unsplash.com/photo-1537632955766-91414b8dcdcd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    src:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  },
  {
    src:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function AnniversaryCelebration() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto text-center text-white">
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
        Happy 5 Months Anniversary 💐
      </h2>

      <div className="relative mt-8 rounded-2xl overflow-hidden ring-1 ring-blue-400/30 shadow-2xl">
        <motion.img
          key={i}
          src={slides[i].src}
          alt="Our journey"
          className="w-full h-72 md:h-[26rem] object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, idx) => (
            <motion.span
              key={idx}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 2,
                height: 2,
                borderRadius: '9999px',
                background: 'rgba(56,189,248,0.9)',
                boxShadow: '0 0 8px rgba(56,189,248,0.9)',
              }}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 2 + (idx % 5), repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-blue-100 mb-2">A letter for you</h3>
        <p className="text-blue-50/90 leading-relaxed">
          Every day with you has been a small miracle. Your laugh, your warmth, and your kindness
          color my world in hues I never knew existed. Thank you for choosing me, forgiving me,
          and loving me. Here’s to our next chapter—brighter, deeper, and forever ours.
        </p>
      </div>

      <p className="mt-8 text-lg md:text-xl text-blue-100 drop-shadow">
        Here’s to forever, my love 💫
      </p>
    </div>
  )
}
