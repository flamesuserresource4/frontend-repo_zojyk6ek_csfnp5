import { useState } from 'react'
import { motion } from 'framer-motion'

const initialQuestions = [
  { id: 1, q: 'When was our first date?', answer: '' },
  { id: 2, q: 'Which outfit of yours do I love the most?', answer: '' },
  { id: 3, q: 'One word that describes us?', answer: '' },
  { id: 4, q: 'Do you forgive me for all my silly mistakes?', answer: '' },
]

export default function QuestionsQuiz({ onBack }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [submitted, setSubmitted] = useState(false)

  const update = (id, value) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, answer: value } : q)))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600 text-center mb-6">
        Questions for You
      </h2>

      <div className="relative">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl md:text-3xl text-pink-300/70"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [-10, 10, -10], opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
              style={{ left: `${(i * 8) % 100}%`, top: `${(i * 7) % 100}%` }}
            >
              ?
            </motion.span>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="relative z-10 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl space-y-4"
        >
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="block text-gray-700 font-medium">{q.q}</label>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => update(q.id, e.target.value)}
                className="w-full rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-pink-300 px-4 py-2 bg-white/90"
                placeholder="Your sweet answer..."
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-95"
          >
            Save Answers
          </button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-pink-700 font-semibold"
          >
            You mean the world to me 💞
          </motion.p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
