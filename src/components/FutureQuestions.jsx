import { useState } from 'react'
import { motion } from 'framer-motion'

const initialFutureQs = [
  { id: 1, q: "Where should our next trip be?", answer: '' },
  { id: 2, q: "What tradition should we start together?", answer: '' },
  { id: 3, q: "What does our perfect weekend look like in a year?", answer: '' },
  { id: 4, q: "One dream you want us to chase together?", answer: '' },
]

export default function FutureQuestions({ onBack }) {
  const [questions, setQuestions] = useState(initialFutureQs)
  const [saved, setSaved] = useState(false)

  const update = (id, value) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, answer: value } : q)))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-600 text-center mb-6">
        Questions for Our Future
      </h2>

      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-indigo-300/80"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.2], y: [-8, 8, -8] }}
              transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.25 }}
              style={{ left: `${(i * 7) % 100}%`, top: `${(i * 6.5) % 100}%` }}
            >
              ★
            </motion.span>
          ))}
        </div>

        <form onSubmit={onSubmit} className="relative z-10 bg-white/85 backdrop-blur rounded-2xl p-6 shadow-xl space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="block text-gray-700 font-medium">{q.q}</label>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => update(q.id, e.target.value)}
                className="w-full rounded-xl border border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 px-4 py-2 bg-white/90"
                placeholder="Your beautiful idea..."
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:opacity-95"
          >
            Save Our Dreams
          </button>
        </form>

        {saved && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-indigo-700 font-semibold"
          >
            I can’t wait to make these come true with you ✨
          </motion.p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
